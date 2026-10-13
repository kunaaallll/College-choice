"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NewsArticle } from "@/lib/types";
import { adminJson, adminUpload } from "./adminApi";

const inputCls = "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500";
const btnPrimary = "btn-primary px-3 py-1.5 text-[12px] disabled:opacity-60";
const btnGhost = "rounded-lg border border-line px-2.5 py-1 text-[12px] font-semibold text-ink-600 hover:border-brand-400 disabled:opacity-50";
const btnDanger = "rounded-lg border border-danger/40 px-2.5 py-1 text-[12px] font-semibold text-danger hover:bg-danger/10 disabled:opacity-50";

const CATEGORIES = ["Admissions", "Results", "Counselling", "Exams", "Scholarships", "Career", "General"];

type Draft = {
  id?: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: string;
  imgUrl: string;
};

const emptyDraft = (): Draft => ({
  slug: "", category: "Admissions", title: "", excerpt: "", body: "",
  date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  readTime: "3 min read", imgUrl: "",
});

export function NewsAdmin({ token }: { token: string }) {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);

  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await adminJson<{ items: NewsArticle[] }>(`/api/admin/news`, token);
      setItems(data.items);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { reload(); }, [reload]);

  const startNew = () => setEditing(emptyDraft());
  const startEdit = (a: NewsArticle) => setEditing({
    id: a.id, slug: a.slug, category: a.category, title: a.title, excerpt: a.excerpt,
    body: a.body ?? "", date: a.date, readTime: a.readTime, imgUrl: a.imgUrl ?? "",
  });
  const del = async (id: number) => {
    if (!confirm("Delete this article?")) return;
    await adminJson(`/api/admin/news/${id}`, token, { method: "DELETE" });
    reload();
  };

  if (editing) {
    return <ArticleForm token={token} draft={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); reload(); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold">News & blog</h2>
          <p className="mt-1 text-sm text-ink-500">Add, edit or remove articles. Changes appear on /news after the page cache refreshes (up to ~30 min).</p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm" onClick={startNew}>+ Add article</button>
      </div>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      {loading ? <p className="mt-8 text-ink-500">Loading…</p> : (
        <div className="mt-6 space-y-3">
          {items.map((a) => (
            <div key={a.id} className="card flex items-center gap-3 p-3">
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-line">
                {a.imgUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={a.imgUrl} alt="" className="h-full w-full object-cover" />
                  : <span className="flex h-full items-center justify-center text-[10px] text-ink-400">no image</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink-900">{a.title}</p>
                <p className="text-xs text-ink-400"><span className="chip mr-2">{a.category}</span>{a.date} · {a.readTime} · /{a.slug}</p>
              </div>
              <button className={btnGhost} onClick={() => startEdit(a)}>Edit</button>
              <button className={btnDanger} onClick={() => del(a.id)}>Delete</button>
            </div>
          ))}
          {items.length === 0 && <p className="text-ink-500">No articles yet — add one.</p>}
        </div>
      )}
    </div>
  );
}

function ArticleForm({ token, draft, onCancel, onSaved }: { token: string; draft: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<Draft>) => setD((s) => ({ ...s, ...patch }));

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true); setErr(null);
    try {
      const fd = new FormData();
      fd.append("image", files[0]);
      const { url } = await adminUpload<{ url: string }>(`/api/admin/news/upload`, token, fd);
      set({ imgUrl: url });
    } catch (e) { setErr(e instanceof Error ? e.message : "Upload failed"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const save = async () => {
    setBusy(true); setErr(null);
    try {
      const payload = {
        category: d.category, title: d.title, excerpt: d.excerpt, body: d.body,
        date: d.date, readTime: d.readTime, imgUrl: d.imgUrl,
        ...(d.slug.trim() ? { slug: d.slug.trim() } : {}),
      };
      if (d.id) await adminJson(`/api/admin/news/${d.id}`, token, { method: "PUT", body: payload });
      else await adminJson(`/api/admin/news`, token, { method: "POST", body: payload });
      onSaved();
    } catch (e) { setErr(e instanceof Error ? e.message : "Save failed"); setBusy(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">{d.id ? "Edit article" : "New article"}</h2>
        <button className={btnGhost} onClick={onCancel}>← Back to list</button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Title</span>
            <input value={d.title} onChange={(e) => set({ title: e.target.value })} placeholder="Article title" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Excerpt <span className="font-normal text-ink-400">(shown on cards & as the intro)</span></span>
            <textarea value={d.excerpt} onChange={(e) => set({ excerpt: e.target.value })} rows={2} placeholder="Short summary…" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Body <span className="font-normal text-ink-400">(markdown)</span></span>
            <textarea value={d.body} onChange={(e) => set({ body: e.target.value })} rows={12} placeholder="Full article (markdown)…" className={`${inputCls} font-mono text-[13px]`} />
          </label>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Category</span>
            <select value={d.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Date</span>
              <input value={d.date} onChange={(e) => set({ date: e.target.value })} placeholder="23 Jul 2026" className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold text-ink-700">Read time</span>
              <input value={d.readTime} onChange={(e) => set({ readTime: e.target.value })} placeholder="3 min read" className={inputCls} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-[13px] font-semibold text-ink-700">Slug <span className="font-normal text-ink-400">(optional; auto from title)</span></span>
            <input value={d.slug} onChange={(e) => set({ slug: e.target.value })} placeholder="auto-generated" className={inputCls} />
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
      </div>

      {err && <p className="mt-3 text-sm text-danger">{err}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <button className={btnGhost} onClick={onCancel}>Cancel</button>
        <button className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={save} disabled={busy || !d.title.trim() || !d.excerpt.trim()}>
          {busy ? "Saving…" : d.id ? "Save changes" : "Publish article"}
        </button>
      </div>
    </div>
  );
}
