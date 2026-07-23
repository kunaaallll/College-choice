/**
 * Google Sheets lead sink.
 *
 * Every apply/enquiry submission is mirrored to a Google Sheet in real time via
 * a Google Apps Script Web App (a webhook URL in GOOGLE_SHEETS_WEBHOOK_URL). The
 * DB stays the source of truth; the sheet is a convenience mirror for the team.
 *
 * Fire-and-forget: a slow or failing sheet must NEVER break or delay a lead
 * being saved, so callers do not await this and all errors are swallowed (logged).
 */

export interface LeadRow {
  id: number;
  createdAt: Date;
  fullName: string;
  mobile: string;
  email: string;
  city?: string | null;
  courseInterested?: string | null;
  collegeName?: string | null;
  notes?: string | null;
}

/** Shared secret appended so the Apps Script can reject random internet POSTs. */
const SHEET_SECRET = process.env.GOOGLE_SHEETS_SECRET || "";

/** Format a Date as IST (Asia/Kolkata) "YYYY-MM-DD HH:mm:ss" for the sheet. */
function istTimestamp(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${g("year")}-${g("month")}-${g("day")} ${g("hour")}:${g("minute")}:${g("second")}`;
}

/** Build the flat payload the Apps Script appends as one row. */
export function leadPayload(lead: LeadRow) {
  return {
    secret: SHEET_SECRET,
    id: lead.id,
    timestamp: istTimestamp(lead.createdAt), // IST, human-readable
    timestampISO: lead.createdAt.toISOString(),
    fullName: lead.fullName,
    mobile: lead.mobile,
    email: lead.email,
    city: lead.city ?? "",
    course: lead.courseInterested ?? "",
    college: lead.collegeName ?? "",
    notes: lead.notes ?? "",
  };
}

/**
 * Append one lead to the Google Sheet. Fire-and-forget — never throws.
 * No-op when GOOGLE_SHEETS_WEBHOOK_URL is unset (e.g. local dev).
 */
export function sendLeadToSheet(lead: LeadRow): void {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadPayload(lead)),
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) console.error(`[sheet] webhook responded ${res.status} for lead #${lead.id}`);
    })
    .catch((err) => {
      console.error(`[sheet] failed to append lead #${lead.id}:`, err instanceof Error ? err.message : err);
    })
    .finally(() => clearTimeout(timeout));
}
