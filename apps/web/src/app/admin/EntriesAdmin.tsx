"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { adminDownload, adminJson, adminRequest } from "./adminApi";
import { MediaPickerModal, thumbOf } from "./MediaLibrary";
import { StatusBadge } from "./NewsAdmin";
import { RevisionHistory } from "./RevisionHistory";
import { ContentChecks, RichTextEditor } from "./RichTextEditor";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, CharCount, fmtDate, inputBase, inputCls, LIMITS, Notice, readFileText, SerpPreview } from "./seo/ui";

export type EntryKind = "course" | "exam" | "page";
type DisplayStatus = "draft" | "in_review" | "scheduled" | "published" | "expired" | "unpublished";
interface Faq { question: string; answer: string }
interface Cta { heading: string; text: string; buttonLabel: string; buttonUrl: string }
interface Related { colleges: number[]; entries: number[]; news: number[] }
interface ExamBasics { name: string; fullName: string; level: string; date: string; examOn: string; mode: string; stream: string }

export interface AdminEntry {
  id: number;
  type: "COURSE" | "EXAM" | "PAGE";
  slug: string;
  path: string;
  title: string;
  summary: string | null;
  body: string | null;
  data: Record<string, unknown> | null;
  faqs: Faq[] | null;
  heroImage: string | null;
  heroAlt: string | null;
  streamId: number | null;
  categoryId: number | null;
  related: Related | null;
  tags: string[];
  exam: (Omit<ExamBasics, "examOn"> & { id: number; examOn: string | null }) | null;
  stream: { name: string } | null;
  category: { name: string } | null;
  status: "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "UNPUBLISHED";
  displayStatus: DisplayStatus;
  publishAt: string | null;
  unpublishAt: string | null;
  pendingData: Record<string, unknown> | null;
  hasPendingChanges: boolean;
  reviewNote: string | null;
  authorName: string | null;
  updatedByName: string | null;
  updatedAt: string;
}

const LABEL: Record<EntryKind, { one: string; many: string; base: string }> = {
  course: { one: "course", many: "Courses", base: "/courses/" },
  exam: { one: "exam page", many: "Exams", base: "/exams/" },
  page: { one: "page", many: "Pages & services", base: "/" },
};

const COURSE_FIELDS: [string, string, "text" | "area" | "level"][] = [
  ["level", "Level", "level"], ["duration", "Duration", "text"], ["mode", "Mode (full-time, online…)", "text"], ["fees", "Fees (display)", "text"],
  ["eligibility", "Eligibility", "area"], ["admission", "Admission process (short)", "area"], ["careers", "Career options", "area"],
  ["collegeMatch", "List colleges whose courses include…", "text"],
];
const EXAM_FIELDS: [string, string, "text" | "area"][] = [
  ["examStatus", "Status (e.g. Registration open)", "text"], ["conductingBody", "Conducting body", "text"], ["applicationWindow", "Application window", "text"],
  ["resultDate", "Result date", "text"], ["fee", "Application fee", "text"], ["officialWebsite", "Official website", "text"],
  ["eligibility", "Eligibility", "area"], ["pattern", "Exam pattern", "area"],
];

interface Taxonomy { streams: { id: number; name: string }[]; categories: { id: number; name: string; parentId: number | null }[]; tags: { name: string }[] }

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

// ─────────────────────────────────────────────────────────────
// List
// ─────────────────────────────────────────────────────────────

export function EntriesAdmin({ kind }: { kind: EntryKind }) {
  const { token, can } = useSession();
  const [items, setItems] = useState<(AdminEntry & { isLive: boolean })[]>([]);
  const [examsWithoutPage, setExamsWithoutPage] = useState<{ id: number; name: string; date: string }[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<number | "new" | { examId: number; name: string } | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [tool, setTool] = useState<"" | "bulk" | "import">("");
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const L = LABEL[kind];

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<{ items: (AdminEntry & { isLive: boolean })[]; examsWithoutPage: { id: number; name: string; date: string }[] }>(
      `/api/admin/entries?type=${kind}&q=${encodeURIComponent(q)}`, token);
    if (ok) { setItems(data.items); setExamsWithoutPage(data.examsWithoutPage); } else setMsg({ tone: "error", text: data.error ?? "Failed to load" });
  }, [kind, q, token]);
  useEffect(() => { load(); setSelected(new Set()); setEditing(null); }, [load]);

  const matches = (e: AdminEntry) =>
    status === "all" ? true : status === "review" ? e.displayStatus === "in_review" || e.hasPendingChanges : status === "off" ? e.displayStatus === "unpublished" || e.displayStatus === "expired" : e.displayStatus === status;
  const shown = items.filter(matches);

  if (editing !== null) {
    return (
      <EntryEditor
        kind={kind}
        id={typeof editing === "number" ? editing : null}
        examSeed={typeof editing === "object" ? editing : null}
        onBack={() => { setEditing(null); load(); }}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">{L.many}</h2>
          <p className="mt-1 text-sm text-ink-500">
            {kind === "course" && "Course pages at /courses/… — eligibility, duration, fees, syllabus and the colleges offering them."}
            {kind === "exam" && "Exam pages at /exams/… — dates, eligibility, pattern, application info and the colleges that accept the exam."}
            {kind === "page" && "Info and service pages at the site root (e.g. /counselling, /scholarships) with sections, CTA blocks and FAQs."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {kind !== "page" && can("content:publish") && <button className={btnGhost} onClick={() => setTool(tool === "import" ? "" : "import")}>Import CSV</button>}
          {kind !== "page" && <button className={btnGhost} onClick={() => adminDownload(`/api/admin/entries/export?type=${kind}`, token, `${kind}s.csv`).catch((e) => setMsg({ tone: "error", text: String(e.message ?? e) }))}>Export CSV</button>}
          <button className="btn-primary px-4 py-2 text-sm" onClick={() => setEditing("new")}>+ New {L.one}</button>
        </div>
      </div>

      {tool === "import" && kind !== "page" && <EntryImport kind={kind} onDone={load} />}
      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <form onSubmit={(e) => { e.preventDefault(); load(); }} className="flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or URL…" className={`${inputBase} w-56`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
        {[["all", "All"], ["draft", "Drafts"], ["review", "Awaiting review"], ["scheduled", "Scheduled"], ["published", "Live"], ["off", "Unpublished / expired"]].map(([k, label]) => (
          <button key={k} onClick={() => setStatus(k)} className={`rounded-lg px-3 py-1.5 text-[13px] font-bold ${status === k ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-line/50"}`}>{label}</button>
        ))}
        {selected.size > 0 && <button className={`${btnGhost} ml-auto`} onClick={() => setTool(tool === "bulk" ? "" : "bulk")}>Bulk actions ({selected.size})</button>}
      </div>

      {tool === "bulk" && selected.size > 0 && <EntryBulk ids={[...selected]} onDone={() => { setSelected(new Set()); setTool(""); load(); }} />}

      <div className="mt-4 space-y-2">
        {shown.map((e) => (
          <div key={e.id} className="card flex flex-wrap items-center gap-3 p-3">
            <input type="checkbox" checked={selected.has(e.id)} aria-label={`Select ${e.title}`}
              onChange={() => setSelected((s) => { const n = new Set(s); if (n.has(e.id)) n.delete(e.id); else n.add(e.id); return n; })} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-ink-900">{e.title}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
                <StatusBadge s={e.displayStatus} />
                {e.hasPendingChanges && <span className="rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-bold text-warn">Pending changes</span>}
                {e.reviewNote && <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-bold text-danger">Changes requested</span>}
                {e.category && <span>{e.category.name} ·</span>}
                {e.stream && <span>{e.stream.name} ·</span>}
                <span className="font-mono">{e.path}</span>
                <span>· updated {fmtDate(e.updatedAt)}{e.updatedByName ? ` by ${e.updatedByName}` : ""}</span>
              </p>
            </div>
            <a className={btnGhost} href={`/admin/preview/entry/${e.id}`} target="_blank" rel="noreferrer">Preview</a>
            <button className={btnPrimary} onClick={() => setEditing(e.id)}>{can("content:publish") && (e.displayStatus === "in_review" || e.hasPendingChanges) ? "Review" : "Edit"}</button>
          </div>
        ))}
        {!shown.length && <p className="py-6 text-ink-500">Nothing here yet.</p>}
      </div>

      {kind === "exam" && examsWithoutPage.length > 0 && (
        <section className="mt-8">
          <h3 className="font-bold">Exams without a page yet</h3>
          <p className="text-[13px] text-ink-500">These exams appear on /exams and on college pages; add a detail page to rank for searches like “&lt;exam&gt; syllabus”.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {examsWithoutPage.map((x) => (
              <button key={x.id} className={btnGhost} onClick={() => setEditing({ examId: x.id, name: x.name })}>+ {x.name}</button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EntryBulk({ ids, onDone }: { ids: number[]; onDone: () => void }) {
  const { token, can } = useSession();
  const [action, setAction] = useState(can("content:publish") ? "publish" : "add-tag");
  const [value, setValue] = useState("");
  const [tax, setTax] = useState<Taxonomy | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => { adminJson<Taxonomy>("/api/admin/taxonomy", token).then(setTax).catch(() => {}); }, [token]);
  const run = async () => {
    if (!confirm(`Apply to ${ids.length} page(s)?`)) return;
    const { ok, data } = await adminRequest<{ changed: number }>("/api/admin/entries/bulk", token, { method: "POST", body: { ids, action, value: action === "set-category" ? (value ? Number(value) : null) : value } });
    setMsg(ok ? null : data.error ?? "Failed");
    if (ok) onDone();
  };
  return (
    <div className="card mt-3 flex flex-wrap items-center gap-2 p-3">
      <select value={action} onChange={(e) => { setAction(e.target.value); setValue(""); }} className={inputBase}>
        {can("content:publish") && <><option value="publish">Publish now</option><option value="unpublish">Unpublish</option></>}
        <option value="set-category">Set category</option>
        <option value="add-tag">Add tag</option>
        <option value="remove-tag">Remove tag</option>
        <option value="delete-drafts">Delete (drafts only)</option>
      </select>
      {action === "set-category" && (
        <select value={value} onChange={(e) => setValue(e.target.value)} className={inputBase}>
          <option value="">No category</option>
          {tax?.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      )}
      {(action === "add-tag" || action === "remove-tag") && <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Tag" className={`${inputBase} w-40`} />}
      <button className={btnPrimary} onClick={run} disabled={(action.endsWith("-tag") && !value.trim())}>Apply to {ids.length}</button>
      {msg && <span className="text-[13px] text-danger">{msg}</span>}
    </div>
  );
}

function EntryImport({ kind, onDone }: { kind: "course" | "exam"; onDone: () => void }) {
  const { token } = useSession();
  const [csv, setCsv] = useState<string | null>(null);
  const [res, setRes] = useState<{ rows: number; create: number; update: number; applied: boolean; errors: { row: number; slug: string; error: string }[]; sample: { row: number; action: string; slug: string; title: string }[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const run = async (text: string, dryRun: boolean) => {
    setErr(null);
    const { ok, data } = await adminRequest<NonNullable<typeof res>>("/api/admin/entries/import", token, { method: "POST", body: { type: kind, csv: text, dryRun } });
    if (!ok) { setErr(data.error ?? "Import failed"); return; }
    setRes(data);
    if (data.applied) onDone();
  };
  return (
    <div className="card mt-3 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">
        Start from the <button className="font-semibold text-brand-700 underline" onClick={() => adminDownload(`/api/admin/entries/template?type=${kind}`, token, `${kind}s-template.csv`)}>CSV template</button>.
        Rows are matched by slug: existing {kind === "course" ? "courses" : "exam pages"} are updated (blank cells keep the current value), new ones are created as drafts to review.
      </p>
      <input ref={ref} type="file" accept=".csv,text/csv" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const t = await readFileText(f); setCsv(t); setRes(null); run(t, true); if (ref.current) ref.current.value = ""; }} />
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => ref.current?.click()}>Choose CSV file…</button>
        {csv && res && !res.applied && !res.errors.length && res.create + res.update > 0 && <button className={btnPrimary} onClick={() => run(csv, false)}>Import {res.create} new + {res.update} updates</button>}
      </div>
      {err && <Notice tone="error">{err}</Notice>}
      {res && (
        <>
          <Notice tone={res.errors.length ? "error" : res.applied ? "ok" : "info"}>
            {res.rows} row(s): {res.create} new, {res.update} updates{res.errors.length ? `, ${res.errors.length} errors — nothing was saved` : ""}.{res.applied ? " Imported ✓" : ""}
          </Notice>
          {res.errors.length > 0 && <ul className="text-[12px] text-danger">{res.errors.map((e) => <li key={e.row}>Row {e.row} ({e.slug}): {e.error}</li>)}</ul>}
          {!res.applied && res.sample.length > 0 && <ul className="max-h-40 overflow-auto text-[12px] text-ink-600">{res.sample.map((s) => <li key={s.row}>{s.action === "create" ? "＋" : "✎"} {s.title} <span className="font-mono text-ink-400">{s.slug}</span></li>)}</ul>}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Editor
// ─────────────────────────────────────────────────────────────

interface Form {
  title: string; slug: string; summary: string; body: string; heroImage: string; heroAlt: string;
  streamId: number | null; categoryId: number | null; tags: string[];
  data: Record<string, unknown>; faqs: Faq[]; related: Related; exam: ExamBasics;
}
const emptyExam: ExamBasics = { name: "", fullName: "", level: "National", date: "", examOn: "", mode: "Online", stream: "" };
const emptyForm = (): Form => ({
  title: "", slug: "", summary: "", body: "", heroImage: "", heroAlt: "", streamId: null, categoryId: null, tags: [],
  data: {}, faqs: [], related: { colleges: [], entries: [], news: [] }, exam: { ...emptyExam },
});

function fromEntry(e: AdminEntry): Form {
  const base: Form = {
    title: e.title, slug: e.slug, summary: e.summary ?? "", body: e.body ?? "", heroImage: e.heroImage ?? "", heroAlt: e.heroAlt ?? "",
    streamId: e.streamId, categoryId: e.categoryId, tags: e.tags, data: e.data ?? {}, faqs: e.faqs ?? [],
    related: { colleges: [], entries: [], news: [], ...(e.related ?? {}) },
    exam: e.exam ? { name: e.exam.name, fullName: e.exam.fullName, level: e.exam.level, date: e.exam.date, examOn: e.exam.examOn?.slice(0, 10) ?? "", mode: e.exam.mode, stream: e.exam.stream } : { ...emptyExam },
  };
  // Pending edits (an editor's changes to a live page) are shown on top.
  const p = (e.pendingData ?? {}) as Partial<Form> & { exam?: Partial<ExamBasics> };
  return { ...base, ...p, data: { ...base.data, ...(p.data ?? {}) }, exam: { ...base.exam, ...(p.exam ?? {}) } } as Form;
}

function EntryEditor({ kind, id, examSeed, onBack }: { kind: EntryKind; id: number | null; examSeed: { examId: number; name: string } | null; onBack: () => void }) {
  const { token, can } = useSession();
  const publisher = can("content:publish");
  const [entry, setEntry] = useState<AdminEntry | null>(null);
  const [f, setF] = useState<Form>(() => ({ ...emptyForm(), title: examSeed ? `${examSeed.name} — Dates, Eligibility & Syllabus` : "" }));
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "warn" | "info"; text: string } | null>(null);
  const [tax, setTax] = useState<Taxonomy | null>(null);
  const [pickHero, setPickHero] = useState(false);
  const [history, setHistory] = useState(false);
  const [publishAt, setPublishAt] = useState("");
  const [unpublishAt, setUnpublishAt] = useState("");
  const [note, setNote] = useState("");
  const L = LABEL[kind];

  const load = useCallback(async (entryId: number) => {
    const e = await adminJson<AdminEntry>(`/api/admin/entries/${entryId}`, token);
    setEntry(e); setF(fromEntry(e)); setDirty(false);
    setPublishAt(toLocalInput(e.publishAt)); setUnpublishAt(toLocalInput(e.unpublishAt));
  }, [token]);
  useEffect(() => { if (id) load(id).catch((e) => setMsg({ tone: "error", text: String(e.message ?? e) })); }, [id, load]);
  useEffect(() => { adminJson<Taxonomy>("/api/admin/taxonomy", token).then(setTax).catch(() => {}); }, [token]);

  const set = (patch: Partial<Form>) => { setF((s) => ({ ...s, ...patch })); setDirty(true); setMsg(null); };
  const setData = (k: string, v: unknown) => set({ data: { ...f.data, [k]: v } });

  const payload = () => ({
    title: f.title, summary: f.summary || null, body: f.body || null, heroImage: f.heroImage || null, heroAlt: f.heroAlt || null,
    streamId: f.streamId, categoryId: f.categoryId, tags: f.tags, data: f.data, faqs: f.faqs.filter((q) => q.question.trim() && q.answer.trim()),
    related: f.related, ...(f.slug.trim() ? { slug: f.slug.trim() } : {}),
    ...(kind === "exam" && publisher ? { exam: { ...f.exam, examOn: f.exam.examOn || null } } : {}),
  });

  const save = async (): Promise<AdminEntry | null> => {
    setBusy(true); setMsg(null);
    const body = entry ? payload() : { type: kind, ...payload(), ...(examSeed ? { examId: examSeed.examId } : {}) };
    const { ok, data } = entry
      ? await adminRequest<AdminEntry & { pending?: boolean }>(`/api/admin/entries/${entry.id}`, token, { method: "PUT", body })
      : await adminRequest<AdminEntry>(`/api/admin/entries`, token, { method: "POST", body });
    setBusy(false);
    if (!ok) {
      const details = (data as { details?: { fieldErrors?: Record<string, string[]> } }).details?.fieldErrors;
      setMsg({ tone: "error", text: data.error === "Validation failed" && details ? Object.entries(details).map(([k, v]) => `${k}: ${v[0]}`).join("; ") : data.error ?? "Save failed" });
      return null;
    }
    await load(data.id);
    setMsg({ tone: "ok", text: (data as { pending?: boolean }).pending ? "Saved as pending changes — the live page is unchanged until a reviewer approves them." : !entry ? "Draft created ✓" : data.status === "PUBLISHED" ? "Saved ✓ — the live page updates within seconds." : "Saved ✓" });
    return data;
  };

  const act = async (action: "submit" | "publish" | "request-changes" | "discard-pending" | "unpublish", body: unknown, done: string) => {
    let cur = entry;
    if (dirty || !cur) { cur = await save(); if (!cur) return; }
    setBusy(true);
    const { ok, data } = await adminRequest<AdminEntry>(`/api/admin/entries/${cur.id}/${action}`, token, { method: "POST", body });
    setBusy(false);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Action failed" }); return; }
    await load(cur.id); setNote("");
    setMsg({ tone: "ok", text: done });
  };

  const publish = () => {
    const pAt = publishAt ? new Date(publishAt) : null;
    const uAt = unpublishAt ? new Date(unpublishAt) : null;
    const scheduled = pAt && pAt > new Date();
    if (!confirm(`${scheduled ? `Schedule to go live on ${pAt.toLocaleString("en-IN")}?` : "Publish now?"}${uAt ? `\nIt will be taken down on ${uAt.toLocaleString("en-IN")}.` : ""}`)) return;
    act("publish", { publishAt: pAt?.toISOString() ?? null, unpublishAt: uAt?.toISOString() ?? null }, scheduled ? "Scheduled ✓" : "Published ✓ — live within seconds.");
  };

  const del = async () => {
    if (!entry || !confirm(`Delete “${entry.title}”?${kind === "exam" ? " (The exam itself stays on /exams and college pages.)" : ""}`)) return;
    const { ok, data } = await adminRequest(`/api/admin/entries/${entry.id}`, token, { method: "DELETE" });
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Delete failed" }); return; }
    onBack();
  };

  const back = () => { if (dirty && !confirm("Discard unsaved changes?")) return; onBack(); };
  const status = entry?.displayStatus ?? "draft";
  const live = entry?.status === "PUBLISHED";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const slugPreview = f.slug || entry?.slug || "…";
  const seoTitle = useMemo(() => {
    const suffix = kind === "course" ? " — Eligibility, Fees, Duration & Colleges" : kind === "exam" ? " — Dates, Eligibility, Pattern & Colleges" : "";
    return f.title ? `${f.title}${suffix} | College Choice` : "";
  }, [f.title, kind]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className={btnGhost} onClick={back}>← Back</button>
          <h2 className="text-xl font-extrabold">{entry ? `Edit ${L.one}` : `New ${L.one}`}</h2>
          {entry && <StatusBadge s={status} />}
        </div>
        <div className="flex gap-2">
          {entry && <a className={btnGhost} href={`/admin/preview/entry/${entry.id}`} target="_blank" rel="noreferrer" onClick={(e) => { if (dirty) { e.preventDefault(); setMsg({ tone: "warn", text: "Save first, then preview." }); } }}>Preview ↗</a>}
          {entry && <button className={btnGhost} onClick={() => setHistory((v) => !v)}>History</button>}
          <button className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={save} disabled={busy || !dirty || f.title.trim().length < 2}>
            {busy ? "Saving…" : !entry ? "Save draft" : live && !publisher ? "Save as pending changes" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {entry?.reviewNote && <Notice tone="warn"><b>Reviewer feedback:</b> {entry.reviewNote}</Notice>}
        {entry?.hasPendingChanges && <Notice tone="info">This live page has <b>pending changes</b>{publisher ? " from an editor — shown below. Publish to approve them, or discard." : " awaiting approval."}</Notice>}
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      </div>
      {history && entry && <RevisionHistory entityType="entry" entityId={entry.id} onClose={() => setHistory(false)} onRestored={() => load(entry.id)} />}

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_330px]">
        <div className="min-w-0 space-y-4">
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Title <span className="font-normal text-ink-400">(the page H1)</span></span>
            <input value={f.title} onChange={(e) => set({ title: e.target.value })} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Summary <span className="font-normal text-ink-400">(intro under the H1 & meta description)</span></span>
            <textarea value={f.summary} onChange={(e) => set({ summary: e.target.value })} rows={2} className={inputCls} />
            <CharCount value={f.summary} min={LIMITS.descMin} max={LIMITS.descMax} />
          </label>

          {kind === "exam" && (
            <section className="card space-y-3 p-4">
              <h3 className="font-bold">Exam details <span className="text-[12px] font-normal text-ink-400">(shown on /exams and college pages too)</span></h3>
              {!publisher && <Notice tone="info">{entry || examSeed ? "Exam details are live on /exams straight away, so an SEO Manager or Admin edits them." : "Only an SEO Manager or Admin can add a new exam. Go back and pick an exam from “Exams without a page yet”."}</Notice>}
              <div className="grid gap-3 sm:grid-cols-2">
                {([["name", "Short name (e.g. JEE Main)"], ["fullName", "Full name"], ["level", "Level (National/State/University)"], ["date", "Exam date (display)"], ["mode", "Mode"], ["stream", "Stream"]] as [keyof ExamBasics, string][]).map(([k, label]) => (
                  <label key={k} className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">{label}</span>
                    <input value={f.exam[k]} onChange={(e) => set({ exam: { ...f.exam, [k]: e.target.value } })} className={inputCls} disabled={!publisher || (!!examSeed && !entry && k === "name")} /></label>
                ))}
                <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Exam date (for sorting)</span>
                  <input type="date" value={f.exam.examOn} onChange={(e) => set({ exam: { ...f.exam, examOn: e.target.value } })} className={inputCls} disabled={!publisher} /></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {EXAM_FIELDS.map(([k, label, kindOf]) => (
                  <label key={k} className={`block text-[13px] ${kindOf === "area" ? "sm:col-span-2" : ""}`}><span className="mb-1 block font-semibold text-ink-700">{label}</span>
                    {kindOf === "area"
                      ? <textarea value={String(f.data[k] ?? "")} onChange={(e) => setData(k, e.target.value)} rows={2} className={inputCls} />
                      : <input value={String(f.data[k] ?? "")} onChange={(e) => setData(k, e.target.value)} className={inputCls} />}
                  </label>
                ))}
              </div>
            </section>
          )}

          {kind === "course" && (
            <section className="card grid gap-3 p-4 sm:grid-cols-2">
              <h3 className="font-bold sm:col-span-2">Course facts</h3>
              {COURSE_FIELDS.map(([k, label, kindOf]) => (
                <label key={k} className={`block text-[13px] ${kindOf === "area" ? "sm:col-span-2" : ""}`}><span className="mb-1 block font-semibold text-ink-700">{label}</span>
                  {kindOf === "level" ? (
                    <select value={String(f.data[k] ?? "")} onChange={(e) => setData(k, e.target.value)} className={inputCls}>
                      {["", "UG", "PG", "Diploma", "Doctorate", "Certificate"].map((o) => <option key={o} value={o}>{o || "—"}</option>)}
                    </select>
                  ) : kindOf === "area"
                    ? <textarea value={String(f.data[k] ?? "")} onChange={(e) => setData(k, e.target.value)} rows={2} className={inputCls} />
                    : <input value={String(f.data[k] ?? "")} onChange={(e) => setData(k, e.target.value)} className={inputCls} />}
                </label>
              ))}
            </section>
          )}

          <div>
            <p className="mb-1 text-[13px] font-semibold text-ink-700">Content <span className="font-normal text-ink-400">(use H2 for sections, H3 for sub-sections; link to related pages)</span></p>
            <RichTextEditor key={entry?.id ?? "new"} value={f.body} onChange={(html) => set({ body: html })} placeholder={`${L.one} content`} />
          </div>

          {kind === "page" && <CtaEditor blocks={(f.data.blocks as Cta[] | undefined) ?? []} onChange={(blocks) => setData("blocks", blocks)} />}
          <FaqEditor faqs={f.faqs} onChange={(faqs) => set({ faqs })} />
          <RelatedEditor related={f.related} onChange={(related) => set({ related })} selfId={entry?.id ?? null} />
        </div>

        <div className="space-y-4">
          <div className="card space-y-3 p-4">
            <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">URL slug</span>
              <input value={f.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="from the title" className={inputCls} />
              <span className="mt-1 block font-mono text-[11px] text-ink-400">{L.base}{slugPreview}{live ? " · changing it adds a 301" : ""}</span>
            </label>
            {kind !== "page" && (
              <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Stream</span>
                <select value={f.streamId ?? ""} onChange={(e) => set({ streamId: e.target.value ? Number(e.target.value) : null })} className={inputCls}>
                  <option value="">—</option>
                  {tax?.streams.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </label>
            )}
            <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Category</span>
              <select value={f.categoryId ?? ""} onChange={(e) => set({ categoryId: e.target.value ? Number(e.target.value) : null })} className={inputCls}>
                <option value="">—</option>
                {tax?.categories.map((c) => <option key={c.id} value={c.id}>{c.parentId ? "  ↳ " : ""}{c.name}</option>)}
              </select>
            </label>
            <TagInput tags={f.tags} suggestions={tax?.tags.map((t) => t.name) ?? []} onChange={(tags) => set({ tags })} />
            <div>
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Featured image</span>
              <div className="aspect-[21/9] overflow-hidden rounded-xl border border-line bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {f.heroImage ? <img src={thumbOf({ url: f.heroImage, variants: null })} alt={f.heroAlt} className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-ink-400">None</span>}
              </div>
              <div className="mt-2 flex gap-2">
                <button className={btnGhost} onClick={() => setPickHero(true)}>Choose from library</button>
                {f.heroImage && <button className={btnDanger} onClick={() => set({ heroImage: "", heroAlt: "" })}>Remove</button>}
              </div>
              {f.heroImage && <input value={f.heroAlt} onChange={(e) => set({ heroAlt: e.target.value })} placeholder="Alt text" className={`${inputCls} mt-2`} />}
            </div>
          </div>

          <div className="card space-y-2 p-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">SEO review</p>
            <SerpPreview title={seoTitle} description={f.summary} url={`${origin}${L.base}${slugPreview}`} />
            <ContentChecks html={f.body} title={f.title} summary={f.summary} />
            <p className="text-[11px] text-ink-400">Fine-tune title, description, canonical and schema in SEO → Pages after publishing.</p>
          </div>

          <div className="card space-y-3 p-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">Publishing</p>
            {entry && <p className="text-[12px] text-ink-500">{entry.authorName && <>Written by {entry.authorName}. </>}{status === "scheduled" && entry.publishAt && <>Goes live {fmtDate(entry.publishAt)}. </>}{entry.unpublishAt && <>Expires {fmtDate(entry.unpublishAt)}.</>}</p>}
            {!publisher && (
              <>
                {(!entry || status === "draft" || status === "unpublished") && <button className={`${btnPrimary} w-full`} disabled={busy || f.title.trim().length < 2} onClick={() => act("submit", {}, "Submitted for review ✓")}>Submit for review</button>}
                {status === "in_review" && <p className="text-[13px] text-ink-500">Waiting for review.</p>}
                {entry?.hasPendingChanges && <button className={`${btnGhost} w-full`} disabled={busy} onClick={() => act("discard-pending", {}, "Pending changes withdrawn.")}>Withdraw pending changes</button>}
              </>
            )}
            {publisher && (
              <>
                <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Publish at <span className="font-normal text-ink-400">(blank = now)</span></span>
                  <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} className={inputCls} /></label>
                <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Expire at <span className="font-normal text-ink-400">(optional)</span></span>
                  <input type="datetime-local" value={unpublishAt} onChange={(e) => setUnpublishAt(e.target.value)} className={inputCls} /></label>
                <button className={`${btnPrimary} w-full`} disabled={busy || f.title.trim().length < 2} onClick={publish}>
                  {publishAt && new Date(publishAt) > new Date() ? "Schedule" : entry?.hasPendingChanges ? "Approve & publish changes" : live ? "Update schedule" : "Approve & publish now"}
                </button>
                {entry && (status === "in_review" || entry.hasPendingChanges) && (
                  <div className="space-y-2 border-t border-line pt-3">
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="What needs changing?" className={inputCls} />
                    <button className={`${btnGhost} w-full`} disabled={busy || !note.trim()} onClick={() => act("request-changes", { note }, "Sent back with your note.")}>Request changes</button>
                    {entry.hasPendingChanges && <button className={`${btnGhost} w-full`} disabled={busy} onClick={() => act("discard-pending", {}, "Pending changes discarded.")}>Discard pending changes</button>}
                  </div>
                )}
                {live && <button className={`${btnDanger} w-full`} disabled={busy} onClick={() => confirm("Take this page off the site?") && act("unpublish", {}, "Unpublished.")}>Unpublish</button>}
              </>
            )}
            {entry && (publisher || status === "draft" || status === "in_review") && <button className="w-full text-[12px] font-semibold text-danger hover:underline" onClick={del}>Delete</button>}
          </div>
        </div>
      </div>
      {pickHero && <MediaPickerModal onPick={(m) => set({ heroImage: m.variants?.["1600"] ?? m.url, heroAlt: m.alt ?? "" })} onClose={() => setPickHero(false)} />}
    </div>
  );
}

function TagInput({ tags, suggestions, onChange }: { tags: string[]; suggestions: string[]; onChange: (t: string[]) => void }) {
  const [v, setV] = useState("");
  const add = () => { const t = v.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setV(""); };
  return (
    <div className="text-[13px]">
      <span className="mb-1 block font-semibold text-ink-700">Tags</span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => <span key={t} className="chip">{t} <button aria-label={`Remove ${t}`} className="ml-1 text-ink-400 hover:text-danger" onClick={() => onChange(tags.filter((x) => x !== t))}>×</button></span>)}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        <input list="tag-suggestions" value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Add a tag" className={inputCls} />
        <button className={btnGhost} onClick={add}>Add</button>
      </div>
      <datalist id="tag-suggestions">{suggestions.map((s) => <option key={s} value={s} />)}</datalist>
    </div>
  );
}

function FaqEditor({ faqs, onChange }: { faqs: Faq[]; onChange: (f: Faq[]) => void }) {
  const upd = (i: number, patch: Partial<Faq>) => onChange(faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  return (
    <section className="card space-y-3 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">FAQs <span className="text-[12px] font-normal text-ink-400">(also added as FAQ schema)</span></h3>
        <button className={btnGhost} onClick={() => onChange([...faqs, { question: "", answer: "" }])}>+ Add FAQ</button>
      </div>
      {faqs.map((f, i) => (
        <div key={i} className="space-y-1.5 rounded-lg border border-line p-3">
          <input value={f.question} onChange={(e) => upd(i, { question: e.target.value })} placeholder="Question" className={inputCls} />
          <textarea value={f.answer} onChange={(e) => upd(i, { answer: e.target.value })} rows={2} placeholder="Answer" className={inputCls} />
          <div className="flex gap-2 text-[12px]">
            <button className="text-ink-500 hover:underline" disabled={i === 0} onClick={() => { const n = [...faqs]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; onChange(n); }}>↑ Up</button>
            <button className="text-danger hover:underline" onClick={() => onChange(faqs.filter((_, j) => j !== i))}>Remove</button>
          </div>
        </div>
      ))}
    </section>
  );
}

function CtaEditor({ blocks, onChange }: { blocks: Cta[]; onChange: (b: Cta[]) => void }) {
  const upd = (i: number, patch: Partial<Cta>) => onChange(blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));
  return (
    <section className="card space-y-3 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Call-to-action blocks</h3>
        <button className={btnGhost} onClick={() => onChange([...blocks, { heading: "", text: "", buttonLabel: "", buttonUrl: "" }])}>+ Add block</button>
      </div>
      {blocks.map((b, i) => (
        <div key={i} className="grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-2">
          <input value={b.heading} onChange={(e) => upd(i, { heading: e.target.value })} placeholder="Heading, e.g. Talk to a counsellor" className={`${inputCls} sm:col-span-2`} />
          <textarea value={b.text} onChange={(e) => upd(i, { text: e.target.value })} rows={2} placeholder="Short text" className={`${inputCls} sm:col-span-2`} />
          <input value={b.buttonLabel} onChange={(e) => upd(i, { buttonLabel: e.target.value })} placeholder="Button label" className={inputCls} />
          <input value={b.buttonUrl} onChange={(e) => upd(i, { buttonUrl: e.target.value })} placeholder="/colleges, https://… or #counselling (opens the enquiry form)" className={inputCls} />
          <button className="text-left text-[12px] text-danger hover:underline" onClick={() => onChange(blocks.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
    </section>
  );
}

/** Manual internal links: related colleges, courses/exams/pages and articles. */
function RelatedEditor({ related, onChange, selfId }: { related: Related; onChange: (r: Related) => void; selfId: number | null }) {
  const { token } = useSession();
  const [names, setNames] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<"colleges" | "entries" | "news">("colleges");
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ id: number; label: string }[]>([]);

  // Labels for already-linked items.
  useEffect(() => {
    (async () => {
      const n: Record<string, string> = {};
      if (related.colleges.length) {
        const r = await adminJson<{ items: { id: number; name: string }[] }>(`/api/admin/colleges?ids=${related.colleges.join(",")}`, token).catch(() => ({ items: [] }));
        r.items.forEach((c) => (n[`colleges:${c.id}`] = c.name));
      }
      if (related.entries.length) {
        for (const t of ["course", "exam", "page"]) {
          const r = await adminJson<{ items: { id: number; title: string }[] }>(`/api/admin/entries?type=${t}`, token).catch(() => ({ items: [] }));
          r.items.forEach((e) => (n[`entries:${e.id}`] = e.title));
        }
      }
      if (related.news.length) {
        const r = await adminJson<{ items: { id: number; title: string }[] }>(`/api/admin/news`, token).catch(() => ({ items: [] }));
        r.items.forEach((a) => (n[`news:${a.id}`] = a.title));
      }
      setNames((s) => ({ ...s, ...n }));
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      if (kind === "colleges") {
        const r = await adminJson<{ items: { id: number; name: string }[] }>(`/api/admin/colleges?search=${encodeURIComponent(q)}`, token).catch(() => ({ items: [] }));
        setResults(r.items.slice(0, 10).map((c) => ({ id: c.id, label: c.name })));
      } else if (kind === "entries") {
        const all = (await Promise.all(["course", "exam", "page"].map((t) => adminJson<{ items: { id: number; title: string; type: string }[] }>(`/api/admin/entries?type=${t}&q=${encodeURIComponent(q)}`, token).catch(() => ({ items: [] }))))).flatMap((r) => r.items);
        setResults(all.filter((e) => e.id !== selfId).slice(0, 10).map((e) => ({ id: e.id, label: `${e.title} (${e.type.toLowerCase()})` })));
      } else {
        const r = await adminJson<{ items: { id: number; title: string }[] }>(`/api/admin/news`, token).catch(() => ({ items: [] }));
        setResults(r.items.filter((a) => a.title.toLowerCase().includes(q.toLowerCase())).slice(0, 10).map((a) => ({ id: a.id, label: a.title })));
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q, kind, token, selfId]);

  const add = (id: number, label: string) => {
    if (related[kind].includes(id)) return;
    setNames((s) => ({ ...s, [`${kind}:${id}`]: label }));
    onChange({ ...related, [kind]: [...related[kind], id] });
  };
  const remove = (k: keyof Related, id: number) => onChange({ ...related, [k]: related[k].filter((x) => x !== id) });

  return (
    <section className="card space-y-3 p-4">
      <h3 className="font-bold">Related links <span className="text-[12px] font-normal text-ink-400">(internal linking — shown at the end of the page)</span></h3>
      {(["colleges", "entries", "news"] as const).map((k) => related[k].length > 0 && (
        <div key={k} className="flex flex-wrap items-center gap-1.5 text-[12px]">
          <span className="font-semibold text-ink-500">{k === "colleges" ? "Colleges" : k === "entries" ? "Courses/exams/pages" : "Articles"}:</span>
          {related[k].map((id) => <span key={id} className="chip">{names[`${k}:${id}`] ?? `#${id}`} <button aria-label="Remove" className="ml-1 text-ink-400 hover:text-danger" onClick={() => remove(k, id)}>×</button></span>)}
        </div>
      ))}
      <div className="flex gap-2">
        <select value={kind} onChange={(e) => { setKind(e.target.value as typeof kind); setResults([]); }} className={inputBase}>
          <option value="colleges">College</option>
          <option value="entries">Course / exam / page</option>
          <option value="news">Article</option>
        </select>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search to add…" className={inputCls} />
      </div>
      {results.length > 0 && (
        <ul className="max-h-48 divide-y divide-line overflow-auto rounded-lg border border-line text-[13px]">
          {results.map((r) => <li key={r.id}><button className="w-full px-3 py-1.5 text-left hover:bg-brand-50" onClick={() => add(r.id, r.label)}>+ {r.label}</button></li>)}
        </ul>
      )}
    </section>
  );
}
