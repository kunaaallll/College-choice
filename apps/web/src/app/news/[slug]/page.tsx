import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { NewsArticle } from "@/lib/types";
import { buildMetadata, canonical, SITE } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 1800;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { items } = await api.news();
    return items.map((n) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const { items } = await api.news();
    return items.find((n) => n.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return buildMetadata({ title: "Article not found", description: "", path: `/news/${slug}`, noindex: true });
  return buildMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/news/${a.slug}`,
    image: a.imgUrl || undefined,
    type: "article",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  return (
    <article className="container-site max-w-3xl py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: a.title,
          description: a.excerpt,
          image: a.imgUrl || undefined,
          datePublished: a.date,
          articleSection: a.category,
          mainEntityOfPage: canonical(`/news/${a.slug}`),
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: a.title, path: `/news/${a.slug}` },
        ]}
      />
      <span className="chip mt-4">{a.category}</span>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{a.title}</h1>
      <p className="mt-2 text-sm text-ink-400">{a.date} · {a.readTime}</p>
      {a.imgUrl && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={a.imgUrl} alt={a.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
        </div>
      )}
      <div className="prose mt-6 max-w-none text-ink-500">
        <p className="text-lg leading-relaxed">{a.excerpt}</p>
        {a.body && a.body !== a.excerpt && <p className="mt-4 leading-relaxed">{a.body}</p>}
      </div>
    </article>
  );
}
