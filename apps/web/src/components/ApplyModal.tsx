"use client";

import { useState } from "react";
import { postJSON } from "@/lib/api";
import { useSite } from "./site-context";

const FIELDS = [
  { key: "fullName", label: "Full name", placeholder: "Your name", type: "text", icon: "user" },
  { key: "mobile", label: "Mobile number", placeholder: "+91 00000 00000", type: "tel", icon: "phone" },
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email", icon: "mail" },
] as const;

const COURSE_OPTIONS = [
  "BDS", "MDS", "MBBS", "B.Tech / B.E.", "M.Tech", "MBA / PGDM", "BBA", "BCA", "MCA",
  "B.Com", "M.Com", "BA", "MA", "B.Sc", "M.Sc", "B.Pharm / Pharmacy", "Nursing", "Law (LLB / BA-LLB)",
  "Online MBA", "Online BBA", "Online BCA", "Online BCom", "Other",
];

const VALUE_PROPS = [
  { icon: "✔", text: "Verified fees, cutoffs & placements" },
  { icon: "⇄", text: "Compare colleges side by side" },
  { icon: "★", text: "Free 1-on-1 expert counselling" },
];

function FieldIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "user": return (<svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
    case "phone": return (<svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
    case "mail": return (<svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
    default: return (<svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
  }
}

export function ApplyModal() {
  const { applyOpen, applyCollege, closeApply } = useSite();
  const [form, setForm] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!applyOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await postJSON("/api/applications", {
        fullName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        courseInterested: form.courseInterested,
        collegeName: applyCollege?.name,
        collegeId: applyCollege?.id,
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    closeApply();
    setTimeout(() => { setDone(false); setForm({}); setError(null); }, 200);
  };

  const heading = applyCollege?.name ? `Get admission help for ${applyCollege.name}` : "Find your best-fit college";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={close}
    >
      <div
        className="relative grid w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-pop sm:max-w-3xl sm:grid-cols-[0.9fr_1.1fr] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left brand panel — desktop only */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 p-7 text-white sm:flex">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(255,255,255,0.2),transparent)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              🎯 Free College Predictor
            </span>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight">
              Find the colleges you can actually get into
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Share a few details and our counsellors send you a personalised shortlist, fees,
              cutoffs and a college brochure — free.
            </p>
          </div>
          <ul className="relative mt-6 space-y-3">
            {VALUE_PROPS.map((v) => (
              <li key={v.text} className="flex items-center gap-3 text-sm font-medium text-white/90">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15">{v.icon}</span>
                {v.text}
              </li>
            ))}
          </ul>
          <div className="relative mt-6 flex items-center gap-3 border-t border-white/15 pt-4 text-xs text-white/70">
            <span className="font-bold text-white">★ 4.8/5</span>
            <span className="h-3 w-px bg-white/20" />
            <span>1 Lakh+ students guided</span>
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600 sm:hidden">🎯 Free College Predictor</p>
              <h3 className="mt-1 text-lg font-extrabold text-ink-900 sm:mt-0">{done ? "You're all set!" : heading}</h3>
            </div>
            <button onClick={close} aria-label="Close" className="-mr-1 -mt-1 shrink-0 rounded-lg p-1.5 text-ink-400 hover:bg-line/50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {done ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <h4 className="mt-4 text-lg font-extrabold">Request received</h4>
              <p className="mt-2 text-sm text-ink-500">
                Our counsellor will call you within 24 hours with your shortlist and next steps
                {applyCollege?.name ? ` for ${applyCollege.name}` : ""}.
              </p>
              <button onClick={close} className="btn-primary mt-6 w-full">Done</button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-3">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-1 block text-[13px] font-semibold text-ink-700">{f.label}</span>
                  <span className="flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15">
                    <span className="text-ink-400"><FieldIcon name={f.icon} /></span>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.key] || ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-ink-400"
                    />
                  </span>
                </label>
              ))}
              {/* Course interested in — dropdown */}
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold text-ink-700">Course you&apos;re interested in</span>
                <span className="flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15">
                  <span className="text-ink-400"><FieldIcon name="book" /></span>
                  <select
                    value={form.courseInterested || ""}
                    onChange={(e) => setForm((s) => ({ ...s, courseInterested: e.target.value }))}
                    className="w-full cursor-pointer bg-transparent py-2.5 text-sm outline-none"
                  >
                    <option value="">Select a course…</option>
                    {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </span>
              </label>
              {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full gap-2 disabled:opacity-60">
                {busy ? "Submitting…" : "Get my free shortlist →"}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                100% free · Your details stay private · No spam
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
