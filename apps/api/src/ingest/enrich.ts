/**
 * AI enrichment pass — rewrites each college's descriptionLong into detailed,
 * unique SEO copy using Groq (free tier: 6k req/day, Llama 3.3 70B).
 *
 * Usage:
 *   npm run enrich -w @collegechoice/api
 *   npm run enrich -w @collegechoice/api -- --limit 100
 *   npm run enrich -w @collegechoice/api -- --state "Tamil Nadu"
 *   npm run enrich -w @collegechoice/api -- --only-aicte --limit 500
 *
 * Free-tier limits: 6,000 req/day, 30 RPM — ~3 days for all 13k colleges.
 * Script is fully resumable: skips colleges whose description already has
 * > 150 words (i.e., was previously enriched).
 *
 * Get a free API key: https://console.groq.com/keys
 */
import * as dotenv from "dotenv";
import path from "node:path";
// cwd when run via npm -w @collegechoice/api is D:\kunal\apps\api
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });
import Groq from "groq-sdk";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const API_KEY = process.env.GROQ_API_KEY;
if (!API_KEY) {
  console.error("❌  GROQ_API_KEY is not set.");
  console.error("   Get a free key at https://console.groq.com/keys");
  console.error("   Then add GROQ_API_KEY=gsk_... to your .env");
  process.exit(1);
}

const groq = new Groq({ apiKey: API_KEY });
// llama-3.3-70b-versatile: best quality, 6k RPD free
// llama-3.1-8b-instant: higher quota (14.4k RPD), faster — good alternative
// llama-3.1-8b-instant: 500K TPD free — ~500 colleges/day, fast inference
// llama-3.3-70b-versatile: better quality but only 100K TPD — ~100 colleges/day
const MODEL = "llama-3.1-8b-instant";

// ── CLI args ──────────────────────────────────────────────
const args = process.argv.slice(2);

function argVal(flag: string): string | null {
  const i = args.indexOf(flag);
  return i >= 0 ? (args[i + 1] ?? null) : null;
}

const LIMIT = argVal("--limit") ? parseInt(argVal("--limit")!, 10) : Infinity;
const STATE_FILTER = argVal("--state");
const SOURCE_FILTER = args.includes("--only-aicte") ? "aicte" : null;
const DELAY_MS = 2100; // 28 RPM — safely under free-tier's 30 RPM cap

// ── helpers ───────────────────────────────────────────────

function isEnriched(text: string | null): boolean {
  if (!text) return false;
  // Templated descriptions are ~80 words; AI descriptions are 200-300 words.
  return text.split(/\s+/).length > 150;
}

function buildPrompt(college: {
  name: string;
  location: string;
  state: string | null;
  about: string | null;
  affiliation: string | null;
  approvedBy: string | null;
  stream: { name: string };
  courses: { name: string }[];
}): string {
  const courseList = college.courses.map((c) => c.name).join(", ") || "various undergraduate and postgraduate programmes";
  return `Write an informative description (130–160 words) for the following Indian college. This will appear on a college discovery website for Indian students searching Google.

College name: ${college.name}
Location: ${college.location}${college.state ? `, ${college.state}` : ""}
Field/stream: ${college.stream.name}
Affiliated to: ${college.affiliation || "state technical university"}
Approved by: ${college.approvedBy || "AICTE"}
Key courses offered: ${courseList}

Write 2–3 natural paragraphs covering:
1. What the institution is and what it is known for
2. Academic programmes and specialisations available
3. Campus environment, facilities, and student life (use appropriate general facts for this type of institution)
4. Admission process and career prospects for graduates

Rules:
- Mention the city/district and state name naturally within the text
- Do NOT invent specific NIRF rankings, exact fees, or placement percentages
- Write for a student audience — practical and encouraging
- Plain prose only — no bullet points, no markdown, no headers
- Output ONLY the description text, nothing else`;
}

// ── main ─────────────────────────────────────────────────
async function main() {
  console.log("🤖 College enrichment — Gemini 2.0 Flash-Lite");
  console.log(`   Filters: state=${STATE_FILTER ?? "all"}, source=${SOURCE_FILTER ?? "all"}, limit=${LIMIT}\n`);

  const where: Record<string, unknown> = { published: true };
  if (SOURCE_FILTER) where.source = SOURCE_FILTER;
  if (STATE_FILTER) where.state = STATE_FILTER;

  const colleges = await prisma.college.findMany({
    where,
    select: {
      id: true,
      name: true,
      location: true,
      state: true,
      about: true,
      descriptionLong: true,
      affiliation: true,
      approvedBy: true,
      stream: { select: { name: true } },
      courses: { select: { name: true }, take: 6 },
    },
    orderBy: { id: "asc" },
  });

  const todo = colleges.filter((c) => !isEnriched(c.descriptionLong));
  const cap = LIMIT === Infinity ? todo.length : Math.min(todo.length, LIMIT);

  console.log(`   ${colleges.length} colleges fetched`);
  console.log(`   ${todo.length} need enrichment (${colleges.length - todo.length} already done)`);
  console.log(`   Processing ${cap} in this run`);
  console.log(`   Estimated time: ~${Math.ceil((cap * DELAY_MS) / 60_000)} min\n`);

  if (cap === 0) {
    console.log("✅ Nothing to do.");
    return;
  }

  let done = 0;
  let errors = 0;

  for (const college of todo.slice(0, cap)) {
    try {
      const prompt = buildPrompt(college);
      const result = await groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 400,
      });
      const text = result.choices[0]?.message?.content?.trim() ?? "";

      if (text.split(/\s+/).length < 80) {
        console.warn(`   ⚠  ${college.name}: response too short (${text.split(/\s+/).length} words), skipping`);
        errors++;
        continue;
      }

      await prisma.college.update({
        where: { id: college.id },
        data: { descriptionLong: text },
      });

      done++;
      if (done <= 3 || done % 25 === 0) {
        console.log(`   ✅ [${done}/${cap}] ${college.name}`);
      }
    } catch (err: unknown) {
      errors++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`   ❌ ${college.name}: ${msg.slice(0, 200)}`);

      if (msg.includes("429") || msg.toLowerCase().includes("resource_exhausted")) {
        console.log("   Rate-limited — waiting 65 s before retrying...");
        await new Promise((r) => setTimeout(r, 65_000));
        // retry this college once
        try {
          const retry = await groq.chat.completions.create({
            model: MODEL,
            messages: [{ role: "user", content: buildPrompt(college) }],
            temperature: 0.7,
            max_tokens: 400,
          });
          const text = retry.choices[0]?.message?.content?.trim() ?? "";
          if (text.split(/\s+/).length >= 80) {
            await prisma.college.update({ where: { id: college.id }, data: { descriptionLong: text } });
            done++;
            errors--; // recovered
          }
        } catch {
          console.error(`   ❌ Retry also failed for ${college.name}`);
        }
      }
    }

    if (done + errors < cap) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  const remaining = todo.length - cap;
  console.log(`\n✅ Enriched ${done} colleges. Errors: ${errors}.`);
  if (remaining > 0) {
    console.log(`   ${remaining} colleges still pending — run again to continue (script auto-resumes).`);
  } else {
    console.log("   All colleges enriched!");
  }
}

main()
  .catch((e) => {
    console.error("❌ Fatal:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
