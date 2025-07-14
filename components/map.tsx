'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onMapClick?: (lat: number, lng: number) => void;
  spots?: Array<{
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    category: string;
  }>;
  editMode: boolean

}

export default function Map({ onMapClick, spots = [], editMode }: MapProps) {

  const colorTags = {
    'Urban': 'brown',
    'Coastal': 'Blue'
  }


  const mapContainer = useRef<HTMLDivElement>(null);

  const map = useRef<mapboxgl.Map | null>(null);


  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Great for photography locations
      center: [2.2945, 48.8584],
      zoom: 9,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geolocate control (find user's location)
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );



    if (editMode) {
      if (onMapClick) {
        map.current.on('click', (e) => {
          const { lat, lng } = e.lngLat;
          onMapClick(lat, lng);
        });
      }
    }




    // Add markers for existing spots
    spots.forEach(spot => {
      if (map.current) {

        const marker = new mapboxgl.Marker({
          color: colorTags[spot.category],
          scale: 0.8
        })
          .setLngLat([spot.longitude, spot.latitude])
          .addTo(map.current);

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeOnClick: true
        }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-sm text-neutral-800">${spot.title}</h3>
            <p class="text-xs text-neutral-600">${spot.category.name}</p>
          </div>
        `);

        marker.setPopup(popup);
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [onMapClick, spots]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[700px] rounded-lg"
    />
  );
}