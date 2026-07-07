import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { CollegeDetail } from "@/lib/types";
import { buildMetadata, breadcrumbJsonLd, collegeJsonLd, faqJsonLd } from "@/lib/seo";
import { availableTabs, tabSections } from "@/lib/collegeTabs";
import { JsonLd } from "@/components/JsonLd";
import { ReadMore } from "@/components/ReadMore";
import { CollegeHeader } from "@/components/CollegeHeader";
import { CollegeSidebar } from "@/components/CollegeSidebar";
import { SectionList } from "@/components/SectionList";

export const revalidate = 3600;
export const dynamicParams = true; // render unknown slugs on-demand (ISR), then cache

// Pre-render known colleges at build time for instant, indexable pages.
export async function generateStaticParams() {
  try {
    const { items } = await api.collegeSitemap();
    return items.slice(0, 5000).map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

async function getCollege(slug: string): Promise<CollegeDetail | null> {
  try {
    return await api.college(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCollege(slug);
  if (!c) return buildMetadata({ title: "College not found", description: "", path: `/colleges/${slug}`, noindex: true });
  return buildMetadata({
    title: c.metaTitle || `${c.name} — Fees, Admission, Placements & Reviews`,
    description: c.metaDescription || c.about || `${c.name} in ${c.location}: fees, courses, placements and reviews.`,
    path: `/colleges/${c.slug}`,
    image: c.imgUrl || undefined,
    type: "article",
  });
}

const SECTIONS = [
  ["overview", "Overview"],
  ["courses", "Courses & Fees"],
  ["admission", "Admission"],
  ["placements", "Placements"],
  ["reviews", "Reviews"],
  ["faqs", "FAQs"],
] as const;

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCollege(slug);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: c.stream.name, path: `/stream/${c.stream.slug}` },
    { name: c.name, path: `/colleges/${c.slug}` },
  ];

  const isOnline = (c.mode ?? "Campus") !== "Campus";
  const tabs = availableTabs(c);
  const enriched = tabs.length > 1;
  const infoSections = tabSections(c, "info");

  const hasPlacements = !isOnline && (!!c.placement || c.recruiters.length > 0);
  const hasReviews = c.reviews.length > 0;
  const anchorSections = SECTIONS.filter(([id]) =>
    id === "placements"
      ? hasPlacements
      : id === "reviews"
        ? hasReviews
        : id === "courses"
          ? c.courses.length > 0
          : id === "faqs"
            ? c.faqs.length > 0
            : true,
  );

  const admissionSteps = isOnline
    ? [
        { n: 1, title: "Choose your program & university", body: "Pick the online degree that fits your goals. Admission is merit-based — no entrance exam." },
        { n: 2, title: "Fill the online application", body: "Apply on the university's portal with your details and qualifying-degree marksheets." },
        { n: 3, title: "Upload documents & verification", body: "Submit ID, photo and academic documents for a quick eligibility check." },
        { n: 4, title: "Pay fees (EMI available) & start learning", body: "Pay the semester fee — often with no-cost EMI — and get instant access to the LMS." },
      ]
    : [
        { n: 1, title: `Register & appear for ${c.examName || "the entrance exam"}`, body: "Create an account on the official exam portal, fill the form and appear on the scheduled date." },
        { n: 2, title: "Check your result & cutoff", body: "Once results are out, compare your score with last year's closing ranks for this college." },
        { n: 3, title: "Counselling & choice filling", body: "Participate in centralised counselling and lock your preferred branch and college." },
        { n: 4, title: "Document verification & fee payment", body: "Complete verification, pay the admission fee and confirm your seat." },
      ];

  return (
    <>
      <JsonLd
        data={[
          collegeJsonLd({ ...c, reviewsCount: c.reviews.length }),
          breadcrumbJsonLd(crumbs),
          ...(c.faqs.length ? [faqJsonLd(c.faqs)] : []),
        ]}
      />

      <CollegeHeader c={c} tabs={tabs} />

      {/* Anchor nav for colleges without tabbed content */}
      {!enriched && (
        <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
          <nav className="container-site flex gap-1 overflow-x-auto py-2">
            {anchorSections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-500 hover:bg-brand-50 hover:text-brand-700">
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {/* Overview / editorial info content */}
          {enriched && infoSections.length > 0 ? (
            <SectionList sections={infoSections} />
          ) : (
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-2xl">About {c.name}</h2>
              <ReadMore text={c.descriptionLong || c.about || ""} />
            </section>
          )}

          {c.highlights.length > 0 && (
            <section>
              <h2 className="text-2xl">Key Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {c.highlights.map((h) => (
                  <li key={h.id} className="flex gap-2 text-sm text-ink-700">
                    <span className="text-success">✓</span> {h.text}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Legacy single-page blocks (colleges without tabbed content) */}
          {!enriched && c.courses.length > 0 && (
            <section id="courses" className="scroll-mt-32">
              <h2 className="text-2xl">Courses &amp; Fees</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-50/60 text-ink-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Course</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                      <th className="px-4 py-3 font-semibold">Seats</th>
                      <th className="px-4 py-3 font-semibold">Total Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.courses.map((course) => (
                      <tr key={course.id} className="border-t border-line">
                        <td className="px-4 py-3 font-semibold text-ink-900">{course.name}</td>
                        <td className="px-4 py-3 text-ink-500">{course.duration}</td>
                        <td className="px-4 py-3 text-ink-500">{course.seats}</td>
                        <td className="px-4 py-3 font-semibold text-brand-700">{course.feesLabel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {!enriched && (
            <section id="admission" className="scroll-mt-32">
              <h2 className="text-2xl">Admission Process</h2>
              <p className="mt-2 text-ink-500">
                {isOnline
                  ? `Admission to ${c.name}'s online programs is merit-based — no entrance exam required.`
                  : `Admission to ${c.name} is based on ${c.examName || "entrance exam"} scores followed by counselling.`}
              </p>
              <ol className="mt-4 space-y-3">
                {admissionSteps.map((s) => (
                  <li key={s.n} className="card flex gap-4 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-bold text-ink-900">{s.title}</p>
                      <p className="mt-1 text-sm text-ink-500">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {!enriched && hasPlacements && (
            <section id="placements" className="scroll-mt-32">
              <h2 className="text-2xl">Placements</h2>
              {c.placement && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { v: c.placement.avgPackage, l: "Average package" },
                    { v: c.placement.highestPackage, l: "Highest package" },
                    { v: c.placement.placedPct, l: "Students placed" },
                  ].map((p) => (
                    <div key={p.l} className="card p-4 text-center">
                      <p className="text-xl font-extrabold text-brand-700">{p.v}</p>
                      <p className="mt-1 text-xs text-ink-400">{p.l}</p>
                    </div>
                  ))}
                </div>
              )}
              {c.recruiters.length > 0 && (
                <>
                  <h3 className="mt-6 text-lg">Top recruiters</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.recruiters.map((r) => (
                      <span key={r} className="chip">{r}</span>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

          {hasReviews && (
            <section id="reviews" className="scroll-mt-32">
              <h2 className="text-2xl">Student Reviews</h2>
              <div className="mt-4 space-y-4">
                {c.reviews.map((r) => (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: r.color }}>
                        {r.initial}
                      </span>
                      <div>
                        <p className="font-bold text-ink-900">{r.authorName}</p>
                        <p className="text-xs text-ink-400">{r.meta}</p>
                      </div>
                      <span className="ml-auto font-bold text-warn">★ {r.stars.toFixed(1)}</span>
                    </div>
                    <p className="mt-3 text-sm text-ink-500">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {c.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-32">
              <h2 className="text-2xl">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {c.faqs.map((f) => (
                  <details key={f.id} className="card p-4">
                    <summary className="cursor-pointer font-bold text-ink-900">{f.question}</summary>
                    <p className="mt-2 text-sm text-ink-500">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        <CollegeSidebar c={c} />
      </div>
    </>
  );
}
