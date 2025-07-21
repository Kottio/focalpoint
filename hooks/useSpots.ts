import { useState, useEffect } from "react";
import { Spot } from "@/types/spot";

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function useSpots(mapBounds: MapBounds) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSpots() {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        north: mapBounds.north.toString(),
        south: mapBounds.south.toString(),
        east: mapBounds.east.toString(),
        west: mapBounds.west.toString(),
      });

      const response = await fetch(`/api/spots?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch spots");
      }

      const data = await response.json();
      setSpots(data);
    } catch (err) {
      console.error("Could not fetch bounded spots:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSpots();
  }, [mapBounds]);

  return {
    spots,
    filteredSpots,
    setFilteredSpots,
    isLoading,
  };
}
