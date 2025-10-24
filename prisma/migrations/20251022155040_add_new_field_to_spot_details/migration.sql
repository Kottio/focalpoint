-- CreateTable
CREATE TABLE "spot_details" (
    "id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "idealTime" INTEGER[],
    "idealWeather" TEXT,
    "friendlyIndice" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "spot_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spot_details" ADD CONSTRAINT "spot_details_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
