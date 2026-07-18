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

const ROWS: { label: string; icon: string; get: (c: CollegeCard) => string; num?: (c: CollegeCard) => number | null; best?: Best }[] = [
  { label: "Rank", icon: "🏅", get: (c) => (c.rank != null ? `#${c.rank}` : orNA(null)), num: (c) => c.rank, best: "min" },
  { label: "Rating", icon: "⭐", get: (c) => stars(c.rating), num: (c) => c.rating, best: "max" },
  { label: "Total Fees", icon: "💰", get: (c) => orNA(c.feesLabel), num: (c) => c.feesNum, best: "min" },
  { label: "Avg Package", icon: "📈", get: (c) => orNA(c.packageLabel) },
  { label: "Type", icon: "🏛️", get: (c) => orNA(c.type) },
  { label: "Stream", icon: "🎓", get: (c) => c.stream.name },
  { label: "Exam", icon: "📝", get: (c) => orNA(c.examName) },
  { label: "Established", icon: "📅", get: (c) => orNA(c.estd) },
  { label: "Location", icon: "📍", get: (c) => c.location },
];

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
    if (compare.length === 0) { setItems([]); return; }
    setLoading(true);
    api.compare(compare)
      .then((res) => active && setItems(res.items))
      .catch(() => active && setItems([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [compare]);

  if (compare.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-3xl text-brand-600">⇄</div>
        <h2 className="mt-4 text-xl font-extrabold">Nothing to compare yet</h2>
        <p className="mt-2 max-w-sm text-ink-500">Add colleges from the listing (the ⇄ button on any card) to stack them side by side — fees, rank, placements and more.</p>
        <Link href="/colleges" className="btn-primary mt-6">Browse colleges</Link>
      </div>
    );
  }

  const ordered = compare.map((slug) => items.find((c) => c.slug === slug)).filter(Boolean) as CollegeCard[];
  const cols = ordered.length || compare.length;
  // Dental colleges report "Avg Patient Flow" instead of "Avg Package".
  const allDental = ordered.length > 0 && ordered.every((c) => c.stream.slug === "dental");

  // Quick-verdict chips
  const bestRank = bestId(ordered, (c) => c.rank, "min");
  const lowFees = bestId(ordered, (c) => c.feesNum, "min");
  const topRated = bestId(ordered, (c) => c.rating, "max");
  const byId = (id: number | null) => ordered.find((c) => c.id === id);
  const verdicts = [
    bestRank && { icon: "🏆", label: "Best ranked", name: byId(bestRank)!.name },
    lowFees && { icon: "💰", label: "Lowest fees", name: byId(lowFees)!.name },
    topRated && { icon: "⭐", label: "Highest rated", name: byId(topRated)!.name },
  ].filter(Boolean) as { icon: string; label: string; name: string }[];

  return (
    <div className="mt-8">
      {/* Quick verdict */}
      {verdicts.length > 0 && (
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          {verdicts.map((v) => (
            <div key={v.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">{v.icon}</span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{v.label}</p>
                <p className="truncate text-sm font-bold text-ink-900">{v.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-3xl border border-line bg-white p-3 pb-2 sm:p-4">
        <div className="grid min-w-[640px] gap-x-3" style={{ gridTemplateColumns: `150px repeat(${cols}, minmax(190px, 1fr))` }}>
          {/* Header row */}
          <div className="sticky left-0 z-10 bg-white" />
          {ordered.map((c) => (
            <div key={c.slug} className="overflow-hidden rounded-2xl border border-line">
              <Link href={`/colleges/${c.slug}`} className="relative block aspect-[16/9] bg-line">
                {c.imgUrl ? (
                  <Image src={c.imgUrl} alt={c.name} fill sizes="220px" className="object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-ink-400">No image</span>
                )}
                <span className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-900/70 to-transparent" />
                {c.rank != null && !c.featured && (
                  <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                    #{c.rank}
                  </span>
                )}
                {c.rating != null && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-warn">{stars(c.rating)}</span>
                )}
              </Link>
              <div className="p-3">
                <Link href={`/colleges/${c.slug}`} className="line-clamp-2 text-sm font-bold text-ink-900 hover:text-brand-600">{c.name}</Link>
                <p className="mt-0.5 text-[11.5px] text-ink-400">⚲ {c.location}</p>
                <div className="mt-2.5 flex gap-1.5">
                  <button onClick={() => openApply(c.name, c.id)} className="btn-primary flex-1 py-1.5 text-[12px]">Apply</button>
                  <button
                    onClick={() => toggleCompare(c.slug)}
                    className="rounded-lg border border-line px-2 py-1.5 text-[12px] font-semibold text-danger hover:border-danger"
                    aria-label={`Remove ${c.name}`}
                  >✕</button>
                </div>
              </div>
            </div>
          ))}

          {/* Comparison rows */}
          {ROWS.map((row, i) => {
            const winner = row.num ? bestId(ordered, row.num, row.best ?? null) : null;
            return (
              <div key={row.label} className="contents">
                <div className={clsx("sticky left-0 z-10 flex items-center gap-2 rounded-l-xl py-3 pl-2 pr-2 text-[13px] font-semibold text-ink-500", i % 2 === 0 ? "bg-brand-50/30" : "bg-white")}>
                  <span className="text-sm">{row.icon}</span>{row.label === "Avg Package" && allDental ? "Avg Patient Flow" : row.label}
                </div>
                {ordered.map((c) => {
                  const isBest = winner != null && c.id === winner;
                  return (
                    <div
                      key={c.slug}
                      className={clsx(
                        "my-0.5 flex items-center justify-center rounded-xl px-3 py-3 text-center text-sm font-semibold",
                        isBest ? "bg-success/10 text-success ring-1 ring-success/40" : i % 2 === 0 ? "bg-brand-50/30 text-ink-900" : "text-ink-900",
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        {row.get(c)}
                        {isBest && <span className="rounded bg-success px-1 py-0.5 text-[9px] font-bold uppercase text-white">Best</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {loading && <p className="mt-4 text-sm text-ink-400">Loading…</p>}
      {compare.length < 4 && (
        <Link href="/colleges" className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-brand-600 hover:border-brand-400">
          + Add more colleges to compare
        </Link>
      )}
    </div>
  );
}
