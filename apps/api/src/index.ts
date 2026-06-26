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
