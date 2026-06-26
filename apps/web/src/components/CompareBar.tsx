"use client";

import Link from "next/link";
import { useSite } from "./site-context";

// Floating bar that appears when colleges are queued for comparison.
export function CompareBar() {
  const { compare, clearCompare } = useSite();
  if (compare.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:rounded-2xl sm:border sm:shadow-pop">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-ink-700">
          {compare.length} {compare.length === 1 ? "college" : "colleges"} to compare
        </p>
        <div className="flex items-center gap-2">
          <button onClick={clearCompare} className="text-sm font-semibold text-ink-400 hover:text-ink-700">
            Clear
          </button>
          <Link href="/compare" className="btn-primary px-4 py-2 text-sm">
            Compare ⇄
          </Link>
        </div>
      </div>
    </div>
  );
}
