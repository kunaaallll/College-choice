"use client";

import { useEffect, useState } from "react";
import { adminRequest, publicJson } from "./adminApi";
import type { AdminUser } from "./session";

const inputCls = "mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500";

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="container-site flex min-h-[70vh] items-center justify-center py-10">
      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-ink-500">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

const Label = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <label className="mt-4 block text-[13px] font-semibold text-ink-700">{text}{children}</label>
);

/** Setup (first admin), sign-in and two-factor screens. */
export function SignIn({ onSignedIn }: { onSignedIn: (token: string, user: AdminUser) => void }) {
  const [setupRequired, setSetupRequired] = useState<boolean | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [setupToken, setSetupToken] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    publicJson<{ setupRequired: boolean }>("/api/admin/auth/status").then(({ ok, data }) =>
      ok ? setSetupRequired(data.setupRequired) : setError(data.error ?? "Can't reach the server."),
    );
  }, []);

  const submit = async (path: string, body: unknown) => {
    setBusy(true); setError(null);
    const { ok, data } = await publicJson<{ token?: string; user?: AdminUser; twoFactor?: boolean; challenge?: string }>(path, body);
    setBusy(false);
    if (!ok) { setError(data.error ?? "Sign-in failed"); return; }
    if (data.twoFactor && data.challenge) { setChallenge(data.challenge); return; }
    if (data.token && data.user) onSignedIn(data.token, data.user);
  };

  if (setupRequired === null && !error) return <Card title="College Choice — CMS" subtitle="Loading…">{null}</Card>;

  if (setupRequired) {
    return (
      <Card title="Set up the CMS" subtitle="Create the first Admin account. You'll add the rest of the team from Users afterwards.">
        <form onSubmit={(e) => { e.preventDefault(); submit("/api/admin/auth/setup", { setupToken, email, name, password }); }}>
          <Label text="Setup token">
            <input type="password" value={setupToken} onChange={(e) => setSetupToken(e.target.value)} className={inputCls} autoComplete="off" />
            <span className="mt-1 block text-[11px] font-normal text-ink-400">The ADMIN_TOKEN from the server&apos;s .env file (the old shared admin password).</span>
          </Label>
          <Label text="Your name"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" /></Label>
          <Label text="Email"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="username" /></Label>
          <Label text="Password"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="new-password" />
            <span className="mt-1 block text-[11px] font-normal text-ink-400">At least 10 characters.</span>
          </Label>
          <button type="submit" disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? "Creating…" : "Create admin account"}</button>
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </form>
      </Card>
    );
  }

  if (challenge) {
    return (
      <Card title="Two-factor sign-in" subtitle="Enter the 6-digit code from your authenticator app.">
        <form onSubmit={(e) => { e.preventDefault(); submit("/api/admin/auth/login/2fa", { challenge, code }); }}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            placeholder="123456"
            className={`${inputCls} text-center font-mono text-lg tracking-[0.4em]`}
          />
          <button type="submit" disabled={busy || code.length !== 6} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? "Checking…" : "Verify"}</button>
          <button type="button" onClick={() => { setChallenge(null); setCode(""); }} className="mt-2 w-full text-[13px] font-semibold text-ink-500 hover:underline">← Back</button>
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </form>
      </Card>
    );
  }

  return (
    <Card title="College Choice — CMS" subtitle="Sign in to manage content, SEO and the team.">
      <form onSubmit={(e) => { e.preventDefault(); submit("/api/admin/auth/login", { email, password }); }}>
        <Label text="Email"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="username" autoFocus /></Label>
        <Label text="Password"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="current-password" /></Label>
        <button type="submit" disabled={busy || !email || !password} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        <p className="mt-4 text-[12px] text-ink-400">Forgot your password? Ask an Admin to reset it from Users.</p>
      </form>
    </Card>
  );
}

/** Change-password form (forced after a new account or reset, and in My account). */
export function ChangePassword({ token, onDone, forced }: { token: string; onDone: (user: AdminUser) => void; forced?: boolean }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (next !== confirm) { setError("The new passwords don't match."); return; }
    setBusy(true); setError(null);
    const { ok, data } = await adminRequest<{ user: AdminUser }>("/api/admin/auth/password", token, { method: "POST", body: { currentPassword: current, newPassword: next } });
    setBusy(false);
    if (!ok) { setError(data.error ?? (data as { details?: { fieldErrors?: Record<string, string[]> } }).details?.fieldErrors?.newPassword?.[0] ?? "Couldn't change the password"); return; }
    setCurrent(""); setNext(""); setConfirm("");
    onDone(data.user);
  };

  const form = (
    <form onSubmit={(e) => { e.preventDefault(); save(); }}>
      <Label text={forced ? "Temporary password" : "Current password"}><input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} autoComplete="current-password" /></Label>
      <Label text="New password"><input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} autoComplete="new-password" />
        <span className="mt-1 block text-[11px] font-normal text-ink-400">At least 10 characters. Your other devices will be signed out.</span>
      </Label>
      <Label text="Confirm new password"><input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} autoComplete="new-password" /></Label>
      <button type="submit" disabled={busy || !current || next.length < 10} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? "Saving…" : "Change password"}</button>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </form>
  );
  return forced ? <Card title="Choose a new password" subtitle="Your account uses a temporary password. Set your own to continue.">{form}</Card> : form;
}
