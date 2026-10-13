import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

/**
 * Applies the 301/302 redirects managed in the admin SEO panel.
 * The redirect list is cached in memory and refreshed every minute in the
 * background, so a request never waits on the API (except the very first one).
 */

const API = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const SITE = process.env.NEXT_PUBLIC_SITE_URL;
const TTL = 60_000;

interface Rule { fromPath: string; toPath: string; statusCode: number; isPrefix: boolean }
interface RuleSet { at: number; exact: Map<string, Rule>; prefixes: Rule[] }

let rules: RuleSet | null = null;
let inflight: Promise<void> | null = null;

async function refresh() {
  try {
    const res = await fetch(`${API}/api/seo/redirects`, { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { items } = (await res.json()) as { items: Rule[] };
    rules = {
      at: Date.now(),
      exact: new Map(items.map((r) => [r.fromPath, r])),
      // Longest prefix wins.
      prefixes: items.filter((r) => r.isPrefix).sort((a, b) => b.fromPath.length - a.fromPath.length),
    };
  } catch {
    // API unreachable: keep the last good list and try again after the TTL.
    rules = { exact: new Map(), prefixes: [], ...rules, at: Date.now() };
  }
}

async function getRules(): Promise<RuleSet> {
  if (!rules) {
    inflight ??= refresh().finally(() => { inflight = null; });
    await inflight;
  } else if (Date.now() - rules.at > TTL && !inflight) {
    inflight = refresh().finally(() => { inflight = null; }); // refresh in the background, serve the cached list
  }
  return rules!;
}

const isAbsolute = (u: string) => /^https?:\/\//i.test(u);

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = req.nextUrl;
  let path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  try { path = decodeURIComponent(path); } catch { /* keep encoded */ }

  const { exact, prefixes } = await getRules();
  let rule = exact.get(path);
  let target = rule?.toPath;
  if (!rule) {
    rule = prefixes.find((r) => path.startsWith(`${r.fromPath}/`));
    // /colleges/old/placements → /colleges/new/placements
    if (rule) target = isAbsolute(rule.toPath) ? rule.toPath : rule.toPath + path.slice(rule.fromPath.length);
  }
  if (!rule || !target) return NextResponse.next();

  const dest = new URL(target, isAbsolute(target) ? undefined : SITE || req.nextUrl.origin);
  if (search && !dest.search) dest.search = search;

  event.waitUntil(
    fetch(`${API}/api/seo/redirect-hit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromPath: rule.fromPath }),
      signal: AbortSignal.timeout(3000),
    }).catch(() => {}),
  );
  return NextResponse.redirect(dest, rule.statusCode === 302 ? 302 : 301);
}

export const config = {
  runtime: "nodejs",
  // Everything except Next internals, the API proxy, admin and the revalidate hook.
  matcher: ["/((?!_next/|api/|admin|internal/|favicon\\.ico).*)"],
};
