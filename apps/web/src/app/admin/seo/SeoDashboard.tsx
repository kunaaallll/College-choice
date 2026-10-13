"use client";

import { useEffect, useState } from "react";
import { adminRequest } from "../adminApi";
import type { PageFilter } from "./SeoPages";
import { fmtDate, ISSUE_LABELS, Notice, TYPE_LABELS } from "./ui";

interface Dashboard {
  totals: {
    pages: number; byType: Record<string, number>; overrides: number; noindex: number; excludedFromSitemap: number;
    redirects: number; redirectsDisabled: number; notFoundOpen: number;
  };
  content: { collegesPublished: number; collegesDraft: number; news: number };
  health: Record<string, number>;
  recentSeo: { path: string; updatedAt: string }[];
  recentContent: { name: string; path: string; updatedAt: string }[];
  recentRedirects: { fromPath: string; toPath: string; statusCode: number; createdAt: string }[];
  top404: { id: number; path: string; hits: number; lastSeen: string }[];
}

// Health rows in priority order: [issue, explanation].
const HEALTH: [string, string][] = [
  ["title-long", "Titles over 60 characters get cut off in Google"],
  ["title-short", "Titles under 30 characters waste space in results"],
  ["desc-long", "Descriptions over 160 characters get cut off"],
  ["desc-short", "Descriptions under 70 characters"],
  ["no-custom-description", "Using an automatic description"],
  ["no-custom-title", "Using an automatic title"],
  ["no-image", "Colleges/articles with no image for social sharing"],
  ["custom-canonical", "Pages pointing their canonical elsewhere"],
  ["noindex", "Pages hidden from search (noindex)"],
];

export function SeoDashboard({ token, onFilter, onOpen, onTab }: {
  token: string;
  onFilter: (f: PageFilter) => void;
  onOpen: (path: string) => void;
  onTab: (tab: "redirects" | "404s") => void;
}) {
  const [d, setD] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminRequest<Dashboard>(`/api/admin/seo/dashboard`, token).then(({ ok, data }) => (ok ? setD(data) : setError(data.error ?? "Failed to load")));
  }, [token]);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!d) return <p className="text-ink-500">Loading dashboard…</p>;

  const stat = (label: string, value: number | string, onClick?: () => void, tone = "text-ink-900") => (
    <button onClick={onClick} disabled={!onClick} className="card p-4 text-left transition enabled:hover:border-brand-400">
      <p className={`text-2xl font-extrabold ${tone}`}>{typeof value === "number" ? value.toLocaleString("en-IN") : value}</p>
      <p className="mt-0.5 text-[12px] font-semibold text-ink-500">{label}</p>
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">SEO dashboard</h2>
        <p className="mt-1 text-sm text-ink-500">Content snapshot, SEO health across every page, and recent changes. Click any number to see those pages.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stat("Pages tracked", d.totals.pages, () => onFilter({}))}
        {stat("Colleges published", d.content.collegesPublished, () => onFilter({ type: "college" }))}
        {stat("Colleges unpublished (draft)", d.content.collegesDraft)}
        {stat("News articles", d.content.news, () => onFilter({ type: "news" }))}
        {stat("Pages with custom SEO", d.totals.overrides, () => onFilter({ issue: "has-override" }))}
        {stat("Noindex pages", d.totals.noindex, () => onFilter({ index: "noindex" }), d.totals.noindex ? "text-warn" : "text-ink-900")}
        {stat("Active redirects", d.totals.redirects - d.totals.redirectsDisabled, () => onTab("redirects"))}
        {stat("Open 404s", d.totals.notFoundOpen, () => onTab("404s"), d.totals.notFoundOpen ? "text-danger" : "text-success")}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-4">
          <h3 className="font-bold">SEO health</h3>
          <ul className="mt-3 divide-y divide-line">
            {HEALTH.map(([issue, why]) => {
              const n = d.health[issue] ?? 0;
              return (
                <li key={issue}>
                  <button onClick={() => onFilter({ issue })} disabled={!n} className="flex w-full items-center justify-between gap-3 py-2 text-left enabled:hover:text-brand-700">
                    <span>
                      <span className="text-[13px] font-semibold">{ISSUE_LABELS[issue]}</span>
                      <span className="block text-[12px] text-ink-400">{why}</span>
                    </span>
                    <span className={`text-lg font-extrabold ${n ? (issue.startsWith("no-custom") || issue === "custom-canonical" ? "text-ink-500" : "text-warn") : "text-success"}`}>{n.toLocaleString("en-IN")}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="card p-4">
            <h3 className="font-bold">Pages by type</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(d.totals.byType).map(([t, n]) => (
                <button key={t} onClick={() => onFilter({ type: t })} className="chip hover:!bg-brand-50">{TYPE_LABELS[t] ?? t}: {n.toLocaleString("en-IN")}</button>
              ))}
            </div>
          </section>

          <section className="card p-4">
            <div className="flex items-center justify-between"><h3 className="font-bold">Top 404s</h3><button className="text-[12px] font-semibold text-brand-700 hover:underline" onClick={() => onTab("404s")}>Fix →</button></div>
            <ul className="mt-2 space-y-1 text-[13px]">
              {d.top404.map((e) => <li key={e.id} className="flex justify-between gap-3"><span className="truncate font-mono">{e.path}</span><span className="shrink-0 text-ink-400">{e.hits} hits</span></li>)}
              {!d.top404.length && <li className="text-ink-400">No open 404s.</li>}
            </ul>
          </section>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentList title="Recently changed SEO" items={d.recentSeo.map((r) => ({ key: r.path, label: r.path, at: r.updatedAt, onClick: () => onOpen(r.path) }))} />
        <RecentList title="Recently updated colleges" items={d.recentContent.map((r) => ({ key: r.path, label: r.name, at: r.updatedAt, onClick: () => onOpen(r.path) }))} />
        <RecentList title="Recently changed URLs (redirects)" items={d.recentRedirects.map((r) => ({ key: r.fromPath, label: `${r.fromPath} → ${r.toPath}`, at: r.createdAt, onClick: () => onTab("redirects") }))} />
      </div>
      <p className="text-[12px] text-ink-400">Scheduled publishing and the approval workflow arrive with user roles in the next phase.</p>
    </div>
  );
}

function RecentList({ title, items }: { title: string; items: { key: string; label: string; at: string; onClick: () => void }[] }) {
  return (
    <section className="card p-4">
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-[13px]">
        {items.map((i) => (
          <li key={i.key}>
            <button onClick={i.onClick} className="block w-full truncate text-left font-semibold text-ink-700 hover:text-brand-700">{i.label}</button>
            <span className="text-[11px] text-ink-400">{fmtDate(i.at)}</span>
          </li>
        ))}
        {!items.length && <li className="text-ink-400">Nothing yet.</li>}
      </ul>
    </section>
  );
}
