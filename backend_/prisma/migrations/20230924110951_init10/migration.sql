-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "interactedWith" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
