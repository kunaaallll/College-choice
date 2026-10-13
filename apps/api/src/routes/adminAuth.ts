/**
 * CMS accounts:
 *   /api/admin/auth  — first-run setup, sign-in (+ two-factor), my account
 *   /api/admin/users — user management (Admin role)
 */
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import {
  assertNotLocked, bearer, clearFailures, clientIp, createSession, endSession, MIN_PASSWORD, publicAdmin,
  recordFailure, requireAdminUser, requirePermission,
} from "../lib/adminAuth";
import { audit } from "../lib/audit";
import { generateSecret, otpauthUrl, verifyTotp } from "../lib/totp";

const JWT_SECRET = process.env.JWT_SECRET || "dev_insecure_secret_change_me";
const email = z.string().trim().toLowerCase().email().max(200);
const password = z.string().min(MIN_PASSWORD, `Use at least ${MIN_PASSWORD} characters.`).max(200);
const role = z.enum(["ADMIN", "SEO_MANAGER", "CONTENT_EDITOR"]);

// Constant-time-ish comparison for the setup token.
const sameSecret = (a: string, b: string) => {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
};

export const adminAuthRouter = Router();

/** GET /api/admin/auth/status — does the CMS still need its first admin account? */
adminAuthRouter.get(
  "/status",
  asyncHandler(async (_req, res) => {
    res.json({ setupRequired: (await prisma.adminUser.count()) === 0 });
  }),
);

/**
 * POST /api/admin/auth/setup { setupToken, email, name, password } — create the
 * first Admin. Only works while no users exist; the setup token is the server's
 * ADMIN_TOKEN, which proves the person controls the deployment.
 */
adminAuthRouter.post(
  "/setup",
  asyncHandler(async (req, res) => {
    const body = z.object({ setupToken: z.string().min(1), email, name: z.string().trim().min(1).max(120), password }).parse(req.body);
    const expected = process.env.ADMIN_TOKEN;
    if (!expected) throw new HttpError(503, "ADMIN_TOKEN is not configured on the server.");
    if ((await prisma.adminUser.count()) > 0) throw new HttpError(409, "Setup is already complete — sign in instead.");
    assertNotLocked("setup", clientIp(req));
    if (!sameSecret(body.setupToken, expected)) {
      recordFailure("setup", clientIp(req));
      throw new HttpError(401, "Setup token is incorrect.");
    }
    const user = await prisma.adminUser.create({
      data: { email: body.email, name: body.name, passwordHash: await bcrypt.hash(body.password, 12), role: "ADMIN" },
    });
    const token = await createSession(user.id, req);
    await audit(req, { action: "auth.setup", summary: `Created the first admin account (${user.email})`, entityType: "user", entityId: user.id }, user);
    res.status(201).json({ token, user: publicAdmin(user) });
  }),
);

/** POST /api/admin/auth/login { email, password } → { token, user } or { twoFactor: true, challenge } */
adminAuthRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const body = z.object({ email, password: z.string().min(1).max(200) }).parse(req.body);
    const ip = clientIp(req);
    assertNotLocked(body.email, ip);
    const user = await prisma.adminUser.findUnique({ where: { email: body.email } });
    const ok = !!user && (await bcrypt.compare(body.password, user.passwordHash));
    if (!ok || !user.active) {
      recordFailure(body.email, ip);
      await audit(req, { action: "auth.login_failed", summary: `Failed sign-in for ${body.email}${user && !user.active ? " (deactivated account)" : ""}` }, user ? { id: user.id, email: user.email } : null);
      throw new HttpError(401, "Email or password is incorrect.");
    }
    if (user.totpEnabled && user.totpSecret) {
      const challenge = jwt.sign({ uid: user.id, purpose: "2fa" }, JWT_SECRET, { expiresIn: "5m" });
      return res.json({ twoFactor: true, challenge });
    }
    clearFailures(body.email);
    const token = await createSession(user.id, req);
    await audit(req, { action: "auth.login", summary: `Signed in` }, user);
    res.json({ token, user: publicAdmin(user) });
  }),
);

/** POST /api/admin/auth/login/2fa { challenge, code } → { token, user } */
adminAuthRouter.post(
  "/login/2fa",
  asyncHandler(async (req, res) => {
    const body = z.object({ challenge: z.string().min(1), code: z.string().trim().min(6).max(8) }).parse(req.body);
    let uid: number;
    try {
      const p = jwt.verify(body.challenge, JWT_SECRET) as { uid: number; purpose: string };
      if (p.purpose !== "2fa") throw new Error();
      uid = p.uid;
    } catch {
      throw new HttpError(401, "This sign-in attempt expired. Enter your password again.");
    }
    const user = await prisma.adminUser.findUnique({ where: { id: uid } });
    if (!user?.active || !user.totpSecret) throw new HttpError(401, "Please sign in again.");
    assertNotLocked(user.email, clientIp(req));
    if (!verifyTotp(user.totpSecret, body.code)) {
      recordFailure(user.email, clientIp(req));
      await audit(req, { action: "auth.login_failed", summary: "Wrong two-factor code" }, user);
      throw new HttpError(401, "That code isn't right. Check your authenticator app and try again.");
    }
    clearFailures(user.email);
    const token = await createSession(user.id, req);
    await audit(req, { action: "auth.login", summary: "Signed in (two-factor)" }, user);
    res.json({ token, user: publicAdmin(user) });
  }),
);

// Everything below needs a session.
adminAuthRouter.use(requireAdminUser);

/** GET /api/admin/auth/me */
adminAuthRouter.get("/me", (req, res) => { res.json({ user: publicAdmin(req.admin!) }); });

/** POST /api/admin/auth/logout */
adminAuthRouter.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const t = bearer(req);
    if (t) await endSession(t);
    await audit(req, { action: "auth.logout", summary: "Signed out" });
    res.json({ ok: true });
  }),
);

/** POST /api/admin/auth/password { currentPassword, newPassword } — also signs out other devices. */
adminAuthRouter.post(
  "/password",
  asyncHandler(async (req, res) => {
    const body = z.object({ currentPassword: z.string().min(1), newPassword: password }).parse(req.body);
    const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: req.admin!.id } });
    if (!(await bcrypt.compare(body.currentPassword, user.passwordHash))) throw new HttpError(400, "Current password is incorrect.");
    if (body.currentPassword === body.newPassword) throw new HttpError(400, "Choose a new password that's different from the current one.");
    await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(body.newPassword, 12), mustChangePassword: false } });
    const t = bearer(req);
    await prisma.adminSession.deleteMany({ where: { userId: user.id, NOT: { tokenHash: crypto.createHash("sha256").update(t ?? "").digest("hex") } } });
    const fresh = await prisma.adminUser.findUniqueOrThrow({ where: { id: user.id } });
    res.json({ user: publicAdmin(fresh) });
  }),
);

/** POST /api/admin/auth/2fa/setup — new secret + QR code (not active until confirmed). */
adminAuthRouter.post(
  "/2fa/setup",
  asyncHandler(async (req, res) => {
    if (req.admin!.totpEnabled) throw new HttpError(409, "Two-factor sign-in is already on.");
    const secret = generateSecret();
    await prisma.adminUser.update({ where: { id: req.admin!.id }, data: { totpSecret: secret } });
    const url = otpauthUrl(secret, req.admin!.email);
    res.json({ secret, otpauthUrl: url, qr: await QRCode.toDataURL(url, { margin: 1, width: 220 }) });
  }),
);

/** POST /api/admin/auth/2fa/enable { code } — confirm the app is set up. */
adminAuthRouter.post(
  "/2fa/enable",
  asyncHandler(async (req, res) => {
    const { code } = z.object({ code: z.string().trim() }).parse(req.body);
    const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: req.admin!.id } });
    if (!user.totpSecret) throw new HttpError(400, "Start two-factor setup first.");
    if (!verifyTotp(user.totpSecret, code)) throw new HttpError(400, "That code isn't right. Make sure your phone's time is correct and try again.");
    const updated = await prisma.adminUser.update({ where: { id: user.id }, data: { totpEnabled: true } });
    res.json({ user: publicAdmin(updated) });
  }),
);

/** POST /api/admin/auth/2fa/disable { password } */
adminAuthRouter.post(
  "/2fa/disable",
  asyncHandler(async (req, res) => {
    const { password: pw } = z.object({ password: z.string().min(1) }).parse(req.body);
    const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: req.admin!.id } });
    if (!(await bcrypt.compare(pw, user.passwordHash))) throw new HttpError(400, "Password is incorrect.");
    const updated = await prisma.adminUser.update({ where: { id: user.id }, data: { totpEnabled: false, totpSecret: null } });
    res.json({ user: publicAdmin(updated) });
  }),
);

// ─────────────────────────────────────────────────────────────
// User management (Admin role)
// ─────────────────────────────────────────────────────────────

export const adminUsersRouter = Router();
adminUsersRouter.use(requireAdminUser, requirePermission("users:manage"));

const listUser = (u: { id: number; email: string; name: string; role: "ADMIN" | "SEO_MANAGER" | "CONTENT_EDITOR"; active: boolean; totpEnabled: boolean; mustChangePassword: boolean; lastLoginAt: Date | null; createdAt: Date }) => ({
  id: u.id, email: u.email, name: u.name, role: u.role, active: u.active, totpEnabled: u.totpEnabled,
  mustChangePassword: u.mustChangePassword, lastLoginAt: u.lastLoginAt, createdAt: u.createdAt,
});

/** Refuse changes that would leave no active Admin. */
async function assertAdminRemains(changingId: number, next: { role?: string; active?: boolean }) {
  const target = await prisma.adminUser.findUnique({ where: { id: changingId } });
  if (!target || target.role !== "ADMIN" || !target.active) return;
  const losesAdmin = (next.role && next.role !== "ADMIN") || next.active === false;
  if (!losesAdmin) return;
  const others = await prisma.adminUser.count({ where: { role: "ADMIN", active: true, NOT: { id: changingId } } });
  if (!others) throw new HttpError(400, "There must always be at least one active Admin.");
}

/** GET /api/admin/users */
adminUsersRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const users = await prisma.adminUser.findMany({ orderBy: [{ active: "desc" }, { name: "asc" }] });
    res.json({ items: users.map(listUser) });
  }),
);

/** POST /api/admin/users { email, name, role, password } — the user must change the password at first sign-in. */
adminUsersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = z.object({ email, name: z.string().trim().min(1).max(120), role, password }).parse(req.body);
    if (await prisma.adminUser.findUnique({ where: { email: body.email } })) throw new HttpError(409, "A user with that email already exists.");
    const user = await prisma.adminUser.create({
      data: { email: body.email, name: body.name, role: body.role, passwordHash: await bcrypt.hash(body.password, 12), mustChangePassword: true },
    });
    res.status(201).json({ user: listUser(user) });
  }),
);

/** PUT /api/admin/users/:id { name?, role?, active? } — deactivating signs the user out everywhere. */
adminUsersRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const body = z.object({ name: z.string().trim().min(1).max(120).optional(), role: role.optional(), active: z.boolean().optional() }).parse(req.body);
    await assertAdminRemains(id, body);
    const user = await prisma.adminUser.update({ where: { id }, data: body }).catch(() => null);
    if (!user) throw new HttpError(404, "User not found");
    if (body.active === false) await prisma.adminSession.deleteMany({ where: { userId: id } });
    res.json({ user: listUser(user) });
  }),
);

/** POST /api/admin/users/:id/reset-password { password } — temporary password; signs the user out. */
adminUsersRouter.post(
  "/:id/reset-password",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { password: pw } = z.object({ password }).parse(req.body);
    const user = await prisma.adminUser.update({ where: { id }, data: { passwordHash: await bcrypt.hash(pw, 12), mustChangePassword: true } }).catch(() => null);
    if (!user) throw new HttpError(404, "User not found");
    await prisma.adminSession.deleteMany({ where: { userId: id } });
    res.json({ user: listUser(user) });
  }),
);

/** POST /api/admin/users/:id/reset-2fa — for a user who lost their phone. */
adminUsersRouter.post(
  "/:id/reset-2fa",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const user = await prisma.adminUser.update({ where: { id }, data: { totpEnabled: false, totpSecret: null } }).catch(() => null);
    if (!user) throw new HttpError(404, "User not found");
    res.json({ user: listUser(user) });
  }),
);
