"use client";

import { useEffect } from "react";
import { SiteProvider } from "./site-context";
import { ApplyModal } from "./ApplyModal";
import { LoginModal } from "./LoginModal";
import { CompareBar } from "./CompareBar";
import { captureAttribution } from "@/lib/attribution";

// Wraps the app with client-side UI state + global overlays.
export function SiteProviders({ children }: { children: React.ReactNode }) {
  // Remember where this visit started (for lead attribution).
  useEffect(() => { captureAttribution(); }, []);
  return (
    <SiteProvider>
      {children}
      <ApplyModal />
      <LoginModal />
      <CompareBar />
    </SiteProvider>
  );
}
