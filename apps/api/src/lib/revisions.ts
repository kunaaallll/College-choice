/**
 * Revision history for editable content: a snapshot is stored after every save
 * (plus a baseline of the original the first time something is edited), so any
 * earlier version can be viewed and restored.
 */
import type { Request } from "express";
import type { NewsArticle, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export type RevisionEntity = "news" | "college" | "seo" | "entry";

const MAX_PER_ENTITY = 50; // keep the newest N per item

async function write(entityType: RevisionEntity, entityId: string, data: unknown, summary: string, req: Request | null) {
  await prisma.revision.create({
    data: {
      entityType, entityId, summary: summary.slice(0, 300),
      data: data as Prisma.InputJsonValue,
      userId: req?.admin?.id ?? null, userEmail: req?.admin?.email ?? null,
    },
  });
  const old = await prisma.revision.findMany({
    where: { entityType, entityId }, orderBy: { createdAt: "desc" }, skip: MAX_PER_ENTITY, select: { id: true },
  });
  if (old.length) await prisma.revision.deleteMany({ where: { id: { in: old.map((r) => r.id) } } });
}

/** Store the current state as "Original" if this item has no history yet. Call before changing it. */
export async function baseline(entityType: RevisionEntity, entityId: string | number, load: () => Promise<unknown>) {
  const id = String(entityId);
  if (await prisma.revision.findFirst({ where: { entityType, entityId: id }, select: { id: true } })) return;
  const data = await load();
  if (data) await write(entityType, id, data, "Original (before first CMS edit)", null);
}

/** Store the state after a change. */
export async function snapshot(entityType: RevisionEntity, entityId: string | number, data: unknown, summary: string, req: Request) {
  await write(entityType, String(entityId), data, summary, req);
}

// ── What gets snapshotted per entity ──────────────────────────

export const newsSnapshot = (a: NewsArticle) => ({
  title: a.title, slug: a.slug, category: a.category, excerpt: a.excerpt, body: a.body,
  date: a.date, readTime: a.readTime, imgUrl: a.imgUrl,
  status: a.status, publishAt: a.publishAt, unpublishAt: a.unpublishAt,
});

export async function collegeSnapshot(collegeId: number) {
  const c = await prisma.college.findUnique({
    where: { id: collegeId },
    select: {
      published: true,
      sections: { orderBy: [{ tab: "asc" }, { sort: "asc" }], select: { tab: true, heading: true, body: true, sort: true } },
      highlights: { orderBy: { id: "asc" }, select: { text: true } },
      courses: { orderBy: { id: "asc" }, select: { name: true, duration: true, seats: true, feesLabel: true } },
      faqs: { orderBy: { sort: "asc" }, select: { question: true, answer: true, sort: true } },
    },
  });
  return c;
}

export type CollegeSnapshot = NonNullable<Awaited<ReturnType<typeof collegeSnapshot>>>;

/** Run a college content change with a baseline before and a snapshot after. */
export async function withCollegeRevision<T>(collegeId: number, summary: string, req: Request, fn: () => Promise<T>): Promise<T> {
  await baseline("college", collegeId, () => collegeSnapshot(collegeId));
  const result = await fn();
  const after = await collegeSnapshot(collegeId);
  if (after) await snapshot("college", collegeId, after, summary, req);
  return result;
}
