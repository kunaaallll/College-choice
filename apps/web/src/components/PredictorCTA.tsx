"use client";

import { useSite, type PredictorFamily } from "./site-context";

// A prominent "college predictor" entry point for course landing pages.
// Reuses the lead-capture modal so counsellors can follow up with a shortlist.
// Deliberately content-heavy: the predictor is our #1 conversion path, so this
// leans hard on why free counselling matters, not just a plain CTA button.

const STATS = [
  { value: "1 Lakh+", label: "Students guided" },
  { value: "100%", label: "Free, always" },
  { value: "2 min", label: "To get your shortlist" },
  { value: "13,000+", label: "Colleges compared" },
];

const REASONS = [
  {
    icon: "🎯",
    title: "A shortlist built for you",
    body: "Not a generic list — colleges matched to your rank, budget, category and preferred state, so you only look at options you can actually get into.",
  },
  {
    icon: "🧑‍🏫",
    title: "Real counsellors, real calls",
    body: "A dedicated mentor calls you personally — not a chatbot — to walk through your options and answer the questions a website can't.",
  },
  {
    icon: "🛡️",
    title: "Avoid a ₹Lakhs-costly mistake",
    body: "The wrong college choice can cost years and lakhs of rupees to undo. A 2-minute form now can save that regret later.",
  },
  {
    icon: "💸",
    title: "Free career counselling — no catch",
    body: "This guidance is 100% free. No hidden fees, no \"premium\" upsell later — just the same support every serious applicant deserves.",
  },
];

export function PredictorCTA({ course, family }: { course: string; family?: PredictorFamily }) {
  const { openApply } = useSite();
  const predict = () => openApply(`${course} College Predictor`, undefined, family);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_0%,rgba(255,255,255,0.18),transparent)]" />

      <div className="relative">
        {/* Header + primary CTA */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">🎯 {course} College Predictor</p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Which {course} colleges can you get into?</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
              Don&apos;t guess your options or rely on rumours from friends and forums. Get a personalised,
              rank-based shortlist — and free 1-on-1 career counselling to go with it.
            </p>
          </div>
          <button
            onClick={predict}
            className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-lg hover:bg-white/90 sm:text-base"
          >
            Predict my colleges →
          </button>
        </div>

        {/* Trust stats */}
        <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="text-xl font-extrabold sm:text-2xl">{s.value}</dt>
              <dd className="mt-0.5 text-xs text-white/70 sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* Why free counselling matters */}
        <div className="mt-7 border-t border-white/15 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/70">Why students use our predictor first</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {REASONS.map((r) => (
              <div key={r.title} className="flex gap-3 rounded-xl bg-white/10 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg">{r.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{r.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-white/75">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reinforced CTA */}
        <div className="mt-7 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-center">
          <p className="max-w-lg text-sm font-semibold text-white/90">
            Takes 2 minutes. Costs nothing. Could save you from years of regret — get your free college
            shortlist and counselling call now.
          </p>
          <button
            onClick={predict}
            className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-brand-700 shadow-lg hover:bg-white/90 sm:text-base"
          >
            Predict my colleges — it&apos;s free →
          </button>
          <p className="text-[11px] text-white/60">100% free · No spam · A real counsellor calls you back</p>
        </div>
      </div>
    </div>
  );
}
