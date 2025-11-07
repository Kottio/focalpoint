import { Pencil } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string | null;
  isOwnProfile: boolean;
  onEditClick: () => void;
}

export function ProfileHeader({
  username,
  avatarUrl,
  isOwnProfile,
  onEditClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex  flex-col justify-center items-center gap-2">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${username}'s avatar`}
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {username[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* Username */}
        <div
          className={`flex  items-center justify-center gap-3 ${isOwnProfile ? "ml-14" : ""}`}
        >
          <h1 className="text-xl font-bold text-gray-900">{username}</h1>

          {isOwnProfile && (
            <button
              onClick={onEditClick}
              className="py-2 px-4 bg-neutral-200/50 rounded-full hover:bg-gray-200 transition"
            >
              <Pencil size={13} className="text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Edit Button - Only show for own profile */}
    </div>
  );
}
