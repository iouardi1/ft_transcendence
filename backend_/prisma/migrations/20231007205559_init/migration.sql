/*
  Warnings:

  - Added the required column `imageExtension` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "imageExtension" TEXT NOT NULL;
