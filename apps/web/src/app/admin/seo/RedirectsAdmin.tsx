"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { adminDownload, adminRequest } from "../adminApi";
import { btnDanger, btnGhost, btnPrimary, fmtDate, inputBase, inputCls, Notice, Pager, readFileText } from "./ui";

interface Redirect {
  id: number;
  fromPath: string;
  toPath: string;
  statusCode: number;
  isPrefix: boolean;
  enabled: boolean;
  note: string | null;
  hits: number;
  lastHitAt: string | null;
  createdAt: string;
  chained: boolean;
}

type Draft = { id?: number; fromPath: string; toPath: string; statusCode: 301 | 302; isPrefix: boolean; enabled: boolean; note: string };
const emptyDraft = (from = "", to = ""): Draft => ({ fromPath: from, toPath: to, statusCode: 301, isPrefix: false, enabled: true, note: "" });

export function RedirectsAdmin({ token, prefill }: { token: string; prefill?: { from: string; to: string } | null }) {
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Redirect[]; total: number; totalPages: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(prefill ? emptyDraft(prefill.from, prefill.to) : null);
  const [importOpen, setImportOpen] = useState(false);

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<{ items: Redirect[]; total: number; totalPages: number }>(`/api/admin/seo/redirects?q=${encodeURIComponent(q)}&page=${page}`, token);
    if (!ok) { setError(data.error ?? "Failed to load"); return; }
    setError(null);
    setData(data);
  }, [q, page, token]);

  useEffect(() => { load(); }, [load]);

  const toggleEnabled = async (r: Redirect) => {
    const { ok, data } = await adminRequest(`/api/admin/seo/redirects/${r.id}`, token, {
      method: "PUT",
      body: { fromPath: r.fromPath, toPath: r.toPath, statusCode: r.statusCode, isPrefix: r.isPrefix, enabled: !r.enabled, note: r.note },
    });
    if (!ok) setError(data.error ?? "Failed");
    load();
  };
  const del = async (r: Redirect) => {
    if (!confirm(`Delete the redirect ${r.fromPath} → ${r.toPath}?\nThe old URL will show a 404 again.`)) return;
    await adminRequest(`/api/admin/seo/redirects/${r.id}`, token, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Redirects</h2>
          <p className="mt-1 text-sm text-ink-500">Send old or moved URLs to the right page. Use 301 for permanent moves (passes ranking) and 302 only for temporary ones. Changes go live within a minute.</p>
        </div>
        <div className="flex gap-2">
          <button className={btnGhost} onClick={() => setImportOpen((v) => !v)}>Import CSV</button>
          <button className={btnGhost} onClick={() => adminDownload(`/api/admin/seo/redirects/export`, token, "redirects.csv").catch((e) => setError(String(e.message ?? e)))}>Export CSV</button>
          <button className="btn-primary px-4 py-2 text-sm" onClick={() => setDraft(emptyDraft())}>+ Add redirect</button>
        </div>
      </div>

      {importOpen && <RedirectImport token={token} onDone={load} />}
      {draft && <RedirectForm token={token} draft={draft} onCancel={() => setDraft(null)} onSaved={() => { setDraft(null); load(); }} />}

      <form onSubmit={(e) => { e.preventDefault(); setQ(search.trim()); setPage(1); }} className="mt-4 flex gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search from/to URL or note…" className={`${inputBase} max-w-sm`} />
        <button className={btnGhost} type="submit">Search</button>
      </form>

      {error && <div className="mt-3"><Notice tone="error">{error}</Notice></div>}

      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[820px] text-left text-[13px]">
          <thead className="bg-line/40 text-[12px] uppercase tracking-wide text-ink-500">
            <tr><th className="px-3 py-2">From</th><th className="px-3 py-2">To</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Hits</th><th className="px-3 py-2">Added</th><th className="px-3 py-2" /></tr>
          </thead>
          <tbody>
            {data?.items.map((r) => (
              <tr key={r.id} className={`border-t border-line align-top ${r.enabled ? "" : "opacity-50"}`}>
                <td className="px-3 py-2 font-mono text-[12px]">{r.fromPath}{r.isPrefix && <span className="text-ink-400">/*</span>}{r.note && <p className="font-sans text-[11px] text-ink-400">{r.note}</p>}</td>
                <td className="px-3 py-2 font-mono text-[12px]">
                  {r.toPath}{r.isPrefix && !/^https?:/.test(r.toPath) && <span className="text-ink-400">/*</span>}
                  {r.chained && <p className="font-sans text-[11px] font-semibold text-warn">⚠ Target redirects again (chain)</p>}
                </td>
                <td className="px-3 py-2">{r.statusCode}{!r.enabled && <span className="ml-1 text-[11px]">(off)</span>}</td>
                <td className="px-3 py-2">{r.hits}{r.lastHitAt && <p className="text-[11px] text-ink-400">{fmtDate(r.lastHitAt)}</p>}</td>
                <td className="px-3 py-2 text-[12px] text-ink-500">{fmtDate(r.createdAt)}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right">
                  <button className={btnGhost} onClick={() => setDraft({ id: r.id, fromPath: r.fromPath, toPath: r.toPath, statusCode: r.statusCode === 302 ? 302 : 301, isPrefix: r.isPrefix, enabled: r.enabled, note: r.note ?? "" })}>Edit</button>{" "}
                  <button className={btnGhost} onClick={() => toggleEnabled(r)}>{r.enabled ? "Disable" : "Enable"}</button>{" "}
                  <button className={btnDanger} onClick={() => del(r)}>Delete</button>
                </td>
              </tr>
            ))}
            {data && data.items.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-ink-400">No redirects yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
    </div>
  );
}

function RedirectForm({ token, draft, onCancel, onSaved }: { token: string; draft: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState(draft);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [savedWarnings, setSavedWarnings] = useState(false);
  const set = (patch: Partial<Draft>) => setD((s) => ({ ...s, ...patch }));
  useEffect(() => setD(draft), [draft]);

  const save = async () => {
    setBusy(true); setErr(null); setWarnings([]);
    const body = { ...d, note: d.note || null };
    const { ok, data } = d.id
      ? await adminRequest(`/api/admin/seo/redirects/${d.id}`, token, { method: "PUT", body })
      : await adminRequest(`/api/admin/seo/redirects`, token, { method: "POST", body });
    setBusy(false);
    setWarnings(data.warnings ?? []);
    if (!ok) { setErr(data.error ?? "Save failed"); return; }
    if (data.warnings?.length) { setSavedWarnings(true); return; } // show what was flagged before closing
    onSaved();
  };

  return (
    <div className="card mt-4 space-y-3 p-4">
      <h3 className="font-bold">{d.id ? "Edit redirect" : "New redirect"}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">From (old URL)</span>
          <input value={d.fromPath} onChange={(e) => set({ fromPath: e.target.value })} placeholder="/old-page or https://collegechoice.in/old-page" className={inputCls} />
        </label>
        <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">To (new URL)</span>
          <input value={d.toPath} onChange={(e) => set({ toPath: e.target.value })} placeholder="/new-page or https://other-site.com/…" className={inputCls} />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-[13px]">
        <label className="flex items-center gap-1.5"><input type="radio" checked={d.statusCode === 301} onChange={() => set({ statusCode: 301 })} /> 301 permanent</label>
        <label className="flex items-center gap-1.5"><input type="radio" checked={d.statusCode === 302} onChange={() => set({ statusCode: 302 })} /> 302 temporary</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={d.isPrefix} onChange={(e) => set({ isPrefix: e.target.checked })} /> Also redirect everything under this URL (/old/… → /new/…)</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={d.enabled} onChange={(e) => set({ enabled: e.target.checked })} /> Enabled</label>
      </div>
      <input value={d.note} onChange={(e) => set({ note: e.target.value })} placeholder="Note (optional) — why this redirect exists" className={inputCls} />
      {err && <Notice tone="error">{err}</Notice>}
      {warnings.map((w) => <Notice key={w} tone="warn">{w}</Notice>)}
      <div className="flex justify-end gap-2">
        {savedWarnings ? (
          <><span className="self-center text-[13px] text-success">Saved ✓</span><button className={btnPrimary} onClick={onSaved}>Done</button></>
        ) : (
          <><button className={btnGhost} onClick={onCancel}>Cancel</button><button className={btnPrimary} onClick={save} disabled={busy || !d.fromPath.trim() || !d.toPath.trim()}>{busy ? "Saving…" : "Save redirect"}</button></>
        )}
      </div>
    </div>
  );
}

interface ImportRes {
  rows: number; create: number; update: number; applied: boolean;
  errors: { row: number; from: string; error: string }[];
  warnings: { row: number; from: string; warning: string }[];
  sample: { row: number; action: string; from: string; to: string; code: number }[];
}

function RedirectImport({ token, onDone }: { token: string; onDone: () => void }) {
  const [csv, setCsv] = useState<string | null>(null);
  const [res, setRes] = useState<ImportRes | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const run = async (text: string, dryRun: boolean) => {
    setBusy(true); setErr(null);
    const { ok, data } = await adminRequest<ImportRes>(`/api/admin/seo/redirects/import`, token, { method: "POST", body: { csv: text, dryRun } });
    setBusy(false);
    if (!ok) { setErr(data.error ?? "Import failed"); return; }
    setRes(data);
    if (data.applied) onDone();
  };
  const pick = async (files: FileList | null) => {
    if (!files?.[0]) return;
    const text = await readFileText(files[0]);
    setCsv(text); setRes(null);
    run(text, true);
    if (ref.current) ref.current.value = "";
  };

  return (
    <div className="card mt-4 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">CSV columns: <code>from</code>, <code>to</code>, and optionally <code>code</code> (301/302), <code>prefix</code> (yes/no), <code>enabled</code> (yes/no), <code>note</code>. Existing redirects with the same “from” are updated. Everything is checked for loops and chains before saving.</p>
      <input ref={ref} type="file" accept=".csv,text/csv" hidden onChange={(e) => pick(e.target.files)} />
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => ref.current?.click()} disabled={busy}>Choose CSV file…</button>
        {csv && res && !res.applied && !res.errors.length && res.create + res.update > 0 && (
          <button className={btnPrimary} onClick={() => run(csv, false)} disabled={busy}>Import {res.create} new + {res.update} updated</button>
        )}
      </div>
      {err && <Notice tone="error">{err}</Notice>}
      {res && (
        <>
          <Notice tone={res.errors.length ? "error" : res.applied ? "ok" : "info"}>
            {res.rows} row(s): {res.create} new, {res.update} updates{res.errors.length ? `, ${res.errors.length} errors — nothing was saved` : ""}.{res.applied ? " Imported ✓" : ""}
          </Notice>
          {res.errors.length > 0 && <ul className="max-h-40 overflow-auto text-[12px] text-danger">{res.errors.map((e) => <li key={e.row}>Row {e.row} ({e.from}): {e.error}</li>)}</ul>}
          {res.warnings.length > 0 && <ul className="max-h-40 overflow-auto text-[12px] text-warn">{res.warnings.map((w) => <li key={`${w.row}${w.warning}`}>Row {w.row} ({w.from}): {w.warning}</li>)}</ul>}
        </>
      )}
    </div>
  );
}
