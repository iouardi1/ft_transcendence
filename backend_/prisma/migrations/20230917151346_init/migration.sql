/*
  Warnings:

  - You are about to drop the column `recieverId` on the `DM` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participantId` to the `DM` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_recieverId_fkey";

-- AlterTable
ALTER TABLE "DM" DROP COLUMN "recieverId",
ADD COLUMN     "participantId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
