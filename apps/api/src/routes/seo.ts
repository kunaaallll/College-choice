/**
 * Public SEO routes read by the Next.js web app: per-page overrides, the redirect
 * map, robots/sitemap settings, plus tiny write endpoints for redirect hits and
 * 404 logging. Admin management lives in routes/adminSeo.ts.
 */
import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler } from "../middleware/error";
import { getSeoSettings, isReservedPath, normalizePath } from "../lib/seo";

export const seoRouter = Router();

/** GET /api/seo/page?path=/colleges/x — override fields for one page ({} when none). */
seoRouter.get(
  "/page",
  asyncHandler(async (req, res) => {
    const path = normalizePath(String(req.query.path || ""));
    const row = path ? await prisma.seoMeta.findUnique({ where: { path } }) : null;
    if (!row) return res.json({});
    const { id: _id, createdAt: _c, updatedAt: _u, urlLocked: _l, ...fields } = row;
    res.json(fields);
  }),
);

/** GET /api/seo/redirects — enabled redirects for the web middleware. */
seoRouter.get(
  "/redirects",
  asyncHandler(async (_req, res) => {
    const items = await prisma.redirect.findMany({
      where: { enabled: true },
      select: { fromPath: true, toPath: true, statusCode: true, isPrefix: true },
    });
    res.json({ items });
  }),
);

/** POST /api/seo/redirect-hit { fromPath } — count a redirect being followed. */
seoRouter.post(
  "/redirect-hit",
  asyncHandler(async (req, res) => {
    const fromPath = normalizePath(String(req.body?.fromPath || ""));
    if (fromPath) {
      await prisma.redirect.updateMany({ where: { fromPath }, data: { hits: { increment: 1 }, lastHitAt: new Date() } });
    }
    res.json({ ok: true });
  }),
);

// Keep the 404 log bounded — stop recording brand-new paths past this many rows.
const MAX_404_ROWS = 5000;

/** POST /api/seo/404 { path, referrer } — record a URL that served the 404 page. */
seoRouter.post(
  "/404",
  asyncHandler(async (req, res) => {
    const path = normalizePath(String(req.body?.path || ""));
    const referrer = typeof req.body?.referrer === "string" ? req.body.referrer.slice(0, 500) || null : null;
    if (!path || isReservedPath(path)) return res.json({ ok: true });

    const existing = await prisma.notFoundLog.findUnique({ where: { path }, select: { id: true } });
    if (existing) {
      await prisma.notFoundLog.update({
        where: { path },
        data: { hits: { increment: 1 }, lastSeen: new Date(), resolved: false, ...(referrer ? { referrer } : {}) },
      });
    } else if ((await prisma.notFoundLog.count()) < MAX_404_ROWS) {
      await prisma.notFoundLog.create({ data: { path, referrer } }).catch(() => {}); // ignore a concurrent duplicate
    }
    res.json({ ok: true });
  }),
);

/** GET /api/seo/settings — robots.txt, sitemap sections and paths excluded from the sitemap. */
seoRouter.get(
  "/settings",
  asyncHandler(async (_req, res) => {
    const [settings, excluded] = await Promise.all([
      getSeoSettings(),
      prisma.seoMeta.findMany({
        where: { OR: [{ noindex: true }, { excludeFromSitemap: true }, { canonical: { not: null } }] },
        select: { path: true, canonical: true, noindex: true, excludeFromSitemap: true },
      }),
    ]);
    // A page whose canonical points elsewhere isn't the indexable version — keep it out too.
    const excludedPaths = excluded
      .filter((r) => r.noindex || r.excludeFromSitemap || (r.canonical && normalizePath(r.canonical) !== r.path))
      .map((r) => r.path);
    res.json({ ...settings, excludedPaths });
  }),
);
