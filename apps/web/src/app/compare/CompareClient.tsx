"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { api } from "@/lib/api";
import type { CollegeCard } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { useSite } from "@/components/site-context";

type Best = "min" | "max" | null;

const ROWS: { label: string; get: (c: CollegeCard) => string; num?: (c: CollegeCard) => number | null; best?: Best }[] = [
  { label: "Rank", get: (c) => (c.rank != null ? `#${c.rank}` : orNA(null)), num: (c) => c.rank, best: "min" },
  { label: "Rating", get: (c) => stars(c.rating), num: (c) => c.rating, best: "max" },
  { label: "Total Fees", get: (c) => orNA(c.feesLabel), num: (c) => c.feesNum, best: "min" },
  { label: "Avg Package", get: (c) => orNA(c.packageLabel) },
  { label: "Type", get: (c) => orNA(c.type) },
  { label: "Stream", get: (c) => c.stream.name },
  { label: "Exam", get: (c) => orNA(c.examName) },
  { label: "Established", get: (c) => orNA(c.estd) },
  { label: "Location", get: (c) => c.location },
];

// Which college wins a numeric row (only when 2+ have a value, else no "best").
function bestId(ordered: CollegeCard[], num: (c: CollegeCard) => number | null, dir: Best): number | null {
  if (!dir) return null;
  const vals = ordered
    .map((c) => ({ id: c.id, v: num(c) }))
    .filter((x): x is { id: number; v: number } => x.v != null);
  if (vals.length < 2) return null;
  return vals.reduce((a, b) => (dir === "min" ? (b.v < a.v ? b : a) : (b.v > a.v ? b : a))).id;
}

export function CompareClient() {
  const { compare, toggleCompare, openApply } = useSite();
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
        <p className="mt-2 text-ink-500">Add colleges from the listing to stack them up here.</p>
        <Link href="/colleges" className="btn-primary mt-6">
          Browse colleges
        </Link>
      </div>
    );
  }

  // Keep column order consistent with the compare list.
  const ordered = compare.map((slug) => items.find((c) => c.slug === slug)).filter(Boolean) as CollegeCard[];
  const cols = ordered.length || compare.length;

  return (
    <div className="mt-8 overflow-x-auto pb-2">
      <div
        className="grid min-w-[640px] gap-3"
        style={{ gridTemplateColumns: `140px repeat(${cols}, minmax(180px, 1fr))` }}
      >
        {/* Header row */}
        <div className="sticky left-0 z-10 bg-white" />
        {ordered.map((c) => (
          <div key={c.slug} className="card overflow-hidden">
            <Link href={`/colleges/${c.slug}`} className="relative block aspect-[16/9] bg-line">
              {c.imgUrl ? (
                <Image src={c.imgUrl} alt={c.name} fill sizes="200px" className="object-cover" />
              ) : (
                <span className="flex h-full items-center justify-center text-xs text-ink-400">No image</span>
              )}
              {c.rank != null && (
                <span className="absolute left-2 top-2 rounded-full bg-ink-900/85 px-2 py-0.5 text-[11px] font-bold text-white">
                  #{c.rank}
                </span>
              )}
            </Link>
            <div className="p-3">
              <Link href={`/colleges/${c.slug}`} className="line-clamp-2 text-sm font-bold text-ink-900 hover:text-brand-600">
                {c.name}
              </Link>
              <p className="mt-0.5 text-[11.5px] text-ink-400">{c.location}</p>
              <div className="mt-2 flex gap-1.5">
                <button onClick={() => openApply(c.name, c.id)} className="btn-primary flex-1 py-1.5 text-[12px]">
                  Apply
                </button>
                <button
                  onClick={() => toggleCompare(c.slug)}
                  className="rounded-lg border border-line px-2 py-1.5 text-[12px] font-semibold text-danger hover:border-danger"
                  aria-label={`Remove ${c.name}`}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Comparison rows */}
        {ROWS.map((row) => {
          const winner = row.num ? bestId(ordered, row.num, row.best ?? null) : null;
          return (
            <div key={row.label} className="contents">
              <div className="sticky left-0 z-10 flex items-center bg-white pr-2 text-[13px] font-semibold text-ink-400">
                {row.label}
              </div>
              {ordered.map((c) => {
                const isBest = winner != null && c.id === winner;
                return (
                  <div
                    key={c.slug}
                    className={clsx(
                      "flex items-center justify-center rounded-xl px-3 py-3 text-center text-sm font-semibold",
                      isBest ? "bg-success/10 text-success ring-1 ring-success/30" : "bg-brand-50/40 text-ink-900",
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {row.get(c)}
                      {isBest && <span className="rounded bg-success px-1 py-0.5 text-[9px] uppercase text-white">Best</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {loading && <p className="mt-4 text-sm text-ink-400">Loading…</p>}
      {compare.length < 4 && (
        <Link href="/colleges" className="mt-6 inline-block text-sm font-semibold text-brand-600">
          + Add more colleges
        </Link>
      )}
    </div>
  );
}
