"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "./adminApi";
import { useSession } from "./session";
import { btnGhost, btnPrimary, fmtDate, Notice } from "./seo/ui";

interface Rev { id: number; summary: string | null; userEmail: string | null; createdAt: string }

/** Version history for one item with view & restore. */
export function RevisionHistory({ entityType, entityId, onRestored, onClose }: {
  entityType: "news" | "college" | "seo";
  entityId: string | number;
  onRestored?: () => void;
  onClose: () => void;
}) {
  const { token } = useSession();
  const [items, setItems] = useState<Rev[] | null>(null);
  const [canRestore, setCanRestore] = useState(false);
  const [viewing, setViewing] = useState<{ id: number; data: unknown } | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<{ items: Rev[]; canRestore: boolean }>(
      `/api/admin/revisions?entityType=${entityType}&entityId=${encodeURIComponent(String(entityId))}`, token);
    if (ok) { setItems(data.items); setCanRestore(data.canRestore); } else setMsg({ tone: "error", text: data.error ?? "Failed to load history" });
  }, [entityType, entityId, token]);
  useEffect(() => { load(); }, [load]);

  const view = async (id: number) => {
    if (viewing?.id === id) { setViewing(null); return; }
    const { ok, data } = await adminRequest<{ data: unknown }>(`/api/admin/revisions/${id}`, token);
    if (ok) setViewing({ id, data: data.data });
  };

  const restore = async (r: Rev) => {
    if (!confirm(`Restore the version from ${fmtDate(r.createdAt)}?\nThe current version stays in the history, so you can undo this.`)) return;
    setBusy(true);
    const { ok, data } = await adminRequest(`/api/admin/revisions/${r.id}/restore`, token, { method: "POST" });
    setBusy(false);
    setMsg(ok ? { tone: "ok", text: "Restored ✓" } : { tone: "error", text: data.error ?? "Restore failed" });
    if (ok) { load(); onRestored?.(); }
  };

  return (
    <div className="card mt-3 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">Version history</h4>
        <button className={btnGhost} onClick={onClose}>Close</button>
      </div>
      <p className="mt-1 text-[12px] text-ink-400">
        A version is saved on every change (newest first, last 50 kept). {entityType === "news" ? "Restoring brings back the text and image; the URL and publishing status stay as they are." : entityType === "college" ? "Restoring brings back the tabs, highlights, courses and FAQs; published/unpublished stays as it is." : ""}
      </p>
      {msg && <div className="mt-2"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
      {!items && <p className="mt-3 text-[13px] text-ink-400">Loading…</p>}
      {items && !items.length && <p className="mt-3 text-[13px] text-ink-400">No history yet — it starts with the next change.</p>}
      <ul className="mt-3 divide-y divide-line">
        {items?.map((r, i) => (
          <li key={r.id} className="py-2 text-[13px]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                <span className="font-semibold">{r.summary ?? "Saved"}</span>
                {i === 0 && <span className="chip ml-2">current</span>}
                <span className="block text-[12px] text-ink-400">{fmtDate(r.createdAt)} · {r.userEmail ?? "system"}</span>
              </span>
              <span className="flex gap-1.5">
                <button className={btnGhost} onClick={() => view(r.id)}>{viewing?.id === r.id ? "Hide" : "View"}</button>
                {canRestore && i > 0 && <button className={btnPrimary} disabled={busy} onClick={() => restore(r)}>Restore</button>}
              </span>
            </div>
            {viewing?.id === r.id && <Snapshot data={viewing.data} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Readable rendering of a snapshot. */
function Snapshot({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;
  const entries = Object.entries(data as Record<string, unknown>).filter(([, v]) => v !== null && v !== "" && v !== false);
  return (
    <dl className="mt-2 max-h-80 space-y-1.5 overflow-auto rounded-lg bg-line/30 p-3 text-[12px]">
      {entries.map(([k, v]) => (
        <div key={k}>
          <dt className="font-bold text-ink-600">{k}</dt>
          <dd className="whitespace-pre-wrap break-words text-ink-700">
            {Array.isArray(v)
              ? v.length
                ? <ul className="list-disc pl-4">{v.slice(0, 30).map((x, i) => <li key={i}>{typeof x === "object" && x ? Object.values(x as object).filter((y) => typeof y === "string").join(" — ").slice(0, 200) : String(x)}</li>)}</ul>
                : "—"
              : typeof v === "string" && v.length > 600 ? `${v.slice(0, 600)}…` : String(v)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
