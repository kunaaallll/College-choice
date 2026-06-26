import { PrismaClient } from "@prisma/client";
import { IngestResult, RawCollege } from "./types";
import { buildSeoText, ensureCity, ensureStream, toCollegeType, uniqueCollegeSlug } from "./normalize";

/**
 * Loads normalised colleges into Postgres. Idempotent: matches on slug, so
 * re-running a source updates rather than duplicates. Fills SEO-critical fields
 * (slug, long description, meta) whenever a source leaves them blank.
 */
export async function upsertColleges(
  prisma: PrismaClient,
  rows: RawCollege[],
  source: string,
): Promise<IngestResult> {
  const result: IngestResult = { source, total: rows.length, created: 0, updated: 0, skipped: 0 };

  for (const raw of rows) {
    if (!raw.name?.trim() || !raw.city?.trim()) {
      result.skipped++;
      continue;
    }

    const state = raw.state ?? raw.city.split(",").pop()?.trim() ?? null;
    const [streamId, cityId] = await Promise.all([
      ensureStream(prisma, raw.stream),
      ensureCity(prisma, raw.city, state),
    ]);

    const existing = await prisma.college.findFirst({
      where: { name: raw.name, cityId },
      select: { id: true, slug: true },
    });
    const slug = existing?.slug ?? (await uniqueCollegeSlug(prisma, raw.name, raw.city));

    const seo = buildSeoText({
      name: raw.name,
      city: raw.city,
      state,
      stream: raw.stream,
      type: raw.type,
      estd: raw.estd,
      feesLabel: raw.feesLabel,
      packageLabel: raw.packageLabel,
      examName: raw.examName,
    });

    const data = {
      name: raw.name.trim(),
      location: raw.state ? `${raw.city}, ${raw.state}` : raw.city,
      state,
      type: toCollegeType(raw.type),
      rank: raw.rank ?? null,
      nirfRank: raw.nirfRank ?? null,
      rating: raw.rating ?? null,
      feesNum: raw.feesNum ?? null,
      feesLabel: raw.feesLabel ?? null,
      packageLabel: raw.packageLabel ?? null,
      examName: raw.examName ?? null,
      estd: raw.estd ?? null,
      imgUrl: raw.imgUrl ?? null,
      about: raw.about ?? null,
      descriptionLong: raw.descriptionLong ?? seo.descriptionLong,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      website: raw.website ?? null,
      affiliation: raw.affiliation ?? null,
      approvedBy: raw.approvedBy ?? null,
      source,
      sourceUrl: raw.sourceUrl ?? null,
      lastSyncedAt: new Date(),
      published: true,
      streamId,
      cityId,
    };

    if (existing) {
      await prisma.college.update({ where: { id: existing.id }, data });
      result.updated++;
    } else {
      await prisma.college.create({ data: { ...data, slug } });
      result.created++;
    }
  }

  // Refresh denormalised counts used by the UI / landing pages.
  await refreshCounts(prisma);
  return result;
}

/**
 * Recomputes collegeCount on Stream and City after a load.
 * Uses one UPDATE statement per table (correlated subquery) instead of a
 * Promise.all flood of per-row updates — far gentler on serverless Postgres
 * (Neon), which can drop the connection under a burst of concurrent queries.
 */
export async function refreshCounts(prisma: PrismaClient) {
  await prisma.$executeRaw`
    UPDATE "Stream" AS s
    SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."streamId" = s.id)`;
  await prisma.$executeRaw`
    UPDATE "City" AS ci
    SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."cityId" = ci.id)`;
}
