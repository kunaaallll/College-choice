"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "./adminApi";
import { useSession } from "./session";
import { btnGhost, fmtDate, inputBase, Notice, Pager } from "./seo/ui";

interface AuditPage {
  items: Entry[];
  total: number;
  totalPages: number;
  users: { id: number; name: string; email: string }[];
}

interface Entry {
  id: number; userId: number | null; userEmail: string | null; action: string; entityType: string | null;
  entityId: string | null; summary: string; details: unknown; ip: string | null; createdAt: string;
}

const AREAS: [string, string][] = [
  ["", "All activity"], ["auth.", "Sign-ins"], ["news.", "News & articles"], ["college.", "College content"],
  ["seo.", "SEO"], ["url.", "URL changes"], ["redirect.", "Redirects"], ["settings.", "Robots & sitemap"],
  ["revision.", "Restores"], ["user.", "Users"], ["account.", "Account security"],
];

/** Who changed what, when. */
export function AuditLogPanel() {
  const { token } = useSession();
  const [filter, setFilter] = useState({ action: "", userId: "", q: "", from: "", to: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<AuditPage | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const sp = new URLSearchParams({ page: String(page) });
    if (filter.action) sp.set("action", filter.action);
    if (filter.userId) sp.set("userId", filter.userId);
    if (filter.q) sp.set("q", filter.q);
    if (filter.from) sp.set("from", new Date(filter.from).toISOString());
    if (filter.to) sp.set("to", new Date(`${filter.to}T23:59:59`).toISOString());
    const res = await adminRequest<AuditPage>(`/api/admin/audit?${sp}`, token);
    if (res.ok) { setData(res.data); setError(null); } else setError(res.data.error ?? "Failed to load");
  }, [filter, page, token]);
  useEffect(() => { load(); }, [load]);

  const set = (patch: Partial<typeof filter>) => { setFilter((f) => ({ ...f, ...patch })); setPage(1); };

  return (
    <div>
      <h2 className="text-xl font-extrabold">Audit log</h2>
      <p className="mt-1 text-sm text-ink-500">Every change made in the CMS — who, when and what. Sign-ins and failed sign-in attempts are included.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <select value={filter.action} onChange={(e) => set({ action: e.target.value })} className={inputBase}>
          {AREAS.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filter.userId} onChange={(e) => set({ userId: e.target.value })} className={inputBase}>
          <option value="">Everyone</option>
          {data?.users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <label className="flex items-center gap-1 text-[13px] text-ink-500">From <input type="date" value={filter.from} onChange={(e) => set({ from: e.target.value })} className={inputBase} /></label>
        <label className="flex items-center gap-1 text-[13px] text-ink-500">To <input type="date" value={filter.to} onChange={(e) => set({ to: e.target.value })} className={inputBase} /></label>
        <form onSubmit={(e) => { e.preventDefault(); set({ q: search.trim() }); }} className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search summary or email…" className={`${inputBase} w-56`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
      </div>

      {error && <div className="mt-3"><Notice tone="error">{error}</Notice></div>}
      <p className="mt-3 text-[13px] text-ink-500">{data ? `${data.total.toLocaleString("en-IN")} entries` : "Loading…"}</p>

      <div className="mt-2 divide-y divide-line rounded-xl border border-line">
        {data?.items.map((e) => (
          <div key={e.id} className="px-3 py-2 text-[13px]">
            <button onClick={() => setOpen(open === e.id ? null : e.id)} className="flex w-full flex-wrap items-baseline justify-between gap-2 text-left">
              <span className="min-w-0">
                <span className={`font-semibold ${e.action === "auth.login_failed" ? "text-danger" : "text-ink-900"}`}>{e.summary}</span>
                <span className="ml-2 text-[12px] text-ink-400">{e.userEmail ?? "system"}</span>
              </span>
              <span className="shrink-0 text-[12px] text-ink-400">{fmtDate(e.createdAt)}</span>
            </button>
            {open === e.id && (
              <div className="mt-2 rounded-lg bg-line/30 p-2 text-[12px]">
                <p><b>Action:</b> <span className="font-mono">{e.action}</span>{e.entityType && <> · <b>Item:</b> {e.entityType} {e.entityId}</>}{e.ip && <> · <b>IP:</b> {e.ip}</>}</p>
                {e.details != null && <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] text-ink-600">{JSON.stringify(e.details, null, 2)}</pre>}
              </div>
            )}
          </div>
        ))}
        {data && !data.items.length && <p className="px-3 py-6 text-center text-ink-400">No matching entries.</p>}
      </div>
      {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
    </div>
  );
}
