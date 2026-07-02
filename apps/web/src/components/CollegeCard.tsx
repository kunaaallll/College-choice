"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { CollegeCard as TCollege } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { useSite } from "./site-context";

export function CollegeCard({ college }: { college: TCollege }) {
  const { toggleCompare, inCompare, openApply } = useSite();
  const added = inCompare(college.slug);
  // Defensive defaults — tolerate partial/stale data without crashing.
  const isOnline = (college.mode ?? "Campus") !== "Campus";
  const approvals = college.approvals ?? [];

  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={`/colleges/${college.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-line">
        {college.imgUrl ? (
          <Image
            src={college.imgUrl}
            alt={college.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-center">
            <span className="line-clamp-3 text-sm font-bold text-white/95">{college.name}</span>
          </div>
        )}
        {isOnline ? (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-2.5 py-1 text-xs font-bold text-white">
            🌐 {college.mode}
          </span>
        ) : (
          college.rank != null && (
            <span className="absolute left-3 top-3 rounded-full bg-ink-900/85 px-2.5 py-1 text-xs font-bold text-white">
              #{college.rank} {college.stream.name}
            </span>
          )
        )}
        {college.rating != null && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-warn">
            {stars(college.rating)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12.5px] text-ink-400">⚲ {college.location}</p>
          {college.featured && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-bold text-warn">
              ★ Featured
            </span>
          )}
        </div>
        <h3 className="mt-1 text-[16px] font-bold leading-snug">
          <Link href={`/colleges/${college.slug}`} className="hover:text-brand-600">
            {college.name}
          </Link>
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-brand-50/60 px-3 py-2">
            <p className="text-[11px] text-ink-400">{isOnline ? "From (total)" : "Total Fees"}</p>
            <p className="font-bold text-brand-700">{orNA(college.feesLabel)}</p>
          </div>
          {isOnline ? (
            <div className="rounded-xl bg-brand-50/60 px-3 py-2">
              <p className="text-[11px] text-ink-400">Mode</p>
              <p className="font-bold text-brand-700">100% Online</p>
            </div>
          ) : (
            <div className="rounded-xl bg-success/5 px-3 py-2">
              <p className="text-[11px] text-ink-400">Avg Package</p>
              <p className="font-bold text-success">{orNA(college.packageLabel)}</p>
            </div>
          )}
        </div>

        {isOnline && approvals.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {approvals.slice(0, 3).map((a) => (
              <span key={a} className="rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                ✓ {a}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 text-[12.5px] text-ink-400">
          {orNA(college.type)} {college.estd ? `· Estd ${college.estd}` : ""}
          {college.examName ? ` · ${college.examName}` : isOnline ? " · Merit-based" : ""}
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 rounded-xl border border-line py-2 text-center text-sm font-semibold text-ink-700 hover:border-brand-400"
          >
            View details
          </Link>
          <button onClick={() => openApply(college.name, college.id)} className="btn-primary flex-1 py-2 text-sm">
            Apply now
          </button>
          <button
            onClick={() => toggleCompare(college.slug)}
            aria-pressed={added}
            title="Add to compare"
            className={clsx(
              "rounded-xl border px-3 py-2 text-sm font-semibold",
              added ? "border-brand-400 bg-brand-50 text-brand-700" : "border-line text-ink-500 hover:border-brand-400",
            )}
          >
            {added ? "✓" : "⇄"}
          </button>
        </div>
      </div>
    </article>
  );
}
