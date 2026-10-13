import { fileEntries, sitemapSettings, urlsetXml, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

/** /sitemaps/<name>.xml — one sitemap file (see /sitemap.xml for the index). */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = file.replace(/\.xml$/, "");
  if (name === file) return new Response("Not found", { status: 404 });

  const settings = await sitemapSettings();
  const entries = await fileEntries(name, settings);
  if (!entries) return new Response("Not found", { status: 404 });

  const excluded = new Set(settings.excludedPaths);
  return xmlResponse(urlsetXml(entries.filter((e) => !excluded.has(e.path))));
}
