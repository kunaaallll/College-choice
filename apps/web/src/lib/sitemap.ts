import { api, API } from "./api";
import { PROGRAMS } from "./online";
import { SITE } from "./seo";

/**
 * XML sitemaps: /sitemap.xml is an index of per-type files under /sitemaps/
 * (pages, streams, cities, news, courses, exams, info, colleges-1…N). Sections can be switched off and
 * individual pages excluded from the admin SEO panel (noindex, "exclude from
 * sitemap" or a canonical pointing elsewhere).
 */

export const COLLEGES_PER_FILE = 5000; // Google allows 50k URLs per file; smaller files regenerate faster.

type Section = "static" | "colleges" | "streams" | "cities" | "online" | "news" | "courses" | "exams" | "pages";
export interface SitemapSettings { sitemap: Record<Section, boolean>; excludedPaths: string[] }

export interface SitemapEntry { path: string; lastModified?: string; changeFrequency?: string; priority?: number }

const ALL_ON: Record<Section, boolean> = { static: true, colleges: true, streams: true, cities: true, online: true, news: true, courses: true, exams: true, pages: true };

export async function sitemapSettings(): Promise<SitemapSettings> {
  try {
    const res = await fetch(`${API}/api/seo/settings`, {
      next: { revalidate: 3600, tags: ["seo-settings"] },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Partial<SitemapSettings>;
    return { sitemap: { ...ALL_ON, ...data.sitemap }, excludedPaths: data.excludedPaths ?? [] };
  } catch {
    return { sitemap: ALL_ON, excludedPaths: [] };
  }
}

const settle = async <T>(p: Promise<T>, fallback: T) => p.catch(() => fallback);

export async function collegeEntries(): Promise<SitemapEntry[]> {
  const { items } = await settle(api.collegeSitemap(), { items: [] });
  return items.map((c) => ({ path: `/colleges/${c.slug}`, lastModified: c.updatedAt, changeFrequency: "weekly", priority: 0.8 }));
}

/** Entries for one sitemap file, before exclusions. null → unknown file. */
export async function fileEntries(file: string, s: SitemapSettings): Promise<SitemapEntry[] | null> {
  if (file === "pages") {
    return [
      ...(s.sitemap.static
        ? [
            { path: "/", changeFrequency: "daily", priority: 1 },
            { path: "/colleges", changeFrequency: "daily", priority: 0.9 },
            { path: "/courses", changeFrequency: "weekly", priority: 0.7 },
            { path: "/exams", changeFrequency: "weekly", priority: 0.7 },
            { path: "/news", changeFrequency: "daily", priority: 0.6 },
            { path: "/about", changeFrequency: "monthly", priority: 0.3 },
          ]
        : []),
      ...(s.sitemap.online
        ? [
            { path: "/online", changeFrequency: "weekly", priority: 0.9 },
            ...PROGRAMS.map((p) => ({ path: `/online/${p.slug}`, changeFrequency: "weekly", priority: 0.8 })),
          ]
        : []),
    ];
  }
  if (file === "streams") {
    if (!s.sitemap.streams) return [];
    const { items } = await settle(api.streams(), { items: [] });
    return items.map((x) => ({ path: `/stream/${x.slug}`, changeFrequency: "weekly", priority: 0.7 }));
  }
  if (file === "cities") {
    if (!s.sitemap.cities) return [];
    const { items } = await settle(api.cities(), { items: [] });
    return items.map((x) => ({ path: `/colleges-in/${x.slug}`, changeFrequency: "weekly", priority: 0.7 }));
  }
  if (file === "news") {
    if (!s.sitemap.news) return [];
    const { items } = await settle(api.news(), { items: [] });
    return items.map((n) => ({ path: `/news/${n.slug}`, lastModified: n.publishedAt, changeFrequency: "monthly", priority: 0.6 }));
  }
  // CMS content pages: courses, exam pages and info/service pages ("info.xml").
  const entryKind = file === "courses" ? "course" : file === "exams" ? "exam" : file === "info" ? "page" : null;
  if (entryKind) {
    const section: Section = file === "info" ? "pages" : (file as Section);
    if (!s.sitemap[section]) return [];
    const { items } = await settle(api.entries(entryKind), { items: [] });
    return items.map((e) => ({ path: e.path, lastModified: e.updatedAt, changeFrequency: "weekly", priority: entryKind === "page" ? 0.5 : 0.7 }));
  }
  const m = /^colleges-(\d+)$/.exec(file);
  if (m) {
    if (!s.sitemap.colleges) return [];
    const n = Number(m[1]);
    if (n < 1) return null;
    return (await collegeEntries()).slice((n - 1) * COLLEGES_PER_FILE, n * COLLEGES_PER_FILE);
  }
  return null;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const isoDate = (d?: string) => {
  if (!d) return null;
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
};

export function urlsetXml(entries: SitemapEntry[]): string {
  const urls = entries.map((e) => {
    const lastmod = isoDate(e.lastModified);
    return [
      "  <url>",
      `    <loc>${esc(SITE.url + (e.path === "/" ? "" : e.path))}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      e.changeFrequency ? `    <changefreq>${e.changeFrequency}</changefreq>` : null,
      e.priority !== undefined ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ].filter(Boolean).join("\n");
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function indexXml(files: { name: string; lastModified?: string }[]): string {
  const items = files.map((f) => {
    const lastmod = isoDate(f.lastModified);
    return `  <sitemap>\n    <loc>${esc(`${SITE.url}/sitemaps/${f.name}.xml`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</sitemapindex>\n`;
}

/** Newest lastModified among entries (for the index's <lastmod>). */
export const newest = (entries: SitemapEntry[]) =>
  entries.reduce<string | undefined>((max, e) => (e.lastModified && (!max || e.lastModified > max) ? e.lastModified : max), undefined);

export const xmlResponse = (xml: string) =>
  new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
