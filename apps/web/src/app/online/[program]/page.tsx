import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { PROGRAMS, programBySlug } from "@/lib/online";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;
export const dynamicParams = false; // only the known program slugs

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ program: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ program: string }> }): Promise<Metadata> {
  const { program } = await params;
  const p = programBySlug(program);
  if (!p) return buildMetadata({ title: "Program not found", description: "", path: `/online/${program}`, noindex: true });
  return buildMetadata({
    title: `${p.label} — Best Universities, Fees & Admission 2026`,
    description: `Compare ${p.label} (${p.full}) from UGC-DEB approved universities in India. Fees, approvals, EMI, duration and admission. 100% online, valid degree.`,
    path: `/online/${p.slug}`,
  });
}

export default async function OnlineProgramPage({ params }: { params: Promise<{ program: string }> }) {
  const { program } = await params;
  const p = programBySlug(program);
  if (!p) notFound();

  const { items } = await api
    .colleges({ mode: "Online", program: p.term, sort: "rating", pageSize: 24 })
    .catch(() => ({ items: [] }));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Online", path: "/online" },
    { name: p.label, path: `/online/${p.slug}` },
  ];

  return (
    <div className="container-site py-8">
      <JsonLd data={itemListJsonLd(`${p.label} universities`, items.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` })))} />
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{p.label} in India</h1>
        <p className="mt-3 text-ink-500">
          Compare {items.length}+ UGC-DEB approved universities offering an {p.label} ({p.full}). See
          fees, approvals (NAAC, AICTE, WES), EMI options, duration and admission — and apply free with
          expert guidance. A {p.label} is 100% online and equivalent to an on-campus degree.
        </p>
      </header>

      {/* sibling programs */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {PROGRAMS.map((sp) => (
          <Link
            key={sp.slug}
            href={`/online/${sp.slug}`}
            className={`chip ${sp.slug === p.slug ? "border-brand-600 bg-brand-600 text-white" : "hover:border-brand-400"}`}
          >
            {sp.label}
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <p className="mt-10 text-ink-500">No universities listed for {p.label} yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CollegeCard key={c.id} college={c} />
          ))}
        </div>
      )}
    </div>
  );
}
