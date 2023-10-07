/*
  Warnings:

  - Added the required column `creatorId` to the `DM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DM" ADD COLUMN     "creatorId" TEXT NOT NULL;
