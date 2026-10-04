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
