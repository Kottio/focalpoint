-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "userIdLiked" TEXT[] DEFAULT ARRAY[]::TEXT[];
