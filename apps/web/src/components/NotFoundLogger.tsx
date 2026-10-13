"use client";

import { useEffect } from "react";
import { postJSON } from "@/lib/api";

/** Reports the current URL to the admin 404 log (SEO → 404s), once per page view. */
export function NotFoundLogger() {
  useEffect(() => {
    postJSON("/api/seo/404", { path: window.location.pathname, referrer: document.referrer || null }).catch(() => {});
  }, []);
  return null;
}
