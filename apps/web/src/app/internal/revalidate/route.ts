import { revalidatePath, revalidateTag } from "next/cache";

/**
 * POST /internal/revalidate { paths?, tags? } — called by the API after admin
 * edits so changed pages refresh immediately instead of after the ISR window.
 * Authenticated with REVALIDATE_SECRET (falls back to the admin token).
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET || process.env.ADMIN_TOKEN;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { paths?: unknown; tags?: unknown };
  const paths = Array.isArray(body.paths) ? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/")) : [];
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string") : [];

  for (const path of paths.slice(0, 2000)) {
    revalidateTag(`seo:${path}`); // the page's SEO override fetch
    revalidatePath(path); // the rendered page itself
  }
  for (const tag of tags) revalidateTag(tag);
  if (tags.includes("seo-settings")) {
    revalidatePath("/robots.txt");
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemaps/[file]", "page");
  }
  return Response.json({ revalidated: paths.length, tags });
}
