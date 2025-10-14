import { useRef, useEffect, RefObject } from "react";
import { Spot } from "@/types/spot";
import { createMarkerElement } from "./useMarkerElement";
import { Marker, Map } from 'mapbox-gl'


interface MapMarkerProps {
  map: RefObject<Map | null>,
  selectedLocId: number | null,
  onSpotSelect: (spotId: number) => void,
  filteredSpots: Spot[]
}

export function useMapMarker({ map, selectedLocId, onSpotSelect, filteredSpots }: MapMarkerProps) {
  const markersRef = useRef<Marker[]>([]);

  const createMarker = (spot: Spot) => {
    if (!map.current) return;
    const markerElement = createMarkerElement({ selectedLocId, spot, onSpotSelect })
    const marker = new Marker(markerElement)
      .setLngLat([spot.longitude, spot.latitude])
      .addTo(map.current);
    markersRef.current.push(marker);
  }

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    clearMarkers();
    filteredSpots.forEach(createMarker);
  }, [filteredSpots, selectedLocId])


}





