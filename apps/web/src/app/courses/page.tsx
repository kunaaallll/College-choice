import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageJsonLd } from "@/components/JsonLd";
import { PosterAd } from "@/components/PosterAd";
import { PageH1 } from "@/components/ContentBlocks";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Courses & Streams in India — Degrees, Eligibility & Fees",
    description:
      "Explore courses and streams in India — Engineering, Medical, Management, Law, Commerce and more. Degrees, eligibility, average fees and top colleges.",
    path: "/courses",
  });
}

// Streams hidden from the courses listing.
const HIDDEN_STREAMS = new Set(["design"]);

export default async function CoursesPage() {
  const [{ items }, { items: courses }] = await Promise.all([
    api.streams().catch(() => ({ items: [] })),
    api.entries("course").catch(() => ({ items: [] })),
  ]);
  const streams = items.filter((s) => !HIDDEN_STREAMS.has(s.slug));

  return (
    <div className="container-site py-8">
      <PageJsonLd path="/courses" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }]} />

      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <PosterAd />
        <div className="min-w-0 flex-1">
          <header className="max-w-3xl">
            <PageH1 path="/courses" className="text-3xl font-extrabold sm:text-4xl">Courses &amp; Streams</PageH1>
            <p className="mt-3 text-ink-500">
              Pick a stream to explore degrees, eligibility, fees and career paths, then dive into the top
              colleges for it.
            </p>
          </header>

          {courses.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-extrabold">Popular courses</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((c) => (
                  <Link key={c.id} href={c.path} className="card p-5 hover:border-brand-400">
                    <h3 className="font-bold text-ink-900">{c.title}</h3>
                    {c.summary && <p className="mt-2 line-clamp-2 text-sm text-ink-500">{c.summary}</p>}
                    <p className="mt-3 flex flex-wrap gap-2 text-xs">
                      {typeof c.data?.level === "string" && c.data.level && <span className="chip">{c.data.level}</span>}
                      {typeof c.data?.duration === "string" && c.data.duration && <span className="chip">{c.data.duration}</span>}
                    </p>
                  </Link>
                ))}
              </div>
              <h2 className="mt-10 text-xl font-extrabold">Streams</h2>
            </section>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </div>
  );
}
