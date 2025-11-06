import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants";
import { Spot } from "@/types/spot";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import { Funnel, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import SpotListSpotCard from "./spotList/spotListSpotCard";

interface SpotsListProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void;
  setShowFilter: (status: boolean) => void;
}

export default function SpotList({
  filteredSpots,
  selectedLocId,
  handleSpotSelect,
  setShowFilter,
}: SpotsListProps) {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState<"likes" | "recent" | "photos">("likes");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Sort the filtered spots based on selected option
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    switch (sortBy) {
      case "likes":
        return (b.upvotes || 0) - (a.upvotes || 0);
      case "recent":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "photos":
        return (b.mediumPhotos.length || 0) - (a.mediumPhotos.length || 0);
      default:
        return 0;
    }
  });

  if (!isMobile) {
    return sortedSpots.map((spot) => (
      <div
        key={spot.id}
        className={`w-100 min-h-[140px] bg-gray-800 flex  border-b-1  transition-all duration-200 cursor-pointer hover:shadow-md  ${
          selectedLocId === spot.id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => handleSpotSelect(spot.id)}
      >
        <div className="p-4 h-full flex flex-col justify-between ">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex justify-center items-center text-sm"
                style={{ backgroundColor: getCategoryColor(spot.category) }}
              >
                {getCategoryIcon(spot.category)}
              </div>
              <h3 className="text-lg  font-semibold text-gray-900  line-clamp-2">
                {spot.title}
              </h3>
            </div>
            {spot.mediumPhotos && spot.mediumPhotos[0] && (
              <>
                <div className="relative w-30 h-20 rounded overflow-hidden mt-2">
                  <Image
                    src={spot.mediumPhotos[0].url}
                    alt={spot.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              </>
            )}
            <div className="flex items-center mt-2 gap-2 text-black text-xs">
              {spot.tags.map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className={` px-2 py-1 rounded  text-neutral-600`}
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: `${tag.color}`,
                    }}
                  >
                    {" "}
                    {tag.name}{" "}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedLocId === spot.id && (
            <div className="text-xs text-blue-600 font-medium mt-2">
              Selected →
            </div>
          )}
        </div>
      </div>
    ));
  } else {
    return (
      <div
        className="h-dvh overflow-y-auto pb-50 bg-gray-50 px-3 py-2"
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="w-full  flex justify-end gap-2 mb-2">
          {/* Sort dropdown */}

          <div>
            <button
              className="p-2.5 rounded-lg shadow-md  bg-white text-neutral-800 hover:shadow-lg transition-shadow"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <ArrowUpDown size={24} strokeWidth={2} />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="py-2">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      sortBy === "likes"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSortBy("likes");
                      setShowSortMenu(false);
                    }}
                  >
                    Saved
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      sortBy === "photos"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSortBy("photos");
                      setShowSortMenu(false);
                    }}
                  >
                    Photos
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      sortBy === "recent"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSortBy("recent");
                      setShowSortMenu(false);
                    }}
                  >
                    Recent
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter button */}
          <button
            className="p-2.5 rounded-lg shadow-md bg-white text-neutral-800 hover:shadow-lg transition-shadow"
            onClick={() => {
              setShowFilter(true);
            }}
          >
            <Funnel size={24} strokeWidth={2} />
          </button>
        </div>

        {sortedSpots.map((spot) => (
          <SpotListSpotCard
            key={spot.id}
            spot={spot}
            handleSpotSelect={handleSpotSelect}
          ></SpotListSpotCard>
        ))}
      </div>
    );
  }
}
