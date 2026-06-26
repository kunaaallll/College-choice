"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STREAMS = ["All Streams", "Engineering", "Medical", "Management", "Commerce", "Law", "Science"];
const POPULAR = ["Engineering", "MBBS", "MBA", "Delhi", "Bangalore"];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [stream, setStream] = useState("All Streams");

  const go = () => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("search", q.trim());
    if (stream !== "All Streams") sp.set("stream", stream);
    router.push(`/colleges${sp.toString() ? `?${sp}` : ""}`);
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-pop sm:flex-row">
        <select
          value={stream}
          onChange={(e) => setStream(e.target.value)}
          aria-label="Stream"
          className="rounded-xl border border-line bg-white px-3 py-3 text-sm font-semibold text-ink-700 outline-none sm:w-44"
        >
          {STREAMS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line px-3">
          <span className="text-ink-400">⌕</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
            placeholder="Search colleges, courses or cities…"
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
        </div>
        <button onClick={go} className="btn-primary px-6 py-3">
          Search
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">
        <span className="text-white/60">Popular:</span>
        {POPULAR.map((p) => (
          <button
            key={p}
            onClick={() => {
              const sp = new URLSearchParams();
              if (["Delhi", "Bangalore"].includes(p)) sp.set("city", p);
              else sp.set("search", p);
              router.push(`/colleges?${sp}`);
            }}
            className="rounded-full bg-white/10 px-3 py-1 font-semibold hover:bg-white/20"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
