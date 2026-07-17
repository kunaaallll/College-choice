"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { CollegeCard as TCollege } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { useSite } from "./site-context";
import { CardImageRotator } from "./CardImageRotator";

export function CollegeCard({ college }: { college: TCollege }) {
  const { toggleCompare, inCompare, openApply } = useSite();
  const added = inCompare(college.slug);
  // Defensive defaults — tolerate partial/stale data without crashing.
  const isOnline = (college.mode ?? "Campus") !== "Campus";
  const isDental = college.stream.slug === "dental";
  const approvals = college.approvals ?? [];
  // Uploaded photos → rotating card image (falls back to the single imgUrl).
  const cardImages = (college.gallery ?? []).map((g) => g.url).filter(Boolean);
  const images = cardImages.length ? cardImages : college.imgUrl ? [college.imgUrl] : [];

  return (
    <article
      className={clsx(
        "card group flex flex-col overflow-hidden",
        college.featured && "ring-2 ring-warn/50 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.45)]",
      )}
    >
      <Link href={`/colleges/${college.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-line">
        {images.length ? (
          <CardImageRotator images={images} alt={college.name} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-line/60 p-3 text-center">
            <span className="text-3xl opacity-30">🏛️</span>
            <span className="line-clamp-2 text-xs font-semibold text-ink-400">{college.name}</span>
          </div>
        )}
        {college.featured && (
          <span className="absolute left-0 top-4 z-10 flex items-center gap-1 rounded-r-full bg-gradient-to-r from-warn to-orange-500 py-1 pl-3 pr-3 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md">
            ⭐ Featured
          </span>
        )}
        {college.rank != null && (
          <span className={clsx("absolute top-3 rounded-full bg-ink-900/90 px-2.5 py-1 text-[13px] font-extrabold text-white", college.featured ? "left-3 mt-8" : "left-3")}>
            Rank <span className="text-red-500">#{college.rank}</span>
          </span>
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
              <p className="text-[11px] text-ink-400">{isDental ? "Avg Patient Flow" : "Avg Package"}</p>
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
