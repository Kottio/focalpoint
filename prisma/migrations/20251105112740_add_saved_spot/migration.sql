-- CreateTable
CREATE TABLE "SavedSpot" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "spotId" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSpot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedSpot_userId_idx" ON "SavedSpot"("userId");

-- CreateIndex
CREATE INDEX "SavedSpot_spotId_idx" ON "SavedSpot"("spotId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedSpot_userId_spotId_key" ON "SavedSpot"("userId", "spotId");

-- AddForeignKey
ALTER TABLE "SavedSpot" ADD CONSTRAINT "SavedSpot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSpot" ADD CONSTRAINT "SavedSpot_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
