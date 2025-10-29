import { useState, useEffect } from "react";
import { Tag } from "@/types/spot";
import { Spot } from "@/types/spot";

interface MapBounds {
  mapBounds: { north: number; south: number; east: number; west: number };
  selectedTags: Tag[];
  selectedCategory: string[];
}

export function useSpots({
  mapBounds,
  selectedTags,
  selectedCategory,
}: MapBounds) {
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

      const filtered = data.filter((spot: Spot) => {
        // Category filter: if no categories selected, show all categories
        const categoryMatch =
          selectedCategory.length === 0 ||
          selectedCategory.includes(spot.category);
        // Tag filter: if no tags selected, show all tags
        const tagMatch =
          selectedTags.length === 0 ||
          spot.tags.some((tag) =>
            selectedTags.some((selTag) => selTag.id === tag.id)
          );
        return categoryMatch && tagMatch;
      });
      setFilteredSpots(filtered);

      // setFilteredSpots(data);
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
    refetchSpots: fetchSpots,
  };
}
