import Link from "next/link";
import { getSeoOverride } from "@/lib/seo";

/** The page H1 — overridable per URL in the admin SEO panel. */
export async function PageH1({ path, className, children }: { path: string; className?: string; children: React.ReactNode }) {
  const o = await getSeoOverride(path);
  return <h1 className={className}>{o.h1 || children}</h1>;
}

/**
 * Rich text from the CMS editor. The API sanitises it on save (allow-listed tags,
 * safe links, lazy images), so it's rendered as HTML here.
 */
export function RichContent({ html, className = "" }: { html: string | null | undefined; className?: string }) {
  if (!html) return null;
  return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: { question: string; answer: string }[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((f) => (
          <details key={f.question} className="card p-4">
            <summary className="cursor-pointer font-semibold text-ink-900">{f.question}</summary>
            <p className="mt-2 whitespace-pre-line text-ink-500">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export interface CtaBlock { heading: string; text?: string; buttonLabel?: string; buttonUrl?: string }

export function CtaBlocks({ blocks }: { blocks: CtaBlock[] }) {
  if (!blocks.length) return null;
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {blocks.map((b) => (
        <div key={b.heading} className="rounded-2xl bg-brand-600 p-6 text-white">
          <h2 className="text-xl font-extrabold">{b.heading}</h2>
          {b.text && <p className="mt-2 text-white/85">{b.text}</p>}
          {b.buttonLabel && b.buttonUrl && (
            <Link href={b.buttonUrl} className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50">
              {b.buttonLabel}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

/** Internal links to related pages (manual picks from the CMS). */
export function RelatedLinks({ title, items }: { title: string; items: { href: string; label: string; sub?: string | null }[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="card block p-4 hover:border-brand-400">
              <span className="font-semibold text-ink-900">{i.label}</span>
              {i.sub && <span className="mt-1 block line-clamp-2 text-sm text-ink-500">{i.sub}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
