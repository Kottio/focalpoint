'use client';
import { Spot } from '@/types/spot';
import { useMapBox } from '../hooks/useMapBox';
import { useMapMarker } from '@/hooks/useMapMarker';
import { useCreationMarker } from '@/hooks/useCreationMarker';
import { useEffect, useRef } from 'react';

export interface mapBounds {
  north: number
  south: number,
  east: number,
  west: number
};

interface MapProps {
  spots: Spot[];
  filteredSpots: Spot[];
  selectedLocId: number | null;
  onSpotSelect: (spotId: number) => void;
  mapBounds: mapBounds
  setMapBounds: (mapBounds: mapBounds) => (void)
  isCreationMode: boolean
  newSpotLocation: { lat: number; lng: number } | null
  setNewSpotLocation: (location: { lat: number; lng: number }) => void
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
  setNewSpotLocation
}: MapProps) {

  const mapContainer = useRef<HTMLDivElement>(null);
  const { map } = useMapBox({ mapBounds, mapContainer })

  //show Refresh Boundaries


  // Use appropriate hook based on mode
  useMapMarker({
    map,
    selectedLocId,
    onSpotSelect,
    filteredSpots: isCreationMode ? [] : filteredSpots // Hide spots in creation mode
  })

  useCreationMarker({
    map,
    isCreationMode,
    initialPosition: newSpotLocation,
    onPositionChange: setNewSpotLocation
  })



  //TODO: if too zoomed out, block or focus? 
  const handleUpdateMapBound = () => {
    if (!map.current) return
    const bounds = map.current.getBounds()
    if (bounds) {
      const newBounds = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      }
      setMapBounds(newBounds)
    }
  }


  //Fly to selected spot when selectedLocId changes
  useEffect(() => {
    if (selectedLocId && map.current) {
      const spot = spots.find(s => s.id === selectedLocId);
      if (spot) {
        map.current.flyTo({
          center: [spot.longitude, spot.latitude - 0.002],
          zoom: 13,
          duration: 1000
        });
      }
    }
    // - 0.025
  }, [selectedLocId, map, spots]);


  return (<>

    {/* <button className='bg-white text-black p-3 z-30 absolute right-5 top-5 rounded hover:bg-blue-400 hover:text-white cursor-pointer' onClick={handleUpdateMapBound}>Refresh Map Boundaries</button> */}

    <div
      ref={mapContainer}
      className="fixed h-full  "
    />
    {!isCreationMode && <button className='text-black text-sm z-30 absolute top-2 left-2 p-2 m-1 rounded-xl bg-white border-1 shadow-lg border-neutral-300' onClick={() => {
      handleUpdateMapBound()
    }}>Refresh Boundaries</button>}

  </>
  );
}