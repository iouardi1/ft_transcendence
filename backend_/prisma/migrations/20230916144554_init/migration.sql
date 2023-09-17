/*
  Warnings:

  - You are about to drop the column `adminId` on the `DM` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `RoomMember` table. All the data in the column will be lost.
  - You are about to drop the column `dmId` on the `RoomMember` table. All the data in the column will be lost.
  - Added the required column `recieverId` to the `DM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `RoomMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_adminId_fkey";

-- AlterTable
ALTER TABLE "DM" DROP COLUMN "adminId",
ADD COLUMN     "recieverId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomMember" DROP COLUMN "adminId",
DROP COLUMN "dmId",
ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
