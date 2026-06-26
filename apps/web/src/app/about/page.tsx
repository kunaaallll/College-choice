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
  { value: "2M+", label: "Students helped" },
  { value: "4,200+", label: "Colleges listed" },
  { value: "120+", label: "Exams tracked" },
  { value: "98%", label: "Would recommend" },
];

const VALUES = [
  { icon: "✔", title: "Verified, open data", body: "We build on public records (NIRF, AICTE, UGC) — not scraped, paywalled content." },
  { icon: "⚖", title: "Unbiased by design", body: "No pay-to-rank. Colleges are ordered by outcomes, not ad budgets." },
  { icon: "♡", title: "Free for students", body: "Discovery, comparison and counselling cost you nothing. Ever." },
];

export default function AboutPage() {
  return (
    <div className="container-site py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <section className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-5xl">We make college decisions simpler</h1>
        <p className="mt-4 text-lg text-ink-500">
          College Choice helps millions of Indian students discover, compare and apply to the right
          colleges — transparently and for free. We&apos;re an open-source platform built on public,
          verifiable data so every student gets the full picture.
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

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-xl text-brand-600">
              {v.icon}
            </div>
            <h2 className="mt-4 text-lg">{v.title}</h2>
            <p className="mt-2 text-sm text-ink-500">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/colleges" className="btn-primary">Browse colleges</Link>
        <Link href="/news" className="btn-ghost">Read the latest news</Link>
      </div>
    </div>
  );
}
