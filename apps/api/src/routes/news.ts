import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";

export const newsRouter = Router();

newsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const items = await prisma.newsArticle.findMany({
      where: category ? { category } : undefined,
      orderBy: { publishedAt: "desc" },
    });
    res.json({ items });
  }),
);

newsRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const article = await prisma.newsArticle.findUnique({ where: { slug: req.params.slug } });
    if (!article) throw new HttpError(404, "Article not found");
    res.json(article);
  }),
);
