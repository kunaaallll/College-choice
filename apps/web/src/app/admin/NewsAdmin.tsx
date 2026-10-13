"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { adminJson, adminRequest, adminUpload } from "./adminApi";
import { RevisionHistory } from "./RevisionHistory";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, CharCount, fmtDate, inputCls, LIMITS, Notice, SerpPreview } from "./seo/ui";

const CATEGORIES = ["Admissions", "Results", "Counselling", "Exams", "Scholarships", "Career", "General"];

type DisplayStatus = "draft" | "in_review" | "scheduled" | "published" | "expired" | "unpublished";

export interface AdminArticle {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string | null;
  date: string;
  readTime: string;
  imgUrl: string | null;
  status: "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "UNPUBLISHED";
  displayStatus: DisplayStatus;
  publishAt: string | null;
  unpublishAt: string | null;
  publishedAt: string;
  pendingData: Partial<Draft> | null;
  hasPendingChanges: boolean;
  reviewNote: string | null;
  authorName: string | null;
  updatedByName: string | null;
  updatedAt: string;
  isLive?: boolean;
}

type Draft = { slug: string; category: string; title: string; excerpt: string; body: string; date: string; readTime: string; imgUrl: string };

export const STATUS: Record<DisplayStatus, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-line text-ink-600" },
  in_review: { label: "In review", cls: "bg-brand-50 text-brand-700" },
  scheduled: { label: "Scheduled", cls: "bg-warn/15 text-warn" },
  published: { label: "Live", cls: "bg-success/15 text-success" },
  expired: { label: "Expired", cls: "bg-line text-ink-500" },
  unpublished: { label: "Unpublished", cls: "bg-danger/10 text-danger" },
};
export const StatusBadge = ({ s }: { s: DisplayStatus }) => <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS[s].cls}`}>{STATUS[s].label}</span>;

const FILTERS: [string, string][] = [["all", "All"], ["draft", "Drafts"], ["review", "Awaiting review"], ["scheduled", "Scheduled"], ["published", "Live"], ["off", "Unpublished / expired"]];

const today = () => new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const emptyDraft = (): Draft => ({ slug: "", category: "Admissions", title: "", excerpt: "", body: "", date: today(), readTime: "3 min read", imgUrl: "" });

/** ISO → value for <input type="datetime-local"> in the viewer's timezone. */
const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

export function NewsAdmin() {
  const { token, can } = useSession();
  const [items, setItems] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<AdminArticle | "new" | null>(null);

  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await adminJson<{ items: AdminArticle[] }>(`/api/admin/news`, token);
      setItems(data.items);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, [token]);
  useEffect(() => { reload(); }, [reload]);

  const matches = (a: AdminArticle, f: string) =>
    f === "all" ? true
    : f === "draft" ? a.displayStatus === "draft"
    : f === "review" ? a.displayStatus === "in_review" || a.hasPendingChanges
    : f === "scheduled" ? a.displayStatus === "scheduled"
    : f === "published" ? a.displayStatus === "published"
    : a.displayStatus === "unpublished" || a.displayStatus === "expired";
  const shown = items.filter((a) => matches(a, filter));

  if (editing) {
    return <ArticleEditor articleId={editing === "new" ? null : editing.id} onBack={() => { setEditing(null); reload(); }} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold">News &amp; blog</h2>
          <p className="mt-1 text-sm text-ink-500">
            {can("content:publish")
              ? "Write, review and publish articles — now or on a schedule. Changes go live within seconds."
              : "Write articles and submit them for review. An SEO Manager or Admin approves and publishes them."}
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm" onClick={() => setEditing("new")}>+ New article</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {FILTERS.map(([k, label]) => {
          const n = items.filter((a) => matches(a, k)).length;
          return (
            <button key={k} onClick={() => setFilter(k)} className={`rounded-lg px-3 py-1.5 text-[13px] font-bold ${filter === k ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-line/50"}`}>
              {label} <span className="opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      {loading ? <p className="mt-8 text-ink-500">Loading…</p> : (
        <div className="mt-4 space-y-3">
          {shown.map((a) => (
            <div key={a.id} className="card flex flex-wrap items-center gap-3 p-3">
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-line">
                {a.imgUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={a.imgUrl} alt="" className="h-full w-full object-cover" />
                  : <span className="flex h-full items-center justify-center text-[10px] text-ink-400">no image</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink-900">{a.title}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
                  <StatusBadge s={a.displayStatus} />
                  {a.hasPendingChanges && <span className="rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-bold text-warn">Pending changes</span>}
                  {a.reviewNote && <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-bold text-danger">Changes requested</span>}
                  <span>{a.category}</span>·
                  <span>{a.displayStatus === "scheduled" ? `goes live ${fmtDate(a.publishAt)}` : `updated ${fmtDate(a.updatedAt)}`}{a.updatedByName ? ` by ${a.updatedByName}` : ""}</span>
                  <span className="font-mono">/news/{a.slug}</span>
                </p>
              </div>
              <a className={btnGhost} href={`/admin/preview/news/${a.id}`} target="_blank" rel="noreferrer">Preview</a>
              <button className={btnPrimary} onClick={() => setEditing(a)}>{can("content:publish") && (a.displayStatus === "in_review" || a.hasPendingChanges) ? "Review" : "Edit"}</button>
            </div>
          ))}
          {shown.length === 0 && <p className="text-ink-500">Nothing here.</p>}
        </div>
      )}
    </div>
  );
}

/** Edit an article and move it through the workflow. */
function ArticleEditor({ articleId, onBack }: { articleId: number | null; onBack: () => void }) {
  const { token, can } = useSession();
  const [article, setArticle] = useState<AdminArticle | null>(null);
  const [d, setD] = useState<Draft>(emptyDraft());
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "warn" | "info"; text: string } | null>(null);
  const [publishAt, setPublishAt] = useState("");
  const [unpublishAt, setUnpublishAt] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const publisher = can("content:publish");

  const load = useCallback(async (id: number) => {
    const a = await adminJson<AdminArticle>(`/api/admin/news/${id}`, token);
    setArticle(a);
    // Show pending edits (if any) on top of the live version.
    const base: Draft = { slug: a.slug, category: a.category, title: a.title, excerpt: a.excerpt, body: a.body ?? "", date: a.date, readTime: a.readTime, imgUrl: a.imgUrl ?? "" };
    setD({ ...base, ...Object.fromEntries(Object.entries(a.pendingData ?? {}).map(([k, v]) => [k, v ?? ""])) } as Draft);
    setPublishAt(toLocalInput(a.publishAt));
    setUnpublishAt(toLocalInput(a.unpublishAt));
    setDirty(false);
  }, [token]);

  useEffect(() => { if (articleId) load(articleId).catch((e) => setMsg({ tone: "error", text: String(e.message ?? e) })); }, [articleId, load]);

  const set = (patch: Partial<Draft>) => { setD((s) => ({ ...s, ...patch })); setDirty(true); setMsg(null); };

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", files[0]);
      const { url } = await adminUpload<{ url: string }>(`/api/admin/news/upload`, token, fd);
      set({ imgUrl: url });
    } catch (e) { setMsg({ tone: "error", text: e instanceof Error ? e.message : "Upload failed" }); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const payload = () => ({
    category: d.category, title: d.title, excerpt: d.excerpt, body: d.body, date: d.date, readTime: d.readTime, imgUrl: d.imgUrl,
    ...(d.slug.trim() ? { slug: d.slug.trim() } : {}),
  });

  /** Save edits; returns the saved article (or null on error). */
  const save = async (): Promise<AdminArticle | null> => {
    setBusy(true); setMsg(null);
    const { ok, data } = article
      ? await adminRequest<AdminArticle & { pending?: boolean }>(`/api/admin/news/${article.id}`, token, { method: "PUT", body: payload() })
      : await adminRequest<AdminArticle>(`/api/admin/news`, token, { method: "POST", body: payload() });
    setBusy(false);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Save failed" }); return null; }
    await load(data.id);
    setMsg({
      tone: "ok",
      text: (data as { pending?: boolean }).pending
        ? "Saved as pending changes — the live article is unchanged until a reviewer approves them."
        : !article ? "Draft created ✓" : data.status === "PUBLISHED" ? "Saved ✓ — the live article updates within seconds." : "Saved ✓",
    });
    return data;
  };

  /** Run a workflow action (saving unsaved edits first). */
  const act = async (action: "submit" | "publish" | "request-changes" | "discard-pending" | "unpublish", body: unknown, done: string) => {
    let current = article;
    if (dirty || !current) { current = await save(); if (!current) return; }
    setBusy(true);
    const { ok, data } = await adminRequest<AdminArticle>(`/api/admin/news/${current.id}/${action}`, token, { method: "POST", body });
    setBusy(false);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Action failed" }); return; }
    await load(current.id);
    setNote("");
    setMsg({ tone: "ok", text: done });
  };

  const publish = () => {
    const pAt = publishAt ? new Date(publishAt) : null;
    const uAt = unpublishAt ? new Date(unpublishAt) : null;
    const scheduled = pAt && pAt > new Date();
    const text = scheduled ? `Schedule this article to go live on ${pAt.toLocaleString("en-IN")}?` : "Publish this article now?";
    if (!confirm(`${text}${uAt ? `\nIt will be taken down on ${uAt.toLocaleString("en-IN")}.` : ""}`)) return;
    act("publish", { publishAt: pAt?.toISOString() ?? null, unpublishAt: uAt?.toISOString() ?? null }, scheduled ? "Scheduled ✓" : "Published ✓ — live within seconds.");
  };

  const del = async () => {
    if (!article || !confirm(`Delete “${article.title}” permanently?`)) return;
    const { ok, data } = await adminRequest(`/api/admin/news/${article.id}`, token, { method: "DELETE" });
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Delete failed" }); return; }
    onBack();
  };

  const back = () => { if (dirty && !confirm("Discard unsaved changes?")) return; onBack(); };

  const status = article?.displayStatus ?? "draft";
  const live = article?.status === "PUBLISHED";
  const seoTitle = d.title ? `${d.title} | College Choice` : "";
  const url = useMemo(() => `${typeof window !== "undefined" ? window.location.origin : ""}/news/${d.slug || "…"}`, [d.slug]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className={btnGhost} onClick={back}>← Back to list</button>
          <h2 className="text-xl font-extrabold">{article ? "Edit article" : "New article"}</h2>
          {article && <StatusBadge s={status} />}
        </div>
        <div className="flex gap-2">
          {article && <a className={btnGhost} href={`/admin/preview/news/${article.id}`} target="_blank" rel="noreferrer" onClick={(e) => { if (dirty) { e.preventDefault(); setMsg({ tone: "warn", text: "Save your changes first, then preview." }); } }}>Preview ↗</a>}
          {article && <button className={btnGhost} onClick={() => setHistory((v) => !v)}>History</button>}
          <button className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={save} disabled={busy || !dirty || !d.title.trim() || !d.excerpt.trim()}>
            {busy ? "Saving…" : !article ? "Save draft" : live && !publisher ? "Save as pending changes" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {article?.reviewNote && <Notice tone="warn"><b>Reviewer feedback:</b> {article.reviewNote}</Notice>}
        {article?.hasPendingChanges && (
          <Notice tone="info">
            This live article has <b>pending changes</b>{publisher ? " from an editor — they're shown below. Publish to approve them, or discard them." : " awaiting approval. The live version is unchanged until a reviewer approves them."}
          </Notice>
        )}
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      </div>

      {history && article && <RevisionHistory entityType="news" entityId={article.id} onClose={() => setHistory(false)} onRestored={() => load(article.id)} />}

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Title <span className="font-normal text-ink-400">(also the H1 and SEO title)</span></span>
            <input value={d.title} onChange={(e) => set({ title: e.target.value })} placeholder="Article title" className={inputCls} />
            <CharCount value={seoTitle} min={LIMITS.titleMin} max={LIMITS.titleMax} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Excerpt <span className="font-normal text-ink-400">(intro, cards & meta description)</span></span>
            <textarea value={d.excerpt} onChange={(e) => set({ excerpt: e.target.value })} rows={3} placeholder="Short summary…" className={inputCls} />
            <CharCount value={d.excerpt} min={LIMITS.descMin} max={LIMITS.descMax} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Body <span className="font-normal text-ink-400">(markdown: ## headings, - lists, **bold**, [links](/colleges/…))</span></span>
            <textarea value={d.body} onChange={(e) => set({ body: e.target.value })} rows={14} placeholder="Full article…" className={`${inputCls} font-mono text-[13px]`} />
          </label>
          <div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-ink-400">SEO review — Google preview</p>
            <SerpPreview title={seoTitle} description={d.excerpt} url={url} />
            <p className="mt-1 text-[12px] text-ink-400">Fine-tune the SEO title, description, social image and schema after publishing in SEO → Pages.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card space-y-3 p-4">
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Category</span>
              <select value={d.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block"><span className="mb-1 block text-[13px] font-semibold text-ink-700">Display date</span>
                <input value={d.date} onChange={(e) => set({ date: e.target.value })} placeholder="23 Jul 2026" className={inputCls} /></label>
              <label className="block"><span className="mb-1 block text-[13px] font-semibold text-ink-700">Read time</span>
                <input value={d.readTime} onChange={(e) => set({ readTime: e.target.value })} placeholder="3 min read" className={inputCls} /></label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Slug <span className="font-normal text-ink-400">{live ? "(changing it adds a 301 redirect)" : "(optional; from the title)"}</span></span>
              <input value={d.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="auto-generated" className={inputCls} />
            </label>
            <div>
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Cover image</span>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-line">
                {d.imgUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={d.imgUrl} alt="" className="h-full w-full object-cover" />
                  : <span className="flex h-full items-center justify-center text-xs text-ink-400">No image</span>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files)} />
              <div className="mt-2 flex gap-2">
                <button className={btnGhost} onClick={() => fileRef.current?.click()} disabled={uploading}>{uploading ? "Uploading…" : "⬆ Upload image"}</button>
                {d.imgUrl && <button className={btnDanger} onClick={() => set({ imgUrl: "" })}>Remove</button>}
              </div>
            </div>
          </div>

          {/* Workflow */}
          <div className="card space-y-3 p-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">Publishing</p>
            {article && (
              <p className="text-[12px] text-ink-500">
                {article.authorName && <>Written by {article.authorName}. </>}
                {article.publishAt && status === "scheduled" && <>Goes live {fmtDate(article.publishAt)}. </>}
                {article.unpublishAt && <>Expires {fmtDate(article.unpublishAt)}. </>}
              </p>
            )}

            {!publisher && (
              <>
                {(!article || status === "draft" || status === "unpublished") && (
                  <button className={`${btnPrimary} w-full`} disabled={busy || !d.title.trim() || !d.excerpt.trim()} onClick={() => act("submit", {}, "Submitted for review ✓ An SEO Manager or Admin will review it.")}>Submit for review</button>
                )}
                {status === "in_review" && <p className="text-[13px] text-ink-500">Waiting for review. You can keep editing until it&apos;s approved.</p>}
                {article?.hasPendingChanges && <button className={`${btnGhost} w-full`} disabled={busy} onClick={() => act("discard-pending", {}, "Pending changes discarded.")}>Withdraw pending changes</button>}
                {live && !article?.hasPendingChanges && <p className="text-[13px] text-ink-500">This article is live. Your edits are saved as pending changes for approval.</p>}
              </>
            )}

            {publisher && (
              <>
                <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Publish at <span className="font-normal text-ink-400">(blank = now)</span></span>
                  <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} className={inputCls} /></label>
                <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Expire at <span className="font-normal text-ink-400">(optional — taken down automatically)</span></span>
                  <input type="datetime-local" value={unpublishAt} onChange={(e) => setUnpublishAt(e.target.value)} className={inputCls} /></label>
                <button className={`${btnPrimary} w-full`} disabled={busy || !d.title.trim() || !d.excerpt.trim()} onClick={publish}>
                  {publishAt && new Date(publishAt) > new Date() ? "Schedule" : live && !article?.hasPendingChanges ? "Update schedule" : article?.hasPendingChanges ? "Approve & publish changes" : "Approve & publish now"}
                </button>
                {article && (status === "in_review" || article.hasPendingChanges) && (
                  <div className="space-y-2 border-t border-line pt-3">
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="What needs changing?" className={inputCls} />
                    <button className={`${btnGhost} w-full`} disabled={busy || !note.trim()} onClick={() => act("request-changes", { note }, "Sent back to the author with your note.")}>Request changes</button>
                    {article.hasPendingChanges && <button className={`${btnGhost} w-full`} disabled={busy} onClick={() => act("discard-pending", {}, "Pending changes discarded.")}>Discard pending changes</button>}
                  </div>
                )}
                {live && <button className={`${btnDanger} w-full`} disabled={busy} onClick={() => confirm("Take this article off the site?") && act("unpublish", {}, "Unpublished — it's no longer on the site.")}>Unpublish</button>}
              </>
            )}
            {article && (publisher || status === "draft" || status === "in_review") && (
              <button className="w-full text-[12px] font-semibold text-danger hover:underline" onClick={del}>Delete article</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
