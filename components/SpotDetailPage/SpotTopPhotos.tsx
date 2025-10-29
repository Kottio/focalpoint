'use client'

import { FullPhoto } from "@/types/spot-details";
import { Heart, User, Trophy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SpotTopPhotoProps {
  FullPhoto: FullPhoto[]
  setFullScreen: (value: boolean) => void
  setSelectedPhoto: (value: number) => void
}

export function SpotTopPhoto({ FullPhoto, setFullScreen, setSelectedPhoto }: SpotTopPhotoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentIndex(newIndex);
  };

  const handlePhotoClick = (photoId: number) => {
    setSelectedPhoto(photoId);
    setFullScreen(true);
  };

  {/* //TODO: Link to User Profile */ }
  {/* //TODO: Like Photo */ }
  if (!FullPhoto || FullPhoto.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No photos available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 flex-shrink-0">
      {/* Photo Carousel */}
      <div
        className="flex overflow-x-auto h-full gap-2 scrollbar-hide snap-x snap-mandatory px-3"
        onScroll={handleScroll}
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        {FullPhoto.sort((a, b) => b.likes - a.likes).slice(0, 4).map((photo, index) => (
          <div
            key={photo.id}
            className="relative w-[100vw] h-full flex-shrink-0 snap-center overflow-hidden bg-gray-100"
          >
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <Image
                src={photo.originalUrl}
                fill
                alt={photo.title || 'Spot photo'}
                className="object-cover"
                priority={index === 0}
              />
            </div>
            {/* Winner Badge */}
            {index === 0 && (
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1.5 rounded-full shadow-lg">
                  <Trophy size={16} className="text-white" />
                  <span className="text-white text-xs font-bold">TOP PHOTO</span>
                </div>
              </div>
            )}
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
            {/* Photo Info at Bottom */}

            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
              <div className={`flex items-center gap-2 text-white `}>
                <User size={16} className={index === 0 ? 'text-yellow-100' : ''} />
                <span className={`text-sm font-medium ${index === 0 ? 'font-bold' : ''}`}>
                  {photo.user.username || "Anonymous"}
                </span>

              </div>



              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <Heart size={16} className="text-red-400" fill="currentColor" />
                <span className="text-white text-sm font-medium">{photo.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Counter Indicator */}


      {/* Dots Indicator */}
      {FullPhoto.length > 1 && (
        <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-1.5">
          {FullPhoto.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'w-6 bg-white'
                : 'w-1.5 bg-white/50'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}