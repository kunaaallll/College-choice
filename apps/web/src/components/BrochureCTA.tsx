"use client";

import { useSite } from "./site-context";

// "Download Brochure" CTA shown inside the Cutoffs section. Clicking it opens the
// college-predictor / lead form so a counsellor can send the full brochure and a
// personalised cutoff-chance check.
export function BrochureCTA({ collegeName, collegeId }: { collegeName: string; collegeId?: number }) {
  const { openApply } = useSite();
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-400/40 bg-brand-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-extrabold text-ink-900">Want the full cutoff &amp; fee brochure?</h3>
        <p className="mt-1 max-w-xl text-sm text-ink-500">
          Get category-wise closing ranks, the seat matrix and fee break-up — plus a free,
          personalised check of your admission chances at your NEET rank.
        </p>
      </div>
      <button
        onClick={() => openApply(collegeName, collegeId)}
        className="btn-primary shrink-0 gap-2 whitespace-nowrap px-5 py-3"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Brochure
      </button>
    </div>
  );
}
