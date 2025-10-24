-- CreateTable
CREATE TABLE "spot_comments" (
    "id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "spot_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "spot_comments_spot_id_idx" ON "spot_comments"("spot_id");

-- CreateIndex
CREATE INDEX "spot_comments_user_id_idx" ON "spot_comments"("user_id");

-- AddForeignKey
ALTER TABLE "spot_comments" ADD CONSTRAINT "spot_comments_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_comments" ADD CONSTRAINT "spot_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
