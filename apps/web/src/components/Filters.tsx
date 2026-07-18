"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import clsx from "clsx";
import { feesCap } from "@/lib/format";

interface Opt {
  name: string;
  slug: string;
}

const TYPES = [
  ["", "All Types"],
  ["Public", "Public / Govt"],
  ["Private", "Private"],
  ["Deemed", "Deemed"],
] as const;

const SORTS = [
  ["rank", "Top ranked"],
  ["rating", "Highest rated"],
  ["feesLow", "Fees: low → high"],
  ["feesHigh", "Fees: high → low"],
] as const;

export function Filters({ streams, cities }: { streams: Opt[]; cities: Opt[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (value && value !== "All") next.set(key, value);
      else next.delete(key);
      next.delete("page"); // reset pagination on filter change
      router.push(`/colleges?${next.toString()}`);
    },
    [router, sp],
  );

  const current = (k: string, fallback = "") => sp.get(k) ?? fallback;
  const fees = Number(current("maxFees", "2000000"));
  const activeStream = current("stream");

  return (
    <aside className="card h-fit p-5 lg:sticky lg:top-20">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">Filters</h2>
        <button onClick={() => router.push("/colleges")} className="text-xs font-semibold text-brand-600">
          Clear all
        </button>
      </div>

      {/* Search */}
      <label className="mt-4 flex items-center gap-2 rounded-xl border border-line px-3">
        <span className="text-ink-400">⌕</span>
        <input
          defaultValue={current("search")}
          onKeyDown={(e) => e.key === "Enter" && set("search", (e.target as HTMLInputElement).value)}
          placeholder="Search…"
          className="w-full bg-transparent py-2.5 text-sm outline-none"
        />
      </label>

      {/* Stream chips */}
      <fieldset className="mt-5">
        <legend className="text-[13px] font-bold text-ink-700">Stream</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[{ name: "All", slug: "" }, ...streams].map((s) => (
            <button
              key={s.slug || "all"}
              onClick={() => set("stream", s.slug)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-[13px] font-semibold",
                (activeStream === s.slug || (!activeStream && !s.slug))
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line text-ink-500 hover:border-brand-400",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Type */}
      <fieldset className="mt-5">
        <legend className="text-[13px] font-bold text-ink-700">College Type</legend>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {TYPES.map(([val, label]) => (
            <button
              key={val || "all"}
              onClick={() => set("type", val)}
              className={clsx(
                "rounded-lg border px-2.5 py-2 text-[13px] font-semibold",
                current("type") === val
                  ? "border-brand-400 bg-brand-50 text-brand-700"
                  : "border-line text-ink-500 hover:border-brand-400",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* City */}
      <label className="mt-5 block">
        <span className="text-[13px] font-bold text-ink-700">City</span>
        <select
          value={current("city")}
          onChange={(e) => set("city", e.target.value)}
          className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {/* Max fees */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink-700">Max fees</span>
          <span className="text-[13px] font-semibold text-brand-700">{feesCap(fees)}</span>
        </div>
        <input
          type="range"
          min={6000}
          max={2000000}
          step={10000}
          defaultValue={fees}
          onMouseUp={(e) => set("maxFees", (e.target as HTMLInputElement).value)}
          onTouchEnd={(e) => set("maxFees", (e.target as HTMLInputElement).value)}
          className="mt-2 w-full"
        />
      </div>

      {/* Sort */}
      <label className="mt-5 block">
        <span className="text-[13px] font-bold text-ink-700">Sort by</span>
        <select
          value={current("sort", "rank")}
          onChange={(e) => set("sort", e.target.value)}
          className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          {SORTS.map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </aside>
  );
}
