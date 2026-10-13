/**
 * Rich text from the CMS editor is stored as HTML and rendered as-is on the
 * site, so it's sanitised on save: an allow-list of tags/attributes, safe link
 * protocols, external links opened safely, lazy-loaded images and no <h1>
 * (the page title is the only H1).
 */
import sanitizeHtml from "sanitize-html";
import { SITE_URL } from "./seo";

const SITE_HOST = (() => { try { return new URL(SITE_URL).host; } catch { return ""; } })();

export function sanitizeRichHtml(html: string | null | undefined): string | null {
  if (!html || !html.trim()) return null;
  const clean = sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li",
      "blockquote", "code", "pre", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "title", "width", "height", "loading", "decoding"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2", // one H1 per page — the title
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        let external = false;
        try { external = /^https?:\/\//i.test(href) && new URL(href).host !== SITE_HOST; } catch { /* relative */ }
        return {
          tagName,
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : { href, ...(attribs.title ? { title: attribs.title } : {}) },
        };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy", decoding: "async" } }),
    },
    exclusiveFilter: (frame) => frame.tag === "p" && !frame.text.trim() && !frame.mediaChildren?.length,
  });
  return clean.trim() || null;
}

/** Plain text (for search snippets and length checks). */
export const htmlToText = (html: string | null | undefined) =>
  (html ?? "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
