'use client';

import { useEffect, useState } from 'react';
import Map from '@/components/map';
import Filter from '@/components/filter';
import SpotList from '@/components/spotList';
import SpotDetails from '@/components/spotDetails';
import { Spot } from '@/types/spot';

export default function MapPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]);
  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  async function fetchInitialSpots() {
    try {
      const response = await fetch('/api/spots');
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      console.error("Could not fetch initial data");
    }
  }

  useEffect(() => {
    fetchInitialSpots();
  }, []);

  const handleCloseSelection = () => {
    setSelectedLocId(null);
    setIsSelected(false);
  };

  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setIsSelected(true);
  };

  const selectedLocation = spots.find(spot => spot.id === selectedLocId);

  return (
    <div className="bg-white h-screen text-white">
      <div className="absolute z-10 flex h-screen gap-4 text-white bg-white">
        <div className="flex flex-col max-w-100">
          <div className={`transition-all duration-700 ease-in-out border-b-2 border-dotted flex flex-col justify-baseline gap-2 text-neutral-400 ${showFilter ? 'max-h-96 p-5' : 'overflow-hidden max-h-0 p-0'
            }`}>
            <Filter spots={spots} setFilteredSpots={setFilteredSpots} />
            <span>Spots({filteredSpots.length})</span>
          </div>

          <button
            className="text-neutral-500 border px-10 py-1 border-neutral-200 hover:bg-neutral-300"
            onClick={() => setShowFilter(!showFilter)}>
            Filters
          </button>

          <div className="overflow-y-auto">

            <SpotList
              spots={filteredSpots}
              selectedLocId={selectedLocId}
              handleSpotSelect={handleSpotSelect}
            />
          </div>
        </div>

        {/* Detail Panel */}
        {isSelected && selectedLocation && (
          <SpotDetails
            selectedLocation={selectedLocation}
            handleCloseSelection={handleCloseSelection}
          />
        )}
      </div>

      <Map
        spots={spots}
        filteredSpots={filteredSpots}
        selectedLocId={selectedLocId}
        onSpotSelect={handleSpotSelect}
      />
    </div>
  );
}