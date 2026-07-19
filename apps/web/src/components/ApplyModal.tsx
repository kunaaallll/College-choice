"use client";

import { useState } from "react";
import { postJSON } from "@/lib/api";
import { useSite, type PredictorFamily } from "./site-context";

const FIELDS = [
  { key: "fullName", label: "Full name", placeholder: "Your name", type: "text", icon: "user" },
  { key: "mobile", label: "Mobile number", placeholder: "+91 00000 00000", type: "tel", icon: "phone" },
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email", icon: "mail" },
  { key: "city", label: "City", placeholder: "Your city", type: "text", icon: "pin" },
] as const;

const COURSE_OPTIONS = [
  "BDS", "MDS", "MBBS", "B.Tech / B.E.", "M.Tech", "MBA / PGDM", "BBA", "BCA", "MCA",
  "B.Com", "M.Com", "BA", "MA", "B.Sc", "M.Sc", "B.Pharm / Pharmacy", "Nursing", "Law (LLB / BA-LLB)",
  "Online MBA", "Online BBA", "Online BCA", "Online BCom", "Other",
];

const CATEGORY_OPTIONS = ["General", "EWS", "OBC-NCL", "SC", "ST", "PwD"];

const STATE_OPTIONS = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
];

// Rank-predictor calculator fields, shown above the contact details when the
// CTA that opened this modal is course-specific (JEE/NEET). Each family also
// pins the "course interested in" dropdown below to the right course.
const FAMILY_META: Record<PredictorFamily, { heading: string; marksMax: number; courseValue: string; showGender: boolean; submitLabel?: string }> = {
  btech: {
    heading: "JEE Main College Predictor 2026 (JoSAA): Predict B.Tech Colleges based on JoSAA Opening and Closing Ranks",
    marksMax: 300,
    courseValue: "B.Tech / B.E.",
    showGender: true,
    submitLabel: "Check results →",
  },
  "neet-bds": {
    heading: "NEET College Predictor 2026 - Predict BDS Colleges by Rank for Free",
    marksMax: 720,
    courseValue: "BDS",
    showGender: false,
  },
  "neet-mbbs": {
    heading: "NEET College Predictor 2026 - Predict MBBS Colleges by Rank for Free",
    marksMax: 720,
    courseValue: "MBBS",
    showGender: false,
  },
};

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
    case "pin": return (<svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>);
    case "shield": return (<svg {...common}><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" /></svg>);
    default: return (<svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
  }
}

export function ApplyModal() {
  const { applyOpen, applyCollege, applyFamily, closeApply, openLogin } = useSite();
  const [form, setForm] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  if (!applyOpen) return null;

  const fam = applyFamily ? FAMILY_META[applyFamily] : null;
  const courseValue = form.courseInterested || fam?.courseValue || "";

  const requestOtp = () => {
    if (!form.mobile || form.mobile.trim().length < 7) {
      setError("Enter a valid mobile number first");
      return;
    }
    setError(null);
    setOtpSent(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const notesParts = fam
        ? [
            form.marks ? `Marks: ${form.marks}/${fam.marksMax}` : form.rank ? `Rank: ${form.rank}` : null,
            form.category ? `Category: ${form.category}` : null,
            form.state ? `State: ${form.state}` : null,
            fam.showGender && form.gender ? `Gender: ${form.gender}` : null,
          ].filter(Boolean)
        : [];
      await postJSON("/api/applications", {
        fullName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        city: form.city,
        courseInterested: courseValue || undefined,
        notes: notesParts.length ? notesParts.join(" | ") : undefined,
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
    setTimeout(() => { setDone(false); setForm({}); setError(null); setOtpSent(false); }, 200);
  };

  const heading = fam?.heading ?? (applyCollege?.name ? `Get admission help for ${applyCollege.name}` : "Find your best-fit college");

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
              {fam && (
                <div className="space-y-3 rounded-xl bg-brand-50/60 p-3.5">
                  <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-[13px] font-semibold text-ink-700">
                        Marks <span className="text-danger">(Out of {fam.marksMax})</span>
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={fam.marksMax}
                        placeholder="Enter your marks"
                        value={form.marks || ""}
                        onChange={(e) => setForm((s) => ({ ...s, marks: e.target.value, rank: "" }))}
                        className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[13px] font-semibold text-ink-700">— OR — Enter your rank</span>
                      <input
                        type="number"
                        min={1}
                        placeholder="Enter your rank"
                        value={form.rank || ""}
                        onChange={(e) => setForm((s) => ({ ...s, rank: e.target.value, marks: "" }))}
                        className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-[13px] font-semibold text-ink-700">Reservation Category</span>
                      <select
                        value={form.category || "General"}
                        onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                        className="w-full cursor-pointer rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                      >
                        {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[13px] font-semibold text-ink-700">Select {fam.showGender ? "Home State" : "State"}</span>
                      <select
                        value={form.state || ""}
                        onChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))}
                        className="w-full cursor-pointer rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                      >
                        <option value="">Select {fam.showGender ? "Home State" : "State"}</option>
                        {STATE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </label>
                  </div>
                  {fam.showGender && (
                    <div>
                      <span className="mb-1 block text-[13px] font-semibold text-ink-700">Gender</span>
                      <div className="flex gap-4">
                        {["Male", "Female"].map((g) => (
                          <label key={g} className="flex items-center gap-1.5 text-sm text-ink-700">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={(form.gender || "Male") === g}
                              onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}
                              className="accent-brand-600"
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              </div>

              {/* Mobile verification — soft gate; not wired to a real SMS provider yet */}
              <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto]">
                <label className="block">
                  <span className="mb-1 block text-[13px] font-semibold text-ink-700">OTP</span>
                  <span className="flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15">
                    <span className="text-ink-400"><FieldIcon name="shield" /></span>
                    <input
                      type="text"
                      inputMode="numeric"
                      disabled={!otpSent}
                      placeholder={otpSent ? "Enter OTP" : "Request an OTP first"}
                      value={form.otp || ""}
                      onChange={(e) => setForm((s) => ({ ...s, otp: e.target.value }))}
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-ink-400 disabled:cursor-not-allowed"
                    />
                  </span>
                </label>
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={otpSent}
                  className="h-[42px] shrink-0 rounded-xl bg-ink-900 px-4 text-sm font-bold text-white disabled:opacity-50"
                >
                  {otpSent ? "OTP sent ✓" : "Get OTP"}
                </button>
              </div>
              {otpSent && <p className="-mt-1 text-[11px] text-ink-400">You&apos;ll receive an OTP on your mobile number.</p>}

              {/* Course interested in — dropdown; locked to the predictor's course when opened from a JEE/NEET CTA */}
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold text-ink-700">
                  {fam ? "Course Name" : "Course you're interested in"}
                </span>
                <span className={`flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15 ${fam ? "bg-line/40" : ""}`}>
                  <span className="text-ink-400"><FieldIcon name="book" /></span>
                  <select
                    value={courseValue}
                    disabled={!!fam}
                    onChange={(e) => setForm((s) => ({ ...s, courseInterested: e.target.value }))}
                    className="w-full cursor-pointer bg-transparent py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:text-ink-500"
                  >
                    {!fam && <option value="">Select a course…</option>}
                    {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </span>
              </label>
              {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full gap-2 disabled:opacity-60">
                {busy ? "Submitting…" : fam?.submitLabel ?? "Get my free shortlist →"}
              </button>
              <p className="text-center text-[12px] text-ink-500">
                Already registered?{" "}
                <button type="button" onClick={() => { close(); openLogin("login"); }} className="font-semibold text-brand-600 hover:underline">
                  Click here to login
                </button>
              </p>
              <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                By proceeding you agree to our Terms &amp; Conditions and Privacy Policy · 100% free · No spam
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
