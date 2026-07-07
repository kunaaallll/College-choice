import Image from "next/image";
import type { CollegeDetail } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DetailActions } from "@/components/DetailActions";
import { CollegeTabs } from "@/components/CollegeTabs";

// Shared hero + quick stats + tab bar for all college detail pages.
export function CollegeHeader({ c, tabs }: { c: CollegeDetail; tabs: [string, string][] }) {
  const isOnline = (c.mode ?? "Campus") !== "Campus";
  const approvals = c.approvals ?? [];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: c.stream.name, path: `/stream/${c.stream.slug}` },
    { name: c.name, path: `/colleges/${c.slug}` },
  ];

  const updated =
    c.updatedAt &&
    new Date(c.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const quickStats = isOnline
    ? [
        { label: "Mode", value: "100% Online", color: "text-brand-700" },
        { label: "Fees from", value: orNA(c.feesLabel), color: "text-ink-900" },
        { label: "Approval", value: approvals[0] ?? "UGC-DEB", color: "text-success" },
        { label: "Rating", value: stars(c.rating), color: "text-warn" },
      ]
    : [
        {
          label: "NIRF Rank",
          value: c.nirfRank ? `#${c.nirfRank}` : c.rank ? `#${c.rank}` : orNA(null),
          color: "text-ink-900",
        },
        { label: "Avg Package", value: orNA(c.packageLabel), color: "text-success" },
        { label: "Total Fees", value: orNA(c.feesLabel), color: "text-brand-700" },
        { label: "Rating", value: stars(c.rating), color: "text-warn" },
      ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-900 text-white">
        {c.imgUrl && (
          <div className="absolute inset-0 opacity-25">
            <Image src={c.imgUrl} alt="" fill sizes="100vw" className="object-cover" priority />
          </div>
        )}
        <div className="container-site relative py-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {isOnline ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-3 py-1 text-xs font-bold">
                  🌐 100% Online · {orNA(c.type)}
                </span>
              ) : (
                c.rank != null && (
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                    NIRF #{c.nirfRank ?? c.rank} in {c.stream.name}
                  </span>
                )
              )}
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{c.name}</h1>
              <p className="mt-2 text-white/70">
                ⚲ {c.location} · {orNA(c.type)} {c.estd ? `· Estd ${c.estd}` : ""}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {stars(c.rating)} {c.reviewsLabel ? `(${c.reviewsLabel} reviews)` : ""}
                {updated ? ` · Updated on ${updated}` : ""}
              </p>
              {isOnline && approvals.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {approvals.map((a) => (
                    <span key={a} className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white">
                      ✓ {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <DetailActions slug={c.slug} name={c.name} id={c.id} />
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-line bg-white">
        <div className="container-site grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          {quickStats.map((q) => (
            <div key={q.label} className="text-center sm:text-left">
              <p className="text-xs text-ink-400">{q.label}</p>
              <p className={`mt-1 text-lg font-extrabold ${q.color}`}>{q.value}</p>
            </div>
          ))}
        </div>
      </section>

      {tabs.length > 1 && <CollegeTabs slug={c.slug} tabs={tabs} />}
    </>
  );
}
