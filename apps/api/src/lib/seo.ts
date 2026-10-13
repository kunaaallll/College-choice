/**
 * SEO helpers shared by the public /api/seo routes and the admin SEO panel:
 * URL normalisation, the site page inventory and SEO health checks.
 */
import { prisma } from "../prisma";

/** Public site origin, e.g. "https://collegechoice.in" (used to recognise our own absolute URLs). */
export const SITE_URL = (process.env.SITE_URL || (process.env.CORS_ORIGIN || "").split(",")[0] || "http://localhost:3000")
  .trim()
  .replace(/\/+$/, "");
const SITE_HOSTS = new Set(
  [SITE_URL, "https://collegechoice.in", "https://www.collegechoice.in"].map((u) => {
    try { return new URL(u).host; } catch { return ""; }
  }),
);

// Paths owned by the app itself — never valid SEO/redirect sources.
const RESERVED = [/^\/api(\/|$)/, /^\/_next(\/|$)/, /^\/admin(\/|$)/, /^\/internal(\/|$)/, /^\/uploads(\/|$)/];

/**
 * Normalise a URL or path to the form we key SEO data by: "/a/b" — leading slash,
 * no domain, query, hash or trailing slash. Absolute URLs on other hosts → null.
 */
export function normalizePath(input: string): string | null {
  let s = String(input || "").trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) {
    let u: URL;
    try { u = new URL(s); } catch { return null; }
    if (!SITE_HOSTS.has(u.host)) return null;
    s = u.pathname;
  }
  s = s.split("#")[0].split("?")[0];
  if (!s.startsWith("/")) s = `/${s}`;
  s = s.replace(/\/{2,}/g, "/");
  if (s.length > 1) s = s.replace(/\/+$/, "");
  if (s.length > 500 || /\s/.test(s)) return null;
  return s;
}

export const isReservedPath = (p: string) => RESERVED.some((r) => r.test(p));

/** An absolute URL on another site (allowed as a redirect target / canonical). */
export function isExternalUrl(s: string): boolean {
  if (!/^https?:\/\//i.test(s)) return false;
  try { return !SITE_HOSTS.has(new URL(s).host); } catch { return false; }
}

// ── Length guidance (Google typically shows ~50–60 title / ~120–160 description chars) ──
export const LIMITS = { titleMin: 30, titleMax: 60, descMin: 70, descMax: 160 } as const;

// ─────────────────────────────────────────────────────────────
// Page inventory — every indexable URL the site renders
// ─────────────────────────────────────────────────────────────

export type PageType = "static" | "college" | "stream" | "city" | "online" | "news";

export interface InventoryPage {
  path: string;
  type: PageType;
  name: string;
  /** Entity-level SEO defaults (college metaTitle etc.) — null when the page builds them in code. */
  defaultTitle: string | null;
  defaultDescription: string | null;
  image: string | null;
  updatedAt: Date | null;
  /** Template tokens for bulk title/description templates. */
  tokens: Record<string, string>;
}

// Static pages and online programme pages (keep in sync with apps/web/src/lib/online.ts).
const STATIC_PAGES: [string, string][] = [
  ["/", "Home"],
  ["/colleges", "Colleges"],
  ["/courses", "Courses"],
  ["/exams", "Entrance exams"],
  ["/news", "News"],
  ["/online", "Online degrees"],
  ["/compare", "Compare colleges"],
  ["/about", "About"],
];
const ONLINE_PROGRAMS: [string, string][] = [
  ["mba", "Online MBA"], ["mca", "Online MCA"], ["bba", "Online BBA"], ["bca", "Online BCA"],
  ["mcom", "Online M.Com"], ["bcom", "Online B.Com"], ["ma", "Online MA"],
];

let inventoryCache: { at: number; pages: InventoryPage[] } | null = null;
const INVENTORY_TTL = 60_000;

export function invalidateInventory() {
  inventoryCache = null;
}

export async function getInventory(): Promise<InventoryPage[]> {
  if (inventoryCache && Date.now() - inventoryCache.at < INVENTORY_TTL) return inventoryCache.pages;
  const year = String(new Date().getFullYear());

  const [colleges, streams, cities, news] = await Promise.all([
    prisma.college.findMany({
      where: { published: true },
      select: {
        name: true, slug: true, metaTitle: true, metaDescription: true, about: true, imgUrl: true,
        location: true, state: true, updatedAt: true,
        city: { select: { name: true } }, stream: { select: { name: true } },
      },
    }),
    prisma.stream.findMany({ select: { name: true, slug: true } }),
    prisma.city.findMany({ select: { name: true, slug: true, state: true } }),
    prisma.newsArticle.findMany({ select: { slug: true, title: true, excerpt: true, imgUrl: true, publishedAt: true } }),
  ]);

  const pages: InventoryPage[] = [
    ...STATIC_PAGES.map(([path, name]): InventoryPage => ({
      path, type: "static", name, defaultTitle: null, defaultDescription: null, image: null, updatedAt: null,
      tokens: { name, year },
    })),
    ...ONLINE_PROGRAMS.map(([slug, name]): InventoryPage => ({
      path: `/online/${slug}`, type: "online", name, defaultTitle: null, defaultDescription: null, image: null, updatedAt: null,
      tokens: { name, year },
    })),
    ...colleges.map((c): InventoryPage => ({
      path: `/colleges/${c.slug}`,
      type: "college",
      name: c.name,
      defaultTitle: c.metaTitle,
      defaultDescription: c.metaDescription || c.about,
      image: c.imgUrl,
      updatedAt: c.updatedAt,
      tokens: { name: c.name, city: c.city?.name ?? "", state: c.state ?? "", stream: c.stream?.name ?? "", year },
    })),
    ...streams.map((s): InventoryPage => ({
      path: `/stream/${s.slug}`, type: "stream", name: s.name, defaultTitle: null, defaultDescription: null, image: null,
      updatedAt: null, tokens: { name: s.name, stream: s.name, year },
    })),
    ...cities.map((c): InventoryPage => ({
      path: `/colleges-in/${c.slug}`, type: "city", name: c.name, defaultTitle: null, defaultDescription: null, image: null,
      updatedAt: null, tokens: { name: c.name, city: c.name, state: c.state ?? "", year },
    })),
    ...news.map((n): InventoryPage => ({
      path: `/news/${n.slug}`, type: "news", name: n.title, defaultTitle: n.title, defaultDescription: n.excerpt,
      image: n.imgUrl, updatedAt: n.publishedAt, tokens: { name: n.title, year },
    })),
  ];

  inventoryCache = { at: Date.now(), pages };
  return pages;
}

/** Which page type a path belongs to (also for paths outside the inventory). */
export function pathType(path: string): PageType | "other" {
  if (/^\/colleges\/[^/]+$/.test(path)) return "college";
  if (/^\/news\/[^/]+$/.test(path)) return "news";
  if (/^\/stream\/[^/]+$/.test(path)) return "stream";
  if (/^\/colleges-in\/[^/]+$/.test(path)) return "city";
  if (/^\/online\/[^/]+$/.test(path)) return "online";
  if (STATIC_PAGES.some(([p]) => p === path)) return "static";
  return "other";
}

/** Fill {name} {city} {state} {stream} {year} tokens; unknown tokens are left blank. */
export function applyTemplate(template: string, tokens: Record<string, string>): string {
  return template
    .replace(/\{(\w+)\}/g, (_m, k: string) => tokens[k.toLowerCase()] ?? "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,|—–-])\s*$/g, "")
    .trim();
}

// ─────────────────────────────────────────────────────────────
// Health checks
// ─────────────────────────────────────────────────────────────

export type Issue =
  | "no-custom-title" | "no-custom-description"
  | "title-short" | "title-long" | "desc-short" | "desc-long"
  | "no-image" | "noindex" | "custom-canonical";

export interface SeoRow {
  title: string | null;
  description: string | null;
  canonical: string | null;
  noindex: boolean;
  ogImage: string | null;
}

/** Issues for one page given its inventory entry and (optional) override row. */
export function pageIssues(page: Pick<InventoryPage, "type" | "defaultTitle" | "defaultDescription" | "image">, o: SeoRow | null): Issue[] {
  const issues: Issue[] = [];
  const title = o?.title || page.defaultTitle;
  const desc = o?.description || page.defaultDescription;
  if (!title) issues.push("no-custom-title");
  else if (title.length < LIMITS.titleMin) issues.push("title-short");
  else if (title.length > LIMITS.titleMax) issues.push("title-long");
  if (!desc) issues.push("no-custom-description");
  else if (desc.length < LIMITS.descMin) issues.push("desc-short");
  else if (desc.length > LIMITS.descMax) issues.push("desc-long");
  if ((page.type === "college" || page.type === "news") && !page.image && !o?.ogImage) issues.push("no-image");
  if (o?.noindex) issues.push("noindex");
  if (o?.canonical) issues.push("custom-canonical");
  return issues;
}

// ─────────────────────────────────────────────────────────────
// Site settings
// ─────────────────────────────────────────────────────────────

export const SITEMAP_SECTIONS = ["static", "colleges", "streams", "cities", "online", "news"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];

export interface SeoSettings {
  /** Full robots.txt body; null → the site's built-in default. */
  robotsTxt: string | null;
  sitemap: Record<SitemapSection, boolean>;
}

export async function getSeoSettings(): Promise<SeoSettings> {
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: ["robots.txt", "sitemap.sections"] } } });
  const byKey = new Map(rows.map((r) => [r.key, r.value]));
  let sections: Partial<Record<SitemapSection, boolean>> = {};
  try { sections = JSON.parse(byKey.get("sitemap.sections") || "{}"); } catch { /* keep defaults */ }
  return {
    robotsTxt: byKey.get("robots.txt") ?? null,
    sitemap: Object.fromEntries(SITEMAP_SECTIONS.map((s) => [s, sections[s] !== false])) as Record<SitemapSection, boolean>,
  };
}

/** Warnings for a robots.txt body that would hurt indexing. */
export function robotsWarnings(txt: string): string[] {
  const warnings: string[] = [];
  const lines = txt.split(/\r?\n/).map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
  let agentAll = false;
  for (const l of lines) {
    const [k, ...rest] = l.split(":");
    const key = k.trim().toLowerCase();
    const val = rest.join(":").trim();
    if (key === "user-agent") agentAll = val === "*";
    if (agentAll && key === "disallow" && val === "/") warnings.push("“Disallow: /” for all crawlers blocks the whole site from Google.");
    if (key === "disallow" && /^\/(colleges|news|stream|colleges-in|online)\/?$/.test(val)) {
      warnings.push(`“Disallow: ${val}” hides an entire content section from search engines.`);
    }
  }
  if (!lines.some((l) => /^sitemap\s*:/i.test(l))) warnings.push("No Sitemap line — the site will add one automatically.");
  return warnings;
}

// ─────────────────────────────────────────────────────────────
// URL changes
// ─────────────────────────────────────────────────────────────

type Tx = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

/**
 * Bookkeeping after a page's URL changes (call inside the transaction that renamed it):
 * moves SEO overrides, adds a 301 old → new (isPrefix also covers sub-pages such as
 * college tabs) and repoints existing redirects so no chains or loops are left.
 */
export async function recordUrlChange(tx: Tx, oldPath: string, newPath: string, isPrefix: boolean) {
  const under = (p: string, base: string) => p === base || p.startsWith(`${base}/`);
  const swap = (p: string) => (under(p, oldPath) ? newPath + p.slice(oldPath.length) : p);
  const inOld = { OR: [{ path: oldPath }, { path: { startsWith: `${oldPath}/` } }] };

  for (const r of await tx.seoMeta.findMany({ where: inOld })) {
    await tx.seoMeta.deleteMany({ where: { path: swap(r.path) } });
    await tx.seoMeta.update({ where: { id: r.id }, data: { path: swap(r.path) } });
  }
  // Redirects *from* the new URL would now loop — drop them.
  await tx.redirect.deleteMany({ where: { OR: [{ fromPath: newPath }, { fromPath: { startsWith: `${newPath}/` } }] } });
  // Redirects that pointed at the old URL go straight to the new one.
  const pointing = await tx.redirect.findMany({ where: { OR: [{ toPath: oldPath }, { toPath: { startsWith: `${oldPath}/` } }] } });
  for (const r of pointing) await tx.redirect.update({ where: { id: r.id }, data: { toPath: swap(r.toPath) } });
  await tx.redirect.upsert({
    where: { fromPath: oldPath },
    create: { fromPath: oldPath, toPath: newPath, statusCode: 301, isPrefix, note: "URL changed" },
    update: { toPath: newPath, statusCode: 301, isPrefix, enabled: true, note: "URL changed" },
  });
  await tx.notFoundLog.updateMany({ where: { path: oldPath }, data: { resolved: true } });
}
