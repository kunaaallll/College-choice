import Link from "next/link";
import clsx from "clsx";

// Server-rendered, link-based pagination (good for SEO crawlability).
export function Pagination({
  page,
  totalPages,
  makeHref,
}: {
  page: number;
  totalPages: number;
  makeHref: (p: number) => string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2,
  );

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      {page > 1 && (
        <Link href={makeHref(page - 1)} className="rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:border-brand-400">
          ←
        </Link>
      )}
      {pages.map((p, i) => {
        const gap = i > 0 && p - pages[i - 1] > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {gap && <span className="px-1 text-ink-400">…</span>}
            <Link
              href={makeHref(p)}
              aria-current={p === page ? "page" : undefined}
              className={clsx(
                "rounded-lg border px-3.5 py-2 text-sm font-semibold",
                p === page ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink-700 hover:border-brand-400",
              )}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < totalPages && (
        <Link href={makeHref(page + 1)} className="rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:border-brand-400">
          →
        </Link>
      )}
    </nav>
  );
}
