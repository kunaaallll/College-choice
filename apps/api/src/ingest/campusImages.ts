/**
 * Real campus/building photos for priority colleges, sourced from each college's
 * Wikimedia Commons *category* (college-specific) rather than a generic article
 * scrape — then filtered by filename so we pick the main gate / main building /
 * administrative block / facade, and never a deer, logo, interior, event, hostel,
 * stadium or portrait.
 *
 * Never downgrades to stock: if no confident building photo is found, the college's
 * existing image is left as-is and it's logged as "no confident match" for review.
 *
 *   ../../node_modules/.bin/tsx src/ingest/campusImages.ts            # priority set
 *   ../../node_modules/.bin/tsx src/ingest/campusImages.ts --slug <slug>
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const UA = { "User-Agent": "CollegeChoice/1.0 (contact@collegechoice.in)" };

async function api(host: string, params: Record<string, string>, tries = 3): Promise<any> {
  const url = `https://${host}/w/api.php?format=json&` + new URLSearchParams(params).toString();
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: UA });
      if (res.ok) return await res.json();
    } catch {
      /* retry */
    }
    await sleep(1500);
  }
  return null;
}

// Hand-verified best photos (viewed by eye) — locked, never overwritten.
const OVERRIDE_URL: Record<string, string> = {
  "Indian Institute of Technology Madras": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/IIT_Madras_campus_main_gate.jpg/1280px-IIT_Madras_campus_main_gate.jpg",
  "Indian Institute of Technology Delhi": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Cloudy_day_main_building.jpg",
  "Indian Institute of Technology Roorkee": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Main%28Administrative%29Building_IIT-Roorkee.JPG/1280px-Main%28Administrative%29Building_IIT-Roorkee.JPG",
  "Indian Institute of Management Kozhikode": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/IIM_Kozhikode_Aerial_View_s.jpg/1280px-IIM_Kozhikode_Aerial_View_s.jpg",
};

// Exact Wikipedia titles where the college's DB name won't resolve by search.
const TITLE: Record<string, string> = {
  "Indian Institute of Technology Madras": "Indian Institute of Technology Madras",
  "Vellore Institute of Technology": "Vellore Institute of Technology",
  "National Institute of Technology, Tiruchirappalli": "National Institute of Technology, Tiruchirappalli",
  "All India Institute of Medical Sciences, New Delhi": "All India Institute of Medical Sciences, New Delhi",
};

async function wikiTitle(name: string): Promise<string | null> {
  if (TITLE[name]) return TITLE[name];
  const d = await api("en.wikipedia.org", { action: "query", generator: "search", gsrlimit: "1", gsrsearch: name, prop: "info" });
  const pages = d?.query?.pages;
  if (!pages) return null;
  const t = String((Object.values(pages)[0] as any)?.title || "");
  // Require a distinctive shared token so we don't grab an unrelated page.
  const toks = name.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !["college", "institute", "university", "school", "dental", "medical", "science", "sciences", "technology", "management", "research", "hospital", "national", "indian"].includes(w));
  return toks.some((w) => t.toLowerCase().includes(w)) ? t : null;
}

async function commonsCategory(title: string): Promise<string | null> {
  const d = await api("en.wikipedia.org", { action: "query", titles: title, prop: "pageprops", ppprop: "wikibase_item" });
  const page: any = Object.values(d?.query?.pages || {})[0];
  const qid = page?.pageprops?.wikibase_item;
  if (qid) {
    const c = await api("www.wikidata.org", { action: "wbgetclaims", entity: qid, property: "P373" });
    const cat = c?.claims?.P373?.[0]?.mainsnak?.datavalue?.value;
    if (cat) return `Category:${cat}`;
  }
  return `Category:${title}`; // fallback: many colleges have an eponymous category
}

// Hard-exclude clearly-wrong content by filename.
const BAD = /deer|animal|wildlife|\bbird|monkey|peacock|\bcat\b|\bdog\b|forest|marsh|lake|pond|\btree|banyan|ficus|flower|garden|people|portrait|speaking|conference|seminar|meeting|performance|festival|\bfest\b|saarang|shaastra|summit|inaugurat|releasing|felicitat|convocation|award|mensa|\bmess\b|food court|canteen|stadium|sport|track|gym|interior|classroom|laborator|\blab\b|room|logo|seal|emblem|crest|coat[_ ]of[_ ]arms|\bmap\b|flag|statue|bust|poster|banner|screenshot|book|cover|\bplan\b|diagram|graph|chart|protest|strike|crowd|group[_ ]photo|team|players|match|women|men\b|students?[_ ]|cycle|bicycle|parking|\broad\b|street|\bbus\b|\bcar\b|vehicle|construction|scaffold|signb|sign[_ ]?board|notice|plaque|milestone|hostel|guest[_ ]?house|dormitory|barrack|\bjetty\b|cattle|sculpture|fountain|temple|masjid|church|chapel/i;
// Top-tier: the front-facing landmark of the college.
const TOP = /main[_ ]?gate|main[_ ]?building|main[_ ]?block|administrat|admin[_ ]?block|facade|gateway|clock[_ ]?tower|heritage|front[_ ]?view/i;
// Second-tier: acceptable representative shots.
const MID = /\bentrance\b|aerial|campus[_ ]?view|frontage|central[_ ]?library|convention|academic[_ ]?block/i;

function scoreName(t: string): number {
  if (BAD.test(t)) return -100;
  if (TOP.test(t)) return 10;
  if (MID.test(t)) return 6;
  return 0;
}

async function bestPhoto(cat: string): Promise<{ url: string; title: string } | null> {
  const d = await api("commons.wikimedia.org", {
    action: "query",
    generator: "categorymembers",
    gcmtitle: cat,
    gcmtype: "file",
    gcmlimit: "100",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1280",
  });
  const pages = d?.query?.pages;
  if (!pages) return null;
  const cands = (Object.values(pages) as any[])
    .map((p) => ({ title: String(p.title || ""), url: (p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url) as string | undefined }))
    .filter((c) => /\.(jpe?g)$/i.test(c.title) && !!c.url)
    .map((c) => ({ ...c, s: scoreName(c.title) }))
    .filter((c) => c.s >= 6)
    .sort((a, b) => b.s - a.s);
  return cands.length ? { url: cands[0].url!, title: cands[0].title } : null;
}

async function resolve(name: string): Promise<{ url: string; title: string } | null> {
  if (OVERRIDE_URL[name]) return { url: OVERRIDE_URL[name], title: "verified override" };
  const title = await wikiTitle(name);
  if (!title) return null;
  const cat = await commonsCategory(title);
  if (!cat) return null;
  return bestPhoto(cat);
}

async function run() {
  const slugArg = process.argv.indexOf("--slug");
  let cols;
  if (slugArg >= 0) {
    cols = await prisma.college.findMany({ where: { slug: process.argv[slugArg + 1] }, select: { id: true, name: true, slug: true } });
  } else {
    cols = await prisma.college.findMany({
      where: {
        OR: [
          { stream: { slug: { in: ["engineering", "management", "medical"] } }, nirfRank: { lte: 50 } },
          { stream: { slug: "dental" }, nirfRank: { lte: 40 } },
        ],
      },
      select: { id: true, name: true, slug: true, stream: { select: { slug: true } }, nirfRank: true },
      orderBy: [{ nirfRank: "asc" }],
    });
  }
  // De-dupe by college name (same college can appear under 2 streams).
  const seen = new Map<string, typeof cols>();
  for (const c of cols) { const k = c.name; if (!seen.has(k)) seen.set(k, [] as any); seen.get(k)!.push(c); }
  console.log(`Resolving campus photos for ${seen.size} unique colleges (${cols.length} rows)…\n`);

  let ok = 0, miss = 0;
  for (const [name, rows] of seen) {
    const found = await resolve(name);
    if (found) {
      await prisma.college.updateMany({ where: { name }, data: { imgUrl: found.url, source: "manual:commons" } });
      ok++;
      console.log(`  ✓ ${name}\n      ${found.title}`);
    } else {
      miss++;
      console.log(`  ·  no confident match: ${name}`);
    }
    await sleep(900);
  }
  console.log(`\nDone. Real building photo set for ${ok} colleges; ${miss} left for manual review.`);
}

run().catch((e) => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
