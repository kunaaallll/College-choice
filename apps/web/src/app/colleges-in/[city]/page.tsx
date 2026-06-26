import type { Metadata } from "next";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;
export const dynamicParams = true;

const prettify = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export async function generateStaticParams() {
  try {
    const { items } = await api.cities();
    return items.map((c) => ({ city: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const name = prettify(city);
  return buildMetadata({
    title: `Top Colleges in ${name} 2026 — Fees, Courses & Admission`,
    description: `Explore the best colleges in ${name}. Compare fees, placements, cutoffs, courses and reviews. Apply free with expert counselling.`,
    path: `/colleges-in/${city}`,
  });
}

export default async function CityLandingPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const { items } = await api.colleges({ city, pageSize: 24, sort: "rank" });
  const name = items[0]?.city.name || prettify(city);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: name, path: `/colleges-in/${city}` },
  ];

  return (
    <div className="container-site py-8">
      <JsonLd
        data={itemListJsonLd(
          `Colleges in ${name}`,
          items.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` })),
        )}
      />
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Top Colleges in {name}</h1>
        <p className="mt-3 text-ink-500">
          Discover {items.length}+ top-ranked colleges in {name}. Compare fees, placements, courses and
          cutoffs side by side, read verified student reviews, and apply for free with expert counselling —
          all on College Choice.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="mt-10 text-ink-500">No colleges listed for {name} yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CollegeCard key={c.id} college={c} />
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-ink-400">
        Looking elsewhere? Browse <a href="/colleges" className="font-semibold text-brand-600">all colleges in India</a> or
        compare your shortlist on the <a href="/compare" className="font-semibold text-brand-600">compare page</a>.
      </p>
    </div>
  );
}
