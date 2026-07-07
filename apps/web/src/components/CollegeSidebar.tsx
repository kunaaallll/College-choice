import Image from "next/image";
import type { CollegeDetail } from "@/lib/types";
import { DetailActions } from "@/components/DetailActions";

// Shared right-hand sidebar for college detail pages: quick facts, approvals,
// gallery and the apply CTA.
export function CollegeSidebar({ c }: { c: CollegeDetail }) {
  const isOnline = (c.mode ?? "Campus") !== "Campus";
  const approvals = c.approvals ?? [];
  const gallery = c.gallery ?? [];

  return (
    <aside className="space-y-5 lg:sticky lg:top-32 lg:h-fit">
      <div className="card p-5">
        <h3 className="text-base font-bold">Quick facts</h3>
        <dl className="mt-3 space-y-2.5 text-sm">
          {[
            ["Mode", isOnline ? "100% Online" : "On-campus"],
            ["Established", c.estd ? String(c.estd) : null],
            ["Type", c.type],
            ["Location", c.city.name],
            ["Accepted exam", c.examName],
            ["Affiliation", c.affiliation],
            ["Approved by", c.approvedBy],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line pb-2.5">
                <dt className="text-ink-400">{k}</dt>
                <dd className="text-right font-semibold text-ink-900">{v}</dd>
              </div>
            ))}
        </dl>
        {c.website && (
          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl border border-line py-2.5 text-center text-sm font-semibold text-brand-600 hover:border-brand-400"
          >
            Go to college website →
          </a>
        )}
      </div>

      {isOnline && approvals.length > 0 && (
        <div className="card p-5">
          <h3 className="text-base font-bold">Approvals &amp; Accreditation</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {approvals.map((a) => (
              <span key={a} className="rounded-md bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                ✓ {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {gallery.length > 0 && (
        <div className="card overflow-hidden">
          <div className="relative aspect-[16/10]">
            <Image src={gallery[0].url} alt={`${c.name} campus`} fill sizes="320px" className="object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-1 p-1">
              {gallery.slice(1, 4).map((g) => (
                <div key={g.id} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={g.url} alt="" fill sizes="100px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="card bg-brand-50/60 p-5 text-center">
        <h3 className="text-base font-bold">Apply to {c.name}</h3>
        <p className="mt-2 text-sm text-ink-500">Get free counselling and admission guidance from our experts.</p>
        <div className="mt-4">
          <DetailActions slug={c.slug} name={c.name} id={c.id} variant="cta" />
        </div>
      </div>
    </aside>
  );
}
