/**
 * Generates KollegeApply-depth tabbed content for colleges using Groq, grounded
 * on each college's real DB data (NIRF rank, fees, exam, package, city…).
 * Resumable: skips colleges that already have content sections.
 *
 *   npm run gen:content -w @collegechoice/api -- --stream engineering --limit 5
 *   npm run gen:content -w @collegechoice/api -- --online --limit 5
 *   npm run gen:content -w @collegechoice/api -- --slug indian-institute-of-technology-delhi
 *
 * Flags: --stream <slug>  --online  --limit N  --model <groq-model>  --slug <slug>  --force
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import Groq from "groq-sdk";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name: string) => args.includes(`--${name}`);

const MODEL = flag("model") || "llama-3.3-70b-versatile";
const LIMIT = flag("limit") ? Number(flag("limit")) : 1000;
const DELAY_MS = Number(flag("delay") || 2200);

const TABS = ["info", "courses-fees", "admissions", "placements", "cutoffs", "scholarships", "rankings", "hostel"] as const;

interface Gen {
  sections: { tab: string; heading: string; body: string }[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
  courses?: { name: string; duration: string; seats: string; feesLabel: string }[];
  placement?: { avgPackage: string; highestPackage: string; placedPct: string };
  recruiters?: string[];
}

function systemPrompt(): string {
  return [
    "You are a senior education-content writer for a top Indian college directory (like KollegeApply/Shiksha/Collegedunia).",
    "You write detailed, well-structured, SEO-rich content that students actually read.",
    "Rules:",
    "- Use ONLY the facts provided about the college for hard numbers (rank, fees, exam, average package, city, established year).",
    "- Where an exact figure is NOT provided (e.g. branch-wise cutoffs, highest package, hostel fee), give a realistic INDICATIVE range and clearly word it as 'typical', 'approximately', or 'indicative' — never present an invented number as an exact official fact.",
    "- Never fabricate specific named awards, exact dates, or precise statistics that you cannot ground.",
    "- Write in clear British/Indian English. Be specific and useful, not generic filler.",
    "- Markdown only in 'body': paragraphs, '## sub-heading', '- bullet', '**bold**', and GFM tables with | pipes |. No images, no HTML.",
    "Output ONLY a valid JSON object. No preamble.",
  ].join("\n");
}

function userPrompt(c: {
  name: string;
  city: string;
  state: string;
  type: string | null;
  stream: string;
  nirfRank: number | null;
  feesLabel: string | null;
  packageLabel: string | null;
  examName: string | null;
  estd: number | null;
  isOnline: boolean;
  approvals: string[];
}): string {
  const isDental = c.stream === "Dental";
  const facts = [
    `Name: ${c.name}`,
    `City: ${c.city}, ${c.state}`,
    `Type: ${c.type ?? "N/A"}`,
    `Stream/field: ${c.stream}`,
    c.nirfRank ? `NIRF ${c.stream} rank: #${c.nirfRank} (2024)` : "Not in NIRF's formally ranked top-40 for this stream (NIRF Dental only ranks 40 institutes nationally) — do not invent a rank.",
    c.feesLabel ? `Approx total fees: ${c.feesLabel}` : "",
    c.packageLabel ? `Average placement package: ${c.packageLabel}` : "",
    c.examName ? `Admission exam / basis: ${c.examName}` : "",
    c.estd ? `Established: ${c.estd}` : "",
    c.approvals.length ? `Approvals: ${c.approvals.join(", ")}` : "",
    c.isOnline ? "Mode: 100% ONLINE degree (UGC-DEB entitled). Cutoffs/hostel tabs are NOT relevant." : "Mode: on-campus.",
  ]
    .filter(Boolean)
    .join("\n");

  const tabList = c.isOnline
    ? "info, courses-fees, admissions, placements, scholarships, rankings"
    : "info, courses-fees, admissions, placements, cutoffs, scholarships, rankings, hostel";

  const dentalNote = isDental
    ? `\n\nDENTAL-SPECIFIC RULES (this is a dental college, not engineering — do NOT use engineering framing):
- Courses are BDS (5 years incl. 1-year mandatory rotating internship) and MDS specialisations (3 years), NOT B.Tech.
- Admission exam is NEET-UG (mandatory for all BDS in India). Government colleges use state-quota + MCC All India Quota counselling; deemed universities/private colleges run their own NEET-rank-based counselling.
- "cutoffs" tab means NEET score/rank cutoffs, NOT JEE branch-wise ranks.
- "placements" tab: most BDS graduates do NOT go through corporate campus placement. Frame this tab as "Career Outcomes After BDS" — cover MDS specialisation (NEET-MDS), private practice, corporate dental chains (e.g. Clove Dental), government dental officer roles via state PSC exams, and the mandatory internship year. Do NOT invent an "avgPackage" placement stat or a list of corporate "recruiters" — leave the placement/recruiters JSON fields empty/omitted for dental colleges.
- "hostel" tab: standard hostel/mess coverage is fine.
- Never claim a NIRF Dental rank if none was given above — NIRF only ranks the top 40 dental institutes nationally.`
    : "";

  return `Write full detail-page content for this college.

FACTS:
${facts}${dentalNote}

Produce a JSON object with these keys:
{
  "sections": [ { "tab": <one of: ${tabList}>, "heading": "<section title>", "body": "<markdown>" } , ... ],
  "highlights": [ "<6 short highlight bullets>" ],
  "faqs": [ { "question": "...", "answer": "..." } x6 ],
  "courses": [ { "name": "...", "duration": "...", "seats": "...", "feesLabel": "..." } x4-7 ]${isDental ? "" : ',\n  "placement": { "avgPackage": "...", "highestPackage": "...", "placedPct": "..." },\n  "recruiters": [ "<10-14 recruiter names>" ]'}
}

Requirements for "sections":
- Provide 2 to 3 sections PER TAB listed above (aim for ~18 sections total${c.isOnline ? " for online colleges" : ""}).
- Each body: 120-220 words, richly formatted. Include at least one markdown TABLE in courses-fees, ${isDental ? "cutoffs, and rankings" : "placements, " + (c.isOnline ? "and rankings" : "cutoffs, and rankings")}.
- info tab: an "About ${c.name}" section, a highlights TABLE section, and a "Why choose" section.
- courses-fees: fee-structure table + ${isDental ? "BDS/MDS specialisations" : "courses/specialisations"}.
- admissions: step-by-step process + eligibility & documents.
- placements: ${isDental ? '"Career Outcomes After BDS" — MDS/private practice/govt roles + a separate internship & clinical training section (no invented package stats or recruiter names)' : "stats + top recruiters (ground the average on the figure above; frame highest/median as indicative)"}.
- ${c.isOnline ? "" : `cutoffs: ${isDental ? "indicative NEET score/rank cutoff" : "indicative branch-wise closing-rank"} table (clearly labelled indicative).\n- `}scholarships: fee waivers/assistantships + external scholarships.
- rankings: a rankings table${isDental ? " (only include a NIRF rank row if one was given above)" : " (use the NIRF rank above)"} + accreditations.
${c.isOnline ? "" : "- hostel: hostel & mess fees (indicative) + campus life."}

Ground every hard number in the FACTS. Never invent a rank, package figure, or recruiter name that wasn't grounded above. Output ONLY the JSON.`;
}

async function generate(c: Parameters<typeof userPrompt>[0]): Promise<Gen | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await groq.chat.completions.create({
        model: MODEL,
        temperature: 0.55,
        max_tokens: 7000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt() },
          { role: "user", content: userPrompt(c) },
        ],
      });
      const txt = res.choices[0]?.message?.content ?? "";
      const parsed = JSON.parse(txt) as Gen;
      if (Array.isArray(parsed.sections) && parsed.sections.length >= 6) return parsed;
      console.log(`    ↻ thin output (${parsed.sections?.length ?? 0} sections), retrying`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/rate limit|429|tokens per day|TPD/i.test(msg)) {
        console.log(`    ⏸ rate limited — ${msg.slice(0, 160)}`);
        return null; // stop this run; resume later
      }
      console.log(`    ✗ ${msg.slice(0, 160)}, retrying`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  return null;
}

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

async function persist(collegeId: number, g: Gen) {
  const validTabs = new Set(TABS as readonly string[]);
  const sections = g.sections.filter((s) => validTabs.has(s.tab) && s.heading && s.body);
  await prisma.contentSection.deleteMany({ where: { collegeId } });
  await prisma.contentSection.createMany({
    data: sections.map((s, i) => ({ collegeId, tab: s.tab, heading: clean(s.heading).slice(0, 200), body: s.body, sort: i })),
  });

  if (g.highlights?.length) {
    await prisma.highlight.deleteMany({ where: { collegeId } });
    await prisma.highlight.createMany({ data: g.highlights.slice(0, 8).map((text) => ({ collegeId, text: clean(text).slice(0, 300) })) });
  }
  if (g.faqs?.length) {
    await prisma.faq.deleteMany({ where: { collegeId } });
    await prisma.faq.createMany({
      data: g.faqs.slice(0, 8).map((f, i) => ({ collegeId, question: clean(f.question).slice(0, 300), answer: f.answer, sort: i })),
    });
  }
  if (g.courses?.length) {
    await prisma.course.deleteMany({ where: { collegeId } });
    await prisma.course.createMany({
      data: g.courses.slice(0, 8).map((co) => ({
        collegeId,
        name: clean(co.name).slice(0, 160),
        duration: clean(co.duration || "").slice(0, 40),
        seats: clean(co.seats || "").slice(0, 40),
        feesLabel: clean(co.feesLabel || "").slice(0, 40),
      })),
    });
  }
  if (g.placement?.avgPackage) {
    await prisma.placement.upsert({
      where: { collegeId },
      update: { avgPackage: clean(g.placement.avgPackage).slice(0, 40), highestPackage: clean(g.placement.highestPackage || "").slice(0, 40), placedPct: clean(g.placement.placedPct || "").slice(0, 40) },
      create: { collegeId, avgPackage: clean(g.placement.avgPackage).slice(0, 40), highestPackage: clean(g.placement.highestPackage || "").slice(0, 40), placedPct: clean(g.placement.placedPct || "").slice(0, 40) },
    });
  }
  if (g.recruiters?.length) {
    await prisma.collegeRecruiter.deleteMany({ where: { collegeId } });
    for (const name of g.recruiters.slice(0, 16).map(clean).filter(Boolean)) {
      const rec = await prisma.recruiter.upsert({ where: { name }, update: {}, create: { name } });
      await prisma.collegeRecruiter.create({ data: { collegeId, recruiterId: rec.id } }).catch(() => {});
    }
  }
  return sections.length;
}

async function run() {
  const slug = flag("slug");
  const stream = flag("stream");
  const online = has("online");
  const force = has("force");

  const all = has("all");
  const where: Prisma.CollegeWhereInput = { published: true };
  if (slug) where.slug = slug;
  else if (online) where.mode = "Online";
  else if (stream) {
    where.stream = { slug: stream };
    if (!all) where.nirfRank = { not: null };
  }
  if (!force && !slug) where.sections = { none: {} }; // resumable: skip already-generated

  const cols = await prisma.college.findMany({
    where,
    select: {
      id: true, name: true, slug: true, state: true, type: true, mode: true, nirfRank: true,
      feesLabel: true, packageLabel: true, examName: true, estd: true, approvals: true,
      stream: { select: { name: true } }, city: { select: { name: true } },
    },
    orderBy: { nirfRank: "asc" },
    take: LIMIT,
  });

  console.log(`Model: ${MODEL}  |  ${cols.length} colleges to generate\n`);
  let done = 0;
  const t0 = Date.now();
  for (const c of cols) {
    const g = await generate({
      name: c.name,
      city: c.city.name,
      state: c.state ?? "",
      type: c.type,
      stream: c.stream.name,
      nirfRank: c.nirfRank,
      feesLabel: c.feesLabel,
      packageLabel: c.packageLabel,
      examName: c.examName,
      estd: c.estd,
      isOnline: c.mode !== "Campus",
      approvals: c.approvals ?? [],
    });
    if (!g) {
      console.log("\nStopping (rate limit or failure). Re-run later to resume.");
      break;
    }
    const n = await persist(c.id, g);
    done++;
    console.log(`  ✓ [${done}/${cols.length}] ${c.name} — ${n} sections`);
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  const mins = ((Date.now() - t0) / 60000).toFixed(1);
  console.log(`\nDone. ${done} colleges generated in ${mins} min.`);
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
