-- DropForeignKey
ALTER TABLE "RoomMember" DROP CONSTRAINT "RoomMember_memberId_fkey";

-- AlterTable
ALTER TABLE "RoomMember" ALTER COLUMN "memberId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
