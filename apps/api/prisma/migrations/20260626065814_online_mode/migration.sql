-- CreateEnum
CREATE TYPE "CollegeMode" AS ENUM ('Campus', 'Online', 'Distance', 'Hybrid');

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "approvals" TEXT[],
ADD COLUMN     "mode" "CollegeMode" NOT NULL DEFAULT 'Campus';

-- CreateIndex
CREATE INDEX "College_mode_idx" ON "College"("mode");
