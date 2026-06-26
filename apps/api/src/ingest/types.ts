/**
 * The normalised shape every ingestion source must produce. Source adapters
 * (CSV, NIRF, AICTE, UGC, an API client, …) translate their raw rows into
 * `RawCollege[]`, and `upsertColleges()` loads them into Postgres.
 *
 * Only `name` and `city` are required — real open datasets are sparse, and the
 * upsert layer fills SEO-critical fields (slug, description, meta) when missing.
 */
export interface RawCollege {
  name: string;
  city: string;
  state?: string | null;
  stream?: string | null; // "Engineering", "Medical", … → mapped to a Stream
  type?: string | null; // Public | Private | Government | Deemed | Autonomous
  rank?: number | null; // editorial / stream rank
  nirfRank?: number | null; // official NIRF overall rank
  rating?: number | null;
  feesNum?: number | null; // total fees in ₹
  feesLabel?: string | null;
  packageLabel?: string | null;
  examName?: string | null;
  estd?: number | null;
  about?: string | null;
  descriptionLong?: string | null;
  website?: string | null;
  affiliation?: string | null;
  approvedBy?: string | null; // UGC | AICTE | MCI | …
  imgUrl?: string | null;
  sourceUrl?: string | null;
}

export interface IngestSource {
  /** Identifier stored on each row's `source` column, e.g. "csv:aicte_2025.csv". */
  name: string;
  /** Yields normalised colleges from this source. */
  load(): Promise<RawCollege[]>;
}

export interface IngestResult {
  source: string;
  total: number;
  created: number;
  updated: number;
  skipped: number;
}
