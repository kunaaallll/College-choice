"use client";

import { useState } from "react";

// Clamps arbitrary content to a preview height with a fade + Read more toggle.
export function Collapsible({
  children,
  previewHeight = 200,
}: {
  children: React.ReactNode;
  previewHeight?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="relative overflow-hidden" style={{ maxHeight: open ? "none" : previewHeight }}>
        {children}
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1 rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-brand-600 hover:border-brand-400"
      >
        {open ? "Show less ▲" : "Read more ▼"}
      </button>
    </div>
  );
}
