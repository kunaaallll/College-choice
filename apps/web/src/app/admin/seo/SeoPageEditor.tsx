"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../adminApi";
import { RevisionHistory } from "../RevisionHistory";
import { useSession } from "../session";
import {
  btnDanger, btnGhost, btnPrimary, CharCount, Field, fmtDate, inputCls, LIMITS, Notice, SerpPreview,
  SocialPreview, Toggle, TYPE_LABELS,
} from "./ui";

interface SeoFields {
  title: string | null;
  description: string | null;
  keyword: string | null;
  canonical: string | null;
  noindex: boolean;
  nofollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  excludeFromSitemap: boolean;
  disableSchema: boolean;
  customSchema: string | null;
  urlLocked: boolean;
}

interface PageInfo {
  path: string;
  url: string;
  type: string;
  name: string;
  exists: boolean;
  defaults: { title: string | null; description: string | null; image: string | null };
  override: SeoFields | null;
  updatedAt: string | null;
  slugEditable: boolean;
  redirectedAway: { toPath: string; statusCode: number } | null;
  incoming: { id: number; fromPath: string; statusCode: number }[];
}

/** What the live page actually renders (fetched from this site). */
interface LiveCheck {
  status: number;
  redirectedTo: string | null;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  h1s: string[];
  headingSkips: string[];
  imgNoAlt: number;
}

const EMPTY: SeoFields = {
  title: null, description: null, keyword: null, canonical: null, noindex: false, nofollow: false,
  ogTitle: null, ogDescription: null, ogImage: null, twitterTitle: null, twitterDescription: null,
  excludeFromSitemap: false, disableSchema: false, customSchema: null, urlLocked: false,
};

async function inspectLive(path: string): Promise<LiveCheck> {
  const res = await fetch(path, { cache: "no-store" });
  const doc = new DOMParser().parseFromString(await res.text(), "text/html");
  const meta = (sel: string) => doc.querySelector(sel)?.getAttribute("content")?.trim() ?? "";
  // Only the page body — skip the site header/footer.
  const main = doc.querySelector("main") ?? doc.body;
  const headings = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")];
  const headingSkips: string[] = [];
  let prev = 0;
  for (const h of headings) {
    const level = Number(h.tagName[1]);
    if (prev && level > prev + 1) headingSkips.push(`H${prev} → H${level} (“${(h.textContent ?? "").trim().slice(0, 40)}”)`);
    prev = level;
  }
  const finalPath = new URL(res.url).pathname;
  return {
    status: res.status,
    redirectedTo: res.redirected && finalPath !== path ? finalPath : null,
    title: doc.querySelector("title")?.textContent?.trim() ?? "",
    description: meta('meta[name="description"]'),
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
    robots: meta('meta[name="robots"]'),
    ogImage: meta('meta[property="og:image"]'),
    h1s: [...main.querySelectorAll("h1")].map((h) => (h.textContent ?? "").trim()).filter(Boolean),
    headingSkips,
    imgNoAlt: main.querySelectorAll("img:not([alt])").length,
  };
}

export function SeoPageEditor({ token, path, onBack }: { token: string; path: string; onBack: (changed: boolean) => void }) {
  const [info, setInfo] = useState<PageInfo | null>(null);
  const [f, setF] = useState<SeoFields>(EMPTY);
  const [live, setLive] = useState<LiveCheck | null>(null);
  const [liveErr, setLiveErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [saved, setSaved] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [history, setHistory] = useState(false);
  // Content Editors get the search & social fields; the rest needs an SEO Manager.
  const advanced = useSession().can("seo:advanced");

  const set = (patch: Partial<SeoFields>) => { setF((s) => ({ ...s, ...patch })); setDirty(true); setSaved(null); };

  const load = useCallback(async (p: string) => {
    setError(null);
    const { ok, data } = await adminRequest<PageInfo>(`/api/admin/seo/page?path=${encodeURIComponent(p)}`, token);
    if (!ok) { setError(data.error ?? "Failed to load"); return; }
    setInfo(data);
    setF(data.override ?? EMPTY);
    setDirty(false);
    setNewSlug(data.path.split("/").pop() ?? "");
    setLive(null); setLiveErr(null);
    inspectLive(data.path).then(setLive).catch((e) => setLiveErr(e instanceof Error ? e.message : "Couldn't load the page"));
  }, [token]);

  useEffect(() => { load(path); }, [load, path]);

  const save = async () => {
    if (!info) return;
    setBusy(true); setError(null); setWarnings([]);
    const { ok, data } = await adminRequest<{ override: SeoFields | null; updatedAt: string | null }>(
      `/api/admin/seo/page`, token, { method: "PUT", body: { path: info.path, ...f } },
    );
    setBusy(false);
    setWarnings(data.warnings ?? []);
    if (!ok) { setError(data.error ?? "Save failed"); return; }
    setF(data.override ?? EMPTY);
    setInfo({ ...info, override: data.override, updatedAt: data.updatedAt });
    setDirty(false); setChanged(true);
    setSaved("Saved ✓ The live page refreshes within a few seconds.");
    setTimeout(() => inspectLive(info.path).then(setLive).catch(() => {}), 2500);
  };

  const reset = async () => {
    if (!info || !confirm("Remove all custom SEO settings for this page? It will go back to its automatic title, description and settings.")) return;
    setBusy(true);
    const { ok, data } = await adminRequest(`/api/admin/seo/page?path=${encodeURIComponent(info.path)}`, token, { method: "DELETE" });
    setBusy(false);
    if (!ok) { setError(data.error ?? "Reset failed"); return; }
    setChanged(true);
    load(info.path);
  };

  const changeSlug = async () => {
    if (!info) return;
    const prefix = info.path.slice(0, info.path.lastIndexOf("/") + 1);
    const target = `${prefix}${newSlug.trim()}`;
    if (!confirm(`Change this URL?\n\n${info.path}\n→ ${target}\n\nA permanent (301) redirect will be added from the old URL${info.type === "college" ? " and its tab pages" : ""}, and its SEO settings move with it. Links elsewhere on the web keep working.`)) return;
    setBusy(true); setError(null);
    const { ok, data } = await adminRequest<{ newPath: string }>(`/api/admin/seo/change-slug`, token, { method: "POST", body: { path: info.path, newSlug } });
    setBusy(false);
    if (!ok) { setError(data.error ?? "Couldn't change the URL"); return; }
    setChanged(true);
    setSaved(`URL changed to ${data.newPath} — 301 redirect added from the old URL.`);
    load(data.newPath);
  };

  const back = () => {
    if (dirty && !confirm("Discard unsaved changes?")) return;
    onBack(changed);
  };

  if (error && !info) return <div><button className={btnGhost} onClick={back}>← Back</button><p className="mt-4 text-danger">{error}</p></div>;
  if (!info) return <p className="text-ink-500">Loading…</p>;

  // What Google will show: the custom value, else what the page renders today.
  const shownTitle = f.title || live?.title || info.defaults.title || "";
  const shownDesc = f.description || live?.description || info.defaults.description || "";
  const shownImage = f.ogImage || live?.ogImage || info.defaults.image;
  const kw = (f.keyword ?? "").trim().toLowerCase();
  const kwIn = (s: string) => !!kw && s.toLowerCase().includes(kw);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <button className={btnGhost} onClick={back}>← Back to pages</button>
          <h2 className="mt-3 text-xl font-extrabold">{info.name}</h2>
          <p className="mt-0.5 text-[13px] text-ink-500">
            <span className="chip mr-2">{TYPE_LABELS[info.type] ?? info.type}</span>
            <a href={info.path} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">{info.url} ↗</a>
            {info.updatedAt && <span className="ml-2 text-ink-400">· SEO last saved {fmtDate(info.updatedAt)}</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button className={btnGhost} onClick={() => setHistory((v) => !v)}>History</button>
          {advanced && info.override && <button className={btnDanger} onClick={reset} disabled={busy}>Reset to defaults</button>}
          <button className="btn-primary px-5 py-2 text-sm disabled:opacity-60" onClick={save} disabled={busy || !dirty}>{busy ? "Saving…" : "Save SEO"}</button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {info.redirectedAway && (
          <Notice tone="warn">This URL redirects ({info.redirectedAway.statusCode}) to <b>{info.redirectedAway.toPath}</b>, so visitors and Google never see this page. Edit the target page instead, or remove the redirect.</Notice>
        )}
        {!info.exists && <Notice tone="warn">This URL doesn&apos;t match a published page. Settings will apply if a page is published here later.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
        {warnings.map((w) => <Notice key={w} tone="warn">{w}</Notice>)}
        {saved && <Notice tone="ok">{saved}</Notice>}
        {!advanced && <Notice tone="info">You can edit the search and social fields. Indexing, canonical, schema and URL settings are managed by SEO Managers.</Notice>}
      </div>

      {history && <RevisionHistory entityType="seo" entityId={info.path} onClose={() => setHistory(false)} onRestored={() => load(info.path)} />}

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="card space-y-3 p-4">
            <h3 className="font-bold">Search appearance</h3>
            <Field label="SEO title" hint="— exactly as shown in Google (the site name is not added)">
              <input value={f.title ?? ""} onChange={(e) => set({ title: e.target.value })} placeholder={live?.title || info.defaults.title || "Automatic"} className={inputCls} />
              <CharCount value={shownTitle} min={LIMITS.titleMin} max={LIMITS.titleMax} />
            </Field>
            <Field label="Meta description">
              <textarea value={f.description ?? ""} onChange={(e) => set({ description: e.target.value })} rows={3} placeholder={live?.description || info.defaults.description || "Automatic"} className={inputCls} />
              <CharCount value={shownDesc} min={LIMITS.descMin} max={LIMITS.descMax} />
            </Field>
            <Field label="Primary keyword" hint="— for your checks below; not added to the page">
              <input value={f.keyword ?? ""} onChange={(e) => set({ keyword: e.target.value })} placeholder="e.g. iit bombay fees" className={inputCls} />
            </Field>
            {kw && (
              <ul className="grid gap-1 text-[12px] sm:grid-cols-2">
                {[
                  ["In title", kwIn(shownTitle)],
                  ["In description", kwIn(shownDesc)],
                  ["In H1", !!live?.h1s.some((h) => kwIn(h))],
                  ["In URL", kwIn(info.path.replace(/-/g, " ")) || kwIn(info.path)],
                ].map(([label, ok]) => (
                  <li key={String(label)} className={ok ? "text-success" : "text-warn"}>{ok ? "✓" : "✗"} Keyword {String(label).toLowerCase()}</li>
                ))}
              </ul>
            )}
          </section>

          {advanced && <section className="card space-y-3 p-4">
            <h3 className="font-bold">Indexing &amp; canonical</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Toggle checked={f.noindex} onChange={(v) => set({ noindex: v })} label="Noindex" hint="Hide this page from search results" />
              <Toggle checked={f.nofollow} onChange={(v) => set({ nofollow: v })} label="Nofollow" hint="Search engines ignore links on this page" />
              <Toggle checked={f.excludeFromSitemap} onChange={(v) => set({ excludeFromSitemap: v })} label="Exclude from sitemap" hint="Noindex pages are always excluded" />
            </div>
            <Field label="Canonical URL" hint="— leave blank to use this page's own URL (recommended)">
              <input value={f.canonical ?? ""} onChange={(e) => set({ canonical: e.target.value })} placeholder={info.url} className={inputCls} />
            </Field>
            <p className="text-[12px] text-ink-400">Rendered canonical: <span className="font-mono text-ink-600">{f.canonical || info.url}</span></p>
          </section>}

          <section className="card space-y-3 p-4">
            <h3 className="font-bold">Social sharing</h3>
            <p className="text-[12px] text-ink-400">Used by Facebook, WhatsApp, LinkedIn and X. Blank fields fall back to the SEO title, description and the page&apos;s main image.</p>
            <Field label="Open Graph title"><input value={f.ogTitle ?? ""} onChange={(e) => set({ ogTitle: e.target.value })} placeholder={shownTitle} className={inputCls} /></Field>
            <Field label="Open Graph description"><textarea value={f.ogDescription ?? ""} onChange={(e) => set({ ogDescription: e.target.value })} rows={2} placeholder={shownDesc} className={inputCls} /></Field>
            <Field label="Social image URL" hint="— 1200×630 px works best">
              <input value={f.ogImage ?? ""} onChange={(e) => set({ ogImage: e.target.value })} placeholder={info.defaults.image || "https://… or /api/uploads/…"} className={inputCls} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="X / Twitter title"><input value={f.twitterTitle ?? ""} onChange={(e) => set({ twitterTitle: e.target.value })} placeholder="Same as Open Graph" className={inputCls} /></Field>
              <Field label="X / Twitter description"><input value={f.twitterDescription ?? ""} onChange={(e) => set({ twitterDescription: e.target.value })} placeholder="Same as Open Graph" className={inputCls} /></Field>
            </div>
          </section>

          {advanced && <section className="card space-y-3 p-4">
            <h3 className="font-bold">Structured data (schema)</h3>
            <Toggle checked={f.disableSchema} onChange={(v) => set({ disableSchema: v })} label="Turn off this page's automatic schema" hint="College / FAQ / Article / ItemList JSON-LD. Breadcrumb and site-wide Organization schema stay on." />
            <Field label="Custom JSON-LD" hint="— added to the page; must be valid JSON">
              <textarea
                value={f.customSchema ?? ""}
                onChange={(e) => set({ customSchema: e.target.value })}
                rows={6}
                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Course",\n  "name": "…"\n}'}
                className={`${inputCls} font-mono text-[12px]`}
              />
            </Field>
            <p className="text-[12px] text-ink-400">
              Test the result with Google&apos;s <a className="text-brand-700 hover:underline" href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(info.url)}`} target="_blank" rel="noreferrer">Rich Results Test ↗</a>.
            </p>
          </section>}

          {advanced && info.slugEditable && (
            <section className="card space-y-3 p-4">
              <h3 className="font-bold">URL</h3>
              <Toggle checked={f.urlLocked} onChange={(v) => set({ urlLocked: v })} label="Lock this URL" hint="Prevents accidental slug changes on important pages (save to apply)" />
              <Field label="Slug" hint={`— ${info.url.slice(0, info.url.lastIndexOf("/") + 1)}…`}>
                <div className="flex gap-2">
                  <input value={newSlug} onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} disabled={info.override?.urlLocked} className={inputCls} />
                  <button className={btnPrimary} onClick={changeSlug} disabled={busy || info.override?.urlLocked || !newSlug.trim() || newSlug === info.path.split("/").pop()}>Change URL</button>
                </div>
              </Field>
              <p className="text-[12px] text-ink-400">
                {info.override?.urlLocked ? "Locked — untick and save to allow changes. " : ""}
                New URL preview: <span className="font-mono text-ink-600">{info.url.slice(0, info.url.lastIndexOf("/") + 1)}{newSlug || "…"}</span>
              </p>
            </section>
          )}

          {info.incoming.length > 0 && (
            <section className="card p-4">
              <h3 className="font-bold">Redirects to this page</h3>
              <ul className="mt-2 space-y-1 text-[13px] text-ink-600">
                {info.incoming.map((r) => <li key={r.id}><span className="font-mono">{r.fromPath}</span> → this page ({r.statusCode})</li>)}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-ink-400">Google preview</p>
            <SerpPreview title={shownTitle} description={shownDesc} url={info.url} />
            {f.noindex && <p className="mt-1.5 text-[12px] font-semibold text-warn">Noindex is on — this page won&apos;t appear in Google.</p>}
          </div>
          <div>
            <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-ink-400">Social preview</p>
            <SocialPreview title={f.ogTitle || shownTitle} description={f.ogDescription || shownDesc} image={shownImage} url={info.url} />
          </div>
          <LiveChecks live={live} error={liveErr} path={info.path} onRefresh={() => inspectLive(info.path).then(setLive).catch((e) => setLiveErr(String(e)))} />
        </aside>
      </div>
    </div>
  );
}

function LiveChecks({ live, error, path, onRefresh }: { live: LiveCheck | null; error: string | null; path: string; onRefresh: () => void }) {
  const rows: [boolean | "warn", string][] = live
    ? [
        [live.status === 200, live.status === 200 ? "Page loads (200)" : `Page returns ${live.status}`],
        [live.redirectedTo ? "warn" : true, live.redirectedTo ? `Redirects to ${live.redirectedTo}` : "No redirect"],
        [!!live.title, live.title ? "Has a title" : "Missing title"],
        [!!live.description, live.description ? "Has a meta description" : "Missing meta description"],
        [live.h1s.length === 1 ? true : live.h1s.length === 0 ? false : "warn",
          live.h1s.length === 1 ? `One H1: “${live.h1s[0].slice(0, 50)}”` : live.h1s.length === 0 ? "Missing H1" : `${live.h1s.length} H1 headings — use one`],
        [live.headingSkips.length ? "warn" : true, live.headingSkips.length ? `Heading levels skipped: ${live.headingSkips.slice(0, 2).join("; ")}` : "Heading order looks right"],
        [live.imgNoAlt ? "warn" : true, live.imgNoAlt ? `${live.imgNoAlt} image(s) missing alt text` : "All images have alt text"],
        [!!live.canonical, live.canonical ? `Canonical: ${live.canonical.replace(/^https?:\/\/[^/]+/, "") || "/"}` : "No canonical tag"],
        [!/noindex/i.test(live.robots), /noindex/i.test(live.robots) ? `Robots: ${live.robots}` : "Indexable"],
      ]
    : [];
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">Live page check</p>
        <button className="text-[12px] font-semibold text-brand-700 hover:underline" onClick={onRefresh}>Re-check</button>
      </div>
      {error && <p className="mt-2 text-[13px] text-danger">Couldn&apos;t load {path}: {error}</p>}
      {!live && !error && <p className="mt-2 text-[13px] text-ink-400">Checking the live page…</p>}
      <ul className="mt-2 space-y-1.5 text-[13px]">
        {rows.map(([ok, label]) => (
          <li key={label} className={ok === true ? "text-ink-600" : ok === "warn" ? "text-warn" : "text-danger"}>
            {ok === true ? "✓" : ok === "warn" ? "⚠" : "✗"} {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
