import type {
  City,
  CollegeCard,
  CollegeDetail,
  Exam,
  NewsArticle,
  Paginated,
  Stream,
} from "./types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Revalidate cached fetches hourly (ISR) — fast pages, fresh-ish data.
const REVALIDATE = 3600;

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  // Retry transient failures (e.g. serverless Postgres cold-starts) so a brief
  // blip never gets cached as an empty/missing page by ISR.
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${API}${path}`, {
        next: { revalidate: REVALIDATE },
        headers: { Accept: "application/json" },
        ...init,
      });
      if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
      return (await res.json()) as T;
    } catch (err) {
      lastErr = err;
      if (attempt < 2) await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

export interface CollegeQuery {
  search?: string;
  stream?: string;
  type?: string;
  mode?: string;
  program?: string;
  city?: string;
  state?: string;
  maxFees?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export function buildCollegeQuery(q: CollegeQuery): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v !== undefined && v !== null && v !== "" && v !== "All") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export const api = {
  colleges: (q: CollegeQuery = {}) =>
    get<Paginated<CollegeCard>>(`/api/colleges${buildCollegeQuery(q)}`),
  college: (slug: string) => get<CollegeDetail>(`/api/colleges/${slug}`),
  compare: (slugs: string[]) =>
    get<{ items: CollegeCard[] }>(`/api/colleges/compare?ids=${slugs.join(",")}`),
  collegeSitemap: () =>
    get<{ items: { slug: string; updatedAt: string }[] }>(`/api/colleges/sitemap`),
  streams: () => get<{ items: Stream[] }>(`/api/streams`),
  cities: () => get<{ items: City[] }>(`/api/cities`),
  exams: () => get<{ items: Exam[] }>(`/api/exams`),
  news: (category?: string) =>
    get<{ items: NewsArticle[] }>(`/api/news${category ? `?category=${encodeURIComponent(category)}` : ""}`),
};

// Browser-side POSTs (forms). Not cached.
export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  return data as T;
}
