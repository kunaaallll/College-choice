/**
 * Publishing rules shared by public routes, the sitemap inventory and the admin:
 * what counts as live, and a scheduler that refreshes the site when scheduled
 * content goes live or expires.
 */
import type { NewsArticle, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidateWeb } from "./revalidate";
import { invalidateInventory } from "./seo";

/** Prisma filter for articles visible on the public site right now. */
export const liveNewsWhere = (now = new Date()): Prisma.NewsArticleWhereInput => ({
  status: "PUBLISHED",
  AND: [
    { OR: [{ publishAt: null }, { publishAt: { lte: now } }] },
    { OR: [{ unpublishAt: null }, { unpublishAt: { gt: now } }] },
  ],
});

export type DisplayStatus = "draft" | "in_review" | "scheduled" | "published" | "expired" | "unpublished";

/** The status an editor sees: PUBLISHED splits into scheduled / live / expired. */
export function displayStatus(a: Pick<NewsArticle, "status" | "publishAt" | "unpublishAt">, now = new Date()): DisplayStatus {
  if (a.status === "DRAFT") return "draft";
  if (a.status === "IN_REVIEW") return "in_review";
  if (a.status === "UNPUBLISHED") return "unpublished";
  if (a.publishAt && a.publishAt > now) return "scheduled";
  if (a.unpublishAt && a.unpublishAt <= now) return "expired";
  return "published";
}

let lastTick = new Date(Date.now() - 2 * 60_000);

/** Once a minute: refresh pages whose articles just went live or expired. */
async function tick() {
  const now = new Date();
  const changed = await prisma.newsArticle.findMany({
    where: {
      status: "PUBLISHED",
      OR: [{ publishAt: { gt: lastTick, lte: now } }, { unpublishAt: { gt: lastTick, lte: now } }],
    },
    select: { slug: true },
  });
  lastTick = now;
  if (changed.length) {
    invalidateInventory();
    revalidateWeb({ paths: ["/news", "/", ...changed.map((a) => `/news/${a.slug}`)], tags: ["seo-settings"] });
    console.log(`[scheduler] ${changed.length} scheduled article change(s) went live/expired`);
  }
}

// College tab pages (besides the main page) to refresh after a content change.
const COLLEGE_TABS = ["courses-fees", "admissions", "recognition", "learning", "placements", "cutoffs", "scholarships", "rankings", "hostel"];

/** Refresh a college's live pages (main + tabs). */
export async function revalidateCollege(collegeId: number) {
  const c = await prisma.college.findUnique({ where: { id: collegeId }, select: { slug: true } });
  if (c) revalidateWeb({ paths: [`/colleges/${c.slug}`, ...COLLEGE_TABS.map((t) => `/colleges/${c.slug}/${t}`)] });
}

export function startScheduler() {
  setInterval(() => { tick().catch((e) => console.error("[scheduler]", e)); }, 60_000).unref();
}
