/**
 * Site structure & settings:
 *   /api/admin/taxonomy — streams, locations (cities), category tree, tags
 *   /api/admin/site     — tracking/integration codes, content backup
 *   /api/admin/import   — college data CSV import
 */
import { Router } from "express";
import { z } from "zod";
import { parse as parseCsv } from "csv-parse/sync";
import type { CollegeMode, CollegeType, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { requirePermission } from "../lib/adminAuth";
import { revalidateWeb } from "../lib/revalidate";
import { invalidateInventory } from "../lib/seo";

const slugify = (s: string) => s.toLowerCase().trim().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);

// ─────────────────────────────────────────────────────────────
// Taxonomy
// ─────────────────────────────────────────────────────────────

export const adminTaxonomyRouter = Router();

/** GET /api/admin/taxonomy — everything, with usage counts. */
adminTaxonomyRouter.get(
  "/",
  requirePermission("content:edit"),
  asyncHandler(async (_req, res) => {
    const [streams, cities, categories, tags] = await Promise.all([
      prisma.stream.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { colleges: true, entries: true } } } }),
      prisma.city.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { colleges: true } } } }),
      prisma.category.findMany({ orderBy: [{ sort: "asc" }, { name: "asc" }], include: { _count: { select: { entries: true, children: true } }, stream: { select: { name: true } } } }),
      prisma.tag.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { entries: true, news: true } } } }),
    ]);
    res.json({ streams, cities, categories, tags });
  }),
);

const manage = requirePermission("content:publish");

// ── Streams ──
const streamSchema = z.object({
  name: z.string().trim().min(2).max(80),
  initial: z.string().trim().min(1).max(3),
  colorGradient: z.string().trim().max(200).default("linear-gradient(135deg,#6366f1,#4338ca)"),
  description: z.string().trim().max(1000).nullish(),
  avgFees: z.string().trim().max(60).nullish(),
  degrees: z.array(z.string().trim().min(1).max(40)).max(30).default([]),
  examName: z.string().trim().max(60).nullish(),
});

adminTaxonomyRouter.post(
  "/streams",
  manage,
  asyncHandler(async (req, res) => {
    const d = streamSchema.parse(req.body);
    const slug = slugify(d.name);
    if (await prisma.stream.findFirst({ where: { OR: [{ name: d.name }, { slug }] } })) throw new HttpError(409, "A stream with that name already exists.");
    const s = await prisma.stream.create({ data: { ...d, slug } });
    invalidateInventory();
    revalidateWeb({ paths: ["/courses", "/"], tags: ["seo-settings"] });
    res.status(201).json(s);
  }),
);

adminTaxonomyRouter.put(
  "/streams/:id",
  manage,
  asyncHandler(async (req, res) => {
    const d = streamSchema.partial().parse(req.body);
    const s = await prisma.stream.update({ where: { id: Number(req.params.id) }, data: d }).catch(() => null);
    if (!s) throw new HttpError(404, "Stream not found");
    invalidateInventory();
    revalidateWeb({ paths: ["/courses", "/", `/stream/${s.slug}`] });
    res.json(s);
  }),
);

adminTaxonomyRouter.delete(
  "/streams/:id",
  manage,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (await prisma.college.count({ where: { streamId: id } })) throw new HttpError(409, "This stream still has colleges — move them first.");
    await prisma.stream.delete({ where: { id } }).catch(() => { throw new HttpError(404, "Stream not found"); });
    invalidateInventory();
    revalidateWeb({ paths: ["/courses", "/"], tags: ["seo-settings"] });
    res.json({ ok: true });
  }),
);

// ── Locations (cities) ──
const citySchema = z.object({
  name: z.string().trim().min(2).max(80),
  state: z.string().trim().max(80).nullish(),
  imageUrl: z.string().trim().max(500).nullish(),
});

adminTaxonomyRouter.post(
  "/cities",
  manage,
  asyncHandler(async (req, res) => {
    const d = citySchema.parse(req.body);
    const slug = slugify(d.name);
    if (await prisma.city.findFirst({ where: { OR: [{ name: d.name }, { slug }] } })) throw new HttpError(409, "That city already exists.");
    const c = await prisma.city.create({ data: { ...d, slug } });
    invalidateInventory();
    res.status(201).json(c);
  }),
);

adminTaxonomyRouter.put(
  "/cities/:id",
  manage,
  asyncHandler(async (req, res) => {
    const d = citySchema.partial().parse(req.body);
    const c = await prisma.city.update({ where: { id: Number(req.params.id) }, data: d }).catch(() => null);
    if (!c) throw new HttpError(404, "City not found");
    invalidateInventory();
    revalidateWeb({ paths: [`/colleges-in/${c.slug}`, "/"], tags: ["seo-settings"] });
    res.json(c);
  }),
);

adminTaxonomyRouter.delete(
  "/cities/:id",
  manage,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (await prisma.college.count({ where: { cityId: id } })) throw new HttpError(409, "This city still has colleges.");
    await prisma.city.delete({ where: { id } }).catch(() => { throw new HttpError(404, "City not found"); });
    invalidateInventory();
    res.json({ ok: true });
  }),
);

// ── Categories (tree) ──
const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().max(120).optional(),
  description: z.string().trim().max(1000).nullish(),
  parentId: z.number().int().nullish(),
  streamId: z.number().int().nullish(),
  sort: z.number().int().min(0).max(9999).default(0),
});

/** Refuse a parent that would create a loop. */
async function assertNoCycle(id: number, parentId: number | null | undefined) {
  let cur = parentId ?? null;
  for (let i = 0; cur && i < 50; i++) {
    if (cur === id) throw new HttpError(400, "A category can't be inside itself.");
    cur = (await prisma.category.findUnique({ where: { id: cur }, select: { parentId: true } }))?.parentId ?? null;
  }
}

adminTaxonomyRouter.post(
  "/categories",
  manage,
  asyncHandler(async (req, res) => {
    const d = categorySchema.parse(req.body);
    const slug = slugify(d.slug || d.name);
    if (await prisma.category.findUnique({ where: { slug } })) throw new HttpError(409, "A category with that slug already exists.");
    res.status(201).json(await prisma.category.create({ data: { ...d, slug } }));
  }),
);

adminTaxonomyRouter.put(
  "/categories/:id",
  manage,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const d = categorySchema.partial().parse(req.body);
    await assertNoCycle(id, d.parentId);
    const data: Prisma.CategoryUncheckedUpdateInput = { ...d };
    if (d.slug !== undefined) {
      data.slug = slugify(d.slug);
      if (await prisma.category.findFirst({ where: { slug: data.slug, NOT: { id } } })) throw new HttpError(409, "Another category uses that slug.");
    }
    const c = await prisma.category.update({ where: { id }, data }).catch(() => null);
    if (!c) throw new HttpError(404, "Category not found");
    res.json(c);
  }),
);

adminTaxonomyRouter.delete(
  "/categories/:id",
  manage,
  asyncHandler(async (req, res) => {
    await prisma.category.delete({ where: { id: Number(req.params.id) } }).catch(() => { throw new HttpError(404, "Category not found"); });
    res.json({ ok: true }); // children move to the top level, pages become uncategorised (FK set null)
  }),
);

// ── Tags ──
adminTaxonomyRouter.post(
  "/tags",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const { name } = z.object({ name: z.string().trim().min(1).max(60) }).parse(req.body);
    const slug = slugify(name);
    const tag = await prisma.tag.upsert({ where: { slug }, create: { name, slug }, update: {} });
    res.status(201).json(tag);
  }),
);

adminTaxonomyRouter.put(
  "/tags/:id",
  manage,
  asyncHandler(async (req, res) => {
    const { name } = z.object({ name: z.string().trim().min(1).max(60) }).parse(req.body);
    const id = Number(req.params.id);
    const slug = slugify(name);
    const clash = await prisma.tag.findFirst({ where: { slug, NOT: { id } } });
    if (clash) {
      // Renaming onto an existing tag merges them.
      await prisma.$transaction(async (tx) => {
        for (const et of await tx.entryTag.findMany({ where: { tagId: id } })) {
          await tx.entryTag.upsert({ where: { entryId_tagId: { entryId: et.entryId, tagId: clash.id } }, create: { entryId: et.entryId, tagId: clash.id }, update: {} });
        }
        for (const nt of await tx.newsTag.findMany({ where: { tagId: id } })) {
          await tx.newsTag.upsert({ where: { newsId_tagId: { newsId: nt.newsId, tagId: clash.id } }, create: { newsId: nt.newsId, tagId: clash.id }, update: {} });
        }
        await tx.tag.delete({ where: { id } });
      });
      return res.json({ ...clash, merged: true });
    }
    const t = await prisma.tag.update({ where: { id }, data: { name, slug } }).catch(() => null);
    if (!t) throw new HttpError(404, "Tag not found");
    res.json(t);
  }),
);

adminTaxonomyRouter.delete(
  "/tags/:id",
  manage,
  asyncHandler(async (req, res) => {
    await prisma.tag.delete({ where: { id: Number(req.params.id) } }).catch(() => { throw new HttpError(404, "Tag not found"); });
    res.json({ ok: true });
  }),
);

// ─────────────────────────────────────────────────────────────
// Site settings: tracking & backup
// ─────────────────────────────────────────────────────────────

export const TRACKING_DEFAULTS = { gaId: "G-LRB253XV05", gscVerification: "zeku_T4D2PL-QMBs2bcgge_fKN_DdHzAymV91OdcRE4" };

export async function getTracking() {
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: ["tracking.gaId", "tracking.gscVerification"] } } });
  const v = (k: string) => rows.find((r) => r.key === k)?.value;
  return { gaId: v("tracking.gaId") ?? TRACKING_DEFAULTS.gaId, gscVerification: v("tracking.gscVerification") ?? TRACKING_DEFAULTS.gscVerification };
}

export const adminSiteRouter = Router();

adminSiteRouter.get("/", requirePermission("settings:manage"), asyncHandler(async (_req, res) => { res.json(await getTracking()); }));

/** PUT /api/admin/site { gaId, gscVerification } — empty string switches the code off. */
adminSiteRouter.put(
  "/",
  requirePermission("settings:manage"),
  asyncHandler(async (req, res) => {
    const d = z.object({
      gaId: z.string().trim().max(40).regex(/^(G-[A-Z0-9]{4,20})?$/, "Google Analytics IDs look like G-XXXXXXXXXX").optional(),
      gscVerification: z.string().trim().max(120).regex(/^[A-Za-z0-9_-]*$/, "Paste only the content=\"…\" value of the verification tag").optional(),
    }).parse(req.body);
    for (const [field, key] of [["gaId", "tracking.gaId"], ["gscVerification", "tracking.gscVerification"]] as const) {
      const value = d[field];
      if (value !== undefined) await prisma.siteSetting.upsert({ where: { key }, create: { key, value }, update: { value } });
    }
    revalidateWeb({ tags: ["site-settings"], paths: ["/"] });
    res.json(await getTracking());
  }),
);

/** GET /api/admin/site/backup — JSON export of everything managed in the CMS (not the college dataset). */
adminSiteRouter.get(
  "/backup",
  requirePermission("users:manage"),
  asyncHandler(async (_req, res) => {
    const [seoMeta, redirects, siteSettings, news, entries, categories, tags, media, streams, cities, exams] = await Promise.all([
      prisma.seoMeta.findMany(), prisma.redirect.findMany(), prisma.siteSetting.findMany(),
      prisma.newsArticle.findMany({ include: { tags: { include: { tag: true } } } }),
      prisma.contentEntry.findMany({ include: { tags: { include: { tag: true } } } }),
      prisma.category.findMany(), prisma.tag.findMany(), prisma.media.findMany(),
      prisma.stream.findMany(), prisma.city.findMany(), prisma.exam.findMany(),
    ]);
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="collegechoice-cms-backup-${stamp}.json"`);
    res.send(JSON.stringify({ exportedAt: new Date().toISOString(), seoMeta, redirects, siteSettings, news, entries, categories, tags, media, streams, cities, exams }, null, 2));
  }),
);

// ─────────────────────────────────────────────────────────────
// College data import (CSV)
// ─────────────────────────────────────────────────────────────

export const adminImportRouter = Router();

const COLLEGE_COLS = [
  "slug", "name", "stream", "city", "state", "location", "type", "mode", "fees_label", "fees_num", "package_label",
  "exam_name", "estd", "website", "approvals", "affiliation", "approved_by", "nirf_rank", "about", "meta_title", "meta_description", "published",
];
const TYPES: CollegeType[] = ["Public", "Private", "Government", "Deemed", "Autonomous"];
const MODES: CollegeMode[] = ["Campus", "Online", "Distance", "Hybrid"];

adminImportRouter.get(
  "/colleges/template",
  requirePermission("content:publish"),
  asyncHandler(async (_req, res) => {
    const rows = [
      COLLEGE_COLS,
      ["example-institute-of-technology", "Example Institute of Technology", "Engineering", "Pune", "Maharashtra", "Pune, Maharashtra", "Private", "Campus",
        "₹6.5 L", "650000", "₹7.2 LPA", "JEE Main", "1998", "https://example.edu", "AICTE|NAAC A", "Savitribai Phule Pune University", "AICTE", "", "Private engineering college in Pune.", "", "", "yes"],
    ];
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="colleges-template.csv"');
    res.send("﻿" + rows.map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",")).join("\r\n") + "\r\n");
  }),
);

/**
 * POST /api/admin/import/colleges { csv, dryRun } — update colleges by slug (blank
 * cells keep the current value) or create new ones (name, stream and city needed;
 * a missing city is created).
 */
adminImportRouter.post(
  "/colleges",
  requirePermission("content:publish"),
  asyncHandler(async (req, res) => {
    const { csv, dryRun } = z.object({ csv: z.string().min(1).max(10_000_000), dryRun: z.boolean().default(true) }).parse(req.body);
    let records: Record<string, string>[];
    try {
      records = parseCsv(csv, { columns: (h: string[]) => h.map((c) => c.trim().toLowerCase()), skip_empty_lines: true, bom: true, relax_column_count: true, trim: true });
    } catch (e) {
      throw new HttpError(400, `Couldn't read the CSV: ${e instanceof Error ? e.message : "parse error"}`);
    }
    if (!records.length) throw new HttpError(400, "The CSV has no rows.");
    if (!("slug" in records[0]) && !("name" in records[0])) throw new HttpError(400, "The CSV needs a slug or name column — download the template.");

    const [streams, cities] = await Promise.all([prisma.stream.findMany(), prisma.city.findMany()]);
    const findStream = (v: string) => streams.find((s) => s.name.toLowerCase() === v.toLowerCase() || s.slug === slugify(v));
    const findCity = (v: string) => cities.find((c) => c.name.toLowerCase() === v.toLowerCase() || c.slug === slugify(v));

    const errors: { row: number; slug: string; error: string }[] = [];
    const seen = new Set<string>();
    type Plan = { row: number; slug: string; name: string; action: "create" | "update"; data: Prisma.CollegeUncheckedUpdateInput; newCity?: { name: string; state: string | null } };
    const plan: Plan[] = [];

    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      const row = i + 2;
      const slug = slugify(r.slug || r.name || "");
      if (!slug) { errors.push({ row, slug: "", error: "Needs a slug or name" }); continue; }
      if (seen.has(slug)) { errors.push({ row, slug, error: "Duplicate slug in the file" }); continue; }
      seen.add(slug);
      const existing = await prisma.college.findUnique({ where: { slug }, select: { id: true, name: true } });
      const data: Prisma.CollegeUncheckedUpdateInput = {};
      const bad = (error: string) => errors.push({ row, slug, error });
      const num = (v: string, field: string) => { const n = Number(v.replace(/[,\s]/g, "")); if (!Number.isFinite(n)) { bad(`${field} must be a number`); return undefined; } return Math.round(n); };

      if (r.name) data.name = r.name;
      if (r.stream) { const s = findStream(r.stream); if (!s) { bad(`Unknown stream “${r.stream}”`); continue; } data.streamId = s.id; }
      let newCity: Plan["newCity"];
      if (r.city) {
        const c = findCity(r.city);
        if (c) data.cityId = c.id; else newCity = { name: r.city, state: r.state || null };
      }
      if (r.state) data.state = r.state;
      if (r.location) data.location = r.location;
      if (r.type) { const t = TYPES.find((x) => x.toLowerCase() === r.type.toLowerCase()); if (!t) { bad(`type must be one of ${TYPES.join(", ")}`); continue; } data.type = t; }
      if (r.mode) { const m = MODES.find((x) => x.toLowerCase() === r.mode.toLowerCase()); if (!m) { bad(`mode must be one of ${MODES.join(", ")}`); continue; } data.mode = m; }
      if (r.fees_label) data.feesLabel = r.fees_label;
      if (r.fees_num) data.feesNum = num(r.fees_num, "fees_num");
      if (r.package_label) data.packageLabel = r.package_label;
      if (r.exam_name) data.examName = r.exam_name;
      if (r.estd) data.estd = num(r.estd, "estd");
      if (r.nirf_rank) data.nirfRank = num(r.nirf_rank, "nirf_rank");
      if (r.website) data.website = r.website;
      if (r.approvals) data.approvals = r.approvals.split("|").map((x) => x.trim()).filter(Boolean);
      if (r.affiliation) data.affiliation = r.affiliation;
      if (r.approved_by) data.approvedBy = r.approved_by;
      if (r.about) data.about = r.about;
      if (r.meta_title) data.metaTitle = r.meta_title;
      if (r.meta_description) data.metaDescription = r.meta_description;
      if (r.published) {
        const p = r.published.toLowerCase();
        if (!["yes", "no", "true", "false", "1", "0"].includes(p)) { bad("published must be yes or no"); continue; }
        data.published = ["yes", "true", "1"].includes(p);
      }
      if (errors.some((e) => e.row === row)) continue;
      if (!existing) {
        if (!r.name || !r.stream || !r.city) { bad("New colleges need name, stream and city"); continue; }
      }
      plan.push({ row, slug, name: r.name || existing?.name || slug, action: existing ? "update" : "create", data, newCity });
    }

    if (!dryRun && !errors.length) {
      const touchedStreams = new Set<number>(), touchedCities = new Set<number>();
      for (const p of plan) {
        if (p.newCity) {
          const slug = slugify(p.newCity.name);
          const city = await prisma.city.upsert({ where: { slug }, create: { name: p.newCity.name, slug, state: p.newCity.state }, update: {} });
          p.data.cityId = city.id;
        }
        if (p.action === "update") {
          const before = await prisma.college.findUnique({ where: { slug: p.slug }, select: { streamId: true, cityId: true } });
          const c = await prisma.college.update({ where: { slug: p.slug }, data: { ...p.data, source: "csv:admin-import", lastSyncedAt: new Date() } });
          [before?.streamId, c.streamId].forEach((x) => x && touchedStreams.add(x));
          [before?.cityId, c.cityId].forEach((x) => x && touchedCities.add(x));
        } else {
          const d = p.data as Prisma.CollegeUncheckedCreateInput & Record<string, unknown>;
          const city = await prisma.city.findUnique({ where: { id: Number(d.cityId) } });
          const c = await prisma.college.create({
            data: {
              ...d, slug: p.slug, name: String(d.name), streamId: Number(d.streamId), cityId: Number(d.cityId),
              location: (d.location as string | undefined) ?? [city?.name, d.state ?? city?.state].filter(Boolean).join(", "),
              state: (d.state as string | undefined) ?? city?.state ?? null,
              source: "csv:admin-import", lastSyncedAt: new Date(),
            },
          });
          touchedStreams.add(c.streamId); touchedCities.add(c.cityId);
        }
      }
      // Keep listing counts right.
      for (const id of touchedStreams) await prisma.stream.update({ where: { id }, data: { collegeCount: await prisma.college.count({ where: { streamId: id, published: true } }) } });
      for (const id of touchedCities) await prisma.city.update({ where: { id }, data: { collegeCount: await prisma.college.count({ where: { cityId: id, published: true } }) } });
      invalidateInventory();
      revalidateWeb({ paths: ["/colleges", "/", ...plan.map((p) => `/colleges/${p.slug}`)], tags: ["seo-settings"] });
    }
    res.json({
      rows: records.length,
      create: plan.filter((p) => p.action === "create").length,
      update: plan.filter((p) => p.action === "update").length,
      newCities: [...new Set(plan.filter((p) => p.newCity).map((p) => p.newCity!.name))],
      applied: !dryRun && !errors.length,
      errors,
      sample: plan.slice(0, 100).map(({ row, slug, name, action }) => ({ row, slug, name, action })),
    });
  }),
);
