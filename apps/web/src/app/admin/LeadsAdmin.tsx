"use client";

import { useCallback, useEffect, useState } from "react";
import { adminDownload, adminRequest } from "./adminApi";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, fmtDate, inputBase, inputCls, Notice, Pager } from "./seo/ui";

type Status = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST";
export const LEAD_STATUSES: [Status, string, string][] = [
  ["NEW", "New", "bg-brand-50 text-brand-700"],
  ["CONTACTED", "Contacted", "bg-warn/15 text-warn"],
  ["QUALIFIED", "Qualified", "bg-[#0ea5e9]/15 text-[#0369a1]"],
  ["CONVERTED", "Converted", "bg-success/15 text-success"],
  ["LOST", "Lost", "bg-line text-ink-500"],
];
const statusMeta = (s: Status) => LEAD_STATUSES.find(([k]) => k === s)!;
const StatusPill = ({ s }: { s: Status }) => <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${statusMeta(s)[2]}`}>{statusMeta(s)[1]}</span>;

const SOURCES: [string, string][] = [
  ["apply", "College apply"], ["enquiry", "General enquiry"], ["predictor", "College predictor"], ["counselling", "Counselling"],
  ["course", "Course enquiry"], ["exam", "Exam enquiry"], ["register", "Sign-up"], ["contact", "Contact form"],
];
const CHANNELS = ["organic", "paid", "social", "referral", "email", "direct", "unknown"];
const sourceLabel = (s: string) => SOURCES.find(([k]) => k === s)?.[1] ?? s;

interface Lead {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  city: string | null;
  state: string | null;
  courseInterested: string | null;
  examInterested: string | null;
  collegeName: string | null;
  notes: string | null;
  status: Status;
  source: string;
  channel: string;
  pagePath: string | null;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  followUpAt: string | null;
  assignedToId: number | null;
  assignedTo: { id: number; name: string } | null;
  duplicateOfId: number | null;
  seenAt: string | null;
  createdAt: string;
  updatedAt: string;
  college: { slug: string } | null;
}
interface LeadDetail extends Lead {
  activities: { id: number; type: string; text: string | null; fromStatus: string | null; toStatus: string | null; userEmail: string | null; createdAt: string }[];
  related: { id: number; fullName: string; createdAt: string; status: Status; source: string; collegeName: string | null; courseInterested: string | null }[];
}
interface Assignee { id: number; name: string }

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};
const waLink = (mobile: string) => {
  const d = mobile.replace(/\D/g, "");
  return `https://wa.me/${d.length === 10 ? `91${d}` : d}`;
};
const followTone = (iso: string | null, status: Status) => {
  if (!iso || status === "CONVERTED" || status === "LOST") return "text-ink-400";
  const t = new Date(iso).getTime();
  const end = new Date(); end.setHours(23, 59, 59, 999);
  const start = new Date(); start.setHours(0, 0, 0, 0);
  return t < start.getTime() ? "font-bold text-danger" : t <= end.getTime() ? "font-bold text-warn" : "text-ink-600";
};

export function LeadsAdmin() {
  const { can } = useSession();
  const [tab, setTab] = useState<"leads" | "reports">(can("leads:manage") ? "leads" : "reports");
  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line">
        {can("leads:manage") && <button onClick={() => setTab("leads")} className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-bold ${tab === "leads" ? "border-brand-600 text-brand-700" : "border-transparent text-ink-500"}`}>Leads</button>}
        <button onClick={() => setTab("reports")} className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-bold ${tab === "reports" ? "border-brand-600 text-brand-700" : "border-transparent text-ink-500"}`}>Reports &amp; SEO attribution</button>
      </div>
      <div className="mt-5">{tab === "leads" ? <LeadList /> : <LeadReports />}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// List
// ─────────────────────────────────────────────────────────────

interface Filter { q: string; status: string; source: string; channel: string; assigned: string; followUp: string; duplicates: string; unseen: string; from: string; to: string; sort: string }
const EMPTY: Filter = { q: "", status: "open", source: "", channel: "", assigned: "", followUp: "", duplicates: "", unseen: "", from: "", to: "", sort: "newest" };

function LeadList() {
  const { token } = useSession();
  const [f, setF] = useState<Filter>(EMPTY);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Lead[]; total: number; totalPages: number } | null>(null);
  const [summary, setSummary] = useState<{ unseen: number; dueToday: number; overdue: number; mine: number; total: number; notifications: { email: boolean; webhook: boolean; recipients: number } } | null>(null);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const qs = useCallback((extra: Record<string, string> = {}) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...f, ...extra })) {
      if (!v) continue;
      if (k === "from") sp.set(k, new Date(v).toISOString());
      else if (k === "to") sp.set(k, new Date(`${v}T23:59:59`).toISOString());
      else sp.set(k, v);
    }
    return sp.toString();
  }, [f]);

  const load = useCallback(async () => {
    const [list, sum] = await Promise.all([
      adminRequest<{ items: Lead[]; total: number; totalPages: number }>(`/api/admin/leads?${qs({ page: String(page) })}`, token),
      adminRequest<NonNullable<typeof summary>>("/api/admin/leads/summary", token),
    ]);
    if (list.ok) setData(list.data); else setMsg({ tone: "error", text: list.data.error ?? "Failed to load" });
    if (sum.ok) setSummary(sum.data);
  }, [qs, page, token]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { adminRequest<{ items: Assignee[] }>("/api/admin/leads/assignees", token).then(({ ok, data }) => ok && setAssignees(data.items)); }, [token]);

  const set = (patch: Partial<Filter>) => { setF((s) => ({ ...s, ...patch })); setPage(1); setSelected(new Set()); };
  const bulk = async (action: "status" | "assign" | "seen", value?: string) => {
    const { ok, data } = await adminRequest<{ changed: number }>("/api/admin/leads/bulk", token, { method: "POST", body: { ids: [...selected], action, value: value ?? null } });
    setMsg(ok ? { tone: "ok", text: `Updated ${data.changed} lead(s).` } : { tone: "error", text: data.error ?? "Failed" });
    if (ok) { setSelected(new Set()); load(); }
  };

  if (open !== null) return <LeadDetailView id={open} assignees={assignees} onBack={() => { setOpen(null); load(); }} onOpen={setOpen} />;

  const quick = (label: string, n: number | undefined, patch: Partial<Filter>, tone = "") => (
    <button onClick={() => set({ ...EMPTY, status: "", ...patch })} className={`card px-4 py-3 text-left hover:border-brand-400`}>
      <p className={`text-2xl font-extrabold ${tone}`}>{n ?? "–"}</p>
      <p className="text-[12px] font-semibold text-ink-500">{label}</p>
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Leads</h2>
          <p className="mt-1 text-sm text-ink-500">Every apply, enquiry, predictor, counselling and sign-up form in one place. Click a lead to call, update its status, set a follow-up or add notes.</p>
        </div>
        <div className="flex gap-2">
          {summary && summary.unseen > 0 && <button className={btnGhost} onClick={async () => { await adminRequest("/api/admin/leads/seen-all", token, { method: "POST" }); load(); }}>Mark all {summary.unseen} new as seen</button>}
          <button className={btnGhost} onClick={() => adminDownload(`/api/admin/leads/export?${qs()}`, token, "leads.csv").catch((e) => setMsg({ tone: "error", text: String(e.message ?? e) }))}>Export CSV</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        {quick("New (unseen)", summary?.unseen, { unseen: "1" }, summary?.unseen ? "text-brand-700" : "")}
        {quick("Follow-ups due today", summary?.dueToday, { followUp: "today" }, summary?.dueToday ? "text-warn" : "")}
        {quick("Overdue follow-ups", summary?.overdue, { followUp: "overdue" }, summary?.overdue ? "text-danger" : "")}
        {quick("Open & assigned to me", summary?.mine, { assigned: "me", status: "open" })}
        {quick("All leads", summary?.total, {})}
      </div>
      {summary && !summary.notifications.email && !summary.notifications.webhook && (
        <p className="mt-2 text-[12px] text-ink-400">New leads show here instantly. For email or WhatsApp/SMS alerts, set SMTP_URL + LEAD_NOTIFY_EMAILS or LEAD_WEBHOOK_URL on the server.</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <form onSubmit={(e) => { e.preventDefault(); set({ q: search.trim() }); }} className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, mobile, email, college…" className={`${inputBase} w-60`} />
          <button className={btnGhost} type="submit">Search</button>
        </form>
        <select value={f.status} onChange={(e) => set({ status: e.target.value })} className={inputBase}>
          <option value="">All statuses</option>
          <option value="open">Open (new, contacted, qualified)</option>
          {LEAD_STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select value={f.source} onChange={(e) => set({ source: e.target.value })} className={inputBase}>
          <option value="">All sources</option>
          {SOURCES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select value={f.channel} onChange={(e) => set({ channel: e.target.value })} className={inputBase}>
          <option value="">All channels</option>
          {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={f.assigned} onChange={(e) => set({ assigned: e.target.value })} className={inputBase}>
          <option value="">Anyone</option>
          <option value="me">Assigned to me</option>
          <option value="none">Unassigned</option>
          {assignees.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <select value={f.followUp} onChange={(e) => set({ followUp: e.target.value })} className={inputBase}>
          <option value="">Any follow-up</option>
          <option value="today">Due today</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Upcoming</option>
          <option value="none">Open, no follow-up set</option>
        </select>
        <label className="flex items-center gap-1 text-[13px] text-ink-500"><input type="checkbox" checked={!!f.duplicates} onChange={(e) => set({ duplicates: e.target.checked ? "1" : "" })} /> Possible duplicates</label>
        <label className="flex items-center gap-1 text-[13px] text-ink-500">From <input type="date" value={f.from} onChange={(e) => set({ from: e.target.value })} className={inputBase} /></label>
        <label className="flex items-center gap-1 text-[13px] text-ink-500">To <input type="date" value={f.to} onChange={(e) => set({ to: e.target.value })} className={inputBase} /></label>
        <select value={f.sort} onChange={(e) => set({ sort: e.target.value })} className={inputBase}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="followup">Next follow-up</option>
          <option value="updated">Recently updated</option>
        </select>
      </div>

      {selected.size > 0 && (
        <div className="card mt-3 flex flex-wrap items-center gap-2 p-3 text-[13px]">
          <span className="font-semibold">{selected.size} selected:</span>
          <select defaultValue="" onChange={(e) => e.target.value && bulk("status", e.target.value)} className={inputBase}>
            <option value="">Set status…</option>
            {LEAD_STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <select defaultValue="x" onChange={(e) => e.target.value !== "x" && bulk("assign", e.target.value)} className={inputBase}>
            <option value="x">Assign to…</option>
            <option value="">Nobody</option>
            {assignees.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <button className={btnGhost} onClick={() => bulk("seen")}>Mark seen</button>
        </div>
      )}
      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      <div className="mt-3 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[980px] text-left text-[13px]">
          <thead className="bg-line/40 text-[12px] uppercase tracking-wide text-ink-500">
            <tr>
              <th className="w-8 px-3 py-2"><input type="checkbox" aria-label="Select all" checked={!!data?.items.length && data.items.every((l) => selected.has(l.id))} onChange={(e) => setSelected(e.target.checked ? new Set(data?.items.map((l) => l.id)) : new Set())} /></th>
              <th className="px-3 py-2">Lead</th><th className="px-3 py-2">Interested in</th><th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Status</th><th className="px-3 py-2">Follow-up</th><th className="px-3 py-2">Owner</th><th className="px-3 py-2">Received</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((l) => (
              <tr key={l.id} className={`cursor-pointer border-t border-line align-top hover:bg-brand-50/40 ${!l.seenAt ? "bg-brand-50/60" : ""}`} onClick={() => setOpen(l.id)}>
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" aria-label={`Select ${l.fullName}`} checked={selected.has(l.id)} onChange={() => setSelected((s) => { const n = new Set(s); if (n.has(l.id)) n.delete(l.id); else n.add(l.id); return n; })} />
                </td>
                <td className="px-3 py-2">
                  <p className="font-semibold text-ink-900">{!l.seenAt && <span className="mr-1 inline-block h-2 w-2 rounded-full bg-brand-600" aria-label="new" />}{l.fullName}</p>
                  <p className="text-[12px] text-ink-500">{l.mobile} · {l.email}</p>
                  {(l.city || l.state) && <p className="text-[11px] text-ink-400">{[l.city, l.state].filter(Boolean).join(", ")}</p>}
                  {l.duplicateOfId && <p className="text-[11px] font-semibold text-warn">Possible duplicate of #{l.duplicateOfId}</p>}
                </td>
                <td className="px-3 py-2 text-[12px]">
                  {l.collegeName && <p className="font-semibold">{l.collegeName}</p>}
                  {l.courseInterested && <p>{l.courseInterested}</p>}
                  {l.examInterested && <p>Exam: {l.examInterested}</p>}
                </td>
                <td className="px-3 py-2 text-[12px]">
                  <p>{sourceLabel(l.source)}</p>
                  <p className="text-ink-400">{l.channel}{l.pagePath ? ` · ${l.pagePath}` : ""}</p>
                </td>
                <td className="px-3 py-2"><StatusPill s={l.status} /></td>
                <td className={`px-3 py-2 text-[12px] ${followTone(l.followUpAt, l.status)}`}>{l.followUpAt ? fmtDate(l.followUpAt) : "—"}</td>
                <td className="px-3 py-2 text-[12px]">{l.assignedTo?.name ?? <span className="text-ink-400">—</span>}</td>
                <td className="px-3 py-2 text-[12px] text-ink-500">{fmtDate(l.createdAt)}</td>
              </tr>
            ))}
            {data && !data.items.length && <tr><td colSpan={8} className="px-3 py-8 text-center text-ink-400">No leads match these filters.</td></tr>}
          </tbody>
        </table>
      </div>
      {data && <p className="mt-2 text-[12px] text-ink-400">{data.total.toLocaleString("en-IN")} lead(s)</p>}
      {data && <Pager page={page} totalPages={data.totalPages} onPage={setPage} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail
// ─────────────────────────────────────────────────────────────

const ACTIVITY_ICON: Record<string, string> = { created: "＋", status: "⇄", note: "✎", call: "☎", whatsapp: "💬", email: "✉", meeting: "👥", followup: "⏰", assign: "👤", duplicate: "⚠", edit: "✎" };

function LeadDetailView({ id, assignees, onBack, onOpen }: { id: number; assignees: Assignee[]; onBack: () => void; onOpen: (id: number) => void }) {
  const { token, can } = useSession();
  const [l, setL] = useState<LeadDetail | null>(null);
  const [note, setNote] = useState("");
  const [noteType, setNoteType] = useState("call");
  const [followUp, setFollowUp] = useState("");
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<LeadDetail>(`/api/admin/leads/${id}`, token);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Failed to load" }); return; }
    setL(data);
    setFollowUp(toLocalInput(data.followUpAt));
    setContact({ fullName: data.fullName, mobile: data.mobile, email: data.email, city: data.city ?? "", state: data.state ?? "", courseInterested: data.courseInterested ?? "", examInterested: data.examInterested ?? "" });
  }, [id, token]);
  useEffect(() => { load(); }, [load]);

  const patch = async (body: Record<string, unknown>, done: string) => {
    const { ok, data } = await adminRequest(`/api/admin/leads/${id}`, token, { method: "PATCH", body });
    setMsg(ok ? { tone: "ok", text: done } : { tone: "error", text: data.error ?? "Failed" });
    if (ok) load();
    return ok;
  };
  const addNote = async () => {
    const { ok, data } = await adminRequest(`/api/admin/leads/${id}/notes`, token, { method: "POST", body: { text: note, type: noteType } });
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Failed" }); return; }
    setNote(""); load();
  };
  const del = async () => {
    if (!confirm("Delete this lead permanently? Use this only for spam or a deletion request — otherwise mark it Lost.")) return;
    const { ok, data } = await adminRequest(`/api/admin/leads/${id}`, token, { method: "DELETE" });
    if (ok) onBack(); else setMsg({ tone: "error", text: data.error ?? "Failed" });
  };

  if (!l) return <div><button className={btnGhost} onClick={onBack}>← Back</button>{msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}</div>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className={btnGhost} onClick={onBack}>← Back to leads</button>
          <h2 className="text-xl font-extrabold">{l.fullName}</h2>
          <StatusPill s={l.status} />
          <span className="text-[12px] text-ink-400">#{l.id} · {fmtDate(l.createdAt)}</span>
        </div>
        {can("users:manage") && <button className={btnDanger} onClick={del}>Delete</button>}
      </div>
      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
      {l.duplicateOfId && <div className="mt-3"><Notice tone="warn">Same mobile or email as an earlier lead — <button className="font-semibold underline" onClick={() => onOpen(l.duplicateOfId!)}>open lead #{l.duplicateOfId}</button>.</Notice></div>}

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="card p-4">
            <div className="flex flex-wrap gap-2">
              <a className={btnPrimary} href={`tel:${l.mobile.replace(/[^\d+]/g, "")}`}>☎ Call {l.mobile}</a>
              <a className={btnGhost} href={waLink(l.mobile)} target="_blank" rel="noreferrer">💬 WhatsApp</a>
              <a className={btnGhost} href={`mailto:${l.email}`}>✉ {l.email}</a>
              <button className={btnGhost} onClick={() => setEdit((v) => !v)}>{edit ? "Cancel edit" : "Edit details"}</button>
            </div>
            {edit ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[["fullName", "Name"], ["mobile", "Mobile"], ["email", "Email"], ["city", "City"], ["state", "State"], ["courseInterested", "Course"], ["examInterested", "Exam"]].map(([k, label]) => (
                  <label key={k} className="block text-[12px]"><span className="font-semibold text-ink-600">{label}</span>
                    <input value={contact[k] ?? ""} onChange={(e) => setContact({ ...contact, [k]: e.target.value })} className={inputCls} /></label>
                ))}
                <button className={`${btnPrimary} sm:col-span-2`} onClick={async () => {
                  const body = Object.fromEntries(Object.entries(contact).map(([k, v]) => [k, ["fullName", "mobile", "email"].includes(k) ? v : v || null]));
                  if (await patch(body, "Details saved ✓")) setEdit(false);
                }}>Save details</button>
              </div>
            ) : (
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
                {[
                  ["Location", [l.city, l.state].filter(Boolean).join(", ")],
                  ["College", l.collegeName],
                  ["Course", l.courseInterested],
                  ["Exam", l.examInterested],
                  ["Form notes", l.notes],
                  ["Source", sourceLabel(l.source)],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><dt className="text-[11px] font-semibold uppercase text-ink-400">{k}</dt><dd className="text-ink-900">{v}</dd></div>
                ))}
              </dl>
            )}
          </section>

          <section className="card p-4">
            <h3 className="font-bold">Log activity</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <select value={noteType} onChange={(e) => setNoteType(e.target.value)} className={inputBase}>
                <option value="call">Call</option><option value="whatsapp">WhatsApp</option><option value="email">Email</option><option value="meeting">Meeting</option><option value="note">Note</option>
              </select>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="What happened? e.g. Interested in IIT Bombay CSE, call back after JEE result" className={`${inputCls} min-w-[260px] flex-1`} />
              <button className={btnPrimary} disabled={!note.trim()} onClick={addNote}>Add</button>
            </div>
            <p className="mt-1 text-[11px] text-ink-400">Logging a call, WhatsApp, email or meeting on a New lead moves it to Contacted.</p>
            <ol className="mt-4 space-y-3 border-l-2 border-line pl-4">
              {l.activities.map((a) => (
                <li key={a.id} className="text-[13px]">
                  <span className="mr-1">{ACTIVITY_ICON[a.type] ?? "•"}</span>
                  {a.type === "status"
                    ? <>Status <b>{a.fromStatus ? statusMeta(a.fromStatus as Status)[1] : "—"}</b> → <b>{a.toStatus ? statusMeta(a.toStatus as Status)[1] : "—"}</b>{a.text ? ` — ${a.text}` : ""}</>
                    : <span className="whitespace-pre-wrap">{a.type !== "created" && a.type !== "note" && a.type !== "duplicate" && a.type !== "followup" && a.type !== "assign" && a.type !== "edit" ? <b className="capitalize">{a.type}: </b> : null}{a.text}</span>}
                  <span className="block text-[11px] text-ink-400">{fmtDate(a.createdAt)} · {a.userEmail ?? "website"}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="card space-y-3 p-4">
            <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Status</span>
              <select value={l.status} onChange={(e) => { const s = e.target.value; const why = s === "LOST" ? prompt("Why was this lead lost? (optional)") : null; patch({ status: s, ...(why ? { note: why } : {}) }, "Status updated ✓"); }} className={inputCls}>
                {LEAD_STATUSES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select>
            </label>
            <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Next follow-up</span>
              <div className="flex gap-2">
                <input type="datetime-local" value={followUp} onChange={(e) => setFollowUp(e.target.value)} className={inputCls} />
                <button className={btnGhost} onClick={() => patch({ followUpAt: followUp ? new Date(followUp).toISOString() : null }, followUp ? "Follow-up set ✓" : "Follow-up cleared")}>Set</button>
              </div>
              <span className="mt-1 flex flex-wrap gap-1.5 text-[11px]">
                {[["Tomorrow", 1], ["In 3 days", 3], ["Next week", 7]].map(([label, days]) => (
                  <button key={label as string} className="text-brand-700 hover:underline" onClick={() => { const d = new Date(); d.setDate(d.getDate() + (days as number)); d.setHours(10, 0, 0, 0); patch({ followUpAt: d.toISOString() }, "Follow-up set ✓"); }}>{label}</button>
                ))}
                {l.followUpAt && <button className="text-ink-500 hover:underline" onClick={() => patch({ followUpAt: null }, "Follow-up cleared")}>Clear</button>}
              </span>
            </label>
            <label className="block text-[13px]"><span className="mb-1 block font-semibold text-ink-700">Owner</span>
              <select value={l.assignedToId ?? ""} onChange={(e) => patch({ assignedToId: e.target.value ? Number(e.target.value) : null }, "Owner updated ✓")} className={inputCls}>
                <option value="">Unassigned</option>
                {assignees.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </label>
          </section>

          <section className="card space-y-1.5 p-4 text-[12px]">
            <h3 className="text-[13px] font-bold">Where this lead came from</h3>
            <p><b>Form page:</b> {l.pagePath ? <a className="text-brand-700 hover:underline" href={l.pagePath} target="_blank" rel="noreferrer">{l.pagePath}</a> : "—"}</p>
            <p><b>First page of visit:</b> {l.landingPage ?? "—"}</p>
            <p><b>Channel:</b> {l.channel}</p>
            <p className="break-all"><b>Referrer:</b> {l.referrer ?? "—"}</p>
            {(l.utmSource || l.utmMedium || l.utmCampaign) && <p><b>UTM:</b> {[l.utmSource, l.utmMedium, l.utmCampaign].filter(Boolean).join(" / ")}</p>}
            {l.college && <p><b>College page:</b> <a className="text-brand-700 hover:underline" href={`/colleges/${l.college.slug}`} target="_blank" rel="noreferrer">/colleges/{l.college.slug}</a></p>}
          </section>

          {l.related.length > 0 && (
            <section className="card p-4">
              <h3 className="text-[13px] font-bold">Other enquiries from this person</h3>
              <ul className="mt-2 space-y-1.5 text-[12px]">
                {l.related.map((r) => (
                  <li key={r.id}>
                    <button className="text-left text-brand-700 hover:underline" onClick={() => onOpen(r.id)}>#{r.id} {r.collegeName ?? r.courseInterested ?? sourceLabel(r.source)}</button>
                    <span className="ml-1 text-ink-400">{fmtDate(r.createdAt)}</span> <StatusPill s={r.status} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────

interface Row { key: string; leads: number; converted: number }
interface Report {
  from: string; total: number;
  byStatus: Row[]; byChannel: Row[]; bySource: Row[]; byPage: Row[]; byLanding: Row[]; organicLanding: Row[];
  byCollege: Row[]; byCourse: Row[]; byExam: Row[]; daily: { day: string; leads: number }[];
}

function LeadReports() {
  const { token } = useSession();
  const [days, setDays] = useState("30");
  const [r, setR] = useState<Report | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    const from = new Date(Date.now() - Number(days) * 86_400_000).toISOString();
    adminRequest<Report>(`/api/admin/leads/reports?from=${from}`, token).then(({ ok, data }) => (ok ? setR(data) : setErr(data.error ?? "Failed")));
  }, [days, token]);
  if (err) return <Notice tone="error">{err}</Notice>;
  if (!r) return <p className="text-ink-500">Loading…</p>;
  const max = Math.max(1, ...r.daily.map((d) => d.leads));
  const converted = r.byStatus.find((s) => s.key === "CONVERTED")?.leads ?? 0;

  const table = (title: string, rows: Row[], hint?: string, link = false) => (
    <section className="card p-4">
      <h3 className="font-bold">{title}</h3>
      {hint && <p className="text-[12px] text-ink-400">{hint}</p>}
      <table className="mt-2 w-full text-[13px]">
        <thead className="text-left text-[11px] uppercase text-ink-400"><tr><th className="py-1">{link ? "Page" : "Value"}</th><th className="py-1 text-right">Leads</th><th className="py-1 text-right">Converted</th></tr></thead>
        <tbody>
          {rows.map((x) => (
            <tr key={x.key} className="border-t border-line">
              <td className="max-w-[260px] truncate py-1">{link ? <a href={x.key} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-brand-700 hover:underline">{x.key}</a> : x.key}</td>
              <td className="py-1 text-right font-semibold">{x.leads}</td>
              <td className="py-1 text-right text-ink-500">{x.converted}{x.leads ? ` (${Math.round((x.converted / x.leads) * 100)}%)` : ""}</td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan={3} className="py-3 text-center text-ink-400">No data yet.</td></tr>}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Lead reports &amp; SEO attribution</h2>
          <p className="mt-1 text-sm text-ink-500">Which pages, channels, colleges and courses bring leads — and which convert. Organic = visits from Google, Bing and other search engines.</p>
        </div>
        <select value={days} onChange={(e) => setDays(e.target.value)} className={inputBase}>
          <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last 12 months</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="card p-4"><p className="text-2xl font-extrabold">{r.total}</p><p className="text-[12px] font-semibold text-ink-500">Leads</p></div>
        <div className="card p-4"><p className="text-2xl font-extrabold text-success">{converted}</p><p className="text-[12px] font-semibold text-ink-500">Converted ({r.total ? Math.round((converted / r.total) * 100) : 0}%)</p></div>
        <div className="card p-4"><p className="text-2xl font-extrabold">{r.byChannel.find((c) => c.key === "organic")?.leads ?? 0}</p><p className="text-[12px] font-semibold text-ink-500">From organic search</p></div>
        <div className="card p-4"><p className="text-2xl font-extrabold">{r.byStatus.filter((s) => ["NEW", "CONTACTED", "QUALIFIED"].includes(s.key)).reduce((n, s) => n + s.leads, 0)}</p><p className="text-[12px] font-semibold text-ink-500">Still open</p></div>
      </div>

      <section className="card p-4">
        <h3 className="font-bold">Leads per day</h3>
        <div className="mt-3 flex h-32 items-end gap-[2px]" role="img" aria-label="Leads per day chart">
          {r.daily.map((d) => (
            <div key={d.day} title={`${d.day.slice(0, 10)}: ${d.leads}`} className="flex-1 rounded-t bg-brand-500/80" style={{ height: `${(d.leads / max) * 100}%`, minHeight: 2 }} />
          ))}
          {!r.daily.length && <p className="w-full text-center text-ink-400">No leads in this period.</p>}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {table("By channel", r.byChannel)}
        {table("By form", r.bySource.map((x) => ({ ...x, key: sourceLabel(x.key) })))}
        {table("By status", r.byStatus.map((x) => ({ ...x, key: statusMeta(x.key as Status)?.[1] ?? x.key })))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {table("Organic landing pages", r.organicLanding, "Pages people found on search engines before enquiring — your SEO wins.", true)}
        {table("Pages the forms were submitted on", r.byPage, undefined, true)}
        {table("First page of the visit (all channels)", r.byLanding, undefined, true)}
        {table("By college", r.byCollege)}
        {table("By course", r.byCourse)}
        {table("By exam", r.byExam)}
      </div>
    </div>
  );
}
