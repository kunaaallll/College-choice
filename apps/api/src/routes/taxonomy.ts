import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler } from "../middleware/error";

// Streams, cities and exams — used by nav, filters and landing pages.
export const streamsRouter = Router();
export const citiesRouter = Router();
export const examsRouter = Router();

streamsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await prisma.stream.findMany({ orderBy: { collegeCount: "desc" } });
    res.json({ items });
  }),
);

citiesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await prisma.city.findMany({
      where: { imageUrl: { not: null } }, // featured cities (have imagery)
      orderBy: { collegeCount: "desc" },
    });
    res.json({ items });
  }),
);

examsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    // Chronological so the homepage "upcoming exams" shows the soonest first.
    // examOn nulls sort last; id keeps a stable tiebreak.
    const items = await prisma.exam.findMany({
      orderBy: [{ examOn: { sort: "asc", nulls: "last" } }, { id: "asc" }],
    });
    res.json({ items });
  }),
);

examsRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const exam = await prisma.exam.findUnique({
      where: { slug: req.params.slug },
      include: {
        colleges: {
          include: { college: { select: { name: true, slug: true, location: true, examName: true } } },
        },
      },
    });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json({ ...exam, colleges: exam.colleges.map((c) => c.college) });
  }),
);
