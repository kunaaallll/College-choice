"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "./adminApi";
import { useSession } from "./session";
import { btnDanger, btnGhost, btnPrimary, fmtDate, inputCls, Notice } from "./seo/ui";

type Role = "ADMIN" | "SEO_MANAGER" | "CONTENT_EDITOR" | "COUNSELLOR";
interface User {
  id: number; email: string; name: string; role: Role; active: boolean; totpEnabled: boolean;
  mustChangePassword: boolean; lastLoginAt: string | null; createdAt: string;
}

const ROLES: [Role, string, string][] = [
  ["ADMIN", "Admin", "Everything: users, settings, SEO, content and publishing."],
  ["SEO_MANAGER", "SEO Manager", "All SEO tools, redirects, robots & sitemap; reviews, approves and publishes content."],
  ["CONTENT_EDITOR", "Content Editor", "Creates and edits content and basic SEO fields; submits articles for approval."],
  ["COUNSELLOR", "Counsellor", "Works the leads: contact details, statuses, follow-ups, notes and lead reports. No content access."],
];
const roleLabel = (r: Role) => ROLES.find(([k]) => k === r)?.[1] ?? r;

/** A readable temporary password, shown once to the admin to pass on. */
function tempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const buf = new Uint32Array(14);
  crypto.getRandomValues(buf);
  return Array.from(buf, (n) => chars[n % chars.length]).join("").replace(/(.{4})(?=.)/g, "$1-");
}

export function UsersAdmin() {
  const { token, user: me } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "info"; text: React.ReactNode } | null>(null);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    const { ok, data } = await adminRequest<{ items: User[] }>("/api/admin/users", token);
    if (ok) setUsers(data.items); else setMsg({ tone: "error", text: data.error ?? "Failed to load" });
  }, [token]);
  useEffect(() => { load(); }, [load]);

  const update = async (u: User, body: Partial<Pick<User, "role" | "active" | "name">>, confirmText?: string) => {
    if (confirmText && !confirm(confirmText)) return;
    const { ok, data } = await adminRequest(`/api/admin/users/${u.id}`, token, { method: "PUT", body });
    setMsg(ok ? { tone: "ok", text: `Updated ${u.name}.` } : { tone: "error", text: data.error ?? "Failed" });
    load();
  };

  const resetPassword = async (u: User) => {
    if (!confirm(`Reset ${u.name}'s password? They'll be signed out and must choose a new password at their next sign-in.`)) return;
    const password = tempPassword();
    const { ok, data } = await adminRequest(`/api/admin/users/${u.id}/reset-password`, token, { method: "POST", body: { password } });
    setMsg(ok
      ? { tone: "info", text: <>Temporary password for <b>{u.email}</b>: <span className="select-all font-mono font-bold">{password}</span> — share it privately; it&apos;s shown only once.</> }
      : { tone: "error", text: data.error ?? "Failed" });
    load();
  };

  const reset2fa = async (u: User) => {
    if (!confirm(`Turn off two-factor sign-in for ${u.name}? Use this if they lost their phone; they can set it up again from My account.`)) return;
    const { ok, data } = await adminRequest(`/api/admin/users/${u.id}/reset-2fa`, token, { method: "POST" });
    setMsg(ok ? { tone: "ok", text: `Two-factor turned off for ${u.name}.` } : { tone: "error", text: data.error ?? "Failed" });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Users &amp; roles</h2>
          <p className="mt-1 text-sm text-ink-500">Everyone who can sign in to the CMS. Deactivating a user signs them out immediately; their past changes stay in the audit log.</p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm" onClick={() => setAdding((v) => !v)}>{adding ? "Cancel" : "+ Add user"}</button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.map(([k, label, desc]) => (
          <div key={k} className="rounded-xl border border-line p-3 text-[12px]"><p className="font-bold text-ink-900">{label}</p><p className="mt-0.5 text-ink-500">{desc}</p></div>
        ))}
      </div>

      {adding && <AddUser token={token} onDone={(text) => { setAdding(false); setMsg({ tone: "info", text }); load(); }} />}
      {msg && <div className="mt-4"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead className="bg-line/40 text-[12px] uppercase tracking-wide text-ink-500">
            <tr><th className="px-3 py-2">User</th><th className="px-3 py-2">Role</th><th className="px-3 py-2">Security</th><th className="px-3 py-2">Last sign-in</th><th className="px-3 py-2" /></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={`border-t border-line align-top ${u.active ? "" : "opacity-50"}`}>
                <td className="px-3 py-2"><p className="font-semibold text-ink-900">{u.name}{u.id === me.id && <span className="ml-1 text-ink-400">(you)</span>}</p><p className="text-[12px] text-ink-400">{u.email}</p></td>
                <td className="px-3 py-2">
                  <select value={u.role} disabled={!u.active} onChange={(e) => update(u, { role: e.target.value as Role }, `Change ${u.name}'s role to ${roleLabel(e.target.value as Role)}?`)}
                    className="rounded-lg border border-line px-2 py-1 text-[13px]">
                    {ROLES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2 text-[12px]">
                  {u.totpEnabled ? <span className="text-success">2FA on</span> : <span className="text-warn">2FA off</span>}
                  {u.mustChangePassword && <p className="text-ink-400">Temporary password</p>}
                  {!u.active && <p className="font-semibold text-danger">Deactivated</p>}
                </td>
                <td className="px-3 py-2 text-[12px] text-ink-500">{fmtDate(u.lastLoginAt)}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right">
                  <button className={btnGhost} onClick={() => resetPassword(u)}>Reset password</button>{" "}
                  {u.totpEnabled && <><button className={btnGhost} onClick={() => reset2fa(u)}>Reset 2FA</button>{" "}</>}
                  {u.active
                    ? <button className={btnDanger} disabled={u.id === me.id} onClick={() => update(u, { active: false }, `Deactivate ${u.name}? They'll be signed out and can't sign in until reactivated.`)}>Deactivate</button>
                    : <button className={btnGhost} onClick={() => update(u, { active: true })}>Reactivate</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddUser({ token, onDone }: { token: string; onDone: (text: React.ReactNode) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("CONTENT_EDITOR");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const create = async () => {
    setBusy(true); setError(null);
    const password = tempPassword();
    const { ok, data } = await adminRequest("/api/admin/users", token, { method: "POST", body: { email, name, role, password } });
    setBusy(false);
    if (!ok) { setError(data.error ?? "Couldn't create the user"); return; }
    onDone(<>Created <b>{email}</b> ({roleLabel(role)}). Temporary password: <span className="select-all font-mono font-bold">{password}</span> — share it privately; it&apos;s shown only once. They&apos;ll choose their own password at first sign-in.</>);
  };

  return (
    <div className="card mt-4 space-y-3 p-4">
      <h3 className="font-bold">New user</h3>
      <div className="grid gap-3 md:grid-cols-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputCls} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputCls} />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)} className={inputCls}>
          {ROLES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
        </select>
      </div>
      <p className="text-[12px] text-ink-400">A temporary password is generated for you to share; they must change it at first sign-in.</p>
      {error && <Notice tone="error">{error}</Notice>}
      <button className={btnPrimary} onClick={create} disabled={busy || !email || !name}>{busy ? "Creating…" : "Create user"}</button>
    </div>
  );
}
