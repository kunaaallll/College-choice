import type { Metadata } from "next";
import { api, buildCollegeQuery, type CollegeQuery } from "@/lib/api";
import { canonical, pageMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Filters } from "@/components/Filters";
import { CollegeCard } from "@/components/CollegeCard";
import { Pagination } from "@/components/Pagination";
import { PageH1 } from "@/components/ContentBlocks";

export const revalidate = 3600;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function toQuery(sp: Record<string, string | string[] | undefined>): CollegeQuery {
  return {
    search: str(sp.search),
    stream: str(sp.stream),
    type: str(sp.type),
    mode: str(sp.mode),
    city: str(sp.city),
    state: str(sp.state),
    maxFees: str(sp.maxFees) ? Number(str(sp.maxFees)) : undefined,
    sort: str(sp.sort) || "rank",
    page: str(sp.page) ? Number(str(sp.page)) : 1,
    pageSize: 12,
  };
}

// Query params that create a filtered/sorted variant of the listing.
const FILTER_PARAMS = ["search", "stream", "type", "mode", "city", "state", "maxFees", "sort"];

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  const stream = str(sp.stream);
  const city = str(sp.city);
  const page = Math.max(1, Number(str(sp.page)) || 1);
  const titleBits = [stream && cap(stream), "Colleges", city && `in ${cap(city)}`].filter(Boolean).join(" ");
  const meta = await pageMetadata({
    title: `${titleBits || "Explore Colleges in India"} — Fees, Cutoffs & Reviews${page > 1 ? ` — Page ${page}` : ""}`,
    description:
      "Browse and compare colleges in India by stream, city, fees and ranking. View placements, cutoffs, courses and verified student reviews.",
    path: "/colleges",
  });
  // Filtered/sorted variants duplicate the stream/city landing pages: keep them out
  // of the index (links still followed) and point canonical at the main listing.
  const isFiltered = FILTER_PARAMS.some((k) => str(sp[k]) && !(k === "sort" && str(sp[k]) === "rank"));
  if (isFiltered) return { ...meta, robots: { index: false, follow: true } };
  // Pagination: each page is its own canonical URL so deeper colleges stay discoverable.
  if (page > 1) return { ...meta, alternates: { canonical: canonical(`/colleges?page=${page}`) } };
  return meta;
}

export default async function CollegesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const query = toQuery(sp);

  const [collegesRes, streamsRes, citiesRes] = await Promise.allSettled([
    api.colleges(query),
    api.streams(),
    api.cities(),
  ]);

  const data = collegesRes.status === "fulfilled" ? collegesRes.value : { items: [], total: 0, page: 1, totalPages: 1, pageSize: 12 };
  const streams = streamsRes.status === "fulfilled" ? streamsRes.value.items.map((s) => ({ name: s.name, slug: s.slug })) : [];
  const cities = citiesRes.status === "fulfilled" ? citiesRes.value.items.map((c) => ({ name: c.name, slug: c.slug })) : [];

  // Leave defaults out of pagination links so page URLs stay clean: /colleges?page=2.
  const makeHref = (page: number) =>
    `/colleges${buildCollegeQuery({
      ...query,
      sort: query.sort === "rank" ? undefined : query.sort,
      pageSize: undefined,
      page: page > 1 ? page : undefined,
    })}`;

  return (
    <div className="container-site py-8">
      <PageJsonLd path="/colleges" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Colleges", path: "/colleges" }]} />

      <header className="mt-4">
        <PageH1 path="/colleges" className="text-3xl font-extrabold sm:text-4xl">Explore Colleges in India</PageH1>
        <p className="mt-2 text-ink-500">{data.total} colleges match your filters</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[216px_1fr]">
        <Filters streams={streams} cities={cities} />

        <div>
          {data.items.length === 0 ? (
            <div className="card flex flex-col items-center justify-center py-20 text-center">
              <p className="text-4xl">🔍</p>
              <h2 className="mt-4 text-xl">No colleges found</h2>
              <p className="mt-2 text-ink-500">Try clearing some filters to widen your search.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {data.items.map((c) => (
                  <CollegeCard key={c.id} college={c} />
                ))}
              </div>
              <Pagination page={data.page} totalPages={data.totalPages} makeHref={makeHref} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
