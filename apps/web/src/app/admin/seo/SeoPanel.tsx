"use client";

import { useState } from "react";
import { NotFoundAdmin } from "./NotFoundAdmin";
import { RedirectsAdmin } from "./RedirectsAdmin";
import { SeoDashboard } from "./SeoDashboard";
import { SeoPageEditor } from "./SeoPageEditor";
import { SeoPages, type PageFilter } from "./SeoPages";
import { SiteSeoSettings } from "./SiteSeoSettings";

type Tab = "dashboard" | "pages" | "redirects" | "404s" | "settings";

const TABS: [Tab, string][] = [
  ["dashboard", "Dashboard"],
  ["pages", "Pages"],
  ["redirects", "Redirects"],
  ["404s", "404s"],
  ["settings", "Robots & sitemap"],
];

/** SEO area of the admin console. */
export function SeoPanel({ token }: { token: string }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [filter, setFilter] = useState<PageFilter>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [redirectPrefill, setRedirectPrefill] = useState<{ from: string; to: string } | null>(null);
  const [pagesKey, setPagesKey] = useState(0);

  const go = (t: Tab) => { setTab(t); setEditing(null); if (t !== "redirects") setRedirectPrefill(null); };
  const openPage = (path: string) => { setTab("pages"); setEditing(path); };

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line">
        {TABS.map(([t, label]) => (
          <button
            key={t}
            onClick={() => go(t)}
            className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-bold transition ${tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-ink-500 hover:text-ink-900"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "dashboard" && (
          <SeoDashboard
            token={token}
            onFilter={(f) => { setFilter(f); go("pages"); }}
            onOpen={openPage}
            onTab={(t) => go(t)}
          />
        )}
        {tab === "pages" && editing && (
          <SeoPageEditor token={token} path={editing} onBack={(changed) => { setEditing(null); if (changed) setPagesKey((k) => k + 1); }} />
        )}
        {/* Kept mounted while editing so filters, page and selection survive. */}
        {tab === "pages" && (
          <div className={editing ? "hidden" : ""}>
            <SeoPages key={pagesKey} token={token} initialFilter={filter} onOpen={setEditing} />
          </div>
        )}
        {tab === "redirects" && <RedirectsAdmin key={redirectPrefill?.from ?? ""} token={token} prefill={redirectPrefill} />}
        {tab === "404s" && <NotFoundAdmin token={token} onCustomRedirect={(from) => { setRedirectPrefill({ from, to: "" }); setTab("redirects"); }} />}
        {tab === "settings" && <SiteSeoSettings token={token} />}
      </div>
    </div>
  );
}
