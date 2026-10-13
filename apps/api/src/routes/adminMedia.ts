/**
 * Media library (/api/admin/media): uploads with type/size validation, WebP
 * variants for responsive images, alt/title/caption/description, folders,
 * usage tracking ("where is this used?"), replace and delete.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { z } from "zod";
import type { Media, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { requirePermission } from "../lib/adminAuth";
import { UPLOAD_DIR } from "./admin";

export const adminMediaRouter = Router();

const PUBLIC_BASE = "/api/uploads";
const MAX_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = /^image\/(jpeg|png|webp|avif|gif)$/;
const ALLOWED = (m: string) => IMAGE_TYPES.test(m) || m === "application/pdf";
const WIDTHS = [480, 960, 1600];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 20 },
});

const fileUrl = (name: string) => `${PUBLIC_BASE}/${name}`;
const fileOf = (url: string) => path.join(UPLOAD_DIR, path.basename(url));
const variantName = (base: string, w: number) => `${base}-w${w}.webp`;
const isVariant = (name: string) => /-w\d+\.webp$/.test(name);

/** Store a file (plus WebP sizes for images); returns the Media fields. */
async function store(file: Express.Multer.File) {
  if (!ALLOWED(file.mimetype)) throw new HttpError(400, `${file.originalname}: only JPG, PNG, WebP, AVIF, GIF images or PDF files are allowed.`);
  const ext = (path.extname(file.originalname) || (file.mimetype === "application/pdf" ? ".pdf" : ".jpg")).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
  const name = `${base}${ext}`;
  let width: number | null = null, height: number | null = null;
  const variants: Record<string, string> = {};

  if (IMAGE_TYPES.test(file.mimetype)) {
    let img = sharp(file.buffer, { animated: file.mimetype === "image/gif" });
    let meta: sharp.Metadata;
    try { meta = await img.metadata(); } catch { throw new HttpError(400, `${file.originalname} isn't a readable image.`); }
    width = meta.width ?? null;
    height = meta.pageHeight ?? meta.height ?? null;
    // Re-encode large JPEG/PNG originals so they're not needlessly heavy (keeps format).
    if ((file.mimetype === "image/jpeg" || file.mimetype === "image/png") && file.size > 400_000) {
      img = file.mimetype === "image/jpeg" ? img.rotate().jpeg({ quality: 82, mozjpeg: true }) : img.png({ compressionLevel: 9 });
      await fs.promises.writeFile(path.join(UPLOAD_DIR, name), await img.toBuffer());
    } else {
      await fs.promises.writeFile(path.join(UPLOAD_DIR, name), file.buffer);
    }
    if (file.mimetype !== "image/gif") {
      for (const w of WIDTHS) {
        if (width && w > width && w !== WIDTHS[0]) continue; // don't upscale (always keep the smallest)
        const out = variantName(base, w);
        await sharp(file.buffer).rotate().resize({ width: Math.min(w, width ?? w), withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(UPLOAD_DIR, out));
        variants[String(w)] = fileUrl(out);
      }
    }
  } else {
    await fs.promises.writeFile(path.join(UPLOAD_DIR, name), file.buffer);
  }
  return { url: fileUrl(name), filename: file.originalname.slice(0, 200), mime: file.mimetype, size: file.size, width, height, variants };
}

function removeFiles(m: Pick<Media, "url" | "variants">) {
  const urls = [m.url, ...Object.values((m.variants as Record<string, string> | null) ?? {})];
  for (const u of urls) if (u.startsWith(PUBLIC_BASE)) fs.promises.unlink(fileOf(u)).catch(() => {});
}

// ── Usage: where each uploaded file is referenced ─────────────

const UPLOAD_RE = /\/api\/uploads\/([A-Za-z0-9._-]+)/g;
const baseOf = (name: string) => name.replace(/-w\d+\.webp$/, "");

/** filename base → human-readable places it's used (computed fresh: deletes rely on it). */
async function usageMap(): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  const add = (text: string | null | undefined, where: string) => {
    if (!text) return;
    for (const m of text.matchAll(UPLOAD_RE)) {
      const key = baseOf(m[1]).replace(/\.[a-z0-9]+$/i, "");
      const list = map.get(key) ?? [];
      if (!list.includes(where)) list.push(where);
      map.set(key, list);
    }
  };
  const [colleges, gallery, news, entries, seo] = await Promise.all([
    prisma.college.findMany({ where: { OR: [{ imgUrl: { contains: "/uploads/" } }, { sampleDegreeUrl: { contains: "/uploads/" } }] }, select: { name: true, imgUrl: true, sampleDegreeUrl: true } }),
    prisma.galleryImage.findMany({ where: { url: { contains: "/uploads/" } }, select: { url: true, college: { select: { name: true } } } }),
    prisma.newsArticle.findMany({ select: { title: true, imgUrl: true, body: true } }),
    prisma.contentEntry.findMany({ select: { type: true, title: true, heroImage: true, body: true } }),
    prisma.seoMeta.findMany({ where: { ogImage: { contains: "/uploads/" } }, select: { path: true, ogImage: true } }),
  ]);
  for (const c of colleges) { add(c.imgUrl, `College: ${c.name}`); add(c.sampleDegreeUrl, `College sample degree: ${c.name}`); }
  for (const g of gallery) add(g.url, `College photos: ${g.college.name}`);
  for (const n of news) { add(n.imgUrl, `Article cover: ${n.title}`); add(n.body, `Article text: ${n.title}`); }
  for (const e of entries) { add(e.heroImage, `${e.type.toLowerCase()} image: ${e.title}`); add(e.body, `${e.type.toLowerCase()} text: ${e.title}`); }
  for (const s of seo) add(s.ogImage, `Social image: ${s.path}`);
  return map;
}
const keyOf = (url: string) => baseOf(path.basename(url)).replace(/\.[a-z0-9]+$/i, "");

// ─────────────────────────────────────────────────────────────

/** GET /api/admin/media?q=&folder=&type=image|pdf&filter=unused|no-alt&page= */
adminMediaRouter.get(
  "/",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const q = String(req.query.q || "").trim();
    const folder = req.query.folder === undefined ? undefined : String(req.query.folder);
    const filter = String(req.query.filter || "");
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = 48;
    const where: Prisma.MediaWhereInput = {
      ...(q ? { OR: [{ filename: { contains: q, mode: "insensitive" } }, { alt: { contains: q, mode: "insensitive" } }, { title: { contains: q, mode: "insensitive" } }] } : {}),
      ...(folder !== undefined && folder !== "*" ? { folder } : {}),
      ...(req.query.type === "image" ? { mime: { startsWith: "image/" } } : req.query.type === "pdf" ? { mime: "application/pdf" } : {}),
      ...(filter === "no-alt" ? { mime: { startsWith: "image/" }, OR: [{ alt: null }, { alt: "" }] } : {}),
    };
    const usage = await usageMap();
    let rows = await prisma.media.findMany({ where, orderBy: { createdAt: "desc" } });
    if (filter === "unused") rows = rows.filter((m) => !usage.has(keyOf(m.url)));
    const folders = (await prisma.media.groupBy({ by: ["folder"], _count: { _all: true }, orderBy: { folder: "asc" } })).map((f) => ({ name: f.folder, count: f._count._all }));
    const counts = {
      total: await prisma.media.count(),
      noAlt: await prisma.media.count({ where: { mime: { startsWith: "image/" }, OR: [{ alt: null }, { alt: "" }] } }),
    };
    const start = (page - 1) * pageSize;
    res.json({
      items: rows.slice(start, start + pageSize).map((m) => ({ ...m, usedIn: usage.get(keyOf(m.url)) ?? [] })),
      total: rows.length, page, totalPages: Math.max(1, Math.ceil(rows.length / pageSize)), folders, counts,
    });
  }),
);

/** POST /api/admin/media (multipart "files", optional "folder") — upload one or more files. */
adminMediaRouter.post(
  "/",
  requirePermission("content:edit"),
  upload.array("files", 20),
  asyncHandler(async (req, res) => {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) throw new HttpError(400, "No files uploaded");
    const folder = String(req.body?.folder || "").trim().slice(0, 80);
    const created: Media[] = [];
    for (const f of files) {
      const stored = await store(f);
      created.push(await prisma.media.create({
        data: { ...stored, variants: stored.variants as Prisma.InputJsonValue, folder, alt: null, createdById: req.admin!.id },
      }));
    }
    res.status(201).json({ items: created });
  }),
);

/** PUT /api/admin/media/:id { alt, title, caption, description, folder } */
adminMediaRouter.put(
  "/:id(\\d+)",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const data = z.object({
      alt: z.string().trim().max(300).nullish(),
      title: z.string().trim().max(200).nullish(),
      caption: z.string().trim().max(500).nullish(),
      description: z.string().trim().max(2000).nullish(),
      folder: z.string().trim().max(80).optional(),
    }).parse(req.body);
    const m = await prisma.media.update({ where: { id: Number(req.params.id) }, data }).catch(() => null);
    if (!m) throw new HttpError(404, "File not found");
    res.json(m);
  }),
);

/** Every column that can hold an uploaded file URL (for replace). */
async function replaceReferences(oldUrls: string[], newUrl: string, newVariants: Record<string, string>) {
  const pick = (u: string) => {
    const w = /-w(\d+)\.webp$/.exec(u)?.[1];
    return (w && newVariants[w]) || newUrl;
  };
  const swapText = (t: string | null) => (t ? oldUrls.reduce((acc, u) => acc.split(u).join(pick(u)), t) : t);
  await prisma.$transaction(async (tx) => {
    for (const u of oldUrls) {
      await tx.college.updateMany({ where: { imgUrl: u }, data: { imgUrl: pick(u) } });
      await tx.college.updateMany({ where: { sampleDegreeUrl: u }, data: { sampleDegreeUrl: pick(u) } });
      await tx.galleryImage.updateMany({ where: { url: u }, data: { url: pick(u) } });
      await tx.newsArticle.updateMany({ where: { imgUrl: u }, data: { imgUrl: pick(u) } });
      await tx.contentEntry.updateMany({ where: { heroImage: u }, data: { heroImage: pick(u) } });
      await tx.seoMeta.updateMany({ where: { ogImage: u }, data: { ogImage: pick(u) } });
    }
    for (const n of await tx.newsArticle.findMany({ where: { body: { contains: "/api/uploads/" } }, select: { id: true, body: true } })) {
      const body = swapText(n.body);
      if (body !== n.body) await tx.newsArticle.update({ where: { id: n.id }, data: { body } });
    }
    for (const e of await tx.contentEntry.findMany({ where: { body: { contains: "/api/uploads/" } }, select: { id: true, body: true } })) {
      const body = swapText(e.body);
      if (body !== e.body) await tx.contentEntry.update({ where: { id: e.id }, data: { body } });
    }
  });
}

/** POST /api/admin/media/:id/replace (multipart "file") — new file everywhere the old one was used. */
adminMediaRouter.post(
  "/:id(\\d+)/replace",
  requirePermission("content:edit"),
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const old = await prisma.media.findUnique({ where: { id: Number(req.params.id) } });
    if (!old) throw new HttpError(404, "File not found");
    const f = req.file as Express.Multer.File | undefined;
    if (!f) throw new HttpError(400, "No file uploaded");
    const stored = await store(f);
    const oldUrls = [old.url, ...Object.values((old.variants as Record<string, string> | null) ?? {})];
    await replaceReferences(oldUrls, stored.url, stored.variants);
    const m = await prisma.media.update({
      where: { id: old.id },
      data: { url: stored.url, filename: stored.filename, mime: stored.mime, size: stored.size, width: stored.width, height: stored.height, variants: stored.variants as Prisma.InputJsonValue },
    });
    removeFiles(old);
    res.json(m);
  }),
);

/** DELETE /api/admin/media/:id?force=1 — refuses files still in use unless forced. */
adminMediaRouter.delete(
  "/:id(\\d+)",
  requirePermission("content:edit"),
  asyncHandler(async (req, res) => {
    const m = await prisma.media.findUnique({ where: { id: Number(req.params.id) } });
    if (!m) throw new HttpError(404, "File not found");
    const used = (await usageMap()).get(keyOf(m.url)) ?? [];
    if (used.length && req.query.force !== "1") {
      return res.status(409).json({ error: `Still used in ${used.length} place(s): ${used.slice(0, 3).join("; ")}${used.length > 3 ? "…" : ""}`, usedIn: used });
    }
    await prisma.media.delete({ where: { id: m.id } });
    removeFiles(m);
    res.json({ ok: true });
  }),
);

/** POST /api/admin/media/scan — add earlier uploads (college photos, article images) to the library. */
adminMediaRouter.post(
  "/scan",
  requirePermission("content:edit"),
  asyncHandler(async (_req, res) => {
    const names = (await fs.promises.readdir(UPLOAD_DIR)).filter((n) => !isVariant(n) && !n.startsWith("."));
    const known = new Set((await prisma.media.findMany({ select: { url: true } })).map((m) => m.url));
    let added = 0;
    for (const name of names) {
      const url = fileUrl(name);
      if (known.has(url)) continue;
      const stat = await fs.promises.stat(path.join(UPLOAD_DIR, name)).catch(() => null);
      if (!stat?.isFile()) continue;
      const ext = path.extname(name).toLowerCase();
      const mime = ext === ".pdf" ? "application/pdf" : ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : ext === ".avif" ? "image/avif" : ext === ".gif" ? "image/gif" : "image/jpeg";
      let width: number | null = null, height: number | null = null;
      if (mime.startsWith("image/")) {
        try { const meta = await sharp(path.join(UPLOAD_DIR, name)).metadata(); width = meta.width ?? null; height = meta.height ?? null; } catch { continue; }
      }
      await prisma.media.create({ data: { url, filename: name, mime, size: stat.size, width, height, folder: "Earlier uploads" } });
      added++;
    }
    res.json({ added });
  }),
);
