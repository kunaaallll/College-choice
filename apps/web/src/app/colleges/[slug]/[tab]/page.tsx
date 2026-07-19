import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { api } from "@/lib/api";
import { CollegeDetail } from "@/lib/types";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { availableTabs, isTabKey, TAB_LABEL, tabMeta, tabSections } from "@/lib/collegeTabs";
import { JsonLd } from "@/components/JsonLd";
import { CollegeHeader } from "@/components/CollegeHeader";
import { CollegeSidebar } from "@/components/CollegeSidebar";
import { SectionList } from "@/components/SectionList";
import { CutoffDownloadTable } from "@/components/CutoffDownloadTable";
import { SampleDegreeReveal } from "@/components/SampleDegreeReveal";

// Tabbed college detail sub-pages: /colleges/[slug]/courses-fees, /admissions,
// /placements, /cutoffs, /scholarships, /rankings, /hostel — each an indexable
// page (KollegeApply-style). Rendered on demand + cached (ISR).
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

async function getCollege(slug: string): Promise<CollegeDetail | null> {
  try {
    return await api.college(slug);
  } catch {
    return null;
  }
}

interface Params {
  params: Promise<{ slug: string; tab: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, tab } = await params;
  if (!isTabKey(tab) || tab === "info") return {};
  const c = await getCollege(slug);
  if (!c) return buildMetadata({ title: "College not found", description: "", path: `/colleges/${slug}`, noindex: true });
  const meta = tabMeta(c.name, tab);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/colleges/${c.slug}/${tab}`,
    image: c.imgUrl || undefined,
    type: "article",
  });
}

export default async function CollegeTabPage({ params }: Params) {
  const { slug, tab } = await params;
  if (!isTabKey(tab) || tab === "info") notFound();

  const c = await getCollege(slug);
  if (!c) notFound();

  const sections = tabSections(c, tab);
  // No editorial content for this tab yet → send visitors to the main page.
  if (sections.length === 0) redirect(`/colleges/${slug}`);

  const tabs = availableTabs(c);
  const label = TAB_LABEL[tab];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: c.name, path: `/colleges/${c.slug}` },
    { name: label, path: `/colleges/${c.slug}/${tab}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <CollegeHeader c={c} tabs={tabs} />

      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {/* Year x round PDF cutoff downloads at the top of the Cutoffs section */}
          {tab === "cutoffs" && <CutoffDownloadTable collegeName={c.name} collegeId={c.id} />}

          <SectionList sections={sections} />

          {/* Structured extras per tab */}
          {tab === "courses-fees" && c.courses.length > 0 && (
            <section>
              <h2 className="text-xl font-extrabold sm:text-2xl">Courses at a glance</h2>
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

          {tab === "placements" && c.sampleDegreeUrl && (
            <SampleDegreeReveal imageUrl={c.sampleDegreeUrl} collegeName={c.name} />
          )}

          {tab === "placements" && c.placement && (
            <section>
              <h2 className="text-xl font-extrabold sm:text-2xl">Placement snapshot</h2>
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
        </div>

        <CollegeSidebar c={c} />
      </div>
    </>
  );
}
