/**
 * Audit trail: every successful admin change is recorded with who, when and
 * what (a readable summary plus the sanitised request), via auditMutations.
 * Routes can also call audit() directly for events like sign-ins.
 */
import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { clientIp } from "./adminAuth";

export interface AuditEntry {
  action: string;
  summary: string;
  entityType?: string | null;
  entityId?: string | number | null;
  details?: unknown;
}

export async function audit(req: Request, e: AuditEntry, who?: { id: number; email: string } | null) {
  const user = who ?? req.admin ?? null;
  try {
    await prisma.auditLog.create({
      data: {
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
        action: e.action,
        summary: e.summary.slice(0, 500),
        entityType: e.entityType ?? null,
        entityId: e.entityId === undefined || e.entityId === null ? null : String(e.entityId),
        details: e.details === undefined ? Prisma.JsonNull : (e.details as Prisma.InputJsonValue),
        ip: clientIp(req),
      },
    });
  } catch (err) {
    console.error("[audit] failed to write entry", err);
  }
}

// Never store secrets; keep big payloads short.
const SECRET_KEYS = /password|token|secret|code|challenge/i;
function sanitize(v: unknown, depth = 0): unknown {
  if (depth > 4) return "…";
  if (typeof v === "string") return v.length > 400 ? `${v.slice(0, 400)}… (${v.length} chars)` : v;
  if (Array.isArray(v)) return v.length > 20 ? [...v.slice(0, 20).map((x) => sanitize(x, depth + 1)), `… ${v.length - 20} more`] : v.map((x) => sanitize(x, depth + 1));
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>).map(([k, x]) => [
        k,
        SECRET_KEYS.test(k) ? "[hidden]" : k === "csv" && typeof x === "string" ? `[CSV, ${x.split(/\r?\n/).length - 1} rows]` : sanitize(x, depth + 1),
      ]),
    );
  }
  return v;
}

type Describer = (req: Request) => { summary: string; entityType?: string; entityId?: string | number | null };

// [METHOD, route pattern (baseUrl + route.path), action, describe]
const ROUTES: [string, string, string, Describer][] = [
  // SEO
  ["PUT", "/api/admin/seo/page", "seo.page.update", (r) => ({ summary: `Updated SEO for ${r.body?.path}`, entityType: "seo", entityId: r.body?.path })],
  ["DELETE", "/api/admin/seo/page", "seo.page.reset", (r) => ({ summary: `Reset SEO for ${r.query.path}`, entityType: "seo", entityId: String(r.query.path) })],
  ["POST", "/api/admin/seo/bulk", "seo.bulk", (r) => ({ summary: `Bulk “${r.body?.action}” on ${r.body?.paths?.length ? `${r.body.paths.length} page(s)` : "pages matching a filter"}` })],
  ["POST", "/api/admin/seo/template", "seo.template", (r) => ({ summary: `Applied ${r.body?.field} template “${r.body?.template}”` })],
  ["POST", "/api/admin/seo/replace", "seo.replace", (r) => ({ summary: `Replaced “${r.body?.find}” → “${r.body?.replace}” in ${(r.body?.fields ?? []).join(", ")}` })],
  ["POST", "/api/admin/seo/import", "seo.import", () => ({ summary: "Imported SEO metadata from CSV" })],
  ["POST", "/api/admin/seo/change-slug", "url.change", (r) => ({ summary: `Changed URL ${r.body?.path} → …/${r.body?.newSlug}`, entityType: "seo", entityId: r.body?.path })],
  ["POST", "/api/admin/seo/redirects", "redirect.create", (r) => ({ summary: `Added redirect ${r.body?.fromPath} → ${r.body?.toPath}`, entityType: "redirect" })],
  ["PUT", "/api/admin/seo/redirects/:id", "redirect.update", (r) => ({ summary: `Edited redirect ${r.body?.fromPath} → ${r.body?.toPath}${r.body?.enabled === false ? " (disabled)" : ""}`, entityType: "redirect", entityId: r.params.id })],
  ["DELETE", "/api/admin/seo/redirects/:id", "redirect.delete", (r) => ({ summary: `Deleted redirect #${r.params.id}`, entityType: "redirect", entityId: r.params.id })],
  ["POST", "/api/admin/seo/redirects/import", "redirect.import", () => ({ summary: "Imported redirects from CSV" })],
  ["POST", "/api/admin/seo/404s/:id/resolve", "404.resolve", (r) => ({ summary: `Marked 404 #${r.params.id} resolved` })],
  ["DELETE", "/api/admin/seo/404s/:id", "404.delete", (r) => ({ summary: `Deleted 404 entry #${r.params.id}` })],
  ["DELETE", "/api/admin/seo/404s", "404.clear", () => ({ summary: "Cleared resolved 404 entries" })],
  ["PUT", "/api/admin/seo/settings", "settings.update", (r) => ({ summary: r.body?.robotsTxt !== undefined ? (r.body.robotsTxt === null ? "Reset robots.txt to default" : "Updated robots.txt") : "Updated sitemap sections" })],
  // Colleges
  ["POST", "/api/admin/colleges/:id/gallery", "college.gallery.upload", (r) => ({ summary: `Uploaded photos to college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["POST", "/api/admin/colleges/:id/sample-degree", "college.sample_degree", (r) => ({ summary: `Uploaded sample degree for college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["DELETE", "/api/admin/gallery/:id", "college.gallery.delete", (r) => ({ summary: `Deleted gallery photo #${r.params.id}` })],
  ["PUT", "/api/admin/colleges/:id/gallery/order", "college.gallery.reorder", (r) => ({ summary: `Reordered photos of college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["POST", "/api/admin/colleges/:id/publish", "college.publish", (r) => ({ summary: `${r.body?.published ? "Published" : "Unpublished"} college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["POST", "/api/admin/colleges/:id/sections", "college.section.create", (r) => ({ summary: `Added section “${r.body?.heading}” to college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["PUT", "/api/admin/sections/:id", "college.section.update", (r) => ({ summary: `Edited section #${r.params.id}` })],
  ["DELETE", "/api/admin/sections/:id", "college.section.delete", (r) => ({ summary: `Deleted section #${r.params.id}` })],
  ["POST", "/api/admin/colleges/:id/highlights", "college.highlight.create", (r) => ({ summary: `Added highlight to college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["PUT", "/api/admin/highlights/:id", "college.highlight.update", (r) => ({ summary: `Edited highlight #${r.params.id}` })],
  ["DELETE", "/api/admin/highlights/:id", "college.highlight.delete", (r) => ({ summary: `Deleted highlight #${r.params.id}` })],
  ["POST", "/api/admin/colleges/:id/courses", "college.course.create", (r) => ({ summary: `Added course “${r.body?.name}” to college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["PUT", "/api/admin/courses/:id", "college.course.update", (r) => ({ summary: `Edited course #${r.params.id}` })],
  ["DELETE", "/api/admin/courses/:id", "college.course.delete", (r) => ({ summary: `Deleted course #${r.params.id}` })],
  ["POST", "/api/admin/colleges/:id/faqs", "college.faq.create", (r) => ({ summary: `Added FAQ to college #${r.params.id}`, entityType: "college", entityId: r.params.id })],
  ["PUT", "/api/admin/faqs/:id", "college.faq.update", (r) => ({ summary: `Edited FAQ #${r.params.id}` })],
  ["DELETE", "/api/admin/faqs/:id", "college.faq.delete", (r) => ({ summary: `Deleted FAQ #${r.params.id}` })],
  // News
  ["POST", "/api/admin/news", "news.create", (r) => ({ summary: `Created draft “${r.body?.title}”`, entityType: "news" })],
  ["PUT", "/api/admin/news/:id", "news.update", (r) => ({ summary: `Edited article #${r.params.id} “${r.body?.title ?? ""}”`, entityType: "news", entityId: r.params.id })],
  ["DELETE", "/api/admin/news/:id", "news.delete", (r) => ({ summary: `Deleted article #${r.params.id}`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/:id/submit", "news.submit", (r) => ({ summary: `Submitted article #${r.params.id} for review`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/:id/publish", "news.publish", (r) => ({ summary: `${r.body?.publishAt ? `Scheduled article #${r.params.id} for ${r.body.publishAt}` : `Published article #${r.params.id}`}`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/:id/request-changes", "news.request_changes", (r) => ({ summary: `Requested changes on article #${r.params.id}`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/:id/unpublish", "news.unpublish", (r) => ({ summary: `Unpublished article #${r.params.id}`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/:id/discard-pending", "news.discard_pending", (r) => ({ summary: `Discarded pending edits on article #${r.params.id}`, entityType: "news", entityId: r.params.id })],
  ["POST", "/api/admin/news/upload", "media.upload", () => ({ summary: "Uploaded an article image" })],
  // Content pages (courses, exams, info pages)
  ["POST", "/api/admin/entries", "entry.create", (r) => ({ summary: `Created ${r.body?.type ?? ""} draft “${r.body?.title}”`, entityType: "entry" })],
  ["PUT", "/api/admin/entries/:id(\\d+)", "entry.update", (r) => ({ summary: `Edited page #${r.params.id}${r.body?.title ? ` “${r.body.title}”` : ""}`, entityType: "entry", entityId: r.params.id })],
  ["DELETE", "/api/admin/entries/:id(\\d+)", "entry.delete", (r) => ({ summary: `Deleted page #${r.params.id}`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/:id(\\d+)/submit", "entry.submit", (r) => ({ summary: `Submitted page #${r.params.id} for review`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/:id(\\d+)/publish", "entry.publish", (r) => ({ summary: r.body?.publishAt ? `Scheduled page #${r.params.id} for ${r.body.publishAt}` : `Published page #${r.params.id}`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/:id(\\d+)/request-changes", "entry.request_changes", (r) => ({ summary: `Requested changes on page #${r.params.id}`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/:id(\\d+)/unpublish", "entry.unpublish", (r) => ({ summary: `Unpublished page #${r.params.id}`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/:id(\\d+)/discard-pending", "entry.discard_pending", (r) => ({ summary: `Discarded pending edits on page #${r.params.id}`, entityType: "entry", entityId: r.params.id })],
  ["POST", "/api/admin/entries/bulk", "entry.bulk", (r) => ({ summary: `Bulk “${r.body?.action}” on ${r.body?.ids?.length ?? 0} page(s)` })],
  ["POST", "/api/admin/entries/import", "entry.import", (r) => ({ summary: `Imported ${r.body?.type ?? ""} pages from CSV` })],
  ["PUT", "/api/admin/gallery/:id", "college.gallery.alt", (r) => ({ summary: `Set alt text on photo #${r.params.id}` })],
  // Media
  ["POST", "/api/admin/media", "media.upload", () => ({ summary: "Uploaded files to the media library" })],
  ["PUT", "/api/admin/media/:id(\\d+)", "media.update", (r) => ({ summary: `Edited media #${r.params.id}${r.body?.alt !== undefined ? " (alt text)" : ""}`, entityType: "media", entityId: r.params.id })],
  ["POST", "/api/admin/media/:id(\\d+)/replace", "media.replace", (r) => ({ summary: `Replaced media #${r.params.id} everywhere it's used`, entityType: "media", entityId: r.params.id })],
  ["DELETE", "/api/admin/media/:id(\\d+)", "media.delete", (r) => ({ summary: `Deleted media #${r.params.id}`, entityType: "media", entityId: r.params.id })],
  ["POST", "/api/admin/media/scan", "media.scan", () => ({ summary: "Added earlier uploads to the media library" })],
  // Categories & settings
  ["POST", "/api/admin/taxonomy/streams", "taxonomy.stream", (r) => ({ summary: `Added stream “${r.body?.name}”` })],
  ["PUT", "/api/admin/taxonomy/streams/:id", "taxonomy.stream", (r) => ({ summary: `Edited stream #${r.params.id}` })],
  ["DELETE", "/api/admin/taxonomy/streams/:id", "taxonomy.stream", (r) => ({ summary: `Deleted stream #${r.params.id}` })],
  ["POST", "/api/admin/taxonomy/cities", "taxonomy.city", (r) => ({ summary: `Added location “${r.body?.name}”` })],
  ["PUT", "/api/admin/taxonomy/cities/:id", "taxonomy.city", (r) => ({ summary: `Edited location #${r.params.id}` })],
  ["DELETE", "/api/admin/taxonomy/cities/:id", "taxonomy.city", (r) => ({ summary: `Deleted location #${r.params.id}` })],
  ["POST", "/api/admin/taxonomy/categories", "taxonomy.category", (r) => ({ summary: `Added category “${r.body?.name}”` })],
  ["PUT", "/api/admin/taxonomy/categories/:id", "taxonomy.category", (r) => ({ summary: `Edited category #${r.params.id}` })],
  ["DELETE", "/api/admin/taxonomy/categories/:id", "taxonomy.category", (r) => ({ summary: `Deleted category #${r.params.id}` })],
  ["POST", "/api/admin/taxonomy/tags", "taxonomy.tag", (r) => ({ summary: `Added tag “${r.body?.name}”` })],
  ["PUT", "/api/admin/taxonomy/tags/:id", "taxonomy.tag", (r) => ({ summary: `Renamed tag #${r.params.id} → “${r.body?.name}”` })],
  ["DELETE", "/api/admin/taxonomy/tags/:id", "taxonomy.tag", (r) => ({ summary: `Deleted tag #${r.params.id}` })],
  ["PUT", "/api/admin/site", "settings.tracking", () => ({ summary: "Updated tracking / verification codes" })],
  ["POST", "/api/admin/import/colleges", "college.import", () => ({ summary: "Imported college data from CSV" })],
  // Leads
  ["PATCH", "/api/admin/leads/:id(\\d+)", "lead.update", (r) => ({ summary: `Updated lead #${r.params.id}${r.body?.status ? ` → ${r.body.status}` : ""}${r.body?.assignedToId !== undefined ? " (assignment)" : ""}${r.body?.followUpAt !== undefined ? " (follow-up)" : ""}`, entityType: "lead", entityId: r.params.id })],
  ["POST", "/api/admin/leads/:id(\\d+)/notes", "lead.note", (r) => ({ summary: `Logged ${r.body?.type ?? "note"} on lead #${r.params.id}`, entityType: "lead", entityId: r.params.id })],
  ["POST", "/api/admin/leads/bulk", "lead.bulk", (r) => ({ summary: `Bulk ${r.body?.action} on ${r.body?.ids?.length ?? 0} lead(s)${r.body?.value !== undefined ? ` → ${r.body.value}` : ""}` })],
  ["POST", "/api/admin/leads/seen-all", "lead.seen_all", () => ({ summary: "Marked all new leads as seen" })],
  ["DELETE", "/api/admin/leads/:id(\\d+)", "lead.delete", (r) => ({ summary: `Deleted lead #${r.params.id}`, entityType: "lead", entityId: r.params.id })],
  // Revisions
  ["POST", "/api/admin/revisions/:id/restore", "revision.restore", (r) => ({ summary: `Restored revision #${r.params.id}` })],
  // Users & account
  ["POST", "/api/admin/users", "user.create", (r) => ({ summary: `Created user ${r.body?.email} (${r.body?.role})`, entityType: "user" })],
  ["PUT", "/api/admin/users/:id", "user.update", (r) => ({ summary: `Updated user #${r.params.id}${r.body?.role ? ` → ${r.body.role}` : ""}${r.body?.active === false ? " (deactivated)" : r.body?.active === true ? " (active)" : ""}`, entityType: "user", entityId: r.params.id })],
  ["POST", "/api/admin/users/:id/reset-password", "user.reset_password", (r) => ({ summary: `Reset password for user #${r.params.id}`, entityType: "user", entityId: r.params.id })],
  ["POST", "/api/admin/users/:id/reset-2fa", "user.reset_2fa", (r) => ({ summary: `Turned off two-factor for user #${r.params.id}`, entityType: "user", entityId: r.params.id })],
  ["POST", "/api/admin/auth/password", "account.password", () => ({ summary: "Changed own password" })],
  ["POST", "/api/admin/auth/2fa/enable", "account.2fa_on", () => ({ summary: "Turned on two-factor sign-in" })],
  ["POST", "/api/admin/auth/2fa/disable", "account.2fa_off", () => ({ summary: "Turned off two-factor sign-in" })],
];

/**
 * Record successful admin mutations. Mount on admin routers *before* the routes;
 * the entry is written once the response has finished.
 */
export function auditMutations(req: Request, res: Response, next: NextFunction) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return next();
  res.on("finish", () => {
    if (res.statusCode >= 400 || !req.admin) return;
    const pattern = (req.baseUrl + (req.route?.path ?? req.path)).replace(/(.)\/$/, "$1");
    // Sign-in/out are logged explicitly by the auth routes; 2FA setup changes nothing yet.
    if (/^\/api\/admin\/auth\/(login|login\/2fa|setup|logout|2fa\/setup)$/.test(pattern)) return;
    const known = ROUTES.find(([m, p]) => m === req.method && p === pattern);
    // Dry runs (previews) don't change anything.
    if (req.body?.dryRun === true) return;
    const fallback: Describer = () => ({ summary: `${req.method} ${req.originalUrl}` });
    const [, , action, describe] = known ?? [req.method, pattern, `${req.method.toLowerCase()} ${pattern}`, fallback];
    const d = describe(req);
    void audit(req, {
      action,
      summary: d.summary,
      entityType: d.entityType,
      entityId: d.entityId,
      details: { request: sanitize({ ...req.body, ...(Object.keys(req.query).length ? { query: req.query } : {}) }), status: res.statusCode },
    });
  });
  next();
}
