/**
 * Lead capture & follow-up helpers: attribution (channel), duplicate detection,
 * the activity timeline and optional notifications (email via SMTP, or a
 * webhook for WhatsApp/SMS/CRM tools such as Zapier, Make or Interakt).
 */
import type { Application, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const LEAD_SOURCES = ["apply", "enquiry", "predictor", "counselling", "course", "exam", "register", "contact"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface Attribution {
  pagePath?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

const SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|yandex|baidu|search\.brave)\./i;
const SOCIAL = /(^|\.)(facebook|fb|instagram|t\.co|twitter|x\.com|linkedin|lnkd|youtube|youtu\.be|whatsapp|wa\.me|reddit|quora|pinterest|telegram)\b/i;
const OWN = /collegechoice\.in$/i;

/** organic | paid | social | email | referral | direct — from UTM tags first, then the referrer. */
export function classifyChannel(a: Attribution): string {
  const medium = (a.utmMedium ?? "").toLowerCase();
  if (/^(cpc|ppc|paid|paidsearch|paid_social|display|cpm|ads?)$/.test(medium)) return "paid";
  if (/^e-?mail|newsletter$/.test(medium)) return "email";
  if (/^(social|social-media|sm)$/.test(medium)) return "social";
  if (medium === "organic") return "organic";
  let host = "";
  try { host = a.referrer ? new URL(a.referrer).host : ""; } catch { /* not a URL */ }
  if (!host || OWN.test(host) || host.startsWith("localhost")) return a.utmSource ? "referral" : "direct";
  if (SEARCH.test(host)) return "organic";
  if (SOCIAL.test(host)) return "social";
  return "referral";
}

/** Last 10 digits — "+91 98765-43210" and "09876543210" are the same person. */
export const normalizeMobile = (m: string) => m.replace(/\D/g, "").slice(-10);

/** Earliest earlier lead with the same mobile or email (null if none). */
export async function findDuplicate(mobile: string, email: string, excludeId?: number): Promise<Application | null> {
  const digits = normalizeMobile(mobile);
  const or: Prisma.ApplicationWhereInput[] = [];
  if (digits.length === 10) or.push({ mobileKey: digits });
  if (email.trim()) or.push({ email: { equals: email.trim(), mode: "insensitive" } });
  if (!or.length) return null;
  const candidates = await prisma.application.findMany({
    where: { OR: or, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    orderBy: { createdAt: "asc" },
    take: 20,
  });
  return candidates[0] ?? null;
}

export async function addActivity(
  applicationId: number,
  a: { type: string; text?: string | null; fromStatus?: string | null; toStatus?: string | null },
  who?: { id: number; email: string } | null,
) {
  await prisma.leadActivity.create({
    data: { applicationId, type: a.type, text: a.text ?? null, fromStatus: a.fromStatus ?? null, toStatus: a.toStatus ?? null, userId: who?.id ?? null, userEmail: who?.email ?? null },
  });
}

export interface NewLeadInput extends Attribution {
  fullName: string;
  mobile: string;
  email: string;
  city?: string | null;
  state?: string | null;
  courseInterested?: string | null;
  examInterested?: string | null;
  notes?: string | null;
  collegeName?: string | null;
  collegeId?: number | null;
  userId?: number | null;
  source: LeadSource;
}

const clip = (s: string | null | undefined, n: number) => (s ? s.trim().slice(0, n) || null : null);

/** Save a lead from any form: attribution, duplicate check, timeline entry, notifications. */
export async function createLead(input: NewLeadInput): Promise<Application> {
  const dup = await findDuplicate(input.mobile, input.email);
  const lead = await prisma.application.create({
    data: {
      fullName: input.fullName, mobile: input.mobile, mobileKey: normalizeMobile(input.mobile) || null, email: input.email,
      city: clip(input.city, 120), state: clip(input.state, 80),
      courseInterested: clip(input.courseInterested, 120), examInterested: clip(input.examInterested, 120),
      notes: clip(input.notes, 1000), collegeName: clip(input.collegeName, 200), collegeId: input.collegeId ?? null,
      userId: input.userId ?? null, source: input.source,
      pagePath: clip(input.pagePath, 300), landingPage: clip(input.landingPage, 300), referrer: clip(input.referrer, 500),
      utmSource: clip(input.utmSource, 100), utmMedium: clip(input.utmMedium, 100), utmCampaign: clip(input.utmCampaign, 150),
      channel: classifyChannel(input),
      duplicateOfId: dup?.id ?? null,
    },
  });
  await addActivity(lead.id, { type: "created", text: `New ${input.source} lead${input.pagePath ? ` from ${input.pagePath}` : ""}`, toStatus: "NEW" });
  if (dup) {
    await addActivity(lead.id, { type: "duplicate", text: `Same mobile/email as lead #${dup.id} (${dup.fullName})` });
    await addActivity(dup.id, { type: "duplicate", text: `Enquired again as lead #${lead.id}${input.pagePath ? ` from ${input.pagePath}` : ""}` });
  }
  void notifyNewLead(lead).catch((e) => console.warn("[leads] notification failed:", e instanceof Error ? e.message : e));
  return lead;
}

// ─────────────────────────────────────────────────────────────
// Notifications (all optional — configured via environment variables)
//   SMTP_URL            smtps://user:pass@smtp.example.com:465
//   MAIL_FROM           "College Choice <leads@collegechoice.in>"
//   LEAD_NOTIFY_EMAILS  comma-separated recipients for new leads & daily follow-ups
//   LEAD_WEBHOOK_URL    POSTed JSON for every new lead (WhatsApp/SMS/CRM automations)
// ─────────────────────────────────────────────────────────────

const SITE = (process.env.SITE_URL || (process.env.CORS_ORIGIN || "").split(",")[0] || "").replace(/\/+$/, "");

export const notificationSettings = () => ({
  email: !!(process.env.SMTP_URL && process.env.LEAD_NOTIFY_EMAILS),
  webhook: !!process.env.LEAD_WEBHOOK_URL,
  recipients: (process.env.LEAD_NOTIFY_EMAILS || "").split(",").map((s) => s.trim()).filter(Boolean),
});

async function sendMail(subject: string, text: string) {
  const { email, recipients } = notificationSettings();
  if (!email) return;
  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport(process.env.SMTP_URL!);
  await transport.sendMail({ from: process.env.MAIL_FROM || recipients[0], to: recipients, subject, text });
}

async function notifyNewLead(lead: Application) {
  const lines = [
    `Name: ${lead.fullName}`, `Mobile: ${lead.mobile}`, `Email: ${lead.email}`,
    lead.city && `City: ${lead.city}${lead.state ? `, ${lead.state}` : ""}`,
    lead.courseInterested && `Course: ${lead.courseInterested}`, lead.examInterested && `Exam: ${lead.examInterested}`,
    lead.collegeName && `College: ${lead.collegeName}`, `Source: ${lead.source} · ${lead.channel}`,
    lead.pagePath && `Page: ${lead.pagePath}`, lead.duplicateOfId && `⚠ Possible duplicate of lead #${lead.duplicateOfId}`,
    SITE && `Open in the CMS: ${SITE}/admin`,
  ].filter(Boolean);
  const tasks: Promise<unknown>[] = [sendMail(`New lead: ${lead.fullName}${lead.collegeName ? ` — ${lead.collegeName}` : ""}`, lines.join("\n"))];
  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "lead.created", lead: { ...lead, createdAt: lead.createdAt.toISOString() } }),
      signal: AbortSignal.timeout(8000),
    }));
  }
  await Promise.all(tasks);
}

/** Daily digest of follow-ups due today and overdue (sent once a day, if email is set up). */
export async function sendFollowUpDigest() {
  if (!notificationSettings().email) return;
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const due = await prisma.application.findMany({
    where: { followUpAt: { lte: end }, status: { in: ["NEW", "CONTACTED", "QUALIFIED"] } },
    orderBy: { followUpAt: "asc" },
    include: { assignedTo: { select: { name: true } } },
    take: 200,
  });
  if (!due.length) return;
  const now = Date.now();
  const text = due.map((l) => `${l.followUpAt!.getTime() < now ? "OVERDUE " : ""}${l.followUpAt!.toISOString().slice(0, 16).replace("T", " ")} UTC — ${l.fullName} (${l.mobile}) · ${l.status}${l.assignedTo ? ` · ${l.assignedTo.name}` : ""}`).join("\n");
  await sendMail(`${due.length} lead follow-up(s) due today`, `${text}\n\n${SITE ? `${SITE}/admin` : ""}`);
}
