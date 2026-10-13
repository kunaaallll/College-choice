/**
 * Revision history & restore (/api/admin/revisions) and the audit log
 * (/api/admin/audit). Both sit behind CMS sign-in.
 */
import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { can, requirePermission, type Permission } from "../lib/adminAuth";
import { baseline, collegeSnapshot, newsSnapshot, snapshot, type CollegeSnapshot } from "../lib/revisions";
import { invalidateInventory } from "../lib/seo";
import { revalidateCollege } from "../lib/content";
import { revalidateWeb } from "../lib/revalidate";
import { pickFields, writeSeo, type SeoFields } from "./adminSeo";

export const revisionsRouter = Router();

const ENTITY = z.enum(["news", "college", "seo"]);

/** Who may view/restore each kind of history. */
async function restorePermission(entityType: string, entityId: string): Promise<Permission> {
  if (entityType === "seo") return "seo:advanced";
  if (entityType === "news") {
    const a = await prisma.newsArticle.findUnique({ where: { id: Number(entityId) }, select: { status: true } });
    return a?.status === "PUBLISHED" ? "content:publish" : "content:edit";
  }
  return "content:edit";
}
const viewPermission = (entityType: string): Permission => (entityType === "seo" ? "seo:basic" : "content:edit");

/** GET /api/admin/revisions?entityType=&entityId= — newest first (without the data). */
revisionsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = z.object({ entityType: ENTITY, entityId: z.string().min(1) }).parse(req.query);
    if (!can(req.admin, viewPermission(q.entityType))) throw new HttpError(403, "Your role doesn't allow this action.");
    const items = await prisma.revision.findMany({
      where: q, orderBy: { createdAt: "desc" },
      select: { id: true, summary: true, userEmail: true, createdAt: true },
    });
    res.json({ items, canRestore: can(req.admin, await restorePermission(q.entityType, q.entityId)) });
  }),
);

/** GET /api/admin/revisions/:id — one snapshot with its data. */
revisionsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const rev = await prisma.revision.findUnique({ where: { id: Number(req.params.id) } });
    if (!rev) throw new HttpError(404, "Revision not found");
    if (!can(req.admin, viewPermission(rev.entityType))) throw new HttpError(403, "Your role doesn't allow this action.");
    res.json(rev);
  }),
);

/** POST /api/admin/revisions/:id/restore — put that version back (recorded as a new revision). */
revisionsRouter.post(
  "/:id/restore",
  asyncHandler(async (req, res) => {
    const rev = await prisma.revision.findUnique({ where: { id: Number(req.params.id) } });
    if (!rev) throw new HttpError(404, "Revision not found");
    if (!can(req.admin, await restorePermission(rev.entityType, rev.entityId))) throw new HttpError(403, "Your role doesn't allow restoring this.");
    const when = rev.createdAt.toISOString().slice(0, 16).replace("T", " ");
    const label = `Restored version from ${when} UTC`;

    if (rev.entityType === "news") {
      const id = Number(rev.entityId);
      const article = await prisma.newsArticle.findUnique({ where: { id } });
      if (!article) throw new HttpError(404, "That article no longer exists.");
      await baseline("news", id, async () => newsSnapshot(article));
      // Content fields only — the URL and publishing state stay as they are now.
      const d = rev.data as Record<string, string | null>;
      const updated = await prisma.newsArticle.update({
        where: { id },
        data: {
          title: d.title ?? article.title, category: d.category ?? article.category, excerpt: d.excerpt ?? article.excerpt,
          body: d.body ?? null, date: d.date ?? article.date, readTime: d.readTime ?? article.readTime, imgUrl: d.imgUrl ?? null,
          updatedById: req.admin!.id,
        },
      });
      await snapshot("news", id, newsSnapshot(updated), label, req);
      if (updated.status === "PUBLISHED") {
        invalidateInventory();
        revalidateWeb({ paths: ["/news", `/news/${updated.slug}`] });
      }
    } else if (rev.entityType === "college") {
      const id = Number(rev.entityId);
      const d = rev.data as unknown as CollegeSnapshot;
      if (!(await prisma.college.findUnique({ where: { id }, select: { id: true } }))) throw new HttpError(404, "That college no longer exists.");
      await baseline("college", id, () => collegeSnapshot(id));
      // Detail content only; published/unpublished is left as it is now.
      await prisma.$transaction([
        prisma.contentSection.deleteMany({ where: { collegeId: id } }),
        prisma.highlight.deleteMany({ where: { collegeId: id } }),
        prisma.course.deleteMany({ where: { collegeId: id } }),
        prisma.faq.deleteMany({ where: { collegeId: id } }),
        prisma.contentSection.createMany({ data: d.sections.map((s) => ({ ...s, collegeId: id })) }),
        prisma.highlight.createMany({ data: d.highlights.map((h) => ({ ...h, collegeId: id })) }),
        prisma.course.createMany({ data: d.courses.map((c) => ({ ...c, collegeId: id })) }),
        prisma.faq.createMany({ data: d.faqs.map((f) => ({ ...f, collegeId: id })) }),
      ]);
      const after = await collegeSnapshot(id);
      await snapshot("college", id, after, label, req);
      void revalidateCollege(id);
    } else if (rev.entityType === "seo") {
      const path = rev.entityId;
      await baseline("seo", path, async () => pickFields(await prisma.seoMeta.findUnique({ where: { path } })));
      const fields = { ...pickFields(null), ...(rev.data as Partial<SeoFields>) };
      await writeSeo(path, fields);
      await snapshot("seo", path, fields, label, req);
      revalidateWeb({ paths: [path], tags: ["seo-settings"] });
    }
    res.json({ ok: true, restored: rev.id });
  }),
);

// ─────────────────────────────────────────────────────────────
// Audit log
// ─────────────────────────────────────────────────────────────

export const auditRouter = Router();
auditRouter.use(requirePermission("audit:view"));

/** GET /api/admin/audit?userId=&action=&entityType=&entityId=&q=&from=&to=&page= */
auditRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = z.object({
      userId: z.coerce.number().int().optional(),
      action: z.string().trim().max(60).optional(), // prefix, e.g. "news." or "auth."
      entityType: z.string().trim().max(30).optional(),
      entityId: z.string().trim().max(500).optional(),
      q: z.string().trim().max(200).optional(),
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
      page: z.coerce.number().int().min(1).default(1),
    }).parse(req.query);
    const pageSize = 50;
    const where: Prisma.AuditLogWhereInput = {
      ...(q.userId ? { userId: q.userId } : {}),
      ...(q.action ? { action: { startsWith: q.action } } : {}),
      ...(q.entityType ? { entityType: q.entityType } : {}),
      ...(q.entityId ? { entityId: q.entityId } : {}),
      ...(q.q ? { OR: [{ summary: { contains: q.q, mode: "insensitive" } }, { userEmail: { contains: q.q, mode: "insensitive" } }] } : {}),
      ...(q.from || q.to ? { createdAt: { ...(q.from ? { gte: q.from } : {}), ...(q.to ? { lte: q.to } : {}) } } : {}),
    };
    const [items, total, users] = await Promise.all([
      prisma.auditLog.findMany({ where, orderBy: { createdAt: "desc" }, skip: (q.page - 1) * pageSize, take: pageSize }),
      prisma.auditLog.count({ where }),
      prisma.adminUser.findMany({ select: { id: true, name: true, email: true }, orderBy: { name: "asc" } }),
    ]);
    res.json({ items, total, page: q.page, totalPages: Math.max(1, Math.ceil(total / pageSize)), users });
  }),
);
