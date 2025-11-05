import { FullPhoto } from "@/types/spot-details";
import { Heart } from "lucide-react";
import Image from "next/image";

interface ProfilePhotosGridProps {
  photos: FullPhoto[] | undefined;
  onPhotoClick?: (photoId: number) => void;
}

export function ProfilePhotosGrid({
  photos,
  onPhotoClick,
}: ProfilePhotosGridProps) {
  if (photos?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <span className="text-4xl mb-2">📸</span>
        <p className="text-sm">No photos yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {photos?.map((photo) => (
        <div
          key={photo.id}
          onClick={() => onPhotoClick?.(photo.id)}
          className="aspect-square bg-gray-200 relative overflow-hidden cursor-pointer hover:opacity-90 transition"
        >
          <Image
            src={photo.originalUrl}
            alt={photo.title || "Photo"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          />
          {/* Like count overlay */}
          <div className="absolute  flex  items-center gap-1 bottom-1 left-1  text-white text-sm px-2 py-0.5 rounded-full">
            <Heart size={10}></Heart>
            {photo.likes}
          </div>
        </div>
      ))}
    </div>
  );
}
