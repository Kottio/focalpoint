'use client'
import { Spot } from '@/types/spot';
import { SpotPreviewCard } from './SpotPreviewCard';

interface SpotPreviewGridProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  maxItems?: number;
}

export function SpotPreviewGrid({ spots, onSpotSelect, maxItems = 15 }: SpotPreviewGridProps) {
  const displaySpots = spots.slice(0, maxItems);
  const remainingCount = spots.length - maxItems;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 bg-gray-50">
      {displaySpots.map((spot) => (
        <SpotPreviewCard
          key={spot.id}
          spot={spot}
          onSelect={onSpotSelect}
        />
      ))}

      {remainingCount > 0 && (
        <div className="flex-shrink-0 w-28 h-20 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">+{remainingCount}</p>
            <p className="text-xs text-gray-500">more</p>
          </div>
        </div>
      )}
    </div>
  );
}