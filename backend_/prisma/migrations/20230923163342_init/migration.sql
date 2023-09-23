/*
  Warnings:

  - You are about to drop the column `adminId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `msgId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `leftTime` on the `RoomMember` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "adminId",
DROP COLUMN "msgId",
DROP COLUMN "participantId",
ADD COLUMN     "friendreqId" INTEGER,
ADD COLUMN     "matchId" INTEGER,
ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "senderId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomMember" DROP COLUMN "leftTime";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
