import { z } from "zod";

export const listQuerySchema = z.object({
  search: z.string().trim().max(120).optional(),
  stream: z.string().trim().optional(), // name or slug
  type: z.enum(["Public", "Private", "Government", "Deemed", "Autonomous"]).optional(),
  mode: z.enum(["Campus", "Online", "Distance", "Hybrid"]).optional(),
  program: z.string().trim().max(60).optional(), // matches a course/program name, e.g. "MBA"
  city: z.string().trim().optional(), // name or slug
  state: z.string().trim().optional(),
  featured: z.enum(["true", "1"]).optional(), // only ever passed to request featured colleges
  maxFees: z.coerce.number().int().positive().optional(),
  sort: z.enum(["rank", "rating", "feesLow", "feesHigh"]).default("rank"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(60).default(12),
});
export type ListQuery = z.infer<typeof listQuerySchema>;

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  mobile: z.string().trim().min(7).max(20),
  email: z.string().trim().email(),
  city: z.string().trim().max(120).optional(),
  courseInterested: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(500).optional(),
  collegeName: z.string().trim().max(200).optional(),
  collegeId: z.coerce.number().int().positive().optional(),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(100),
  phone: z.string().trim().max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

// ── Admin: college detail content ─────────────────────────────
const TAB_KEYS = [
  "info", "courses-fees", "admissions", "recognition", "learning",
  "placements", "cutoffs", "scholarships", "rankings", "hostel",
] as const;

export const sectionSchema = z.object({
  tab: z.enum(TAB_KEYS),
  heading: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(20000),
  sort: z.coerce.number().int().min(0).max(9999).default(0),
});
export const sectionUpdateSchema = sectionSchema.partial();

export const highlightSchema = z.object({ text: z.string().trim().min(1).max(300) });

export const courseSchema = z.object({
  name: z.string().trim().min(1).max(200),
  duration: z.string().trim().min(1).max(120),
  seats: z.string().trim().max(120).default(""),
  feesLabel: z.string().trim().max(120).default(""),
});
export const courseUpdateSchema = courseSchema.partial();

export const faqSchema = z.object({
  question: z.string().trim().min(1).max(500),
  answer: z.string().trim().min(1).max(5000),
  sort: z.coerce.number().int().min(0).max(9999).default(0),
});
export const faqUpdateSchema = faqSchema.partial();

// ── Admin: news / blog ────────────────────────────────────────
export const newsSchema = z.object({
  slug: z.string().trim().max(200).regex(/^[a-z0-9-]*$/i, "slug may only contain letters, numbers and hyphens").optional(),
  category: z.string().trim().min(1).max(60),
  title: z.string().trim().min(3).max(200),
  excerpt: z.string().trim().min(1).max(600),
  body: z.string().trim().max(40000).optional(),
  date: z.string().trim().min(1).max(60),
  readTime: z.string().trim().max(40).default("3 min read"),
  imgUrl: z.string().trim().max(500).optional(),
});
export const newsUpdateSchema = newsSchema.partial();

// ── Admin: SEO ────────────────────────────────────────────────
// Optional text field: trimmed, "" → null (clears the override).
const optText = (max: number) =>
  z.string().trim().max(max).nullish().transform((v) => (v ? v : null));

export const seoFieldsSchema = z.object({
  title: optText(200),
  description: optText(500),
  keyword: optText(120),
  canonical: optText(500),
  noindex: z.boolean().default(false),
  nofollow: z.boolean().default(false),
  ogTitle: optText(200),
  ogDescription: optText(500),
  ogImage: optText(500),
  twitterTitle: optText(200),
  twitterDescription: optText(500),
  excludeFromSitemap: z.boolean().default(false),
  disableSchema: z.boolean().default(false),
  customSchema: optText(20000),
  urlLocked: z.boolean().default(false),
});
export const seoPageSchema = seoFieldsSchema.extend({ path: z.string().trim().min(1).max(500) });

export const seoListQuerySchema = z.object({
  type: z.enum(["static", "college", "stream", "city", "online", "news", "other"]).optional(),
  q: z.string().trim().max(200).optional(),
  index: z.enum(["index", "noindex"]).optional(),
  issue: z
    .enum(["no-custom-title", "no-custom-description", "title-short", "title-long", "desc-short", "desc-long",
      "no-image", "noindex", "custom-canonical", "has-override", "no-override"])
    .optional(),
  updatedWithin: z.coerce.number().int().min(1).max(3650).optional(), // days
  sort: z.enum(["path", "updated"]).default("path"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});
export type SeoListQuery = z.infer<typeof seoListQuerySchema>;

export const seoBulkSchema = z.object({
  paths: z.array(z.string().max(500)).max(20000).optional(),
  filter: seoListQuerySchema.partial().optional(), // or: every page matching a list filter
  action: z.enum(["noindex", "index", "nofollow", "follow", "exclude-sitemap", "include-sitemap",
    "set-canonical", "clear-canonical", "lock", "unlock", "reset"]),
  value: z.string().trim().max(500).optional(),
});

export const seoTemplateSchema = z.object({
  paths: z.array(z.string().max(500)).max(20000).optional(),
  filter: seoListQuerySchema.partial().optional(), // apply to every page matching a list filter
  field: z.enum(["title", "description"]),
  template: z.string().trim().min(1).max(500),
  onlyEmpty: z.boolean().default(false), // skip pages that already have a custom value
  dryRun: z.boolean().default(true),
});

export const seoReplaceSchema = z.object({
  find: z.string().min(1).max(200),
  replace: z.string().max(200),
  fields: z.array(z.enum(["title", "description", "ogTitle", "ogDescription"])).min(1),
  matchCase: z.boolean().default(false),
  includeLocked: z.boolean().default(false),
  dryRun: z.boolean().default(true),
});

export const slugChangeSchema = z.object({
  path: z.string().trim().min(1).max(500),
  newSlug: z.string().trim().min(1).max(200),
});

export const redirectSchema = z.object({
  fromPath: z.string().trim().min(1).max(500),
  toPath: z.string().trim().min(1).max(1000),
  statusCode: z.union([z.literal(301), z.literal(302)]).default(301),
  isPrefix: z.boolean().default(false),
  enabled: z.boolean().default(true),
  note: optText(300),
});

export const csvImportSchema = z.object({
  csv: z.string().min(1).max(5_000_000),
  dryRun: z.boolean().default(true),
});

export const seoSettingsSchema = z.object({
  robotsTxt: z.string().max(20000).nullable().optional(),
  sitemap: z.record(z.boolean()).optional(),
});
