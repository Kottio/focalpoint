/*
  Warnings:

  - You are about to drop the column `url` on the `photos` table. All the data in the column will be lost.
  - Added the required column `originalUrl` to the `photos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "url",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mediumUrl" TEXT,
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "title" TEXT;
