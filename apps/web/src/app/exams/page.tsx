import type { Metadata } from "next";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Entrance Exams 2026 — Dates, Eligibility & Accepting Colleges",
  description:
    "Entrance exams in India 2026: JEE Main, NEET, CUET, CAT, CLAT and more. Exam dates, mode, eligibility and the colleges that accept each exam.",
  path: "/exams",
});

export default async function ExamsPage() {
  const { items: exams } = await api.exams().catch(() => ({ items: [] }));

  return (
    <div className="container-site py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Exams", path: "/exams" }]} />
      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Entrance Exams 2026</h1>
        <p className="mt-3 text-ink-500">Dates, eligibility and accepted colleges for every major exam.</p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((ex) => (
          <article key={ex.slug} className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink-900">{ex.name}</h2>
              <span className="chip">{ex.level}</span>
            </div>
            <p className="mt-1 text-sm text-ink-400">{ex.fullName}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-ink-400">Exam date</dt>
                <dd className="font-semibold text-brand-700">{ex.date}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-400">Mode</dt>
                <dd className="font-semibold text-ink-900">{ex.mode}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-400">For stream</dt>
                <dd className="font-semibold text-ink-900">{ex.stream}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
