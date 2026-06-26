// Online program catalogue — drives the /online hub links and /online/[program] SEO pages.
export const PROGRAMS = [
  { slug: "mba", label: "Online MBA", term: "MBA", full: "Master of Business Administration" },
  { slug: "mca", label: "Online MCA", term: "MCA", full: "Master of Computer Applications" },
  { slug: "bba", label: "Online BBA", term: "BBA", full: "Bachelor of Business Administration" },
  { slug: "bca", label: "Online BCA", term: "BCA", full: "Bachelor of Computer Applications" },
  { slug: "mcom", label: "Online M.Com", term: "M.Com", full: "Master of Commerce" },
  { slug: "bcom", label: "Online B.Com", term: "B.Com", full: "Bachelor of Commerce" },
  { slug: "ma", label: "Online MA", term: "MA", full: "Master of Arts" },
] as const;

export type Program = (typeof PROGRAMS)[number];

export const programBySlug = (slug: string): Program | undefined =>
  PROGRAMS.find((p) => p.slug === slug);
