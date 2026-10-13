"use client";

import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { adminRequest } from "./adminApi";
import { MediaPickerModal, type MediaItem } from "./MediaLibrary";
import { useSession } from "./session";
import { btnGhost, inputCls } from "./seo/ui";

// Images keep their responsive attributes (srcset/sizes from the media library).
const RichImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      srcset: { default: null },
      sizes: { default: null },
      width: { default: null },
      height: { default: null },
    };
  },
});

/** Mirror of components/Markdown for opening older markdown bodies in the editor. */
export function markdownToHtml(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s: string) =>
    esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  const out: string[] = [];
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    const h = /^(#{2,4})\s+(.*)$/.exec(l);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (/^\s*[-*]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(/^\s*[-*]\s+/, ""))}</li>`);
      i--; out.push(`<ul>${items.join("")}</ul>`); continue;
    }
    if (/^\s*\d+\.\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(/^\s*\d+\.\s+/, ""))}</li>`);
      i--; out.push(`<ol>${items.join("")}</ol>`); continue;
    }
    if (/^\s*\|/.test(l)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i++].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
      }
      i--;
      const [head, ...body] = rows;
      out.push(`<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }
    const para: string[] = [l];
    while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#{2,4}\s|\s*[-*]\s|\s*\d+\.\s|\s*\|)/.test(lines[i + 1])) para.push(lines[++i]);
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("");
}

/** Rich text editor that stores HTML (sanitised again by the API on save). */
export function RichTextEditor({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const [picking, setPicking] = useState<"image" | "link" | null>(null);
  const initial = useMemo(() => (value && !value.trimStart().startsWith("<") ? markdownToHtml(value) : value), []); // eslint-disable-line react-hooks/exhaustive-deps

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }, // the page title is the only H1
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: null, target: null } },
      }),
      RichImage,
    ],
    content: initial || "",
    editorProps: { attributes: { class: "rich-content min-h-[260px] px-4 py-3 outline-none", "aria-label": placeholder ?? "Content" } },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });

  // Report the converted HTML once, so a markdown body is saved as HTML only when edited.
  useEffect(() => { if (editor && initial !== value && initial) onChange(initial); }, [editor]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!editor) return <div className="min-h-[300px] rounded-lg border border-line bg-line/20" />;

  const insertImage = (m: MediaItem) => {
    const v = m.variants ?? {};
    const srcset = Object.entries(v).sort(([a], [b]) => Number(a) - Number(b)).map(([w, u]) => `${u} ${w}w`).join(", ") || null;
    editor.chain().focus().insertContent({
      type: "image",
      attrs: {
        src: v["960"] ?? v["1600"] ?? m.url, alt: m.alt ?? "", srcset,
        sizes: srcset ? "(max-width: 768px) 100vw, 768px" : null, width: m.width, height: m.height,
      },
    }).run();
  };

  return (
    <div className="rounded-lg border border-line focus-within:border-brand-500">
      <Toolbar editor={editor} onImage={() => setPicking("image")} onInternalLink={() => setPicking("link")} />
      <EditorContent editor={editor} />
      <ImageAltBar editor={editor} />
      {picking === "image" && <MediaPickerModal onPick={insertImage} onClose={() => setPicking(null)} />}
      {picking === "link" && <InternalLinkPicker onPick={(href) => { editor.chain().focus().extendMarkRange("link").setLink({ href }).run(); setPicking(null); }} onClose={() => setPicking(null)} />}
    </div>
  );
}

function Toolbar({ editor, onImage, onInternalLink }: { editor: Editor; onImage: () => void; onInternalLink: () => void }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }), h3: e.isActive("heading", { level: 3 }), h4: e.isActive("heading", { level: 4 }),
      bold: e.isActive("bold"), italic: e.isActive("italic"), ul: e.isActive("bulletList"), ol: e.isActive("orderedList"),
      quote: e.isActive("blockquote"), link: e.isActive("link"),
    }),
  });
  const b = (label: string, active: boolean, run: () => void, title = label) => (
    <button type="button" title={title} aria-label={title} aria-pressed={active} onMouseDown={(e) => e.preventDefault()} onClick={run}
      className={`rounded px-2 py-1 text-[12px] font-bold ${active ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-line/60"}`}>
      {label}
    </button>
  );
  const link = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Link URL (https://… for other sites, /colleges/… for pages on this site). Leave empty to remove the link.", prev ?? "https://");
    if (href === null) return;
    if (!href.trim()) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };
  const c = () => editor.chain().focus();
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-line bg-white px-2 py-1.5">
      {b("P", false, () => c().setParagraph().run(), "Paragraph")}
      {b("H2", !!s?.h2, () => c().toggleHeading({ level: 2 }).run(), "Heading 2 (section)")}
      {b("H3", !!s?.h3, () => c().toggleHeading({ level: 3 }).run(), "Heading 3 (sub-section)")}
      {b("H4", !!s?.h4, () => c().toggleHeading({ level: 4 }).run(), "Heading 4")}
      <span className="mx-1 h-5 w-px bg-line" />
      {b("B", !!s?.bold, () => c().toggleBold().run(), "Bold")}
      {b("I", !!s?.italic, () => c().toggleItalic().run(), "Italic")}
      {b("• List", !!s?.ul, () => c().toggleBulletList().run(), "Bulleted list")}
      {b("1. List", !!s?.ol, () => c().toggleOrderedList().run(), "Numbered list")}
      {b("❝", !!s?.quote, () => c().toggleBlockquote().run(), "Quote")}
      <span className="mx-1 h-5 w-px bg-line" />
      {b("🔗 Link", !!s?.link, link, "Add or edit a link")}
      {b("↳ Page link", false, onInternalLink, "Link to a page on this site")}
      {b("🖼 Image", false, onImage, "Insert an image from the media library")}
      {b("—", false, () => c().setHorizontalRule().run(), "Divider")}
      <span className="mx-1 h-5 w-px bg-line" />
      {b("↶", false, () => c().undo().run(), "Undo")}
      {b("↷", false, () => c().redo().run(), "Redo")}
      {b("Clear", false, () => c().unsetAllMarks().clearNodes().run(), "Clear formatting")}
    </div>
  );
}

/** Edit the alt text of the selected image in place. */
function ImageAltBar({ editor }: { editor: Editor }) {
  const img = useEditorState({ editor, selector: ({ editor: e }) => (e.isActive("image") ? (e.getAttributes("image") as { alt?: string; src?: string }) : null) });
  if (!img) return null;
  return (
    <div className="flex items-center gap-2 border-t border-line bg-brand-50/50 px-3 py-2 text-[12px]">
      <span className="font-semibold text-ink-700">Image alt text</span>
      <input
        value={img.alt ?? ""}
        onChange={(e) => editor.chain().updateAttributes("image", { alt: e.target.value }).run()}
        placeholder="Describe the image"
        className="flex-1 rounded border border-line px-2 py-1 outline-none focus:border-brand-500"
      />
    </div>
  );
}

function InternalLinkPicker({ onPick, onClose }: { onPick: (href: string) => void; onClose: () => void }) {
  const { token } = useSession();
  const [q, setQ] = useState("");
  const [items, setItems] = useState<{ path: string; name: string; type: string }[]>([]);
  useEffect(() => {
    const t = setTimeout(async () => {
      const { ok, data } = await adminRequest<{ items: { path: string; name: string; type: string }[] }>(`/api/admin/seo/pages?pageSize=12&q=${encodeURIComponent(q)}`, token);
      if (ok) setItems(data.items);
    }, 250);
    return () => clearTimeout(t);
  }, [q, token]);
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-900/50 p-4" role="dialog" aria-modal="true" aria-label="Link to a page">
      <div className="mt-20 w-full max-w-lg rounded-2xl bg-white p-5 shadow-pop">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold">Link to a page on this site</h2>
          <button className={btnGhost} onClick={onClose}>Close</button>
        </div>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search colleges, courses, exams, articles…" className={`${inputCls} mt-3`} />
        <ul className="mt-3 max-h-80 divide-y divide-line overflow-auto">
          {items.map((i) => (
            <li key={i.path}>
              <button className="w-full px-2 py-2 text-left hover:bg-brand-50" onClick={() => onPick(i.path)}>
                <span className="block text-[13px] font-semibold text-ink-900">{i.name}</span>
                <span className="font-mono text-[11px] text-ink-400">{i.path}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-ink-400">Select text in the editor first — it becomes the link&apos;s anchor text.</p>
      </div>
    </div>
  );
}

/** On-page SEO checks for a rich text body. */
export function ContentChecks({ html, title, summary }: { html: string; title: string; summary?: string }) {
  const r = useMemo(() => {
    const doc = typeof window === "undefined" ? null : new DOMParser().parseFromString(html || "", "text/html");
    if (!doc) return null;
    const text = doc.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const headings = [...doc.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1]));
    const skips = headings.some((lvl, i) => (i === 0 ? lvl > 2 : lvl > headings[i - 1] + 1));
    const links = [...doc.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") ?? "");
    const internal = links.filter((h) => h.startsWith("/") || (typeof window !== "undefined" && h.startsWith(window.location.origin))).length;
    return {
      words: text ? text.split(" ").length : 0,
      h1: doc.querySelectorAll("h1").length,
      h2: doc.querySelectorAll("h2").length,
      skips,
      imgs: doc.querySelectorAll("img").length,
      noAlt: [...doc.querySelectorAll("img")].filter((i) => !i.getAttribute("alt")?.trim()).length,
      internal,
      external: links.length - internal,
    };
  }, [html]);
  if (!r) return null;
  const rows: [boolean | "warn", string][] = [
    [!!title.trim(), title.trim() ? "Has an H1 (the title)" : "Missing H1 — add a title"],
    [r.h1 === 0, r.h1 ? `${r.h1} extra H1 in the text — they'll become H2` : "Only one H1"],
    [r.h2 > 0 ? true : "warn", r.h2 ? `${r.h2} H2 section heading(s)` : "No H2 headings — break the text into sections"],
    [r.skips ? "warn" : true, r.skips ? "Heading levels skip (e.g. H2 → H4)" : "Heading order looks right"],
    [r.noAlt ? false : true, r.noAlt ? `${r.noAlt} image(s) missing alt text` : r.imgs ? "All images have alt text" : "No images"],
    [r.internal > 0 ? true : "warn", `${r.internal} internal link(s), ${r.external} external`],
    [r.words >= 300 ? true : "warn", `${r.words} words${r.words < 300 ? " — thin content; aim for 300+" : ""}`],
    ...(summary !== undefined
      ? [[summary.length >= 70 && summary.length <= 160 ? true : "warn", summary ? `Summary ${summary.length} chars (70–160 ideal for the meta description)` : "No summary — used as the meta description"] as [boolean | "warn", string]]
      : []),
  ];
  return (
    <ul className="space-y-1 text-[12px]">
      {rows.map(([ok, label]) => (
        <li key={label} className={ok === true ? "text-ink-600" : ok === "warn" ? "text-warn" : "text-danger"}>{ok === true ? "✓" : ok === "warn" ? "⚠" : "✗"} {label}</li>
      ))}
    </ul>
  );
}
