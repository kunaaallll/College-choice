"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type LoginMode = "login" | "signup";

interface SiteState {
  // compare
  compare: string[]; // college slugs
  toggleCompare: (slug: string) => void;
  inCompare: (slug: string) => boolean;
  clearCompare: () => void;
  // apply modal
  applyOpen: boolean;
  applyCollege: { name: string; id?: number } | null;
  openApply: (name: string, id?: number) => void;
  closeApply: () => void;
  // login modal
  loginOpen: boolean;
  loginMode: LoginMode;
  openLogin: (mode?: LoginMode) => void;
  closeLogin: () => void;
  setLoginMode: (m: LoginMode) => void;
}

const SiteContext = createContext<SiteState | null>(null);

const STORAGE_KEY = "ca:compare";
const MAX_COMPARE = 4;

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [compare, setCompare] = useState<string[]>([]);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyCollege, setApplyCollege] = useState<{ name: string; id?: number } | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<LoginMode>("login");

  // Hydrate compare list from localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompare(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compare));
    } catch {
      /* ignore */
    }
  }, [compare]);

  const toggleCompare = useCallback((slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const inCompare = useCallback((slug: string) => compare.includes(slug), [compare]);
  const clearCompare = useCallback(() => setCompare([]), []);

  const openApply = useCallback((name: string, id?: number) => {
    setApplyCollege({ name, id });
    setApplyOpen(true);
  }, []);
  const closeApply = useCallback(() => setApplyOpen(false), []);

  const openLogin = useCallback((mode: LoginMode = "login") => {
    setLoginMode(mode);
    setLoginOpen(true);
  }, []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const value = useMemo<SiteState>(
    () => ({
      compare,
      toggleCompare,
      inCompare,
      clearCompare,
      applyOpen,
      applyCollege,
      openApply,
      closeApply,
      loginOpen,
      loginMode,
      openLogin,
      closeLogin,
      setLoginMode,
    }),
    [compare, toggleCompare, inCompare, clearCompare, applyOpen, applyCollege, openApply, closeApply, loginOpen, loginMode, openLogin, closeLogin],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within <SiteProvider>");
  return ctx;
}
