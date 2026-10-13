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
import {
  sectionSchema, sectionUpdateSchema, highlightSchema,
  courseSchema, courseUpdateSchema, faqSchema, faqUpdateSchema,
  newsSchema, newsUpdateSchema,
} from "../lib/validation";
import { invalidateInventory, recordUrlChange } from "../lib/seo";
import { revalidateWeb } from "../lib/revalidate";

/** Slugify a title into a URL-safe slug. */
function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 200);
}

export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Public base path where uploads are served (see index.ts express.static).
// Under /api so the existing nginx /api/ proxy reaches it with no extra config.
const PUBLIC_BASE = "/api/uploads";

/** Guard: require the shared admin token (Bearer or ?token=). */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
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

// ─────────────────────────────────────────────────────────────
// College detail content — sections (tabs), highlights, courses, FAQs
// ─────────────────────────────────────────────────────────────

async function requireCollege(id: number) {
  const college = await prisma.college.findUnique({ where: { id }, select: { id: true, name: true } });
  if (!college) throw new HttpError(404, "College not found");
  return college;
}

/** GET /api/admin/colleges/:id/content — all editable detail content for one college. */
adminRouter.get(
  "/colleges/:id/content",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const college = await prisma.college.findUnique({
      where: { id },
      select: {
        id: true, name: true, slug: true,
        sections: { orderBy: [{ tab: "asc" }, { sort: "asc" }] },
        highlights: { orderBy: { id: "asc" } },
        courses: { orderBy: { id: "asc" } },
        faqs: { orderBy: { sort: "asc" } },
      },
    });
    if (!college) throw new HttpError(404, "College not found");
    res.json(college);
  }),
);

// ── Sections ──
adminRouter.post(
  "/colleges/:id/sections",
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = sectionSchema.parse(req.body);
    const section = await prisma.contentSection.create({ data: { collegeId, ...data } });
    res.status(201).json(section);
  }),
);

adminRouter.put(
  "/sections/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = sectionUpdateSchema.parse(req.body);
    const section = await prisma.contentSection.update({ where: { id }, data }).catch(() => null);
    if (!section) throw new HttpError(404, "Section not found");
    res.json(section);
  }),
);

adminRouter.delete(
  "/sections/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    await prisma.contentSection.delete({ where: { id } }).catch(() => { throw new HttpError(404, "Section not found"); });
    res.json({ ok: true });
  }),
);

// ── Highlights ──
adminRouter.post(
  "/colleges/:id/highlights",
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const { text } = highlightSchema.parse(req.body);
    const highlight = await prisma.highlight.create({ data: { collegeId, text } });
    res.status(201).json(highlight);
  }),
);

adminRouter.put(
  "/highlights/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { text } = highlightSchema.parse(req.body);
    const highlight = await prisma.highlight.update({ where: { id }, data: { text } }).catch(() => null);
    if (!highlight) throw new HttpError(404, "Highlight not found");
    res.json(highlight);
  }),
);

adminRouter.delete(
  "/highlights/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    await prisma.highlight.delete({ where: { id } }).catch(() => { throw new HttpError(404, "Highlight not found"); });
    res.json({ ok: true });
  }),
);

// ── Courses ──
adminRouter.post(
  "/colleges/:id/courses",
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = courseSchema.parse(req.body);
    const course = await prisma.course.create({ data: { collegeId, ...data } });
    res.status(201).json(course);
  }),
);

adminRouter.put(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = courseUpdateSchema.parse(req.body);
    const course = await prisma.course.update({ where: { id }, data }).catch(() => null);
    if (!course) throw new HttpError(404, "Course not found");
    res.json(course);
  }),
);

adminRouter.delete(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    await prisma.course.delete({ where: { id } }).catch(() => { throw new HttpError(404, "Course not found"); });
    res.json({ ok: true });
  }),
);

// ── FAQs ──
adminRouter.post(
  "/colleges/:id/faqs",
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = faqSchema.parse(req.body);
    const faq = await prisma.faq.create({ data: { collegeId, ...data } });
    res.status(201).json(faq);
  }),
);

adminRouter.put(
  "/faqs/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = faqUpdateSchema.parse(req.body);
    const faq = await prisma.faq.update({ where: { id }, data }).catch(() => null);
    if (!faq) throw new HttpError(404, "FAQ not found");
    res.json(faq);
  }),
);

adminRouter.delete(
  "/faqs/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    await prisma.faq.delete({ where: { id } }).catch(() => { throw new HttpError(404, "FAQ not found"); });
    res.json({ ok: true });
  }),
);

// ─────────────────────────────────────────────────────────────
// News / blog articles
// ─────────────────────────────────────────────────────────────

/** GET /api/admin/news — all articles (newest first). */
adminRouter.get(
  "/news",
  asyncHandler(async (_req, res) => {
    const items = await prisma.newsArticle.findMany({ orderBy: { publishedAt: "desc" } });
    res.json({ items });
  }),
);

/** POST /api/admin/news/upload — upload an article image, returns { url } to save as imgUrl. */
adminRouter.post(
  "/news/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const f = req.file as Express.Multer.File | undefined;
    if (!f) throw new HttpError(400, "No image uploaded");
    res.status(201).json({ url: `${PUBLIC_BASE}/${f.filename}` });
  }),
);

/** POST /api/admin/news — create an article (slug auto-generated from title if omitted). */
adminRouter.post(
  "/news",
  asyncHandler(async (req, res) => {
    const data = newsSchema.parse(req.body);
    let slug = data.slug ? slugify(data.slug) : slugify(data.title);
    if (!slug) throw new HttpError(400, "Could not derive a slug from the title");
    // Ensure uniqueness by suffixing -2, -3, … if needed.
    const base = slug;
    for (let n = 2; await prisma.newsArticle.findUnique({ where: { slug }, select: { id: true } }); n++) {
      slug = `${base}-${n}`;
    }
    const article = await prisma.newsArticle.create({
      data: {
        slug,
        category: data.category,
        title: data.title,
        excerpt: data.excerpt,
        body: data.body ?? null,
        date: data.date,
        readTime: data.readTime,
        imgUrl: data.imgUrl || null,
      },
    });
    invalidateInventory();
    revalidateWeb({ paths: ["/news", `/news/${article.slug}`] });
    res.status(201).json(article);
  }),
);

/** PUT /api/admin/news/:id — update an article. */
adminRouter.put(
  "/news/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = newsUpdateSchema.parse(req.body);
    const patch: Record<string, unknown> = { ...data };
    if (data.slug !== undefined) {
      const slug = slugify(data.slug);
      if (!slug) throw new HttpError(400, "Invalid slug");
      const clash = await prisma.newsArticle.findFirst({ where: { slug, NOT: { id } }, select: { id: true } });
      if (clash) throw new HttpError(409, "Another article already uses that slug");
      patch.slug = slug;
    }
    if (data.imgUrl !== undefined) patch.imgUrl = data.imgUrl || null;
    if (data.body !== undefined) patch.body = data.body || null;
    const before = await prisma.newsArticle.findUnique({ where: { id }, select: { slug: true } });
    if (!before) throw new HttpError(404, "Article not found");
    const article = await prisma.$transaction(async (tx) => {
      const a = await tx.newsArticle.update({ where: { id }, data: patch });
      // Renamed → 301 the old URL so links and rankings carry over.
      if (a.slug !== before.slug) await recordUrlChange(tx, `/news/${before.slug}`, `/news/${a.slug}`, false);
      return a;
    });
    if (article.slug !== before.slug) invalidateInventory();
    revalidateWeb({ paths: ["/news", `/news/${article.slug}`, `/news/${before.slug}`] });
    res.json(article);
  }),
);

/** DELETE /api/admin/news/:id — delete an article. */
adminRouter.delete(
  "/news/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const article = await prisma.newsArticle.delete({ where: { id } }).catch(() => { throw new HttpError(404, "Article not found"); });
    invalidateInventory();
    revalidateWeb({ paths: ["/news", `/news/${article.slug}`] });
    res.json({ ok: true });
  }),
);
