/**
 * Ingestion CLI. Loads colleges from an open-data source into Postgres.
 *
 *   npm run ingest -- --source=sample
 *   npm run ingest -- --source=csv --file=./data/colleges.sample.csv
 *
 * Idempotent: re-running updates existing colleges (matched by name + city)
 * instead of creating duplicates. See DATA.md for sourcing guidance.
 */
import "dotenv/config";
import { prisma } from "../prisma";
import { upsertColleges } from "./upsert";
import { csvSource } from "./sources/csv";
import { sampleSource } from "./sources/sample";
import { IngestSource } from "./types";

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split("=").slice(1).join("=");
  const idx = process.argv.indexOf(`--${name}`);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

function resolveSource(): IngestSource {
  const source = arg("source") || "sample";
  switch (source) {
    case "sample":
      return sampleSource();
    case "csv": {
      const file = arg("file");
      if (!file) throw new Error("--file=<path> is required for --source=csv");
      return csvSource(file);
    }
    default:
      throw new Error(`Unknown source "${source}". Use: sample | csv`);
  }
}

async function main() {
  const src = resolveSource();
  console.log(`📥 Ingesting from "${src.name}"…`);
  const rows = await src.load();
  console.log(`   parsed ${rows.length} rows`);
  const result = await upsertColleges(prisma, rows, src.name);
  console.log(
    `✅ Done — created ${result.created}, updated ${result.updated}, skipped ${result.skipped} (of ${result.total}).`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Ingest failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
