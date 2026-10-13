import type { Metadata } from "next";
import { cache } from "react";
import { API } from "./api";

export const SITE = {
  name: "College Choice",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  tagline: "Find, compare & apply to colleges in India",
  description:
    "College Choice helps students discover, compare and apply to 13,000+ colleges in India — fees, placements, cutoffs, reviews and exams, all in one place. 100% free.",
  twitter: "@collegechoice",
};

export function canonical(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/** Per-page SEO overrides managed in the admin SEO panel (every field optional). */
export interface SeoOverride {
  title?: string | null;
  description?: string | null;
  keyword?: string | null;
  canonical?: string | null;
  noindex?: boolean;
  nofollow?: boolean;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  disableSchema?: boolean;
  customSchema?: string | null;
  h1?: string | null;
  breadcrumbLabel?: string | null;
}

/**
 * Admin SEO overrides for one path ({} when none or the API is unreachable).
 * Tagged so an admin save can refresh just this page (see /internal/revalidate).
 */
export const getSeoOverride = cache(async (path: string): Promise<SeoOverride> => {
  try {
    const res = await fetch(`${API}/api/seo/page?path=${encodeURIComponent(path)}`, {
      next: { revalidate: 3600, tags: ["seo", `seo:${path}`] },
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? ((await res.json()) as SeoOverride) : {};
  } catch {
    return {};
  }
});

interface MetaOpts {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Use the title as-is, without the " | College Choice" suffix. */
  absoluteTitle?: boolean;
}

/** Base metadata builder used across pages; `o` layers admin SEO overrides on top. */
export function buildMetadata(opts: MetaOpts, o: SeoOverride = {}): Metadata {
  const url = canonical(opts.path || "/");
  // A custom SEO title is used exactly as entered (no site-name suffix).
  const title = o.title ? { absolute: o.title } : opts.absoluteTitle ? { absolute: opts.title } : opts.title;
  const plainTitle = o.title || opts.title;
  const description = o.description || opts.description;
  const ogTitle = o.ogTitle || plainTitle;
  const ogDescription = o.ogDescription || description;
  const image = o.ogImage || opts.image;
  return {
    title,
    description,
    keywords: o.keyword ? [o.keyword] : undefined,
    alternates: { canonical: o.canonical ? (/^https?:\/\//i.test(o.canonical) ? o.canonical : canonical(o.canonical)) : url },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: !o.noindex, follow: !o.nofollow },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE.name,
      type: opts.type || "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: o.twitterTitle || ogTitle,
      description: o.twitterDescription || ogDescription,
      site: SITE.twitter,
      images: image ? [image] : undefined,
    },
  };
}

/** buildMetadata + the page's admin SEO overrides. Use from generateMetadata. */
export async function pageMetadata(opts: MetaOpts & { path: string }): Promise<Metadata> {
  return buildMetadata(opts, await getSeoOverride(opts.path));
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
