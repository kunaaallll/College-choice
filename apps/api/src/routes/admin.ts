/**
 * Admin routes — college photos, college detail content and news, behind CMS
 * user sign-in with per-route role permissions (see lib/adminAuth.ts).
 * Content changes keep revisions (lib/revisions.ts) and refresh the live pages.
 *
 * Uploaded files are stored on disk (UPLOAD_DIR, a persistent volume in prod)
 * and served statically at /uploads — self-contained, no third-party storage.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { Prisma, type NewsArticle } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import {
  sectionSchema, sectionUpdateSchema, highlightSchema,
  courseSchema, courseUpdateSchema, faqSchema, faqUpdateSchema,
  newsSchema, newsUpdateSchema,
} from "../lib/validation";
import { invalidateInventory, recordUrlChange } from "../lib/seo";
import { revalidateWeb } from "../lib/revalidate";
import { can, requireAdminUser, requirePermission } from "../lib/adminAuth";
import { baseline, newsSnapshot, snapshot, withCollegeRevision } from "../lib/revisions";
import { displayStatus, liveNewsWhere, revalidateCollege } from "../lib/content";

/** Slugify a title into a URL-safe slug. */
function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 200);
}

export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Public base path where uploads are served (see index.ts express.static).
// Under /api so the existing nginx /api/ proxy reaches it with no extra config.
const PUBLIC_BASE = "/api/uploads";

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
adminRouter.use(requireAdminUser);

/** GET /api/admin/colleges?search= — find colleges to manage (with their gallery). */
adminRouter.get(
  "/colleges",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const search = String(req.query.search || "").trim();
    const items = await prisma.college.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : { OR: [{ featured: true }, { nirfRank: { not: null } }] },
      select: {
        id: true, name: true, slug: true, imgUrl: true, sampleDegreeUrl: true, mode: true, published: true, updatedAt: true,
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
  requirePermission("content:edit"),
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
    void revalidateCollege(collegeId);
    res.status(201).json({ gallery });
  }),
);

/** POST /api/admin/colleges/:id/sample-degree — upload the sample-degree photo (online colleges). */
adminRouter.post(
  "/colleges/:id/sample-degree",
  requirePermission("content:edit"),
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    const college = await prisma.college.findUnique({ where: { id: collegeId }, select: { id: true } });
    if (!college) throw new HttpError(404, "College not found");
    const f = req.file as Express.Multer.File | undefined;
    if (!f) throw new HttpError(400, "No image uploaded");
    const url = `${PUBLIC_BASE}/${f.filename}`;
    await prisma.college.update({ where: { id: collegeId }, data: { sampleDegreeUrl: url } });
    void revalidateCollege(collegeId);
    res.status(201).json({ sampleDegreeUrl: url });
  }),
);

/** DELETE /api/admin/gallery/:id — remove one image (row + file). */
adminRouter.delete(
  "/gallery/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const img = await prisma.galleryImage.findUnique({ where: { id } });
    if (!img) throw new HttpError(404, "Image not found");
    await prisma.galleryImage.delete({ where: { id } });
    void revalidateCollege(img.collegeId);
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
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    const order: number[] = Array.isArray(req.body?.order) ? req.body.order.map(Number) : [];
    await prisma.$transaction(order.map((id, i) => prisma.galleryImage.update({ where: { id }, data: { sort: i } })));
    const gallery = await prisma.galleryImage.findMany({ where: { collegeId }, orderBy: { sort: "asc" } });
    void revalidateCollege(collegeId);
    res.json({ gallery });
  }),
);

// ─────────────────────────────────────────────────────────────
// College detail content — sections (tabs), highlights, courses, FAQs
// Every change keeps a revision (history + restore) and refreshes the pages.
// ─────────────────────────────────────────────────────────────

async function requireCollege(id: number) {
  const college = await prisma.college.findUnique({ where: { id }, select: { id: true, name: true } });
  if (!college) throw new HttpError(404, "College not found");
  return college;
}

/** The college that owns a section/highlight/course/FAQ row. */
async function ownerOf(kind: "section" | "highlight" | "course" | "faq", id: number): Promise<number> {
  const where = { where: { id }, select: { collegeId: true } };
  const row =
    kind === "section" ? await prisma.contentSection.findUnique(where)
    : kind === "highlight" ? await prisma.highlight.findUnique(where)
    : kind === "course" ? await prisma.course.findUnique(where)
    : await prisma.faq.findUnique(where);
  if (!row) throw new HttpError(404, `${kind[0].toUpperCase()}${kind.slice(1)} not found`);
  return row.collegeId;
}

/** GET /api/admin/colleges/:id/content — all editable detail content for one college. */
adminRouter.get(
  "/colleges/:id/content",
  requirePermission("content:edit"),
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

/** POST /api/admin/colleges/:id/publish { published } — show or hide a college on the site. */
adminRouter.post(
  "/colleges/:id/publish",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { published } = z.object({ published: z.boolean() }).parse(req.body);
    await requireCollege(id);
    await withCollegeRevision(id, published ? "Published" : "Unpublished", req, () => prisma.college.update({ where: { id }, data: { published } }));
    invalidateInventory();
    void revalidateCollege(id);
    revalidateWeb({ paths: ["/colleges", "/"], tags: ["seo-settings"] });
    res.json({ id, published });
  }),
);

// ── Sections ──
adminRouter.post(
  "/colleges/:id/sections",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = sectionSchema.parse(req.body);
    const section = await withCollegeRevision(collegeId, `Added section “${data.heading}”`, req, () => prisma.contentSection.create({ data: { collegeId, ...data } }));
    void revalidateCollege(collegeId);
    res.status(201).json(section);
  }),
);

adminRouter.put(
  "/sections/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = sectionUpdateSchema.parse(req.body);
    const collegeId = await ownerOf("section", id);
    const section = await withCollegeRevision(collegeId, `Edited section${data.heading ? ` “${data.heading}”` : ""}`, req, () => prisma.contentSection.update({ where: { id }, data }));
    void revalidateCollege(collegeId);
    res.json(section);
  }),
);

adminRouter.delete(
  "/sections/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const collegeId = await ownerOf("section", id);
    await withCollegeRevision(collegeId, "Deleted a section", req, () => prisma.contentSection.delete({ where: { id } }));
    void revalidateCollege(collegeId);
    res.json({ ok: true });
  }),
);

// ── Highlights ──
adminRouter.post(
  "/colleges/:id/highlights",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const { text } = highlightSchema.parse(req.body);
    const highlight = await withCollegeRevision(collegeId, "Added a highlight", req, () => prisma.highlight.create({ data: { collegeId, text } }));
    void revalidateCollege(collegeId);
    res.status(201).json(highlight);
  }),
);

adminRouter.put(
  "/highlights/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { text } = highlightSchema.parse(req.body);
    const collegeId = await ownerOf("highlight", id);
    const highlight = await withCollegeRevision(collegeId, "Edited a highlight", req, () => prisma.highlight.update({ where: { id }, data: { text } }));
    void revalidateCollege(collegeId);
    res.json(highlight);
  }),
);

adminRouter.delete(
  "/highlights/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const collegeId = await ownerOf("highlight", id);
    await withCollegeRevision(collegeId, "Deleted a highlight", req, () => prisma.highlight.delete({ where: { id } }));
    void revalidateCollege(collegeId);
    res.json({ ok: true });
  }),
);

// ── Courses ──
adminRouter.post(
  "/colleges/:id/courses",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = courseSchema.parse(req.body);
    const course = await withCollegeRevision(collegeId, `Added course “${data.name}”`, req, () => prisma.course.create({ data: { collegeId, ...data } }));
    void revalidateCollege(collegeId);
    res.status(201).json(course);
  }),
);

adminRouter.put(
  "/courses/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = courseUpdateSchema.parse(req.body);
    const collegeId = await ownerOf("course", id);
    const course = await withCollegeRevision(collegeId, `Edited course${data.name ? ` “${data.name}”` : ""}`, req, () => prisma.course.update({ where: { id }, data }));
    void revalidateCollege(collegeId);
    res.json(course);
  }),
);

adminRouter.delete(
  "/courses/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const collegeId = await ownerOf("course", id);
    await withCollegeRevision(collegeId, "Deleted a course", req, () => prisma.course.delete({ where: { id } }));
    void revalidateCollege(collegeId);
    res.json({ ok: true });
  }),
);

// ── FAQs ──
adminRouter.post(
  "/colleges/:id/faqs",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const collegeId = Number(req.params.id);
    await requireCollege(collegeId);
    const data = faqSchema.parse(req.body);
    const faq = await withCollegeRevision(collegeId, "Added an FAQ", req, () => prisma.faq.create({ data: { collegeId, ...data } }));
    void revalidateCollege(collegeId);
    res.status(201).json(faq);
  }),
);

adminRouter.put(
  "/faqs/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = faqUpdateSchema.parse(req.body);
    const collegeId = await ownerOf("faq", id);
    const faq = await withCollegeRevision(collegeId, "Edited an FAQ", req, () => prisma.faq.update({ where: { id }, data }));
    void revalidateCollege(collegeId);
    res.json(faq);
  }),
);

adminRouter.delete(
  "/faqs/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const collegeId = await ownerOf("faq", id);
    await withCollegeRevision(collegeId, "Deleted an FAQ", req, () => prisma.faq.delete({ where: { id } }));
    void revalidateCollege(collegeId);
    res.json({ ok: true });
  }),
);

// ─────────────────────────────────────────────────────────────
// News / blog articles — editorial workflow
//
//   Content Editor: creates drafts, edits them, submits for review. Edits to a
//   live article are held as "pending changes" until approved.
//   SEO Manager / Admin: edits directly, approves & publishes now or on a
//   schedule (with optional expiry), requests changes, unpublishes.
// ─────────────────────────────────────────────────────────────

type NewsPatch = z.infer<typeof newsUpdateSchema>;

/** Refresh everywhere an article shows up. */
function revalidateNews(...slugs: string[]) {
  invalidateInventory();
  revalidateWeb({ paths: ["/news", "/", ...slugs.map((s) => `/news/${s}`)], tags: ["seo-settings"] });
}

/** Validate a requested slug change; returns the normalised slug (or undefined if unchanged). */
async function checkSlug(id: number, current: string, requested: string | undefined) {
  if (requested === undefined) return undefined;
  const slug = slugify(requested);
  if (!slug) throw new HttpError(400, "Invalid slug");
  if (slug === current) return undefined;
  const clash = await prisma.newsArticle.findFirst({ where: { slug, NOT: { id } }, select: { id: true } });
  if (clash) throw new HttpError(409, "Another article already uses that slug");
  return slug;
}

/** Apply field edits to an article (in a transaction); a live URL change gets a 301. */
async function applyNewsPatch(tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0], article: NewsArticle, data: NewsPatch, extra: Prisma.NewsArticleUpdateInput, adminId: number) {
  const slug = await checkSlug(article.id, article.slug, data.slug);
  const patch: Prisma.NewsArticleUpdateInput = { ...extra, updatedById: adminId };
  for (const k of ["category", "title", "excerpt", "date", "readTime"] as const) if (data[k] !== undefined) patch[k] = data[k];
  if (data.body !== undefined) patch.body = data.body || null;
  if (data.imgUrl !== undefined) patch.imgUrl = data.imgUrl || null;
  if (slug) patch.slug = slug;
  const updated = await tx.newsArticle.update({ where: { id: article.id }, data: patch });
  // Only a URL that has been public needs a redirect.
  if (slug && (article.status === "PUBLISHED" || article.status === "UNPUBLISHED")) {
    await recordUrlChange(tx, `/news/${article.slug}`, `/news/${slug}`, false);
  }
  return updated;
}

async function requireArticle(id: number) {
  const a = await prisma.newsArticle.findUnique({ where: { id } });
  if (!a) throw new HttpError(404, "Article not found");
  return a;
}

/** Article as the admin sees it: workflow status and who wrote/edited it. */
async function withPeople<T extends NewsArticle>(items: T[]) {
  const ids = [...new Set(items.flatMap((a) => [a.authorId, a.updatedById]).filter((x): x is number => !!x))];
  const users = ids.length ? await prisma.adminUser.findMany({ where: { id: { in: ids } }, select: { id: true, name: true } }) : [];
  const name = (id: number | null) => users.find((u) => u.id === id)?.name ?? null;
  return items.map((a) => ({
    ...a,
    displayStatus: displayStatus(a),
    hasPendingChanges: !!a.pendingData,
    authorName: name(a.authorId),
    updatedByName: name(a.updatedById),
  }));
}

const schedule = z
  .object({ publishAt: z.coerce.date().nullish(), unpublishAt: z.coerce.date().nullish() })
  .refine((s) => !s.unpublishAt || s.unpublishAt > (s.publishAt ?? new Date()), { message: "The expiry time must be after the publish time." });

/** GET /api/admin/news — all articles (newest first) with workflow status. */
adminRouter.get(
  "/news",
  requirePermission("content:edit"),
  asyncHandler(async (_req, res) => {
    const items = await prisma.newsArticle.findMany({ orderBy: [{ updatedAt: "desc" }] });
    const live = new Set((await prisma.newsArticle.findMany({ where: liveNewsWhere(), select: { id: true } })).map((a) => a.id));
    res.json({ items: (await withPeople(items)).map((a) => ({ ...a, isLive: live.has(a.id) })) });
  }),
);

/** GET /api/admin/news/:id — one article incl. drafts and pending changes (for editing and preview). */
adminRouter.get(
  "/news/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const [a] = await withPeople([await requireArticle(Number(req.params.id))]);
    res.json(a);
  }),
);

/** POST /api/admin/news/upload — upload an article image, returns { url } to save as imgUrl. */
adminRouter.post(
  "/news/upload",
  requirePermission("content:edit"),
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const f = req.file as Express.Multer.File | undefined;
    if (!f) throw new HttpError(400, "No image uploaded");
    res.status(201).json({ url: `${PUBLIC_BASE}/${f.filename}` });
  }),
);

/** POST /api/admin/news — create a draft (slug auto-generated from the title if omitted). */
adminRouter.post(
  "/news",
  requirePermission("content:edit"),
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
        status: "DRAFT",
        authorId: req.admin!.id,
        updatedById: req.admin!.id,
      },
    });
    await snapshot("news", article.id, newsSnapshot(article), "Created draft", req);
    res.status(201).json((await withPeople([article]))[0]);
  }),
);

/**
 * PUT /api/admin/news/:id — edit an article. Editors' changes to a live (or
 * scheduled) article are stored as pending changes for a reviewer to approve.
 */
adminRouter.put(
  "/news/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    const data = newsUpdateSchema.parse(req.body);

    if (article.status === "PUBLISHED" && !can(req.admin, "content:publish")) {
      await checkSlug(article.id, article.slug, data.slug); // fail early on a clashing slug
      const pendingData = { ...((article.pendingData as object | null) ?? {}), ...data };
      const updated = await prisma.newsArticle.update({ where: { id: article.id }, data: { pendingData, updatedById: req.admin!.id, reviewNote: null } });
      return res.json({ ...(await withPeople([updated]))[0], pending: true });
    }

    await baseline("news", article.id, async () => newsSnapshot(article));
    // The edit form shows pending changes merged in, so a reviewer's save includes (and settles) them.
    const settle: Prisma.NewsArticleUpdateInput = article.pendingData ? { pendingData: Prisma.DbNull, reviewNote: null } : {};
    const updated = await prisma.$transaction((tx) => applyNewsPatch(tx, article, data, settle, req.admin!.id));
    await snapshot("news", article.id, newsSnapshot(updated), "Edited", req);
    if (article.status === "PUBLISHED") revalidateNews(updated.slug, article.slug);
    res.json((await withPeople([updated]))[0]);
  }),
);

/** POST /api/admin/news/:id/submit — send a draft to review. */
adminRouter.post(
  "/news/:id/submit",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    if (article.status === "PUBLISHED") {
      if (!article.pendingData) throw new HttpError(400, "This article is live and has no pending changes to review.");
      const updated = await prisma.newsArticle.update({ where: { id: article.id }, data: { reviewNote: null } });
      return res.json((await withPeople([updated]))[0]);
    }
    const updated = await prisma.newsArticle.update({ where: { id: article.id }, data: { status: "IN_REVIEW", reviewNote: null, updatedById: req.admin!.id } });
    res.json((await withPeople([updated]))[0]);
  }),
);

/**
 * POST /api/admin/news/:id/publish { publishAt?, unpublishAt? } — approve and
 * publish now, or schedule. Applies any pending changes first.
 */
adminRouter.post(
  "/news/:id/publish",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    const { publishAt, unpublishAt } = schedule.parse(req.body ?? {});
    const firstPublish = article.status === "DRAFT" || article.status === "IN_REVIEW";
    await baseline("news", article.id, async () => newsSnapshot(article));
    const updated = await prisma.$transaction((tx) =>
      applyNewsPatch(tx, article, (article.pendingData as NewsPatch | null) ?? {}, {
        status: "PUBLISHED",
        publishAt: publishAt ?? null,
        unpublishAt: unpublishAt ?? null,
        pendingData: Prisma.DbNull,
        reviewNote: null,
        // The feed date is when it first goes live.
        ...(firstPublish ? { publishedAt: publishAt ?? new Date() } : {}),
      }, req.admin!.id),
    );
    const label = publishAt && publishAt > new Date() ? `Scheduled for ${publishAt.toISOString()}` : "Published";
    await snapshot("news", article.id, newsSnapshot(updated), label, req);
    revalidateNews(updated.slug, article.slug);
    res.json((await withPeople([updated]))[0]);
  }),
);

/** POST /api/admin/news/:id/request-changes { note } — send back to the author with feedback. */
adminRouter.post(
  "/news/:id/request-changes",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    const { note } = z.object({ note: z.string().trim().min(1, "Add a note for the author.").max(2000) }).parse(req.body);
    const updated = await prisma.newsArticle.update({
      where: { id: article.id },
      data: { reviewNote: note, ...(article.status === "IN_REVIEW" ? { status: "DRAFT" } : {}) },
    });
    res.json((await withPeople([updated]))[0]);
  }),
);

/** POST /api/admin/news/:id/discard-pending — drop pending edits to a live article. */
adminRouter.post(
  "/news/:id/discard-pending",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    const updated = await prisma.newsArticle.update({ where: { id: article.id }, data: { pendingData: Prisma.DbNull, reviewNote: null } });
    res.json((await withPeople([updated]))[0]);
  }),
);

/** POST /api/admin/news/:id/unpublish — take an article off the site (it can be republished). */
adminRouter.post(
  "/news/:id/unpublish",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    await baseline("news", article.id, async () => newsSnapshot(article));
    const updated = await prisma.newsArticle.update({ where: { id: article.id }, data: { status: "UNPUBLISHED", updatedById: req.admin!.id } });
    await snapshot("news", article.id, newsSnapshot(updated), "Unpublished", req);
    revalidateNews(article.slug);
    res.json((await withPeople([updated]))[0]);
  }),
);

/** DELETE /api/admin/news/:id — editors may delete drafts that were never published. */
adminRouter.delete(
  "/news/:id",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const article = await requireArticle(Number(req.params.id));
    const neverLive = article.status === "DRAFT" || article.status === "IN_REVIEW";
    if (!neverLive && !can(req.admin, "content:publish")) throw new HttpError(403, "Only an SEO Manager or Admin can delete a published article.");
    await prisma.newsArticle.delete({ where: { id: article.id } });
    if (!neverLive) revalidateNews(article.slug);
    res.json({ ok: true });
  }),
);
