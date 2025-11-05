interface ProfileStatsProps {
  photoCount: number;
  spotCount: number;
  totalLikes: number;
}

export function ProfileStats({
  photoCount,
  spotCount,
  totalLikes,
}: ProfileStatsProps) {
  return (
    <div className="flex justify-between px-15 py-2">
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{photoCount}</div>
        <div className="text-xs text-gray-600">Photos</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{spotCount}</div>
        <div className="text-xs text-gray-600">Spots</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900">{totalLikes}</div>
        <div className="text-xs text-gray-600">Likes</div>
      </div>
    </div>
  );
}
