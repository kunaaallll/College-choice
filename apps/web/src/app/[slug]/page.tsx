import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api, getEntry } from "@/lib/api";
import { buildMetadata, pageMetadata } from "@/lib/seo";
import { EntryView } from "@/components/EntryView";

// Info / service pages managed in the CMS (e.g. /counselling, /scholarships).
// Fixed routes (/colleges, /about, …) always win over this catch-all.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { items } = await api.entries("page");
    return items.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("page", slug).catch(() => null);
  if (!e) return buildMetadata({ title: "Page not found", description: "", path: `/${slug}`, noindex: true });
  return pageMetadata({ title: e.title, description: e.summary || e.title, path: e.path, image: e.heroImage || undefined });
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getEntry("page", slug);
  if (!e) notFound();
  return <EntryView e={e} crumbs={[{ name: "Home", path: "/" }, { name: e.title, path: e.path }]} />;
}
