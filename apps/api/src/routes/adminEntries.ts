/**
 * Course, exam and info/service pages (/api/admin/entries) — same workflow as
 * news: editors draft and submit; SEO Managers/Admins approve, publish or
 * schedule. Edits to a live page by an editor wait as pending changes.
 */
import { Router } from "express";
import { z } from "zod";
import { parse as parseCsv } from "csv-parse/sync";
import { Prisma, type EntryType } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { can, requirePermission } from "../lib/adminAuth";
import { displayStatus } from "../lib/content";
import {
  dataSchemaFor, entryPath, entrySnapshot, faqListSchema, liveEntryWhere, relatedSchema, RESERVED_PAGE_SLUGS, typeFromParam,
} from "../lib/entries";
import { sanitizeRichHtml } from "../lib/html";
import { baseline, snapshot } from "../lib/revisions";
import { revalidateWeb } from "../lib/revalidate";
import { invalidateInventory, recordUrlChange } from "../lib/seo";

export const adminEntriesRouter = Router();

type Tx = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
const slugify = (s: string) => s.toLowerCase().trim().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 200);

const examBasicsSchema = z.object({
  name: z.string().trim().min(1).max(120),
  fullName: z.string().trim().max(250).default(""),
  level: z.string().trim().max(60).default("National"),
  date: z.string().trim().max(60).default(""),
  examOn: z.coerce.date().nullish(),
  mode: z.string().trim().max(60).default("Online"),
  stream: z.string().trim().max(60).default(""),
});

const entryInput = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(200).optional(),
  summary: z.string().trim().max(1000).nullish(),
  body: z.string().max(300_000).nullish(),
  data: z.record(z.unknown()).optional(),
  faqs: faqListSchema.optional(),
  heroImage: z.string().trim().max(500).nullish(),
  heroAlt: z.string().trim().max(300).nullish(),
  streamId: z.number().int().nullish(),
  categoryId: z.number().int().nullish(),
  related: relatedSchema.optional(),
  tags: z.array(z.string().trim().min(1).max(60)).max(30).optional(),
  exam: examBasicsSchema.partial().optional(), // EXAM pages: the exam's own details
});
type EntryInput = z.infer<typeof entryInput>;

const include = {
  tags: { include: { tag: true } },
  exam: true,
  stream: { select: { id: true, name: true, slug: true } },
  category: { select: { id: true, name: true, slug: true } },
} satisfies Prisma.ContentEntryInclude;
type FullEntry = Prisma.ContentEntryGetPayload<{ include: typeof include }>;

async function requireEntry(id: number): Promise<FullEntry> {
  const e = await prisma.contentEntry.findUnique({ where: { id }, include });
  if (!e) throw new HttpError(404, "Page not found");
  return e;
}

/** Entry as the admin sees it. */
async function present(items: FullEntry[]) {
  const ids = [...new Set(items.flatMap((e) => [e.authorId, e.updatedById]).filter((x): x is number => !!x))];
  const users = ids.length ? await prisma.adminUser.findMany({ where: { id: { in: ids } }, select: { id: true, name: true } }) : [];
  const name = (id: number | null) => users.find((u) => u.id === id)?.name ?? null;
  return items.map((e) => ({
    ...e,
    tags: e.tags.map((t) => t.tag.name),
    path: entryPath(e.type, e.slug),
    displayStatus: displayStatus(e),
    hasPendingChanges: !!e.pendingData,
    authorName: name(e.authorId),
    updatedByName: name(e.updatedById),
  }));
}

function revalidateEntry(type: EntryType, ...slugs: string[]) {
  invalidateInventory();
  const list = type === "COURSE" ? ["/courses"] : type === "EXAM" ? ["/exams"] : [];
  revalidateWeb({ paths: ["/", ...list, ...slugs.map((s) => entryPath(type, s))], tags: ["seo-settings"] });
}

/** Normalise and validate a slug for a type; undefined when unchanged. */
async function checkSlug(type: EntryType, id: number | null, current: string | null, requested: string): Promise<string | undefined> {
  const slug = slugify(requested);
  if (!slug) throw new HttpError(400, "The URL slug needs at least one letter or number.");
  if (slug === current) return undefined;
  if (type === "PAGE" && RESERVED_PAGE_SLUGS.has(slug)) throw new HttpError(409, `/${slug} is used by the site itself — pick another slug.`);
  const clash = await prisma.contentEntry.findFirst({ where: { type, slug, ...(id ? { NOT: { id } } : {}) }, select: { id: true } });
  if (clash) throw new HttpError(409, `${entryPath(type, slug)} is already used by another page.`);
  return slug;
}

async function setTags(tx: Tx, entryId: number, names: string[]) {
  await tx.entryTag.deleteMany({ where: { entryId } });
  for (const name of [...new Set(names.map((n) => n.trim()).filter(Boolean))]) {
    const slug = slugify(name);
    if (!slug) continue;
    const tag = await tx.tag.upsert({ where: { slug }, create: { name, slug }, update: {} });
    await tx.entryTag.create({ data: { entryId, tagId: tag.id } });
  }
}

/**
 * Apply edits inside a transaction. A public URL change leaves a 301. The exam's own
 * details (name, date…) are live on /exams immediately, so only publishers change them.
 */
async function applyPatch(tx: Tx, e: FullEntry, p: Partial<EntryInput>, extra: Prisma.ContentEntryUncheckedUpdateInput, adminId: number, canEditExam = true) {
  const slug = p.slug !== undefined ? await checkSlug(e.type, e.id, e.slug, p.slug) : undefined;
  const data: Prisma.ContentEntryUncheckedUpdateInput = { ...extra, updatedById: adminId };
  if (p.title !== undefined) data.title = p.title;
  if (slug) data.slug = slug;
  if (p.summary !== undefined) data.summary = p.summary || null;
  if (p.body !== undefined) data.body = sanitizeRichHtml(p.body);
  if (p.data !== undefined) data.data = dataSchemaFor(e.type).parse({ ...((e.data as object) ?? {}), ...p.data }) as Prisma.InputJsonValue;
  if (p.faqs !== undefined) data.faqs = p.faqs as Prisma.InputJsonValue;
  if (p.heroImage !== undefined) data.heroImage = p.heroImage || null;
  if (p.heroAlt !== undefined) data.heroAlt = p.heroAlt || null;
  if (p.streamId !== undefined) data.streamId = p.streamId ?? null;
  if (p.categoryId !== undefined) data.categoryId = p.categoryId ?? null;
  if (p.related !== undefined) data.related = p.related as Prisma.InputJsonValue;
  const updated = await tx.contentEntry.update({ where: { id: e.id }, data });
  if (p.tags !== undefined) await setTags(tx, e.id, p.tags);
  if (e.type === "EXAM" && e.examId && p.exam && Object.keys(p.exam).length && canEditExam) {
    const { examOn, ...rest } = p.exam;
    await tx.exam.update({ where: { id: e.examId }, data: { ...rest, ...(examOn !== undefined ? { examOn: examOn ?? null } : {}) } });
  }
  if (slug && (e.status === "PUBLISHED" || e.status === "UNPUBLISHED")) {
    await recordUrlChange(tx, entryPath(e.type, e.slug), entryPath(e.type, slug), false);
  }
  return updated;
}

const snap = async (id: number) => entrySnapshot((await prisma.contentEntry.findUniqueOrThrow({ where: { id }, include: { tags: true } })));

// ─────────────────────────────────────────────────────────────

/** GET /api/admin/entries?type=course|exam|page&q=&categoryId=&tag= */
adminEntriesRouter.get(
  "/",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const type = typeFromParam(String(req.query.type || ""));
    if (!type) throw new HttpError(400, "type must be course, exam or page");
    const q = String(req.query.q || "").trim();
    const where: Prisma.ContentEntryWhereInput = {
      type,
      ...(q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }] } : {}),
      ...(req.query.categoryId ? { categoryId: Number(req.query.categoryId) } : {}),
      ...(req.query.tag ? { tags: { some: { tag: { slug: String(req.query.tag) } } } } : {}),
    };
    const items = await prisma.contentEntry.findMany({ where, include, orderBy: { updatedAt: "desc" } });
    const live = new Set((await prisma.contentEntry.findMany({ where: { type, ...liveEntryWhere() }, select: { id: true } })).map((e) => e.id));
    // Exams without a page yet, so editors can add one.
    const examsWithoutPage = type === "EXAM"
      ? await prisma.exam.findMany({ where: { entry: null }, select: { id: true, name: true, slug: true, date: true }, orderBy: { name: "asc" } })
      : [];
    res.json({ items: (await present(items)).map((e) => ({ ...e, isLive: live.has(e.id) })), examsWithoutPage });
  }),
);

/** GET /api/admin/entries/:id */
adminEntriesRouter.get(
  "/:id(\\d+)",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    res.json((await present([await requireEntry(Number(req.params.id))]))[0]);
  }),
);

/** POST /api/admin/entries { type, title, … } — new draft. EXAM pages link to (or create) an exam. */
adminEntriesRouter.post(
  "/",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const type = typeFromParam(String(req.body?.type || ""));
    if (!type) throw new HttpError(400, "type must be course, exam or page");
    const input = entryInput.extend({ examId: z.number().int().optional() }).parse(req.body);

    let examId: number | null = null;
    if (type === "EXAM") {
      if (input.examId) {
        const ex = await prisma.exam.findUnique({ where: { id: input.examId }, include: { entry: true } });
        if (!ex) throw new HttpError(404, "Exam not found");
        if (ex.entry) throw new HttpError(409, "That exam already has a page.");
        examId = ex.id;
        if (input.exam && Object.keys(input.exam).length && can(req.admin, "content:publish")) {
          const { examOn, ...rest } = input.exam;
          await prisma.exam.update({ where: { id: ex.id }, data: { ...rest, ...(examOn !== undefined ? { examOn: examOn ?? null } : {}) } });
        }
      } else {
        if (!can(req.admin, "content:publish")) throw new HttpError(403, "Only an SEO Manager or Admin can add a new exam — pick an existing exam from the list.");
        const basics = examBasicsSchema.parse({ name: input.exam?.name ?? input.title, ...input.exam });
        const exSlug = slugify(basics.name);
        if (await prisma.exam.findFirst({ where: { OR: [{ name: basics.name }, { slug: exSlug }] } })) {
          throw new HttpError(409, `An exam called “${basics.name}” already exists — create its page from the list instead.`);
        }
        examId = (await prisma.exam.create({ data: { ...basics, slug: exSlug, examOn: basics.examOn ?? null } })).id;
      }
    }
    const exam = examId ? await prisma.exam.findUnique({ where: { id: examId } }) : null;
    const slug = (await checkSlug(type, null, null, input.slug || exam?.slug || input.title))!;

    const created = await prisma.$transaction(async (tx) => {
      const e = await tx.contentEntry.create({
        data: {
          type, slug, title: input.title, examId,
          summary: input.summary || null,
          body: sanitizeRichHtml(input.body),
          data: dataSchemaFor(type).parse(input.data ?? {}) as Prisma.InputJsonValue,
          faqs: (input.faqs ?? []) as Prisma.InputJsonValue,
          heroImage: input.heroImage || null, heroAlt: input.heroAlt || null,
          streamId: input.streamId ?? null, categoryId: input.categoryId ?? null,
          related: (input.related ?? { colleges: [], entries: [], news: [] }) as Prisma.InputJsonValue,
          status: "DRAFT", authorId: req.admin!.id, updatedById: req.admin!.id,
        },
      });
      if (input.tags) await setTags(tx, e.id, input.tags);
      return e;
    });
    await snapshot("entry", created.id, await snap(created.id), "Created draft", req);
    res.status(201).json((await present([await requireEntry(created.id)]))[0]);
  }),
);

/** PUT /api/admin/entries/:id — edits; an editor's edits to a live page become pending changes. */
adminEntriesRouter.put(
  "/:id(\\d+)",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    const p = entryInput.partial().parse(req.body);

    if (e.status === "PUBLISHED" && !can(req.admin, "content:publish")) {
      if (p.slug !== undefined) await checkSlug(e.type, e.id, e.slug, p.slug);
      const pendingData = { ...((e.pendingData as object | null) ?? {}), ...p } as Prisma.InputJsonValue;
      await prisma.contentEntry.update({ where: { id: e.id }, data: { pendingData, updatedById: req.admin!.id, reviewNote: null } });
      return res.json({ ...(await present([await requireEntry(e.id)]))[0], pending: true });
    }

    await baseline("entry", e.id, () => snap(e.id));
    const settle: Prisma.ContentEntryUncheckedUpdateInput = e.pendingData ? { pendingData: Prisma.DbNull, reviewNote: null } : {};
    const updated = await prisma.$transaction((tx) => applyPatch(tx, e, p, settle, req.admin!.id, can(req.admin, "content:publish")));
    await snapshot("entry", e.id, await snap(e.id), "Edited", req);
    if (e.status === "PUBLISHED") revalidateEntry(e.type, updated.slug, e.slug);
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

/** POST /api/admin/entries/:id/submit — send to review. */
adminEntriesRouter.post(
  "/:id(\\d+)/submit",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    if (e.status === "PUBLISHED") {
      if (!e.pendingData) throw new HttpError(400, "This page is live and has no pending changes to review.");
      await prisma.contentEntry.update({ where: { id: e.id }, data: { reviewNote: null } });
    } else {
      await prisma.contentEntry.update({ where: { id: e.id }, data: { status: "IN_REVIEW", reviewNote: null, updatedById: req.admin!.id } });
    }
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

const schedule = z
  .object({ publishAt: z.coerce.date().nullish(), unpublishAt: z.coerce.date().nullish() })
  .refine((s) => !s.unpublishAt || s.unpublishAt > (s.publishAt ?? new Date()), { message: "The expiry time must be after the publish time." });

/** POST /api/admin/entries/:id/publish { publishAt?, unpublishAt? } — approve (applies pending changes) and publish/schedule. */
adminEntriesRouter.post(
  "/:id(\\d+)/publish",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    const { publishAt, unpublishAt } = schedule.parse(req.body ?? {});
    await baseline("entry", e.id, () => snap(e.id));
    const updated = await prisma.$transaction((tx) =>
      applyPatch(tx, e, (e.pendingData as Partial<EntryInput> | null) ?? {}, {
        status: "PUBLISHED", publishAt: publishAt ?? null, unpublishAt: unpublishAt ?? null,
        pendingData: Prisma.DbNull, reviewNote: null,
      }, req.admin!.id),
    );
    await snapshot("entry", e.id, await snap(e.id), publishAt && publishAt > new Date() ? `Scheduled for ${publishAt.toISOString()}` : "Published", req);
    revalidateEntry(e.type, updated.slug, e.slug);
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

/** POST /api/admin/entries/:id/request-changes { note } */
adminEntriesRouter.post(
  "/:id(\\d+)/request-changes",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    const { note } = z.object({ note: z.string().trim().min(1, "Add a note for the author.").max(2000) }).parse(req.body);
    await prisma.contentEntry.update({ where: { id: e.id }, data: { reviewNote: note, ...(e.status === "IN_REVIEW" ? { status: "DRAFT" } : {}) } });
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

/** POST /api/admin/entries/:id/discard-pending */
adminEntriesRouter.post(
  "/:id(\\d+)/discard-pending",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    await prisma.contentEntry.update({ where: { id: e.id }, data: { pendingData: Prisma.DbNull, reviewNote: null } });
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

/** POST /api/admin/entries/:id/unpublish */
adminEntriesRouter.post(
  "/:id(\\d+)/unpublish",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    await baseline("entry", e.id, () => snap(e.id));
    await prisma.contentEntry.update({ where: { id: e.id }, data: { status: "UNPUBLISHED", updatedById: req.admin!.id } });
    await snapshot("entry", e.id, await snap(e.id), "Unpublished", req);
    revalidateEntry(e.type, e.slug);
    res.json((await present([await requireEntry(e.id)]))[0]);
  }),
);

/** DELETE /api/admin/entries/:id — editors may delete pages that were never published. The exam itself stays. */
adminEntriesRouter.delete(
  "/:id(\\d+)",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const e = await requireEntry(Number(req.params.id));
    const neverLive = e.status === "DRAFT" || e.status === "IN_REVIEW";
    if (!neverLive && !can(req.admin, "content:publish")) throw new HttpError(403, "Only an SEO Manager or Admin can delete a published page.");
    await prisma.contentEntry.delete({ where: { id: e.id } });
    if (!neverLive) revalidateEntry(e.type, e.slug);
    res.json({ ok: true });
  }),
);

/**
 * POST /api/admin/entries/bulk { ids, action, value? } — publish, unpublish,
 * set-category, add-tag, remove-tag, delete-drafts.
 */
adminEntriesRouter.post(
  "/bulk",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const { ids, action, value } = z.object({
      ids: z.array(z.number().int()).min(1).max(1000),
      action: z.enum(["publish", "unpublish", "set-category", "add-tag", "remove-tag", "delete-drafts"]),
      value: z.union([z.string(), z.number()]).nullish(),
    }).parse(req.body);
    if ((action === "publish" || action === "unpublish") && !can(req.admin, "content:publish")) {
      throw new HttpError(403, "Only an SEO Manager or Admin can publish or unpublish.");
    }
    const entries = await prisma.contentEntry.findMany({ where: { id: { in: ids } }, include });
    let changed = 0;
    for (const e of entries) {
      if (action === "publish") {
        if (e.status === "PUBLISHED" && !e.pendingData) continue;
        await prisma.$transaction((tx) => applyPatch(tx, e, (e.pendingData as Partial<EntryInput> | null) ?? {}, { status: "PUBLISHED", publishAt: null, pendingData: Prisma.DbNull, reviewNote: null }, req.admin!.id));
      } else if (action === "unpublish") {
        if (e.status !== "PUBLISHED") continue;
        await prisma.contentEntry.update({ where: { id: e.id }, data: { status: "UNPUBLISHED", updatedById: req.admin!.id } });
      } else if (action === "set-category") {
        await prisma.contentEntry.update({ where: { id: e.id }, data: { categoryId: value ? Number(value) : null, updatedById: req.admin!.id } });
      } else if (action === "add-tag" || action === "remove-tag") {
        const names = new Set(e.tags.map((t) => t.tag.name));
        if (action === "add-tag") names.add(String(value)); else names.delete(String(value));
        await prisma.$transaction((tx) => setTags(tx, e.id, [...names]));
      } else if (action === "delete-drafts") {
        if (e.status !== "DRAFT" && e.status !== "IN_REVIEW") continue;
        await prisma.contentEntry.delete({ where: { id: e.id } });
      }
      changed++;
    }
    const types = new Set(entries.map((e) => e.type));
    for (const t of types) revalidateEntry(t, ...entries.filter((e) => e.type === t).map((e) => e.slug));
    res.json({ changed });
  }),
);

// ─────────────────────────────────────────────────────────────
// CSV import / export (courses & exams)
// ─────────────────────────────────────────────────────────────

const COMMON_COLS = ["slug", "title", "summary", "stream", "category", "tags"];
const COURSE_COLS = ["level", "duration", "mode", "eligibility", "fees", "admission", "careers", "college_match"];
const EXAM_COLS = ["exam_name", "full_name", "exam_level", "exam_date", "exam_mode", "exam_stream",
  "exam_status", "conducting_body", "application_window", "result_date", "official_website", "eligibility", "pattern", "fee"];
const camel = (s: string) => s.replace(/_([a-z])/g, (_m, c: string) => c.toUpperCase());

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const sendCsv = (res: import("express").Response, name: string, rows: unknown[][]) => {
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${name}-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send("﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n");
};
const importType = (s: unknown): "COURSE" | "EXAM" => {
  const t = typeFromParam(String(s || ""));
  if (t !== "COURSE" && t !== "EXAM") throw new HttpError(400, "Import supports course or exam.");
  return t;
};

/** GET /api/admin/entries/template?type=course|exam — a CSV with the right columns and one example row. */
adminEntriesRouter.get(
  "/template",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const type = importType(req.query.type);
    if (type === "COURSE") {
      sendCsv(res, "courses-template", [
        [...COMMON_COLS, ...COURSE_COLS],
        ["btech", "B.Tech — Bachelor of Technology", "4-year undergraduate engineering degree.", "Engineering", "", "engineering|ug",
          "UG", "4 years", "Full-time", "10+2 with PCM, 75% (JEE)", "₹2–20 L total", "Through JEE Main / state CETs", "Software, core engineering, PSUs", "B.Tech"],
      ]);
    } else {
      sendCsv(res, "exams-template", [
        [...COMMON_COLS, ...EXAM_COLS],
        ["cuet-ug", "CUET UG 2027 — Dates, Syllabus & Pattern", "Common entrance for central universities.", "Arts", "", "entrance",
          "CUET UG", "Common University Entrance Test", "National", "May 2027", "Online", "All", "Registration opens Feb",
          "NTA", "Feb–Mar 2027", "July 2027", "https://cuet.nta.nic.in", "10+2 pass", "MCQ, 3 sections", "₹1,000"],
      ]);
    }
  }),
);

/** GET /api/admin/entries/export?type=course|exam */
adminEntriesRouter.get(
  "/export",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const type = importType(req.query.type);
    const items = await prisma.contentEntry.findMany({ where: { type }, include, orderBy: { slug: "asc" } });
    const extra = type === "COURSE" ? COURSE_COLS : EXAM_COLS;
    const rows: unknown[][] = [[...COMMON_COLS, ...extra, "status"]];
    for (const e of items) {
      const d = (e.data ?? {}) as Record<string, string>;
      const examVals: Record<string, unknown> = e.exam
        ? { exam_name: e.exam.name, full_name: e.exam.fullName, exam_level: e.exam.level, exam_date: e.exam.date, exam_mode: e.exam.mode, exam_stream: e.exam.stream }
        : {};
      rows.push([
        e.slug, e.title, e.summary ?? "", e.stream?.name ?? "", e.category?.name ?? "", e.tags.map((t) => t.tag.name).join("|"),
        ...extra.map((c) => examVals[c] ?? d[camel(c === "exam_status" ? "examStatus" : c)] ?? ""),
        displayStatus(e),
      ]);
    }
    sendCsv(res, type === "COURSE" ? "courses" : "exams", rows);
  }),
);

/**
 * POST /api/admin/entries/import { type, csv, dryRun } — create (as drafts) or
 * update by slug. Blank cells leave existing values unchanged.
 */
adminEntriesRouter.post(
  "/import",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const type = importType(req.body?.type);
    const { csv, dryRun } = z.object({ csv: z.string().min(1).max(5_000_000), dryRun: z.boolean().default(true) }).parse(req.body);
    let records: Record<string, string>[];
    try {
      records = parseCsv(csv, { columns: (h: string[]) => h.map((c) => c.trim().toLowerCase()), skip_empty_lines: true, bom: true, relax_column_count: true, trim: true });
    } catch (e) {
      throw new HttpError(400, `Couldn't read the CSV: ${e instanceof Error ? e.message : "parse error"}`);
    }
    if (!records.length) throw new HttpError(400, "The CSV has no rows.");
    if (!("title" in records[0]) && !("slug" in records[0])) throw new HttpError(400, "The CSV needs a slug or title column — download the template.");

    const [streams, categories] = await Promise.all([prisma.stream.findMany(), prisma.category.findMany()]);
    const findStream = (v: string) => streams.find((s) => s.name.toLowerCase() === v.toLowerCase() || s.slug === slugify(v));
    const findCategory = (v: string) => categories.find((c) => c.name.toLowerCase() === v.toLowerCase() || c.slug === slugify(v));
    const dataCols = type === "COURSE" ? COURSE_COLS : EXAM_COLS.filter((c) => !c.startsWith("exam_") || c === "exam_status");
    const examCols: [string, keyof z.infer<typeof examBasicsSchema>][] = [["exam_name", "name"], ["full_name", "fullName"], ["exam_level", "level"], ["exam_date", "date"], ["exam_mode", "mode"], ["exam_stream", "stream"]];

    const seen = new Set<string>();
    const errors: { row: number; slug: string; error: string }[] = [];
    const plan: { row: number; action: "create" | "update"; slug: string; title: string; input: Partial<EntryInput>; existing: FullEntry | null }[] = [];
    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      const row = i + 2;
      const slug = slugify(r.slug || r.title || "");
      if (!slug) { errors.push({ row, slug: "", error: "Needs a slug or title" }); continue; }
      if (seen.has(slug)) { errors.push({ row, slug, error: "Duplicate slug in the file" }); continue; }
      seen.add(slug);
      const existing = await prisma.contentEntry.findUnique({ where: { type_slug: { type, slug } }, include });
      if (!existing && !r.title) { errors.push({ row, slug, error: "New rows need a title" }); continue; }
      const input: Partial<EntryInput> = {};
      if (r.title) input.title = r.title;
      if (r.summary) input.summary = r.summary;
      if (r.stream) {
        const s = findStream(r.stream);
        if (!s) { errors.push({ row, slug, error: `Unknown stream “${r.stream}”` }); continue; }
        input.streamId = s.id;
      }
      if (r.category) {
        const c = findCategory(r.category);
        if (!c) { errors.push({ row, slug, error: `Unknown category “${r.category}” — add it under Categories first` }); continue; }
        input.categoryId = c.id;
      }
      if (r.tags) input.tags = r.tags.split("|").map((t) => t.trim()).filter(Boolean);
      const data: Record<string, string> = {};
      for (const c of dataCols) if (r[c]) data[c === "exam_status" ? "examStatus" : camel(c)] = r[c];
      if (Object.keys(data).length) {
        const parsed = dataSchemaFor(type).partial().safeParse(data);
        if (!parsed.success) { errors.push({ row, slug, error: parsed.error.issues[0]?.message ?? "Invalid field" }); continue; }
        input.data = data;
      }
      if (type === "EXAM") {
        const exam: Record<string, string> = {};
        for (const [c, f] of examCols) if (r[c]) exam[f] = r[c];
        if (!existing && !exam.name) { errors.push({ row, slug, error: "New exams need exam_name" }); continue; }
        if (Object.keys(exam).length) input.exam = exam;
      }
      plan.push({ row, action: existing ? "update" : "create", slug, title: input.title ?? existing?.title ?? slug, input, existing });
    }

    if (!dryRun && !errors.length) {
      for (const p of plan) {
        if (p.existing) {
          const e = p.existing;
          await baseline("entry", e.id, () => snap(e.id));
          await prisma.$transaction((tx) => applyPatch(tx, e, p.input, {}, req.admin!.id));
          await snapshot("entry", e.id, await snap(e.id), "Updated from CSV import", req);
          if (e.status === "PUBLISHED") revalidateEntry(type, e.slug);
        } else {
          let examId: number | null = null;
          if (type === "EXAM") {
            const basics = examBasicsSchema.parse(p.input.exam);
            const exSlug = slugify(basics.name);
            const found = await prisma.exam.findFirst({ where: { OR: [{ name: basics.name }, { slug: exSlug }] }, include: { entry: true } });
            examId = found && !found.entry ? found.id : found ? null : (await prisma.exam.create({ data: { ...basics, slug: exSlug, examOn: basics.examOn ?? null } })).id;
          }
          const e = await prisma.$transaction(async (tx) => {
            const created = await tx.contentEntry.create({
              data: {
                type, slug: p.slug, title: p.input.title!, summary: p.input.summary ?? null, examId,
                data: dataSchemaFor(type).parse(p.input.data ?? {}) as Prisma.InputJsonValue,
                streamId: p.input.streamId ?? null, categoryId: p.input.categoryId ?? null,
                faqs: [] as Prisma.InputJsonValue, related: { colleges: [], entries: [], news: [] } as Prisma.InputJsonValue,
                status: "DRAFT", authorId: req.admin!.id, updatedById: req.admin!.id,
              },
            });
            if (p.input.tags) await setTags(tx, created.id, p.input.tags);
            return created;
          });
          await snapshot("entry", e.id, await snap(e.id), "Created from CSV import", req);
        }
      }
    }
    res.json({
      rows: records.length,
      create: plan.filter((p) => p.action === "create").length,
      update: plan.filter((p) => p.action === "update").length,
      applied: !dryRun && !errors.length,
      errors,
      sample: plan.slice(0, 100).map(({ row, action, slug, title }) => ({ row, action, slug, title })),
    });
  }),
);
