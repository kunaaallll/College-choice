"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { adminDownload, adminRequest } from "../adminApi";
import {
  btnGhost, btnPrimary, fmtDate, inputBase, inputCls, ISSUE_LABELS, LIMITS, Notice, Pager, readFileText, TYPE_LABELS,
} from "./ui";

export interface PageFilter {
  type?: string;
  q?: string;
  index?: string;
  issue?: string;
  updatedWithin?: string;
  sort?: string;
}

interface ListedPage {
  path: string;
  type: string;
  name: string;
  title: string | null;
  titleSource: "custom" | "default" | "auto";
  description: string | null;
  descriptionSource: "custom" | "default" | "auto";
  noindex: boolean;
  nofollow: boolean;
  canonical: string | null;
  excludeFromSitemap: boolean;
  urlLocked: boolean;
  hasOverride: boolean;
  updatedAt: string | null;
  issues: string[];
}

const BULK_ACTIONS: [string, string][] = [
  ["noindex", "Set noindex"], ["index", "Set index"], ["nofollow", "Set nofollow"], ["follow", "Set follow"],
  ["exclude-sitemap", "Exclude from sitemap"], ["include-sitemap", "Include in sitemap"],
  ["set-canonical", "Set canonical URL…"], ["clear-canonical", "Clear canonical (use own URL)"],
  ["lock", "Lock URL"], ["unlock", "Unlock URL"], ["reset", "Reset all SEO overrides"],
];

const qs = (f: PageFilter, extra: Record<string, string | number> = {}) => {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...f, ...extra })) if (v !== undefined && v !== "") sp.set(k, String(v));
  return sp.toString();
};
/** The filter as the API's JSON filter object (for "apply to all matching"). */
const filterBody = (f: PageFilter) => Object.fromEntries(Object.entries(f).filter(([, v]) => v !== undefined && v !== ""));

export function SeoPages({ token, initialFilter, onOpen }: { token: string; initialFilter: PageFilter; onOpen: (path: string) => void }) {
  const [filter, setFilter] = useState<PageFilter>(initialFilter);
  const [search, setSearch] = useState(initialFilter.q ?? "");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: ListedPage[]; total: number; totalPages: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [tool, setTool] = useState<"" | "bulk" | "template" | "replace" | "import">("");
  const [openPath, setOpenPath] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    const { ok, data } = await adminRequest<{ items: ListedPage[]; total: number; totalPages: number }>(`/api/admin/seo/pages?${qs(filter, { page })}`, token);
    setLoading(false);
    if (!ok) { setError(data.error ?? "Failed to load"); return; }
    setData(data);
  }, [filter, page, token]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setFilter(initialFilter); setSearch(initialFilter.q ?? ""); setPage(1); }, [initialFilter]);

  const setF = (patch: PageFilter) => { setFilter((f) => ({ ...f, ...patch })); setPage(1); setSelected(new Set()); };
  const toggle = (p: string) => setSelected((s) => { const n = new Set(s); if (n.has(p)) n.delete(p); else n.add(p); return n; });
  const allOnPage = !!data?.items.length && data.items.every((i) => selected.has(i.path));
  const toggleAll = () => setSelected((s) => {
    const n = new Set(s);
    data?.items.forEach((i) => (allOnPage ? n.delete(i.path) : n.add(i.path)));
    return n;
  });

  const exportCsv = () => adminDownload(`/api/admin/seo/export?${qs(filter)}`, token, "seo-metadata.csv").catch((e) => setError(String(e.message ?? e)));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Pages</h2>
          <p className="mt-1 text-sm text-ink-500">Every page on the site with its SEO status. Click a page to edit its title, description, indexing, canonical, social and schema settings.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (openPath.trim()) onOpen(openPath.trim()); }} className="flex gap-2">
          <input value={openPath} onChange={(e) => setOpenPath(e.target.value)} placeholder="Edit any URL, e.g. /colleges/x/placements" className={`${inputBase} w-72`} />
          <button className={btnPrimary} type="submit">Open</button>
        </form>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <form onSubmit={(e) => { e.preventDefault(); setF({ q: search.trim() }); }} className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, name or URL…" className={`${inputBase} w-64`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
        <select value={filter.type ?? ""} onChange={(e) => setF({ type: e.target.value })} className={`${inputBase} w-auto`}>
          <option value="">All types</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filter.index ?? ""} onChange={(e) => setF({ index: e.target.value })} className={`${inputBase} w-auto`}>
          <option value="">Index + noindex</option>
          <option value="index">Indexable only</option>
          <option value="noindex">Noindex only</option>
        </select>
        <select value={filter.issue ?? ""} onChange={(e) => setF({ issue: e.target.value })} className={`${inputBase} w-auto`}>
          <option value="">Any SEO status</option>
          <option value="has-override">Has custom SEO</option>
          <option value="no-override">No custom SEO</option>
          {Object.entries(ISSUE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filter.updatedWithin ?? ""} onChange={(e) => setF({ updatedWithin: e.target.value })} className={`${inputBase} w-auto`}>
          <option value="">Any update date</option>
          <option value="1">Updated today</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
        <select value={filter.sort ?? "path"} onChange={(e) => setF({ sort: e.target.value })} className={`${inputBase} w-auto`}>
          <option value="path">Sort by URL</option>
          <option value="updated">Recently updated</option>
        </select>
      </div>

      {/* Tools */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-ink-500">{data ? `${data.total.toLocaleString("en-IN")} pages` : ""}{selected.size ? ` · ${selected.size} selected` : ""}</span>
        <span className="mx-1 h-4 w-px bg-line" />
        {(["bulk", "template", "replace", "import"] as const).map((t) => (
          <button key={t} className={`${btnGhost} ${tool === t ? "border-brand-500 bg-brand-50 text-brand-700" : ""}`} onClick={() => setTool(tool === t ? "" : t)}>
            {{ bulk: "Bulk edit", template: "Title/description template", replace: "Find & replace", import: "Import CSV" }[t]}
          </button>
        ))}
        <button className={btnGhost} onClick={exportCsv}>Export CSV</button>
        {selected.size > 0 && <button className="text-[12px] font-semibold text-ink-500 hover:underline" onClick={() => setSelected(new Set())}>Clear selection</button>}
      </div>

      {tool === "bulk" && <BulkTool token={token} selected={[...selected]} filter={filter} total={data?.total ?? 0} onDone={() => { setSelected(new Set()); load(); }} />}
      {tool === "template" && <TemplateTool token={token} selected={[...selected]} filter={filter} total={data?.total ?? 0} onDone={load} />}
      {tool === "replace" && <ReplaceTool token={token} onDone={load} />}
      {tool === "import" && <ImportTool token={token} onDone={load} />}

      {error && <div className="mt-3"><Notice tone="error">{error}</Notice></div>}

      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[860px] text-left text-[13px]">
          <thead className="bg-line/40 text-[12px] uppercase tracking-wide text-ink-500">
            <tr>
              <th className="w-8 px-3 py-2"><input type="checkbox" checked={allOnPage} onChange={toggleAll} aria-label="Select all on this page" /></th>
              <th className="px-3 py-2">Page</th>
              <th className="px-3 py-2">SEO title</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Index</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && !data && <tr><td colSpan={6} className="px-3 py-8 text-center text-ink-400">Loading…</td></tr>}
            {data?.items.map((p) => (
              <tr key={p.path} className="cursor-pointer border-t border-line hover:bg-brand-50/40" onClick={() => onOpen(p.path)}>
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selected.has(p.path)} onChange={() => toggle(p.path)} aria-label={`Select ${p.name}`} />
                </td>
                <td className="max-w-[240px] px-3 py-2">
                  <p className="truncate font-semibold text-ink-900">{p.name}</p>
                  <p className="truncate font-mono text-[11px] text-ink-400">{p.path}</p>
                </td>
                <td className="max-w-[280px] px-3 py-2">
                  <p className="truncate">{p.title ?? <span className="text-ink-400">Automatic</span>}</p>
                  <p className="text-[11px] text-ink-400">
                    {p.titleSource === "custom" ? "Custom" : p.titleSource === "default" ? "From content" : "Built-in"}
                    {p.title ? ` · ${p.title.length} chars` : ""}
                    {p.title && p.title.length > LIMITS.titleMax ? " ⚠" : ""}
                  </p>
                </td>
                <td className="px-3 py-2 text-[12px] text-ink-500">
                  {p.description ? `${p.description.length} chars${p.description.length > LIMITS.descMax || p.description.length < LIMITS.descMin ? " ⚠" : ""}` : "Automatic"}
                </td>
                <td className="px-3 py-2">
                  {p.noindex ? <span className="chip !bg-warn/15 !text-warn">noindex</span> : <span className="text-success">index</span>}
                  {p.nofollow && <span className="ml-1 text-[11px] text-ink-400">nofollow</span>}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {p.hasOverride && <span className="chip !bg-brand-50 !text-brand-700">custom</span>}
                    {p.urlLocked && <span className="chip">🔒</span>}
                    {p.issues.filter((i) => i !== "noindex" && i !== "no-custom-title" && i !== "no-custom-description").map((i) => (
                      <span key={i} className="chip !bg-warn/10 !text-ink-600">{ISSUE_LABELS[i] ?? i}</span>
                    ))}
                  </div>
                  {p.updatedAt && <p className="mt-0.5 text-[11px] text-ink-400">{fmtDate(p.updatedAt)}</p>}
                </td>
              </tr>
            ))}
            {data && data.items.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-ink-400">No pages match these filters.</td></tr>}
          </tbody>
        </table>
      </div>
      {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
    </div>
  );
}

/** Choose between the selected rows and everything matching the filter. */
function Scope({ selected, total, value, onChange }: { selected: number; total: number; value: "selected" | "filter"; onChange: (v: "selected" | "filter") => void }) {
  return (
    <div className="flex flex-wrap gap-4 text-[13px]">
      <label className="flex items-center gap-1.5"><input type="radio" checked={value === "selected"} onChange={() => onChange("selected")} disabled={!selected} /> Selected pages ({selected})</label>
      <label className="flex items-center gap-1.5"><input type="radio" checked={value === "filter"} onChange={() => onChange("filter")} /> All {total.toLocaleString("en-IN")} pages matching the current filter</label>
    </div>
  );
}

function BulkTool({ token, selected, filter, total, onDone }: { token: string; selected: string[]; filter: PageFilter; total: number; onDone: () => void }) {
  const [action, setAction] = useState("noindex");
  const [value, setValue] = useState("");
  const [scope, setScope] = useState<"selected" | "filter">(selected.length ? "selected" : "filter");
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const count = scope === "selected" ? selected.length : total;

  const run = async () => {
    const label = BULK_ACTIONS.find(([k]) => k === action)?.[1] ?? action;
    if (!confirm(`${label} on ${count.toLocaleString("en-IN")} page(s)?`)) return;
    setBusy(true); setMsg(null);
    const body = { action, value: value || undefined, ...(scope === "selected" ? { paths: selected } : { filter: filterBody(filter) }) };
    const { ok, data } = await adminRequest<{ updated: number }>(`/api/admin/seo/bulk`, token, { method: "POST", body });
    setBusy(false);
    setMsg(ok ? { tone: "ok", text: `Updated ${data.updated} page(s).` } : { tone: "error", text: data.error ?? "Failed" });
    if (ok) onDone();
  };

  return (
    <div className="card mt-3 space-y-3 p-4">
      <Scope selected={selected.length} total={total} value={scope} onChange={setScope} />
      <div className="flex flex-wrap gap-2">
        <select value={action} onChange={(e) => setAction(e.target.value)} className={`${inputBase} w-auto`}>
          {BULK_ACTIONS.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {action === "set-canonical" && <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="/target-page or https://…" className={`${inputBase} w-72`} />}
        <button className={btnPrimary} onClick={run} disabled={busy || !count}>{busy ? "Applying…" : `Apply to ${count.toLocaleString("en-IN")}`}</button>
      </div>
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
    </div>
  );
}

interface Preview { count: number; applied: boolean; sample: { path: string; before: string | null; after: string }[] }

function TemplateTool({ token, selected, filter, total, onDone }: { token: string; selected: string[]; filter: PageFilter; total: number; onDone: () => void }) {
  const [field, setField] = useState<"title" | "description">("title");
  const [template, setTemplate] = useState("{name} {year}: Fees, Admission, Placements & Cutoff");
  const [onlyEmpty, setOnlyEmpty] = useState(false);
  const [scope, setScope] = useState<"selected" | "filter">(selected.length ? "selected" : "filter");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async (dryRun: boolean) => {
    if (!dryRun && !confirm(`Set the ${field} on ${preview?.count ?? 0} page(s)?`)) return;
    setBusy(true); setErr(null);
    const body = { field, template, onlyEmpty, dryRun, ...(scope === "selected" ? { paths: selected } : { filter: filterBody(filter) }) };
    const { ok, data } = await adminRequest<Preview>(`/api/admin/seo/template`, token, { method: "POST", body });
    setBusy(false);
    if (!ok) { setErr(data.error ?? "Failed"); return; }
    setPreview(data);
    if (!dryRun) onDone();
  };

  return (
    <div className="card mt-3 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">
        Placeholders: <code>{"{name}"}</code> <code>{"{city}"}</code> <code>{"{state}"}</code> <code>{"{stream}"}</code> <code>{"{year}"}</code>. Custom titles are used exactly as written (the site name isn&apos;t added).
      </p>
      <Scope selected={selected.length} total={total} value={scope} onChange={(v) => { setScope(v); setPreview(null); }} />
      <div className="flex flex-wrap gap-2">
        <select value={field} onChange={(e) => { setField(e.target.value as "title" | "description"); setPreview(null); }} className={`${inputBase} w-auto`}>
          <option value="title">SEO title</option>
          <option value="description">Meta description</option>
        </select>
        <input value={template} onChange={(e) => { setTemplate(e.target.value); setPreview(null); }} className={`${inputBase} min-w-[320px] flex-1`} />
      </div>
      <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" checked={onlyEmpty} onChange={(e) => { setOnlyEmpty(e.target.checked); setPreview(null); }} /> Only pages without a custom {field}</label>
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => run(true)} disabled={busy || !template.trim()}>Preview</button>
        {preview && !preview.applied && preview.count > 0 && <button className={btnPrimary} onClick={() => run(false)} disabled={busy}>Apply to {preview.count.toLocaleString("en-IN")} page(s)</button>}
      </div>
      {err && <Notice tone="error">{err}</Notice>}
      {preview && <ChangeTable preview={preview} />}
    </div>
  );
}

function ChangeTable({ preview }: { preview: Preview }) {
  return (
    <div>
      <Notice tone={preview.applied ? "ok" : "info"}>
        {preview.applied ? `Applied to ${preview.count} page(s).` : `${preview.count} page(s) would change.`}{preview.count > preview.sample.length ? ` Showing the first ${preview.sample.length}.` : ""}
      </Notice>
      {preview.sample.length > 0 && (
        <div className="mt-2 max-h-72 overflow-auto rounded-lg border border-line text-[12px]">
          <table className="w-full">
            <thead className="sticky top-0 bg-white text-left text-ink-500"><tr><th className="px-2 py-1">URL</th><th className="px-2 py-1">Before</th><th className="px-2 py-1">After</th></tr></thead>
            <tbody>
              {preview.sample.map((c) => (
                <tr key={c.path + c.after} className="border-t border-line align-top">
                  <td className="px-2 py-1 font-mono">{c.path}</td>
                  <td className="px-2 py-1 text-ink-400">{c.before ?? "—"}</td>
                  <td className="px-2 py-1">{c.after} <span className="text-ink-400">({c.after.length})</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ReplaceTool({ token, onDone }: { token: string; onDone: () => void }) {
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [fields, setFields] = useState<string[]>(["title", "description"]);
  const [matchCase, setMatchCase] = useState(false);
  const [includeLocked, setIncludeLocked] = useState(false);
  const [res, setRes] = useState<{ count: number; applied: boolean; lockedSkipped: number; sample: { path: string; field: string; before: string; after: string }[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async (dryRun: boolean) => {
    if (!dryRun && !confirm(`Replace “${find}” with “${replace}” in ${res?.count ?? 0} field(s)?`)) return;
    setBusy(true); setErr(null);
    const { ok, data } = await adminRequest<NonNullable<typeof res>>(`/api/admin/seo/replace`, token, { method: "POST", body: { find, replace, fields, matchCase, includeLocked, dryRun } });
    setBusy(false);
    if (!ok) { setErr(data.error ?? "Failed"); return; }
    setRes(data);
    if (!dryRun) onDone();
  };
  const toggleField = (f: string) => { setRes(null); setFields((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f])); };

  return (
    <div className="card mt-3 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">Find outdated text (e.g. <code>2025</code> → <code>2026</code>) across custom SEO fields and colleges&apos; built-in meta titles/descriptions. Always preview first.</p>
      <div className="flex flex-wrap gap-2">
        <input value={find} onChange={(e) => { setFind(e.target.value); setRes(null); }} placeholder="Find" className={`${inputBase} w-56`} />
        <input value={replace} onChange={(e) => { setReplace(e.target.value); setRes(null); }} placeholder="Replace with" className={`${inputBase} w-56`} />
      </div>
      <div className="flex flex-wrap gap-4 text-[13px]">
        {[["title", "SEO title"], ["description", "Description"], ["ogTitle", "OG title"], ["ogDescription", "OG description"]].map(([k, v]) => (
          <label key={k} className="flex items-center gap-1.5"><input type="checkbox" checked={fields.includes(k)} onChange={() => toggleField(k)} /> {v}</label>
        ))}
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={matchCase} onChange={(e) => { setMatchCase(e.target.checked); setRes(null); }} /> Match case</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={includeLocked} onChange={(e) => { setIncludeLocked(e.target.checked); setRes(null); }} /> Include locked pages</label>
      </div>
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => run(true)} disabled={busy || !find || !fields.length}>Preview</button>
        {res && !res.applied && res.count > 0 && <button className={btnPrimary} onClick={() => run(false)} disabled={busy}>Replace in {res.count} field(s)</button>}
      </div>
      {err && <Notice tone="error">{err}</Notice>}
      {res && (
        <>
          <Notice tone={res.applied ? "ok" : "info"}>
            {res.applied ? `Replaced in ${res.count} field(s).` : `${res.count} field(s) would change.`}
            {res.lockedSkipped ? ` ${res.lockedSkipped} locked page(s) skipped.` : ""}
          </Notice>
          {res.sample.length > 0 && (
            <div className="max-h-72 overflow-auto rounded-lg border border-line text-[12px]">
              <table className="w-full">
                <tbody>
                  {res.sample.map((c) => (
                    <tr key={c.path + c.field} className="border-t border-line align-top">
                      <td className="px-2 py-1 font-mono">{c.path}</td>
                      <td className="px-2 py-1 text-ink-400">{c.field}</td>
                      <td className="px-2 py-1"><span className="text-ink-400 line-through">{c.before}</span><br />{c.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface ImportResult {
  rows: number;
  changed: number;
  unchanged: number;
  applied: boolean;
  errors: { row: number; path: string; error: string }[];
  warnings: { row: number; path: string; warning: string }[];
  sample: { row: number; path: string; diff: Record<string, [unknown, unknown]> }[];
}

function ImportTool({ token, onDone }: { token: string; onDone: () => void }) {
  const [csv, setCsv] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [res, setRes] = useState<ImportResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = async (text: string, dryRun: boolean) => {
    setBusy(true); setErr(null);
    const { ok, data } = await adminRequest<ImportResult>(`/api/admin/seo/import`, token, { method: "POST", body: { csv: text, dryRun } });
    setBusy(false);
    if (!ok) { setErr(data.error ?? "Import failed"); return; }
    setRes(data);
    if (!dryRun && data.applied) onDone();
  };

  const pick = async (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    const text = await readFileText(f);
    setCsv(text); setName(f.name); setRes(null);
    run(text, true);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="card mt-3 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">
        Use <b>Export CSV</b> as the template: edit it in Excel/Sheets and upload it here. Only the columns in your file are changed; an empty cell clears that override.
        Columns: path, title, description, keyword, canonical, noindex, nofollow, og_title, og_description, og_image, twitter_title, twitter_description, exclude_from_sitemap.
      </p>
      <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => pick(e.target.files)} />
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => fileRef.current?.click()} disabled={busy}>{name ? `Choose another file (${name})` : "Choose CSV file…"}</button>
        {csv && res && !res.applied && !res.errors.length && res.changed > 0 && (
          <button className={btnPrimary} onClick={() => confirm(`Apply ${res.changed} change(s)?`) && run(csv, false)} disabled={busy}>Apply {res.changed} change(s)</button>
        )}
      </div>
      {busy && <p className="text-[13px] text-ink-400">Checking…</p>}
      {err && <Notice tone="error">{err}</Notice>}
      {res && <ImportSummary res={res} />}
    </div>
  );
}

function ImportSummary({ res }: { res: ImportResult }) {
  return (
    <div className="space-y-2">
      <Notice tone={res.errors.length ? "error" : res.applied ? "ok" : "info"}>
        {res.rows} row(s): {res.changed} to change, {res.unchanged} unchanged{res.errors.length ? `, ${res.errors.length} with errors — fix them and upload again (nothing was saved)` : ""}.
        {res.applied ? " Changes applied ✓" : ""}
      </Notice>
      {res.errors.length > 0 && (
        <ul className="max-h-40 overflow-auto text-[12px] text-danger">
          {res.errors.map((e) => <li key={`${e.row}-${e.error}`}>Row {e.row} ({e.path}): {e.error}</li>)}
        </ul>
      )}
      {res.warnings.length > 0 && (
        <ul className="max-h-40 overflow-auto text-[12px] text-warn">
          {res.warnings.map((w) => <li key={`${w.row}-${w.warning}`}>Row {w.row} ({w.path}): {w.warning}</li>)}
        </ul>
      )}
      {res.sample.length > 0 && (
        <div className="max-h-72 overflow-auto rounded-lg border border-line text-[12px]">
          <table className="w-full">
            <tbody>
              {res.sample.map((c) => (
                <tr key={c.row} className="border-t border-line align-top">
                  <td className="px-2 py-1 text-ink-400">#{c.row}</td>
                  <td className="px-2 py-1 font-mono">{c.path}</td>
                  <td className="px-2 py-1">
                    {Object.entries(c.diff).map(([k, [a, b]]) => (
                      <div key={k}><b>{k}</b>: <span className="text-ink-400 line-through">{String(a ?? "—")}</span> → {String(b ?? "—")}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
