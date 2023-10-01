/*
  Warnings:

  - You are about to drop the column `friendreqId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `bannedUsers` on the `User` table. All the data in the column will be lost.
  - Made the column `roomId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "roomId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "friendreqId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "password" TEXT,
ADD COLUMN     "visibility" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomMember" ADD COLUMN     "inviterId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannedUsers",
ADD COLUMN     "blockedUsers" INTEGER[],
ADD COLUMN     "friends" JSONB[],
ADD COLUMN     "roomInvites" JSONB[];

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
