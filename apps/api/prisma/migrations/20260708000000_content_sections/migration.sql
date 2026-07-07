-- Rich editorial content sections for tabbed college detail pages.
CREATE TABLE "ContentSection" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "tab" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ContentSection_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContentSection_collegeId_tab_idx" ON "ContentSection"("collegeId", "tab");

ALTER TABLE "ContentSection" ADD CONSTRAINT "ContentSection_collegeId_fkey"
  FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
