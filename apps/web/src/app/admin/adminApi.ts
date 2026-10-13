// Shared helpers for the admin console (client-side). All calls carry the
// shared ADMIN_TOKEN as a Bearer header.

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/** JSON fetch with the admin token. Throws Error(message) on non-2xx. */
export async function adminJson<T>(
  path: string,
  token: string,
  opts?: { method?: string; body?: unknown },
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: opts?.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(opts?.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: opts?.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string })?.error || `Error ${res.status}`);
  return data as T;
}

/** Multipart upload with the admin token (for images). */
export async function adminUpload<T>(path: string, token: string, fd: FormData): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
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
  const res = await fetch(`${API}${path}`, {
    method: opts?.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(opts?.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: opts?.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({ error: `Error ${res.status}` }));
  return { ok: res.ok, status: res.status, data };
}

/** Download an admin CSV export (the token can't go in a plain link). */
export async function adminDownload(path: string, token: string, fallbackName: string) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || `Error ${res.status}`);
  const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") || "")?.[1] || fallbackName;
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
