import { API } from "@/lib/api";
import { SITE } from "@/lib/seo";

export const revalidate = 3600;

// Used until a custom robots.txt is saved in the admin SEO panel.
const DEFAULT_ROBOTS = `User-agent: *
Allow: /
# Keep stateful/utility routes out of the index.
Disallow: /compare
Disallow: /api/
Disallow: /admin
Disallow: /internal/
`;

/** /robots.txt — admin-managed (SEO → Robots & sitemap) with a safe default. */
export async function GET() {
  let custom: string | null = null;
  try {
    const res = await fetch(`${API}/api/seo/settings`, {
      next: { revalidate: 3600, tags: ["seo-settings"] },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) custom = ((await res.json()) as { robotsTxt: string | null }).robotsTxt;
  } catch {
    // API unreachable → serve the default.
  }

  let body = (custom || DEFAULT_ROBOTS).trimEnd() + "\n";
  if (!/^\s*sitemap\s*:/im.test(body)) body += `\nSitemap: ${SITE.url}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
