// A full editorial content pack for one college's tabbed detail pages.

export interface TabSection {
  tab:
    | "info"
    | "courses-fees"
    | "admissions"
    | "placements"
    | "cutoffs"
    | "scholarships"
    | "rankings"
    | "hostel"
    // Online-degree-specific tabs (only rendered for online colleges).
    | "recognition"
    | "learning";
  heading: string;
  body: string; // markdown: paragraphs, **bold**, - lists, | tables |
}

export interface CollegeContentPack {
  slug: string;
  /** Optional field updates on the College row itself. */
  college?: {
    estd?: number;
    website?: string;
    feesNum?: number;
    feesLabel?: string;
    packageLabel?: string;
    about?: string;
    metaTitle?: string;
    metaDescription?: string;
    affiliation?: string;
    approvedBy?: string;
  };
  courses?: { name: string; duration: string; seats: string; feesLabel: string }[];
  placement?: { avgPackage: string; highestPackage: string; placedPct: string };
  recruiters?: string[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
  sections: TabSection[];
}
