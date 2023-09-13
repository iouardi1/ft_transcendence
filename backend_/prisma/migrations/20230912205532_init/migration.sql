/*
  Warnings:

  - Added the required column `fdId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fdId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FriendList" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FriendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendRequest" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "friendRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fdId_fkey" FOREIGN KEY ("fdId") REFERENCES "FriendList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendRequest" ADD CONSTRAINT "friendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
