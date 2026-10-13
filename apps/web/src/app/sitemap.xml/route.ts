import { COLLEGES_PER_FILE, collegeEntries, fileEntries, indexXml, newest, sitemapSettings, xmlResponse } from "@/lib/sitemap";

export const revalidate = 3600;

/** /sitemap.xml — sitemap index listing one file per content type. */
export async function GET() {
  const settings = await sitemapSettings();
  const files: { name: string; lastModified?: string }[] = [];

  for (const name of ["pages", "streams", "cities", "news", "courses", "exams", "info"]) {
    const entries = (await fileEntries(name, settings)) ?? [];
    if (entries.length) files.push({ name, lastModified: newest(entries) });
  }
  if (settings.sitemap.colleges) {
    const colleges = await collegeEntries();
    for (let i = 0; i * COLLEGES_PER_FILE < colleges.length; i++) {
      const chunk = colleges.slice(i * COLLEGES_PER_FILE, (i + 1) * COLLEGES_PER_FILE);
      files.push({ name: `colleges-${i + 1}`, lastModified: newest(chunk) });
    }
  }
  return xmlResponse(indexXml(files));
}
