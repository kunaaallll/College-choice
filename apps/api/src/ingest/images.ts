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

async function wikiApi(params: Record<string, string>, tries = 3): Promise<any> {
  const url = "https://en.wikipedia.org/w/api.php?format=json&origin=*&" + new URLSearchParams(params).toString();
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "CollegeChoice/1.0 (contact@collegechoice.in)" } });
      if (res.ok) return await res.json();
    } catch {
      /* retry */
    }
    await sleep(2000); // back off on failure/soft-block
  }
  return null;
}

/** Resolve the correct Wikipedia article title for a college, or null. */
async function pageTitleFor(name: string): Promise<string | null> {
  const data = await wikiApi({ action: "query", generator: "search", gsrlimit: "1", gsrsearch: name, prop: "info" });
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page: any = Object.values(pages)[0];
  const title = String(page?.title || "");
  return title && titleMatches(name, title) ? title : null;
}

// Filenames that are clearly not a campus photo.
const BAD_IMG = /logo|seal|emblem|coat|crest|map|icon|flag|signature|wordmark|symbol|banner|qr[_-]|\.svg$/i;
// Filenames that strongly suggest a campus/building photo (ranked first).
const GOOD_HINT = /campus|building|gate|entrance|aerial|main|block|hall|academ|library|hostel|admin|view|tower|quad/i;

/** Pick a real campus photo from a Wikipedia article's images — one API call. */
async function campusPhoto(title: string): Promise<string | null> {
  const data = await wikiApi({
    action: "query",
    titles: title,
    generator: "images",
    gimlimit: "80",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1200",
  });
  const pages = data?.query?.pages;
  if (!pages) return null;
  const candidates = (Object.values(pages) as any[])
    .map((p) => ({ t: String(p.title || ""), url: (p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url) as string | undefined }))
    .filter((c) => /\.jpe?g$/i.test(c.t) && !BAD_IMG.test(c.t) && !!c.url && c.url.startsWith("https://upload.wikimedia.org"));
  if (candidates.length === 0) return null;
  // Prefer campus/building filenames, then the first available photo.
  candidates.sort((a, b) => (GOOD_HINT.test(b.t) ? 1 : 0) - (GOOD_HINT.test(a.t) ? 1 : 0));
  return candidates[0].url!;
}

// Exact Wikipedia article titles for colleges whose short name doesn't match
// (search + validation would otherwise miss them).
const OVERRIDE_TITLE: Record<string, string> = {
  "IIT Guwahati": "Indian Institute of Technology Guwahati",
  "NIT Trichy": "National Institute of Technology, Tiruchirappalli",
  "VIT Vellore": "Vellore Institute of Technology",
  "SRM Institute of Science and Technology": "SRM Institute of Science and Technology",
  "Delhi Technological University": "Delhi Technological University",
  "National Law School of India University": "National Law School of India University",
  "IIM Lucknow": "Indian Institute of Management Lucknow",
  "IIM Indore": "Indian Institute of Management Indore",
  "IIT Bombay — Shailesh J. Mehta School of Management": "Indian Institute of Technology Bombay",
  "Management Development Institute": "Management Development Institute",
  "IIM Rohtak": "Indian Institute of Management Rohtak",
  "PGIMER Chandigarh": "Postgraduate Institute of Medical Education and Research, Chandigarh",
  "CMC Vellore": "Christian Medical College, Vellore",
  "NIMHANS Bengaluru": "National Institute of Mental Health and Neurosciences",
  "JIPMER Puducherry": "Jawaharlal Institute of Postgraduate Medical Education and Research",
  "SGPGIMS Lucknow": "Sanjay Gandhi Postgraduate Institute of Medical Sciences",
  "Institute of Medical Sciences, BHU": "Institute of Medical Sciences, Banaras Hindu University",
  "Kasturba Medical College, Manipal": "Kasturba Medical College, Manipal",
  "Sri Ramachandra Institute of Higher Education": "Sri Ramachandra Institute of Higher Education and Research",
  "St. John's Medical College": "St. John's Medical College, Bangalore",
  "IISc Bangalore": "Indian Institute of Science",
  "Saveetha Institute of Medical and Technical Sciences": "Saveetha Institute of Medical and Technical Sciences",
  "Maulana Azad Institute of Dental Sciences": "Maulana Azad Institute of Dental Sciences",
  "Dr. D.Y. Patil Vidyapeeth (Dental)": "Dr. D. Y. Patil Vidyapeeth",
  "SRM Dental College": "SRM Dental College",
  "JSS Dental College and Hospital": "JSS Dental College and Hospital",
  "Faculty of Dental Sciences, KGMU": "King George's Medical University",
  "Nair Hospital Dental College": "Nair Hospital Dental College",
  "SDM College of Dental Sciences and Hospital": "SDM College of Dental Sciences and Hospital",
  "Government Dental College and Hospital, Mumbai": "Government Dental College and Hospital, Mumbai",
};

async function wdApi(host: string, params: Record<string, string>): Promise<any> {
  const url = `https://${host}/w/api.php?format=json&origin=*&` + new URLSearchParams(params).toString();
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "CollegeChoice/1.0 (contact@collegechoice.in)" } });
      if (res.ok) return await res.json();
    } catch {
      /* retry */
    }
    await sleep(1500);
  }
  return null;
}

/** Resolve a Commons File: name to an image URL. */
async function commonsUrl(file: string): Promise<string | null> {
  const d = await wdApi("commons.wikimedia.org", {
    action: "query",
    titles: `File:${file}`,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1200",
  });
  const pages = d?.query?.pages;
  if (!pages) return null;
  const pg: any = Object.values(pages)[0];
  const src: string | undefined = pg?.imageinfo?.[0]?.thumburl || pg?.imageinfo?.[0]?.url;
  return src && src.startsWith("https://upload.wikimedia.org") ? src : null;
}

/** Wikidata "image" (P18) for a college — validated so we don't grab the wrong entity. */
async function wikidataImage(name: string): Promise<string | null> {
  const s = await wdApi("www.wikidata.org", {
    action: "wbsearchentities",
    search: name,
    language: "en",
    type: "item",
    limit: "3",
  });
  const hits: any[] = s?.search || [];
  // Pick the first entity whose label clearly matches and looks like an institution.
  const hit = hits.find(
    (h) => titleMatches(name, String(h.label || "")) && /universit|college|institut|school/i.test(String(h.description || "")),
  );
  if (!hit) return null;
  const c = await wdApi("www.wikidata.org", { action: "wbgetclaims", entity: hit.id, property: "P18" });
  const file: string | undefined = c?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
  if (!file || BAD_IMG.test(file)) return null;
  return commonsUrl(file);
}

/** A validated, real photo for a college — Wikipedia article, then Wikidata; else null. */
async function wikiImage(name: string): Promise<string | null> {
  const title = OVERRIDE_TITLE[name] ?? (await pageTitleFor(name));
  if (title) {
    const p = await campusPhoto(title);
    if (p) return p;
  }
  return wikidataImage(name);
}

/** Fetch real photos for featured + ranked colleges; fall back to stock when unsure. */
async function enrichReal(onlyMissing: boolean) {
  const notable = { OR: [{ featured: true }, { rank: { not: null } }] };
  const cols = await prisma.college.findMany({
    where: onlyMissing ? { AND: [notable, { NOT: { imgUrl: { contains: "wikimedia" } } }] } : notable,
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
    await sleep(1200); // be gentle with the Wikipedia API (avoid soft-blocks)
  }
  console.log(`Real photos set for ${real}/${cols.length}; the rest use clean stock.`);
}

async function run() {
  const onlyMissing = process.argv.includes("--missing");
  await assignStock();
  await enrichReal(onlyMissing);
  console.log("\nDone.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
