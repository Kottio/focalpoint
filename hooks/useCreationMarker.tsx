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

    // Create draggable marker element
    const markerEl = document.createElement('div');
    markerEl.className = 'creation-marker';
    markerEl.innerHTML = `
      <div style="
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(circle at center, #0A2342 40%, #4CA9E1 100%);
    border: 3px solid white;
    cursor: grab;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 10px rgba(119, 190, 240, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0A2342; /* deep navy blue */
  
    animation: creationPulse 1.5s infinite;
  ">
    
  </div>
  <style>
    @keyframes creationPulse {
      0% { box-shadow: 0 0 0 0 rgba(119, 190, 240, 0.6); }
      70% { box-shadow: 0 0 0 15px rgba(119, 190, 240, 0); }
      100% { box-shadow: 0 0 0 0 rgba(119, 190, 240, 0); }
    }
  </style>
`;

    // Create marker
    const marker = new Marker({
      element: markerEl,
      draggable: true
    })
      .setLngLat([initialPosition.lng, initialPosition.lat])
      .addTo(map.current);

    // Listen to drag events
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      onPositionChange({ lat: lngLat.lat, lng: lngLat.lng });
    });

    markerRef.current = marker;

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, isCreationMode, initialPosition]);

  return markerRef;
}
