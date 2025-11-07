"use client";
import { Spot } from "@/types/spot";
import { useMapBox } from "../hooks/useMapBox";
import { useMapMarker } from "@/hooks/useMapMarker";
import { useCreationMarker } from "@/hooks/useCreationMarker";
import { useEffect, useRef, useState } from "react";

export interface mapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface MapProps {
  spots: Spot[];
  filteredSpots: Spot[];
  selectedLocId: number | null;
  onSpotSelect: (spotId: number) => void;
  mapBounds: mapBounds;
  setMapBounds: (mapBounds: mapBounds) => void;
  isCreationMode: boolean;
  newSpotLocation: { lat: number; lng: number } | null;
  setNewSpotLocation: (location: { lat: number; lng: number }) => void;
  shouldAnimate: boolean;
  setShouldAnimate: (status: boolean) => void;
}

export default function Map({
  spots,
  filteredSpots,
  selectedLocId,
  onSpotSelect,
  mapBounds,
  setMapBounds,
  isCreationMode,
  newSpotLocation,
  setNewSpotLocation,
  shouldAnimate,
  setShouldAnimate,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [movedMapBounds, setMovedMapBounds] = useState<mapBounds>(mapBounds);
  const [showRefresh, setShowRefresh] = useState<boolean>(false);
  const { map } = useMapBox({ mapBounds, mapContainer, setMovedMapBounds });

  //Getting the middle of the map when creating spot
  useEffect(() => {
    if (!map.current) return;
    const bounds = map.current.getBounds();
    if (bounds) {
      const newBounds = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      };
      const centerLat = (newBounds.north + newBounds.south) / 2;
      const centerLng = (newBounds.east + newBounds.west) / 2;
      setNewSpotLocation({ lat: centerLat, lng: centerLng });
    }
  }, [isCreationMode, map, setNewSpotLocation]);

  // Use appropriate hook based on mode
  useMapMarker({
    map,
    selectedLocId,
    onSpotSelect,
    filteredSpots: isCreationMode ? [] : filteredSpots, // Hide spots in creation mode
  });

  //This only run if creation mode is on
  useCreationMarker({
    map,
    isCreationMode,
    initialPosition: newSpotLocation,
    onPositionChange: setNewSpotLocation,
  });

  const handleUpdateMapBound = () => {
    if (!map.current) return;
    const bounds = map.current.getBounds();
    if (bounds) {
      const newBounds = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      };
      setMapBounds(newBounds);
      setShowRefresh(false);
    }
  };

  useEffect(() => {
    // if (Math.abs(movedMapBounds.north - mapBounds.north) > 0.1
    //   || Math.abs(movedMapBounds.east - mapBounds.east) > 0.1
    //   || Math.abs(movedMapBounds.south - mapBounds.south) > 0.1
    //   || Math.abs(movedMapBounds.west - mapBounds.west) > 0.1
    // ) {
    //   console.log('difference')
    //   setShowRefresh(true)
    // } else {
    //   setShowRefresh(false)
    // }
    const loadedHeight = mapBounds.north - mapBounds.south;
    const loadedWidth = mapBounds.east - mapBounds.west;

    // Center points
    const movedCenterLat = (movedMapBounds.north + movedMapBounds.south) / 2;
    const movedCenterLng = (movedMapBounds.east + movedMapBounds.west) / 2;
    const loadedCenterLat = (mapBounds.north + mapBounds.south) / 2;
    const loadedCenterLng = (mapBounds.east + mapBounds.west) / 2;

    // Check if moved more than 30% of the loaded bounds size
    const latMoved = Math.abs(movedCenterLat - loadedCenterLat) / loadedHeight;
    const lngMoved = Math.abs(movedCenterLng - loadedCenterLng) / loadedWidth;

    // Or if zoomed out significantly (current view is 2x larger than loaded)
    const currentHeight = movedMapBounds.north - movedMapBounds.south;
    const currentWidth = movedMapBounds.east - movedMapBounds.west;
    const zoomedOut =
      currentHeight / loadedHeight > 2 || currentWidth / loadedWidth > 2;

    setShowRefresh(latMoved > 0.3 || lngMoved > 0.3 || zoomedOut);
  }, [movedMapBounds]);

  //Fly to selected spot when selectedLocId changes
  useEffect(() => {
    if (selectedLocId && map.current) {
      const spot = spots.find((s) => s.id === selectedLocId);
      if (spot) {
        map.current.flyTo({
          center: [spot.longitude, spot.latitude - 0.002],
          zoom: 13,
          duration: 1000,
        });
      }
    }
    // - 0.025
  }, [selectedLocId, map, spots]);

  //fly to new selection when map bous get updated?
  //TODO: fly to map bounds, is it a problem when move end change mapbound
  useEffect(() => {
    if (map.current && shouldAnimate) {
      map.current.flyTo({
        center: [
          (mapBounds.east + mapBounds.west) / 2,
          (mapBounds.north + mapBounds.south) / 2,
        ],
        zoom: 10,
        duration: 1200,
      });
      setShouldAnimate(false);
    }
  }, [mapBounds, map]);

  return (
    <>
      {showRefresh && !isCreationMode && (
        <button
          className="absolute right-5 top-20 z-30 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg 
   border-gray-200"
          onClick={handleUpdateMapBound}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 
  2H15"
            />
          </svg>
          Refresh
        </button>
      )}
      <div ref={mapContainer} className="fixed h-full  " />
      {/* {!isCreationMode && <button className='text-black text-sm z-30 absolute top-20 left-2 p-2 m-1 rounded-xl bg-white border-1 shadow-lg border-neutral-300' onClick={() => {
      handleUpdateMapBound()
    }}>Refresh Boundaries</button>} */}
    </>
  );
}
