/**
 * Sets a real "signature" landmark photo for each major city (India Gate for
 * Delhi, Gateway of India for Mumbai, etc.), pulled from Wikipedia.
 *
 *   npm run images:cities -w @collegechoice/api
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// city slug → Wikipedia article of its signature landmark (its lead image is the landmark).
const LANDMARK: Record<string, string> = {
  delhi: "India Gate",
  "new-delhi": "India Gate",
  mumbai: "Gateway of India",
  bengaluru: "Vidhana Soudha",
  bangalore: "Vidhana Soudha",
  chennai: "Kapaleeshwarar Temple",
  kolkata: "Victoria Memorial, Kolkata",
  hyderabad: "Charminar",
  pune: "Shaniwar Wada",
  ahmedabad: "Sabarmati Ashram",
  jaipur: "Hawa Mahal",
  lucknow: "Bara Imambara",
  chandigarh: "Open Hand Monument",
  bhopal: "Taj-ul-Masajid",
  indore: "Rajwada",
  nagpur: "Deekshabhoomi",
  coimbatore: "Marudamalai",
  kochi: "Fort Kochi",
  visakhapatnam: "Kailasagiri",
  bhubaneswar: "Lingaraja Temple",
  guwahati: "Kamakhya Temple",
  dehradun: "Forest Research Institute (India)",
  amritsar: "Golden Temple",
  varanasi: "Dashashwamedh Ghat",
  agra: "Taj Mahal",
  mysuru: "Mysore Palace",
  mysore: "Mysore Palace",
  vellore: "Vellore Fort",
  warangal: "Warangal Fort",
  patna: "Golghar",
  jodhpur: "Mehrangarh",
  gwalior: "Gwalior Fort",
  kozhikode: "Kozhikode Beach",
  vadodara: "Lakshmi Vilas Palace",
  prayagraj: "Triveni Sangam",
  surat: "Dutch Garden, Surat",
  ranchi: "Jagannath Temple, Ranchi",
  thiruvananthapuram: "Padmanabhaswamy Temple",
  tiruchirappalli: "Rockfort",
  madurai: "Meenakshi Temple",
  ludhiana: "Lodhi Fort",
  dhanbad: "Maithon Dam",
};

async function leadPhoto(title: string): Promise<string | null> {
  const url =
    "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&piprop=thumbnail&pithumbsize=1200" +
    `&titles=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "CollegeChoice/1.0 (contact@collegechoice.in)" } });
    if (!res.ok) return null;
    const data: any = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const page: any = Object.values(pages)[0];
    const src: string | undefined = page?.thumbnail?.source;
    return src && src.startsWith("https://upload.wikimedia.org") ? src : null;
  } catch {
    return null;
  }
}

async function run() {
  const cities = await prisma.city.findMany({ select: { id: true, name: true, slug: true } });
  let ok = 0;
  for (const c of cities) {
    const landmark = LANDMARK[c.slug];
    if (!landmark) continue;
    const img = await leadPhoto(landmark);
    if (img) {
      await prisma.city.update({ where: { id: c.id }, data: { imageUrl: img } });
      ok++;
      console.log(`  ✓ ${c.name} → ${landmark}`);
    } else {
      console.log(`  – ${c.name} (${landmark}) not found`);
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  console.log(`\nDone. ${ok} city images set.`);
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
