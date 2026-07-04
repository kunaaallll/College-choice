import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd, faqJsonLd } from "@/lib/seo";
import { PROGRAMS } from "@/lib/online";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Online Degree Courses & Universities in India 2026 — UGC-DEB Approved",
  description:
    "Compare UGC-DEB approved online universities in India. Online MBA, MCA, BBA, BCA, M.Com & more — fees, approvals (NAAC, AICTE, WES), EMI and admission. 100% online, valid degrees.",
  path: "/online",
});

const TRUST = ["UGC-DEB entitled", "NAAC accredited", "AICTE approved", "WES recognised"];

const FAQS = [
  { question: "Are online degrees valid in India?", answer: "Yes. Degrees from UGC-DEB entitled universities in online mode are treated as equivalent to regular on-campus degrees for jobs, government exams and higher education (UGC notification 2020)." },
  { question: "Is an online MBA good for a career?", answer: "An online MBA from a UGC-DEB approved, NAAC-accredited university is recognised by employers and is ideal for working professionals who want to upskill without leaving their job." },
  { question: "Do online degrees mention 'online' on the certificate?", answer: "Per UGC norms, the degree is equivalent to the on-campus degree. Most universities issue a standard degree certificate without distinguishing the mode." },
  { question: "Can I pay online course fees in EMI?", answer: "Most online universities offer no-cost EMI, letting you pay semester-wise or in monthly instalments." },
];

export default async function OnlinePage() {
  const { items } = await api.colleges({ mode: "Online", sort: "rating", pageSize: 60 }).catch(() => ({ items: [] }));

  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd("Online universities in India", items.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` }))),
          faqJsonLd(FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.35),transparent)]" />
        <div className="container-site relative py-12 sm:py-16">
          <div className="text-white/80">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Online", path: "/online" }]} />
          </div>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold">
            🌐 100% Online · UGC-DEB approved
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Online degrees from India&apos;s top universities
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 sm:text-lg">
            Compare UGC-DEB entitled online universities on fees, approvals, EMI and admission. Earn a
            degree equivalent to on-campus — without leaving your job. 100% free guidance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TRUST.map((t) => (
              <span key={t} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Program quick links */}
      <section className="container-site py-10">
        <h2 className="text-2xl font-extrabold">Popular online programs</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <Link key={p.slug} href={`/online/${p.slug}`} className="card flex items-center justify-between p-4 hover:border-brand-400">
              <span className="font-bold text-ink-900">{p.label}</span>
              <span className="text-brand-600">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Universities */}
      <section className="container-site pb-6">
        <h2 className="text-2xl font-extrabold">Top online universities</h2>
        <p className="mt-2 text-ink-500">{items.length} UGC-DEB approved universities offering online degrees.</p>
        {items.length === 0 ? (
          <p className="mt-8 text-ink-500">No online universities listed yet.</p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="container-site py-12">
        <h2 className="text-2xl font-extrabold">Online degrees — FAQs</h2>
        <div className="mt-5 space-y-3">
          {FAQS.map((f) => (
            <details key={f.question} className="card p-4">
              <summary className="cursor-pointer font-bold text-ink-900">{f.question}</summary>
              <p className="mt-2 text-sm text-ink-500">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
