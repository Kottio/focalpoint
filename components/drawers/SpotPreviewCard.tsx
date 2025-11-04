'use client'
import { Spot } from '@/types/spot';
import { Camera, BookMarked } from 'lucide-react';
import Image from 'next/image';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface SpotPreviewCardProps {
  spot: Spot;
  onSelect: (spotId: number) => void;
}

export function SpotPreviewCard({ spot, onSelect }: SpotPreviewCardProps) {

  return (
    <div
      className="flex-shrink-0 h-50 w-60 cursor-pointer transition-all duration-200"
      onClick={() => onSelect(spot.id)}
    >

      <div className="relative w-full h-full rounded-lg border-3" style={{
        borderColor: `${getCategoryColor(spot.category)}`

      }}>

        <div className="absolute z-20   text-white " >
          <div className='text-white text-sm rounded-br p-1' style={{ backgroundColor: `${getCategoryColor(spot.category)}` }} >
            {getCategoryIcon(spot.category)} </div>
        </div>

        <Image
          src={spot.photos?.sort((a, b) => b.likes - a.likes)[0]?.originalUrl || '/placeholder.jpg'}
          alt={spot.title}
          fill
          sizes='200px'
          className="w-full h-full object-cover rounded-lg "
        ></Image>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded" />



        <div className="absolute bottom-1 left-2 right-2 flex  items-end justify-between">

          {/* <p className=" text-white text-xs font-medium truncate" >{spot.title}</p> */}

          <div className='flex-col'>
            <div className='text-white flex gap-1 items-center'>
              {spot.photos.length}
              <Camera strokeWidth={1} size={20}></Camera> </div>
            <div className='text-white flex gap-1'>
              {spot.upvotes}
              <BookMarked strokeWidth={1} size={20}></BookMarked> </div>
          </div>



        </div>


      </div>
    </div >
  );
}