import bcrypt from "bcryptjs";
import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { loginSchema, registerSchema } from "../lib/validation";
import { AuthedRequest, requireAuth, signToken } from "../lib/auth";
import { createLead } from "../lib/leads";

export const authRouter = Router();

const publicUser = (u: { id: number; name: string | null; email: string | null; phone: string | null }) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  phone: u.phone,
});

/** POST /api/auth/register */
authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const data = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new HttpError(409, "An account with this email already exists");

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, phone: data.phone ?? null, passwordHash },
    });
    const token = signToken({ userId: user.id, email: user.email });
    // Every sign-up is a lead for the counselling team.
    const { pagePath, landingPage, referrer, utmSource, utmMedium, utmCampaign } = data;
    void createLead({
      fullName: data.name, email: data.email, mobile: data.phone ?? "", userId: user.id, source: "register",
      pagePath, landingPage, referrer, utmSource, utmMedium, utmCampaign,
    }).catch((e) => console.warn("[leads] sign-up lead not saved:", e instanceof Error ? e.message : e));
    res.status(201).json({ token, user: publicUser(user) });
  }),
);

/** POST /api/auth/login */
authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.passwordHash) throw new HttpError(401, "Invalid email or password");

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) throw new HttpError(401, "Invalid email or password");

    const token = signToken({ userId: user.id, email: user.email });
    res.json({ token, user: publicUser(user) });
  }),
);

/** GET /api/auth/me */
authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req: AuthedRequest, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.auth!.userId } });
    if (!user) throw new HttpError(404, "User not found");
    res.json({ user: publicUser(user) });
  }),
);
