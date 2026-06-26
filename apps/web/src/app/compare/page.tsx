import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CompareClient } from "./CompareClient";

// Compare is a stateful utility page → keep it out of the index.
export const metadata: Metadata = buildMetadata({
  title: "Compare Colleges Side by Side",
  description: "Compare colleges in India side by side on fees, placements, ranking and ratings.",
  path: "/compare",
  noindex: true,
});

export default function ComparePage() {
  return (
    <div className="container-site py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Compare Colleges</h1>
        <p className="mt-3 text-ink-500">Side-by-side on fees, placements, ranking and ratings.</p>
      </header>
      <CompareClient />
    </div>
  );
}
