"use client";

import { useState } from "react";
import { postJSON } from "@/lib/api";
import { useSite } from "./site-context";

const FIELDS = [
  { key: "fullName", label: "Full name", placeholder: "Enter your name", type: "text" },
  { key: "mobile", label: "Mobile number", placeholder: "+91 …", type: "tel" },
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { key: "courseInterested", label: "Course interested in", placeholder: "e.g. B.Tech CSE", type: "text" },
] as const;

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
    setTimeout(() => {
      setDone(false);
      setForm({});
      setError(null);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/50 p-0 sm:items-center sm:p-4"
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-pop sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Free application</p>
            <h2 className="mt-1 text-xl">{applyCollege?.name || "Apply now"}</h2>
          </div>
          <button onClick={close} aria-label="Close" className="rounded-lg p-1 text-ink-400 hover:bg-line/50">
            ✕
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-2xl text-success">
              ✓
            </div>
            <h3 className="mt-4 text-lg">Application started!</h3>
            <p className="mt-2 text-sm text-ink-500">
              Our counsellor will call you within 24 hours with next steps.
            </p>
            <button onClick={close} className="btn-primary mt-6 w-full">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-3.5">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-[13px] font-semibold text-ink-700">{f.label}</span>
                <input
                  type={f.type}
                  required={f.key !== "courseInterested"}
                  placeholder={f.placeholder}
                  value={form[f.key] || ""}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
                />
              </label>
            ))}
            {error && <p className="text-sm text-danger">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? "Submitting…" : "Submit application"}
            </button>
            <p className="text-center text-[11px] text-ink-400">
              By submitting you agree to our terms &amp; privacy policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
