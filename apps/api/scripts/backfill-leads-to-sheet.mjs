/**
 * One-off: push all EXISTING applications to the Google Sheet webhook, oldest
 * first, so the sheet starts fully populated. New leads flow in automatically
 * via the API afterwards.
 *
 * Usage (from repo root, with apps/api/.env holding DATABASE_URL):
 *   GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/XXX/exec" \
 *   GOOGLE_SHEETS_SECRET="the-same-secret" \
 *   node --env-file=apps/api/.env apps/api/scripts/backfill-leads-to-sheet.mjs
 *
 * Idempotency: re-running APPENDS rows again (Apps Script has no dedupe), so run
 * once against an empty sheet. To redo, clear the sheet first.
 */
import { PrismaClient } from "@prisma/client";

const URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SECRET = process.env.GOOGLE_SHEETS_SECRET || "";
if (!URL) {
  console.error("Set GOOGLE_SHEETS_WEBHOOK_URL (and GOOGLE_SHEETS_SECRET) before running.");
  process.exit(1);
}

const prisma = new PrismaClient();

function istTimestamp(d) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(d);
  const g = (t) => parts.find((p) => p.type === t)?.value ?? "";
  return `${g("year")}-${g("month")}-${g("day")} ${g("hour")}:${g("minute")}:${g("second")}`;
}

const leads = await prisma.application.findMany({ orderBy: { createdAt: "asc" } });
console.log(`Backfilling ${leads.length} leads → sheet…`);

let ok = 0, fail = 0;
for (const l of leads) {
  const payload = {
    secret: SECRET,
    id: l.id,
    timestamp: istTimestamp(l.createdAt),
    timestampISO: l.createdAt.toISOString(),
    fullName: l.fullName,
    mobile: l.mobile,
    email: l.email,
    city: l.city ?? "",
    course: l.courseInterested ?? "",
    college: l.collegeName ?? "",
    notes: l.notes ?? "",
  };
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) { ok++; process.stdout.write("."); }
    else { fail++; console.error(`\n  #${l.id} failed:`, res.status, JSON.stringify(data)); }
  } catch (err) {
    fail++; console.error(`\n  #${l.id} error:`, err instanceof Error ? err.message : err);
  }
  await new Promise((r) => setTimeout(r, 250)); // gentle pacing for Apps Script
}

console.log(`\nDone. appended=${ok} failed=${fail}`);
await prisma.$disconnect();
