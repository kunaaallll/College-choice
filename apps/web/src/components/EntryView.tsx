import Image from "next/image";
import type { CollegeCard as CollegeCardT, EntryDetail } from "@/lib/types";
import { canonical, faqJsonLd, SITE } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { CollegeCard } from "./CollegeCard";
import { CtaBlocks, FaqList, PageH1, RelatedLinks, RichContent, type CtaBlock } from "./ContentBlocks";
import { PageJsonLd } from "./JsonLd";
import { EnquiryButton } from "./EnquiryButton";

const COURSE_FACTS: [string, string][] = [
  ["level", "Level"], ["duration", "Duration"], ["mode", "Mode"], ["fees", "Fees"], ["eligibility", "Eligibility"], ["admission", "Admission"], ["careers", "Careers"],
];
const EXAM_FACTS: [string, string][] = [
  ["examStatus", "Status"], ["conductingBody", "Conducted by"], ["applicationWindow", "Application window"], ["resultDate", "Result"],
  ["fee", "Application fee"], ["eligibility", "Eligibility"], ["pattern", "Exam pattern"],
];

function CollegeGrid({ title, colleges }: { title: string; colleges: CollegeCardT[] }) {
  if (!colleges.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {colleges.map((c) => <CollegeCard key={c.id} college={c} />)}
      </div>
    </section>
  );
}

/** Course, exam and info/service pages. */
export function EntryView({ e, crumbs }: { e: EntryDetail; crumbs: { name: string; path: string }[] }) {
  const data = (e.data ?? {}) as Record<string, unknown>;
  const faqs = e.faqs ?? [];
  const facts: [string, string][] =
    e.type === "COURSE"
      ? COURSE_FACTS.filter(([k]) => data[k]).map(([k, label]) => [label, String(data[k])])
      : e.type === "EXAM"
        ? [
            ...(e.exam ? ([["Exam", e.exam.fullName || e.exam.name], ["Exam date", e.exam.date], ["Mode", e.exam.mode], ["Level", e.exam.level]] as [string, string][]) : []),
            ...EXAM_FACTS.filter(([k]) => data[k]).map(([k, label]) => [label, String(data[k])] as [string, string]),
          ].filter(([, v]) => v)
        : [];
  const website = e.type === "EXAM" && typeof data.officialWebsite === "string" ? data.officialWebsite : null;

  const schema: object[] = [];
  if (e.type === "COURSE") {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: e.title,
      description: e.summary || undefined,
      url: canonical(e.path),
      provider: { "@type": "Organization", name: SITE.name, sameAs: SITE.url },
      ...(data.duration ? { timeRequired: String(data.duration) } : {}),
      ...(data.level ? { educationalLevel: String(data.level) } : {}),
    });
  } else {
    schema.push({ "@context": "https://schema.org", "@type": "WebPage", name: e.title, description: e.summary || undefined, url: canonical(e.path), dateModified: e.updatedAt });
  }
  if (faqs.length) schema.push(faqJsonLd(faqs));

  return (
    <article className="container-site py-8">
      <PageJsonLd path={e.path} data={schema} />
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 max-w-3xl">
        {e.category && <span className="chip">{e.category.name}</span>}
        <PageH1 path={e.path} className="mt-3 text-3xl font-extrabold sm:text-4xl">{e.title}</PageH1>
        {e.summary && <p className="mt-3 text-lg text-ink-500">{e.summary}</p>}
      </header>

      {e.heroImage && (
        <div className="relative mt-6 aspect-[21/9] max-w-4xl overflow-hidden rounded-2xl bg-line">
          <Image src={e.heroImage} alt={e.heroAlt || e.title} fill sizes="(max-width:768px) 100vw, 896px" className="object-cover" priority />
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <RichContent html={e.body} />
          <CtaBlocks blocks={Array.isArray(data.blocks) ? (data.blocks as CtaBlock[]) : []} />
          <FaqList faqs={faqs} />
        </div>
        {(facts.length > 0 || website || e.type !== "PAGE") && (
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {e.type !== "PAGE" && (
              <div className="card p-5">
                <p className="font-bold text-ink-900">{e.type === "COURSE" ? "Want this course?" : `Preparing for ${e.exam?.name ?? "this exam"}?`}</p>
                <p className="mt-1 text-sm text-ink-500">Get a free shortlist of colleges for your rank and budget from our counsellors.</p>
                <EnquiryButton
                  label="Get free counselling"
                  heading={e.type === "COURSE" ? `Admission help for ${e.title}` : `Colleges for your ${e.exam?.name ?? e.title} score`}
                  options={e.type === "COURSE" ? { source: "course", course: String(data.collegeMatch || e.title) } : { source: "exam", exam: e.exam?.name ?? e.title }}
                  className="btn-primary mt-3 w-full"
                />
              </div>
            )}
            {(facts.length > 0 || website) && <dl className="card space-y-3 p-5 text-sm">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</dt>
                  <dd className="mt-0.5 font-semibold text-ink-900">{value}</dd>
                </div>
              ))}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="block font-semibold text-brand-600 hover:underline">Official website ↗</a>
              )}
            </dl>}
          </aside>
        )}
      </div>

      <CollegeGrid title={`Colleges accepting ${e.exam?.name ?? "this exam"}`} colleges={e.examColleges} />
      <CollegeGrid title={`Colleges offering ${String(data.collegeMatch || e.title)}`} colleges={e.offeringColleges} />
      <CollegeGrid title="Related colleges" colleges={e.relatedColleges} />
      <RelatedLinks title="Related courses & exams" items={e.relatedEntries.map((r) => ({ href: r.path, label: r.title, sub: r.summary }))} />
      <RelatedLinks title="Related articles" items={e.relatedNews.map((n) => ({ href: `/news/${n.slug}`, label: n.title, sub: n.excerpt }))} />
      {e.tags.length > 0 && (
        <p className="mt-10 flex flex-wrap gap-2 text-sm">
          {e.tags.map((t) => <span key={t.slug} className="chip">#{t.name}</span>)}
        </p>
      )}
    </article>
  );
}
