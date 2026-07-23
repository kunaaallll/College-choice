/**
 * College Choice — Leads → Google Sheet webhook (Google Apps Script)
 * ------------------------------------------------------------------
 * This turns a Google Sheet into a webhook that the API POSTs each new
 * apply/enquiry lead to, appending one timestamped row per submission.
 *
 * SETUP (one time):
 *   1. Create/open a Google Sheet. Rename the first tab to "Leads".
 *   2. Extensions → Apps Script. Delete any sample code, paste ALL of this file.
 *   3. Set SECRET below to a long random string (letters+numbers). Keep it private.
 *   4. Click Deploy → New deployment → type "Web app".
 *        - Description: College Choice leads
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Deploy, authorise access, then COPY the Web app URL
 *      (looks like https://script.google.com/macros/s/AKfyc.../exec).
 *   5. On the server, set the API env vars and redeploy the api container:
 *        GOOGLE_SHEETS_WEBHOOK_URL=<the Web app URL>
 *        GOOGLE_SHEETS_SECRET=<the same SECRET string>
 *
 * To change the secret later: edit SECRET here, re-Deploy (Manage deployments →
 * edit → New version), and update GOOGLE_SHEETS_SECRET on the server to match.
 */

// MUST match GOOGLE_SHEETS_SECRET on the API server.
var SECRET = "CHANGE_ME_to_a_long_random_string";

var HEADERS = [
  "Timestamp (IST)", "Lead ID", "Full Name", "Mobile", "Email",
  "City", "Course Interested", "College", "Notes", "Timestamp (ISO/UTC)",
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");

    if (SECRET && body.secret !== SECRET) {
      return _json({ ok: false, error: "unauthorised" });
    }

    var sheet = _sheet();
    sheet.appendRow([
      body.timestamp || "",
      body.id || "",
      body.fullName || "",
      body.mobile || "",
      body.email || "",
      body.city || "",
      body.course || "",
      body.college || "",
      body.notes || "",
      body.timestampISO || "",
    ]);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// Health check when you open the Web app URL in a browser.
function doGet() {
  return _json({ ok: true, service: "collegechoice-leads", rows: _sheet().getLastRow() });
}

function _sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
