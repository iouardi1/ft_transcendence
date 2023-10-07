-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_participant1Id_fkey";

-- AlterTable
ALTER TABLE "DM" ALTER COLUMN "participant1Id" SET DATA TYPE TEXT,
ALTER COLUMN "participant2Id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_participant1Id_fkey" FOREIGN KEY ("participant1Id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
