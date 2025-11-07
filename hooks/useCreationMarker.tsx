import { useRef, useEffect, RefObject } from "react";
import { Marker, Map } from 'mapbox-gl'


interface CreationMarkerProps {
  map: RefObject<Map | null>,
  isCreationMode: boolean,
  initialPosition: { lat: number; lng: number } | null,
  onPositionChange: (position: { lat: number; lng: number }) => void
}

export function useCreationMarker({
  map,
  isCreationMode,
  initialPosition,
  onPositionChange
}: CreationMarkerProps) {
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (!map.current || !isCreationMode || !initialPosition) {
      // Remove marker if creation mode is off
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      return;
    }

    const mapInstance = map.current;

    // Create draggable marker element
    const markerEl = document.createElement('div');
    markerEl.className = 'creation-marker';
    markerEl.innerHTML = `
      <div style="
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: radial-gradient(circle at center, #06b6d4 40%, #22d3ee 100%);
        border: 4px solid white;
        cursor: grab;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 211, 238, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: creationPulse 2s ease-in-out infinite;
        transition: transform 0.2s ease;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <style>
        @keyframes creationPulse {
          0%, 100% {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 211, 238, 0.8);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(34, 211, 238, 1), 0 0 0 10px rgba(34, 211, 238, 0);
            transform: scale(1.05);
          }
        }
        .creation-marker:active div {
          cursor: grabbing;
          transform: scale(0.95);
        }
      </style>
    `;

    // Create marker
    const marker = new Marker({
      element: markerEl,
      draggable: true
    })
      .setLngLat([initialPosition.lng, initialPosition.lat])
      .addTo(mapInstance);

    // Listen to drag events
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      onPositionChange({ lat: lngLat.lat, lng: lngLat.lng });
    });

    // Listen to map click events to reposition marker
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]);
      onPositionChange({ lat, lng });
    };

    mapInstance.on('click', handleMapClick);

    markerRef.current = marker;

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      mapInstance.off('click', handleMapClick);
    };
  }, [map, isCreationMode, initialPosition]);

  return markerRef;
}
