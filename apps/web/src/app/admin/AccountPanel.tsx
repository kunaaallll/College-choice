"use client";

import { useState } from "react";
import { adminRequest } from "./adminApi";
import { ChangePassword } from "./SignIn";
import { useSession, type AdminUser } from "./session";
import { Notice } from "./seo/ui";

/** My account: password and two-factor sign-in. */
export function AccountPanel() {
  const { token, user, setUser } = useSession();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="card p-5">
        <h2 className="text-lg font-extrabold">My account</h2>
        <dl className="mt-3 grid grid-cols-[110px_1fr] gap-y-1.5 text-sm">
          <dt className="text-ink-400">Name</dt><dd className="font-semibold">{user.name}</dd>
          <dt className="text-ink-400">Email</dt><dd className="font-semibold">{user.email}</dd>
          <dt className="text-ink-400">Role</dt><dd className="font-semibold">{user.roleLabel}</dd>
        </dl>
        <h3 className="mt-6 font-bold">Change password</h3>
        <ChangePassword token={token} onDone={(u) => { setUser(u); setMsg("Password changed ✓ Other devices were signed out."); }} />
        {msg && <div className="mt-3"><Notice tone="ok">{msg}</Notice></div>}
      </section>
      <TwoFactor token={token} user={user} onChange={setUser} />
    </div>
  );
}

function TwoFactor({ token, user, onChange }: { token: string; user: AdminUser; onChange: (u: AdminUser) => void }) {
  const [setup, setSetup] = useState<{ secret: string; qr: string } | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async <T,>(path: string, body: unknown, done: (d: T) => void) => {
    setBusy(true); setError(null); setOk(null);
    const { ok: success, data } = await adminRequest<T>(path, token, { method: "POST", body });
    setBusy(false);
    if (!success) { setError(data.error ?? "Something went wrong"); return; }
    done(data);
  };

  return (
    <section className="card p-5">
      <h2 className="text-lg font-extrabold">Two-factor sign-in</h2>
      <p className="mt-1 text-sm text-ink-500">
        Adds a 6-digit code from an authenticator app (Google Authenticator, Microsoft Authenticator, Authy…) to your password.
        Strongly recommended for Admin and SEO Manager accounts.
      </p>
      <p className="mt-3 text-sm">
        Status: {user.totpEnabled ? <span className="font-bold text-success">On</span> : <span className="font-bold text-warn">Off</span>}
      </p>

      {!user.totpEnabled && !setup && (
        <button className="btn-primary mt-4 px-4 py-2 text-sm" disabled={busy} onClick={() => run<{ secret: string; qr: string }>("/api/admin/auth/2fa/setup", {}, setSetup)}>
          Set up two-factor
        </button>
      )}

      {!user.totpEnabled && setup && (
        <div className="mt-4 space-y-3">
          <p className="text-sm">1. Scan this QR code with your authenticator app:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={setup.qr} alt="Two-factor QR code" className="h-[200px] w-[200px] rounded-lg border border-line" />
          <p className="text-[12px] text-ink-400">Can&apos;t scan? Enter this key manually: <span className="select-all font-mono text-ink-700">{setup.secret}</span></p>
          <p className="text-sm">2. Enter the 6-digit code it shows:</p>
          <div className="flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="123456"
              className="w-36 rounded-lg border border-line px-3 py-2 text-center font-mono tracking-[0.3em] outline-none focus:border-brand-500" />
            <button className="btn-primary px-4 text-sm disabled:opacity-60" disabled={busy || code.length !== 6}
              onClick={() => run<{ user: AdminUser }>("/api/admin/auth/2fa/enable", { code }, (d) => { onChange(d.user); setSetup(null); setCode(""); setOk("Two-factor sign-in is on ✓"); })}>
              Turn on
            </button>
          </div>
        </div>
      )}

      {user.totpEnabled && (
        <div className="mt-4 space-y-2">
          <p className="text-[13px] text-ink-500">Lost your phone? An Admin can turn two-factor off for you from Users.</p>
          <div className="flex gap-2">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password to confirm"
              className="w-60 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500" />
            <button className="rounded-lg border border-danger/40 px-3 text-[13px] font-semibold text-danger disabled:opacity-50" disabled={busy || !password}
              onClick={() => run<{ user: AdminUser }>("/api/admin/auth/2fa/disable", { password }, (d) => { onChange(d.user); setPassword(""); setOk("Two-factor sign-in is off."); })}>
              Turn off
            </button>
          </div>
        </div>
      )}
      {error && <div className="mt-3"><Notice tone="error">{error}</Notice></div>}
      {ok && <div className="mt-3"><Notice tone="ok">{ok}</Notice></div>}
    </section>
  );
}
