import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler, HttpError } from "../middleware/error";
import { listQuerySchema } from "../lib/validation";

export const collegesRouter = Router();

// Compact shape for cards / listing.
const cardSelect = {
  id: true,
  name: true,
  slug: true,
  location: true,
  state: true,
  type: true,
  rank: true,
  rating: true,
  reviewsLabel: true,
  feesNum: true,
  feesLabel: true,
  packageLabel: true,
  examName: true,
  estd: true,
  imgUrl: true,
  mode: true,
  featured: true,
  approvals: true,
  stream: { select: { name: true, slug: true } },
  city: { select: { name: true, slug: true } },
  gallery: { select: { id: true, url: true }, orderBy: { sort: "asc" }, take: 4 },
} satisfies Prisma.CollegeSelect;

const ORDER: Record<string, Prisma.CollegeOrderByWithRelationInput[]> = {
  // nulls last so curated colleges surface above bulk-imported ones
  rank: [{ rank: { sort: "asc", nulls: "last" } }, { rating: "desc" }],
  rating: [{ rating: { sort: "desc", nulls: "last" } }],
  feesLow: [{ feesNum: { sort: "asc", nulls: "last" } }],
  feesHigh: [{ feesNum: { sort: "desc", nulls: "last" } }],
};

/** GET /api/colleges — filter, sort, paginate. */
collegesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = listQuerySchema.parse(req.query);

    const where: Prisma.CollegeWhereInput = { published: true };
    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: "insensitive" } },
        { location: { contains: q.search, mode: "insensitive" } },
        { stream: { name: { contains: q.search, mode: "insensitive" } } },
      ];
    }
    // Required to-one relations are filtered directly (no `is`).
    if (q.stream) where.stream = { OR: [{ slug: q.stream }, { name: q.stream }] };
    if (q.city) where.city = { OR: [{ slug: q.city }, { name: q.city }] };
    if (q.state) where.state = { equals: q.state, mode: "insensitive" };
    if (q.type) where.type = q.type;
    if (q.mode) where.mode = q.mode;
    if (q.featured) where.featured = true;
    if (q.program) where.courses = { some: { name: { contains: q.program, mode: "insensitive" } } };
    if (q.maxFees) where.feesNum = { lte: q.maxFees };

    const [total, items] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        select: cardSelect,
        orderBy: ORDER[q.sort],
        skip: (q.page - 1) * q.pageSize,
        take: q.pageSize,
      }),
    ]);

    res.json({
      items,
      page: q.page,
      pageSize: q.pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / q.pageSize)),
    });
  }),
);

/** GET /api/colleges/compare?ids=slug1,slug2 — up to 4 colleges side by side. */
collegesRouter.get(
  "/compare",
  asyncHandler(async (req, res) => {
    const ids = String(req.query.ids || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);
    if (!ids.length) return res.json({ items: [] });
    const items = await prisma.college.findMany({
      where: { slug: { in: ids }, published: true },
      select: cardSelect,
    });
    res.json({ items });
  }),
);

/** GET /api/colleges/sitemap — minimal feed for sitemap generation. */
collegesRouter.get(
  "/sitemap",
  asyncHandler(async (_req, res) => {
    const items = await prisma.college.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { id: "asc" },
    });
    res.json({ items });
  }),
);

/** GET /api/colleges/:slug — full detail. */
collegesRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const college = await prisma.college.findFirst({
      where: { slug: req.params.slug, published: true },
      include: {
        stream: true,
        city: true,
        courses: true,
        highlights: { orderBy: { id: "asc" } },
        ratingBars: true,
        reviews: { orderBy: { createdAt: "desc" } },
        gallery: { orderBy: { sort: "asc" } },
        placement: true,
        faqs: { orderBy: { sort: "asc" } },
        sections: { orderBy: { sort: "asc" } },
        recruiters: { include: { recruiter: true } },
        exams: { include: { exam: true } },
      },
    });
    if (!college) throw new HttpError(404, "College not found");

    res.json({
      ...college,
      recruiters: college.recruiters.map((r) => r.recruiter.name),
      exams: college.exams.map((e) => e.exam),
    });
  }),
);
