"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "./adminApi";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, inputBase, inputCls, Notice } from "./seo/ui";

interface Stream { id: number; name: string; slug: string; initial: string; colorGradient: string; description: string | null; avgFees: string | null; degrees: string[]; examName: string | null; _count: { colleges: number; entries: number } }
interface City { id: number; name: string; slug: string; state: string | null; imageUrl: string | null; _count: { colleges: number } }
interface Category { id: number; name: string; slug: string; description: string | null; parentId: number | null; streamId: number | null; sort: number; stream: { name: string } | null; _count: { entries: number; children: number } }
interface Tag { id: number; name: string; slug: string; _count: { entries: number; news: number } }
interface Tax { streams: Stream[]; cities: City[]; categories: Category[]; tags: Tag[] }

type Tab = "streams" | "categories" | "cities" | "tags";

/** Categories, streams/specialisations, locations and tags. */
export function TaxonomyAdmin() {
  const { token, can } = useSession();
  const [tab, setTab] = useState<Tab>("categories");
  const [tax, setTax] = useState<Tax | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const manage = can("content:publish");

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<Tax>("/api/admin/taxonomy", token);
    if (ok) setTax(data); else setMsg({ tone: "error", text: data.error ?? "Failed to load" });
  }, [token]);
  useEffect(() => { load(); }, [load]);

  const call = async (method: string, path: string, body?: unknown, ok = "Saved ✓") => {
    const r = await adminRequest(`/api/admin/taxonomy${path}`, token, { method, body });
    setMsg(r.ok ? { tone: "ok", text: ok } : { tone: "error", text: r.data.error ?? "Failed" });
    if (r.ok) load();
    return r.ok;
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold">Categories</h2>
      <p className="mt-1 text-sm text-ink-500">How content is organised: streams (and their specialisations), a category tree for courses, exams and pages, locations and tags.{!manage && " Ask an SEO Manager or Admin to change these."}</p>
      <div className="mt-4 flex gap-1 border-b border-line">
        {([["categories", "Categories"], ["streams", "Streams"], ["cities", "Locations"], ["tags", "Tags"]] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-bold ${tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-ink-500"}`}>{label}</button>
        ))}
      </div>
      {msg && <div className="mt-3"><Notice tone={msg.tone}>{msg.text}</Notice></div>}
      {!tax ? <p className="mt-6 text-ink-500">Loading…</p> : (
        <div className="mt-4">
          {tab === "categories" && <Categories tax={tax} manage={manage} call={call} />}
          {tab === "streams" && <Streams tax={tax} manage={manage} call={call} />}
          {tab === "cities" && <Cities tax={tax} manage={manage} call={call} />}
          {tab === "tags" && <Tags tax={tax} manage={manage} call={call} />}
        </div>
      )}
    </div>
  );
}

type Call = (method: string, path: string, body?: unknown, ok?: string) => Promise<boolean>;

function Categories({ tax, manage, call }: { tax: Tax; manage: boolean; call: Call }) {
  const [draft, setDraft] = useState<{ id?: number; name: string; slug: string; description: string; parentId: string; streamId: string }>({ name: "", slug: "", description: "", parentId: "", streamId: "" });
  const roots = tax.categories.filter((c) => !c.parentId);
  const children = (id: number) => tax.categories.filter((c) => c.parentId === id);
  const save = async () => {
    const body = { name: draft.name, ...(draft.slug ? { slug: draft.slug } : {}), description: draft.description || null, parentId: draft.parentId ? Number(draft.parentId) : null, streamId: draft.streamId ? Number(draft.streamId) : null };
    if (await call(draft.id ? "PUT" : "POST", draft.id ? `/categories/${draft.id}` : "/categories", body)) setDraft({ name: "", slug: "", description: "", parentId: "", streamId: "" });
  };
  const row = (c: Category, depth: number): React.ReactNode => (
    <div key={c.id}>
      <div className="flex flex-wrap items-center gap-2 border-t border-line px-3 py-2 text-[13px]" style={{ paddingLeft: 12 + depth * 24 }}>
        <span className="font-semibold text-ink-900">{depth ? "↳ " : ""}{c.name}</span>
        <span className="font-mono text-[11px] text-ink-400">{c.slug}</span>
        {c.stream && <span className="chip">{c.stream.name}</span>}
        <span className="text-[12px] text-ink-400">{c._count.entries} page(s)</span>
        {manage && (
          <span className="ml-auto flex gap-1.5">
            <button className={btnGhost} onClick={() => setDraft({ id: c.id, name: c.name, slug: c.slug, description: c.description ?? "", parentId: c.parentId ? String(c.parentId) : "", streamId: c.streamId ? String(c.streamId) : "" })}>Edit</button>
            <button className={btnDanger} onClick={() => confirm(`Delete “${c.name}”? Sub-categories move to the top level; pages become uncategorised.`) && call("DELETE", `/categories/${c.id}`, undefined, "Deleted")}>Delete</button>
          </span>
        )}
      </div>
      {children(c.id).map((ch) => row(ch, depth + 1))}
    </div>
  );
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-line">
        {roots.map((c) => row(c, 0))}
        {!tax.categories.length && <p className="p-6 text-center text-ink-400">No categories yet.</p>}
      </div>
      {manage && (
        <div className="card space-y-2 self-start p-4">
          <h3 className="font-bold">{draft.id ? "Edit category" : "New category"}</h3>
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name (e.g. Engineering entrance exams)" className={inputCls} />
          <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="slug (optional)" className={inputCls} />
          <select value={draft.parentId} onChange={(e) => setDraft({ ...draft, parentId: e.target.value })} className={inputCls}>
            <option value="">Top level</option>
            {tax.categories.filter((c) => c.id !== draft.id).map((c) => <option key={c.id} value={c.id}>Inside: {c.name}</option>)}
          </select>
          <select value={draft.streamId} onChange={(e) => setDraft({ ...draft, streamId: e.target.value })} className={inputCls}>
            <option value="">No stream</option>
            {tax.streams.map((s) => <option key={s.id} value={s.id}>Specialisation of: {s.name}</option>)}
          </select>
          <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} placeholder="Description (optional)" className={inputCls} />
          <div className="flex gap-2">
            <button className={btnPrimary} disabled={draft.name.trim().length < 2} onClick={save}>{draft.id ? "Save" : "Add category"}</button>
            {draft.id && <button className={btnGhost} onClick={() => setDraft({ name: "", slug: "", description: "", parentId: "", streamId: "" })}>Cancel</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function Streams({ tax, manage, call }: { tax: Tax; manage: boolean; call: Call }) {
  const [edit, setEdit] = useState<Partial<Stream> & { degreesText?: string } | null>(null);
  const save = async () => {
    if (!edit) return;
    const body = { name: edit.name, initial: edit.initial, colorGradient: edit.colorGradient, description: edit.description || null, avgFees: edit.avgFees || null, examName: edit.examName || null, degrees: (edit.degreesText ?? "").split(",").map((d) => d.trim()).filter(Boolean) };
    if (await call(edit.id ? "PUT" : "POST", edit.id ? `/streams/${edit.id}` : "/streams", body)) setEdit(null);
  };
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="divide-y divide-line rounded-xl border border-line">
        {tax.streams.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center gap-2 px-3 py-2 text-[13px]">
            <span className="badge-grad h-7 w-7 text-[11px]" style={{ background: s.colorGradient }}>{s.initial}</span>
            <span className="font-semibold text-ink-900">{s.name}</span>
            <span className="text-[12px] text-ink-400">{s._count.colleges} colleges · {s._count.entries} pages · /stream/{s.slug}</span>
            {manage && (
              <span className="ml-auto flex gap-1.5">
                <button className={btnGhost} onClick={() => setEdit({ ...s, degreesText: s.degrees.join(", ") })}>Edit</button>
                {!s._count.colleges && <button className={btnDanger} onClick={() => confirm(`Delete ${s.name}?`) && call("DELETE", `/streams/${s.id}`, undefined, "Deleted")}>Delete</button>}
              </span>
            )}
          </div>
        ))}
      </div>
      {manage && (
        <div className="card space-y-2 self-start p-4">
          <h3 className="font-bold">{edit?.id ? `Edit ${edit.name}` : "New stream"}</h3>
          {!edit && <button className={btnGhost} onClick={() => setEdit({ name: "", initial: "", colorGradient: "linear-gradient(135deg,#6366f1,#4338ca)", degreesText: "" })}>+ Add stream</button>}
          {edit && (
            <>
              <input value={edit.name ?? ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Name" className={inputCls} />
              <input value={edit.initial ?? ""} onChange={(e) => setEdit({ ...edit, initial: e.target.value })} placeholder="Badge letters (e.g. En)" className={inputCls} />
              <textarea value={edit.description ?? ""} onChange={(e) => setEdit({ ...edit, description: e.target.value })} rows={2} placeholder="Description (shown on /courses)" className={inputCls} />
              <input value={edit.degreesText ?? ""} onChange={(e) => setEdit({ ...edit, degreesText: e.target.value })} placeholder="Degrees, comma-separated" className={inputCls} />
              <input value={edit.avgFees ?? ""} onChange={(e) => setEdit({ ...edit, avgFees: e.target.value })} placeholder="Average fees label" className={inputCls} />
              <input value={edit.examName ?? ""} onChange={(e) => setEdit({ ...edit, examName: e.target.value })} placeholder="Headline exam" className={inputCls} />
              <input value={edit.colorGradient ?? ""} onChange={(e) => setEdit({ ...edit, colorGradient: e.target.value })} placeholder="Badge colour (CSS gradient)" className={inputCls} />
              <div className="flex gap-2"><button className={btnPrimary} disabled={(edit.name ?? "").trim().length < 2 || !edit.initial} onClick={save}>Save</button><button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Cities({ tax, manage, call }: { tax: Tax; manage: boolean; call: Call }) {
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<Partial<City> | null>(null);
  const shown = tax.cities.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || (c.state ?? "").toLowerCase().includes(q.toLowerCase()));
  const save = async () => {
    if (!edit) return;
    const body = { name: edit.name, state: edit.state || null, imageUrl: edit.imageUrl || null };
    if (await call(edit.id ? "PUT" : "POST", edit.id ? `/cities/${edit.id}` : "/cities", body)) setEdit(null);
  };
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by city or state…" className={`${inputBase} mb-3 w-64`} />
        <div className="max-h-[60vh] divide-y divide-line overflow-auto rounded-xl border border-line">
          {shown.slice(0, 300).map((c) => (
            <div key={c.id} className="flex items-center gap-2 px-3 py-1.5 text-[13px]">
              <span className="font-semibold text-ink-900">{c.name}</span>
              <span className="text-[12px] text-ink-400">{c.state ?? "—"} · {c._count.colleges} colleges{c.imageUrl ? " · has image" : ""}</span>
              {manage && <button className={`${btnGhost} ml-auto`} onClick={() => setEdit(c)}>Edit</button>}
            </div>
          ))}
        </div>
        <p className="mt-1 text-[11px] text-ink-400">Cities with an image are featured on the homepage and get a /colleges-in/… landing page.</p>
      </div>
      {manage && (
        <div className="card space-y-2 self-start p-4">
          <h3 className="font-bold">{edit?.id ? `Edit ${edit.name}` : "New location"}</h3>
          {!edit && <button className={btnGhost} onClick={() => setEdit({ name: "", state: "", imageUrl: "" })}>+ Add location</button>}
          {edit && (
            <>
              <input value={edit.name ?? ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="City" className={inputCls} />
              <input value={edit.state ?? ""} onChange={(e) => setEdit({ ...edit, state: e.target.value })} placeholder="State" className={inputCls} />
              <input value={edit.imageUrl ?? ""} onChange={(e) => setEdit({ ...edit, imageUrl: e.target.value })} placeholder="Image URL (from the media library)" className={inputCls} />
              <div className="flex gap-2"><button className={btnPrimary} disabled={(edit.name ?? "").trim().length < 2} onClick={save}>Save</button><button className={btnGhost} onClick={() => setEdit(null)}>Cancel</button></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Tags({ tax, manage, call }: { tax: Tax; manage: boolean; call: Call }) {
  const [name, setName] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New tag" className={`${inputBase} w-60`} />
        <button className={btnPrimary} disabled={!name.trim()} onClick={async () => { if (await call("POST", "/tags", { name })) setName(""); }}>Add tag</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tax.tags.map((t) => (
          <span key={t.id} className="chip gap-1.5">
            #{t.name} <span className="text-ink-400">{t._count.entries + t._count.news}</span>
            {manage && (
              <>
                <button className="text-ink-400 hover:text-brand-700" title="Rename (renaming onto an existing tag merges them)" onClick={() => { const n = prompt("Rename tag (an existing name merges the two):", t.name); if (n && n.trim() && n !== t.name) call("PUT", `/tags/${t.id}`, { name: n.trim() }, "Renamed ✓"); }}>✎</button>
                <button className="text-ink-400 hover:text-danger" title="Delete" onClick={() => confirm(`Delete #${t.name}?`) && call("DELETE", `/tags/${t.id}`, undefined, "Deleted")}>×</button>
              </>
            )}
          </span>
        ))}
        {!tax.tags.length && <p className="text-ink-400">No tags yet — they're also created when you tag a page or article.</p>}
      </div>
    </div>
  );
}
