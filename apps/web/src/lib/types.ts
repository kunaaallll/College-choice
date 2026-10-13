// Shapes returned by the Express API.

export type CollegeType = "Public" | "Private" | "Government" | "Deemed" | "Autonomous";
export type CollegeMode = "Campus" | "Online" | "Distance" | "Hybrid";

export interface StreamRef {
  name: string;
  slug: string;
}
export interface CityRef {
  name: string;
  slug: string;
}

export interface CollegeCard {
  id: number;
  name: string;
  slug: string;
  location: string;
  state: string | null;
  type: CollegeType | null;
  mode: CollegeMode;
  approvals: string[];
  rank: number | null;
  rating: number | null;
  reviewsLabel: string | null;
  feesNum: number | null;
  feesLabel: string | null;
  packageLabel: string | null;
  examName: string | null;
  estd: number | null;
  imgUrl: string | null;
  featured?: boolean;
  stream: StreamRef;
  city: CityRef;
  gallery?: GalleryImage[];
}

export interface Course {
  id: number;
  name: string;
  duration: string;
  seats: string;
  feesLabel: string;
}
export interface Review {
  id: number;
  authorName: string;
  initial: string;
  color: string;
  meta: string;
  stars: number;
  text: string;
}
export interface RatingBar {
  id: number;
  label: string;
  pct: number;
}
export interface GalleryImage {
  id: number;
  url: string;
}
export interface Placement {
  avgPackage: string;
  highestPackage: string;
  placedPct: string;
}
export interface Faq {
  id: number;
  question: string;
  answer: string;
}
export interface ExamRef {
  id: number;
  name: string;
  slug: string;
  fullName: string;
}
export interface ContentSection {
  id: number;
  tab: string; // info | courses-fees | admissions | placements | cutoffs | scholarships | rankings | hostel
  heading: string;
  body: string; // markdown
  sort: number;
}

export interface CollegeDetail extends CollegeCard {
  about: string | null;
  sampleDegreeUrl: string | null;
  descriptionLong: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  nirfRank: number | null;
  website: string | null;
  affiliation: string | null;
  approvedBy: string | null;
  stream: StreamRef & { id: number };
  city: CityRef & { id: number };
  courses: Course[];
  highlights: { id: number; text: string }[];
  reviews: Review[];
  ratingBars: RatingBar[];
  gallery: GalleryImage[];
  placement: Placement | null;
  faqs: Faq[];
  recruiters: string[];
  exams: ExamRef[];
  sections?: ContentSection[]; // tabbed editorial content (older API builds omit it)
  updatedAt?: string;
}

export interface Stream {
  id: number;
  name: string;
  slug: string;
  initial: string;
  colorGradient: string;
  description: string | null;
  avgFees: string | null;
  degrees: string[];
  examName: string | null;
  collegeCount: number;
}
export interface City {
  id: number;
  name: string;
  slug: string;
  state: string | null;
  imageUrl: string | null;
  collegeCount: number;
}
export interface Exam {
  id: number;
  name: string;
  slug: string;
  fullName: string;
  level: string;
  date: string;
  mode: string;
  stream: string;
  pageSlug?: string | null; // published exam page at /exams/<pageSlug>
}

export type EntryKind = "course" | "exam" | "page";
export interface EntryCard {
  id: number;
  type: "COURSE" | "EXAM" | "PAGE";
  slug: string;
  path: string;
  title: string;
  summary: string | null;
  heroImage: string | null;
  heroAlt: string | null;
  data: Record<string, unknown> | null;
  stream: StreamRef | null;
  category: { name: string; slug: string } | null;
  updatedAt: string;
}
export interface EntryDetail extends EntryCard {
  body: string | null;
  faqs: { question: string; answer: string }[] | null;
  exam: Exam | null;
  tags: { name: string; slug: string }[];
  publishAt: string | null;
  createdAt: string;
  relatedColleges: CollegeCard[];
  relatedEntries: { id: number; type: string; slug: string; title: string; summary: string | null; path: string }[];
  relatedNews: { id: number; slug: string; title: string; excerpt: string; imgUrl: string | null; date: string }[];
  examColleges: CollegeCard[];
  offeringColleges: CollegeCard[];
}
export interface NewsArticle {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string | null;
  date: string;
  readTime: string;
  imgUrl: string | null;
  publishedAt?: string;
  tags?: { tag: { name: string; slug: string } }[];
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
