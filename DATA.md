# Data sourcing & ingestion

College Choice aims to cover **almost every college in India with detailed, SEO-rich pages** — the
moat that lets us compete with sites like CollegeVidya. This doc explains where that data comes from
and how to load it. The guiding principle is **open data**: we use government / openly-licensed
sources, not scraped competitor content.

## Why open data (and not scraping competitors)

- **Legal & ethical** — scraping a competitor's pages typically violates their Terms of Service and
  can infringe copyright on their editorial descriptions. An "open-source approach" means we build
  on openly-licensed/public-record data we can legally redistribute.
- **Defensible SEO** — Google penalises duplicated/scraped content. Unique, structured pages built
  from primary records (and our own editorial layer) rank better and can't be hit with DMCA/thin-
  content issues.
- **Sustainable** — official datasets are updated on a schedule we can re-ingest idempotently.

## Recommended sources (open / public record)

| Source | What it gives | Format |
|--------|---------------|--------|
| **NIRF** (nirfindia.org) | Ranked institutions + scores across Engineering, Management, Medical, Law, etc. | HTML tables / PDF → CSV |
| **AICTE** (facilities.aicte-india.org) | Approved technical institutions, intake, location | CSV/Excel exports |
| **UGC** (ugc.gov.in) | Recognised universities & colleges, autonomy status | CSV/Excel |
| **data.gov.in** | Open Government Data — multiple education datasets | CSV/JSON/API |
| **AISHE** (aishe.gov.in) | All India Survey on Higher Education — comprehensive institution list | CSV |
| **Kaggle / GitHub** | Community CSVs of Indian colleges (verify license) | CSV |

> Each ingested row stores its `source` and `sourceUrl` for provenance and re-sync.

We layer our **own editorial content** (curated descriptions, FAQs, reviews) on top — that original
content is what differentiates the pages and ranks.

## How ingestion works

```
source adapter (CSV / NIRF / AICTE / API)
        │  → produces RawCollege[]  (src/ingest/types.ts)
        ▼
upsertColleges()  (src/ingest/upsert.ts)
        │  • upserts Stream & City
        │  • generates a unique SEO slug
        │  • fills descriptionLong + meta when source is sparse
        │  • matches on (name, city) → update, else create  (idempotent)
        ▼
   PostgreSQL
```

Adapters live in `apps/api/src/ingest/sources/`. To add a source, implement `IngestSource`
(`name` + `load(): Promise<RawCollege[]>`) and wire it into `run.ts`.

## Running it

```bash
# Built-in sample (no files needed) — good for a first run / CI
npm run ingest -w @collegechoice/api -- --source=sample

# A CSV you downloaded from NIRF/AICTE/UGC/AISHE (headers are auto-mapped)
npm run ingest -w @collegechoice/api -- --source=csv --file=./data/aishe_2024.csv
```

The CSV adapter auto-maps common header names (e.g. `college_name`/`institute` → name,
`state_ut` → state). See `src/ingest/sources/csv.ts` for the alias table; extend it as needed.

## Scaling to "almost all colleges"

- **Pagination & indexes** — the listing API paginates; `College` is indexed on slug, stream, city,
  state, rank, fees.
- **Sitemaps** — generated as a **sitemap index** split into 50k-URL chunks (Next `sitemap.ts`).
- **Search** — start with `ILIKE`; upgrade to Postgres trigram (`pg_trgm`) or full-text
  (`tsvector`) via a migration when the dataset grows (see ARCHITECTURE.md roadmap).
- **Quality** — keep `published=false` for incomplete rows so thin pages stay out of the index
  until enriched.

## Re-sync / updates

Re-running a source is safe (idempotent). Schedule periodic re-ingest (cron / GitHub Action) to keep
fees, rankings and seats current; `lastSyncedAt` records the last load per college.
