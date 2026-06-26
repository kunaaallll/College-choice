"use client";

import { SiteProvider } from "./site-context";
import { ApplyModal } from "./ApplyModal";
import { LoginModal } from "./LoginModal";
import { CompareBar } from "./CompareBar";

// Wraps the app with client-side UI state + global overlays.
export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      {children}
      <ApplyModal />
      <LoginModal />
      <CompareBar />
    </SiteProvider>
  );
}
