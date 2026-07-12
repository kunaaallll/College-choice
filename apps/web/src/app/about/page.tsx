import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "About College Choice — Open, Free College Discovery for India",
  description:
    "College Choice helps millions of Indian students discover, compare and apply to the right colleges — transparently, on open data, and 100% free.",
  path: "/about",
});

const STATS = [
  { value: "13,000+", label: "Colleges listed" },
  { value: "150+", label: "Courses covered" },
  { value: "120+", label: "Exams tracked" },
  { value: "1 Lakh+", label: "Students helped" },
];

const VALUES = [
  { icon: "✔", title: "Verified, open data", body: "Every fee, cutoff, ranking and approval is sourced from public records — NIRF, UGC, AICTE, DCI and UGC-DEB — not scraped or paywalled content." },
  { icon: "⚖", title: "Unbiased by design", body: "No pay-to-rank, ever. Colleges are ordered by outcomes and verified data, so what you see reflects merit — not who paid the most." },
  { icon: "♡", title: "Free for students", body: "Discovery, side-by-side comparison and expert counselling cost you nothing. We make money from institutions, never from students." },
];

const STEPS = [
  { n: "1", title: "Discover", body: "Search 13,000+ colleges by stream, city, fees, ranking and mode (on-campus or online) — then filter down to a shortlist that fits your rank and budget." },
  { n: "2", title: "Compare", body: "Stack up to four colleges side by side on the metrics that matter: fees, placements, cutoffs, accreditation and student ratings." },
  { n: "3", title: "Decide & apply", body: "Read in-depth, tab-by-tab college pages — courses, admissions, placements, scholarships and more — then apply with free guidance from our counsellors." },
];

export default function AboutPage() {
  return (
    <div className="container-site py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      {/* Mission */}
      <section className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-600">About College Choice</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">We make college decisions simpler</h1>
        <p className="mt-4 text-lg text-ink-500">
          Choosing a college is one of the most important — and most confusing — decisions a student
          makes. College Choice exists to fix that. We bring together verified information on
          13,000+ colleges across India so students and parents can compare fees, placements,
          cutoffs and recognition in one place, and decide with confidence rather than guesswork.
        </p>
      </section>

      <dl className="mt-12 grid grid-cols-2 gap-6 rounded-2xl bg-ink-900 p-8 text-white sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <dt className="text-3xl font-extrabold">{s.value}</dt>
            <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
          </div>
        ))}
      </dl>

      {/* What we stand for */}
      <section className="mt-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">What we stand for</h2>
        <p className="mt-2 max-w-2xl text-ink-500">
          Three principles shape every page, ranking and recommendation on College Choice.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-xl text-brand-600">
                {v.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">How College Choice works</h2>
        <p className="mt-2 max-w-2xl text-ink-500">
          From first search to final application, in three simple steps.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-extrabold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data sources */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Where our data comes from</h2>
        <p className="mt-3 text-ink-500">
          We don&apos;t invent numbers. College information is compiled and cross-checked against
          authoritative public sources, including the NIRF rankings (Ministry of Education), UGC and
          UGC-DEB (for university and online-degree recognition), AICTE (technical education), and the
          Dental Council of India / National Dental Commission for dental colleges. Where an exact
          official figure isn&apos;t published — such as branch-wise cutoffs or indicative fees — we
          clearly label it as indicative and encourage students to confirm with the institution.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/colleges" className="btn-primary">Browse colleges</Link>
        <Link href="/news" className="btn-ghost">Read the latest news</Link>
      </div>
    </div>
  );
}
