"use client";

import { useSite } from "./site-context";

// Year × round NEET-cutoff download grid (KollegeApply/Collegedunia style). Each
// PDF icon opens the college-predictor / lead form so a counsellor sends the file.
const YEARS = [2025, 2024, 2023];
const ROUNDS = ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
// Which (round, year) cells are unavailable — shown as "–" like the reference.
const NA = new Set(["Round 5|2025", "Round 5|2024"]);

function PdfIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#ef4444" />
      <path d="M14 2v4h4" fill="#b91c1c" />
      <text x="12" y="17" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff">PDF</text>
    </svg>
  );
}

export function CutoffDownloadTable({ collegeName, collegeId }: { collegeName: string; collegeId?: number }) {
  const { openApply } = useSite();
  const open = () => openApply(collegeName, collegeId);

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="flex flex-col gap-3 border-b border-line bg-brand-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-ink-900">Download {collegeName} NEET Cutoff</h3>
          <p className="mt-0.5 text-sm text-ink-500">Round-wise &amp; year-wise NEET closing cutoffs as PDF — tap any file to get it free.</p>
        </div>
        <button onClick={open} className="btn-primary shrink-0 gap-2 whitespace-nowrap px-4 py-2.5 text-sm">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download Brochure
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-center text-sm">
          <thead>
            <tr className="bg-ink-900/[0.03] text-ink-500">
              <th className="px-4 py-3 text-left font-semibold">Year →</th>
              {YEARS.map((y) => <th key={y} className="px-4 py-3 font-bold text-ink-900">{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROUNDS.map((r) => (
              <tr key={r} className="border-t border-line">
                <td className="px-4 py-3 text-left font-semibold text-ink-700">{r}</td>
                {YEARS.map((y) => (
                  <td key={y} className="px-4 py-2.5">
                    {NA.has(`${r}|${y}`) ? (
                      <span className="text-ink-300">–</span>
                    ) : (
                      <button
                        onClick={open}
                        title={`Download ${r} ${y} cutoff`}
                        aria-label={`Download ${r} ${y} cutoff PDF`}
                        className="mx-auto flex items-center justify-center rounded-lg p-1.5 transition hover:bg-danger/10"
                      >
                        <PdfIcon />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
