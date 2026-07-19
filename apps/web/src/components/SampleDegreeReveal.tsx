"use client";

import Image from "next/image";
import { useState } from "react";

// Attractive "view sample degree" CTA for the Placements tab of online colleges.
// Reveals the admin-uploaded sample-degree photo in a lightbox on click.
export function SampleDegreeReveal({ imageUrl, collegeName }: { imageUrl: string; collegeName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-5 text-left text-white shadow-lg transition hover:shadow-xl sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent)]" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">🎓</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Real degree, real proof</p>
            <p className="mt-0.5 text-base font-extrabold sm:text-lg">Click here to view Sample Degree →</p>
          </div>
        </div>
        <span className="relative shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-700 transition group-hover:bg-white/90">
          View
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-line p-4">
              <p className="font-bold text-ink-900">{collegeName} — Sample Degree</p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1.5 text-ink-400 hover:bg-line/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="relative max-h-[70vh] w-full overflow-auto bg-line/40 p-4">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
                <Image src={imageUrl} alt={`${collegeName} sample degree`} fill sizes="640px" className="rounded-lg object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
