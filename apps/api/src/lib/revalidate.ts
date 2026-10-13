/**
 * Ask the Next.js web app to drop its cached copy of pages after an admin edit,
 * so SEO/content changes show up immediately instead of after the ISR window.
 * Fire-and-forget: a failure only means the page refreshes on its normal schedule.
 */
const WEB_URL = (process.env.WEB_INTERNAL_URL || "http://localhost:3000").replace(/\/+$/, "");
const SECRET = process.env.REVALIDATE_SECRET || process.env.ADMIN_TOKEN || "";

export function revalidateWeb(opts: { paths?: string[]; tags?: string[] }) {
  if (!SECRET) return;
  const paths = [...new Set(opts.paths ?? [])].slice(0, 2000);
  const tags = [...new Set(opts.tags ?? [])];
  if (!paths.length && !tags.length) return;
  fetch(`${WEB_URL}/internal/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${SECRET}` },
    body: JSON.stringify({ paths, tags }),
    signal: AbortSignal.timeout(10_000),
  }).catch((err) => console.warn("[revalidate] web app not reachable:", err instanceof Error ? err.message : err));
}
