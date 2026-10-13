-- AlterEnum
ALTER TYPE "AdminRole" ADD VALUE 'COUNSELLOR';

-- AlterEnum: CLOSED becomes LOST (existing leads keep their status) and QUALIFIED is added.
ALTER TYPE "ApplicationStatus" RENAME VALUE 'CLOSED' TO 'LOST';
ALTER TYPE "ApplicationStatus" ADD VALUE 'QUALIFIED' BEFORE 'CONVERTED';

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "assignedToId" INTEGER,
ADD COLUMN     "channel" TEXT NOT NULL DEFAULT 'direct',
ADD COLUMN     "duplicateOfId" INTEGER,
ADD COLUMN     "examInterested" TEXT,
ADD COLUMN     "followUpAt" TIMESTAMP(3),
ADD COLUMN     "landingPage" TEXT,
ADD COLUMN     "mobileKey" TEXT,
ADD COLUMN     "pagePath" TEXT,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "seenAt" TIMESTAMP(3),
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'apply',
ADD COLUMN     "state" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT;

-- Existing leads: already handled by the team (no "new lead" badge) and of unknown origin.
UPDATE "Application" SET "seenAt" = "createdAt", "channel" = 'unknown',
  "mobileKey" = right(regexp_replace("mobile", '\D', '', 'g'), 10);

-- CreateTable
CREATE TABLE "LeadActivity" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "fromStatus" TEXT,
    "toStatus" TEXT,
    "userId" INTEGER,
    "userEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadActivity_applicationId_createdAt_idx" ON "LeadActivity"("applicationId", "createdAt");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "Application"("createdAt");

-- CreateIndex
CREATE INDEX "Application_followUpAt_idx" ON "Application"("followUpAt");

-- CreateIndex
CREATE INDEX "Application_mobileKey_idx" ON "Application"("mobileKey");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_assignedToId_idx" ON "Application"("assignedToId");

-- CreateIndex
CREATE INDEX "Application_channel_idx" ON "Application"("channel");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

