"use client";

import { useRouter } from "next/navigation";

// Compact state filter — a single dropdown instead of a wall of chips.
// Navigates into the pre-filtered colleges listing.
export function StateSelect({ stream, states }: { stream: string; states: string[] }) {
  const router = useRouter();
  return (
    <select
      defaultValue=""
      onChange={(e) => {
        const v = e.target.value;
        router.push(
          v ? `/colleges?stream=${stream}&state=${encodeURIComponent(v)}` : `/colleges?stream=${stream}`,
        );
      }}
      className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand-500"
    >
      <option value="">All states</option>
      {states.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
