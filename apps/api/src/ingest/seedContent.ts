/**
 * Seeds full editorial content packs (tabbed detail-page content, courses,
 * placements, recruiters, highlights, FAQs) for enriched colleges.
 * Idempotent: replaces existing rows for each pack's college.
 *
 *   npm run seed:content -w @collegechoice/api            # all packs
 *   npm run seed:content -w @collegechoice/api -- <slug>  # one pack
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
import type { CollegeContentPack } from "./content/types";
import { ALL_PACKS as PACKS } from "./content";

const prisma = new PrismaClient();

async function seedPack(pack: CollegeContentPack) {
  const college = await prisma.college.findUnique({ where: { slug: pack.slug }, select: { id: true, name: true } });
  if (!college) {
    console.log(`  ✗ no college with slug "${pack.slug}" — skipped`);
    return;
  }
  const id = college.id;

  if (pack.college) {
    await prisma.college.update({ where: { id }, data: pack.college });
  }

  if (pack.courses) {
    await prisma.course.deleteMany({ where: { collegeId: id } });
    await prisma.course.createMany({ data: pack.courses.map((c) => ({ ...c, collegeId: id })) });
  }

  if (pack.placement) {
    await prisma.placement.upsert({
      where: { collegeId: id },
      update: pack.placement,
      create: { ...pack.placement, collegeId: id },
    });
  }

  if (pack.recruiters) {
    await prisma.collegeRecruiter.deleteMany({ where: { collegeId: id } });
    for (const name of pack.recruiters) {
      const rec = await prisma.recruiter.upsert({ where: { name }, update: {}, create: { name } });
      await prisma.collegeRecruiter.create({ data: { collegeId: id, recruiterId: rec.id } });
    }
  }

  if (pack.highlights) {
    await prisma.highlight.deleteMany({ where: { collegeId: id } });
    await prisma.highlight.createMany({ data: pack.highlights.map((text) => ({ text, collegeId: id })) });
  }

  if (pack.faqs) {
    await prisma.faq.deleteMany({ where: { collegeId: id } });
    await prisma.faq.createMany({
      data: pack.faqs.map((f, i) => ({ ...f, sort: i, collegeId: id })),
    });
  }

  await prisma.contentSection.deleteMany({ where: { collegeId: id } });
  await prisma.contentSection.createMany({
    data: pack.sections.map((s, i) => ({ ...s, sort: i, collegeId: id })),
  });

  console.log(`  ✓ ${college.name} — ${pack.sections.length} sections across ${new Set(pack.sections.map((s) => s.tab)).size} tabs`);
}

async function run() {
  const only = process.argv[2];
  const packs = only ? PACKS.filter((p) => p.slug === only) : PACKS;
  if (packs.length === 0) {
    console.log(only ? `No pack registered for slug "${only}".` : "No packs registered.");
    return;
  }
  for (const pack of packs) await seedPack(pack);
  console.log("\nDone.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
