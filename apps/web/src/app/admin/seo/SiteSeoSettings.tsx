"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../adminApi";
import { btnGhost, btnPrimary, inputCls, Notice, Toggle } from "./ui";

interface Settings {
  robotsTxt: string | null;
  sitemap: Record<string, boolean>;
  sections: string[];
  excludedPages: number;
  warnings: string[];
}

const SECTION_LABELS: Record<string, string> = {
  static: "Main pages (home, colleges, courses, exams, news, about)",
  colleges: "College pages",
  streams: "Stream landing pages",
  cities: "City landing pages",
  online: "Online degree pages",
  news: "News articles",
  courses: "Course pages",
  exams: "Exam pages",
  pages: "Info & service pages",
};

export function SiteSeoSettings({ token }: { token: string }) {
  const [s, setS] = useState<Settings | null>(null);
  const [draft, setDraft] = useState("");
  const [live, setLive] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchLive = () => fetch("/robots.txt", { cache: "no-store" }).then((r) => r.text()).catch(() => "");

  const load = useCallback(async () => {
    const [{ ok, data }, liveTxt] = await Promise.all([adminRequest<Settings>(`/api/admin/seo/settings`, token), fetchLive()]);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Failed to load" }); return; }
    setS(data);
    setLive(liveTxt);
    setDraft(data.robotsTxt ?? liveTxt);
    setWarnings(data.warnings);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  // Re-check the draft as it's edited.
  useEffect(() => {
    if (!s) return;
    const t = setTimeout(async () => {
      const { data } = await adminRequest<{ warnings: string[] }>(`/api/admin/seo/robots-check`, token, { method: "POST", body: { robotsTxt: draft } });
      setWarnings(data.warnings ?? []);
    }, 500);
    return () => clearTimeout(t);
  }, [draft, s, token]);

  const saveRobots = async (value: string | null) => {
    const blocking = warnings.some((w) => w.includes("Disallow: /”"));
    if (value !== null && blocking && !confirm("This robots.txt blocks the whole site from search engines. Save anyway?")) return;
    setBusy(true); setMsg(null);
    const { ok, data } = await adminRequest<Settings>(`/api/admin/seo/settings`, token, { method: "PUT", body: { robotsTxt: value } });
    setBusy(false);
    if (!ok) { setMsg({ tone: "error", text: data.error ?? "Save failed" }); return; }
    setMsg({ tone: "ok", text: value === null ? "Reset to the default robots.txt ✓" : "robots.txt saved ✓ — live within a few seconds." });
    setTimeout(load, 2000);
  };

  const saveSitemap = async (sitemap: Record<string, boolean>) => {
    setS((cur) => (cur ? { ...cur, sitemap } : cur));
    const { ok, data } = await adminRequest(`/api/admin/seo/settings`, token, { method: "PUT", body: { sitemap } });
    setMsg(ok ? { tone: "ok", text: "Sitemap settings saved ✓" } : { tone: "error", text: data.error ?? "Save failed" });
  };

  if (!s) return <p className="text-ink-500">Loading…</p>;
  const dirty = draft.trim() !== (s.robotsTxt ?? live).trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">Robots &amp; sitemap</h2>
        <p className="mt-1 text-sm text-ink-500">Site-wide crawl controls. Per-page indexing (noindex, nofollow, exclude from sitemap) is set on each page in <b>Pages</b>.</p>
      </div>
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}

      <section className="card space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold">robots.txt {s.robotsTxt === null && <span className="chip ml-2">Default</span>}</h3>
          <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-brand-700 hover:underline">View live /robots.txt ↗</a>
        </div>
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={12} spellCheck={false} className={`${inputCls} font-mono text-[12px]`} />
        <p className="text-[12px] text-ink-400">A <code>Sitemap:</code> line is added automatically if you leave it out. Avoid blocking pages you want indexed — use noindex on the page instead, because Google can&apos;t see a noindex on a blocked page.</p>
        {warnings.map((w) => <Notice key={w} tone={w.startsWith("No Sitemap") ? "info" : "warn"}>{w}</Notice>)}
        <div className="flex flex-wrap gap-2">
          <button className={btnPrimary} onClick={() => saveRobots(draft)} disabled={busy || !dirty || !draft.trim()}>Save robots.txt</button>
          {dirty && <button className={btnGhost} onClick={() => setDraft(s.robotsTxt ?? live)}>Discard changes</button>}
          {s.robotsTxt !== null && <button className={btnGhost} onClick={() => confirm("Go back to the default robots.txt?") && saveRobots(null)} disabled={busy}>Reset to default</button>}
        </div>
      </section>

      <section className="card space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold">XML sitemap</h3>
          <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-brand-700 hover:underline">View live /sitemap.xml ↗</a>
        </div>
        <p className="text-[13px] text-ink-500">
          The sitemap is generated automatically: an index at <code>/sitemap.xml</code> with one file per section (colleges split into files of 5,000), each with last-modified dates.
          Choose which sections are included. {s.excludedPages} page(s) are currently left out individually (noindex, excluded, or canonical pointing elsewhere).
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {s.sections.map((k) => (
            <Toggle key={k} checked={s.sitemap[k] !== false} onChange={(v) => saveSitemap({ ...s.sitemap, [k]: v })} label={SECTION_LABELS[k] ?? k} />
          ))}
        </div>
        <p className="text-[12px] text-ink-400">Submit <code>{typeof window !== "undefined" ? window.location.origin : ""}/sitemap.xml</code> once in Google Search Console → Sitemaps; Google re-reads it automatically after that.</p>
      </section>
    </div>
  );
}
