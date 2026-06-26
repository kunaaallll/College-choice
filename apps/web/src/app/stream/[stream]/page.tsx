import type { Metadata } from "next";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;
export const dynamicParams = true;

const prettify = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export async function generateStaticParams() {
  try {
    const { items } = await api.streams();
    return items.map((s) => ({ stream: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const name = prettify(stream);
  return buildMetadata({
    title: `Best ${name} Colleges in India 2026 — Fees, Ranking & Placements`,
    description: `Top ${name} colleges in India ranked by placements, fees and reviews. Compare cutoffs, courses and admission, and apply free.`,
    path: `/stream/${stream}`,
  });
}

export default async function StreamLandingPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  const [collegesRes, streamsRes] = await Promise.allSettled([
    api.colleges({ stream, pageSize: 24, sort: "rank" }),
    api.streams(),
  ]);

  const items = collegesRes.status === "fulfilled" ? collegesRes.value.items : [];
  const meta = streamsRes.status === "fulfilled" ? streamsRes.value.items.find((s) => s.slug === stream) : undefined;
  const name = meta?.name || items[0]?.stream.name || prettify(stream);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: `${name} Colleges`, path: `/stream/${stream}` },
  ];

  return (
    <div className="container-site py-8">
      <JsonLd
        data={itemListJsonLd(
          `${name} colleges in India`,
          items.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` })),
        )}
      />
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Best {name} Colleges in India</h1>
        <p className="mt-3 text-ink-500">
          {meta?.description ||
            `Explore top ${name.toLowerCase()} colleges in India.`}{" "}
          Compare {items.length}+ institutions on fees, placements, cutoffs and reviews
          {meta?.examName ? `, with admissions via ${meta.examName}` : ""}. Apply free with expert counselling.
        </p>
        {meta && meta.degrees.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.degrees.map((d) => (
              <span key={d} className="chip">{d}</span>
            ))}
            {meta.avgFees && <span className="chip">Avg fees · {meta.avgFees}</span>}
          </div>
        )}
      </header>

      {items.length === 0 ? (
        <p className="mt-10 text-ink-500">No {name} colleges listed yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CollegeCard key={c.id} college={c} />
          ))}
        </div>
      )}
    </div>
  );
}
