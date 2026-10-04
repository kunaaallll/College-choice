"use client";

import { useCallback, useEffect, useState } from "react";
import { COLLEGE_TABS } from "@/lib/collegeTabs";
import type { ContentSection, Course, Faq } from "@/lib/types";
import { adminJson } from "./adminApi";

interface Highlight { id: number; text: string }
interface Content {
  id: number;
  name: string;
  sections: ContentSection[];
  highlights: Highlight[];
  courses: Course[];
  faqs: Faq[];
}

const inputCls =
  "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500";
const btnDanger =
  "rounded-lg border border-danger/40 px-2.5 py-1 text-[12px] font-semibold text-danger hover:bg-danger/10 disabled:opacity-50";
const btnPrimary = "btn-primary px-3 py-1.5 text-[12px] disabled:opacity-60";
const btnGhost =
  "rounded-lg border border-line px-2.5 py-1 text-[12px] font-semibold text-ink-600 hover:border-brand-400 disabled:opacity-50";

export function CollegeContentEditor({ collegeId, token }: { collegeId: number; token: string }) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      setContent(await adminJson<Content>(`/api/admin/colleges/${collegeId}/content`, token));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load content");
    } finally {
      setLoading(false);
    }
  }, [collegeId, token]);

  useEffect(() => { reload(); }, [reload]);

  if (loading) return <p className="mt-4 text-sm text-ink-500">Loading content…</p>;
  if (error) return <p className="mt-4 text-sm text-danger">{error}</p>;
  if (!content) return null;

  return (
    <div className="mt-4 space-y-6 border-t border-line pt-4">
      <SectionsEditor content={content} token={token} onChanged={reload} />
      <HighlightsEditor content={content} token={token} onChanged={reload} />
      <CoursesEditor content={content} token={token} onChanged={reload} />
      <FaqsEditor content={content} token={token} onChanged={reload} />
    </div>
  );
}

// ── Sections (tabbed markdown) ────────────────────────────────
function SectionsEditor({ content, token, onChanged }: { content: Content; token: string; onChanged: () => void }) {
  const [adding, setAdding] = useState(false);
  return (
    <section>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-ink-900">Detail tabs & content sections</h4>
        <button className={btnGhost} onClick={() => setAdding((v) => !v)}>{adding ? "Cancel" : "+ Add section"}</button>
      </div>
      <p className="mt-1 text-[11px] text-ink-400">Each section is one titled block of markdown under a tab. Tabs appear on the college page only when they have at least one section (Info always shows).</p>

      {adding && <AddSection collegeId={content.id} token={token} onDone={() => { setAdding(false); onChanged(); }} />}

      <div className="mt-3 space-y-4">
        {COLLEGE_TABS.map(([tabKey, tabLabel]) => {
          const secs = content.sections.filter((s) => s.tab === tabKey);
          if (secs.length === 0) return null;
          return (
            <div key={tabKey} className="rounded-xl border border-line p-3">
              <p className="text-[12px] font-bold uppercase tracking-wide text-brand-600">{tabLabel} <span className="text-ink-400">({secs.length})</span></p>
              <div className="mt-2 space-y-3">
                {secs.map((s) => <SectionRow key={s.id} section={s} token={token} onChanged={onChanged} />)}
              </div>
            </div>
          );
        })}
        {content.sections.length === 0 && <p className="text-[13px] text-ink-400">No sections yet — add one above.</p>}
      </div>
    </section>
  );
}

function AddSection({ collegeId, token, onDone }: { collegeId: number; token: string; onDone: () => void }) {
  const [tab, setTab] = useState<string>(COLLEGE_TABS[0][0]);
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [sort, setSort] = useState("0");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const save = async () => {
    setBusy(true); setErr(null);
    try {
      await adminJson(`/api/admin/colleges/${collegeId}/sections`, token, {
        method: "POST",
        body: { tab, heading, body, sort: Number(sort) || 0 },
      });
      onDone();
    } catch (e) { setErr(e instanceof Error ? e.message : "Failed"); } finally { setBusy(false); }
  };

  return (
    <div className="mt-3 rounded-xl border border-brand-300 bg-brand-50/40 p-3">
      <div className="flex flex-wrap gap-2">
        <select value={tab} onChange={(e) => setTab(e.target.value)} className={`${inputCls} sm:w-48`}>
          {COLLEGE_TABS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Section heading" className={`${inputCls} flex-1`} />
        <input value={sort} onChange={(e) => setSort(e.target.value)} placeholder="Sort" type="number" className={`${inputCls} w-20`} />
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body (markdown — **bold**, - lists, | tables |)" rows={5} className={`${inputCls} mt-2 font-mono text-[13px]`} />
      {err && <p className="mt-1 text-[12px] text-danger">{err}</p>}
      <div className="mt-2 flex justify-end gap-2">
        <button className={btnPrimary} onClick={save} disabled={busy || !heading.trim() || !body.trim()}>{busy ? "Adding…" : "Add section"}</button>
      </div>
    </div>
  );
}

function SectionRow({ section, token, onChanged }: { section: ContentSection; token: string; onChanged: () => void }) {
  const [heading, setHeading] = useState(section.heading);
  const [body, setBody] = useState(section.body);
  const [sort, setSort] = useState(String(section.sort));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const dirty = heading !== section.heading || body !== section.body || String(section.sort) !== sort;

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      await adminJson(`/api/admin/sections/${section.id}`, token, { method: "PUT", body: { heading, body, sort: Number(sort) || 0 } });
      setMsg("Saved ✓"); onChanged();
    } catch (e) { setMsg(e instanceof Error ? e.message : "Failed"); } finally { setBusy(false); }
  };
  const del = async () => {
    if (!confirm("Delete this section?")) return;
    setBusy(true);
    try { await adminJson(`/api/admin/sections/${section.id}`, token, { method: "DELETE" }); onChanged(); }
    catch (e) { setMsg(e instanceof Error ? e.message : "Failed"); setBusy(false); }
  };

  return (
    <div className="rounded-lg border border-line bg-white p-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <input value={heading} onChange={(e) => setHeading(e.target.value)} className={`${inputCls} flex-1`} />
        <input value={sort} onChange={(e) => setSort(e.target.value)} type="number" title="Sort order" className={`${inputCls} w-16`} />
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} className={`${inputCls} mt-2 font-mono text-[13px]`} />
      <div className="mt-2 flex items-center justify-end gap-2">
        {msg && <span className="mr-auto text-[12px] font-semibold text-ink-500">{msg}</span>}
        <button className={btnPrimary} onClick={save} disabled={busy || !dirty}>{busy ? "…" : "Save"}</button>
        <button className={btnDanger} onClick={del} disabled={busy}>Delete</button>
      </div>
    </div>
  );
}

// ── Highlights ────────────────────────────────────────────────
function HighlightsEditor({ content, token, onChanged }: { content: Content; token: string; onChanged: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try { await adminJson(`/api/admin/colleges/${content.id}/highlights`, token, { method: "POST", body: { text } }); setText(""); onChanged(); }
    finally { setBusy(false); }
  };
  const del = async (id: number) => { await adminJson(`/api/admin/highlights/${id}`, token, { method: "DELETE" }); onChanged(); };

  return (
    <section>
      <h4 className="text-sm font-extrabold text-ink-900">Highlights <span className="text-ink-400">({content.highlights.length})</span></h4>
      <div className="mt-2 space-y-1.5">
        {content.highlights.map((h) => (
          <div key={h.id} className="flex items-center gap-2">
            <span className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-[13px] text-ink-700">{h.text}</span>
            <button className={btnDanger} onClick={() => del(h.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="New highlight…" className={`${inputCls} flex-1`} />
        <button className={btnPrimary} onClick={add} disabled={busy || !text.trim()}>Add</button>
      </div>
    </section>
  );
}

// ── Courses ───────────────────────────────────────────────────
function CoursesEditor({ content, token, onChanged }: { content: Content; token: string; onChanged: () => void }) {
  const empty = { name: "", duration: "", seats: "", feesLabel: "" };
  const [row, setRow] = useState(empty);
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!row.name.trim() || !row.duration.trim()) return;
    setBusy(true);
    try { await adminJson(`/api/admin/colleges/${content.id}/courses`, token, { method: "POST", body: row }); setRow(empty); onChanged(); }
    finally { setBusy(false); }
  };
  const del = async (id: number) => { await adminJson(`/api/admin/courses/${id}`, token, { method: "DELETE" }); onChanged(); };

  return (
    <section>
      <h4 className="text-sm font-extrabold text-ink-900">Courses & fees <span className="text-ink-400">({content.courses.length})</span></h4>
      <div className="mt-2 space-y-1.5">
        {content.courses.map((c) => (
          <div key={c.id} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 text-[13px]">
            <span className="flex-1 font-semibold text-ink-800">{c.name}</span>
            <span className="text-ink-500">{c.duration}</span>
            <span className="text-ink-400">· {c.seats || "—"}</span>
            <span className="text-brand-700">· {c.feesLabel || "—"}</span>
            <button className={btnDanger} onClick={() => del(c.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} placeholder="Course name" className={inputCls} />
        <input value={row.duration} onChange={(e) => setRow({ ...row, duration: e.target.value })} placeholder="Duration" className={inputCls} />
        <input value={row.seats} onChange={(e) => setRow({ ...row, seats: e.target.value })} placeholder="Seats" className={inputCls} />
        <input value={row.feesLabel} onChange={(e) => setRow({ ...row, feesLabel: e.target.value })} placeholder="Fees" className={inputCls} />
      </div>
      <div className="mt-2 flex justify-end">
        <button className={btnPrimary} onClick={add} disabled={busy || !row.name.trim() || !row.duration.trim()}>Add course</button>
      </div>
    </section>
  );
}

// ── FAQs ──────────────────────────────────────────────────────
function FaqsEditor({ content, token, onChanged }: { content: Content; token: string; onChanged: () => void }) {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!q.trim() || !a.trim()) return;
    setBusy(true);
    try { await adminJson(`/api/admin/colleges/${content.id}/faqs`, token, { method: "POST", body: { question: q, answer: a, sort: content.faqs.length } }); setQ(""); setA(""); onChanged(); }
    finally { setBusy(false); }
  };
  const del = async (id: number) => { await adminJson(`/api/admin/faqs/${id}`, token, { method: "DELETE" }); onChanged(); };

  return (
    <section>
      <h4 className="text-sm font-extrabold text-ink-900">FAQs <span className="text-ink-400">({content.faqs.length})</span></h4>
      <div className="mt-2 space-y-2">
        {content.faqs.map((f) => (
          <div key={f.id} className="rounded-lg border border-line bg-white p-2.5 text-[13px]">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="font-semibold text-ink-800">{f.question}</p>
                <p className="mt-0.5 text-ink-500">{f.answer}</p>
              </div>
              <button className={btnDanger} onClick={() => del(f.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Question" className={inputCls} />
        <textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="Answer" rows={2} className={inputCls} />
        <div className="flex justify-end">
          <button className={btnPrimary} onClick={add} disabled={busy || !q.trim() || !a.trim()}>Add FAQ</button>
        </div>
      </div>
    </section>
  );
}
