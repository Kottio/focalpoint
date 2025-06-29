'use client';

import { useState } from 'react';
import Map from '@/components/map';

export default function MapTest() {
  const [clickedLocation, setClickedLocation] = useState<{ lat: number, lng: number } | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setClickedLocation({ lat, lng });
    console.log('Clicked at:', lat, lng);
  };

  // Mock spots data for testing
  const mockSpots = [
    {
      id: 1,
      title: "Eiffel Tower Viewpoint",
      latitude: 48.8584,
      longitude: 2.2945,
      category: "Urban"
    },
    {
      id: 2,
      title: "Seine River Sunset",
      latitude: 48.8566,
      longitude: 2.3522,
      category: "Coastal"
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Map Test</h1>

      {clickedLocation && (
        <div className="mb-4 p-3 bg-blue-100 rounded text-black">
          <p>Clicked at: {clickedLocation.lat.toFixed(6)}, {clickedLocation.lng.toFixed(6)}</p>
        </div>
      )}



      <div className="h-96 border rounded-lg ">
        <Map
          onMapClick={handleMapClick}
          spots={mockSpots}
        />
      </div>



    </div>
  );
}