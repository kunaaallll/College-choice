import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import type { CollegeCard as TCollege } from "@/lib/types";
import { JsonLd } from "@/components/JsonLd";
import { PredictorCTA } from "@/components/PredictorCTA";
import { StateSelect } from "@/components/StateSelect";
import { Collapsible } from "@/components/Collapsible";
import { streamContent } from "@/lib/streamContent";

export const revalidate = 3600;
export const dynamicParams = true;

// Major states used for the "filter by state" sidebar (deep-links into /colleges).
const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const TYPES = [
  ["Public", "Government"],
  ["Private", "Private"],
  ["Deemed", "Deemed"],
] as const;

const prettify = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

// Sprinkle featured colleges into the list at random 3–4 gaps, in random order,
// so featured colleges are treated equally and none is always on top.
function interleaveFeatured(base: TCollege[], featured: TCollege[]): TCollege[] {
  const shuffled = [...featured].sort(() => Math.random() - 0.5);
  const out: TCollege[] = [];
  let fi = 0;
  let since = 0;
  let gap = 3 + Math.floor(Math.random() * 2); // 3 or 4
  for (const c of base) {
    out.push(c);
    if (++since >= gap && fi < shuffled.length) {
      out.push(shuffled[fi++]);
      since = 0;
      gap = 3 + Math.floor(Math.random() * 2);
    }
  }
  while (fi < shuffled.length) out.push(shuffled[fi++]);
  return out;
}

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
  const [collegesRes, streamsRes, featuredRes] = await Promise.allSettled([
    api.colleges({ stream, pageSize: 24, sort: "rank" }),
    api.streams(),
    api.colleges({ stream, featured: true, pageSize: 6, sort: "rank" }),
  ]);

  const allItems = collegesRes.status === "fulfilled" ? collegesRes.value.items : [];
  const featured = featuredRes.status === "fulfilled" ? featuredRes.value.items : [];
  const featuredSlugs = new Set(featured.map((c) => c.slug));
  const base = allItems.filter((c) => !featuredSlugs.has(c.slug)); // featured handled below
  const listed = interleaveFeatured(base, featured); // featured sprinkled in randomly
  const meta = streamsRes.status === "fulfilled" ? streamsRes.value.items.find((s) => s.slug === stream) : undefined;
  const name = meta?.name || allItems[0]?.stream.name || prettify(stream);
  const content = streamContent(stream);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: `${name} Colleges`, path: `/stream/${stream}` },
  ];

  const faqs = [
    {
      q: `How many ${name} colleges are there in India?`,
      a: `India has hundreds of ${name.toLowerCase()} colleges — from government institutes to private and deemed universities. Use the state, type and fees filters to narrow the list to what fits you.`,
    },
    {
      q: `What is the average fee for ${name} colleges?`,
      a: meta?.avgFees
        ? `Typical ${name.toLowerCase()} programmes cost around ${meta.avgFees}, though fees vary by college, ownership and city.`
        : `Fees vary widely by college, ownership and city. Check each college page for exact figures.`,
    },
    {
      q: `Which entrance exam is required for ${name} admission?`,
      a: meta?.examName
        ? `Most ${name.toLowerCase()} colleges admit through ${meta.examName}, though some accept state or institute-level exams.`
        : `Admission is through national, state or institute-level entrance exams depending on the college.`,
    },
    {
      q: `How do I shortlist the right ${name} college for me?`,
      a: `Use the College Predictor above for a personalised shortlist based on your rank, budget and preferred state — or add colleges to compare them side by side.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container-site py-8">
      <JsonLd
        data={itemListJsonLd(
          `${name} colleges in India`,
          listed.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` })),
        )}
      />
      <JsonLd data={faqJsonLd} />
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Best {name} Colleges in India 2026</h1>
        <p className="mt-3 text-ink-500">
          {meta?.description || `Explore top ${name.toLowerCase()} colleges in India.`}{" "}
          Compare {listed.length}+ institutions on fees, placements, cutoffs and reviews
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

      {/* Course details — at the top, collapsed behind Read more */}
      {content && (
        <section className="mt-6 max-w-3xl">
          <Collapsible previewHeight={190}>
            <h2 className="text-2xl font-extrabold">About {name} courses in India</h2>
            {content.overview.map((p, i) => (
              <p key={i} className="mt-3 text-ink-500">{p}</p>
            ))}
            <div className="mt-6">
              <h3 className="text-lg font-extrabold">Popular {name} specialisations</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.specializations.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold">Eligibility &amp; admission</h3>
              <p className="mt-2 text-ink-500">{content.eligibility}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold">Career scope &amp; top recruiters</h3>
              <p className="mt-2 text-ink-500">{content.scope}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="card p-4">
                  <p className="text-[13px] font-bold text-ink-700">Career paths</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-600">
                    {content.careers.map((c) => (
                      <li key={c} className="flex gap-2"><span className="text-brand-600">›</span> {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="card p-4">
                  <p className="text-[13px] font-bold text-ink-700">Top recruiters</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {content.recruiters.map((r) => (
                      <span key={r} className="rounded-lg bg-brand-50 px-2 py-1 text-[12.5px] font-semibold text-brand-700">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Collapsible>
        </section>
      )}

      {/* College predictor */}
      <div className="mt-6">
        <PredictorCTA course={name} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[264px_1fr]">
        {/* Filter sidebar */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-20">
          <div className="card p-5">
            <h2 className="text-base font-bold">Filter {name} colleges</h2>

            <label className="mt-4 block">
              <span className="text-[13px] font-bold text-ink-700">By state</span>
              <StateSelect stream={stream} states={STATES} />
            </label>

            <p className="mt-5 text-[13px] font-bold text-ink-700">By type</p>
            <div className="mt-2 grid gap-1.5">
              {TYPES.map(([val, label]) => (
                <Link
                  key={val}
                  href={`/colleges?stream=${stream}&type=${val}`}
                  className="rounded-lg border border-line px-3 py-2 text-[13px] font-semibold text-ink-500 hover:border-brand-400 hover:text-brand-700"
                >
                  {label} colleges
                </Link>
              ))}
            </div>

            <Link
              href={`/colleges?stream=${stream}`}
              className="btn-primary mt-5 block w-full py-2 text-center text-sm"
            >
              All filters & fees →
            </Link>
          </div>
        </aside>

        {/* Colleges + content */}
        <div>
          {listed.length > 0 ? (
            <>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-xl font-extrabold sm:text-2xl">Top {name} colleges</h2>
                <Link href={`/colleges?stream=${stream}`} className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  View all →
                </Link>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {listed.map((c) => (
                  <CollegeCard key={c.id} college={c} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-ink-500">No {name} colleges listed yet.</p>
          )}

          {/* FAQ */}
          <section className="mt-10 max-w-3xl">
            <h2 className="text-2xl font-extrabold">Frequently asked questions</h2>
            <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group p-4">
                  <summary className="cursor-pointer list-none font-semibold text-ink-900 marker:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {f.q}
                      <span className="text-brand-600 transition group-open:rotate-45">＋</span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-ink-500">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
