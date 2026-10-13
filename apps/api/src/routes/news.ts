import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { liveNewsWhere } from "../lib/content";

export const newsRouter = Router();

// Public fields only — workflow data (pending edits, review notes, authors) stays private.
const PUBLIC_FIELDS = {
  id: true, slug: true, category: true, title: true, excerpt: true, body: true,
  date: true, publishedAt: true, readTime: true, imgUrl: true, updatedAt: true,
} as const;

newsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const items = await prisma.newsArticle.findMany({
      where: { ...liveNewsWhere(), ...(category ? { category } : {}) },
      orderBy: { publishedAt: "desc" },
      select: PUBLIC_FIELDS,
    });
    res.json({ items });
  }),
);

newsRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const article = await prisma.newsArticle.findFirst({ where: { slug: req.params.slug, ...liveNewsWhere() }, select: PUBLIC_FIELDS });
    if (!article) throw new HttpError(404, "Article not found");
    res.json(article);
  }),
);
