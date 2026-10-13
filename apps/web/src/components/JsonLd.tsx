import { getSeoOverride } from "@/lib/seo";

// Renders a JSON-LD <script> for structured data. Server component.
// "<" is escaped so no string value can close the script tag early.
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/**
 * A page's structured data, honouring its admin SEO settings: the automatic
 * schema (`data`) can be switched off per page, and custom JSON-LD is appended.
 */
export async function PageJsonLd({ path, data }: { path: string; data?: object | object[] }) {
  const o = await getSeoOverride(path);
  const nodes: object[] = [];
  if (data && !o.disableSchema) nodes.push(...(Array.isArray(data) ? data : [data]));
  if (o.customSchema) {
    try {
      const custom = JSON.parse(o.customSchema);
      nodes.push(...(Array.isArray(custom) ? custom : [custom]));
    } catch {
      // Invalid JSON is rejected on save; ignore anything that slipped through.
    }
  }
  if (!nodes.length) return null;
  return <JsonLd data={nodes.length === 1 ? nodes[0] : nodes} />;
}
