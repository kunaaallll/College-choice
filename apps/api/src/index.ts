import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/error";
import { collegesRouter } from "./routes/colleges";
import { citiesRouter, examsRouter, streamsRouter } from "./routes/taxonomy";
import { newsRouter } from "./routes/news";
import { applicationsRouter } from "./routes/applications";
import { authRouter } from "./routes/auth";
import { adminRouter, UPLOAD_DIR } from "./routes/admin";
import { adminSeoRouter } from "./routes/adminSeo";
import { adminAuthRouter, adminUsersRouter } from "./routes/adminAuth";
import { auditRouter, revisionsRouter } from "./routes/revisions";
import { adminEntriesRouter } from "./routes/adminEntries";
import { adminMediaRouter } from "./routes/adminMedia";
import { adminImportRouter, adminSiteRouter, adminTaxonomyRouter } from "./routes/adminSite";
import { entriesRouter, siteRouter } from "./routes/entries";
import { adminLeadsRouter } from "./routes/adminLeads";
import { seoRouter } from "./routes/seo";
import { requireAdminUser } from "./lib/adminAuth";
import { auditMutations } from "./lib/audit";
import { startScheduler } from "./lib/content";

const app = express();
const PORT = Number(process.env.API_PORT || 4000);

// Allow one or many comma-separated origins.
const origins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim());

app.use(helmet());
app.use(cors({ origin: origins, credentials: true }));
// SEO CSV imports can be several MB; registered first so the 1mb parser below skips them.
app.use(["/api/admin/seo", "/api/admin/entries/import", "/api/admin/import"], express.json({ limit: "10mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "collegechoice-api" }));

// Serve uploaded college photos (persistent volume in prod). Long cache — files
// are content-addressed by a random filename so they never change. Served under
// /api/uploads so the existing nginx /api/ route reaches it (no extra nginx
// location needed); also kept at /uploads for direct/optional nginx use.
const serveUploads = express.static(UPLOAD_DIR, { maxAge: "365d", immutable: true });
app.use("/api/uploads", serveUploads);
app.use("/uploads", serveUploads);

// CMS: every successful change is written to the audit log.
app.use("/api/admin", auditMutations);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/revisions", requireAdminUser, revisionsRouter);
app.use("/api/admin/audit", requireAdminUser, auditRouter);
app.use("/api/admin/seo", requireAdminUser, adminSeoRouter);
app.use("/api/admin/entries", requireAdminUser, adminEntriesRouter);
app.use("/api/admin/media", requireAdminUser, adminMediaRouter);
app.use("/api/admin/taxonomy", requireAdminUser, adminTaxonomyRouter);
app.use("/api/admin/site", requireAdminUser, adminSiteRouter);
app.use("/api/admin/import", requireAdminUser, adminImportRouter);
app.use("/api/admin/leads", requireAdminUser, adminLeadsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/seo", seoRouter);
app.use("/api/entries", entriesRouter);
app.use("/api/site", siteRouter);
app.use("/api/colleges", collegesRouter);
app.use("/api/streams", streamsRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/exams", examsRouter);
app.use("/api/news", newsRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

startScheduler();

app.listen(PORT, () => {
  console.log(`🚀 College Choice API listening on http://localhost:${PORT}`);
});
