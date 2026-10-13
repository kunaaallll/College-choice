import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteProviders } from "@/components/SiteProviders";
import { JsonLd } from "@/components/JsonLd";
import { SITE, orgJsonLd, websiteJsonLd } from "@/lib/seo";
import { API } from "@/lib/api";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Tracking & verification codes — editable in CMS → Settings → Tracking.
const TRACKING_FALLBACK = { gaId: "G-LRB253XV05", gscVerification: "zeku_T4D2PL-QMBs2bcgge_fKN_DdHzAymV91OdcRE4" };

async function getTracking(): Promise<typeof TRACKING_FALLBACK> {
  try {
    const res = await fetch(`${API}/api/site`, { next: { revalidate: 3600, tags: ["site-settings"] }, signal: AbortSignal.timeout(4000) });
    if (res.ok) return { ...TRACKING_FALLBACK, ...((await res.json()) as Partial<typeof TRACKING_FALLBACK>) };
  } catch {
    // API unreachable → keep the last known codes.
  }
  return TRACKING_FALLBACK;
}

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "colleges in India",
    "college comparison",
    "engineering colleges",
    "medical colleges",
    "MBA colleges",
    "college admission",
    "entrance exams",
    "college fees",
    "placements",
  ],
  // No site-wide canonical: every page sets its own (see pageMetadata), and a
  // default of "/" would wrongly point 404s and utility pages at the homepage.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image", site: SITE.twitter },
};

export async function generateMetadata(): Promise<Metadata> {
  const { gscVerification } = await getTracking();
  // Google Search Console ownership — renders <meta name="google-site-verification"> in <head>
  return { ...baseMetadata, ...(gscVerification ? { verification: { google: gscVerification } } : {}) };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { gaId } = await getTracking();
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        {/* Google Analytics (gtag.js) — loaded on every page via the root layout */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)});`}
            </Script>
          </>
        )}
        <JsonLd data={[orgJsonLd(), websiteJsonLd()]} />
        <SiteProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SiteProviders>
      </body>
    </html>
  );
}
