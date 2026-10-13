"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { adminJson, adminRequest, adminUpload, SESSION_KEY, UNAUTHORIZED_EVENT } from "./adminApi";
import { AccountPanel } from "./AccountPanel";
import { AuditLogPanel } from "./AuditLogPanel";
import { CollegeContentEditor } from "./CollegeContentEditor";
import { NewsAdmin } from "./NewsAdmin";
import { RevisionHistory } from "./RevisionHistory";
import { SeoPanel } from "./seo/SeoPanel";
import { SessionContext, useSession, type AdminSession, type AdminUser, type Permission } from "./session";
import { ChangePassword, SignIn } from "./SignIn";
import { UsersAdmin } from "./UsersAdmin";

// CMS console. Each person signs in with their own account; what they see and can
// do depends on their role (Admin / SEO Manager / Content Editor). Areas: college
// content, news & blog (with review workflow), SEO, users and the audit log.
// No public nav link; the session token is kept in localStorage.

interface GalleryImage { id: number; url: string; sort: number }
interface AdminCollege {
  id: number;
  name: string;
  slug: string;
  imgUrl: string | null;
  sampleDegreeUrl: string | null;
  mode: string;
  published: boolean;
  city?: { name: string; state: string | null } | null;
  stream?: { name: string } | null;
  gallery: GalleryImage[];
}

type Panel = "colleges" | "news" | "seo" | "users" | "audit" | "account";

const PANELS: [Panel, string, Permission | null][] = [
  ["colleges", "Colleges", "content:edit"],
  ["news", "News & blog", "content:edit"],
  ["seo", "SEO", "seo:basic"],
  ["users", "Users", "users:manage"],
  ["audit", "Audit log", "audit:view"],
];

const readToken = () => { try { return localStorage.getItem(SESSION_KEY); } catch { return null; } };
const storeToken = (t: string | null) => {
  try {
    if (t) localStorage.setItem(SESSION_KEY, t); else localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("cc_admin_token"); // the old shared-token login
  } catch { /* storage blocked */ }
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  // Resume a saved session.
  useEffect(() => {
    const t = readToken();
    if (!t) { setChecking(false); return; }
    adminRequest<{ user: AdminUser }>("/api/admin/auth/me", t).then(({ ok, data }) => {
      if (ok) { setToken(t); setUser(data.user); } else storeToken(null);
      setChecking(false);
    });
  }, []);

  const signOut = useCallback(async () => {
    if (token) await adminRequest("/api/admin/auth/logout", token, { method: "POST" }).catch(() => {});
    storeToken(null); setToken(null); setUser(null);
  }, [token]);

  // Any 401 (session expired, user deactivated, password reset) → back to sign-in.
  useEffect(() => {
    const onUnauthorized = () => { storeToken(null); setToken(null); setUser(null); };
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const session = useMemo<AdminSession | null>(
    () => (token && user ? { token, user, can: (p) => user.permissions.includes(p), setUser } : null),
    [token, user],
  );

  if (checking) return <p className="container-site py-16 text-center text-ink-500">Loading…</p>;
  if (!session) return <SignIn onSignedIn={(t, u) => { storeToken(t); setToken(t); setUser(u); }} />;
  if (session.user.mustChangePassword) return <ChangePassword forced token={session.token} onDone={setUser} />;

  return (
    <SessionContext.Provider value={session}>
      <Console onSignOut={signOut} />
    </SessionContext.Provider>
  );
}

function Console({ onSignOut }: { onSignOut: () => void }) {
  const { user, can } = useSession();
  const visible = PANELS.filter(([, , perm]) => !perm || can(perm));
  const [panel, setPanel] = useState<Panel>(visible[0]?.[0] ?? "account");

  return (
    <div className="container-site py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1 rounded-xl border border-line p-1">
          {visible.map(([p, label]) => (
            <button
              key={p}
              onClick={() => setPanel(p)}
              className={`rounded-lg px-4 py-1.5 text-sm font-bold transition ${panel === p ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-line/50"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPanel("account")} className={`rounded-xl border px-3 py-1.5 text-left text-[12px] leading-tight hover:border-brand-400 ${panel === "account" ? "border-brand-500" : "border-line"}`}>
            <span className="block font-bold text-ink-900">{user.name}</span>
            <span className="text-ink-400">{user.roleLabel}{!user.totpEnabled && " · 2FA off"}</span>
          </button>
          <button onClick={onSignOut} className="rounded-xl border border-line px-3.5 py-2 text-sm font-semibold text-ink-600 hover:border-brand-400">Sign out</button>
        </div>
      </div>

      <div className="mt-6">
        {panel === "colleges" && <CollegesPanel />}
        {panel === "news" && <NewsAdmin />}
        {panel === "seo" && <SeoPanel />}
        {panel === "users" && <UsersAdmin />}
        {panel === "audit" && <AuditLogPanel />}
        {panel === "account" && <AccountPanel />}
      </div>
    </div>
  );
}

function CollegesPanel() {
  const { token } = useSession();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<AdminCollege[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (q: string) => {
    setLoading(true); setError(null);
    try {
      const data = await adminJson<{ items: AdminCollege[] }>(`/api/admin/colleges?search=${encodeURIComponent(q)}`, token);
      setItems(data.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(""); }, [load]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-extrabold">College content</h1>
        <p className="mt-1 text-sm text-ink-500">Upload photos and manage each college&apos;s detail tabs, highlights, courses and FAQs. Changes appear on the site within seconds, and every change is kept in the version history.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); load(search); }} className="mt-5 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a college by name…"
          className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
        />
        <button type="submit" className="btn-primary px-5">Search</button>
      </form>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      {loading ? (
        <p className="mt-8 text-ink-500">Loading…</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((c) => (
            <CollegeRow key={c.id} college={c} onChanged={() => load(search)} />
          ))}
          {items.length === 0 && <p className="text-ink-500">No colleges found. Try a search.</p>}
        </div>
      )}
    </div>
  );
}

function CollegeRow({ college, onChanged }: { college: AdminCollege; onChanged: () => void }) {
  const { token, can } = useSession();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const galleryRef = useRef<HTMLInputElement>(null);
  const degreeRef = useRef<HTMLInputElement>(null);

  const post = async (path: string, fd: FormData, ok: string, resetRef?: React.RefObject<HTMLInputElement | null>) => {
    setBusy(true); setMsg(null);
    try {
      await adminUpload(path, token, fd);
      setMsg(ok);
      onChanged();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (resetRef?.current) resetRef.current.value = "";
    }
  };

  const uploadGallery = (files: FileList | null) => {
    if (!files?.length) return;
    const fd = new FormData();
    Array.from(files).slice(0, 8).forEach((f) => fd.append("images", f));
    return post(`/api/admin/colleges/${college.id}/gallery`, fd, "Photos uploaded ✓", galleryRef);
  };

  const uploadSampleDegree = (files: FileList | null) => {
    if (!files?.length) return;
    const fd = new FormData();
    fd.append("image", files[0]);
    return post(`/api/admin/colleges/${college.id}/sample-degree`, fd, "Sample degree uploaded ✓", degreeRef);
  };

  const remove = async (id: number) => {
    setBusy(true);
    try {
      await adminJson(`/api/admin/gallery/${id}`, token, { method: "DELETE" });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async () => {
    const next = !college.published;
    if (!confirm(next ? `Publish ${college.name}? It will appear on the site and in the sitemap.` : `Unpublish ${college.name}? Its page will return 404 and it leaves listings and the sitemap.`)) return;
    setBusy(true);
    try {
      await adminJson(`/api/admin/colleges/${college.id}/publish`, token, { method: "POST", body: { published: next } });
      setMsg(next ? "Published ✓" : "Unpublished");
      onChanged();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`card p-4 ${college.published ? "" : "border-dashed"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-ink-900">
            {college.name}
            {!college.published && <span className="ml-2 rounded-full bg-danger/10 px-2 py-0.5 text-[11px] font-bold text-danger">Unpublished</span>}
          </h3>
          <p className="text-xs text-ink-400">
            {college.stream?.name}{college.city ? ` · ${college.city.name}${college.city.state ? ", " + college.city.state : ""}` : ""} · {college.gallery.length} photo(s)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {msg && <span className="text-xs font-semibold text-ink-500">{msg}</span>}
          {can("content:publish") && (
            <button onClick={togglePublished} disabled={busy} className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-ink-600 hover:border-brand-400 disabled:opacity-60">
              {college.published ? "Unpublish" : "Publish"}
            </button>
          )}
          <button
            onClick={() => setShowHistory((v) => !v)}
            className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold ${showHistory ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-600 hover:border-brand-400"}`}
          >
            History
          </button>
          <button
            onClick={() => setShowContent((v) => !v)}
            className={`rounded-lg border px-3.5 py-1.5 text-[12px] font-semibold ${showContent ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-600 hover:border-brand-400"}`}
          >
            {showContent ? "▲ Hide content" : "✎ Manage content"}
          </button>
          <input ref={galleryRef} type="file" accept="image/*" multiple hidden onChange={(e) => uploadGallery(e.target.files)} />
          <button onClick={() => galleryRef.current?.click()} disabled={busy} className="btn-primary px-3.5 py-1.5 text-[12px] disabled:opacity-60">
            {busy ? "Working…" : "⬆ Upload photos"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-ink-400">
        These photos rotate every 3s on the listing/grid card and the detail-page hero — the first upload also becomes the fallback thumbnail (search/social previews).
      </p>

      {college.gallery.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {college.gallery.map((g) => (
            <div key={g.id} className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => remove(g.id)}
                disabled={busy}
                aria-label="Delete photo"
                className="absolute right-1.5 top-1.5 rounded-lg bg-ink-900/80 px-2 py-1 text-xs font-bold text-white transition hover:bg-danger disabled:opacity-60"
              >
                ✕ Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex aspect-[16/5] items-center justify-center rounded-xl border border-dashed border-line text-xs text-ink-400">
          No photos yet — upload 3–4 to enable rotation.
        </div>
      )}

      {college.mode !== "Campus" && (
        <div className="mt-4 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-ink-700">Sample degree photo <span className="font-normal text-ink-400">(Placements tab, &quot;View sample degree&quot;)</span></p>
            <input ref={degreeRef} type="file" accept="image/*" hidden onChange={(e) => uploadSampleDegree(e.target.files)} />
            <button onClick={() => degreeRef.current?.click()} disabled={busy} className="rounded-lg border border-brand-400 px-2.5 py-1 text-[12px] font-semibold text-brand-700 disabled:opacity-60">
              ⬆ Upload
            </button>
          </div>
          <div className="mt-2 aspect-[16/10] w-40 overflow-hidden rounded-xl border border-line bg-line">
            {college.sampleDegreeUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={college.sampleDegreeUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-center text-xs text-ink-400">No sample degree yet</span>
            )}
          </div>
        </div>
      )}

      {showHistory && (
        <RevisionHistory entityType="college" entityId={college.id} onClose={() => setShowHistory(false)} onRestored={() => setContentKey((k) => k + 1)} />
      )}
      {showContent && <CollegeContentEditor key={contentKey} collegeId={college.id} token={token} />}
    </div>
  );
}
