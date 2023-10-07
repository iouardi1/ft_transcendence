/*
  Warnings:

  - You are about to drop the column `participantId` on the `DM` table. All the data in the column will be lost.
  - Added the required column `participant1Id` to the `DM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant2Id` to the `DM` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_participantId_fkey";

-- AlterTable
ALTER TABLE "DM" DROP COLUMN "participantId",
ADD COLUMN     "participant1Id" INTEGER NOT NULL,
ADD COLUMN     "participant2Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_participant1Id_fkey" FOREIGN KEY ("participant1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
