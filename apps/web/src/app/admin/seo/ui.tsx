"use client";

// Shared building blocks for the admin SEO screens.

// Base field style without a width, so callers can size it (w-64, w-auto…).
export const inputBase = "rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500";
export const inputCls = `w-full ${inputBase}`;
export const btnPrimary = "btn-primary px-3.5 py-1.5 text-[12px] disabled:opacity-60";
export const btnGhost = "rounded-lg border border-line px-2.5 py-1 text-[12px] font-semibold text-ink-600 hover:border-brand-400 disabled:opacity-50";
export const btnDanger = "rounded-lg border border-danger/40 px-2.5 py-1 text-[12px] font-semibold text-danger hover:bg-danger/10 disabled:opacity-50";

// Google typically shows ~50–60 title characters and ~120–160 description characters.
export const LIMITS = { titleMin: 30, titleMax: 60, descMin: 70, descMax: 160 };

export const SITE_NAME = "College Choice";

export const ISSUE_LABELS: Record<string, string> = {
  "no-custom-title": "Auto title",
  "no-custom-description": "Auto description",
  "title-short": "Title too short",
  "title-long": "Title too long",
  "desc-short": "Description too short",
  "desc-long": "Description too long",
  "no-image": "No social image",
  noindex: "Noindex",
  "custom-canonical": "Custom canonical",
};

export const TYPE_LABELS: Record<string, string> = {
  static: "Static page",
  college: "College",
  stream: "Stream",
  city: "City",
  online: "Online program",
  news: "News",
  course: "Course",
  exam: "Exam",
  page: "Info page",
  other: "Other URL",
};

export function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-ink-700">
        {label} {hint && <span className="font-normal text-ink-400">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

/** "52 / 60" counter, amber when outside the recommended range. */
export function CharCount({ value, min, max }: { value: string; min: number; max: number }) {
  const n = value.length;
  const tone = n === 0 ? "text-ink-400" : n < min || n > max ? "text-warn" : "text-success";
  return (
    <span className={`text-[11px] font-semibold ${tone}`}>
      {n} / {max}
      {n > 0 && n < min ? " · a bit short" : n > max ? " · may be cut off" : ""}
    </span>
  );
}

export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-label={label} className="mt-0.5 h-4 w-4 accent-brand-600" />
      <span>
        <span className="font-semibold text-ink-700">{label}</span>
        {hint && <span className="block text-[12px] text-ink-400">{hint}</span>}
      </span>
    </label>
  );
}

const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** Google-style search result preview. */
export function SerpPreview({ title, description, url }: { title: string; description: string; url: string }) {
  let crumb = url;
  try {
    const u = new URL(url);
    crumb = [u.host, ...u.pathname.split("/").filter(Boolean)].join(" › ");
  } catch { /* show raw */ }
  return (
    <div className="rounded-xl border border-line bg-white p-4 font-[arial,sans-serif]">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">CC</span>
        <div className="min-w-0">
          <p className="text-[14px] leading-tight text-[#202124]">{SITE_NAME}</p>
          <p className="truncate text-[12px] leading-tight text-[#4d5156]">{crumb}</p>
        </div>
      </div>
      <p className="mt-2 text-[20px] leading-snug text-[#1a0dab]">{title ? truncate(title, 62) : <span className="text-ink-400">No title</span>}</p>
      <p className="mt-1 text-[14px] leading-snug text-[#4d5156]">
        {description ? truncate(description, 160) : <span className="text-ink-400">No description — Google will pick text from the page.</span>}
      </p>
    </div>
  );
}

/** Social share card preview (Facebook / WhatsApp / X style). */
export function SocialPreview({ title, description, image, url }: { title: string; description: string; image?: string | null; url: string }) {
  let host = url;
  try { host = new URL(url).host; } catch { /* raw */ }
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="aspect-[1.91/1] w-full bg-line">
        {image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={image} alt="" className="h-full w-full object-cover" />
          : <span className="flex h-full items-center justify-center text-xs text-ink-400">No image — add a social image</span>}
      </div>
      <div className="border-t border-line bg-[#f0f2f5] px-3 py-2">
        <p className="text-[11px] uppercase text-ink-400">{host}</p>
        <p className="truncate text-[14px] font-bold text-ink-900">{title || "No title"}</p>
        <p className="line-clamp-2 text-[12px] text-ink-500">{description}</p>
      </div>
    </div>
  );
}

export function Notice({ tone, children }: { tone: "warn" | "error" | "ok" | "info"; children: React.ReactNode }) {
  const cls = {
    warn: "border-warn/40 bg-warn/10 text-ink-700",
    error: "border-danger/40 bg-danger/10 text-danger",
    ok: "border-success/40 bg-success/10 text-success",
    info: "border-brand-400/40 bg-brand-50 text-ink-700",
  }[tone];
  return <div className={`rounded-lg border px-3 py-2 text-[13px] ${cls}`}>{children}</div>;
}

export function Pager({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
      <button className={btnGhost} disabled={page <= 1} onClick={() => onPage(page - 1)}>← Prev</button>
      <span className="text-ink-500">Page {page} of {totalPages}</span>
      <button className={btnGhost} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next →</button>
    </div>
  );
}

export const fmtDate = (d: string | null | undefined) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

/** Read a picked file as text (for CSV imports). */
export const readFileText = (f: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result ?? ""));
    r.onerror = () => reject(new Error("Couldn't read the file"));
    r.readAsText(f);
  });
