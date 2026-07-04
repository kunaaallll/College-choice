/**
 * Seeds hand-picked "featured" colleges for landing-page sections
 * (BTech, Online, Dental). Idempotent: matches on name+city, so re-running
 * updates rather than duplicates. Sets featured=true and curated fields.
 *
 *   npm run seed:featured -w @collegechoice/api
 *
 * Data here is best-effort curated (locations/estd are real; fees/rank/ratings
 * are indicative) — safe to edit any row and re-run.
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { CollegeMode, PrismaClient } from "@prisma/client";
import { buildSeoText, ensureCity, ensureStream, toCollegeType, uniqueCollegeSlug } from "./normalize";

const prisma = new PrismaClient();

// Known-good Unsplash campus/education images (partners get the sharper shots).
const IMG = {
  campusA: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
  campusB: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
  campusC: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  campusD: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
  online: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  dental: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
};

interface Entry {
  name: string;
  city: string;
  state: string;
  stream: string;
  type: string;
  mode?: "Campus" | "Online";
  estd?: number;
  feesNum?: number;
  feesLabel?: string;
  packageLabel?: string;
  examName?: string;
  approvals?: string[];
  rating?: number;
  rank?: number;
  imgUrl?: string;
  website?: string;
}

// ── BTech featured (#8) — partner colleges get real photos ──
const BTECH: Entry[] = [
  { name: "Bennett University", city: "Greater Noida", state: "Uttar Pradesh", stream: "Engineering", type: "Private", estd: 2016, feesNum: 1360000, feesLabel: "₹13.6 L", packageLabel: "₹8.5 LPA", examName: "JEE Main / NPAT", approvals: ["UGC", "NAAC A+", "AICTE"], rating: 4.4, rank: 31, imgUrl: IMG.campusB, website: "https://www.bennett.edu.in" },
  { name: "Alliance University", city: "Bengaluru", state: "Karnataka", stream: "Engineering", type: "Private", estd: 2010, feesNum: 1200000, feesLabel: "₹12.0 L", packageLabel: "₹7.2 LPA", examName: "JEE Main / AUAT", approvals: ["UGC", "NAAC A+", "AICTE"], rating: 4.2, rank: 38, imgUrl: IMG.campusC, website: "https://www.alliance.edu.in" },
  { name: "IILM University", city: "Greater Noida", state: "Uttar Pradesh", stream: "Engineering", type: "Private", estd: 2018, feesNum: 1100000, feesLabel: "₹11.0 L", packageLabel: "₹6.8 LPA", examName: "JEE Main / IILM", approvals: ["UGC", "NAAC", "AICTE"], rating: 4.1, rank: 42, imgUrl: IMG.campusA, website: "https://iilm.edu" },
  { name: "Shri Ramswaroop Memorial University", city: "Lucknow", state: "Uttar Pradesh", stream: "Engineering", type: "Private", estd: 2012, feesNum: 800000, feesLabel: "₹8.0 L", packageLabel: "₹5.5 LPA", examName: "JEE Main / SRMU", approvals: ["UGC", "NAAC", "AICTE"], rating: 4.0, rank: 55, imgUrl: IMG.campusD },
  { name: "UPES Dehradun", city: "Dehradun", state: "Uttarakhand", stream: "Engineering", type: "Private", estd: 2003, feesNum: 1600000, feesLabel: "₹16.0 L", packageLabel: "₹9.0 LPA", examName: "JEE Main / UPESEAT", approvals: ["UGC", "NAAC A", "AICTE"], rating: 4.3, rank: 34, imgUrl: IMG.campusA },
  { name: "Graphic Era University", city: "Dehradun", state: "Uttarakhand", stream: "Engineering", type: "Deemed", estd: 2008, feesNum: 900000, feesLabel: "₹9.0 L", packageLabel: "₹6.5 LPA", examName: "JEE Main / GEU", approvals: ["UGC", "NAAC A+", "AICTE"], rating: 4.2, rank: 40, imgUrl: IMG.campusC },
];

// ── Online featured (#9) — mode=Online ──
const ONLINE: Entry[] = [
  { name: "Sikkim Manipal University (Online)", city: "Gangtok", state: "Sikkim", stream: "Management", type: "Private", mode: "Online", estd: 1995, feesNum: 150000, feesLabel: "₹1.50 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC A+", "AICTE"], rating: 4.3, rank: 3, imgUrl: IMG.online, website: "https://smude.edu.in" },
  { name: "Manipal University Jaipur (Online)", city: "Jaipur", state: "Rajasthan", stream: "Management", type: "Private", mode: "Online", estd: 2011, feesNum: 166000, feesLabel: "₹1.66 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC A+", "AICTE"], rating: 4.4, rank: 1, imgUrl: IMG.online, website: "https://onlinemanipal.com" },
  { name: "Shoolini University (Online)", city: "Solan", state: "Himachal Pradesh", stream: "Management", type: "Private", mode: "Online", estd: 2009, feesNum: 150000, feesLabel: "₹1.50 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC A"], rating: 4.1, rank: 6, imgUrl: IMG.online },
  { name: "Arka Jain University (Online)", city: "Jamshedpur", state: "Jharkhand", stream: "Management", type: "Private", mode: "Online", estd: 2017, feesNum: 120000, feesLabel: "₹1.20 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC"], rating: 4.0, rank: 8, imgUrl: IMG.online },
  { name: "Alliance University (Online)", city: "Bengaluru", state: "Karnataka", stream: "Management", type: "Private", mode: "Online", estd: 2010, feesNum: 160000, feesLabel: "₹1.60 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC A+"], rating: 4.2, rank: 4, imgUrl: IMG.online },
  { name: "Amity University (Online)", city: "Noida", state: "Uttar Pradesh", stream: "Management", type: "Private", mode: "Online", estd: 2005, feesNum: 199000, feesLabel: "₹1.99 L", examName: "Merit-based", approvals: ["UGC-DEB", "NAAC A+", "WES"], rating: 4.3, rank: 2, imgUrl: IMG.online, website: "https://amityonline.com" },
];

// ── Dental featured (#10) — new "Dental" stream, BDS/MDS ──
const DENTAL: Entry[] = [
  { name: "ITS Dental College", city: "Ghaziabad", state: "Uttar Pradesh", stream: "Dental", type: "Private", estd: 1994, feesNum: 1800000, feesLabel: "₹18.0 L", examName: "NEET", approvals: ["DCI", "NAAC A"], rating: 4.3, rank: 1, imgUrl: IMG.dental },
  { name: "Swami Devi Dayal Hospital & Dental College", city: "Panchkula", state: "Haryana", stream: "Dental", type: "Private", estd: 2004, feesNum: 1200000, feesLabel: "₹12.0 L", examName: "NEET", approvals: ["DCI"], rating: 4.0, rank: 5, imgUrl: IMG.dental },
  { name: "Chandra Dental College & Hospital", city: "Barabanki", state: "Uttar Pradesh", stream: "Dental", type: "Private", estd: 2008, feesNum: 1100000, feesLabel: "₹11.0 L", examName: "NEET", approvals: ["DCI"], rating: 3.9, rank: 7, imgUrl: IMG.dental },
  { name: "Kalka Dental College", city: "Meerut", state: "Uttar Pradesh", stream: "Dental", type: "Private", estd: 2007, feesNum: 1150000, feesLabel: "₹11.5 L", examName: "NEET", approvals: ["DCI"], rating: 4.0, rank: 6, imgUrl: IMG.dental },
  { name: "K.D. Dental College & Hospital", city: "Mathura", state: "Uttar Pradesh", stream: "Dental", type: "Private", estd: 2008, feesNum: 1250000, feesLabel: "₹12.5 L", examName: "NEET", approvals: ["DCI"], rating: 4.1, rank: 4, imgUrl: IMG.dental },
  { name: "Maitri College of Dentistry & Research Centre", city: "Durg", state: "Chhattisgarh", stream: "Dental", type: "Private", estd: 2007, feesNum: 1000000, feesLabel: "₹10.0 L", examName: "NEET", approvals: ["DCI"], rating: 3.8, rank: 10, imgUrl: IMG.dental },
  { name: "Chhattisgarh Dental College & Research Institute", city: "Rajnandgaon", state: "Chhattisgarh", stream: "Dental", type: "Private", estd: 2007, feesNum: 1050000, feesLabel: "₹10.5 L", examName: "NEET", approvals: ["DCI"], rating: 3.9, rank: 9, imgUrl: IMG.dental },
  { name: "New Horizon Dental College & Research Institute", city: "Bilaspur", state: "Chhattisgarh", stream: "Dental", type: "Private", estd: 2008, feesNum: 1000000, feesLabel: "₹10.0 L", examName: "NEET", approvals: ["DCI"], rating: 3.8, rank: 11, imgUrl: IMG.dental },
  { name: "Shree Balaji Dental College & Hospital", city: "Hyderabad", state: "Telangana", stream: "Dental", type: "Private", estd: 2007, feesNum: 1300000, feesLabel: "₹13.0 L", examName: "NEET", approvals: ["DCI"], rating: 4.1, rank: 3, imgUrl: IMG.dental },
  { name: "Triveni Institute of Dental Sciences", city: "Bilaspur", state: "Chhattisgarh", stream: "Dental", type: "Private", estd: 2008, feesNum: 950000, feesLabel: "₹9.5 L", examName: "NEET", approvals: ["DCI"], rating: 3.7, rank: 12, imgUrl: IMG.dental },
];

const ENTRIES = [...BTECH, ...ONLINE, ...DENTAL];

async function run() {
  let created = 0;
  let updated = 0;
  for (const e of ENTRIES) {
    const [streamId, cityId] = await Promise.all([
      ensureStream(prisma, e.stream),
      ensureCity(prisma, e.city, e.state),
    ]);

    // uniqueCollegeSlug returns the existing slug when a same-named college is
    // already present, so the upsert below updates it rather than colliding.
    const slug = await uniqueCollegeSlug(prisma, e.name, e.city);

    const seo = buildSeoText({
      name: e.name,
      city: e.city,
      state: e.state,
      stream: e.stream,
      type: e.type,
      estd: e.estd,
      feesLabel: e.feesLabel,
      packageLabel: e.packageLabel,
      examName: e.examName,
    });

    const data = {
      name: e.name,
      location: `${e.city}, ${e.state}`,
      state: e.state,
      type: toCollegeType(e.type),
      mode: e.mode === "Online" ? CollegeMode.Online : CollegeMode.Campus,
      approvals: e.approvals ?? [],
      // Sit below the NIRF top band (1–20); surfaced via random interleave, not rank.
      rank: e.rank != null ? e.rank + 100 : null,
      rating: e.rating ?? null,
      feesNum: e.feesNum ?? null,
      feesLabel: e.feesLabel ?? null,
      packageLabel: e.packageLabel ?? null,
      examName: e.examName ?? null,
      estd: e.estd ?? null,
      imgUrl: e.imgUrl ?? null,
      about: seo.descriptionLong.slice(0, 200),
      descriptionLong: seo.descriptionLong,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      website: e.website ?? null,
      source: "manual:featured",
      featured: true,
      published: true,
      streamId,
      cityId,
    };

    const res = await prisma.college.upsert({
      where: { slug },
      update: { ...data, imgUrl: undefined }, // keep any real photo fetched by images.ts
      create: { ...data, slug },
      select: { createdAt: true, updatedAt: true },
    });
    if (res.createdAt.getTime() === res.updatedAt.getTime()) created++;
    else updated++;
    console.log(`✓ ${e.name}`);
  }

  await prisma.$executeRaw`
    UPDATE "Stream" AS s SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."streamId" = s.id)`;
  await prisma.$executeRaw`
    UPDATE "City" AS ci SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."cityId" = ci.id)`;

  console.log(`\nDone. ${created} created, ${updated} updated, ${ENTRIES.length} featured total.`);
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
