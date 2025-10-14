import { useRef, useEffect, RefObject } from "react";
import { Marker, Map } from 'mapbox-gl'
import { MapPin } from "lucide-react";

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
        width: 20px;
        height:20px;
        background-color: #10b981;
        border: 2px solid white;
        border-radius: 50%;
        cursor: move;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
     
        color: white;
      ">
    📍
      </div>
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
