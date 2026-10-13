/**
 * Leads CRM (/api/admin/leads): the central lead list with search, filters and
 * sorting; statuses, follow-ups, assignment, notes and the activity timeline;
 * duplicate detection; CSV export; and SEO-attribution reports.
 */
import { Router } from "express";
import { z } from "zod";
import { Prisma, type ApplicationStatus } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { can, requirePermission } from "../lib/adminAuth";
import { addActivity, findDuplicate, normalizeMobile, notificationSettings } from "../lib/leads";

export const adminLeadsRouter = Router();

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"] as const;
const OPEN: ApplicationStatus[] = ["NEW", "CONTACTED", "QUALIFIED"];
const STATUS_LABEL: Record<string, string> = { NEW: "New", CONTACTED: "Contacted", QUALIFIED: "Qualified", CONVERTED: "Converted", LOST: "Lost" };

const endOfToday = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d; };
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

const listQuery = z.object({
  q: z.string().trim().max(120).optional(),
  status: z.enum([...STATUSES, "open"]).optional(),
  source: z.string().trim().max(30).optional(),
  channel: z.string().trim().max(30).optional(),
  assigned: z.string().trim().max(20).optional(), // "me" | "none" | user id
  followUp: z.enum(["today", "overdue", "upcoming", "none"]).optional(),
  duplicates: z.enum(["1"]).optional(),
  unseen: z.enum(["1"]).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  sort: z.enum(["newest", "oldest", "followup", "updated"]).default("newest"),
  page: z.coerce.number().int().min(1).default(1),
});
type ListQuery = z.infer<typeof listQuery>;
/** Treat empty query values (?status=) as "not set". */
const withoutBlanks = (q: object) => Object.fromEntries(Object.entries(q).filter(([, v]) => v !== ""));

function whereFor(q: Partial<ListQuery>, meId: number): Prisma.ApplicationWhereInput {
  const and: Prisma.ApplicationWhereInput[] = [];
  if (q.q) {
    const digits = q.q.replace(/\D/g, "");
    and.push({
      OR: [
        { fullName: { contains: q.q, mode: "insensitive" } },
        { email: { contains: q.q, mode: "insensitive" } },
        { collegeName: { contains: q.q, mode: "insensitive" } },
        { courseInterested: { contains: q.q, mode: "insensitive" } },
        { city: { contains: q.q, mode: "insensitive" } },
        ...(digits.length >= 4 ? [{ mobileKey: { contains: digits.slice(-10) } }] : []),
      ],
    });
  }
  if (q.status === "open") and.push({ status: { in: OPEN } });
  else if (q.status) and.push({ status: q.status });
  if (q.source) and.push({ source: q.source });
  if (q.channel) and.push({ channel: q.channel });
  if (q.assigned === "me") and.push({ assignedToId: meId });
  else if (q.assigned === "none") and.push({ assignedToId: null });
  else if (q.assigned && /^\d+$/.test(q.assigned)) and.push({ assignedToId: Number(q.assigned) });
  if (q.followUp === "today") and.push({ followUpAt: { gte: startOfToday(), lte: endOfToday() }, status: { in: OPEN } });
  if (q.followUp === "overdue") and.push({ followUpAt: { lt: startOfToday() }, status: { in: OPEN } });
  if (q.followUp === "upcoming") and.push({ followUpAt: { gt: endOfToday() } });
  if (q.followUp === "none") and.push({ followUpAt: null, status: { in: OPEN } });
  if (q.duplicates) and.push({ duplicateOfId: { not: null } });
  if (q.unseen) and.push({ seenAt: null });
  if (q.from || q.to) and.push({ createdAt: { ...(q.from ? { gte: q.from } : {}), ...(q.to ? { lte: q.to } : {}) } });
  return and.length ? { AND: and } : {};
}

const ORDER: Record<ListQuery["sort"], Prisma.ApplicationOrderByWithRelationInput[]> = {
  newest: [{ createdAt: "desc" }],
  oldest: [{ createdAt: "asc" }],
  followup: [{ followUpAt: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
  updated: [{ updatedAt: "desc" }],
};

const listInclude = {
  assignedTo: { select: { id: true, name: true } },
  college: { select: { slug: true } },
} satisfies Prisma.ApplicationInclude;

// ─────────────────────────────────────────────────────────────

/** GET /api/admin/leads/summary — badge counts for the CMS. */
adminLeadsRouter.get(
  "/summary",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const [unseen, dueToday, overdue, mine, total] = await Promise.all([
      prisma.application.count({ where: { seenAt: null } }),
      prisma.application.count({ where: whereFor({ followUp: "today" }, req.admin!.id) }),
      prisma.application.count({ where: whereFor({ followUp: "overdue" }, req.admin!.id) }),
      prisma.application.count({ where: { assignedToId: req.admin!.id, status: { in: OPEN } } }),
      prisma.application.count(),
    ]);
    const n = notificationSettings();
    res.json({ unseen, dueToday, overdue, mine, total, notifications: { email: n.email, webhook: n.webhook, recipients: n.recipients.length } });
  }),
);

/** GET /api/admin/leads/assignees — people who can work leads. */
adminLeadsRouter.get(
  "/assignees",
  requirePermission("leads:manage"),
  asyncHandler(async (_req, res) => {
    const items = await prisma.adminUser.findMany({ where: { active: true, role: { in: ["ADMIN", "COUNSELLOR"] } }, select: { id: true, name: true, role: true }, orderBy: { name: "asc" } });
    res.json({ items });
  }),
);

/** GET /api/admin/leads?… — filtered, sorted, paginated list. */
adminLeadsRouter.get(
  "/",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const q = listQuery.parse(withoutBlanks(req.query));
    const where = whereFor(q, req.admin!.id);
    const pageSize = 50;
    const [items, total] = await Promise.all([
      prisma.application.findMany({ where, orderBy: ORDER[q.sort], include: listInclude, skip: (q.page - 1) * pageSize, take: pageSize }),
      prisma.application.count({ where }),
    ]);
    res.json({ items, total, page: q.page, totalPages: Math.max(1, Math.ceil(total / pageSize)) });
  }),
);

/** GET /api/admin/leads/:id — full lead with its timeline and other leads from the same person. Marks it seen. */
adminLeadsRouter.get(
  "/:id(\\d+)",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const lead = await prisma.application.findUnique({
      where: { id },
      include: { ...listInclude, activities: { orderBy: { createdAt: "desc" } } },
    });
    if (!lead) throw new HttpError(404, "Lead not found");
    if (!lead.seenAt) await prisma.application.update({ where: { id }, data: { seenAt: new Date() } });
    const digits = normalizeMobile(lead.mobile);
    const related = await prisma.application.findMany({
      where: {
        NOT: { id },
        OR: [
          ...(digits.length === 10 ? [{ mobileKey: digits }] : []),
          ...(lead.email ? [{ email: { equals: lead.email, mode: "insensitive" as const } }] : []),
        ],
      },
      select: { id: true, fullName: true, createdAt: true, status: true, source: true, collegeName: true, courseInterested: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    res.json({ ...lead, related });
  }),
);

const patchSchema = z.object({
  status: z.enum(STATUSES).optional(),
  followUpAt: z.coerce.date().nullable().optional(),
  assignedToId: z.number().int().nullable().optional(),
  fullName: z.string().trim().min(2).max(120).optional(),
  mobile: z.string().trim().min(7).max(20).optional(),
  email: z.string().trim().email().optional(),
  city: z.string().trim().max(120).nullable().optional(),
  state: z.string().trim().max(80).nullable().optional(),
  courseInterested: z.string().trim().max(120).nullable().optional(),
  examInterested: z.string().trim().max(120).nullable().optional(),
  note: z.string().trim().max(2000).optional(), // optional note to log with the change
});

/** PATCH /api/admin/leads/:id — change status, follow-up, assignee or contact details (all logged). */
adminLeadsRouter.patch(
  "/:id(\\d+)",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { note, ...p } = patchSchema.parse(req.body);
    const lead = await prisma.application.findUnique({ where: { id }, include: { assignedTo: { select: { name: true } } } });
    if (!lead) throw new HttpError(404, "Lead not found");
    const who = req.admin!;
    if (p.assignedToId) {
      const u = await prisma.adminUser.findUnique({ where: { id: p.assignedToId } });
      if (!u?.active || !["ADMIN", "COUNSELLOR"].includes(u.role)) throw new HttpError(400, "Leads can be assigned to Admins and Counsellors only.");
    }
    const updated = await prisma.application.update({
      where: { id },
      data: { ...p, ...(p.mobile ? { mobileKey: normalizeMobile(p.mobile) || null } : {}), seenAt: lead.seenAt ?? new Date() },
      include: { assignedTo: { select: { name: true } } },
    });

    if (p.status && p.status !== lead.status) {
      await addActivity(id, { type: "status", text: note || null, fromStatus: lead.status, toStatus: p.status }, who);
    } else if (note) {
      await addActivity(id, { type: "note", text: note }, who);
    }
    if (p.followUpAt !== undefined && +(p.followUpAt ?? 0) !== +(lead.followUpAt ?? 0)) {
      await addActivity(id, { type: "followup", text: p.followUpAt ? `Follow-up set for ${p.followUpAt.toISOString()}` : "Follow-up cleared" }, who);
    }
    if (p.assignedToId !== undefined && p.assignedToId !== lead.assignedToId) {
      await addActivity(id, { type: "assign", text: updated.assignedTo ? `Assigned to ${updated.assignedTo.name}` : "Unassigned" }, who);
    }
    const contactChanged = (["fullName", "mobile", "email", "city", "state", "courseInterested", "examInterested"] as const).filter((k) => p[k] !== undefined && p[k] !== lead[k]);
    if (contactChanged.length) {
      await addActivity(id, { type: "edit", text: `Updated ${contactChanged.join(", ")}` }, who);
      if (contactChanged.includes("mobile") || contactChanged.includes("email")) {
        const dup = await findDuplicate(updated.mobile, updated.email, id);
        await prisma.application.update({ where: { id }, data: { duplicateOfId: dup && dup.createdAt < updated.createdAt ? dup.id : null } });
      }
    }
    res.json(await prisma.application.findUnique({ where: { id }, include: listInclude }));
  }),
);

/** POST /api/admin/leads/:id/notes { text, type? } — log a note, call, WhatsApp or email. */
adminLeadsRouter.post(
  "/:id(\\d+)/notes",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { text, type } = z.object({ text: z.string().trim().min(1).max(2000), type: z.enum(["note", "call", "whatsapp", "email", "meeting"]).default("note") }).parse(req.body);
    const lead = await prisma.application.findUnique({ where: { id }, select: { id: true, status: true } });
    if (!lead) throw new HttpError(404, "Lead not found");
    await addActivity(id, { type, text }, req.admin!);
    // Logging contact with a new lead moves it to Contacted.
    if (type !== "note" && lead.status === "NEW") {
      await prisma.application.update({ where: { id }, data: { status: "CONTACTED" } });
      await addActivity(id, { type: "status", fromStatus: "NEW", toStatus: "CONTACTED" }, req.admin!);
    } else {
      await prisma.application.update({ where: { id }, data: { updatedAt: new Date() } });
    }
    res.status(201).json({ ok: true });
  }),
);

/** POST /api/admin/leads/bulk { ids, action: status|assign|seen, value } */
adminLeadsRouter.post(
  "/bulk",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const { ids, action, value } = z.object({
      ids: z.array(z.number().int()).min(1).max(1000),
      action: z.enum(["status", "assign", "seen"]),
      value: z.union([z.string(), z.number()]).nullish(),
    }).parse(req.body);
    const leads = await prisma.application.findMany({ where: { id: { in: ids } }, select: { id: true, status: true, assignedToId: true } });
    let changed = 0;
    if (action === "status") {
      const to = z.enum(STATUSES).parse(value);
      for (const l of leads.filter((x) => x.status !== to)) {
        await prisma.application.update({ where: { id: l.id }, data: { status: to, seenAt: new Date() } });
        await addActivity(l.id, { type: "status", fromStatus: l.status, toStatus: to, text: "Bulk update" }, req.admin!);
        changed++;
      }
    } else if (action === "assign") {
      const to = value === null || value === "" || value === undefined ? null : Number(value);
      const u = to ? await prisma.adminUser.findUnique({ where: { id: to } }) : null;
      if (to && (!u?.active || !["ADMIN", "COUNSELLOR"].includes(u.role))) throw new HttpError(400, "Leads can be assigned to Admins and Counsellors only.");
      for (const l of leads.filter((x) => x.assignedToId !== to)) {
        await prisma.application.update({ where: { id: l.id }, data: { assignedToId: to } });
        await addActivity(l.id, { type: "assign", text: u ? `Assigned to ${u.name}` : "Unassigned" }, req.admin!);
        changed++;
      }
    } else {
      changed = (await prisma.application.updateMany({ where: { id: { in: ids }, seenAt: null }, data: { seenAt: new Date() } })).count;
    }
    res.json({ changed });
  }),
);

/** POST /api/admin/leads/seen-all — clear the "new leads" badge. */
adminLeadsRouter.post(
  "/seen-all",
  requirePermission("leads:manage"),
  asyncHandler(async (_req, res) => {
    const { count } = await prisma.application.updateMany({ where: { seenAt: null }, data: { seenAt: new Date() } });
    res.json({ changed: count });
  }),
);

/** DELETE /api/admin/leads/:id — remove spam or a deletion request (Admins only). */
adminLeadsRouter.delete(
  "/:id(\\d+)",
  requirePermission("users:manage"),
  asyncHandler(async (req, res) => {
    await prisma.application.delete({ where: { id: Number(req.params.id) } }).catch(() => { throw new HttpError(404, "Lead not found"); });
    res.json({ ok: true });
  }),
);

/** GET /api/admin/leads/export?… — CSV of leads matching the filters (for counselling tools / CRM). */
adminLeadsRouter.get(
  "/export",
  requirePermission("leads:manage"),
  asyncHandler(async (req, res) => {
    const q = listQuery.parse(withoutBlanks(req.query));
    const items = await prisma.application.findMany({ where: whereFor(q, req.admin!.id), orderBy: ORDER[q.sort], include: listInclude, take: 50_000 });
    const cell = (v: unknown) => {
      const s = v === null || v === undefined ? "" : v instanceof Date ? v.toISOString() : String(v);
      return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const cols: [string, (l: (typeof items)[number]) => unknown][] = [
      ["id", (l) => l.id], ["created_at", (l) => l.createdAt], ["name", (l) => l.fullName], ["mobile", (l) => l.mobile], ["email", (l) => l.email],
      ["city", (l) => l.city], ["state", (l) => l.state], ["course", (l) => l.courseInterested], ["exam", (l) => l.examInterested],
      ["college", (l) => l.collegeName], ["status", (l) => STATUS_LABEL[l.status]], ["follow_up", (l) => l.followUpAt], ["assigned_to", (l) => l.assignedTo?.name],
      ["source", (l) => l.source], ["channel", (l) => l.channel], ["page", (l) => l.pagePath], ["landing_page", (l) => l.landingPage],
      ["referrer", (l) => l.referrer], ["utm_source", (l) => l.utmSource], ["utm_medium", (l) => l.utmMedium], ["utm_campaign", (l) => l.utmCampaign],
      ["duplicate_of", (l) => l.duplicateOfId], ["notes", (l) => l.notes],
    ];
    const csv = [cols.map(([c]) => c), ...items.map((l) => cols.map(([, f]) => f(l)))].map((r) => r.map(cell).join(",")).join("\r\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(`﻿${csv}\r\n`);
  }),
);

// ─────────────────────────────────────────────────────────────
// Reports & SEO attribution (no personal details)
// ─────────────────────────────────────────────────────────────

/** GET /api/admin/leads/reports?from=&to= */
adminLeadsRouter.get(
  "/reports",
  requirePermission("leads:reports"),
  asyncHandler(async (req, res) => {
    const { from, to } = z.object({ from: z.coerce.date().optional(), to: z.coerce.date().optional() }).parse(req.query);
    const since = from ?? new Date(Date.now() - 30 * 86_400_000);
    const where: Prisma.ApplicationWhereInput = { createdAt: { gte: since, ...(to ? { lte: to } : {}) } };

    // Group by a column, with converted counts for a conversion rate.
    const by = async (field: "pagePath" | "landingPage" | "collegeName" | "courseInterested" | "examInterested" | "source" | "channel" | "status", extra: Prisma.ApplicationWhereInput = {}, take = 15) => {
      const nullable = field !== "source" && field !== "channel" && field !== "status";
      const w: Prisma.ApplicationWhereInput = { ...where, ...extra, ...(nullable ? { [field]: { not: null } } : {}) };
      const rows = await prisma.application.groupBy({ by: [field], where: w, _count: { _all: true }, orderBy: { _count: { id: "desc" } }, take });
      const converted = await prisma.application.groupBy({ by: [field], where: { ...w, status: "CONVERTED" }, _count: { _all: true } });
      return rows.map((r) => {
        const key = (r as Record<string, unknown>)[field] as string;
        const conv = converted.find((c) => (c as Record<string, unknown>)[field] === key)?._count._all ?? 0;
        return { key, leads: r._count._all, converted: conv };
      });
    };

    const [total, byStatus, byChannel, bySource, byPage, byLanding, organicLanding, byCollege, byCourse, byExam, daily] = await Promise.all([
      prisma.application.count({ where }),
      by("status"), by("channel"), by("source"),
      by("pagePath"), by("landingPage"), by("landingPage", { channel: "organic" }),
      by("collegeName"), by("courseInterested"), by("examInterested"),
      prisma.$queryRaw<{ day: Date; n: bigint }[]>`
        SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::bigint AS n
        FROM "Application" WHERE "createdAt" >= ${since} ${to ? Prisma.sql`AND "createdAt" <= ${to}` : Prisma.empty}
        GROUP BY 1 ORDER BY 1`,
    ]);
    res.json({
      from: since, to: to ?? null, total,
      byStatus, byChannel, bySource, byPage, byLanding, organicLanding, byCollege, byCourse, byExam,
      daily: daily.map((d) => ({ day: d.day, leads: Number(d.n) })),
      canSeeLeads: can(req.admin, "leads:manage"),
    });
  }),
);
