/**
 * Public content pages: /api/entries (courses, exam pages, info pages) and
 * /api/site (tracking codes for the site layout). Live entries only.
 */
import { Router } from "express";
import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { entryPath, liveEntryWhere, typeFromParam } from "../lib/entries";
import { liveNewsWhere } from "../lib/content";
import { cardSelect } from "./colleges";
import { getTracking } from "./adminSite";

export const entriesRouter = Router();

const listSelect = {
  id: true, type: true, slug: true, title: true, summary: true, heroImage: true, heroAlt: true, data: true, updatedAt: true,
  stream: { select: { name: true, slug: true } },
  category: { select: { name: true, slug: true } },
} satisfies Prisma.ContentEntrySelect;

/** GET /api/entries?type=course|exam|page&stream=&limit= */
entriesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const type = typeFromParam(String(req.query.type || ""));
    if (!type) throw new HttpError(400, "type must be course, exam or page");
    const stream = typeof req.query.stream === "string" ? req.query.stream : undefined;
    const items = await prisma.contentEntry.findMany({
      where: { type, ...liveEntryWhere(), ...(stream ? { stream: { slug: stream } } : {}) },
      select: listSelect,
      orderBy: { title: "asc" },
      take: Math.min(Number(req.query.limit) || 500, 500),
    });
    res.json({ items: items.map((e) => ({ ...e, path: entryPath(e.type, e.slug) })) });
  }),
);

/** GET /api/entries/:type/:slug — one live page with everything it links to. */
entriesRouter.get(
  "/:type/:slug",
  asyncHandler(async (req, res) => {
    const type = typeFromParam(req.params.type);
    if (!type) throw new HttpError(404, "Not found");
    const e = await prisma.contentEntry.findFirst({
      where: { type, slug: req.params.slug, ...liveEntryWhere() },
      select: {
        ...listSelect, body: true, faqs: true, related: true, publishAt: true, createdAt: true,
        exam: true,
        tags: { select: { tag: { select: { name: true, slug: true } } } },
      },
    });
    if (!e) throw new HttpError(404, "Page not found");
    const rel = (e.related ?? {}) as { colleges?: number[]; entries?: number[]; news?: number[] };
    const data = (e.data ?? {}) as Record<string, string>;

    const [relatedColleges, relatedEntries, relatedNews, examColleges, offeringColleges] = await Promise.all([
      rel.colleges?.length ? prisma.college.findMany({ where: { id: { in: rel.colleges }, published: true }, select: cardSelect }) : [],
      rel.entries?.length ? prisma.contentEntry.findMany({ where: { id: { in: rel.entries }, ...liveEntryWhere() }, select: { id: true, type: true, slug: true, title: true, summary: true } }) : [],
      rel.news?.length ? prisma.newsArticle.findMany({ where: { id: { in: rel.news }, ...liveNewsWhere() }, select: { id: true, slug: true, title: true, excerpt: true, imgUrl: true, date: true } }) : [],
      // Exam pages: colleges that accept this exam.
      e.exam ? prisma.college.findMany({ where: { published: true, exams: { some: { examId: e.exam.id } } }, select: cardSelect, orderBy: [{ rank: { sort: "asc", nulls: "last" } }], take: 12 }) : [],
      // Course pages: colleges whose course list includes this course.
      type === "COURSE" && data.collegeMatch
        ? prisma.college.findMany({ where: { published: true, courses: { some: { name: { contains: data.collegeMatch, mode: "insensitive" } } } }, select: cardSelect, orderBy: [{ rank: { sort: "asc", nulls: "last" } }], take: 12 })
        : [],
    ]);
    // Keep the editor's order for manual picks.
    const order = <T extends { id: number }>(rows: T[], ids?: number[]) => (ids ?? []).map((id) => rows.find((r) => r.id === id)).filter((x): x is T => !!x);
    res.json({
      ...e,
      path: entryPath(e.type, e.slug),
      tags: e.tags.map((t) => t.tag),
      relatedColleges: order(relatedColleges, rel.colleges),
      relatedEntries: order(relatedEntries, rel.entries).map((x) => ({ ...x, path: entryPath(x.type, x.slug) })),
      relatedNews: order(relatedNews, rel.news),
      examColleges,
      offeringColleges,
    });
  }),
);

export const siteRouter = Router();

/** GET /api/site — analytics/verification codes for the site layout. */
siteRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await getTracking());
  }),
);
