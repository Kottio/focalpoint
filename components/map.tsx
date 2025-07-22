'use client';
import { Spot } from '@/types/spot';
import { useMapBox } from '../hooks/useMapBox';
import { useMapMarker } from '@/hooks/useMapMarker';
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
  initialBounds: mapBounds
  setMapBounds: (mapBounds: mapBounds) => (void)
}

export default function Map({
  spots,
  filteredSpots,
  selectedLocId,
  onSpotSelect,
  initialBounds,
  setMapBounds
}: MapProps) {

  const mapContainer = useRef<HTMLDivElement>(null);
  const { map } = useMapBox({ initialBounds, mapContainer })
  useMapMarker({ map, selectedLocId, onSpotSelect, filteredSpots })






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
          center: [spot.longitude - 0.025, spot.latitude],
          zoom: 13,
          duration: 1000
        });
      }
    }
  }, [selectedLocId]);



  return (<>
    <button className='bg-white text-black p-3 z-30 absolute right-5 top-5 rounded hover:bg-blue-400 hover:text-white cursor-pointer' onClick={handleUpdateMapBound}>Refresh Map Boundaries</button>
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[700px] rounded-lg"
    />
  </>
  );
}