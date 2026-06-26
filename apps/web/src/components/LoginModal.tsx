"use client";

import { useState } from "react";
import clsx from "clsx";
import { postJSON } from "@/lib/api";
import { useSite } from "./site-context";

export function LoginModal() {
  const { loginOpen, loginMode, setLoginMode, closeLogin } = useSite();
  const [form, setForm] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loginOpen) return null;
  const isLogin = loginMode === "login";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const path = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password || "password123", phone: form.phone };
      const res = await postJSON<{ token: string }>(path, body);
      try {
        localStorage.setItem("ca:token", res.token);
      } catch {
        /* ignore */
      }
      closeLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4" onClick={closeLogin}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center text-center">
          <span className="badge-grad h-12 w-12 bg-gradient-to-br from-brand-500 to-brand-700 text-xl">C</span>
          <h2 className="mt-3 text-xl">{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="mt-1 text-sm text-ink-500">
            {isLogin
              ? "Log in to track applications and saved colleges"
              : "Join 2M+ students finding their college"}
          </p>
        </div>

        <div className="mt-5 flex rounded-xl bg-line/50 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setLoginMode(m)}
              className={clsx(
                "flex-1 rounded-lg py-2 text-sm font-bold",
                loginMode === m ? "bg-white text-brand-700 shadow-sm" : "text-ink-400",
              )}
            >
              {m === "login" ? "Login" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          {!isLogin && (
            <input
              required
              placeholder="Full name"
              value={form.name || ""}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          )}
          <input
            required
            type="email"
            placeholder="you@example.com"
            value={form.email || ""}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password || ""}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? "Please wait…" : isLogin ? "Log in" : "Create account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-ink-400">
          <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
        </div>
        <button className="btn-ghost w-full" type="button">
          <span className="font-bold text-brand-600">G</span> Continue with Google
        </button>
      </div>
    </div>
  );
}
