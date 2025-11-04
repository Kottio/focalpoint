import { useState, useEffect } from "react";
import { SpotDetailsType } from "@/types/spot-details";

export default function useSpotDetails(selectedLocId: number | null) {
  const [selectedLocation, setSelectedLocation] =
    useState<SpotDetailsType | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchSpotDetails(id: number) {
    setIsLoading(true);
    try {
      const response = await fetch(`api/spots/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch spot details:${response.status}`);
      }
      const spotDetails = await response.json();
      setSelectedLocation(spotDetails);
    } catch (error) {
      console.error("Could not get the Details");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedLocId) {
      fetchSpotDetails(selectedLocId);
    }
  }, [selectedLocId]);

  return {
    selectedLocation,
    isLoading,
  };
}
