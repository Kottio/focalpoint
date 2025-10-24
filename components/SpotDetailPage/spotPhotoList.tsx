'use client'

import { FullPhoto } from "@/types/spot-details"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState } from "react"

interface SpotPhotoListProps {
  photos: FullPhoto[]
}

export function SpotPhotoList({ photos }: SpotPhotoListProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<FullPhoto | null>(null)

  // Sort photos by likes (most liked first)
  const sortedPhotos = [...photos].sort((a, b) => b.likes - a.likes)

  return (
    <div className="w-full bg-white">
      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-1">
        {sortedPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer group overflow-hidden bg-gray-100"
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* Photo */}
            <Image
              src={photo.originalUrl}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
              alt={photo.title || 'Photo'}
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />

            {/* Hover Overlay - Shows likes */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white">
                <Heart size={24} fill="white" />
                <span className="text-lg font-semibold">{photo.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {photos.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-sm">No photos yet</p>
        </div>
      )}

      {/* Lightbox/Modal for selected photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <Image
              src={selectedPhoto.originalUrl}
              fill
              alt={selectedPhoto.title || 'Photo'}
              className="object-contain"
            />

            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              {selectedPhoto.title && (
                <h3 className="text-lg font-semibold mb-2">
                  {selectedPhoto.title}
                </h3>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  by {selectedPhoto.user.username || 'Anonymous'}
                </span>
                <div className="flex items-center gap-1.5">
                  <Heart size={16} fill="white" />
                  <span>{selectedPhoto.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 