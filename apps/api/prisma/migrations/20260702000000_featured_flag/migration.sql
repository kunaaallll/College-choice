-- Add a hand-pick "featured" flag for landing-page college sections.
ALTER TABLE "College" ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "College_featured_idx" ON "College"("featured");
