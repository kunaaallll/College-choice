"use client";

import { useSite } from "./site-context";

// A prominent "college predictor" entry point for course landing pages.
// Reuses the lead-capture modal so counsellors can follow up with a shortlist.
export function PredictorCTA({ course }: { course: string }) {
  const { openApply } = useSite();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-5 text-white sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent)]" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-white/70">🎯 {course} College Predictor</p>
          <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">Which {course} colleges can you get into?</h2>
          <p className="mt-1 max-w-xl text-sm text-white/80">
            Get a personalised shortlist based on your rank, budget and preferred state — free.
          </p>
        </div>
        <button
          onClick={() => openApply(`${course} College Predictor`)}
          className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 hover:bg-white/90"
        >
          Predict my colleges →
        </button>
      </div>
    </div>
  );
}
