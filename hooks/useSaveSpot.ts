import { useState } from "react";

export function useSaveSpot(spotId: number, initialSaved: boolean = false) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSave = async () => {
    // Optimistic update
    const previousState = isSaved;
    setIsSaved(!isSaved);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/spots/${spotId}/save`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to save spot");
      }

      const { saved } = await response.json();
      setIsSaved(saved);
    } catch (error) {
      // Revert on error
      setIsSaved(previousState);
      console.error("Error saving spot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSaved,
    isLoading,
    toggleSave,
  };
}
