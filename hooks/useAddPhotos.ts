import { useState } from "react";

interface PhotoBatch {
  title?: string;
  description?: string;
  photos: File[];
}

export function useAddPhotos() {
  const [isLoading, setIsLoading] = useState(false);

  const addPhotos = async (spotId: number, batch: PhotoBatch) => {
    setIsLoading(true);

    try {
      // Upload photos to Cloudinary
      const uploadPromises = batch.photos.map(async (photo) => {
        const formData = new FormData();
        formData.append("photo", photo);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to upload ${photo.name}`);
        return res.json();
      });

      const uploadedPhotos = await Promise.all(uploadPromises);

      // Create photo batch with uploaded photos
      const res = await fetch(`/api/spots/${spotId}/photo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: batch.title,
          description: batch.description,
          photos: uploadedPhotos,
        }),
      });

      if (!res.ok) throw new Error("Failed to add photos");

      return await res.json();
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addPhotos, isLoading };
}
