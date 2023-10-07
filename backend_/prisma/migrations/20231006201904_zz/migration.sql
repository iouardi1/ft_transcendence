/*
  Warnings:

  - You are about to drop the column `participant1Id` on the `DM` table. All the data in the column will be lost.
  - You are about to drop the column `participant2Id` on the `DM` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_participant1Id_fkey";

-- AlterTable
ALTER TABLE "DM" DROP COLUMN "participant1Id",
DROP COLUMN "participant2Id";

-- CreateTable
CREATE TABLE "_participants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_participants_AB_unique" ON "_participants"("A", "B");

-- CreateIndex
CREATE INDEX "_participants_B_index" ON "_participants"("B");

-- AddForeignKey
ALTER TABLE "_participants" ADD CONSTRAINT "_participants_A_fkey" FOREIGN KEY ("A") REFERENCES "DM"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participants" ADD CONSTRAINT "_participants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
