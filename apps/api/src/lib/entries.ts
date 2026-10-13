/**
 * Editorial content types (ContentEntry): course pages, exam pages and info/
 * service pages. Shared field definitions, URL rules and publishing helpers.
 */
import { z } from "zod";
import type { ContentEntry, EntryType, Prisma } from "@prisma/client";

// ── Type-specific fields (ContentEntry.data) ──────────────────

export const courseDataSchema = z.object({
  level: z.string().trim().max(40).default(""), // UG | PG | Diploma | Doctorate | Certificate
  duration: z.string().trim().max(60).default(""),
  mode: z.string().trim().max(60).default(""), // Full-time | Part-time | Online
  eligibility: z.string().trim().max(500).default(""),
  fees: z.string().trim().max(120).default(""), // display label, e.g. "₹2–8 L total"
  admission: z.string().trim().max(500).default(""), // how admission works, briefly
  careers: z.string().trim().max(500).default(""),
  collegeMatch: z.string().trim().max(60).default(""), // course name used to list colleges offering it, e.g. "B.Tech"
});

export const examDataSchema = z.object({
  examStatus: z.string().trim().max(60).default(""), // Upcoming | Registration open | Admit card out | Result declared…
  conductingBody: z.string().trim().max(200).default(""),
  applicationWindow: z.string().trim().max(120).default(""),
  resultDate: z.string().trim().max(60).default(""),
  officialWebsite: z.string().trim().max(300).default(""),
  eligibility: z.string().trim().max(500).default(""),
  pattern: z.string().trim().max(500).default(""),
  fee: z.string().trim().max(120).default(""),
});

export const ctaBlockSchema = z.object({
  heading: z.string().trim().max(150),
  text: z.string().trim().max(400).default(""),
  buttonLabel: z.string().trim().max(60).default(""),
  buttonUrl: z.string().trim().max(300).default(""),
});
export const pageDataSchema = z.object({
  blocks: z.array(ctaBlockSchema).max(10).default([]),
});

export const dataSchemaFor = (type: EntryType) =>
  type === "COURSE" ? courseDataSchema : type === "EXAM" ? examDataSchema : pageDataSchema;

export const faqListSchema = z.array(z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(3000),
})).max(40);

export const relatedSchema = z.object({
  colleges: z.array(z.number().int()).max(24).default([]),
  entries: z.array(z.number().int()).max(24).default([]),
  news: z.array(z.number().int()).max(12).default([]),
});

// ── URLs ──────────────────────────────────────────────────────

export const TYPE_SLUGS: Record<EntryType, "course" | "exam" | "page"> = { COURSE: "course", EXAM: "exam", PAGE: "page" };
export const typeFromParam = (s: string): EntryType | null =>
  s === "course" || s === "courses" ? "COURSE" : s === "exam" || s === "exams" ? "EXAM" : s === "page" || s === "pages" ? "PAGE" : null;

export const entryPath = (type: EntryType, slug: string) =>
  type === "COURSE" ? `/courses/${slug}` : type === "EXAM" ? `/exams/${slug}` : `/${slug}`;

// Top-level paths owned by the app — a Page can't use these slugs.
export const RESERVED_PAGE_SLUGS = new Set([
  "about", "admin", "api", "colleges", "colleges-in", "compare", "courses", "exams", "internal", "news",
  "online", "robots.txt", "sitemap.xml", "sitemaps", "stream", "uploads", "_next", "favicon.ico", "icon.png",
  "icon.svg", "apple-icon.png", "login", "search",
]);

// ── Publishing ────────────────────────────────────────────────

/** Entries visible on the public site right now. */
export const liveEntryWhere = (now = new Date()): Prisma.ContentEntryWhereInput => ({
  status: "PUBLISHED",
  AND: [
    { OR: [{ publishAt: null }, { publishAt: { lte: now } }] },
    { OR: [{ unpublishAt: null }, { unpublishAt: { gt: now } }] },
  ],
});

/** What a revision stores for an entry. */
export const entrySnapshot = (e: ContentEntry & { tags?: { tagId: number }[] }) => ({
  title: e.title, slug: e.slug, summary: e.summary, body: e.body, data: e.data, faqs: e.faqs,
  heroImage: e.heroImage, heroAlt: e.heroAlt, streamId: e.streamId, categoryId: e.categoryId,
  related: e.related, tagIds: e.tags?.map((t) => t.tagId) ?? [],
  status: e.status, publishAt: e.publishAt, unpublishAt: e.unpublishAt,
});
