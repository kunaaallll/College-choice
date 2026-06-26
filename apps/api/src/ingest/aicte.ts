/**
 * Bulk loader for the AICTE institutions dataset (MIT-licensed, ~13k colleges).
 * Source: https://github.com/anburocky3/indian-colleges-data
 *
 *   npm run db:load:aicte -- <path-to-institutions-with-programmes.json>
 *
 * Uses batched `createMany` (one multi-row INSERT per batch) so 13k colleges
 * load in minutes over a remote DB (Neon) instead of hours of per-row upserts.
 * Additive & idempotent: slugs are de-duped against existing colleges and
 * `skipDuplicates` means re-running won't create duplicates.
 *
 * Descriptions are templated now (free); run the AI-enrichment pass later to
 * upgrade priority colleges to detailed unique copy.
 */
import fs from "node:fs";
import path from "node:path";
import { CollegeMode, CollegeType, Prisma, PrismaClient } from "@prisma/client";
import { slugify } from "./normalize";
import { refreshCounts } from "./upsert";

const prisma = new PrismaClient();

interface Programme {
  programme?: string;
  level?: string;
  course?: string;
  intake?: string;
}
interface Institution {
  institute_name?: string;
  address?: string;
  district?: string;
  state?: string;
  institution_type?: string;
  university?: string;
  programmes?: Programme[];
}

// ── helpers ──────────────────────────────────────────────────
const ACRONYMS =
  /\b(IIT|NIT|IIIT|IIM|IISC|BITS|VIT|SRM|JNTU|KIIT|GITAM|MIT|REC|COE|MNIT|MANIT|VNIT|SVNIT|NITK|MNNIT|PSG|BMS|RV|AICTE|UGC|MBA|MCA|BBA|BCA|BTECH|MTECH|IT|CSE|ECE|EEE|AIML)\b/gi;

function titleCase(s?: string): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(ACRONYMS, (m) => m.toUpperCase())
    .replace(/\bGovt\b\.?/gi, "Government") // expand common abbreviation
    .replace(/\.([A-Za-z])/g, ". $1") // space after a period before a letter
    .replace(/\s+,/g, ",") // no space before a comma
    .replace(/,(?=\S)/g, ", ") // space after a comma
    .replace(/\s+/g, " ")
    .trim();
}

function mapType(t?: string): CollegeType | null {
  const v = (t || "").toLowerCase();
  if (v.includes("deemed")) return CollegeType.Deemed;
  if (v.includes("central") || v.includes("state government university")) return CollegeType.Public;
  if (v.includes("state private")) return CollegeType.Private;
  if (v.includes("aided")) return CollegeType.Government;
  if (v.includes("government")) return CollegeType.Government;
  if (v.includes("private")) return CollegeType.Private;
  return null;
}

// programme category → stream (priority order: first match wins)
const STREAM_RULES: [RegExp, string][] = [
  [/engineering|technology/i, "Engineering"],
  [/management/i, "Management"],
  [/computer application/i, "Computer Applications"],
  [/pharmacy/i, "Pharmacy"],
  [/architecture|planning/i, "Architecture"],
  [/hotel|catering/i, "Hospitality"],
  [/design/i, "Design"],
  [/arts|crafts/i, "Arts"],
];
const STREAM_META: Record<string, { initial: string; gradient: string }> = {
  Engineering: { initial: "En", gradient: "linear-gradient(135deg,#6366f1,#4338ca)" },
  Management: { initial: "Mg", gradient: "linear-gradient(135deg,#0ea5e9,#0369a1)" },
  "Computer Applications": { initial: "CA", gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)" },
  Pharmacy: { initial: "Ph", gradient: "linear-gradient(135deg,#16a34a,#15803d)" },
  Architecture: { initial: "Ac", gradient: "linear-gradient(135deg,#f59e0b,#b45309)" },
  Hospitality: { initial: "Ho", gradient: "linear-gradient(135deg,#ec4899,#be185d)" },
  Design: { initial: "De", gradient: "linear-gradient(135deg,#14b8a6,#0f766e)" },
  Arts: { initial: "At", gradient: "linear-gradient(135deg,#ef4444,#b91c1c)" },
  General: { initial: "Ge", gradient: "linear-gradient(135deg,#6366f1,#4338ca)" },
};

function pickStream(progs: Programme[] = []): string {
  const cats = progs.map((p) => p.programme || "");
  for (const [re, name] of STREAM_RULES) if (cats.some((c) => re.test(c))) return name;
  return "General";
}

function topCourses(progs: Programme[] = [], n = 5): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of progs) {
    const c = titleCase(p.course);
    if (c && !seen.has(c)) {
      seen.add(c);
      out.push(c);
      if (out.length >= n) break;
    }
  }
  return out;
}

function buildDescription(o: {
  name: string;
  city: string;
  state: string;
  type: CollegeType | null;
  stream: string;
  affiliation: string;
  cats: string[];
  courses: string[];
}) {
  const typeLabel = o.type ? o.type.toLowerCase().replace("public", "government") + " " : "";
  const catLabel = o.cats.map((c) => c.toLowerCase()).join(", ");
  const descriptionLong = [
    `${o.name} is a ${typeLabel}${o.stream.toLowerCase()} institution located in ${o.city}, ${o.state}. It is approved by AICTE${o.affiliation ? ` and affiliated to ${o.affiliation}` : ""}.`,
    o.cats.length
      ? `The institute offers programmes in ${catLabel}${o.courses.length ? `, including ${o.courses.join(", ")}` : ""}. Admission is typically through the relevant state or national entrance exam followed by counselling.`
      : "",
    `This page covers ${o.name}'s courses, eligibility, admission process and how it compares with other ${o.stream.toLowerCase()} colleges in ${o.city}. Talk to our counsellors for free guidance on fees, cut-offs and seat availability.`,
  ]
    .filter(Boolean)
    .join("\n\n");
  const metaTitle = `${o.name}, ${o.city} — Courses, Admission, Fees & Reviews`;
  const metaDescription =
    `${o.name}, ${o.city}, ${o.state}: AICTE-approved ${o.stream.toLowerCase()} college. Courses, eligibility, admission process, fees & placements.`.slice(
      0,
      158,
    );
  return { descriptionLong, metaTitle, metaDescription };
}

// ── main ─────────────────────────────────────────────────────
async function main() {
  const file = process.argv[2] || process.argv.find((a) => a.endsWith(".json"));
  if (!file) throw new Error("Usage: tsx src/ingest/aicte.ts <institutions-with-programmes.json>");
  const abs = path.resolve(file);
  console.log(`📥 Loading AICTE dataset from ${abs}`);
  const recs: Institution[] = JSON.parse(fs.readFileSync(abs, "utf8"));
  console.log(`   ${recs.length} institutions parsed`);

  // 1) Streams — upsert needed streams, cache name → id
  const streamId = new Map<string, number>();
  for (const [name, meta] of Object.entries(STREAM_META)) {
    const row = await prisma.stream.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name), initial: meta.initial, colorGradient: meta.gradient, degrees: [] },
    });
    streamId.set(name, row.id);
  }

  // 2) Cities — bulk insert distinct districts, then cache slug → id
  const cityBySlug = new Map<string, { name: string; slug: string; state: string }>();
  for (const r of recs) {
    if (!r.district) continue;
    const slug = slugify(r.district);
    if (slug && !cityBySlug.has(slug))
      cityBySlug.set(slug, { name: titleCase(r.district), slug, state: r.state || "" });
  }
  await prisma.city.createMany({ data: [...cityBySlug.values()], skipDuplicates: true });
  const cityRows = await prisma.city.findMany({ select: { id: true, slug: true } });
  const cityId = new Map(cityRows.map((c) => [c.slug, c.id]));
  console.log(`   ${cityBySlug.size} distinct cities ensured`);

  // 3) Colleges — de-dupe slugs against existing, build rows, batch insert
  const seen = new Set<string>();
  (await prisma.college.findMany({ select: { slug: true } })).forEach((c) => seen.add(c.slug));

  const rows: Prisma.CollegeCreateManyInput[] = [];
  for (const r of recs) {
    const name = titleCase(r.institute_name);
    if (!name || !r.district) continue;
    const citySlug = slugify(r.district);
    const cid = cityId.get(citySlug);
    if (!cid) continue;

    const stream = pickStream(r.programmes);
    const cats = [...new Set((r.programmes || []).map((p) => titleCase(p.programme)).filter(Boolean))].slice(0, 4);
    const courses = topCourses(r.programmes);
    const affiliation = titleCase(r.university);
    const type = mapType(r.institution_type);

    let slug = slugify(name);
    if (seen.has(slug)) {
      slug = slugify(`${name} ${r.district}`);
      let i = 2;
      while (seen.has(slug)) slug = slugify(`${name} ${r.district} ${i++}`);
    }
    seen.add(slug);

    const { descriptionLong, metaTitle, metaDescription } = buildDescription({
      name,
      city: titleCase(r.district),
      state: r.state || "",
      type,
      stream,
      affiliation,
      cats,
      courses,
    });

    rows.push({
      name,
      slug,
      location: `${titleCase(r.district)}, ${r.state || ""}`.replace(/, $/, ""),
      state: r.state || null,
      type,
      mode: CollegeMode.Campus,
      approvals: (r.institution_type || "").toLowerCase().includes("university") ? ["AICTE", "UGC"] : ["AICTE"],
      examName: null,
      about: `${name} is an AICTE-approved ${stream.toLowerCase()} institution in ${titleCase(r.district)}, ${r.state || ""}.`.trim(),
      descriptionLong,
      metaTitle,
      metaDescription,
      affiliation: affiliation || null,
      approvedBy: "AICTE",
      source: "aicte",
      sourceUrl: "https://github.com/anburocky3/indian-colleges-data",
      published: true,
      streamId: streamId.get(stream)!,
      cityId: cid,
    });
  }
  console.log(`   ${rows.length} college rows prepared, inserting…`);

  const BATCH = 500;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const res = await prisma.college.createMany({ data: rows.slice(i, i + BATCH), skipDuplicates: true });
    inserted += res.count;
    if ((i / BATCH) % 5 === 0) console.log(`   …${Math.min(i + BATCH, rows.length)}/${rows.length}`);
  }

  await refreshCounts(prisma);
  const total = await prisma.college.count();
  console.log(`✅ Inserted ${inserted} new colleges. DB now has ${total} colleges.`);
}

main()
  .catch((e) => {
    console.error("❌ AICTE load failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
