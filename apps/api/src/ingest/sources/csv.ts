import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { IngestSource, RawCollege } from "../types";

// Flexible header mapping — open datasets name columns differently.
const ALIASES: Record<keyof RawCollege, string[]> = {
  name: ["name", "college", "college_name", "institute", "institution", "institute_name"],
  city: ["city", "district", "location"],
  state: ["state", "state_ut"],
  stream: ["stream", "category", "discipline", "type_of_institution", "field"],
  type: ["type", "ownership", "management", "college_type"],
  rank: ["rank", "editorial_rank"],
  nirfRank: ["nirf_rank", "nirf", "nirf_rank_overall"],
  rating: ["rating", "score"],
  feesNum: ["fees_num", "total_fees", "fees"],
  feesLabel: ["fees_label", "fees_display"],
  packageLabel: ["package", "avg_package", "package_label"],
  examName: ["exam", "entrance_exam", "exam_name"],
  estd: ["estd", "established", "year", "founded"],
  about: ["about", "summary"],
  descriptionLong: ["description", "description_long", "details"],
  website: ["website", "url", "site"],
  affiliation: ["affiliation", "affiliated_to", "university"],
  approvedBy: ["approved_by", "recognition", "approval"],
  imgUrl: ["img", "image", "image_url", "photo"],
  sourceUrl: ["source_url", "source"],
};

const num = (v?: string) => {
  if (v == null) return null;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && v.trim() !== "" ? n : null;
};

function pick(row: Record<string, string>, keys: string[]): string | undefined {
  const lower: Record<string, string> = {};
  for (const [k, val] of Object.entries(row)) lower[k.toLowerCase().trim()] = val;
  for (const k of keys) if (lower[k] != null && lower[k] !== "") return lower[k];
  return undefined;
}

/** Reads a CSV of colleges into normalised RawCollege rows. */
export function csvSource(filePath: string): IngestSource {
  const abs = path.resolve(filePath);
  return {
    name: `csv:${path.basename(abs)}`,
    async load(): Promise<RawCollege[]> {
      const text = fs.readFileSync(abs, "utf8");
      const records: Record<string, string>[] = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      });
      return records.map((r) => ({
        name: pick(r, ALIASES.name) || "",
        city: pick(r, ALIASES.city) || "",
        state: pick(r, ALIASES.state) ?? null,
        stream: pick(r, ALIASES.stream) ?? null,
        type: pick(r, ALIASES.type) ?? null,
        rank: num(pick(r, ALIASES.rank)),
        nirfRank: num(pick(r, ALIASES.nirfRank)),
        rating: num(pick(r, ALIASES.rating)),
        feesNum: num(pick(r, ALIASES.feesNum)),
        feesLabel: pick(r, ALIASES.feesLabel) ?? null,
        packageLabel: pick(r, ALIASES.packageLabel) ?? null,
        examName: pick(r, ALIASES.examName) ?? null,
        estd: num(pick(r, ALIASES.estd)),
        about: pick(r, ALIASES.about) ?? null,
        descriptionLong: pick(r, ALIASES.descriptionLong) ?? null,
        website: pick(r, ALIASES.website) ?? null,
        affiliation: pick(r, ALIASES.affiliation) ?? null,
        approvedBy: pick(r, ALIASES.approvedBy) ?? null,
        imgUrl: pick(r, ALIASES.imgUrl) ?? null,
        sourceUrl: pick(r, ALIASES.sourceUrl) ?? null,
      }));
    },
  };
}
