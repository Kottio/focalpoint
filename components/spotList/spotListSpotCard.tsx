
import { Spot } from "@/types/spot"
import Image from "next/image"
import { Heart, User, Camera } from "lucide-react"
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"

interface SpotListSpotCard {
  spot: Spot
  handleSpotSelect: (spotId: number) => void
}
export default function SpotListSpotCard({ spot, handleSpotSelect }: SpotListSpotCard) {

  const photoCount = spot.photos?.length || 0;

  // Different layouts based on photo count
  const getPhotoLayout = () => {
    if (photoCount === 0) {
      return (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No photos</span>
        </div>
      );
    }

    if (photoCount === 1) {
      // Single large photo
      return (
        <div className="relative w-full h-64 group">
          <Image
            src={spot.photos[0].originalUrl}
            alt={spot.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          {/* Photo metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-medium">{spot.photos[0].user?.username || "Anonymous"}</span>
              <div className="flex items-center gap-1">
                <Heart size={12} fill="currentColor" />
                <span>{spot.photos[0].likes}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (photoCount === 2) {
      // Two photos side by side
      return (
        <div className="grid grid-cols-2 gap-1 h-52">
          {spot.photos.slice(0, 2).map((photo, index) => (
            <div key={index} className="relative w-full h-full group">
              <Image
                src={photo.originalUrl}
                alt={spot.title}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover"
              />
              {/* Photo metadata overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
                <div className="flex items-center justify-between text-white text-xs">
                  <span className="font-medium truncate">{photo.user?.username || "Anonymous"}</span>
                  <div className="flex items-center gap-1">
                    <Heart size={10} fill="currentColor" />
                    <span>{photo.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (photoCount === 3) {
      // One large left, two stacked right
      return (
        <div className="grid grid-cols-2 gap-1 h-64">
          <div className="relative row-span-2 group">
            <Image
              src={spot.photos[0].originalUrl}
              alt={spot.title}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
            {/* Photo metadata overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-medium truncate">{spot.photos[0].user?.username || "Anonymous"}</span>
                <div className="flex items-center gap-1">
                  <Heart size={10} fill="currentColor" />
                  <span>{spot.photos[0].likes}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <Image
              src={spot.photos[1].originalUrl}
              alt={spot.title}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
            {/* Photo metadata overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-medium truncate">{spot.photos[1].user?.username || "Anonymous"}</span>
                <div className="flex items-center gap-1">
                  <Heart size={10} fill="currentColor" />
                  <span>{spot.photos[1].likes}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <Image
              src={spot.photos[2].originalUrl}
              alt={spot.title}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
            {/* Photo metadata overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-medium truncate">{spot.photos[2].user?.username || "Anonymous"}</span>
                <div className="flex items-center gap-1">
                  <Heart size={10} fill="currentColor" />
                  <span>{spot.photos[2].likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4+ photos: Instagram-style grid with "+X more" overlay
    return (
      <div className="grid grid-cols-2 gap-1 h-64">
        {/* First photo - tall on left */}
        <div className="relative row-span-2 group">
          <Image
            src={spot.photos[0].originalUrl}
            alt={spot.title}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover"
          />
          {/* Photo metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-medium truncate">{spot.photos[0].user?.username || "Anonymous"}</span>
              <div className="flex items-center gap-1">
                <Heart size={10} fill="currentColor" />
                <span>{spot.photos[0].likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next 3 photos on right */}
        {spot.photos.slice(1, 4).map((photo, index) => (
          <div key={index} className="relative group">
            <Image
              src={photo.originalUrl}
              alt={spot.title}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
            {/* Photo metadata overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-medium truncate">{photo.user?.username || "Anonymous"}</span>
                <div className="flex items-center gap-1">
                  <Heart size={10} fill="currentColor" />
                  <span>{photo.likes}</span>
                </div>
              </div>
            </div>
            {/* Show +X more on last visible photo */}
            {index === 2 && photoCount > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">+{photoCount - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative mb-4 rounded-lg overflow-hidden bg-white shadow-lg border-2
                 transition-all duration-200 cursor-pointer hover:shadow-xl"
      style={{ "borderColor": getCategoryColor(spot.category) }}
      onClick={() => handleSpotSelect(spot.id)}
    >
      <div className="absolute z-30 text-white p-1 rounded-br-lg" style={{ "backgroundColor": getCategoryColor(spot.category) }}>
        {getCategoryIcon(spot.category)}
      </div>
      {/* Dynamic Photo Grid */}
      <div className="relative w-full flex-shrink-0">
        {getPhotoLayout()}
      </div>

      {/* Content Below Photo */}
      <div className="p-4">
        {/* Title with photo count */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
            {spot.title}
          </h3>
          {photoCount > 0 && (
            <div className="flex items-center gap-1 text-gray-500 ml-2">
              <Camera size={14} />
              <span className="text-xs font-medium">{photoCount}</span>
            </div>
          )}
        </div>

        {/* Stats Row - Compact and Clean */}
        <div className="flex items-center gap-4 text-sm mb-3">
          {/* Likes */}
          <div className="flex items-center gap-1.5">
            <Heart size={16} className="text-red-500" fill="currentColor" />
            <span className="text-gray-700 font-medium">{spot.upvotes || 0}</span>
          </div>

          {/* User */}
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-gray-600" />
            <span className="text-gray-700 text-xs">{spot.user?.username || 'Anonymous'}</span>
          </div>

          {/* Category */}

        </div>

        {/* Tags */}
        {spot.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spot.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded text-xs font-medium border"
                style={{
                  backgroundColor: `${tag.color}15`,
                  borderColor: `${tag.color}40`,
                  color: tag.color
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}