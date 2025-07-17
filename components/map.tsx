'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Spot } from '@/types/spot';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface MapProps {
  spots: Spot[];
  filteredSpots: Spot[];
  selectedLocId: number | null;
  onSpotSelect: (spotId: number) => void;
}


export default function Map({
  spots,
  filteredSpots,
  selectedLocId,
  onSpotSelect
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);


  //Every time new spots are created or deleted Set filtered spot
  // useEffect(() => {
  //   setFilteredSpots(spots);
  // }, [spots]);

  //Function when selecting marker on the map
  const handleSpotSelect = (spotId: number) => {
    onSpotSelect(spotId);
    const spot = spots.find(s => s.id === spotId);
    if (spot && map.current) {
      map.current.flyTo({
        center: [spot.longitude - 0.025, spot.latitude],
        zoom: 13,
        duration: 1000
      });
    }
  };


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

  //Create the map
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



    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [spots]);


  //Every time the filter change clear the marker and recreat them.
  useEffect(() => {
    clearMarkers();
    filteredSpots.forEach(createMarker);
  }, [filteredSpots, selectedLocId])




  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[700px] rounded-lg"
    />
  );
}