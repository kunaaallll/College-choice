"use client";

import clsx from "clsx";
import { useSite } from "./site-context";

// Apply + Compare buttons for the college detail page.
export function DetailActions({
  slug,
  name,
  id,
  variant = "header",
}: {
  slug: string;
  name: string;
  id: number;
  variant?: "header" | "cta";
}) {
  const { openApply, toggleCompare, inCompare } = useSite();
  const added = inCompare(slug);

  return (
    <div className={clsx("flex flex-wrap gap-3", variant === "cta" && "justify-center")}>
      <button onClick={() => openApply(name, id)} className="btn-primary px-6">
        Apply now — it&apos;s free
      </button>
      <button
        onClick={() => toggleCompare(slug)}
        className={clsx(
          "btn px-5",
          added ? "border border-brand-400 bg-brand-50 text-brand-700" : "border border-line bg-white text-ink-700 hover:border-brand-400",
        )}
      >
        {added ? "✓ Added to compare" : "⇄ Add to compare"}
      </button>
    </div>
  );
}
