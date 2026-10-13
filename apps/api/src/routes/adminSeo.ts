/**
 * Admin SEO panel API (mounted at /api/admin/seo behind CMS sign-in; each route
 * also checks a role permission — see lib/adminAuth.ts):
 * dashboard, per-page SEO overrides, bulk edits/templates/find-replace, CSV
 * import/export, slug changes, redirects, 404 log and robots/sitemap settings.
 */
import { Router } from "express";
import { Prisma, type Redirect, type SeoMeta } from "@prisma/client";
import { parse as parseCsv } from "csv-parse/sync";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { revalidateWeb } from "../lib/revalidate";
import {
  applyTemplate, getInventory, getSeoSettings, invalidateInventory, isExternalUrl, isReservedPath,
  normalizePath, pageIssues, pathType, recordUrlChange, robotsWarnings, SITE_URL, SITEMAP_SECTIONS,
  type InventoryPage, type Issue, type PageType,
} from "../lib/seo";
import {
  csvImportSchema, redirectSchema, seoBulkSchema, seoListQuerySchema, seoPageSchema, seoReplaceSchema,
  seoSettingsSchema, seoTemplateSchema, slugChangeSchema, type SeoListQuery,
} from "../lib/validation";
import { displayStatus, liveNewsWhere } from "../lib/content";
import { can, requirePermission } from "../lib/adminAuth";
import { baseline, snapshot } from "../lib/revisions";

export const adminSeoRouter = Router();

const TEXT_FIELDS = [
  "title", "description", "keyword", "canonical", "ogTitle", "ogDescription", "ogImage",
  "twitterTitle", "twitterDescription", "customSchema",
] as const;
const BOOL_FIELDS = ["noindex", "nofollow", "excludeFromSitemap", "disableSchema", "urlLocked"] as const;
export type SeoFields = Pick<SeoMeta, (typeof TEXT_FIELDS)[number] | (typeof BOOL_FIELDS)[number]>;

const EMPTY_FIELDS: SeoFields = {
  title: null, description: null, keyword: null, canonical: null, ogTitle: null, ogDescription: null,
  ogImage: null, twitterTitle: null, twitterDescription: null, customSchema: null,
  noindex: false, nofollow: false, excludeFromSitemap: false, disableSchema: false, urlLocked: false,
};

// What a Content Editor may change on a page (seo:basic); the rest needs seo:advanced.
const BASIC_FIELDS = ["title", "description", "keyword", "ogTitle", "ogDescription", "ogImage", "twitterTitle", "twitterDescription"] as const;

const isEmptyRow = (f: SeoFields) =>
  TEXT_FIELDS.every((k) => !f[k]) && BOOL_FIELDS.every((k) => !f[k]);

export const pickFields = (row: SeoMeta | null): SeoFields =>
  row ? (Object.fromEntries([...TEXT_FIELDS, ...BOOL_FIELDS].map((k) => [k, row[k]])) as SeoFields) : { ...EMPTY_FIELDS };

/** Upsert one override row; an all-empty row is deleted instead (page falls back to defaults). */
export function writeSeo(path: string, fields: SeoFields) {
  if (isEmptyRow(fields)) return prisma.seoMeta.deleteMany({ where: { path } });
  return prisma.seoMeta.upsert({ where: { path }, create: { path, ...fields }, update: fields });
}

/** Run writes in chunks so a 10k-row bulk edit doesn't build one giant transaction. */
async function inChunks<T>(items: T[], fn: (item: T) => Prisma.PrismaPromise<unknown>, size = 200) {
  for (let i = 0; i < items.length; i += size) {
    await prisma.$transaction(items.slice(i, i + size).map(fn));
  }
}

async function overridesByPath() {
  const rows = await prisma.seoMeta.findMany();
  return new Map(rows.map((r) => [r.path, r]));
}

function requirePath(input: unknown): string {
  const path = normalizePath(String(input ?? ""));
  if (!path) throw new HttpError(400, "Enter a site path like /colleges/iit-bombay (or a full URL on this site).");
  if (isReservedPath(path)) throw new HttpError(400, `${path} is a system path and can't be managed here.`);
  return path;
}

// ─────────────────────────────────────────────────────────────
// Listing & filtering
// ─────────────────────────────────────────────────────────────

interface ListedPage {
  path: string;
  type: PageType | "other";
  name: string;
  title: string | null;
  titleSource: "custom" | "default" | "auto";
  description: string | null;
  descriptionSource: "custom" | "default" | "auto";
  keyword: string | null;
  canonical: string | null;
  noindex: boolean;
  nofollow: boolean;
  excludeFromSitemap: boolean;
  urlLocked: boolean;
  hasOverride: boolean;
  image: string | null;
  updatedAt: string | null;
  issues: Issue[];
}

function toListed(page: InventoryPage | null, path: string, o: SeoMeta | null): ListedPage {
  const p = page ?? {
    path, type: pathType(path), name: path, defaultTitle: null, defaultDescription: null, image: null, updatedAt: null,
  };
  const updated = [p.updatedAt, o?.updatedAt].filter(Boolean).sort((a, b) => +b! - +a!)[0] ?? null;
  return {
    path,
    type: p.type,
    name: p.name,
    title: o?.title || p.defaultTitle,
    titleSource: o?.title ? "custom" : p.defaultTitle ? "default" : "auto",
    description: o?.description || p.defaultDescription,
    descriptionSource: o?.description ? "custom" : p.defaultDescription ? "default" : "auto",
    keyword: o?.keyword ?? null,
    canonical: o?.canonical ?? null,
    noindex: o?.noindex ?? false,
    nofollow: o?.nofollow ?? false,
    excludeFromSitemap: o?.excludeFromSitemap ?? false,
    urlLocked: o?.urlLocked ?? false,
    hasOverride: !!o,
    image: o?.ogImage || p.image,
    updatedAt: updated ? updated.toISOString() : null,
    issues: pageIssues({ type: p.type === "other" ? "static" : p.type, defaultTitle: p.defaultTitle, defaultDescription: p.defaultDescription, image: p.image }, o),
  };
}

/** Every page (inventory + override-only paths) matching a list filter, unpaginated. */
async function filterPages(q: Partial<SeoListQuery>): Promise<{ items: ListedPage[]; pages: Map<string, InventoryPage> }> {
  const [inventory, overrides] = await Promise.all([getInventory(), overridesByPath()]);
  const pages = new Map(inventory.map((p) => [p.path, p]));
  const all: ListedPage[] = inventory.map((p) => toListed(p, p.path, overrides.get(p.path) ?? null));
  for (const [path, o] of overrides) if (!pages.has(path)) all.push(toListed(null, path, o));

  const needle = q.q?.toLowerCase();
  const since = q.updatedWithin ? Date.now() - q.updatedWithin * 86_400_000 : null;
  const items = all.filter((p) => {
    if (q.type && p.type !== q.type) return false;
    if (q.index === "noindex" && !p.noindex) return false;
    if (q.index === "index" && p.noindex) return false;
    if (needle && !(p.path.toLowerCase().includes(needle) || p.name.toLowerCase().includes(needle) || (p.title ?? "").toLowerCase().includes(needle))) return false;
    if (q.issue === "has-override" && !p.hasOverride) return false;
    if (q.issue === "no-override" && p.hasOverride) return false;
    if (q.issue && q.issue !== "has-override" && q.issue !== "no-override" && !p.issues.includes(q.issue)) return false;
    if (since && (!p.updatedAt || Date.parse(p.updatedAt) < since)) return false;
    return true;
  });

  if (q.sort === "updated") items.sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
  else items.sort((a, b) => a.path.localeCompare(b.path));
  return { items, pages };
}

/** GET /api/admin/seo/pages — filtered, paginated page list with SEO status. */
adminSeoRouter.get(
  "/pages",
  requirePermission("seo:basic"),
  asyncHandler(async (req, res) => {
    const q = seoListQuerySchema.parse(req.query);
    const { items } = await filterPages(q);
    const start = (q.page - 1) * q.pageSize;
    res.json({
      items: items.slice(start, start + q.pageSize),
      total: items.length,
      page: q.page,
      totalPages: Math.max(1, Math.ceil(items.length / q.pageSize)),
    });
  }),
);

// ─────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────

/** GET /api/admin/seo/dashboard — content snapshot, SEO health and recent changes. */
adminSeoRouter.get(
  "/dashboard",
  requirePermission("seo:basic"),
  asyncHandler(async (_req, res) => {
    const [{ items }, collegeCounts, newsCount, redirectCounts, open404, recentSeo, recentColleges, recentRedirects, top404] =
      await Promise.all([
        filterPages({}),
        prisma.college.groupBy({ by: ["published"], _count: { _all: true } }),
        prisma.newsArticle.count(),
        prisma.redirect.groupBy({ by: ["enabled"], _count: { _all: true } }),
        prisma.notFoundLog.count({ where: { resolved: false } }),
        prisma.seoMeta.findMany({ orderBy: { updatedAt: "desc" }, take: 8, select: { path: true, updatedAt: true } }),
        prisma.college.findMany({ orderBy: { updatedAt: "desc" }, take: 8, select: { name: true, slug: true, updatedAt: true } }),
        prisma.redirect.findMany({ orderBy: { createdAt: "desc" }, take: 8, select: { fromPath: true, toPath: true, statusCode: true, createdAt: true } }),
        prisma.notFoundLog.findMany({ where: { resolved: false }, orderBy: { hits: "desc" }, take: 8, select: { id: true, path: true, hits: true, lastSeen: true } }),
      ]);
    const articles = await prisma.newsArticle.findMany({
      where: { OR: [{ status: { in: ["DRAFT", "IN_REVIEW"] } }, { status: "PUBLISHED", publishAt: { gt: new Date() } }, { pendingData: { not: Prisma.DbNull } }] },
      select: { id: true, title: true, status: true, publishAt: true, unpublishAt: true, pendingData: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    const scheduled = articles.filter((a) => displayStatus(a) === "scheduled");

    const byType: Record<string, number> = {};
    const health: Record<string, number> = {};
    let overrides = 0, noindex = 0, excluded = 0;
    for (const p of items) {
      byType[p.type] = (byType[p.type] ?? 0) + 1;
      for (const i of p.issues) health[i] = (health[i] ?? 0) + 1;
      if (p.hasOverride) overrides++;
      if (p.noindex) noindex++;
      if (p.excludeFromSitemap) excluded++;
    }

    res.json({
      totals: {
        pages: items.length, byType, overrides, noindex, excludedFromSitemap: excluded,
        redirects: redirectCounts.reduce((n, r) => n + r._count._all, 0),
        redirectsDisabled: redirectCounts.find((r) => !r.enabled)?._count._all ?? 0,
        notFoundOpen: open404,
      },
      content: {
        collegesPublished: collegeCounts.find((c) => c.published)?._count._all ?? 0,
        collegesDraft: collegeCounts.find((c) => !c.published)?._count._all ?? 0,
        news: newsCount,
      },
      health,
      recentSeo,
      recentContent: recentColleges.map((c) => ({ name: c.name, path: `/colleges/${c.slug}`, updatedAt: c.updatedAt })),
      recentRedirects,
      top404,
      workflow: {
        drafts: articles.filter((a) => a.status === "DRAFT").length,
        inReview: articles.filter((a) => a.status === "IN_REVIEW").length,
        pendingChanges: articles.filter((a) => a.pendingData).length,
        scheduled: scheduled.map((a) => ({ id: a.id, title: a.title, publishAt: a.publishAt })),
        awaitingReview: articles.filter((a) => a.status === "IN_REVIEW" || a.pendingData).slice(0, 8).map((a) => ({ id: a.id, title: a.title, updatedAt: a.updatedAt, pending: !!a.pendingData })),
      },
    });
  }),
);

// ─────────────────────────────────────────────────────────────
// One page
// ─────────────────────────────────────────────────────────────

interface Checked { fields: SeoFields; errors: string[]; warnings: string[] }

/** Validate and normalise an override before saving. */
async function checkFields(path: string, input: SeoFields): Promise<Checked> {
  const fields = { ...input };
  const errors: string[] = [];
  const warnings: string[] = [];

  if (fields.canonical) {
    if (isExternalUrl(fields.canonical)) {
      warnings.push("The canonical URL points to another website — this page will drop out of Google in favour of it.");
    } else {
      const target = normalizePath(fields.canonical);
      if (!target) errors.push("Canonical must be a path on this site (/colleges/…) or a full https:// URL.");
      else if (target === path) fields.canonical = null; // self-referencing is already the default
      else {
        fields.canonical = target;
        const [redirect, targetSeo, inventory] = await Promise.all([
          prisma.redirect.findFirst({ where: { fromPath: target, enabled: true } }),
          prisma.seoMeta.findUnique({ where: { path: target } }),
          getInventory(),
        ]);
        if (redirect) warnings.push(`The canonical URL ${target} redirects to ${redirect.toPath} — point the canonical at the final URL.`);
        if (targetSeo?.noindex) warnings.push(`The canonical URL ${target} is set to noindex, so neither page will be indexed.`);
        if (targetSeo?.canonical) warnings.push(`The canonical URL ${target} has its own canonical (${targetSeo.canonical}) — avoid canonical chains.`);
        if (pathType(target) !== "other" && !inventory.some((p) => p.path === target)) {
          warnings.push(`The canonical URL ${target} doesn't match any published page.`);
        }
      }
    }
  }

  if (fields.ogImage && !/^(https?:\/\/|\/)/i.test(fields.ogImage)) {
    errors.push("Social image must be a full https:// URL or a path starting with /.");
  }

  if (fields.customSchema) {
    try {
      const parsed = JSON.parse(fields.customSchema);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      if (!nodes.length || nodes.some((n) => typeof n !== "object" || n === null)) {
        errors.push("Custom schema must be a JSON object or an array of objects.");
      } else {
        if (nodes.some((n) => !n["@type"])) warnings.push("Every schema object should have an \"@type\" (e.g. \"Course\").");
        if (nodes.some((n) => !n["@context"])) warnings.push("Add \"@context\": \"https://schema.org\" to each schema object.");
        fields.customSchema = JSON.stringify(parsed, null, 2);
      }
    } catch (e) {
      errors.push(`Custom schema isn't valid JSON: ${e instanceof Error ? e.message : "parse error"}`);
    }
  }

  return { fields, errors, warnings };
}

/** GET /api/admin/seo/page?path= — override, defaults and related redirects for one URL. */
adminSeoRouter.get(
  "/page",
  requirePermission("seo:basic"),
  asyncHandler(async (req, res) => {
    const path = requirePath(req.query.path);
    const [inventory, override, redirectedAway, incoming] = await Promise.all([
      getInventory(),
      prisma.seoMeta.findUnique({ where: { path } }),
      prisma.redirect.findFirst({ where: { fromPath: path } }),
      prisma.redirect.findMany({ where: { toPath: path }, select: { id: true, fromPath: true, statusCode: true } }),
    ]);
    const page = inventory.find((p) => p.path === path) ?? null;
    const type = page?.type ?? pathType(path);
    res.json({
      path,
      url: `${SITE_URL}${path}`,
      type,
      name: page?.name ?? path,
      exists: !!page || type === "other",
      defaults: { title: page?.defaultTitle ?? null, description: page?.defaultDescription ?? null, image: page?.image ?? null },
      override: override ? pickFields(override) : null,
      updatedAt: override?.updatedAt ?? null,
      slugEditable: (type === "college" || type === "news") && !!page,
      redirectedAway,
      incoming,
      tokens: page?.tokens ?? {},
    });
  }),
);

/** PUT /api/admin/seo/page — save the override for one URL (empty → reset to defaults). */
adminSeoRouter.put(
  "/page",
  requirePermission("seo:basic"),
  asyncHandler(async (req, res) => {
    const { path: rawPath, ...input } = seoPageSchema.parse(req.body);
    const path = requirePath(rawPath);
    const existing = await prisma.seoMeta.findUnique({ where: { path } });
    const merged: SeoFields = can(req.admin, "seo:advanced")
      ? input
      : { ...pickFields(existing), ...Object.fromEntries(BASIC_FIELDS.map((k) => [k, input[k]])) };
    const { fields, errors, warnings } = await checkFields(path, merged);
    if (errors.length) return res.status(400).json({ error: errors[0], errors, warnings });
    await baseline("seo", path, async () => (existing ? pickFields(existing) : null));
    await writeSeo(path, fields);
    await snapshot("seo", path, fields, "Saved SEO settings", req);
    revalidateWeb({ paths: [path], tags: ["seo-settings"] });
    const row = await prisma.seoMeta.findUnique({ where: { path } });
    res.json({ override: row ? pickFields(row) : null, updatedAt: row?.updatedAt ?? null, warnings });
  }),
);

/** DELETE /api/admin/seo/page?path= — remove all overrides for one URL. */
adminSeoRouter.delete(
  "/page",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const path = requirePath(req.query.path);
    const existing = await prisma.seoMeta.findUnique({ where: { path } });
    await baseline("seo", path, async () => (existing ? pickFields(existing) : null));
    await prisma.seoMeta.deleteMany({ where: { path } });
    await snapshot("seo", path, { ...EMPTY_FIELDS }, "Reset to defaults", req);
    revalidateWeb({ paths: [path], tags: ["seo-settings"] });
    res.json({ ok: true });
  }),
);

// ─────────────────────────────────────────────────────────────
// Bulk operations
// ─────────────────────────────────────────────────────────────

/** POST /api/admin/seo/bulk — apply one action to many URLs. */
adminSeoRouter.post(
  "/bulk",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const { paths: rawPaths, filter, action, value } = seoBulkSchema.parse(req.body);
    if (!rawPaths?.length && !filter) throw new HttpError(400, "Choose pages (select rows, or apply to the current filter).");
    const source = rawPaths?.length ? rawPaths : (await filterPages(filter ?? {})).items.map((p) => p.path);
    const paths = [...new Set(source.map((p) => normalizePath(p)).filter((p): p is string => !!p && !isReservedPath(p)))];
    let canonical: string | null = null;
    if (action === "set-canonical") {
      if (!value) throw new HttpError(400, "Enter the canonical URL to set.");
      canonical = isExternalUrl(value) ? value : normalizePath(value);
      if (!canonical) throw new HttpError(400, "Canonical must be a path on this site or a full https:// URL.");
    }

    const existing = await prisma.seoMeta.findMany({ where: { path: { in: paths } } });
    const byPath = new Map(existing.map((r) => [r.path, r]));
    const patch: Partial<SeoFields> = {
      noindex: { noindex: true }, index: { noindex: false }, nofollow: { nofollow: true }, follow: { nofollow: false },
      "exclude-sitemap": { excludeFromSitemap: true }, "include-sitemap": { excludeFromSitemap: false },
      "set-canonical": { canonical }, "clear-canonical": { canonical: null }, lock: { urlLocked: true },
      unlock: { urlLocked: false }, reset: EMPTY_FIELDS,
    }[action];

    await inChunks(paths, (path) => {
      // A canonical pointing at the page itself is just the default.
      const own = action === "set-canonical" && canonical === path ? { canonical: null } : {};
      return writeSeo(path, { ...pickFields(byPath.get(path) ?? null), ...patch, ...own }) as Prisma.PrismaPromise<unknown>;
    });
    revalidateWeb({ paths, tags: ["seo-settings"] });
    res.json({ updated: paths.length });
  }),
);

/** Pages a template/bulk request targets: explicit paths, or everything matching a list filter. */
async function targetPages(paths: string[] | undefined, filter: Partial<SeoListQuery> | undefined) {
  const { items, pages } = await filterPages(filter ?? {});
  if (!paths?.length) return { items, pages };
  const wanted = new Set(paths.map((p) => normalizePath(p)).filter(Boolean));
  return { items: items.filter((p) => wanted.has(p.path)), pages };
}

/**
 * POST /api/admin/seo/template — set titles or descriptions from a template such as
 * "{name} {city}: Fees, Admission {year}". dryRun (default) returns a preview.
 */
adminSeoRouter.post(
  "/template",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const { paths, filter, field, template, onlyEmpty, dryRun } = seoTemplateSchema.parse(req.body);
    if (!paths?.length && !filter) throw new HttpError(400, "Choose pages (select rows, or apply to the current filter).");
    const { items, pages } = await targetPages(paths, filter);
    const overrides = await prisma.seoMeta.findMany({ where: { path: { in: items.map((i) => i.path) } } });
    const byPath = new Map(overrides.map((r) => [r.path, r]));

    const changes: { path: string; before: string | null; after: string }[] = [];
    for (const item of items) {
      const page = pages.get(item.path);
      if (!page) continue; // template tokens need an inventory page
      const current = byPath.get(item.path)?.[field] ?? null;
      if (onlyEmpty && current) continue;
      const after = applyTemplate(template, page.tokens);
      if (after && after !== current) changes.push({ path: item.path, before: current ?? (field === "title" ? item.title : item.description), after });
    }

    if (!dryRun) {
      await inChunks(changes, (c) => writeSeo(c.path, { ...pickFields(byPath.get(c.path) ?? null), [field]: c.after }) as Prisma.PrismaPromise<unknown>);
      revalidateWeb({ paths: changes.map((c) => c.path) });
    }
    res.json({ count: changes.length, applied: !dryRun, sample: changes.slice(0, 50) });
  }),
);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * POST /api/admin/seo/replace — find & replace text in custom SEO fields, and in
 * colleges' built-in meta title/description (e.g. "2025" → "2026"). Locked pages
 * are skipped unless includeLocked is set.
 */
adminSeoRouter.post(
  "/replace",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const { find, replace, fields, matchCase, includeLocked, dryRun } = seoReplaceSchema.parse(req.body);
    const re = new RegExp(escapeRe(find), matchCase ? "g" : "gi");
    const mode = matchCase ? undefined : ("insensitive" as const);

    const rows = await prisma.seoMeta.findMany({
      where: { OR: fields.map((f) => ({ [f]: { contains: find, mode } })) },
    });
    const changes: { path: string; field: string; before: string; after: string; target: "override" | "college" }[] = [];
    const overridePaths = new Set(rows.map((r) => r.path));
    const lockedSkipped: string[] = [];
    for (const r of rows) {
      if (r.urlLocked && !includeLocked) { lockedSkipped.push(r.path); continue; }
      for (const f of fields) {
        const before = r[f];
        if (before && re.test(before)) changes.push({ path: r.path, field: f, before, after: before.replace(re, replace), target: "override" });
        re.lastIndex = 0;
      }
    }

    // Colleges' own meta title/description, where no override hides them.
    const collegeFields = fields.filter((f): f is "title" | "description" => f === "title" || f === "description");
    if (collegeFields.length) {
      const colleges = await prisma.college.findMany({
        where: {
          published: true,
          OR: collegeFields.map((f) => ({ [f === "title" ? "metaTitle" : "metaDescription"]: { contains: find, mode } })),
        },
        select: { id: true, slug: true, metaTitle: true, metaDescription: true },
      });
      for (const c of colleges) {
        const path = `/colleges/${c.slug}`;
        for (const f of collegeFields) {
          const override = rows.find((r) => r.path === path)?.[f];
          if (override) continue; // the override is what's shown, handled above
          const before = f === "title" ? c.metaTitle : c.metaDescription;
          if (before && re.test(before)) changes.push({ path, field: f, before, after: before.replace(re, replace), target: "college" });
          re.lastIndex = 0;
        }
      }
    }

    if (!dryRun && changes.length) {
      const byRow = new Map<string, Partial<SeoFields>>();
      for (const c of changes.filter((c) => c.target === "override")) {
        byRow.set(c.path, { ...(byRow.get(c.path) ?? {}), [c.field]: c.after });
      }
      await inChunks([...byRow], ([path, patch]) => prisma.seoMeta.update({ where: { path }, data: patch }));
      const collegeChanges = changes.filter((c) => c.target === "college");
      await inChunks(collegeChanges, (c) =>
        prisma.college.update({
          where: { slug: c.path.slice("/colleges/".length) },
          data: { [c.field === "title" ? "metaTitle" : "metaDescription"]: c.after },
        }),
      );
      if (collegeChanges.length) invalidateInventory();
      revalidateWeb({ paths: [...new Set([...overridePaths, ...changes.map((c) => c.path)])] });
    }
    res.json({ count: changes.length, applied: !dryRun, lockedSkipped: lockedSkipped.length, sample: changes.slice(0, 100) });
  }),
);

// ─────────────────────────────────────────────────────────────
// Slug (URL) changes
// ─────────────────────────────────────────────────────────────

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 200);

/**
 * POST /api/admin/seo/change-slug { path, newSlug } — rename a college or news URL.
 * Moves its SEO overrides, adds a 301 from the old URL (covering college tab pages)
 * and repoints existing redirects so no chains are left behind.
 */
adminSeoRouter.post(
  "/change-slug",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const body = slugChangeSchema.parse(req.body);
    const oldPath = requirePath(body.path);
    const type = pathType(oldPath);
    if (type !== "college" && type !== "news") throw new HttpError(400, "Only college and news URLs can be renamed here.");
    const newSlug = slugify(body.newSlug);
    if (!newSlug) throw new HttpError(400, "The new slug needs at least one letter or number.");
    const prefix = type === "college" ? "/colleges/" : "/news/";
    const oldSlug = oldPath.slice(prefix.length);
    const newPath = `${prefix}${newSlug}`;
    if (newSlug === oldSlug) throw new HttpError(400, "That's already the current slug.");

    const locked = await prisma.seoMeta.findUnique({ where: { path: oldPath }, select: { urlLocked: true } });
    if (locked?.urlLocked) throw new HttpError(423, "This URL is locked. Unlock it in the page's SEO settings first.");

    const clash = type === "college"
      ? await prisma.college.findUnique({ where: { slug: newSlug }, select: { id: true } })
      : await prisma.newsArticle.findUnique({ where: { slug: newSlug }, select: { id: true } });
    if (clash) throw new HttpError(409, `${newPath} is already used by another ${type === "college" ? "college" : "article"}.`);

    await prisma.$transaction(async (tx) => {
      if (type === "college") {
        const c = await tx.college.update({ where: { slug: oldSlug }, data: { slug: newSlug } }).catch(() => null);
        if (!c) throw new HttpError(404, "College not found");
      } else {
        const a = await tx.newsArticle.update({ where: { slug: oldSlug }, data: { slug: newSlug } }).catch(() => null);
        if (!a) throw new HttpError(404, "Article not found");
      }
      // College redirects are prefix redirects so /colleges/old/<tab> follows too.
      await recordUrlChange(tx, oldPath, newPath, type === "college");
    });

    invalidateInventory();
    revalidateWeb({ paths: [oldPath, newPath, prefix === "/news/" ? "/news" : "/colleges"], tags: ["seo-settings"] });
    res.json({ oldPath, newPath });
  }),
);

// ─────────────────────────────────────────────────────────────
// CSV export / import
// ─────────────────────────────────────────────────────────────

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? "" : typeof v === "boolean" ? (v ? "yes" : "no") : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCsv = (rows: unknown[][]) => "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";

function sendCsv(res: import("express").Response, name: string, rows: unknown[][]) {
  const stamp = new Date().toISOString().slice(0, 10);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${name}-${stamp}.csv"`);
  res.send(toCsv(rows));
}

// CSV column → override field. Only columns present in the file are applied.
const CSV_COLUMNS: [string, keyof SeoFields][] = [
  ["title", "title"], ["description", "description"], ["keyword", "keyword"], ["canonical", "canonical"],
  ["noindex", "noindex"], ["nofollow", "nofollow"], ["og_title", "ogTitle"], ["og_description", "ogDescription"],
  ["og_image", "ogImage"], ["twitter_title", "twitterTitle"], ["twitter_description", "twitterDescription"],
  ["exclude_from_sitemap", "excludeFromSitemap"],
];
// Same limits as seoFieldsSchema.
const MAX_LEN: Partial<Record<keyof SeoFields, number>> = {
  title: 200, description: 500, keyword: 120, canonical: 500, ogTitle: 200, ogDescription: 500,
  ogImage: 500, twitterTitle: 200, twitterDescription: 500,
};

/** GET /api/admin/seo/export?…filters — SEO overrides as CSV (blank = page uses its default). */
adminSeoRouter.get(
  "/export",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const q = seoListQuerySchema.parse(req.query);
    const [{ items }, overrides] = await Promise.all([filterPages(q), overridesByPath()]);
    const rows: unknown[][] = [["path", "type", "name", ...CSV_COLUMNS.map(([c]) => c), "current_title", "current_description"]];
    for (const p of items) {
      const o = overrides.get(p.path);
      rows.push([p.path, p.type, p.name, ...CSV_COLUMNS.map(([, f]) => o?.[f] ?? (BOOL_FIELDS.includes(f as never) ? false : "")), p.title ?? "", p.description ?? ""]);
    }
    sendCsv(res, "seo-metadata", rows);
  }),
);

function parseBool(v: string): boolean | null {
  const s = v.trim().toLowerCase();
  if (["", "no", "false", "0", "n"].includes(s)) return false;
  if (["yes", "true", "1", "y"].includes(s)) return true;
  return null;
}

function readCsv(csv: string): Record<string, string>[] {
  try {
    return parseCsv(csv, { columns: (h: string[]) => h.map((c) => c.trim().toLowerCase()), skip_empty_lines: true, bom: true, relax_column_count: true });
  } catch (e) {
    throw new HttpError(400, `Couldn't read the CSV: ${e instanceof Error ? e.message : "parse error"}`);
  }
}

/** POST /api/admin/seo/import { csv, dryRun } — bulk-update overrides from a CSV (see /export for the format). */
adminSeoRouter.post(
  "/import",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const { csv, dryRun } = csvImportSchema.parse(req.body);
    const records = readCsv(csv);
    if (!records.length) throw new HttpError(400, "The CSV has no rows.");
    const header = Object.keys(records[0]);
    if (!header.includes("path")) throw new HttpError(400, "The CSV needs a \"path\" column.");
    const columns = CSV_COLUMNS.filter(([c]) => header.includes(c));
    if (!columns.length) throw new HttpError(400, `No editable columns found. Use any of: ${CSV_COLUMNS.map(([c]) => c).join(", ")}.`);

    const paths = records.map((r) => normalizePath(r.path ?? ""));
    const existing = await prisma.seoMeta.findMany({ where: { path: { in: paths.filter((p): p is string => !!p) } } });
    const byPath = new Map(existing.map((r) => [r.path, r]));

    const seen = new Set<string>();
    const errors: { row: number; path: string; error: string }[] = [];
    const warnings: { row: number; path: string; warning: string }[] = [];
    const changes: { row: number; path: string; fields: SeoFields; diff: Record<string, [unknown, unknown]> }[] = [];

    for (let i = 0; i < records.length; i++) {
      const row = i + 2; // header is row 1
      const raw = records[i].path ?? "";
      const path = paths[i];
      if (!path || isReservedPath(path)) { errors.push({ row, path: raw, error: "Invalid or system path" }); continue; }
      if (seen.has(path)) { errors.push({ row, path, error: "Duplicate path — appears earlier in the file" }); continue; }
      seen.add(path);

      const before = pickFields(byPath.get(path) ?? null);
      const next: SeoFields = { ...before };
      let bad = false;
      for (const [col, field] of columns) {
        const v = (records[i][col] ?? "").trim();
        if (BOOL_FIELDS.includes(field as never)) {
          const b = parseBool(v);
          if (b === null) { errors.push({ row, path, error: `${col}: use yes or no` }); bad = true; break; }
          (next as Record<string, unknown>)[field] = b;
        } else {
          if (v.length > (MAX_LEN[field] ?? 500)) { errors.push({ row, path, error: `${col} is too long (max ${MAX_LEN[field]})` }); bad = true; break; }
          (next as Record<string, unknown>)[field] = v || null;
        }
      }
      if (bad) continue;
      const checked = await checkFields(path, next);
      if (checked.errors.length) { errors.push({ row, path, error: checked.errors[0] }); continue; }
      for (const w of checked.warnings) warnings.push({ row, path, warning: w });

      const diff: Record<string, [unknown, unknown]> = {};
      for (const k of Object.keys(checked.fields) as (keyof SeoFields)[]) {
        if ((before[k] ?? null) !== (checked.fields[k] ?? null)) diff[k] = [before[k], checked.fields[k]];
      }
      if (Object.keys(diff).length) changes.push({ row, path, fields: checked.fields, diff });
    }

    if (!dryRun && !errors.length) {
      await inChunks(changes, (c) => writeSeo(c.path, c.fields) as Prisma.PrismaPromise<unknown>);
      revalidateWeb({ paths: changes.map((c) => c.path), tags: ["seo-settings"] });
    }
    res.json({
      rows: records.length,
      changed: changes.length,
      unchanged: records.length - changes.length - errors.length,
      applied: !dryRun && !errors.length,
      errors: errors.slice(0, 200),
      warnings: warnings.slice(0, 200),
      sample: changes.slice(0, 200).map(({ row, path, diff }) => ({ row, path, diff })),
    });
  }),
);

// ─────────────────────────────────────────────────────────────
// Redirects
// ─────────────────────────────────────────────────────────────

interface RedirectCheck { from: string; to: string; errors: string[]; warnings: string[] }

/** Validate a redirect against the existing set (loops, chains, homepage dumps, live pages). */
async function checkRedirect(fromInput: string, toInput: string, all: Pick<Redirect, "id" | "fromPath" | "toPath" | "enabled">[], ignoreId?: number): Promise<RedirectCheck> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const from = normalizePath(fromInput) ?? "";
  const external = isExternalUrl(toInput);
  const to = external ? toInput.trim() : normalizePath(toInput) ?? "";

  if (!from) errors.push("“From” must be a path on this site, like /old-page.");
  else if (isReservedPath(from)) errors.push(`${from} is a system path and can't be redirected.`);
  else if (from === "/") errors.push("The homepage can't be redirected.");
  if (!to) errors.push("“To” must be a path on this site or a full https:// URL.");
  if (from && to && from === to) errors.push("A URL can't redirect to itself.");
  if (errors.length) return { from, to, errors, warnings };

  const others = all.filter((r) => r.id !== ignoreId && r.enabled);
  const map = new Map(others.map((r) => [r.fromPath, r.toPath]));
  if (!external) {
    // Follow the chain from the target; reaching `from` again is a loop.
    let hop = to;
    const seen = new Set<string>([from]);
    for (let i = 0; i < 20 && map.has(hop); i++) {
      hop = map.get(hop)!;
      if (seen.has(hop)) { errors.push(`This would create a redirect loop (${from} → ${to} → … → ${hop}).`); break; }
      seen.add(hop);
    }
    if (!errors.length && hop !== to) warnings.push(`${to} already redirects to ${hop}. Point straight at ${hop} to avoid a redirect chain.`);
    if (to === "/") warnings.push("Redirecting to the homepage is treated by Google like a 404 — pick the closest matching page if there is one.");
    const inventory = await getInventory();
    if (pathType(to) !== "other" && !inventory.some((p) => p.path === to)) warnings.push(`${to} doesn't match any published page.`);
    if (inventory.some((p) => p.path === from)) warnings.push(`${from} is a live page — visitors will no longer be able to reach it.`);
  }
  const pointingHere = others.filter((r) => r.toPath === from).length;
  if (pointingHere) warnings.push(`${pointingHere} existing redirect(s) point to ${from}; they'll be updated to go straight to ${to}.`);
  return { from, to, errors, warnings };
}

/** Repoint redirects that target `from` at its new destination, so no chains are left. */
const flattenInto = (from: string, to: string) =>
  prisma.redirect.updateMany({ where: { toPath: from, NOT: { fromPath: to } }, data: { toPath: to } });

const resolve404 = (from: string) => prisma.notFoundLog.updateMany({ where: { path: from }, data: { resolved: true } });

/** GET /api/admin/seo/redirects?q=&page= */
adminSeoRouter.get(
  "/redirects",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const q = String(req.query.q || "").trim();
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = 50;
    const where: Prisma.RedirectWhereInput = q
      ? { OR: [{ fromPath: { contains: q, mode: "insensitive" } }, { toPath: { contains: q, mode: "insensitive" } }, { note: { contains: q, mode: "insensitive" } }] }
      : {};
    const [items, total, all] = await Promise.all([
      prisma.redirect.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
      prisma.redirect.count({ where }),
      prisma.redirect.findMany({ where: { enabled: true }, select: { fromPath: true, toPath: true } }),
    ]);
    // Flag chains: the target is itself redirected.
    const sources = new Set(all.map((r) => r.fromPath));
    res.json({
      items: items.map((r) => ({ ...r, chained: sources.has(r.toPath) })),
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  }),
);

/** POST /api/admin/seo/redirects — create (returns warnings; errors block saving). */
adminSeoRouter.post(
  "/redirects",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const data = redirectSchema.parse(req.body);
    const all = await prisma.redirect.findMany({ select: { id: true, fromPath: true, toPath: true, enabled: true } });
    const check = await checkRedirect(data.fromPath, data.toPath, all);
    if (check.errors.length) return res.status(400).json({ error: check.errors[0], ...check });
    if (all.some((r) => r.fromPath === check.from)) throw new HttpError(409, `A redirect from ${check.from} already exists — edit it instead.`);
    const redirect = await prisma.redirect.create({ data: { ...data, fromPath: check.from, toPath: check.to } });
    if (data.enabled) await flattenInto(check.from, check.to);
    await resolve404(check.from);
    res.status(201).json({ redirect, warnings: check.warnings });
  }),
);

/** PUT /api/admin/seo/redirects/:id */
adminSeoRouter.put(
  "/redirects/:id",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const data = redirectSchema.parse(req.body);
    const all = await prisma.redirect.findMany({ select: { id: true, fromPath: true, toPath: true, enabled: true } });
    if (!all.some((r) => r.id === id)) throw new HttpError(404, "Redirect not found");
    const check = await checkRedirect(data.fromPath, data.toPath, all, id);
    if (check.errors.length) return res.status(400).json({ error: check.errors[0], ...check });
    if (all.some((r) => r.id !== id && r.fromPath === check.from)) throw new HttpError(409, `Another redirect from ${check.from} already exists.`);
    const redirect = await prisma.redirect.update({ where: { id }, data: { ...data, fromPath: check.from, toPath: check.to } });
    if (data.enabled) await flattenInto(check.from, check.to);
    res.json({ redirect, warnings: check.warnings });
  }),
);

/** DELETE /api/admin/seo/redirects/:id */
adminSeoRouter.delete(
  "/redirects/:id",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    await prisma.redirect.delete({ where: { id: Number(req.params.id) } }).catch(() => { throw new HttpError(404, "Redirect not found"); });
    res.json({ ok: true });
  }),
);

/** GET /api/admin/seo/redirects/export — all redirects as CSV. */
adminSeoRouter.get(
  "/redirects/export",
  requirePermission("seo:advanced"),
  asyncHandler(async (_req, res) => {
    const items = await prisma.redirect.findMany({ orderBy: { fromPath: "asc" } });
    sendCsv(res, "redirects", [
      ["from", "to", "code", "prefix", "enabled", "note", "hits"],
      ...items.map((r) => [r.fromPath, r.toPath, r.statusCode, r.isPrefix, r.enabled, r.note ?? "", r.hits]),
    ]);
  }),
);

/** POST /api/admin/seo/redirects/import { csv, dryRun } — columns: from, to, code?, prefix?, enabled?, note? */
adminSeoRouter.post(
  "/redirects/import",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const { csv, dryRun } = csvImportSchema.parse(req.body);
    const records = readCsv(csv);
    if (!records.length) throw new HttpError(400, "The CSV has no rows.");
    if (!("from" in records[0]) || !("to" in records[0])) throw new HttpError(400, "The CSV needs \"from\" and \"to\" columns.");

    const all = await prisma.redirect.findMany({ select: { id: true, fromPath: true, toPath: true, enabled: true } });
    const byFrom = new Map(all.map((r) => [r.fromPath, r]));
    // Check each row against existing redirects *plus* the rest of the file.
    const working = [...all];
    const seen = new Set<string>();
    const errors: { row: number; from: string; error: string }[] = [];
    const warnings: { row: number; from: string; warning: string }[] = [];
    const plan: { row: number; action: "create" | "update"; id?: number; data: { fromPath: string; toPath: string; statusCode: number; isPrefix: boolean; enabled: boolean; note: string | null } }[] = [];

    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      const row = i + 2;
      const code = Number(r.code || 301);
      if (code !== 301 && code !== 302) { errors.push({ row, from: r.from, error: "code must be 301 or 302" }); continue; }
      const isPrefix = parseBool(r.prefix ?? "");
      const enabled = r.enabled === undefined || r.enabled.trim() === "" ? true : parseBool(r.enabled);
      if (isPrefix === null || enabled === null) { errors.push({ row, from: r.from, error: "prefix/enabled must be yes or no" }); continue; }
      const existing = byFrom.get(normalizePath(r.from ?? "") ?? "");
      const check = await checkRedirect(r.from ?? "", r.to ?? "", working, existing?.id);
      if (check.errors.length) { errors.push({ row, from: r.from, error: check.errors[0] }); continue; }
      if (seen.has(check.from)) { errors.push({ row, from: check.from, error: "Duplicate “from” — appears earlier in the file" }); continue; }
      seen.add(check.from);
      for (const w of check.warnings) warnings.push({ row, from: check.from, warning: w });
      const data = { fromPath: check.from, toPath: check.to, statusCode: code, isPrefix, enabled, note: r.note?.trim() || null };
      plan.push({ row, action: existing ? "update" : "create", id: existing?.id, data });
      const idx = working.findIndex((w) => w.fromPath === check.from);
      const entry = { id: existing?.id ?? -row, fromPath: check.from, toPath: check.to, enabled };
      if (idx >= 0) working[idx] = entry; else working.push(entry);
    }

    if (!dryRun && !errors.length) {
      await inChunks(plan, (p) =>
        p.action === "update" ? prisma.redirect.update({ where: { id: p.id! }, data: p.data }) : prisma.redirect.create({ data: p.data }),
      );
      for (const p of plan) if (p.data.enabled) await flattenInto(p.data.fromPath, p.data.toPath);
      await prisma.notFoundLog.updateMany({ where: { path: { in: plan.map((p) => p.data.fromPath) } }, data: { resolved: true } });
    }
    res.json({
      rows: records.length,
      create: plan.filter((p) => p.action === "create").length,
      update: plan.filter((p) => p.action === "update").length,
      applied: !dryRun && !errors.length,
      errors: errors.slice(0, 200),
      warnings: warnings.slice(0, 200),
      sample: plan.slice(0, 200).map((p) => ({ row: p.row, action: p.action, from: p.data.fromPath, to: p.data.toPath, code: p.data.statusCode })),
    });
  }),
);

// ─────────────────────────────────────────────────────────────
// 404 log
// ─────────────────────────────────────────────────────────────

/** Closest live pages for a missing URL (college/news slugs by shared words, else the parent page). */
async function suggestFor(path: string, inventory: InventoryPage[]): Promise<{ path: string; name: string }[]> {
  const type = pathType(path);
  const slug = path.split("/").pop() ?? "";
  const words = slug.split(/[-_]+/).filter((w) => w.length > 2 && !/^(and|the|of|for|college|university|institute)$/.test(w));
  if ((type === "college" || type === "news") && words.length) {
    const top = [...words].sort((a, b) => b.length - a.length);
    for (const n of [Math.min(3, top.length), Math.min(2, top.length), 1]) {
      const and = top.slice(0, n).map((w) => ({ slug: { contains: w } }));
      const hits = type === "college"
        ? await prisma.college.findMany({ where: { published: true, AND: and }, select: { slug: true, name: true }, take: 3 })
        : await prisma.newsArticle.findMany({ where: { AND: [...and, liveNewsWhere()] }, select: { slug: true, title: true }, take: 3 });
      if (hits.length) {
        return hits.map((h) => ({
          path: `${type === "college" ? "/colleges" : "/news"}/${h.slug}`,
          name: "name" in h ? h.name : h.title,
        }));
      }
    }
  }
  // Walk up to the nearest existing parent page.
  const parts = path.split("/").filter(Boolean);
  for (let i = parts.length - 1; i > 0; i--) {
    const parent = `/${parts.slice(0, i).join("/")}`;
    const p = inventory.find((x) => x.path === parent);
    if (p) return [{ path: p.path, name: p.name }];
  }
  return [];
}

/** GET /api/admin/seo/404s?resolved=0|1&q= — logged 404 URLs with redirect suggestions. */
adminSeoRouter.get(
  "/404s",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    const resolved = req.query.resolved === "1";
    const q = String(req.query.q || "").trim();
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = 50;
    const where: Prisma.NotFoundLogWhereInput = { resolved, ...(q ? { path: { contains: q, mode: "insensitive" } } : {}) };
    const [rows, total, inventory] = await Promise.all([
      prisma.notFoundLog.findMany({ where, orderBy: [{ hits: "desc" }, { lastSeen: "desc" }], skip: (page - 1) * pageSize, take: pageSize }),
      prisma.notFoundLog.count({ where }),
      getInventory(),
    ]);
    const items = await Promise.all(
      rows.map(async (r) => ({
        ...r,
        internalReferrer: !!r.referrer && /^https?:\/\//i.test(r.referrer) && !isExternalUrl(r.referrer),
        suggestions: resolved ? [] : await suggestFor(r.path, inventory),
      })),
    );
    res.json({ items, total, page, totalPages: Math.max(1, Math.ceil(total / pageSize)) });
  }),
);

/** POST /api/admin/seo/404s/:id/resolve — mark handled (e.g. the link was fixed at its source). */
adminSeoRouter.post(
  "/404s/:id/resolve",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    await prisma.notFoundLog.update({ where: { id: Number(req.params.id) }, data: { resolved: true } }).catch(() => { throw new HttpError(404, "Entry not found"); });
    res.json({ ok: true });
  }),
);

/** DELETE /api/admin/seo/404s/:id — forget one entry; DELETE /404s?resolved=1 clears all resolved. */
adminSeoRouter.delete(
  "/404s/:id",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    await prisma.notFoundLog.delete({ where: { id: Number(req.params.id) } }).catch(() => { throw new HttpError(404, "Entry not found"); });
    res.json({ ok: true });
  }),
);
adminSeoRouter.delete(
  "/404s",
  requirePermission("seo:advanced"),
  asyncHandler(async (req, res) => {
    if (req.query.resolved !== "1") throw new HttpError(400, "Only resolved entries can be cleared in bulk.");
    const { count } = await prisma.notFoundLog.deleteMany({ where: { resolved: true } });
    res.json({ deleted: count });
  }),
);

// ─────────────────────────────────────────────────────────────
// robots.txt & sitemap settings
// ─────────────────────────────────────────────────────────────

/** GET /api/admin/seo/settings */
adminSeoRouter.get(
  "/settings",
  requirePermission("settings:manage"),
  asyncHandler(async (_req, res) => {
    const [settings, excluded] = await Promise.all([
      getSeoSettings(),
      prisma.seoMeta.count({ where: { OR: [{ noindex: true }, { excludeFromSitemap: true }] } }),
    ]);
    res.json({ ...settings, sections: SITEMAP_SECTIONS, excludedPages: excluded, warnings: settings.robotsTxt ? robotsWarnings(settings.robotsTxt) : [] });
  }),
);

/** PUT /api/admin/seo/settings { robotsTxt?, sitemap? } — robotsTxt null resets to the default. */
adminSeoRouter.put(
  "/settings",
  requirePermission("settings:manage"),
  asyncHandler(async (req, res) => {
    const { robotsTxt, sitemap } = seoSettingsSchema.parse(req.body);
    if (robotsTxt !== undefined) {
      if (robotsTxt === null || !robotsTxt.trim()) await prisma.siteSetting.deleteMany({ where: { key: "robots.txt" } });
      else {
        const value = robotsTxt.replace(/\r\n/g, "\n").trim() + "\n";
        await prisma.siteSetting.upsert({ where: { key: "robots.txt" }, create: { key: "robots.txt", value }, update: { value } });
      }
    }
    if (sitemap) {
      const value = JSON.stringify(Object.fromEntries(SITEMAP_SECTIONS.map((s) => [s, sitemap[s] !== false])));
      await prisma.siteSetting.upsert({ where: { key: "sitemap.sections" }, create: { key: "sitemap.sections", value }, update: { value } });
    }
    revalidateWeb({ paths: ["/robots.txt"], tags: ["seo-settings"] });
    const settings = await getSeoSettings();
    res.json({ ...settings, warnings: settings.robotsTxt ? robotsWarnings(settings.robotsTxt) : [] });
  }),
);

/** POST /api/admin/seo/robots-check { robotsTxt } — warnings for a draft before saving. */
adminSeoRouter.post(
  "/robots-check",
  requirePermission("settings:manage"),
  asyncHandler(async (req, res) => {
    const txt = typeof req.body?.robotsTxt === "string" ? req.body.robotsTxt : "";
    res.json({ warnings: robotsWarnings(txt) });
  }),
);
