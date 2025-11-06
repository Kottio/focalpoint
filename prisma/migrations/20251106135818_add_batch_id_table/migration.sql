/*
  Warnings:

  - You are about to drop the column `batchId` on the `photos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "batchId",
ADD COLUMN     "batch_id" INTEGER;

-- CreateTable
CREATE TABLE "photo_batches" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "spot_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "photo_batches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "photo_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_batches" ADD CONSTRAINT "photo_batches_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_batches" ADD CONSTRAINT "photo_batches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
