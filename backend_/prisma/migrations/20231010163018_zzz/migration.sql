/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `RoomMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "senderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "bannedUsers" TEXT[];

-- AlterTable
ALTER TABLE "RoomMember" ALTER COLUMN "inviterId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RoomMember_memberId_key" ON "RoomMember"("memberId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
