// Shared helpers for the admin console (client-side). Every call carries the
// signed-in user's session token as a Bearer header; a 401 (expired or revoked
// session) signs the console out via the "cc-admin-unauthorized" event.

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const SESSION_KEY = "cc_admin_session";
export const UNAUTHORIZED_EVENT = "cc-admin-unauthorized";

async function call(path: string, token: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
  if (res.status === 401 && typeof window !== "undefined") window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
  return res;
}

const jsonInit = (opts?: { method?: string; body?: unknown }): RequestInit => ({
  method: opts?.method || "GET",
  headers: opts?.body !== undefined ? { "Content-Type": "application/json" } : {},
  body: opts?.body !== undefined ? JSON.stringify(opts.body) : undefined,
});

/** JSON fetch with the session token. Throws Error(message) on non-2xx. */
export async function adminJson<T>(path: string, token: string, opts?: { method?: string; body?: unknown }): Promise<T> {
  const res = await call(path, token, jsonInit(opts));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string })?.error || `Error ${res.status}`);
  return data as T;
}

/** Multipart upload with the session token (for images). */
export async function adminUpload<T>(path: string, token: string, fd: FormData): Promise<T> {
  const res = await call(path, token, { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string })?.error || `Error ${res.status}`);
  return data as T;
}

/**
 * Like adminJson, but never throws on HTTP errors — returns the parsed body either
 * way, so callers can show validation errors *and* warnings from a 400.
 */
export async function adminRequest<T>(
  path: string,
  token: string,
  opts?: { method?: string; body?: unknown },
): Promise<{ ok: boolean; status: number; data: T & { error?: string; warnings?: string[] } }> {
  const res = await call(path, token, jsonInit(opts));
  const data = await res.json().catch(() => ({ error: `Error ${res.status}` }));
  return { ok: res.ok, status: res.status, data };
}

/** Unauthenticated JSON POST/GET (sign-in screens). */
export async function publicJson<T>(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: T & { error?: string } }> {
  const res = await fetch(`${API}${path}`, jsonInit(body === undefined ? undefined : { method: "POST", body }));
  const data = await res.json().catch(() => ({ error: `Error ${res.status}` }));
  return { ok: res.ok, status: res.status, data };
}

/** Download an admin CSV export (the token can't go in a plain link). */
export async function adminDownload(path: string, token: string, fallbackName: string) {
  const res = await call(path, token);
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || `Error ${res.status}`);
  const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") || "")?.[1] || fallbackName;
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
