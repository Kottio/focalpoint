'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Spot } from '@/types/spot';
import SpotList from './spotList';
import SpotDetails from './spotDetails';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import Filter from './filter';

interface MapProps {
  spots?: Spot[];
  editMode: boolean;
}



export default function Map({ spots = [], editMode }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const selectedLocation = spots.find(spot => spot.id === selectedLocId);

  const [filteredSpots, setFilteteredSpots] = useState(spots)
  useEffect(() => {
    setFilteteredSpots(spots);
  }, [spots]);


  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setIsSelected(true);
    const spot = spots.find(s => s.id === spotId);
    if (spot && map.current) {
      map.current.flyTo({
        center: [spot.longitude - 0.025, spot.latitude],
        zoom: 13,
        duration: 1000
      });
    }
  };

  const handleCloseSelection = () => {
    setSelectedLocId(null);
    setIsSelected(false);
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const createMarker = (spot: any) => {
    if (!map.current) return;
    const isSelected = spot.id === selectedLocId;

    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.cssText = `
      width: ${isSelected ? '32px' : '24px'};
      height: ${isSelected ? '32px' : '24px'};
      background-color: ${isSelected ? '#FF6B6B' : getCategoryColor(spot.category)};
      border: 3px solid white ;
      border-radius: 50%;
      cursor: pointer;  
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      justify-content: center;
      align-items:center;
      font-size: 16px;
    `;
    el.textContent = getCategoryIcon(spot.category)
    const marker = new mapboxgl.Marker(el)
      .setLngLat([spot.longitude, spot.latitude])
      .addTo(map.current);

    marker.getElement().addEventListener('click', () => {
      handleSpotSelect(spot.id);
    });

    markersRef.current.push(marker);
  };


  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [2.2945, 48.8584],
      zoom: 9,
    });

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'bottom-right'
    );

    if (!editMode) {
      spots.forEach(createMarker);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [spots, editMode]);


  useEffect(() => {
    if (!editMode) {
      clearMarkers();
      filteredSpots.forEach(createMarker);
    }
  }, [filteredSpots, selectedLocId])





  if (editMode) {
    return (
      <div
        ref={mapContainer}
        className="w-full h-full min-h-[700px] rounded-lg"
      />
    );
  }

  return (
    <>
      <div className='  absolute z-10 flex h-screen gap-4  text-white bg-white max-w-100'>

        <div className='flex flex-col  overflow-y-auto  '>

          <div className='bg-neutral-100 border-b-2 border-dotted p-3 flex flex-col gap-2 text-neutral-400'>

            <Filter spots={spots} setFilteteredSpots={setFilteteredSpots} ></Filter>



            Spots ({filteredSpots.length})
          </div>


          {/* Spots List */}
          <SpotList spots={filteredSpots} selectedLocId={selectedLocId} handleSpotSelect={handleSpotSelect} ></SpotList>
        </div>

        {/* Detail Panel */}
        {isSelected && selectedLocation && (
          <SpotDetails selectedLocation={selectedLocation} handleCloseSelection={handleCloseSelection}></SpotDetails>
        )}
      </div >



      <div
        ref={mapContainer}
        className="w-full h-full min-h-[700px] rounded-lg"
      />
    </>
  );
}