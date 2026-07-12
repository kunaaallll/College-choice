/**
 * Applies the client's QC-round featured lists (BDS + B.Tech).
 * Safe: only flips the `featured` boolean — no deletes, no new rows.
 * Resets existing Dental+Engineering featured flags, then sets featured=true
 * on exactly the client's resolved slugs. Online featured is left untouched.
 *
 *   ../../node_modules/.bin/tsx src/ingest/applyFeatured.ts
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BDS_SLUGS = [
  "new-horizon-dental-college-and-research-institute", // New Horizon, Bilaspur
  "triveni-institute-of-dental-sciences",              // Triveni, Bilaspur
  "shri-balaji-institute-of-dental-sciences",          // Sri Balaji, Raipur
  "maitri-college-of-dentistry",                       // Maitri, Durg (content-bearing row)
  "i-t-s-centre-for-dental-studies-and-research",      // ITS, Ghaziabad
  "saraswati-dental-college",                          // Saraswati, Lucknow
  "k-d-dental-college-and-hospital",                   // KD Dental, Mathura
  "dental-college-azamgarh",                           // Azamgarh Dental
  "yamuna-institute-of-dental-sciences-and-research",  // Yamuna, Yamunanagar
  "swami-devi-dyal-hospital-and-dental-college",       // SDD, Panchkula (content-bearing row)
  "maharaja-ganga-singh-dental-college",               // Maharaja, Ganganagar
  "chattisgarh-dental-college-and-research-institute", // CDCRI, Rajnandgaon
  "national-dental-college-and-hospital",              // National Dental, Punjab
  "kalka-dental-college",                              // Kalka, Meerut
];

const BTECH_SLUGS = [
  "bennett-university",
  "upes-dehradun",
  "sr-university",
  "alliance-university",
  "graphic-era-university",
  "iilm-university",
  "east-point-college-of-engineering-and-technology",
];

// Client entries with no clean DB match — reported, not force-created.
const NOT_FOUND = [
  "BDS: IDS, Bareilly — no Institute of Dental Sciences in Bareilly in DB",
  "BDS: Chandra — DB has 'Chandra Dental College' in Barabanki, not Lucknow (featured via search below if present)",
  "BTech: Vijaybhoomi University — not in DB",
  "BTech: Nagarjuna College of Engineering & Technology — not in DB (only Nagarjuna management/CA colleges exist)",
  "BTech: Woxsen University — not in DB",
];

async function run() {
  // 1. Reset current Dental + Engineering featured flags.
  const reset = await prisma.college.updateMany({
    where: { featured: true, stream: { slug: { in: ["dental", "engineering"] } } },
    data: { featured: false },
  });
  console.log(`Reset ${reset.count} existing Dental/Engineering featured flags.\n`);

  // 2. Set featured=true on resolved slugs.
  const setTrue = async (slugs: string[], label: string) => {
    console.log(`=== ${label} ===`);
    for (const slug of slugs) {
      const r = await prisma.college.updateMany({ where: { slug }, data: { featured: true } });
      console.log(`  ${r.count ? "✓" : "✗ NOT FOUND"} ${slug}`);
    }
  };
  await setTrue(BDS_SLUGS, "BDS featured");
  await setTrue(BTECH_SLUGS, "BTech featured");

  // 3. Chandra dental (Barabanki) — best-effort by search.
  const chandra = await prisma.college.findFirst({
    where: { name: { contains: "Chandra", mode: "insensitive" }, stream: { slug: "dental" } },
    select: { slug: true, name: true, city: { select: { name: true } } },
  });
  if (chandra) {
    await prisma.college.update({ where: { slug: chandra.slug }, data: { featured: true } });
    console.log(`\n  ✓ Chandra dental → ${chandra.slug} (${chandra.city?.name})`);
  } else {
    console.log("\n  ✗ Chandra dental not found");
  }

  // 4. Report featured counts.
  const dentalCount = await prisma.college.count({ where: { featured: true, stream: { slug: "dental" } } });
  const engCount = await prisma.college.count({ where: { featured: true, stream: { slug: "engineering" } } });
  console.log(`\nFeatured now — Dental: ${dentalCount}, Engineering: ${engCount}`);
  console.log("\nNot matched in DB (reported to client, not auto-created):");
  NOT_FOUND.forEach((n) => console.log(`  • ${n}`));
}

run().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
