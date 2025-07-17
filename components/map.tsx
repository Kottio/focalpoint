'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Spot } from '@/types/spot';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface mapBounds {
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
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);


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


  // For the filtering function on the map, we recreate the marker but there is a need to remove them before
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  //Create the markers on the map with selected ui 
  const createMarker = (spot: any) => {
    if (!map.current) return;
    const isSelected = spot.id === selectedLocId;

    const el = document.createElement('div');
    el.className = 'custom-marker';
    // background - color: ${ isSelected ? '#FF6B6B' : getCategoryColor(spot.category) };

    el.style.cssText = `
      width: ${isSelected ? '45px' : '28px'};
      height: ${isSelected ? '45px' : '28px'};
      background-color: white;
      border: 3px solid  ;
      border-color: ${isSelected ? '#FF6B6B' : `${getCategoryColor(spot.category)}80`};
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
      onSpotSelect(spot.id);
    });

    markersRef.current.push(marker);
  };


  //RENDERING OF THE MAP! 
  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    //TODO:Need to calculate zoom based on cooridnates
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [(initialBounds.east + initialBounds.west) / 2,
      (initialBounds.north + initialBounds.south) / 2],
      zoom: 10,
    });

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

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);


  //Every time the filter change or a location is selected clear the marker and recreat them.
  useEffect(() => {
    clearMarkers();
    filteredSpots.forEach(createMarker);
  }, [filteredSpots, selectedLocId])



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


  return (<>
    <button className='bg-white text-black p-3 z-30 absolute right-5 top-5 rounded hover:bg-blue-400 hover:text-white cursor-pointer' onClick={handleUpdateMapBound}>Refresh Map Boundaries</button>
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[700px] rounded-lg"
    />
  </>
  );
}