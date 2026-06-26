# College Choice

India's college discovery, comparison & application platform — rebuilt as a modern, database-backed
app (Next.js + Node/Express + PostgreSQL) to replace the previous static site.

> 📐 Full technical plan & database design: **[ARCHITECTURE.md](ARCHITECTURE.md)**

## Stack

- **Web** — Next.js 15 (App Router) + TypeScript + Tailwind CSS → `apps/web`
- **API** — Node.js + Express + TypeScript + Prisma → `apps/api`
- **Database** — PostgreSQL 16
- Monorepo via npm workspaces

## Requirements

- **Node.js 22 LTS** (the repo will not run on Node 16/17 — Next 15 requires ≥ 18.18; we target the
  current LTS, 22. Node 24 also works if you bump Prisma to v6.)
- PostgreSQL 16 (local install, or `docker compose up db`)

## Quick start (local)

```bash
# 1. Env files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
#   → edit DATABASE_URL / secrets as needed

# 2. Install
npm install

# 3. Database: create tables + load sample data
npm run db:migrate
npm run db:seed

# 4. Run both apps (api :4000, web :3000)
npm run dev
```

Open http://localhost:3000.

## Useful scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Run API + web together |
| `npm run dev:api` / `npm run dev:web` | Run one app |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:seed` | Seed colleges/streams/exams/news |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run build` | Build both apps for production |

## Deploy

See [ARCHITECTURE.md §6](ARCHITECTURE.md#6-deployment--replacing-the-hostinger-site). TL;DR:
on a **Hostinger VPS**, `docker compose up -d --build` and front it with Nginx (sample in
`nginx/`). Hostinger *shared* hosting can't run Node — use a VPS or deploy web→Vercel, api→Render.

## Project status

Scaffold + core experience: home, colleges listing (filters/sort/search), college detail, and the
apply/login modals are wired to the API. Courses / Exams / News / Compare / About pages are present
and data-driven. See the roadmap in ARCHITECTURE.md for what's next.
