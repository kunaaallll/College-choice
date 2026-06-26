import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Courses & Streams in India — Degrees, Eligibility & Fees",
  description:
    "Explore courses and streams in India — Engineering, Medical, Management, Law, Commerce and more. Degrees, eligibility, average fees and top colleges.",
  path: "/courses",
});

export default async function CoursesPage() {
  const { items: streams } = await api.streams().catch(() => ({ items: [] }));

  return (
    <div className="container-site py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }]} />
      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Courses &amp; Streams</h1>
        <p className="mt-3 text-ink-500">
          Pick a stream to explore degrees, eligibility, fees and career paths, then dive into the top
          colleges for it.
        </p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {streams.map((s) => (
          <Link key={s.slug} href={`/stream/${s.slug}`} className="card p-6 hover:border-brand-400">
            <div className="flex items-center gap-3">
              <span className="badge-grad h-12 w-12 text-base" style={{ background: s.colorGradient }}>
                {s.initial}
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink-900">{s.name}</h2>
                <p className="text-xs text-ink-400">{s.collegeCount} colleges</p>
              </div>
            </div>
            {s.description && <p className="mt-4 text-sm text-ink-500">{s.description}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {s.degrees.map((d) => (
                <span key={d} className="chip">{d}</span>
              ))}
            </div>
            {s.avgFees && <p className="mt-4 text-sm font-semibold text-brand-700">Avg fees · {s.avgFees}</p>}
            <p className="mt-4 text-sm font-semibold text-brand-600">Explore colleges →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
