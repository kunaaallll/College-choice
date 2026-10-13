"use client";

import { useSite, type ApplyOptions } from "./site-context";

/** Opens the lead form from a content page (course/exam enquiry, counselling CTA). */
export function EnquiryButton({ label, heading, options, className }: { label: string; heading: string; options: ApplyOptions; className?: string }) {
  const { openApply } = useSite();
  return (
    <button type="button" onClick={() => openApply(heading, undefined, undefined, options)} className={className ?? "btn-primary w-full"}>
      {label}
    </button>
  );
}
