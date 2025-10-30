import { useState, useCallback } from 'react';

export interface GeocodingResult {
  id: string;
  place_name: string;
  place_type: string[];
  center: [number, number]; // [longitude, latitude]
  context?: Array<{
    id: string;
    text: string;
  }>;
  text: string;
}

export interface GeocodingResponse {
  type: string;
  features: GeocodingResult[];
}

export const useGeocoding = () => {
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

      if (!accessToken) {
        throw new Error('Mapbox access token not found');
      }

      // Mapbox Geocoding API endpoint
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;

      const params = new URLSearchParams({
        access_token: accessToken,
        types: 'country,region,postcode,district,place,locality,neighborhood,address,poi',
        limit: '5',
        language: 'fr', // French language for results
      });

      const response = await fetch(`${endpoint}?${params}`);

      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }

      const data: GeocodingResponse = await response.json();
      setResults(data.features);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    searchLocation,
    clearResults,
  };
};
