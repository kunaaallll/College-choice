"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useSite } from "./site-context";

const NAV = [
  { label: "Colleges", href: "/colleges" },
  { label: "Courses", href: "/courses" },
  { label: "Exams", href: "/exams" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { compare, openLogin } = useSite();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      {/* Announcement bar */}
      <div className="bg-ink-900 text-center text-[12.5px] text-white/90 py-1.5 px-4">
        Admissions open 2026 — explore 13,000+ verified colleges across India
      </div>

      <nav className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="College Choice home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10 12 5 2 10l10 5 10-5Z" />
              <path d="M6 12v4.5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5V12" />
              <path d="M22 10v5" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink-900">
            College<span className="text-brand-600">Choice</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                "rounded-xl px-3.5 py-2 text-[14.5px] font-semibold",
                isActive(n.href) ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-brand-50/60",
              )}
            >
              {n.label}
            </Link>
          ))}
          {/* Highlighted Online entry */}
          <Link
            href="/online"
            className={clsx(
              "ml-1 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[14.5px] font-bold",
              isActive("/online")
                ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white"
                : "bg-brand-600/10 text-brand-700 hover:bg-brand-600/15",
            )}
          >
            🌐 Online
            <span className="rounded-full bg-success px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              New
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/compare"
            className="relative hidden rounded-xl border border-line px-3.5 py-2 text-[14px] font-semibold text-ink-700 hover:border-brand-400 sm:inline-flex"
          >
            ⇄ Compare
            {compare.length > 0 && (
              <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white">
                {compare.length}
              </span>
            )}
          </Link>
          <button onClick={() => openLogin("login")} className="btn-primary px-4 py-2">
            Login
          </button>
          <button
            className="rounded-lg p-2 text-ink-700 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-site flex flex-col py-2">
            <Link
              href="/online"
              onClick={() => setOpen(false)}
              className="mb-1 inline-flex items-center gap-2 rounded-lg bg-brand-600/10 px-3 py-2.5 text-[15px] font-bold text-brand-700"
            >
              🌐 Online Degrees
              <span className="rounded-full bg-success px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">New</span>
            </Link>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-2.5 text-[15px] font-semibold",
                  isActive(n.href) ? "bg-brand-50 text-brand-700" : "text-ink-700",
                )}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/compare"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] font-semibold text-ink-700"
            >
              ⇄ Compare {compare.length > 0 && `(${compare.length})`}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
