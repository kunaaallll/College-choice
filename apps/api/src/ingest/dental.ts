/**
 * Seeds the official NIRF 2024 Dental top-40 (NIRF only formally ranks 40
 * dental institutes — there is no authoritative numeric ranking beyond that).
 * Real ranks/names/cities from nirfindia.org; fees/type are indicative.
 * Cross-listed institutions (e.g. also ranked in Medical/Management) get a
 * stream-specific slug so every course list is complete — same pattern as nirf.ts.
 *
 *   npm run seed:dental -w @collegechoice/api
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
import { ensureCity, ensureStream, slugify, toCollegeType } from "./normalize";

const prisma = new PrismaClient();
const YEAR = 2024;

type Row = [rank: number, name: string, city: string, state: string, type: "Government" | "Private" | "Deemed"];

const DENTAL: Row[] = [
  [1, "Saveetha Institute of Medical and Technical Sciences", "Chennai", "Tamil Nadu", "Deemed"],
  [2, "Manipal College of Dental Sciences, Manipal", "Manipal", "Karnataka", "Deemed"],
  [3, "Maulana Azad Institute of Dental Sciences", "New Delhi", "Delhi", "Government"],
  [4, "King George's Medical University", "Lucknow", "Uttar Pradesh", "Government"],
  [5, "Dr. D. Y. Patil Vidyapeeth", "Pune", "Maharashtra", "Deemed"],
  [6, "A.B. Shetty Memorial Institute of Dental Sciences", "Mangaluru", "Karnataka", "Deemed"],
  [7, "SRM Dental College", "Chennai", "Tamil Nadu", "Deemed"],
  [8, "Jamia Millia Islamia", "New Delhi", "Delhi", "Government"],
  [9, "Siksha 'O' Anusandhan", "Bhubaneswar", "Odisha", "Deemed"],
  [10, "Sri Ramachandra Institute of Higher Education and Research", "Chennai", "Tamil Nadu", "Deemed"],
  [11, "Manipal College of Dental Sciences, Mangalore", "Mangaluru", "Karnataka", "Deemed"],
  [12, "JSS Dental College and Hospital", "Mysuru", "Karnataka", "Deemed"],
  [13, "Meenakshi Academy of Higher Education and Research", "Chennai", "Tamil Nadu", "Deemed"],
  [14, "Amrita Vishwa Vidyapeetham", "Coimbatore", "Tamil Nadu", "Deemed"],
  [15, "Government Dental College, Nagpur", "Nagpur", "Maharashtra", "Government"],
  [16, "M.S. Ramaiah University of Applied Sciences", "Bengaluru", "Karnataka", "Private"],
  [17, "Banaras Hindu University", "Varanasi", "Uttar Pradesh", "Government"],
  [18, "Aligarh Muslim University", "Aligarh", "Uttar Pradesh", "Government"],
  [19, "Government Dental College, Bangalore", "Bengaluru", "Karnataka", "Government"],
  [20, "Dr. M. G. R. Educational and Research Institute", "Chennai", "Tamil Nadu", "Deemed"],
  [21, "Government Dental College, Thiruvananthapuram", "Thiruvananthapuram", "Kerala", "Government"],
  [22, "Kalinga Institute of Industrial Technology", "Bhubaneswar", "Odisha", "Deemed"],
  [23, "Postgraduate Institute of Dental Sciences, Rohtak", "Rohtak", "Haryana", "Government"],
  [24, "Datta Meghe Institute of Higher Education and Research", "Wardha", "Maharashtra", "Deemed"],
  [25, "Government Dental College, Mumbai", "Mumbai", "Maharashtra", "Government"],
  [26, "Yenepoya Dental College", "Mangaluru", "Karnataka", "Deemed"],
  [27, "Panjab University", "Chandigarh", "Chandigarh", "Government"],
  [28, "Nair Hospital Dental College", "Mumbai", "Maharashtra", "Government"],
  [29, "KLE Vishwanath Katti Institute of Dental Sciences", "Belagavi", "Karnataka", "Deemed"],
  [30, "Christian Dental College, Ludhiana", "Ludhiana", "Punjab", "Private"],
  [31, "SDM College of Dental Sciences & Hospital", "Dharwad", "Karnataka", "Private"],
  [32, "SRM Kattankulathur Dental College", "Chennai", "Tamil Nadu", "Deemed"],
  [33, "Chettinad Dental College and Research Institute", "Kelambakkam", "Tamil Nadu", "Deemed"],
  [34, "Government Dental College, Ahmedabad", "Ahmedabad", "Gujarat", "Government"],
  [35, "Mahatma Gandhi P.G. Institute of Dental Sciences", "Puducherry", "Pondicherry", "Government"],
  [36, "Bharati Vidyapeeth Dental College and Hospital", "Pune", "Maharashtra", "Deemed"],
  [37, "Bapuji Dental College & Hospital", "Davangere", "Karnataka", "Private"],
  [38, "Manav Rachna International Institute of Research and Studies", "Faridabad", "Haryana", "Deemed"],
  [39, "Adhiparasakthi Dental College and Hospital", "Melmaruvathur", "Tamil Nadu", "Private"],
  [40, "Army College of Dental Sciences", "Secunderabad", "Telangana", "Private"],
];

function moneyFor(type: string): { feesNum: number; feesLabel: string } {
  if (type === "Government") return { feesNum: 150000, feesLabel: "₹1.5 L" };
  return { feesNum: 1600000, feesLabel: "₹16.0 L" };
}
function describe(name: string, rank: number, city: string, state: string, exam: string, m: { feesLabel: string }): string {
  return [
    `${name} is ranked #${rank} among dental institutions in India in the NIRF ${YEAR} rankings.`,
    `Located in ${city}, ${state}, it is one of the country's most reputed dental colleges.`,
    `The approximate total BDS programme fee is ${m.feesLabel}.`,
    `Admission is primarily through ${exam}.`,
    `This page covers ${name}'s BDS/MDS courses, fees, eligibility, cut-offs, admission process and student reviews.`,
  ].join(" ");
}

async function upsertRow([rank, name, city, state, type]: Row, streamId: number) {
  const cityId = await ensureCity(prisma, city, state);
  const base = slugify(name);
  const existing = await prisma.college.findUnique({ where: { slug: base }, select: { streamId: true } });
  const slug = existing && existing.streamId !== streamId ? `${base}-dental` : base;

  const exam = "NEET";
  const m = moneyFor(type);
  const data = {
    name,
    location: `${city}, ${state}`,
    state,
    type: toCollegeType(type),
    rank,
    nirfRank: rank,
    rating: Math.max(4.0, Math.round((4.9 - (rank - 1) * 0.02) * 10) / 10),
    feesNum: m.feesNum,
    feesLabel: m.feesLabel,
    packageLabel: null,
    examName: exam,
    about: `${name} is ranked #${rank} for Dental in NIRF ${YEAR}. Located in ${city}, ${state}.`,
    descriptionLong: describe(name, rank, city, state, exam, m),
    metaTitle: `${name} — NIRF #${rank}, BDS Fees, Admission & Cutoffs`,
    metaDescription: `${name}, ${city}: NIRF ${YEAR} rank #${rank} for Dental. Fees ${m.feesLabel}, admission via ${exam}, BDS/MDS courses, cut-offs & reviews.`.slice(0, 158),
    source: "manual:nirf-dental",
    published: true,
    streamId,
    cityId,
  };
  await prisma.college.upsert({ where: { slug }, update: { ...data, imgUrl: undefined }, create: { ...data, slug } });
}

async function run() {
  const streamId = await ensureStream(prisma, "Dental");

  // Clear only the previously (incorrectly-ranked) NIRF dental rows; keep unranked private colleges as-is.
  const del = await prisma.college.deleteMany({ where: { nirfRank: { not: null }, streamId } });
  console.log(`Cleared ${del.count} old NIRF dental rows.`);

  for (const row of DENTAL) await upsertRow(row, streamId);
  console.log(`Dental: ${DENTAL.length} colleges seeded (NIRF ${YEAR} top 40).`);

  await prisma.$executeRaw`UPDATE "Stream" AS s SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."streamId" = s.id)`;
  await prisma.$executeRaw`UPDATE "City" AS ci SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."cityId" = ci.id)`;
  console.log("\nDone.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
