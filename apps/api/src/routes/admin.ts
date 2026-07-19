/**
 * Admin routes — manage each college's real photo gallery (the 3–4 images
 * shown in a grid on the detail page). Protected by a single shared admin
 * token (env ADMIN_TOKEN), so no per-user admin accounts are needed.
 *
 * Uploaded files are stored on disk (UPLOAD_DIR, a persistent volume in prod)
 * and served statically at /uploads — self-contained, no third-party storage.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import type { NextFunction, Request, Response } from "express";

export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Public base path where uploads are served (see index.ts express.static).
// Under /api so the existing nginx /api/ proxy reaches it with no extra config.
const PUBLIC_BASE = "/api/uploads";

/** Guard: require the shared admin token (Bearer or ?token=). */
function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) throw new HttpError(503, "Admin uploads are not configured (ADMIN_TOKEN unset).");
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : (req.query.token as string | undefined);
  if (token !== expected) throw new HttpError(401, "Invalid admin token");
  next();
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = (path.extname(file.originalname) || ".jpg").toLowerCase().replace(/[^.a-z0-9]/g, "");
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 8 }, // ≤8MB each, ≤8 at once
  fileFilter: (_req, file, cb) => cb(null, /^image\/(jpe?g|png|webp|avif)$/i.test(file.mimetype)),
});

export const adminRouter = Router();
adminRouter.use(requireAdmin);

/** GET /api/admin/colleges?search= — find colleges to manage (with their gallery). */
adminRouter.get(
  "/colleges",
  asyncHandler(async (req, res) => {
    const search = String(req.query.search || "").trim();
    const items = await prisma.college.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : { OR: [{ featured: true }, { nirfRank: { not: null } }] },
      select: {
        id: true, name: true, slug: true, imgUrl: true, sampleDegreeUrl: true, mode: true,
        city: { select: { name: true, state: true } },
        stream: { select: { name: true } },
        gallery: { orderBy: { sort: "asc" }, select: { id: true, url: true, sort: true } },
      },
      orderBy: [{ nirfRank: "asc" }, { name: "asc" }],
      take: 40,
    });
    res.json({ items });
  }),
);

/**
 * POST /api/admin/colleges/:id/gallery — upload 1..N images (multipart field "images").
 * These photos power BOTH the rotating detail-page hero and the rotating grid/card
 * thumbnail (every 3s, see HeroBackground.tsx / CardImageRotator.tsx) — one upload,
 * used everywhere. The first-ever upload also becomes `imgUrl`, the plain single-image
 * fallback used for OG/meta tags and the compare page.
 */
adminRouter.post(
  "/colleges/:id/gallery",
  upload.array("images", 8),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    const college = await prisma.college.findUnique({ where: { id: collegeId }, select: { id: true, imgUrl: true } });
    if (!college) throw new HttpError(404, "College not found");
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) throw new HttpError(400, "No images uploaded");

    const maxSort = await prisma.galleryImage.aggregate({ where: { collegeId }, _max: { sort: true } });
    let sort = (maxSort._max.sort ?? -1) + 1;

    const urls: string[] = [];
    for (const f of files) {
      const url = `${PUBLIC_BASE}/${f.filename}`;
      urls.push(url);
      await prisma.galleryImage.create({ data: { collegeId, url, sort: sort++ } });
    }
    if (!college.imgUrl) {
      await prisma.college.update({ where: { id: collegeId }, data: { imgUrl: urls[0], source: "manual:upload" } });
    }
    const gallery = await prisma.galleryImage.findMany({ where: { collegeId }, orderBy: { sort: "asc" } });
    res.status(201).json({ gallery });
  }),
);

/** POST /api/admin/colleges/:id/sample-degree — upload the sample-degree photo (online colleges). */
adminRouter.post(
  "/colleges/:id/sample-degree",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    const college = await prisma.college.findUnique({ where: { id: collegeId }, select: { id: true } });
    if (!college) throw new HttpError(404, "College not found");
    const f = req.file as Express.Multer.File | undefined;
    if (!f) throw new HttpError(400, "No image uploaded");
    const url = `${PUBLIC_BASE}/${f.filename}`;
    await prisma.college.update({ where: { id: collegeId }, data: { sampleDegreeUrl: url } });
    res.status(201).json({ sampleDegreeUrl: url });
  }),
);

/** DELETE /api/admin/gallery/:id — remove one image (row + file). */
adminRouter.delete(
  "/gallery/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const img = await prisma.galleryImage.findUnique({ where: { id } });
    if (!img) throw new HttpError(404, "Image not found");
    await prisma.galleryImage.delete({ where: { id } });
    // Best-effort file cleanup for locally-stored uploads (either URL prefix).
    if (/\/uploads\//.test(img.url)) {
      const fp = path.join(UPLOAD_DIR, path.basename(img.url));
      fs.promises.unlink(fp).catch(() => {});
    }
    res.json({ ok: true });
  }),
);

/** PUT /api/admin/colleges/:id/gallery/order — reorder by image id list. */
adminRouter.put(
  "/colleges/:id/gallery/order",
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    const order: number[] = Array.isArray(req.body?.order) ? req.body.order.map(Number) : [];
    await prisma.$transaction(order.map((id, i) => prisma.galleryImage.update({ where: { id }, data: { sort: i } })));
    const gallery = await prisma.galleryImage.findMany({ where: { collegeId }, orderBy: { sort: "asc" } });
    res.json({ gallery });
  }),
);
