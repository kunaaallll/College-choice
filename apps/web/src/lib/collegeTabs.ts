import type { CollegeDetail } from "./types";

// Tabbed college detail pages (KollegeApply-style). Order = display order.
export const COLLEGE_TABS = [
  ["info", "Info"],
  ["courses-fees", "Courses & Fees"],
  ["admissions", "Admissions"],
  ["placements", "Placements"],
  ["cutoffs", "Cutoffs"],
  ["scholarships", "Scholarships"],
  ["rankings", "Rankings"],
  ["hostel", "Hostel"],
] as const;

export type TabKey = (typeof COLLEGE_TABS)[number][0];

export const TAB_LABEL: Record<string, string> = Object.fromEntries(COLLEGE_TABS);

export const isTabKey = (t: string): t is TabKey => COLLEGE_TABS.some(([k]) => k === t);

/** Sections of a given tab, in order. */
export function tabSections(c: CollegeDetail, tab: string) {
  return (c.sections ?? []).filter((s) => s.tab === tab);
}

/** Tabs that actually have content for this college (info always shows). */
export function availableTabs(c: CollegeDetail): [string, string][] {
  const have = new Set((c.sections ?? []).map((s) => s.tab));
  return COLLEGE_TABS.filter(([k]) => k === "info" || have.has(k)).map(([k, l]) => [k, l]);
}

/** Anchor id for a section heading. */
export const headingId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Per-tab SEO title/description templates. */
export function tabMeta(name: string, tab: TabKey): { title: string; description: string } {
  switch (tab) {
    case "courses-fees":
      return {
        title: `${name} Courses & Fees 2026: Fee Structure, Seats & Eligibility`,
        description: `${name} courses and fee structure 2026 — B.Tech/PG fees, seats, eligibility and category-wise fee waivers.`,
      };
    case "admissions":
      return {
        title: `${name} Admission 2026: Dates, Eligibility & Process`,
        description: `${name} admission 2026 — entrance exams, eligibility, counselling process, important dates and documents required.`,
      };
    case "placements":
      return {
        title: `${name} Placements 2025: Average Package, Highest Package & Recruiters`,
        description: `${name} placement report — average package, median and highest package, placement rate and top recruiters.`,
      };
    case "cutoffs":
      return {
        title: `${name} Cutoff 2025: Branch-wise Closing Ranks`,
        description: `${name} cutoff — branch-wise opening and closing ranks, category-wise trends and what rank you need.`,
      };
    case "scholarships":
      return {
        title: `${name} Scholarships: Fee Waivers & Financial Aid`,
        description: `${name} scholarships — merit-cum-means fee waivers, category benefits, assistantships and external scholarships.`,
      };
    case "rankings":
      return {
        title: `${name} Rankings 2024: NIRF, QS & Accreditations`,
        description: `${name} rankings — NIRF year-wise ranks, global rankings and accreditations explained.`,
      };
    case "hostel":
      return {
        title: `${name} Hostel & Campus Life: Fees, Rooms & Facilities`,
        description: `${name} hostels — hostel and mess fees, room types, facilities and campus life.`,
      };
    default:
      return {
        title: `${name} — Courses, Fees, Admission & Placements`,
        description: `${name}: courses, fees, admission, cutoffs, placements, scholarships, rankings and hostel details.`,
      };
  }
}
