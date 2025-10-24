'use client'

import { FullPhoto } from "@/types/spot-details"
import Image from "next/image"
import { X, Heart, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface FullScreenPhotoProps {
  FullPhoto: FullPhoto[]
  selectedPhoto: number | null
  setFullScreen: (status: boolean) => void
}

export function FullScreenPhoto({ FullPhoto, selectedPhoto, setFullScreen }: FullScreenPhotoProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Find the index of the selected photo
  useEffect(() => {
    const index = FullPhoto.findIndex(p => p.id === selectedPhoto)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [selectedPhoto, FullPhoto])

  const currentPhoto = FullPhoto[currentIndex]

  const goToNext = () => {
    if (currentIndex < FullPhoto.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullScreen(false)
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  if (!currentPhoto) return null

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
      {/* Close Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => { setFullScreen(false) }}
          className="p-2 hover:bg-white/10 rounded-full transition"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      {/* Photo Section - Top 65% of screen, nothing overlapping */}
      <div className="flex-1 relative flex items-start justify-center pt-13 pb-2 px-4">
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.originalUrl}
            fill
            alt={currentPhoto.title || 'Photo'}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Section - Navigation + Info */}
      <div className="flex-shrink-0 bg-gradient-to-t from-black via-black/95 to-black/80 ">
        {/* Navigation Arrows with Counter */}
        {FullPhoto.length > 1 && (
          <div className="flex items-center justify-center gap-6 py-4 px-4">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === FullPhoto.length - 1}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={22} className="text-white" />
            </button>
          </div>
        )}

        {/* Photo Info */}
        <div className="px-4 pb-6 ">
          <div className="text-white">
            {currentPhoto.title && (
              <h3 className="text-white font-semibold text-lg mb-2">
                {currentPhoto.title}
              </h3>
            )}
            <div className="flex items-center gap-2 mb-2">
              <User size={18} />
              <span className="font-medium">{currentPhoto.user.username || 'Anonymous'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Heart size={16} className="text-red-400" fill="currentColor" />
              <span>{currentPhoto.likes} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}