import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, getSeoOverride } from "@/lib/seo";

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD. Each crumb's label
// can be overridden per URL in the admin SEO panel ("Breadcrumb label").
export async function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const overrides = await Promise.all(items.map((it) => getSeoOverride(it.path)));
  const crumbs = items.map((it, i) => ({ ...it, name: overrides[i].breadcrumbLabel || it.name }));
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i < crumbs.length - 1 ? (
                <Link href={it.path} className="hover:text-brand-600">
                  {it.name}
                </Link>
              ) : (
                <span className="text-ink-500" aria-current="page">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
