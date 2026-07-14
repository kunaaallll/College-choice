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

const app = express();
const PORT = Number(process.env.API_PORT || 4000);

// Allow one or many comma-separated origins.
const origins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim());

app.use(helmet());
app.use(cors({ origin: origins, credentials: true }));
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

app.use("/api/admin", adminRouter);
app.use("/api/colleges", collegesRouter);
app.use("/api/streams", streamsRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/exams", examsRouter);
app.use("/api/news", newsRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 College Choice API listening on http://localhost:${PORT}`);
});
