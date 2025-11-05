import { UserSpots } from "@/types/userData";
import Image from "next/image";

interface ProfileSpotsListProps {
  spots: UserSpots[] | undefined;
  onSpotClick?: (spotId: number) => void;
}

export function ProfileSpotsList({ spots, onSpotClick }: ProfileSpotsListProps) {
  if (spots?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <span className="text-4xl mb-2">📍</span>
        <p className="text-sm">No spots created yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {spots?.map((spot) => (
        <div
          key={spot.id}
          onClick={() => onSpotClick?.(spot.id)}
          className="flex gap-3 bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
        >
          {/* Top 3 Photos Grid */}
          <div className="w-32 h-20 flex-shrink-0 flex gap-0.5 rounded-lg overflow-hidden">
            {spot.photos.slice(0, 3).length > 0 ? (
              <>
                {/* First photo takes 2/3 width */}
                <div className="relative flex-[2] bg-gray-200">
                  <Image
                    src={spot.photos[0].originalUrl}
                    alt={spot.photos[0].title || "Photo 1"}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* Second and third photos stack on right, taking 1/3 width */}
                {spot.photos.length > 1 && (
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="relative flex-1 bg-gray-200">
                      <Image
                        src={spot.photos[1].originalUrl}
                        alt={spot.photos[1].title || "Photo 2"}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    {spot.photos.length > 2 && (
                      <div className="relative flex-1 bg-gray-200">
                        <Image
                          src={spot.photos[2].originalUrl}
                          alt={spot.photos[2].title || "Photo 3"}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                        {/* Show +N overlay if more photos exist */}
                        {spot.photos.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              +{spot.photos.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              // Fallback if no photos
              <div className="w-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">No Photos</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {spot.title}
            </h3>

            <div className="flex gap-3 mt-2 text-xs text-gray-500">
              <span>📸 {spot.photos.length || 0}</span>
              <span className="text-purple-600">{spot.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
