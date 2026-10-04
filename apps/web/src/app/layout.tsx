import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteProviders } from "@/components/SiteProviders";
import { JsonLd } from "@/components/JsonLd";
import { SITE, orgJsonLd, websiteJsonLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image", site: SITE.twitter },
  // Google Search Console ownership — renders <meta name="google-site-verification"> in <head>
  verification: { google: "zeku_T4D2PL-QMBs2bcgge_fKN_DdHzAymV91OdcRE4" },
};

const GA_ID = "G-LRB253XV05";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        {/* Google Analytics (gtag.js) — loaded on every page via the root layout */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
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
