# College Choice — Architecture & Plan

This document is the technical plan for rebuilding the **College Choice** website (currently a
static design / single bundled HTML page) as a modern, database-backed application that will
replace the existing site hosted on Hostinger.

---

## 1. What the product is

College Choice is a **college discovery, comparison and application platform for India**. From the
original design, the surface area is:

| Area | Description |
|------|-------------|
| Home | Hero search, popular tags, headline stats, browse-by-stream, top-ranked colleges, browse-by-city, upcoming exams, value props, latest news |
| Colleges listing | Filter by stream / type / city / max-fees, sort by rank/rating/fees, search |
| College detail | Overview, courses & fees, admission steps, placements, reviews + rating bars, gallery, quick facts |
| Courses / Streams | Stream cards → degrees, eligibility, avg fees, career paths |
| Exams | Entrance exams 2026 — dates, mode, level, accepting colleges |
| News / Articles | Admission alerts, results, counselling guides |
| Compare | Side-by-side up to 4 colleges |
| About | Company / stats |
| Apply modal | Lead capture → "counsellor will call you" |
| Login / Signup | Email/phone + Google OAuth |

## 2. Tech stack

```
Monorepo (npm workspaces)
├── apps/web   → Next.js 15 (App Router, TypeScript, Tailwind) — the frontend
└── apps/api   → Node.js + Express + TypeScript + Prisma — the REST backend
         │
         └── PostgreSQL 16 — the database
```

**Why these choices**

- **PostgreSQL** — the data is highly relational (a college has many courses, reviews, recruiters,
  gallery images; colleges relate to streams, cities and exams; the listing page leans on
  multi-column filtering + sorting + ranges). A relational engine handles this far better than a
  document store. Prisma gives us type-safe queries and migrations.
- **Separate Express API** — the brief specified "Node.js as backend". A standalone REST service
  keeps a clean boundary, can be scaled/deployed independently, and could later serve a mobile app.
- **Next.js (App Router)** — SSR/SSG for SEO (critical for a discovery site that wants to rank for
  "best engineering colleges in X"), fast routing, React Server Components for data fetching.

## 3. Repository layout

```
.
├── apps/
│   ├── api/                 # Express + Prisma backend
│   │   ├── prisma/
│   │   │   ├── schema.prisma # DB schema (source of truth)
│   │   │   └── seed.ts       # Seeds the DB with the design's data
│   │   └── src/
│   │       ├── index.ts      # Express app bootstrap
│   │       ├── prisma.ts     # Prisma client singleton
│   │       ├── lib/          # validation (zod), auth helpers
│   │       ├── middleware/   # error handler, auth guard
│   │       └── routes/       # colleges, streams, cities, exams, news, applications, auth
│   └── web/                 # Next.js frontend
│       └── src/
│           ├── app/          # routes (home, colleges, colleges/[slug], courses, exams, news, compare, about)
│           ├── components/   # Navbar, Footer, CollegeCard, Filters, ApplyModal, LoginModal
│           └── lib/          # api client, types, theme tokens
├── docker-compose.yml       # db + api + web for a VPS deploy
├── nginx/collegechoice.conf  # reverse proxy sample
└── ARCHITECTURE.md          # this file
```

## 4. Database model (PostgreSQL)

See `apps/api/prisma/schema.prisma` for the authoritative schema. Summary:

| Table | Purpose | Key relations |
|-------|---------|---------------|
| `User` | Auth (email/phone + password, or Google) | → Application |
| `Stream` | Engineering, Medical, … | ← College |
| `City` | Delhi, Mumbai, … | ← College |
| `Exam` | JEE, NEET, CUET, … | ↔ College (M:N via `CollegeExam`) |
| `College` | Core entity | → Stream, City; ← Course, Review, GalleryImage, Highlight, Placement, recruiters |
| `Course` | Courses & fees rows on a college | → College |
| `Highlight` | Bullet highlights on detail page | → College |
| `Review` | Student reviews | → College |
| `RatingBar` | Academics/Faculty/… score bars | → College |
| `Placement` | Avg/highest package, placed % | → College (1:1) |
| `Recruiter` | Google, Microsoft, … | ↔ College (M:N via `CollegeRecruiter`) |
| `GalleryImage` | Campus photos | → College |
| `NewsArticle` | News & articles | — |
| `Application` | Apply-modal leads | → College (optional), User (optional) |

Slugs are stored on `College`, `Stream`, `City`, `Exam`, `NewsArticle` for clean SEO URLs.

## 5. API surface (REST, JSON)

```
GET   /health
GET   /api/colleges                 ?search=&stream=&type=&city=&maxFees=&sort=&page=
GET   /api/colleges/:slug           full detail (courses, reviews, placement, recruiters, gallery)
GET   /api/colleges/compare?ids=    up to 4 colleges for the compare table
GET   /api/streams
GET   /api/cities
GET   /api/exams
GET   /api/news                     ?category=
GET   /api/news/:slug
POST  /api/applications             lead capture (apply modal)
POST  /api/auth/register
POST  /api/auth/login
GET   /api/auth/me                  (Bearer JWT)
```

## 6. Deployment — replacing the Hostinger site

The current site is on Hostinger. Two supported paths:

### A. Hostinger VPS (keep Hostinger) — recommended
A VPS gives root access to run Node + Postgres. Use `docker-compose.yml`:
1. Point the domain's A record to the VPS IP.
2. `git clone`, copy `.env.example` → `.env`, set secrets.
3. `docker compose up -d --build` → brings up `db`, `api`, `web`.
4. Put Nginx (sample in `nginx/`) in front for TLS (Let's Encrypt) and to proxy `/api` → api, `/` → web.

> ⚠️ Hostinger **shared** hosting only runs PHP/MySQL and cannot host a long-running Node server.
> If you are on a shared plan, either upgrade to a VPS, or use path B.

### B. Vercel (web) + managed Postgres (api/db elsewhere)
- Deploy `apps/web` to Vercel, point the domain there.
- Deploy `apps/api` to Render/Railway/Fly; use Neon/Supabase for Postgres.
- This moves the app off Hostinger entirely (domain just re-points).

## 7. Local development

Prerequisites: **Node 22 LTS** (your machine currently has 16 — upgrade first), and Postgres
(local install or `docker compose up db`).

```bash
cp .env.example .env                 # fill in values
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
npm install
npm run db:migrate                   # create tables
npm run db:seed                      # load the design's data
npm run dev                          # api on :4000, web on :3000
```

## 8. Roadmap (post-scaffold)

- Real Google OAuth (currently a stubbed button) + session refresh.
- Admin panel to manage colleges/news (CMS).
- Full-text search (Postgres `tsvector` or Meilisearch) for the hero search.
- Image hosting/CDN instead of Unsplash placeholders.
- Analytics on applications; counsellor dashboard.
