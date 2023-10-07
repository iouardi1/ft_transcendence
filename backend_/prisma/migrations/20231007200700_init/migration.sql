/*
  Warnings:

  - Added the required column `lastUpdate` to the `DM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdate` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DM" ADD COLUMN     "lastUpdate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "lastUpdate" TIMESTAMP(3) NOT NULL;
