"use client";

import { createContext, useContext } from "react";

export type Permission =
  | "users:manage" | "audit:view" | "settings:manage" | "seo:basic" | "seo:advanced" | "content:edit" | "content:publish";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "SEO_MANAGER" | "CONTENT_EDITOR";
  roleLabel: string;
  permissions: Permission[];
  mustChangePassword: boolean;
  totpEnabled: boolean;
}

export interface AdminSession {
  token: string;
  user: AdminUser;
  can: (p: Permission) => boolean;
  setUser: (u: AdminUser) => void;
}

export const SessionContext = createContext<AdminSession | null>(null);

/** The signed-in CMS user (inside the admin console). */
export function useSession(): AdminSession {
  const s = useContext(SessionContext);
  if (!s) throw new Error("useSession must be used inside the admin console");
  return s;
}

/** Permission check without the full session (e.g. shared components). */
export const useCan = () => useSession().can;
