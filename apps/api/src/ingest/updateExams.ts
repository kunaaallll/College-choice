/**
 * Targeted update of Exam rows' display date + examOn on the live DB.
 * Safe: only touches Exam rows (no deletes, no college changes).
 * Run from apps/api:  ../../node_modules/.bin/tsx src/ingest/updateExams.ts
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const EXAMS = [
  { name: "CAT", date: "Nov 29, 2026", on: "2026-11-29" },
  { name: "CLAT", date: "Dec 06, 2026", on: "2026-12-06" },
  { name: "JEE Main", date: "Jan 24, 2027", on: "2027-01-24" },
  { name: "GATE", date: "Feb 06, 2027", on: "2027-02-06" },
  { name: "NEET UG", date: "May 02, 2027", on: "2027-05-02" },
  { name: "CUET", date: "May 15, 2027", on: "2027-05-15" },
  { name: "JEE Advanced", date: "May 16, 2027", on: "2027-05-16" },
  { name: "BITSAT", date: "May 22, 2027", on: "2027-05-22" },
];

async function run() {
  for (const e of EXAMS) {
    const r = await prisma.exam.updateMany({
      where: { name: e.name },
      data: { date: e.date, examOn: new Date(e.on) },
    });
    console.log(`${r.count ? "✓" : "✗ (not found)"} ${e.name} → ${e.date}`);
  }
  console.log("\nDone.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
