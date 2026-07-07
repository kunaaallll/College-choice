import type { ContentSection } from "@/lib/types";
import { headingId } from "@/lib/collegeTabs";
import { Markdown } from "@/components/Markdown";

// Table of contents + the ordered content sections of a tab.
export function SectionList({ sections, toc = true }: { sections: ContentSection[]; toc?: boolean }) {
  if (sections.length === 0) return null;
  return (
    <div className="space-y-8">
      {toc && sections.length > 2 && (
        <nav className="overflow-hidden rounded-2xl border border-line" aria-label="Table of contents">
          <p className="bg-ink-900 px-4 py-2.5 text-sm font-bold text-white">Table of Contents</p>
          <ol className="divide-y divide-line">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${headingId(s.heading)}`}
                  className="block px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50/60"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {sections.map((s) => (
        <section key={s.id} id={headingId(s.heading)} className="scroll-mt-32">
          <h2 className="text-xl font-extrabold sm:text-2xl">{s.heading}</h2>
          <Markdown text={s.body} />
        </section>
      ))}
    </div>
  );
}
