import mapboxgl from "mapbox-gl";
import { useRef, useEffect, Ref } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapBounds } from "../components/map";
import { RefObject } from "react";

interface mapBoxProp {
  mapContainer: RefObject<HTMLDivElement | null>
  initialBounds: mapBounds
}

export function useMapBox({ mapContainer, initialBounds }: mapBoxProp) {
  const map = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
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
      'top-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  },
    [])

  return { map } as const
};







