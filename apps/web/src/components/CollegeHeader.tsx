import type { CollegeDetail } from "@/lib/types";
import { orNA, stars } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DetailActions } from "@/components/DetailActions";
import { CollegeTabs } from "@/components/CollegeTabs";
import { HeroBackground } from "@/components/HeroBackground";

// Shared hero + quick stats + tab bar for all college detail pages.
export function CollegeHeader({ c, tabs }: { c: CollegeDetail; tabs: [string, string][] }) {
  const isOnline = (c.mode ?? "Campus") !== "Campus";
  const isDental = c.stream.slug === "dental";
  const approvals = c.approvals ?? [];
  // Uploaded photos → rotating hero background (falls back to the single imgUrl).
  const heroImages = (c.gallery ?? []).map((g) => g.url).filter(Boolean);
  const bg = heroImages.length ? heroImages : c.imgUrl ? [c.imgUrl] : [];

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
        { label: isDental ? "Avg Patient Flow" : "Avg Package", value: orNA(c.packageLabel), color: "text-success" },
        { label: "Total Fees", value: orNA(c.feesLabel), color: "text-brand-700" },
        { label: "Rating", value: stars(c.rating), color: "text-warn" },
      ];

  return (
    <>
      {/* Hero — the college's real photos rotate behind the title; content
          anchored to the bottom so the photo itself stays the focus. */}
      <section className="relative flex min-h-[300px] flex-col bg-ink-900 text-white sm:min-h-[375px]">
        <HeroBackground images={bg} />
        <div className="container-site relative flex flex-1 flex-col py-6 [text-shadow:0_1px_3px_rgb(0_0_0_/_55%)]">
          <Breadcrumbs items={crumbs} />
          <div className="mt-auto flex flex-col gap-6 pt-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {isOnline ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-3 py-1 text-xs font-bold">
                  🌐 100% Online · {orNA(c.type)}
                </span>
              ) : (
                c.rank != null && (
                  <span className="inline-flex rounded-full bg-black/40 px-3 py-1 text-xs font-bold">
                    NIRF #{c.nirfRank ?? c.rank} in {c.stream.name}
                  </span>
                )
              )}
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{c.name}</h1>
              <p className="mt-2 text-white/90">
                ⚲ {c.location} · {orNA(c.type)} {c.estd ? `· Estd ${c.estd}` : ""}
              </p>
              <p className="mt-1 text-sm text-white/90">
                {stars(c.rating)} {c.reviewsLabel ? `(${c.reviewsLabel} reviews)` : ""}
                {updated ? ` · Updated on ${updated}` : ""}
              </p>
              {isOnline && approvals.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {approvals.map((a) => (
                    <span key={a} className="rounded-md bg-black/40 px-2 py-1 text-xs font-semibold text-white">
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
