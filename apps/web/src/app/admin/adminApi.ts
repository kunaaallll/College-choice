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
