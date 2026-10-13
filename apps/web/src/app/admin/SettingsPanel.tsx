"use client";

import { useEffect, useRef, useState } from "react";
import { adminDownload, adminRequest } from "./adminApi";
import { AuditLogPanel } from "./AuditLogPanel";
import { useSession, type Permission } from "./session";
import { UsersAdmin } from "./UsersAdmin";
import { btnGhost, btnPrimary, inputCls, Notice, readFileText } from "./seo/ui";

type Tab = "users" | "audit" | "tracking" | "backup";
const TABS: [Tab, string, Permission][] = [
  ["users", "Users & roles", "users:manage"],
  ["audit", "Audit log", "audit:view"],
  ["tracking", "Tracking & integrations", "settings:manage"],
  ["backup", "Backup & security", "users:manage"],
];

export const settingsVisible = (can: (p: Permission) => boolean) => TABS.some(([, , p]) => can(p));

export function SettingsPanel() {
  const { can } = useSession();
  const tabs = TABS.filter(([, , p]) => can(p));
  const [tab, setTab] = useState<Tab>(tabs[0]?.[0] ?? "audit");
  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line">
        {tabs.map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-bold ${tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-900"}`}>{label}</button>
        ))}
      </div>
      <div className="mt-5">
        {tab === "users" && <UsersAdmin />}
        {tab === "audit" && <AuditLogPanel />}
        {tab === "tracking" && <Tracking />}
        {tab === "backup" && <Backup />}
      </div>
    </div>
  );
}

function Tracking() {
  const { token } = useSession();
  const [f, setF] = useState({ gaId: "", gscVerification: "" });
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  useEffect(() => {
    adminRequest<{ gaId: string; gscVerification: string }>("/api/admin/site", token).then(({ ok, data }) => { if (ok) { setF(data); setLoaded(true); } });
  }, [token]);
  const save = async () => {
    const { ok, data } = await adminRequest<{ gaId: string; gscVerification: string }>("/api/admin/site", token, { method: "PUT", body: f });
    const details = (data as { details?: { fieldErrors?: Record<string, string[]> } }).details?.fieldErrors;
    setMsg(ok ? { tone: "ok", text: "Saved ✓ — the site uses the new codes within seconds." } : { tone: "error", text: details ? Object.values(details).flat()[0] : data.error ?? "Save failed" });
    if (ok) setF(data);
  };
  if (!loaded) return <p className="text-ink-500">Loading…</p>;
  return (
    <div className="card max-w-2xl space-y-4 p-5">
      <h2 className="text-lg font-extrabold">Tracking &amp; integrations</h2>
      <label className="block text-[13px]">
        <span className="mb-1 block font-semibold text-ink-700">Google Analytics 4 measurement ID</span>
        <input value={f.gaId} onChange={(e) => setF({ ...f, gaId: e.target.value.trim() })} placeholder="G-XXXXXXXXXX" className={inputCls} />
        <span className="mt-1 block text-ink-400">Loaded on every page. Leave empty to switch Analytics off.</span>
      </label>
      <label className="block text-[13px]">
        <span className="mb-1 block font-semibold text-ink-700">Google Search Console verification code</span>
        <input value={f.gscVerification} onChange={(e) => setF({ ...f, gscVerification: e.target.value.trim() })} placeholder="the content=&quot;…&quot; value" className={inputCls} />
        <span className="mt-1 block text-ink-400">From the HTML-tag method in Search Console — paste only the value inside content=&quot;…&quot;.</span>
      </label>
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      <button className={btnPrimary} onClick={save}>Save</button>
    </div>
  );
}

function Backup() {
  const { token } = useSession();
  const [users, setUsers] = useState<{ name: string; role: string; active: boolean; totpEnabled: boolean }[]>([]);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    adminRequest<{ items: typeof users }>("/api/admin/users", token).then(({ ok, data }) => ok && setUsers(data.items));
  }, [token]);
  const without2fa = users.filter((u) => u.active && !u.totpEnabled);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-extrabold">Content backup</h2>
        <p className="text-sm text-ink-500">
          Downloads everything managed in the CMS as one JSON file: SEO settings, redirects, news, course/exam/info pages, categories, tags,
          media details, streams, locations, exams and site settings. (The full database, including the college dataset, is backed up by the database host.)
        </p>
        <button className={btnPrimary} onClick={() => adminDownload("/api/admin/site/backup", token, "cms-backup.json").catch((e) => setErr(String(e.message ?? e)))}>Download backup</button>
        {err && <Notice tone="error">{err}</Notice>}
      </section>
      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-extrabold">Security</h2>
        <ul className="space-y-1.5 text-sm text-ink-600">
          <li>✓ Individual accounts with roles; every change is in the audit log.</li>
          <li>✓ Five wrong passwords lock an account for 15 minutes.</li>
          <li>{without2fa.length ? <span className="text-warn">⚠ {without2fa.length} active user(s) without two-factor: {without2fa.map((u) => u.name).join(", ")}</span> : "✓ Everyone uses two-factor sign-in."}</li>
        </ul>
        <p className="text-[12px] text-ink-400">
          Locked out? On the server run <code className="select-all">docker compose -f docker-compose.prod.yml exec api node dist/src/cli/adminUser.js you@example.com</code> to get a temporary Admin password.
        </p>
      </section>
    </div>
  );
}

/** College data import (Colleges panel). */
export function CollegeImport({ onDone }: { onDone: () => void }) {
  const { token } = useSession();
  const [csv, setCsv] = useState<string | null>(null);
  const [res, setRes] = useState<{ rows: number; create: number; update: number; newCities: string[]; applied: boolean; errors: { row: number; slug: string; error: string }[]; sample: { row: number; slug: string; name: string; action: string }[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const run = async (text: string, dryRun: boolean) => {
    setErr(null);
    const { ok, data } = await adminRequest<NonNullable<typeof res>>("/api/admin/import/colleges", token, { method: "POST", body: { csv: text, dryRun } });
    if (!ok) { setErr(data.error ?? "Import failed"); return; }
    setRes(data);
    if (data.applied) onDone();
  };
  return (
    <div className="card mt-4 space-y-3 p-4">
      <p className="text-[13px] text-ink-500">
        Update or add colleges in bulk. Start from the <button className="font-semibold text-brand-700 underline" onClick={() => adminDownload("/api/admin/import/colleges/template", token, "colleges-template.csv")}>CSV template</button>.
        Rows match by slug — existing colleges are updated (blank cells keep the current value); new ones need name, stream and city. Approvals are separated by “|”.
      </p>
      <input ref={ref} type="file" accept=".csv,text/csv" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const t = await readFileText(f); setCsv(t); setRes(null); run(t, true); if (ref.current) ref.current.value = ""; }} />
      <div className="flex gap-2">
        <button className={btnGhost} onClick={() => ref.current?.click()}>Choose CSV file…</button>
        {csv && res && !res.applied && !res.errors.length && res.create + res.update > 0 && (
          <button className={btnPrimary} onClick={() => confirm(`Import ${res.create} new and ${res.update} updated college(s)? Changes go live immediately.`) && run(csv, false)}>Import {res.create} new + {res.update} updates</button>
        )}
      </div>
      {err && <Notice tone="error">{err}</Notice>}
      {res && (
        <>
          <Notice tone={res.errors.length ? "error" : res.applied ? "ok" : "info"}>
            {res.rows} row(s): {res.create} new, {res.update} updates{res.newCities.length ? `, new cities: ${res.newCities.join(", ")}` : ""}{res.errors.length ? ` — ${res.errors.length} error(s); nothing was saved` : ""}.{res.applied ? " Imported ✓" : ""}
          </Notice>
          {res.errors.length > 0 && <ul className="max-h-40 overflow-auto text-[12px] text-danger">{res.errors.map((e) => <li key={`${e.row}${e.error}`}>Row {e.row} ({e.slug}): {e.error}</li>)}</ul>}
          {!res.applied && res.sample.length > 0 && <ul className="max-h-40 overflow-auto text-[12px] text-ink-600">{res.sample.map((s) => <li key={s.row}>{s.action === "create" ? "＋" : "✎"} {s.name} <span className="font-mono text-ink-400">{s.slug}</span></li>)}</ul>}
        </>
      )}
    </div>
  );
}
