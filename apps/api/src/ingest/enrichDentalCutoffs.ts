/**
 * Adds two rich, accurate cutoff sections to every dental college, roughly
 * tripling the "Cutoffs" tab content (well over the requested +100%). Idempotent:
 * removes any previously-added sections with these headings, then re-creates them.
 * Keeps each college's original cutoff section(s).
 *
 *   ../../node_modules/.bin/tsx src/ingest/enrichDentalCutoffs.ts
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const H1 = "NEET-UG Qualifying Cutoffs (Category-wise)";
const H2 = "Counselling Quotas, Rounds & Closing-Rank Guidance";

function qualifyingBody(name: string): string {
  return `Admission to BDS at ${name} requires a **valid, qualifying NEET-UG score**. NEET qualification is defined by **percentile**, not a fixed score — the qualifying percentile is fixed every year, while the equivalent raw score moves with exam difficulty.

| Category | Minimum qualifying percentile |
|---|---|
| General / EWS | 50th percentile |
| OBC / SC / ST | 40th percentile |
| General-PwD | 45th percentile |
| SC / ST / OBC-PwD | 40th percentile |

Qualifying NEET only makes you **eligible** — it does not guarantee a seat. The actual **closing rank** for a BDS seat at ${name} depends on your category, the counselling quota, the number of seats, and how many higher-ranked candidates pick this college ahead of you (explained below). Always confirm the current-year qualifying score on the official NTA NEET result.`;
}

function quotaBody(name: string, type: string | null, state: string): string {
  const st = state || "your state";
  const rounds =
    "Counselling runs in **multiple rounds** — Round 1 → Round 2 → Mop-up → Stray Vacancy. Closing ranks **loosen in later rounds** as higher-ranked candidates settle elsewhere, so a rank that misses an early round can still convert to a seat later.";

  if (type === "Government") {
    return `BDS seats at ${name} are filled through NEET-UG counselling in two quotas:

- **State Quota (~85% of seats)** — through ${st} state counselling, for ${st}-domicile candidates.
- **All India Quota (~15% of seats)** — through MCC (Medical Counselling Committee), open to candidates nationwide.

${rounds}

As a **government dental college**, ${name} usually has the **most competitive closing ranks** (lowest ranks / highest scores) because of its heavily subsidised fees — state-quota seats typically close at stronger ranks than the All India Quota. Exact closing ranks change every year by category and round; check the ${st} counselling and MCC portals for current-year figures, or use the **College Predictor** to estimate your chances.`;
  }

  if (type === "Deemed") {
    return `As a **deemed-to-be university**, ${name} runs its **own centralised NEET-UG counselling** through the MCC deemed/central-universities process — independent of ${st} state counselling. Seats are offered across **general** and **NRI** categories.

${rounds}

Deemed dental colleges are generally the **most accessible on NEET rank** (fees are higher and set by the university), so a comparatively **wide NEET-rank band** can secure a BDS seat here. Exact closing ranks vary each year — check the MCC deemed-universities counselling data, or use the **College Predictor** for a personalised estimate.`;
  }

  // Private (and any other) — state + management/NRI quota.
  return `BDS seats at ${name} are filled through NEET-UG counselling across these quotas:

- **State / Government Quota** — through ${st} state counselling, at regulated (lower) fees.
- **Management Quota** — filled by the college at higher fees, with **more accessible closing ranks**.
- **NRI Quota** — a small share at NRI fees, where seats remain.

${rounds}

As a **private dental college**, ${name} typically has **more accessible closing ranks than government colleges** — management-quota seats in particular admit a wider NEET-rank range. Exact ranks vary each year by category, quota and round; confirm on the ${st} counselling portal, or use the **College Predictor** to see your chances at your NEET rank.`;
}

async function run() {
  const colleges = await prisma.college.findMany({
    where: { streamId: 54 },
    select: { id: true, name: true, type: true, state: true, city: { select: { state: true } } },
  });
  console.log(`Enriching cutoffs for ${colleges.length} dental colleges…`);

  let done = 0;
  for (const c of colleges) {
    const state = c.state || c.city?.state || "";
    // Idempotent: clear previous enrichment, keep the college's original cutoff section(s).
    await prisma.contentSection.deleteMany({ where: { collegeId: c.id, tab: "cutoffs", heading: { in: [H1, H2] } } });
    const max = await prisma.contentSection.aggregate({ where: { collegeId: c.id, tab: "cutoffs" }, _max: { sort: true } });
    let sort = (max._max.sort ?? -1) + 1;
    await prisma.contentSection.createMany({
      data: [
        { collegeId: c.id, tab: "cutoffs", heading: H1, body: qualifyingBody(c.name), sort: sort++ },
        { collegeId: c.id, tab: "cutoffs", heading: H2, body: quotaBody(c.name, c.type, state), sort: sort++ },
      ],
    });
    done++;
    if (done % 50 === 0) console.log(`  …${done}`);
  }
  console.log(`Done. Added 2 rich cutoff sections to ${done} dental colleges.`);
}

run().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
