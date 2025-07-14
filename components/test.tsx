'use client';

import { useEffect, useRef, useState } from 'react';
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
  editMode: boolean;
}

const CATEGORY_COLORS = {
  'Urban': '#8B4513',
  'Coastal': '#4A90E2',
  'Mountain': '#228B22',
  'Forest': '#006400'
} as const;

const CATEGORY_ICONS = {
  'Urban': '⛪︎',
  'Coastal': '⛵︎',
  'Mountain': '⛰',
  'Forest': '𐂷'
} as const;

export default function Map({ onMapClick, spots = [], editMode }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Map<number, mapboxgl.Marker>>(new Map());

  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const selectedLocation = spots.find(spot => spot.id === selectedLocId);

  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setIsSelected(true);

    const spot = spots.find(s => s.id === spotId);

    if (spot && map.current) {
      map.current.flyTo({
        center: [spot.longitude - 0.11, spot.latitude],
        zoom: 11,
        duration: 1000
      });
    }
  };

  const handleCloseSelection = () => {
    setSelectedLocId(null);
    setIsSelected(false);
  };

  const updateMarkerStyles = () => {
    markers.current.forEach((marker, spotId) => {
      const isSelected = spotId === selectedLocId;
      const spot = spots.find(s => s.id === spotId);

      if (spot) {
        const el = marker.getElement();
        el.style.cssText = `
          width: ${isSelected ? '28px' : '24px'};
          height: ${isSelected ? '28px' : '24px'};
          background-color: ${isSelected ? '#FF6B6B' : CATEGORY_COLORS[spot.category] || '#666'};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${isSelected ? '18px' : '16px'};
          transition: all 0.2s ease;
          transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
        `;
        el.textContent = CATEGORY_ICONS[spot.category] || '📍';
      }
    });
  };

  const createMarker = (spot: any) => {
    if (!map.current) return;

    const el = document.createElement('div');
    el.className = 'custom-marker';

    const marker = new mapboxgl.Marker(el)
      .setLngLat([spot.longitude, spot.latitude])
      .addTo(map.current);

    marker.getElement().addEventListener('click', () => {
      handleSpotSelect(spot.id);
    });

    markers.current.set(spot.id, marker);
  };

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current.clear();
  };

  const updateMarkers = () => {
    if (editMode) {
      clearMarkers();
      return;
    }

    // Get current spot IDs
    const currentSpotIds = new Set(spots.map(spot => spot.id));

    // Remove markers for spots that no longer exist
    markers.current.forEach((marker, spotId) => {
      if (!currentSpotIds.has(spotId)) {
        marker.remove();
        markers.current.delete(spotId);
      }
    });

    // Add markers for new spots
    spots.forEach(spot => {
      if (!markers.current.has(spot.id)) {
        createMarker(spot);
      }
    });

    // Update marker styles
    updateMarkerStyles();
  };

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

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
      'top-right'
    );

    // Cleanup
    return () => {
      clearMarkers();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when spots change
  useEffect(() => {
    if (map.current) {
      updateMarkers();
    }
  }, [spots, editMode]);

  // Update marker styles when selection changes
  useEffect(() => {
    if (map.current && !editMode) {
      updateMarkerStyles();
    }
  }, [selectedLocId]);

  // Handle edit mode changes
  useEffect(() => {
    if (!map.current) return;

    map.current.off('click');

    if (editMode && onMapClick) {
      map.current.on('click', (e) => {
        const { lat, lng } = e.lngLat;
        onMapClick(lat, lng);
      });
    }
  }, [editMode, onMapClick]);

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
      <div className='absolute z-10 flex h-screen gap-4 text-white bg-white'>
        {/* Spots List */}
        <div className='flex flex-col overflow-y-auto'>
          <div className='text-sm font-medium text-gray-600 px-2 bg-white rounded py-3'>
            Spots ({spots.length})
          </div>

          {spots.map(spot => (
            <div
              key={spot.id}
              className={`w-100 min-h-[140px] bg-white border-b-1 transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-neutral-100 ${selectedLocId === spot.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => handleSpotSelect(spot.id)}
            >
              <div className='p-4 h-full flex flex-col justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
                    {spot.title}
                  </h3>
                  <div className='flex items-center gap-2'>
                    <div
                      className="w-4 h-4 rounded-full flex justify-center items-center text-xs"
                      style={{ backgroundColor: CATEGORY_COLORS[spot.category] || '#666' }}
                    >
                      {CATEGORY_ICONS[spot.category]}
                    </div>
                    <span className='text-sm text-gray-600'>{spot.category}</span>
                  </div>
                </div>
                {selectedLocId === spot.id && (
                  <div className='text-xs text-blue-600 font-medium mt-2'>
                    Selected →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {isSelected && selectedLocation && (
          <div className='w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h2 className='text-xl font-bold text-gray-900 mb-2'>
                    {selectedLocation.title}
                  </h2>

                  <div className='flex items-center gap-2 mb-4'>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: CATEGORY_COLORS[selectedLocation.category] || '#666' }}
                    >
                      {CATEGORY_ICONS[selectedLocation.category]}
                    </div>
                    <span className='text-sm font-medium text-gray-600'>
                      {selectedLocation.category}
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                  onClick={handleCloseSelection}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className='space-y-4'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='text-sm font-medium text-gray-700 mb-2'>Coordinates</h3>
                  <div className='text-xs text-gray-600 space-y-1'>
                    <div>Latitude: {selectedLocation.latitude.toFixed(6)}</div>
                    <div>Longitude: {selectedLocation.longitude.toFixed(6)}</div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <button className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors'>
                    Get Directions
                  </button>
                  <button className='px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors'>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        ref={mapContainer}
        className="w-full h-full min-h-[700px] rounded-lg"
      />
    </>
  );
}