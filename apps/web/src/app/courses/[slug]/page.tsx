import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api, getEntry } from "@/lib/api";
import { buildMetadata, pageMetadata } from "@/lib/seo";
import { EntryView } from "@/components/EntryView";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { items } = await api.entries("course");
    return items.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("course", slug).catch(() => null);
  if (!e) return buildMetadata({ title: "Course not found", description: "", path: `/courses/${slug}`, noindex: true });
  return pageMetadata({
    title: `${e.title} — Eligibility, Fees, Duration & Colleges`,
    description: e.summary || `${e.title}: eligibility, duration, fees, admission and the colleges that offer it.`,
    path: e.path,
    image: e.heroImage || undefined,
  });
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getEntry("course", slug);
  if (!e) notFound();
  return (
    <EntryView
      e={e}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses" },
        ...(e.stream ? [{ name: e.stream.name, path: `/stream/${e.stream.slug}` }] : []),
        { name: e.title, path: e.path },
      ]}
    />
  );
}
