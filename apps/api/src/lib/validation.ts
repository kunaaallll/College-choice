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
  courseInterested: z.string().trim().max(120).optional(),
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
