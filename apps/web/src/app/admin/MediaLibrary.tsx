"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { adminRequest, adminUpload } from "./adminApi";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, fmtDate, inputBase, inputCls, Notice, Pager } from "./seo/ui";

export interface MediaItem {
  id: number;
  url: string;
  filename: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  title: string | null;
  caption: string | null;
  description: string | null;
  folder: string;
  variants: Record<string, string> | null;
  createdAt: string;
  usedIn: string[];
}

interface MediaPage {
  items: MediaItem[];
  total: number;
  totalPages: number;
  folders: { name: string; count: number }[];
  counts: { total: number; noAlt: number };
}

const isImage = (m: Pick<MediaItem, "mime">) => m.mime.startsWith("image/");
const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);
/** Smallest variant for thumbnails. */
export const thumbOf = (m: Pick<MediaItem, "url" | "variants">) => m.variants?.["480"] ?? m.url;

/**
 * Media library. With `onPick`, it works as a picker (images only, click to choose).
 */
export function MediaLibrary({ onPick, pickLabel = "Use this image" }: { onPick?: (m: MediaItem) => void; pickLabel?: string }) {
  const { token } = useSession();
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("*");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MediaPage | null>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "warn"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadFolder, setUploadFolder] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const sp = new URLSearchParams({ page: String(page), folder, ...(q ? { q } : {}), ...(filter ? { filter } : {}), ...(onPick ? { type: "image" } : {}) });
    const { ok, data } = await adminRequest<MediaPage>(`/api/admin/media?${sp}`, token);
    if (ok) setData(data); else setMsg({ tone: "error", text: data.error ?? "Failed to load" });
  }, [q, folder, filter, page, token, onPick]);
  useEffect(() => { load(); }, [load]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true); setMsg(null);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      fd.append("folder", uploadFolder || (folder !== "*" ? folder : ""));
      const { items } = await adminUpload<{ items: MediaItem[] }>(`/api/admin/media`, token, fd);
      setMsg({ tone: "ok", text: `Uploaded ${items.length} file(s). Add alt text so search engines and screen readers understand them.` });
      setSelected({ ...items[0], usedIn: [] });
      load();
    } catch (e) { setMsg({ tone: "error", text: e instanceof Error ? e.message : "Upload failed" }); }
    finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const scan = async () => {
    setBusy(true);
    const { ok, data } = await adminRequest<{ added: number }>(`/api/admin/media/scan`, token, { method: "POST" });
    setBusy(false);
    setMsg(ok ? { tone: "ok", text: `Added ${data.added} earlier upload(s) to the library (folder “Earlier uploads”).` } : { tone: "error", text: data.error ?? "Scan failed" });
    load();
  };

  return (
    <div>
      {!onPick && (
        <div>
          <h2 className="text-xl font-extrabold">Media library</h2>
          <p className="mt-1 text-sm text-ink-500">
            Images and PDFs used across the site. Images get WebP sizes automatically (480/960/1600 px) and load lazily in articles.
            {data && data.counts.noAlt > 0 && <> <b className="text-warn">{data.counts.noAlt} image(s) have no alt text.</b></>}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <form onSubmit={(e) => { e.preventDefault(); setQ(search.trim()); setPage(1); }} className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or alt text…" className={`${inputBase} w-56`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
        <select value={folder} onChange={(e) => { setFolder(e.target.value); setPage(1); }} className={inputBase}>
          <option value="*">All folders</option>
          {data?.folders.map((f) => <option key={f.name} value={f.name}>{f.name || "(no folder)"} · {f.count}</option>)}
        </select>
        <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} className={inputBase}>
          <option value="">Everything</option>
          <option value="no-alt">Missing alt text</option>
          <option value="unused">Unused</option>
        </select>
        <span className="mx-1 h-5 w-px bg-line" />
        <input value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value)} placeholder="Upload to folder (optional)" className={`${inputBase} w-48`} />
        <input ref={fileRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif,application/pdf" hidden onChange={(e) => upload(e.target.files)} />
        <button className={btnPrimary} disabled={busy} onClick={() => fileRef.current?.click()}>{busy ? "Working…" : "⬆ Upload"}</button>
        {!onPick && <button className={btnGhost} disabled={busy} onClick={scan} title="Adds files uploaded before the library existed (college photos, article images)">Add earlier uploads</button>}
      </div>
      <p className="mt-1 text-[11px] text-ink-400">JPG, PNG, WebP, AVIF, GIF or PDF, up to 10 MB each. Name files descriptively (e.g. iit-bombay-main-building.jpg).</p>

      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      <div className={`mt-4 grid gap-4 ${selected ? "lg:grid-cols-[1fr_340px]" : ""}`}>
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
            {data?.items.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`group relative overflow-hidden rounded-xl border text-left ${selected?.id === m.id ? "border-brand-500 ring-2 ring-brand-400" : "border-line hover:border-brand-400"}`}
              >
                <div className="aspect-square bg-line">
                  {isImage(m)
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={thumbOf(m)} alt={m.alt ?? ""} loading="lazy" className="h-full w-full object-cover" />
                    : <span className="flex h-full items-center justify-center text-2xl">📄</span>}
                </div>
                <p className="truncate px-2 py-1 text-[11px] text-ink-500">{m.filename}</p>
                {isImage(m) && !m.alt && <span className="absolute left-1.5 top-1.5 rounded bg-warn px-1.5 text-[10px] font-bold text-white">no alt</span>}
                {!m.usedIn.length && <span className="absolute right-1.5 top-1.5 rounded bg-ink-900/70 px-1.5 text-[10px] font-bold text-white">unused</span>}
              </button>
            ))}
          </div>
          {data && !data.items.length && <p className="py-10 text-center text-ink-400">No files here yet.</p>}
          {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
        </div>
        {selected && (
          <MediaDetails
            key={selected.id}
            m={selected}
            onPick={onPick}
            pickLabel={pickLabel}
            onChanged={(m) => { setSelected(m); load(); }}
            onDeleted={() => { setSelected(null); load(); }}
          />
        )}
      </div>
    </div>
  );
}

function MediaDetails({ m, onPick, pickLabel, onChanged, onDeleted }: {
  m: MediaItem; onPick?: (m: MediaItem) => void; pickLabel: string; onChanged: (m: MediaItem) => void; onDeleted: () => void;
}) {
  const { token } = useSession();
  const [f, setF] = useState({ alt: m.alt ?? "", title: m.title ?? "", caption: m.caption ?? "", description: m.description ?? "", folder: m.folder });
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "warn"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const replaceRef = useRef<HTMLInputElement>(null);
  const dirty = f.alt !== (m.alt ?? "") || f.title !== (m.title ?? "") || f.caption !== (m.caption ?? "") || f.description !== (m.description ?? "") || f.folder !== m.folder;

  const save = async () => {
    setBusy(true);
    const { ok, data } = await adminRequest<MediaItem>(`/api/admin/media/${m.id}`, token, { method: "PUT", body: f });
    setBusy(false);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Save failed" }); return null; }
    const updated = { ...m, ...data, usedIn: m.usedIn };
    onChanged(updated);
    setMsg({ tone: "ok", text: "Saved ✓" });
    return updated;
  };

  const replace = async (files: FileList | null) => {
    if (!files?.[0]) return;
    if (!confirm(`Replace this file everywhere it's used${m.usedIn.length ? ` (${m.usedIn.length} place(s))` : ""}?`)) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      const data = await adminUpload<MediaItem>(`/api/admin/media/${m.id}/replace`, token, fd);
      onChanged({ ...m, ...data });
      setMsg({ tone: "ok", text: "Replaced ✓ — every page using it now shows the new file." });
    } catch (e) { setMsg({ tone: "error", text: e instanceof Error ? e.message : "Replace failed" }); }
    finally { setBusy(false); if (replaceRef.current) replaceRef.current.value = ""; }
  };

  const del = async () => {
    if (!confirm(`Delete ${m.filename}?`)) return;
    let res = await adminRequest<{ usedIn?: string[] }>(`/api/admin/media/${m.id}`, token, { method: "DELETE" });
    if (res.status === 409) {
      if (!confirm(`${res.data.error}\n\nDelete anyway? Those pages will show a broken image.`)) return;
      res = await adminRequest(`/api/admin/media/${m.id}?force=1`, token, { method: "DELETE" });
    }
    if (!res.ok) { setMsg({ tone: "error", text: res.data.error ?? "Delete failed" }); return; }
    onDeleted();
  };

  const pick = async () => {
    if (!onPick) return;
    if (isImage(m) && !f.alt.trim()) { setMsg({ tone: "warn", text: "Add alt text first — describe what the image shows." }); return; }
    const saved = dirty ? await save() : m;
    if (saved) onPick({ ...saved, alt: f.alt });
  };

  const field = (k: keyof typeof f, label: string, hint?: string, area = false) => (
    <label className="block text-[13px]">
      <span className="mb-1 block font-semibold text-ink-700">{label} {hint && <span className="font-normal text-ink-400">{hint}</span>}</span>
      {area
        ? <textarea value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} rows={2} className={inputCls} />
        : <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={inputCls} />}
    </label>
  );

  return (
    <aside className="card space-y-3 self-start p-4">
      {isImage(m)
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={m.variants?.["960"] ?? m.url} alt={f.alt} className="max-h-56 w-full rounded-lg bg-line object-contain" />
        : <a href={m.url} target="_blank" rel="noreferrer" className="block rounded-lg bg-line p-6 text-center text-sm font-semibold text-brand-700">📄 Open PDF ↗</a>}
      <p className="break-all text-[12px] text-ink-500">
        <b>{m.filename}</b> · {kb(m.size)}{m.width ? ` · ${m.width}×${m.height}` : ""} · {fmtDate(m.createdAt)}
        <br /><span className="select-all font-mono">{m.url}</span>
      </p>
      {isImage(m) && field("alt", "Alt text", "— what the image shows (for Google & screen readers)")}
      {field("title", "Title")}
      {field("caption", "Caption", "", true)}
      {field("description", "Description", "", true)}
      {field("folder", "Folder")}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">Used in</p>
        {m.usedIn.length
          ? <ul className="mt-1 max-h-28 overflow-auto text-[12px] text-ink-600">{m.usedIn.map((u) => <li key={u}>• {u}</li>)}</ul>
          : <p className="text-[12px] text-ink-400">Not used anywhere.</p>}
      </div>
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      <div className="flex flex-wrap gap-2">
        {onPick && <button className={btnPrimary} onClick={pick} disabled={busy}>{pickLabel}</button>}
        <button className={onPick ? btnGhost : btnPrimary} onClick={save} disabled={busy || !dirty}>Save details</button>
        <input ref={replaceRef} type="file" hidden onChange={(e) => replace(e.target.files)} />
        <button className={btnGhost} onClick={() => replaceRef.current?.click()} disabled={busy}>Replace file</button>
        {!onPick && <button className={btnDanger} onClick={del} disabled={busy}>Delete</button>}
      </div>
    </aside>
  );
}

/** Modal wrapper for picking an image from the library. */
export function MediaPickerModal({ onPick, onClose }: { onPick: (m: MediaItem) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-ink-900/50 p-4" role="dialog" aria-modal="true" aria-label="Choose an image">
      <div className="mt-8 w-full max-w-6xl rounded-2xl bg-white p-5 shadow-pop">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Choose an image</h2>
          <button className={btnGhost} onClick={onClose}>Close</button>
        </div>
        <MediaLibrary onPick={(m) => { onPick(m); onClose(); }} />
      </div>
    </div>
  );
}
