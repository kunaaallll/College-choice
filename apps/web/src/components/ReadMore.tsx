"use client";

import { useState } from "react";

// Collapsible long description with a fade + "Read more" toggle.
export function ReadMore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const paras = text.split("\n\n").filter(Boolean);
  const isLong = text.length > 360;

  return (
    <div className="prose mt-3 max-w-none text-ink-500">
      <div className={`relative overflow-hidden ${!open && isLong ? "max-h-32" : ""}`}>
        {paras.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed">{p}</p>
        ))}
        {!open && isLong && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {isLong && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-3 inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-brand-600 hover:border-brand-400"
        >
          {open ? "Show less ▲" : "Read more ▼"}
        </button>
      )}
    </div>
  );
}
