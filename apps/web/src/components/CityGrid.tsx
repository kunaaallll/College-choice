"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { City } from "@/lib/types";

// Cities grid that shows a first row and expands on demand (so the homepage
// isn't flooded with every city).
export function CityGrid({ cities, initial = 8 }: { cities: City[]; initial?: number }) {
  const [open, setOpen] = useState(false);
  const shown = open ? cities : cities.slice(0, initial);

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((city) => (
          <Link
            key={city.slug}
            href={`/colleges-in/${city.slug}`}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-800"
          >
            {city.imageUrl && (
              <Image src={city.imageUrl} alt={city.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
            <span className="absolute bottom-3 left-3 text-white">
              <span className="block font-bold">{city.name}</span>
              <span className="block text-xs text-white/75">{city.collegeCount} colleges</span>
            </span>
          </Link>
        ))}
      </div>
      {cities.length > initial && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-brand-600 hover:border-brand-400"
          >
            {open ? "Show less ▲" : `Show all ${cities.length} cities ▼`}
          </button>
        </div>
      )}
    </>
  );
}
