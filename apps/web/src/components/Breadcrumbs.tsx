import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i < items.length - 1 ? (
                <Link href={it.path} className="hover:text-brand-600">
                  {it.name}
                </Link>
              ) : (
                <span className="text-ink-500">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
