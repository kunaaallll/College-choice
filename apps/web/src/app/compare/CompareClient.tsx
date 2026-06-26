"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { CollegeCard } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { useSite } from "@/components/site-context";

const ROWS: { label: string; get: (c: CollegeCard) => string }[] = [
  { label: "Rank", get: (c) => (c.rank != null ? `#${c.rank}` : orNA(null)) },
  { label: "Rating", get: (c) => stars(c.rating) },
  { label: "Total Fees", get: (c) => orNA(c.feesLabel) },
  { label: "Avg Package", get: (c) => orNA(c.packageLabel) },
  { label: "Type", get: (c) => orNA(c.type) },
  { label: "Stream", get: (c) => c.stream.name },
  { label: "Exam", get: (c) => orNA(c.examName) },
  { label: "Established", get: (c) => orNA(c.estd) },
  { label: "Location", get: (c) => c.location },
];

export function CompareClient() {
  const { compare, toggleCompare } = useSite();
  const [items, setItems] = useState<CollegeCard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (compare.length === 0) {
      setItems([]);
      return;
    }
    setLoading(true);
    api
      .compare(compare)
      .then((res) => active && setItems(res.items))
      .catch(() => active && setItems([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [compare]);

  if (compare.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl">⇄</p>
        <h2 className="mt-4 text-xl">Nothing to compare yet</h2>
        <p className="mt-2 text-ink-500">Add colleges from the listing to compare them here.</p>
        <Link href="/colleges" className="btn-primary mt-6">
          Browse colleges
        </Link>
      </div>
    );
  }

  // Keep DB order consistent with the compare list order.
  const ordered = compare.map((slug) => items.find((c) => c.slug === slug)).filter(Boolean) as CollegeCard[];

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-32 p-3" />
            {ordered.map((c) => (
              <th key={c.slug} className="card p-4 align-top">
                <div className="text-left">
                  <Link href={`/colleges/${c.slug}`} className="font-bold text-ink-900 hover:text-brand-600">
                    {c.name}
                  </Link>
                  <button
                    onClick={() => toggleCompare(c.slug)}
                    className="mt-2 block text-xs font-semibold text-danger"
                  >
                    Remove
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-line">
              <td className="p-3 text-sm font-semibold text-ink-400">{row.label}</td>
              {ordered.map((c) => (
                <td key={c.slug} className="p-3 text-center text-sm font-semibold text-ink-900">
                  {row.get(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="mt-4 text-sm text-ink-400">Loading…</p>}
      {compare.length < 4 && (
        <Link href="/colleges" className="mt-6 inline-block text-sm font-semibold text-brand-600">
          + Add more colleges
        </Link>
      )}
    </div>
  );
}
