export const dash = "—";

/** Star rating as a display string, e.g. 4.8 → "★ 4.8". */
export const stars = (n: number | null | undefined) => (n ? `★ ${n.toFixed(1)}` : dash);

export const orNA = (v: string | number | null | undefined) =>
  v === null || v === undefined || v === "" ? dash : String(v);

/** A short fees-cap label for the slider. */
export function feesCap(n: number): string {
  if (n >= 2000000) return "Any";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1).replace(".0", "")} L`;
  return `₹${Math.round(n / 1000)}k`;
}

export const initialsBadge = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "C";
