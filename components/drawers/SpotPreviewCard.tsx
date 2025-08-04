'use client'
import { Spot } from '@/types/spot';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import { Span } from 'next/dist/trace';

interface SpotPreviewCardProps {
  spot: Spot;
  onSelect: (spotId: number) => void;
}

export function SpotPreviewCard({ spot, onSelect }: SpotPreviewCardProps) {

  return (
    <div
      className="flex-shrink-0 h-35 w-50 cursor-pointer transition-all duration-200"
      onClick={() => onSelect(spot.id)}
    >
      <div className="relative w-full h-full rounded"      >
        <img
          src={spot.mediumPhotos?.[0]?.url || '/placeholder.jpg'}
          alt={spot.title}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded" />



        <div className="absolute bottom-1 left-2 right-2 flex  items-center justify-between">
          <p className="text-white text-xs font-medium truncate" >{spot.title}</p>
          <div className='text-white text-sm rounded-3xl p-1' style={{ backgroundColor: `${getCategoryColor(spot.category)}` }} >
            {getCategoryIcon(spot.category)} </div>
        </div>





      </div>
    </div >
  );
}