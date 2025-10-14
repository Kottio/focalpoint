import { useState } from "react";

export interface NewSpotData {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  tags?: number[];
  photos?: File[];
}

export function useCreateSpot() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const createSpot = async (newSpot: NewSpotData) => {
    setIsLoading(true);
    // setError(null);

    try {
      // Step 1: Upload photos to Cloudinary first if any
      let uploadedPhotos: any[] = [];

      if (newSpot.photos && newSpot.photos.length > 0) {
        const uploadPromises = newSpot.photos.map(async (photo) => {
          const formData = new FormData();
          formData.append('photo', photo);
          formData.append('spotId', 'temp'); // Temporary ID, will be replaced

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload photo ${photo.name}`);
          }

          return uploadResponse.json();
        });

        uploadedPhotos = await Promise.all(uploadPromises);
      }

      // Step 2: Create spot with photo URLs
      const { photos, ...spotDataWithoutPhotos } = newSpot;

      const response = await fetch("/api/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...spotDataWithoutPhotos,
          photos: uploadedPhotos, // Send array of {originalUrl, thumbnailUrl, mediumUrl, publicId}
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new Spot");
      }

      const spotCreated = await response.json();
      setIsLoading(false);
      return spotCreated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    createSpot,
    isLoading,
  };
}
