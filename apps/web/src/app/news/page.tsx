import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: "Education News & Admission Updates 2026",
  description:
    "Latest admission alerts, exam updates, counselling guides, scholarships and rankings for students in India.",
  path: "/news",
});

export default async function NewsPage() {
  const { items: news } = await api.news().catch(() => ({ items: [] }));

  return (
    <div className="container-site py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "News", path: "/news" }]} />
      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">News &amp; Articles</h1>
        <p className="mt-3 text-ink-500">Admission alerts, exam updates and expert guides.</p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}`} className="card overflow-hidden hover:border-brand-400">
            {n.imgUrl && (
              <div className="relative aspect-[16/9]">
                <Image src={n.imgUrl} alt={n.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              </div>
            )}
            <div className="p-5">
              <span className="chip">{n.category}</span>
              <h2 className="mt-2 text-lg font-bold leading-snug">{n.title}</h2>
              <p className="mt-2 text-sm text-ink-500">{n.excerpt}</p>
              <p className="mt-3 text-xs text-ink-400">{n.date} · {n.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
