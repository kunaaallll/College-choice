"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Self-contained admin console for uploading real college photos (the 3–4
// images shown in a grid on each college's detail page). Gated by the shared
// ADMIN_TOKEN — kept in localStorage after the first entry. No public nav link.

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface GalleryImage { id: number; url: string; sort: number }
interface AdminCollege {
  id: number;
  name: string;
  slug: string;
  imgUrl: string | null;
  city?: { name: string; state: string | null } | null;
  stream?: { name: string } | null;
  gallery: GalleryImage[];
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<AdminCollege[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cc_admin_token") : null;
    if (saved) { setToken(saved); setAuthed(true); }
  }, []);

  const load = useCallback(async (q: string, tok: string) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API}/api/admin/colleges?search=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.status === 401) { setError("Invalid admin token."); setAuthed(false); localStorage.removeItem("cc_admin_token"); return; }
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed && token) load(search, token); /* eslint-disable-next-line */ }, [authed]);

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    localStorage.setItem("cc_admin_token", token.trim());
    setAuthed(true);
  };

  if (!authed) {
    return (
      <div className="container-site flex min-h-[70vh] items-center justify-center py-10">
        <form onSubmit={signIn} className="card w-full max-w-sm p-6">
          <h1 className="text-xl font-extrabold">College Choice — Admin</h1>
          <p className="mt-1 text-sm text-ink-500">Enter the admin token to manage college photos.</p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="mt-4 w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <button type="submit" className="btn-primary mt-4 w-full">Sign in</button>
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container-site py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">College photos</h1>
          <p className="mt-1 text-sm text-ink-500">Upload 3–4 real images per college. The first becomes the card thumbnail.</p>
        </div>
        <button
          onClick={() => { localStorage.removeItem("cc_admin_token"); setAuthed(false); setToken(""); }}
          className="rounded-xl border border-line px-3.5 py-2 text-sm font-semibold text-ink-600 hover:border-brand-400"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); load(search, token); }}
        className="mt-5 flex gap-2"
      >
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
            <CollegeRow key={c.id} college={c} token={token} onChanged={() => load(search, token)} />
          ))}
          {items.length === 0 && <p className="text-ink-500">No colleges found. Try a search.</p>}
        </div>
      )}
    </div>
  );
}

function CollegeRow({ college, token, onChanged }: { college: AdminCollege; token: string; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setBusy(true); setMsg(null);
    try {
      const fd = new FormData();
      Array.from(files).slice(0, 8).forEach((f) => fd.append("images", f));
      const res = await fetch(`${API}/api/admin/colleges/${college.id}/gallery`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || `Error ${res.status}`);
      setMsg("Uploaded ✓");
      onChanged();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async (id: number) => {
    setBusy(true);
    try {
      await fetch(`${API}/api/admin/gallery/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-ink-900">{college.name}</h3>
          <p className="text-xs text-ink-400">
            {college.stream?.name}{college.city ? ` · ${college.city.name}${college.city.state ? ", " + college.city.state : ""}` : ""} · {college.gallery.length} photo(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs font-semibold text-ink-500">{msg}</span>}
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="btn-primary px-4 py-2 text-sm disabled:opacity-60"
          >
            {busy ? "Uploading…" : "⬆ Upload images"}
          </button>
        </div>
      </div>

      {college.gallery.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {college.gallery.map((g) => (
            <div key={g.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => remove(g.id)}
                className="absolute right-1.5 top-1.5 rounded-lg bg-ink-900/70 px-2 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
