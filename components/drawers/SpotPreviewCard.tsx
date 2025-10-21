'use client'
import { Spot } from '@/types/spot';
import Image from 'next/image';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface SpotPreviewCardProps {
  spot: Spot;
  onSelect: (spotId: number) => void;
}

export function SpotPreviewCard({ spot, onSelect }: SpotPreviewCardProps) {

  return (
    <div
      className="flex-shrink-0 h-45 w-60 cursor-pointer transition-all duration-200"
      onClick={() => onSelect(spot.id)}
    >
      <div className="relative w-full h-full rounded border-2" style={{
        borderColor: `${getCategoryColor(spot.category)}`
      }}   >
        <Image
          src={spot.mediumPhotos?.[0]?.url || '/placeholder.jpg'}
          alt={spot.title}
          fill
          sizes='200px'
          className="w-full h-full object-cover rounded"
        ></Image>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded" />

        <div className="absolute bottom-1 left-2 right-2 flex  items-center justify-between">
          <p className="text-white text-xs font-medium truncate" >{spot.title}</p>
          <div className='text-white text-sm rounded-3xl p-1' style={{ backgroundColor: `${getCategoryColor(spot.category)}` }} >
            {getCategoryIcon(spot.category)} </div>
        </div>


      </div>
    </div >
  );
}