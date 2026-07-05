/**
 * Applies user-supplied college photos. Drop images named by slug into
 * apps/web/public/colleges/ (e.g. iit-guwahati.jpg) and run:
 *
 *   npm run images:local -w @collegechoice/api
 *
 * Each <slug>.(jpg|jpeg|png|webp) sets that college's imgUrl to /colleges/<file>.
 */
import * as dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  const dir = path.join(process.cwd(), "..", "..", "apps", "web", "public", "colleges");
  if (!fs.existsSync(dir)) {
    console.log(`No folder at ${dir} — create it and add <slug>.jpg photos.`);
    return;
  }
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  let ok = 0;
  for (const file of files) {
    const slug = file.replace(/\.(jpe?g|png|webp)$/i, "");
    const found = await prisma.college.findUnique({ where: { slug }, select: { id: true } });
    if (!found) {
      console.log(`  – no college with slug "${slug}" (file ${file})`);
      continue;
    }
    await prisma.college.update({ where: { id: found.id }, data: { imgUrl: `/colleges/${file}`, source: "manual:photo" } });
    ok++;
    console.log(`  ✓ ${slug}`);
  }
  console.log(`\nDone. ${ok}/${files.length} photos applied.`);
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
