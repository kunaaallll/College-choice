import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CompareClient } from "./CompareClient";
import { PageJsonLd } from "@/components/JsonLd";
import { PageH1 } from "@/components/ContentBlocks";

// Compare is a stateful utility page → keep it out of the index.
export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Compare Colleges Side by Side",
    description: "Compare colleges in India side by side on fees, placements, ranking and ratings.",
    path: "/compare",
    noindex: true,
  });
}

export default function ComparePage() {
  return (
    <div className="container-site py-8">
      <PageJsonLd path="/compare" />
      <header className="max-w-3xl">
        <PageH1 path="/compare" className="text-3xl font-extrabold sm:text-4xl">Compare Colleges</PageH1>
        <p className="mt-3 text-ink-500">Side-by-side on fees, placements, ranking and ratings.</p>
      </header>
      <CompareClient />
    </div>
  );
}
