/**
 * CMS sign-in: individual admin accounts with roles, opaque session tokens
 * (hashed at rest), permission checks and login throttling.
 */
import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type { AdminRole } from "@prisma/client";
import { prisma } from "../prisma";
import { HttpError } from "../middleware/error";

export type Permission =
  | "users:manage" // create/edit CMS users
  | "audit:view" // read the audit log
  | "settings:manage" // robots.txt, sitemap sections
  | "seo:basic" // SEO title/description/keyword/social on a page
  | "seo:advanced" // indexing, canonical, schema, URLs, redirects, bulk tools, imports
  | "content:edit" // create/edit colleges content and articles, upload media
  | "content:publish"; // approve, publish, schedule, unpublish, restore

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  ADMIN: ["users:manage", "audit:view", "settings:manage", "seo:basic", "seo:advanced", "content:edit", "content:publish"],
  SEO_MANAGER: ["audit:view", "settings:manage", "seo:basic", "seo:advanced", "content:edit", "content:publish"],
  CONTENT_EDITOR: ["seo:basic", "content:edit"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  ADMIN: "Admin",
  SEO_MANAGER: "SEO Manager",
  CONTENT_EDITOR: "Content Editor",
};

export interface AdminPrincipal {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  mustChangePassword: boolean;
  totpEnabled: boolean;
}

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminPrincipal;
  }
}

export const can = (admin: AdminPrincipal | undefined, perm: Permission) =>
  !!admin && ROLE_PERMISSIONS[admin.role].includes(perm);

export const publicAdmin = (u: AdminPrincipal & { lastLoginAt?: Date | null }) => ({
  id: u.id,
  email: u.email,
  name: u.name,
  role: u.role,
  roleLabel: ROLE_LABELS[u.role],
  permissions: ROLE_PERMISSIONS[u.role],
  mustChangePassword: u.mustChangePassword,
  totpEnabled: u.totpEnabled,
});

export const MIN_PASSWORD = 10;

// ── Sessions ──────────────────────────────────────────────────

const SESSION_DAYS = 7;
const hashToken = (t: string) => crypto.createHash("sha256").update(t).digest("hex");
export const clientIp = (req: Request) => (req.headers["x-real-ip"] as string) || req.ip || null;

export async function createSession(userId: number, req: Request): Promise<string> {
  const token = crypto.randomBytes(32).toString("base64url");
  await prisma.adminSession.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt: new Date(Date.now() + SESSION_DAYS * 86_400_000),
      ip: clientIp(req),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 300) || null,
    },
  });
  await prisma.adminUser.update({ where: { id: userId }, data: { lastLoginAt: new Date() } });
  return token;
}

export const bearer = (req: Request) => {
  const h = req.headers.authorization;
  return h?.startsWith("Bearer ") ? h.slice(7) : null;
};

export async function endSession(token: string) {
  await prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
}

/** Resolve the bearer token to an active user (or null). Sliding expiry. */
export async function sessionUser(token: string | null): Promise<AdminPrincipal | null> {
  if (!token) return null;
  const s = await prisma.adminSession.findUnique({ where: { tokenHash: hashToken(token) }, include: { user: true } });
  if (!s || s.expiresAt < new Date() || !s.user.active) return null;
  // Touch at most every 10 minutes to avoid a write per request.
  if (Date.now() - s.lastUsedAt.getTime() > 600_000) {
    await prisma.adminSession.update({
      where: { id: s.id },
      data: { lastUsedAt: new Date(), expiresAt: new Date(Date.now() + SESSION_DAYS * 86_400_000) },
    });
  }
  const { id, email, name, role, mustChangePassword, totpEnabled } = s.user;
  return { id, email, name, role, mustChangePassword, totpEnabled };
}

// Routes a user who must change their password may still use.
const PASSWORD_CHANGE_OK = /^\/api\/admin\/auth\/(me|logout|password)$/;

/** Guard: a signed-in, active CMS user. */
export async function requireAdminUser(req: Request, _res: Response, next: NextFunction) {
  try {
    const admin = await sessionUser(bearer(req));
    if (!admin) throw new HttpError(401, "Please sign in again.");
    if (admin.mustChangePassword && !PASSWORD_CHANGE_OK.test(req.baseUrl + req.path)) {
      throw new HttpError(403, "Change your password to continue.");
    }
    req.admin = admin;
    next();
  } catch (e) {
    next(e);
  }
}

/** Guard: the signed-in user's role grants `perm`. Use after requireAdminUser. */
export const requirePermission = (perm: Permission) => (req: Request, _res: Response, next: NextFunction) => {
  if (!can(req.admin, perm)) return next(new HttpError(403, "Your role doesn't allow this action."));
  next();
};

// ── Login throttling ──────────────────────────────────────────
// 5 failed attempts for an email (or 20 from one IP) → locked for 15 minutes.

const WINDOW = 15 * 60_000;
const failures = new Map<string, { count: number; first: number }>();

function bump(key: string) {
  const now = Date.now();
  const f = failures.get(key);
  if (!f || now - f.first > WINDOW) failures.set(key, { count: 1, first: now });
  else f.count++;
}
const tooMany = (key: string, limit: number) => {
  const f = failures.get(key);
  return !!f && Date.now() - f.first <= WINDOW && f.count >= limit;
};

export function assertNotLocked(email: string, ip: string | null) {
  if (tooMany(`e:${email}`, 5) || tooMany(`i:${ip}`, 20)) {
    throw new HttpError(429, "Too many failed sign-in attempts. Try again in 15 minutes.");
  }
}
export function recordFailure(email: string, ip: string | null) {
  bump(`e:${email}`);
  bump(`i:${ip}`);
}
export function clearFailures(email: string) {
  failures.delete(`e:${email}`);
}
