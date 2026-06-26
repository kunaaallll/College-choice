import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import { SITE } from "@/lib/seo";
import { PROGRAMS } from "@/lib/online";

// Colleges per sitemap file. Google caps a single sitemap at 50k URLs.
const CHUNK = 5000;

async function collegeSlugs() {
  try {
    return (await api.collegeSitemap()).items;
  } catch {
    return [] as { slug: string; updatedAt: string }[];
  }
}

// Splits the sitemap into chunks → Next emits a sitemap index automatically.
export async function generateSitemaps() {
  const colleges = await collegeSlugs();
  const collegeChunks = Math.max(1, Math.ceil(colleges.length / CHUNK));
  // id 0 → static + taxonomy; id ≥ 1 → college chunks
  return Array.from({ length: collegeChunks + 1 }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  if (id === 0) {
    const staticRoutes: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: "daily", priority: 1 },
      { url: `${base}/colleges`, changeFrequency: "daily", priority: 0.9 },
      { url: `${base}/online`, changeFrequency: "weekly", priority: 0.9 },
      ...PROGRAMS.map((p) => ({
        url: `${base}/online/${p.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      { url: `${base}/courses`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${base}/exams`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${base}/news`, changeFrequency: "daily", priority: 0.6 },
      { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.4 },
      { url: `${base}/about`, changeFrequency: "monthly", priority: 0.3 },
    ];

    const [streamsRes, citiesRes] = await Promise.allSettled([api.streams(), api.cities()]);
    const streams = streamsRes.status === "fulfilled" ? streamsRes.value.items : [];
    const cities = citiesRes.status === "fulfilled" ? citiesRes.value.items : [];

    return [
      ...staticRoutes,
      ...streams.map((s) => ({ url: `${base}/stream/${s.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
      ...cities.map((c) => ({ url: `${base}/colleges-in/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ];
  }

  const colleges = await collegeSlugs();
  const slice = colleges.slice((id - 1) * CHUNK, id * CHUNK);
  return slice.map((c) => ({
    url: `${base}/colleges/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
