'use client'
import { useState, useEffect, useRef } from 'react';
import { useGeocoding, GeocodingResult } from '@/hooks/useGeocoding';
import { Search, MapPin } from 'lucide-react';

interface LocationSearchInputProps {
  onLocationSelect: (longitude: number, latitude: number) => void;
  setIsResearchMode: (mode: boolean) => void
}

export function LocationSearchInput({ onLocationSelect, setIsResearchMode }: LocationSearchInputProps) {
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
  }, [query, searchLocation, clearResults]);

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
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative flex items-center shadow-md">
        <Search
          size={20}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une ville, rue, région..."
          className="w-full pl-10 pr-20 py-2.5 text-lg border-none bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          aria-hidden="false"
          autoFocus
        />
        <button
          onClick={() => {
            handleClear();
            setIsResearchMode(false);
          }}
          className="absolute right-3 text-gray-500 hover:text-gray-700 px-2 py-1 text-sm font-medium"
        >
          Annuler
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600">Recherche en cours...</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {showResults && !isLoading && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 border border-gray-100">
          <ul className="py-2">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => {
                  handleSelectLocation(result)
                  setIsResearchMode(false)
                }
                }
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-150 border-b border-gray-50 last:border-b-0 active:bg-blue-100"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-blue-50 rounded-full mt-0.5">
                    <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate mb-0.5">
                      {result.text}
                    </p>
                    <p className="text-xs text-gray-500 truncate mb-1.5">
                      {result.place_name}
                    </p>
                    <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                      {getPlaceTypeLabel(result.place_type)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
      }

      {/* No results */}
      {
        showResults && !isLoading && results.length === 0 && query.trim().length > 2 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-100">
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={20} className="text-gray-400" />
              <p className="text-sm">Aucun résultat trouvé pour {query}</p>
            </div>
          </div>
        )
      }
    </div >
  );
}
