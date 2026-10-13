/**
 * Lead attribution: the first page of a visit, where the visitor came from and
 * any UTM tags are remembered for the session, then sent with every lead form
 * (so the CMS can report leads by landing page and channel, e.g. organic search).
 */

const KEY = "cc:attribution";

export interface Attribution {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

/** Record the visit's first-touch details once per browser session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const url = new URL(window.location.href);
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const a: Attribution = {
      landingPage: url.pathname,
      ...(ref ? { referrer: ref } : {}),
      ...(url.searchParams.get("utm_source") ? { utmSource: url.searchParams.get("utm_source")! } : {}),
      ...(url.searchParams.get("utm_medium") ? { utmMedium: url.searchParams.get("utm_medium")! } : {}),
      ...(url.searchParams.get("utm_campaign") ? { utmCampaign: url.searchParams.get("utm_campaign")! } : {}),
    };
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Storage blocked — forms still send the current page.
  }
}

/** Attribution fields to send with a lead form (plus the page it's submitted on). */
export function getAttribution(): Attribution & { pagePath: string } {
  let a: Attribution = {};
  try { a = JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch { /* none */ }
  return { ...a, pagePath: window.location.pathname };
}
