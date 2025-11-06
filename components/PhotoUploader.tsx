'use client'

import { X, Upload } from 'lucide-react'
import Image from 'next/image'

interface PhotoUploaderProps {
  photos: File[]
  onPhotosChange: (photos: File[]) => void
  maxPhotos?: number
}

export function PhotoUploader({ photos, onPhotosChange, maxPhotos = 3 }: PhotoUploaderProps) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const totalPhotos = photos.length + newFiles.length

      if (totalPhotos > maxPhotos) {
        alert(`You can only upload up to ${maxPhotos} photos`)
        return
      }

      onPhotosChange([...photos, ...newFiles])
    }
  }

  const handleRemovePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Photos (optional, max {maxPhotos})
      </label>

      {/* Upload Button */}
      <label className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition bg-white">
        <Upload size={20} className="text-gray-500" />
        <span className="text-sm text-gray-700">
          {photos.length === 0 ? 'Click to upload photos' : `Add more photos (${photos.length}/${maxPhotos})`}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          disabled={photos.length >= maxPhotos}
          className="hidden"
        />
      </label>

      {/* Photo Preview Grid */}
      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 150px"
                  className="object-cover"
                />
              </div>

              {/* Remove button */}
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-1 right-1  bg-red-700 text-white group-hover:scale-100 rounded-full p-1 opacity-100 transition"
              >
                <X size={16} />
              </button>

              {/* Primary badge for first photo */}
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          First photo will be the primary thumbnail
        </p>
      )}
    </div>
  )
}
