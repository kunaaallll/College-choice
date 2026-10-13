"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../adminApi";
import { btnDanger, btnGhost, fmtDate, inputBase, inputCls, Notice, Pager } from "./ui";

interface Entry {
  id: number;
  path: string;
  hits: number;
  referrer: string | null;
  internalReferrer: boolean;
  firstSeen: string;
  lastSeen: string;
  resolved: boolean;
  suggestions: { path: string; name: string }[];
}

export function NotFoundAdmin({ token, onCustomRedirect }: { token: string; onCustomRedirect: (from: string) => void }) {
  const [resolved, setResolved] = useState(false);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Entry[]; total: number; totalPages: number } | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "warn"; text: string } | null>(null);

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<{ items: Entry[]; total: number; totalPages: number }>(
      `/api/admin/seo/404s?resolved=${resolved ? 1 : 0}&q=${encodeURIComponent(q)}&page=${page}`, token,
    );
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Failed to load" }); return; }
    setData(data);
  }, [resolved, q, page, token]);

  useEffect(() => { load(); }, [load]);

  const redirectTo = async (e: Entry, to: string) => {
    if (!confirm(`Add a 301 redirect?\n\n${e.path}\n→ ${to}`)) return;
    const { ok, data } = await adminRequest(`/api/admin/seo/redirects`, token, { method: "POST", body: { fromPath: e.path, toPath: to, statusCode: 301, note: "From 404 log" } });
    setMsg(ok
      ? { tone: data.warnings?.length ? "warn" : "ok", text: `Redirect added: ${e.path} → ${to}.${data.warnings?.length ? ` Note: ${data.warnings.join(" ")}` : ""}` }
      : { tone: "error", text: data.error ?? "Failed" });
    load();
  };
  const resolve = async (e: Entry) => { await adminRequest(`/api/admin/seo/404s/${e.id}/resolve`, token, { method: "POST" }); load(); };
  const remove = async (e: Entry) => { await adminRequest(`/api/admin/seo/404s/${e.id}`, token, { method: "DELETE" }); load(); };
  const clearResolved = async () => {
    if (!confirm("Delete all resolved entries from the log?")) return;
    await adminRequest(`/api/admin/seo/404s?resolved=1`, token, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-extrabold">404 log</h2>
        <p className="mt-1 text-sm text-ink-500">
          URLs visitors (and crawlers) hit that don&apos;t exist, most-hit first. Redirect the ones that matter to the closest page;
          “broken link on our site” means the visitor clicked a link on College Choice itself — fix that link at the source.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl border border-line p-1">
          {[false, true].map((r) => (
            <button key={String(r)} onClick={() => { setResolved(r); setPage(1); }} className={`rounded-lg px-3 py-1 text-[13px] font-bold ${resolved === r ? "bg-brand-600 text-white" : "text-ink-600"}`}>
              {r ? "Resolved" : "Open"}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setQ(search.trim()); setPage(1); }} className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search URL…" className={`${inputBase} w-64`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
        {resolved && <button className={btnDanger} onClick={clearResolved}>Clear resolved</button>}
      </div>

      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      <div className="mt-4 space-y-2">
        {data?.items.map((e) => (
          <div key={e.id} className="card p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-all font-mono text-[13px] font-semibold text-ink-900">{e.path}</p>
                <p className="mt-0.5 text-[12px] text-ink-400">
                  {e.hits} hit{e.hits === 1 ? "" : "s"} · last {fmtDate(e.lastSeen)} · first {fmtDate(e.firstSeen)}
                  {e.referrer && <> · from <span className="break-all">{e.referrer}</span></>}
                </p>
                {e.internalReferrer && <p className="mt-0.5 text-[12px] font-semibold text-danger">Broken link on our site</p>}
              </div>
              {!e.resolved && (
                <div className="flex flex-wrap gap-1.5">
                  <button className={btnGhost} onClick={() => onCustomRedirect(e.path)}>Redirect to…</button>
                  <button className={btnGhost} onClick={() => resolve(e)}>Mark resolved</button>
                  <button className={btnDanger} onClick={() => remove(e)}>Delete</button>
                </div>
              )}
            </div>
            {!e.resolved && e.suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px]">
                <span className="text-ink-400">Suggested:</span>
                {e.suggestions.map((s) => (
                  <button key={s.path} onClick={() => redirectTo(e, s.path)} className="rounded-lg border border-brand-400/50 bg-brand-50 px-2 py-0.5 font-semibold text-brand-700 hover:border-brand-500" title={s.path}>
                    301 → {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {data && data.items.length === 0 && <p className="py-8 text-center text-ink-400">{resolved ? "No resolved entries." : "No 404s logged — nice."}</p>}
      </div>
      {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
    </div>
  );
}
