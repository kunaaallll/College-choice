import React from "react";

// Minimal, dependency-free markdown renderer for editorial college content.
// Supports: paragraphs, ## / ### headings, "- " lists, GFM tables, **bold**,
// [text](url) links. Deliberately strict — content is authored by us.

function inline(text: string): React.ReactNode[] {
  // Split on **bold** and [text](url) tokens.
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink-900">
          {p.slice(2, -2)}
        </strong>
      );
    }
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith("http");
      return (
        <a
          key={i}
          href={link[2]}
          className="font-semibold text-brand-600 hover:text-brand-700"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return p;
  });
}

const isTableLine = (l: string) => l.trim().startsWith("|") && l.trim().endsWith("|");
const splitRow = (l: string) =>
  l
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Table: header row + |---| separator
    if (isTableLine(line) && i + 1 < lines.length && /^\s*\|[\s\-:|]+\|\s*$/.test(lines[i + 1])) {
      const header = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableLine(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50/60 text-ink-500">
              <tr>
                {header.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 font-semibold">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-line">
                  {r.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-semibold text-ink-900" : "text-ink-600"}`}>
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push(
        <h4 key={key++} className="mt-5 text-base font-bold text-ink-900">
          {inline(line.slice(4))}
        </h4>,
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h3 key={key++} className="mt-6 text-lg font-bold text-ink-900">
          {inline(line.slice(3))}
        </h3>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-3 space-y-2">
          {items.map((it, ii) => (
            <li key={ii} className="flex gap-2 text-[15px] leading-relaxed text-ink-600">
              <span className="mt-0.5 shrink-0 text-brand-600">•</span>
              <span>{inline(it)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph: gather until blank line / structural line
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].startsWith("#") &&
      !isTableLine(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-3 text-[15px] leading-relaxed text-ink-600">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return <div>{blocks}</div>;
}
