/**
 * Populates college images:
 *   1. Assigns a clean stock photo (by stream) to every college that has none,
 *      so no card is ever blank.
 *   2. Fetches a real photo from Wikipedia for featured / ranked colleges
 *      (the famous ones almost always have a Wikipedia page image).
 *
 *   npm run images -w @collegechoice/api
 *
 * Idempotent and safe to re-run. Only overwrites with a real Wikipedia photo;
 * never clobbers an existing real image with stock.
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// Known-good stock pools (rotated by college id so cards vary).
const CAMPUS = [
  u("1562774053-701939374585"),
  u("1523050854058-8df90110c9f1"),
  u("1541339907198-e08756dedf3f"),
  u("1498243691581-b145c3f54a5a"),
];
const POOLS: Record<string, string[]> = {
  dental: [u("1588776814546-1ffcf47267a5"), ...CAMPUS.slice(0, 3)],
  medical: [u("1519494026892-80bbd2d6fd0d"), ...CAMPUS.slice(0, 3)],
  management: [u("1497215842964-222b430dc094"), ...CAMPUS.slice(0, 3)],
};

/** Bulk-assign a rotating stock image to colleges with no image, per stream. */
async function assignStock() {
  const streams = await prisma.stream.findMany({ select: { id: true, slug: true } });
  let touched = 0;
  for (const s of streams) {
    const pool = POOLS[s.slug] ?? CAMPUS;
    const cases = pool.map((url, i) => `WHEN ${i} THEN '${url}'`).join(" ");
    const n = await prisma.$executeRawUnsafe(
      `UPDATE "College" SET "imgUrl" = CASE ("id" % ${pool.length}) ${cases} END
       WHERE "imgUrl" IS NULL AND "streamId" = ${s.id}`,
    );
    touched += Number(n);
  }
  console.log(`Stock images assigned to ${touched} colleges without a photo.`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Generic words dropped when checking whether a Wikipedia page is really the college.
const STOP = new Set([
  "the", "of", "and", "for", "amp", "dental", "medical", "college", "hospital",
  "university", "institute", "school", "research", "centre", "center", "sciences",
  "science", "memorial", "group", "institutions", "technology", "management",
  "online", "national", "indian", "studies",
]);

const keyTokens = (name: string): string[] =>
  name.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !STOP.has(w));

/** True only if the matched page title shares a distinctive word with the college. */
const titleMatches = (name: string, title: string): boolean => {
  const t = title.toLowerCase();
  const toks = keyTokens(name);
  return toks.length > 0 && toks.some((w) => t.includes(w));
};

const stockFor = (slug: string, id: number): string => {
  const pool = POOLS[slug] ?? CAMPUS;
  return pool[id % pool.length];
};

/** Validated top page image from Wikipedia — returns null unless the page is clearly the college. */
async function wikiImage(name: string): Promise<string | null> {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*" +
    "&generator=search&gsrlimit=1&prop=pageimages&pithumbsize=1200" +
    `&gsrsearch=${encodeURIComponent(name)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "CollegeChoice/1.0 (contact@collegechoice.in)" } });
    if (!res.ok) return null;
    const data: any = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const page: any = Object.values(pages)[0];
    const src: string | undefined = page?.thumbnail?.source;
    if (!src || !src.startsWith("https://upload.wikimedia.org")) return null;
    // Reject wrong matches (search often returns an unrelated institution).
    if (!titleMatches(name, String(page.title || ""))) return null;
    // Skip bare logos/signatures — we want campus photos.
    if (/logo|signature|seal|emblem/i.test(src)) return null;
    return src;
  } catch {
    return null;
  }
}

/** Fetch real photos for featured + ranked colleges; fall back to stock when unsure. */
async function enrichReal() {
  const cols = await prisma.college.findMany({
    where: { OR: [{ featured: true }, { rank: { not: null } }] },
    select: { id: true, name: true, stream: { select: { slug: true } } },
    orderBy: [{ featured: "desc" }, { rank: "asc" }],
    take: 400,
  });
  console.log(`Resolving photos for ${cols.length} notable colleges…`);
  let real = 0;
  for (const c of cols) {
    const img = await wikiImage(c.name);
    // Use the validated Wikipedia photo, otherwise a clean stock image (never a wrong photo).
    const imgUrl = img ?? stockFor(c.stream.slug, c.id);
    await prisma.college.update({
      where: { id: c.id },
      data: { imgUrl, source: img ? "manual:wiki" : "manual:stock" },
    });
    if (img) {
      real++;
      console.log(`  ✓ ${c.name}`);
    }
    await sleep(250); // be gentle with the Wikipedia API
  }
  console.log(`Real photos set for ${real}/${cols.length}; the rest use clean stock.`);
}

async function run() {
  await assignStock();
  await enrichReal();
  console.log("\nDone.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
