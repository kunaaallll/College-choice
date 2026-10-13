import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api, getEntry } from "@/lib/api";
import { buildMetadata, pageMetadata } from "@/lib/seo";
import { EntryView } from "@/components/EntryView";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { items } = await api.entries("exam");
    return items.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("exam", slug).catch(() => null);
  if (!e) return buildMetadata({ title: "Exam not found", description: "", path: `/exams/${slug}`, noindex: true });
  return pageMetadata({
    title: `${e.title} — Dates, Eligibility, Pattern & Colleges`,
    description: e.summary || `${e.exam?.fullName || e.title}: exam dates, eligibility, pattern, application and accepting colleges.`,
    path: e.path,
    image: e.heroImage || undefined,
  });
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getEntry("exam", slug);
  if (!e) notFound();
  return (
    <EntryView
      e={e}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Exams", path: "/exams" },
        { name: e.exam?.name ?? e.title, path: e.path },
      ]}
    />
  );
}
