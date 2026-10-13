"use client";

import { use, useEffect, useState } from "react";
import { adminJson, SESSION_KEY } from "../../../adminApi";
import type { AdminEntry } from "../../../EntriesAdmin";
import { StatusBadge } from "../../../NewsAdmin";

/** Preview of a course/exam/info page — drafts and pending edits included. */
export default function EntryPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [e, setE] = useState<AdminEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let token: string | null = null;
    try { token = localStorage.getItem(SESSION_KEY); } catch { /* storage blocked */ }
    if (!token) { setError("Sign in to the CMS in this browser to preview drafts."); return; }
    adminJson<AdminEntry>(`/api/admin/entries/${id}`, token)
      .then((x) => {
        const p = (x.pendingData ?? {}) as Partial<AdminEntry>;
        setE({ ...x, ...p, data: { ...(x.data ?? {}), ...((p.data as object) ?? {}) } } as AdminEntry);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load the page"));
  }, [id]);

  if (error) return <p className="container-site py-16 text-center text-danger">{error}</p>;
  if (!e) return <p className="container-site py-16 text-center text-ink-500">Loading preview…</p>;
  const d = (e.data ?? {}) as Record<string, unknown>;
  const facts = Object.entries(d).filter(([k, v]) => typeof v === "string" && v && k !== "collegeMatch" && k !== "officialWebsite") as [string, string][];
  const blocks = Array.isArray(d.blocks) ? (d.blocks as { heading: string; text?: string; buttonLabel?: string }[]) : [];

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-warn/40 bg-warn/15 px-4 py-2 text-center text-[13px] font-semibold text-ink-700">
        Preview — <StatusBadge s={e.displayStatus} />{e.hasPendingChanges && " with pending changes"} · {e.path} · not visible to the public until published
      </div>
      <article className="container-site py-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{e.title}</h1>
          {e.summary && <p className="mt-3 text-lg text-ink-500">{e.summary}</p>}
        </header>
        {e.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.heroImage} alt={e.heroAlt ?? ""} className="mt-6 aspect-[21/9] w-full max-w-4xl rounded-2xl object-cover" />
        )}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {e.body && <div className="rich-content" dangerouslySetInnerHTML={{ __html: e.body }} />}
            {blocks.map((b) => (
              <div key={b.heading} className="mt-6 rounded-2xl bg-brand-600 p-6 text-white">
                <h2 className="text-xl font-extrabold">{b.heading}</h2>
                {b.text && <p className="mt-2 text-white/85">{b.text}</p>}
                {b.buttonLabel && <span className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700">{b.buttonLabel}</span>}
              </div>
            ))}
            {(e.faqs ?? []).length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-extrabold">Frequently asked questions</h2>
                {(e.faqs ?? []).map((f) => <details key={f.question} className="card mt-3 p-4"><summary className="font-semibold">{f.question}</summary><p className="mt-2 text-ink-500">{f.answer}</p></details>)}
              </section>
            )}
          </div>
          {facts.length > 0 && (
            <dl className="card h-fit space-y-3 p-5 text-sm">
              {facts.map(([k, v]) => <div key={k}><dt className="text-xs font-semibold uppercase text-ink-400">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
            </dl>
          )}
        </div>
      </article>
    </>
  );
}
