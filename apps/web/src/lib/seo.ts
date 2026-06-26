import type { Metadata } from "next";

export const SITE = {
  name: "College Choice",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  tagline: "Find, compare & apply to colleges in India",
  description:
    "College Choice helps students discover, compare and apply to 4,200+ colleges in India — fees, placements, cutoffs, reviews and exams, all in one place. 100% free.",
  twitter: "@collegechoice",
};

export function canonical(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/** Base metadata builder used across pages. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = canonical(opts.path || "/");
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: opts.type || "website",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      site: SITE.twitter,
      images: opts.image ? [opts.image] : undefined,
    },
  };
}

// ── JSON-LD builders (structured data → Google rich results) ──

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: [
      "https://twitter.com/collegechoice",
      "https://www.facebook.com/collegechoice",
      "https://www.linkedin.com/company/collegechoice",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/colleges?search={query}`,
      "query-input": "required name=query",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function collegeJsonLd(c: {
  name: string;
  slug: string;
  about: string | null;
  location: string;
  rating: number | null;
  reviewsCount?: number;
  website: string | null;
  imgUrl: string | null;
}) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: c.name,
    description: c.about || undefined,
    url: canonical(`/colleges/${c.slug}`),
    sameAs: c.website || undefined,
    image: c.imgUrl || undefined,
    address: { "@type": "PostalAddress", addressLocality: c.location, addressCountry: "IN" },
  };
  if (c.rating) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: c.rating,
      bestRating: 5,
      ratingCount: c.reviewsCount || 1,
    };
  }
  return node;
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(it.path),
      name: it.name,
    })),
  };
}
