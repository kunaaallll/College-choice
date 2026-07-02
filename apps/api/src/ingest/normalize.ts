import { CollegeType, PrismaClient } from "@prisma/client";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const STREAM_GRADIENTS: Record<string, string> = {
  Engineering: "linear-gradient(135deg,#6366f1,#4338ca)",
  Medical: "linear-gradient(135deg,#ef4444,#b91c1c)",
  Management: "linear-gradient(135deg,#0ea5e9,#0369a1)",
  Commerce: "linear-gradient(135deg,#16a34a,#15803d)",
  Law: "linear-gradient(135deg,#f59e0b,#b45309)",
  Arts: "linear-gradient(135deg,#ec4899,#be185d)",
  Science: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
  Design: "linear-gradient(135deg,#14b8a6,#0f766e)",
  Dental: "linear-gradient(135deg,#06b6d4,#0e7490)",
};
const DEFAULT_GRADIENT = "linear-gradient(135deg,#6366f1,#4338ca)";

export function toCollegeType(raw?: string | null): CollegeType | null {
  if (!raw) return null;
  const v = raw.trim().toLowerCase();
  if (v.includes("govt") || v.includes("government")) return CollegeType.Government;
  if (v.includes("deemed")) return CollegeType.Deemed;
  if (v.includes("autonom")) return CollegeType.Autonomous;
  if (v.includes("public") || v.includes("central") || v.includes("state")) return CollegeType.Public;
  if (v.includes("private")) return CollegeType.Private;
  return null;
}

/** Upserts a Stream by name and returns its id (defaults to "General"). */
export async function ensureStream(prisma: PrismaClient, name?: string | null): Promise<number> {
  const streamName = (name && name.trim()) || "General";
  const slug = slugify(streamName);
  const initial = streamName.replace(/[^A-Za-z]/g, "").slice(0, 2) || "Ge";
  const row = await prisma.stream.upsert({
    where: { slug },
    update: {},
    create: {
      name: streamName,
      slug,
      initial: initial[0].toUpperCase() + (initial[1] || "").toLowerCase(),
      colorGradient: STREAM_GRADIENTS[streamName] || DEFAULT_GRADIENT,
      degrees: [],
    },
  });
  return row.id;
}

/** Upserts a City by name and returns its id. */
export async function ensureCity(prisma: PrismaClient, name: string, state?: string | null): Promise<number> {
  const cityName = name.trim();
  const slug = slugify(cityName);
  const row = await prisma.city.upsert({
    where: { slug },
    update: state ? { state } : {},
    create: { name: cityName, slug, state: state ?? null },
  });
  return row.id;
}

/**
 * Produces a slug that is unique across colleges. If the base name collides
 * with a *different* college, disambiguates with the city, then a counter.
 */
export async function uniqueCollegeSlug(prisma: PrismaClient, name: string, city: string): Promise<string> {
  const base = slugify(name);
  const existing = await prisma.college.findUnique({ where: { slug: base }, select: { name: true } });
  if (!existing || existing.name === name) return base;

  const withCity = `${base}-${slugify(city)}`;
  const existing2 = await prisma.college.findUnique({ where: { slug: withCity }, select: { name: true } });
  if (!existing2 || existing2.name === name) return withCity;

  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = `${withCity}-${i}`;
    const hit = await prisma.college.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!hit) return candidate;
    i++;
  }
}

/** Generates SEO body + meta when a source didn't provide them. */
export function buildSeoText(input: {
  name: string;
  city: string;
  state?: string | null;
  stream?: string | null;
  type?: string | null;
  estd?: number | null;
  feesLabel?: string | null;
  packageLabel?: string | null;
  examName?: string | null;
}) {
  const { name, city, stream, type, estd, feesLabel, packageLabel, examName } = input;
  const streamL = (stream || "higher education").toLowerCase();
  const parts = [
    `${name} is a ${type ? type.toLowerCase() + " " : ""}${streamL} institution located in ${city}${estd ? `, established in ${estd}` : ""}.`,
    feesLabel ? `The approximate total fees are ${feesLabel}.` : "",
    packageLabel ? `Students report an average placement package of ${packageLabel}.` : "",
    examName ? `Admission is based on ${examName}.` : "",
    `This page covers ${name}'s courses, fees, admission process, placements and student reviews.`,
  ].filter(Boolean);
  const descriptionLong = parts.join(" ");
  const metaTitle = `${name} — Courses, Fees, Admission & Placements`;
  const metaDescription = `${name}, ${city}: ${feesLabel ? `fees ${feesLabel}, ` : ""}${
    packageLabel ? `avg package ${packageLabel}, ` : ""
  }courses, admission process, cutoffs and reviews.`.slice(0, 158);
  return { descriptionLong, metaTitle, metaDescription };
}
