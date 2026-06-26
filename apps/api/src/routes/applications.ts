import { Router } from "express";
import { prisma } from "../prisma";
import { asyncHandler } from "../middleware/error";
import { applicationSchema } from "../lib/validation";

export const applicationsRouter = Router();

/** POST /api/applications — apply-modal lead capture. */
applicationsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = applicationSchema.parse(req.body);

    // Snapshot the college name if an id was supplied.
    let collegeName = data.collegeName ?? null;
    if (data.collegeId) {
      const college = await prisma.college.findUnique({
        where: { id: data.collegeId },
        select: { name: true },
      });
      collegeName = college?.name ?? collegeName;
    }

    const application = await prisma.application.create({
      data: {
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        courseInterested: data.courseInterested ?? null,
        collegeName,
        collegeId: data.collegeId ?? null,
      },
      select: { id: true, createdAt: true },
    });

    res.status(201).json({
      ok: true,
      id: application.id,
      message: "Application started! Our counsellor will call you within 24 hours.",
    });
  }),
);
