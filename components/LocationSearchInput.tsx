'use client'
import { useState, useEffect, useRef } from 'react';
import { useGeocoding, GeocodingResult } from '@/hooks/useGeocoding';
import { Search, X, MapPin } from 'lucide-react';

interface LocationSearchInputProps {
  onLocationSelect: (longitude: number, latitude: number) => void;
}

export function LocationSearchInput({ onLocationSelect }: LocationSearchInputProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { results, isLoading, searchLocation, clearResults } = useGeocoding();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim().length > 2) {
      debounceTimerRef.current = setTimeout(() => {
        searchLocation(query);
        setShowResults(true);
      }, 300);
    } else {
      clearResults();
      setShowResults(false);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, clearResults, searchLocation]);

  // No global event listeners - using backdrop instead

  const handleSelectLocation = (result: GeocodingResult) => {
    const [longitude, latitude] = result.center;
    onLocationSelect(longitude, latitude);
    setQuery('');
    setShowResults(false);
    clearResults();
  };



  const handleClear = () => {
    setQuery('');
    setShowResults(false);
    clearResults();
  };

  const getPlaceTypeLabel = (placeType: string[]): string => {
    const typeMap: Record<string, string> = {
      country: 'Pays',
      region: 'Région',
      postcode: 'Code postal',
      district: 'District',
      place: 'Ville',
      locality: 'Localité',
      neighborhood: 'Quartier',
      address: 'Adresse',
      poi: 'Point d\'intérêt',
    };

    return typeMap[placeType[0]] || 'Lieu';
  };

  return (
    <div ref={searchRef} className="relative w-full ">
      {/* Search Input */}
      <div className="relative flex items-center ">
        <Search
          size={18}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une ville, rue, région..."
          className="w-full pl-10 pr-10 py-2 text-sm border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-hidden="false"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
          <p className="text-sm text-gray-500">Recherche en cours...</p>
        </div>
      )}

      {/* Search Results */}
      {showResults && !isLoading && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {/* Close button */}
          <button
            onClick={() => setShowResults(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1"
          >
            <X size={20} />
          </button>
          <ul className="py-1">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => handleSelectLocation(result)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {result.text}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {result.place_name}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      {getPlaceTypeLabel(result.place_type)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results */}
      {showResults && !isLoading && results.length === 0 && query.trim().length > 2 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
          <p className="text-sm text-gray-500">Aucun résultat trouvé</p>
        </div>
      )}
    </div>
  );
}
