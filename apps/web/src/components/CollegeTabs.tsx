"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Sticky tab bar linking to the college's detail sub-pages (Info, Courses & Fees,
// Admissions, …). Each tab is its own indexable route.
export function CollegeTabs({ slug, tabs }: { slug: string; tabs: [string, string][] }) {
  const pathname = usePathname();
  const base = `/colleges/${slug}`;

  const hrefFor = (key: string) => (key === "info" ? base : `${base}/${key}`);
  const isActive = (key: string) => (key === "info" ? pathname === base : pathname === `${base}/${key}`);

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
      <nav className="container-site flex gap-1 overflow-x-auto py-2" aria-label="College sections">
        {tabs.map(([key, label]) => (
          <Link
            key={key}
            href={hrefFor(key)}
            className={clsx(
              "whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold",
              isActive(key) ? "bg-brand-600 text-white" : "text-ink-500 hover:bg-brand-50 hover:text-brand-700",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
