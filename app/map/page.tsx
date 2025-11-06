"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Camera, Funnel } from "lucide-react";
import { MainDrawer } from "@/components/mainDrawer";
import Map from "@/components/map";
import Filter from "@/components/filter";
import SpotList from "@/components/spotList";
import { CreationDrawer } from "@/components/drawers/creationDrawer";
import { BottomMenu } from "@/components/bottomMenu";
import { ProfilePage } from "@/components/profile/Profile";
import { LocationSearchInput } from "@/components/LocationSearchInput";
import { useSpots } from "@/hooks/useSpots";
import useSpotDetails from "@/hooks/useSpotDetails";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGetUserData } from "@/hooks/useGetUser";
import { useGetOtherUserData } from "@/hooks/useGetOtherUserData";
import { Tag } from "@/types/spot";
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants";

export default function MapPage() {
  // Auth
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [tab, setTab] = useState<"discover" | "profile">("discover");
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isResearchMode, setIsResearchMode] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [otherProfileId, setOtherProfileId] = useState<string | null>(null);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // Map State
  const [mapBounds, setMapBounds] = useState({
    north: 48.9,
    south: 48.8,
    east: 2.4,
    west: 2.1,
  });
  const [newSpotLocation, setNewSpotLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Data Hooks
  const { spots, filteredSpots, setFilteredSpots, refetchSpots } = useSpots({
    mapBounds,
    selectedCategory,
    selectedTags,
  });
  const { isLoading: isLoadingSelectedLoc } = useSpotDetails(selectedLocId);
  const isMobile = useIsMobile();
  const { userData } = useGetUserData();

  const { otherUserData } = useGetOtherUserData(otherProfileId);

  // Auth Check
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  // Handlers
  const handleLocationSearch = (longitude: number, latitude: number) => {
    const offset = 0.2;
    setMapBounds({
      north: latitude + offset,
      south: latitude - offset,
      east: longitude + offset,
      west: longitude - offset,
    });
    setShouldAnimate(true);
  };

  const handleCloseSelection = () => {
    setSelectedLocId(null);
    // setIsSelected(false);
  };

  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setOtherProfileId(null);
    setTab("discover");
  };

  const handleStartCreation = () => {
    setIsCreationMode(true);
    // setIsSelected(false);
    setSelectedLocId(null);
    const centerLat = (mapBounds.north + mapBounds.south) / 2;
    const centerLng = (mapBounds.east + mapBounds.west) / 2;
    setNewSpotLocation({ lat: centerLat, lng: centerLng });
  };

  const handleCancelCreation = () => {
    setIsCreationMode(false);
    setNewSpotLocation(null);
    setShowCreateForm(false);
  };

  const handleConfirmLocation = () => {
    setShowCreateForm(true);
  };

  // Loading State
  if (isPending) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center bg-gray-950 gap-4">
        <Camera size={100} className="animate-pulse text-white" />
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  // Desktop View
  if (!isMobile) {
    return (
      <div className="bg-white h-screen text-white">
        <div className="absolute z-10 flex h-screen gap-4 text-white bg-white">
          <div className="flex flex-col max-w-100">
            <div
              className={`transition-all duration-700 ease-in-out border-b-2 border-dotted flex flex-col justify-baseline gap-2 text-neutral-400 ${
                showFilter ? "max-h-100 p-5" : "overflow-hidden max-h-0 p-0"
              }`}
            >
              <span>Spots({filteredSpots.length})</span>
            </div>

            <button
              className="text-neutral-500 border px-10 py-1 border-neutral-200 hover:bg-neutral-300"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filters
            </button>

            <div className="overflow-y-auto">
              <SpotList
                filteredSpots={filteredSpots}
                selectedLocId={selectedLocId}
                handleSpotSelect={handleSpotSelect}
                setShowFilter={setShowFilter}
              />
            </div>
          </div>
        </div>

        <Map
          spots={spots}
          filteredSpots={filteredSpots}
          selectedLocId={selectedLocId}
          onSpotSelect={handleSpotSelect}
          mapBounds={mapBounds}
          setMapBounds={setMapBounds}
          isCreationMode={isCreationMode}
          newSpotLocation={newSpotLocation}
          setNewSpotLocation={setNewSpotLocation}
          shouldAnimate={shouldAnimate}
          setShouldAnimate={setShouldAnimate}
        />
      </div>
    );
  }

  // Mobile View
  return (
    <>
      {!isCreationMode && (
        <div className="absolute z-10 top-3 w-full px-3 gap-2 flex items-center">
          {!isResearchMode ? (
            <>
              <button
                className="flex-1 bg-white shadow-md rounded-lg px-4 py-2.5 flex items-center gap-2 text-gray-600 hover:shadow-lg transition-shadow"
                onClick={() => setIsResearchMode(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Rechercher un lieu...
                </span>
              </button>

              <button
                className="p-2.5 rounded-lg shadow-md bg-white text-neutral-800 hover:shadow-lg transition-shadow"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Funnel size={24} strokeWidth={2} />
              </button>
            </>
          ) : (
            <LocationSearchInput
              onLocationSelect={handleLocationSearch}
              setIsResearchMode={setIsResearchMode}
            />
          )}
        </div>
      )}

      {/* Category Tags */}
      <div className="absolute z-10 top-14 w-full px-3 gap-1 flex items-center">
        <ul className="flex gap-1">
          {selectedCategory.map((cat) => (
            <div
              className="text-white p-1 flex items-center text-sm gap-2 px-2 rounded-full"
              style={{ backgroundColor: getCategoryColor(cat) }}
              key={cat}
            >
              {getCategoryIcon(cat)}
              {cat}
            </div>
          ))}
        </ul>
      </div>

      <div className="h-dvh w-dvw inset-0">
        {/* Creation Mode Controls */}
        {isCreationMode && (
          <div className="absolute z-20 top-4 right-4 flex gap-2">
            <button
              onClick={handleCancelCreation}
              className="bg-red-400 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLocation}
              className="bg-emerald-600 text-white px-4 py-2 rounded shadow-lg hover:bg-emerald-700 transition"
            >
              Confirm
            </button>
          </div>
        )}

        {/* Filter */}
        {showFilter && (
          <Filter
            spots={spots}
            setFilteredSpots={setFilteredSpots}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setShowFilter={setShowFilter}
          />
        )}

        {/* Bottom Content */}
        <div className="absolute w-screen bottom-0">
          {!isCreationMode && (
            <div className="flex flex-col">
              {tab === "discover" ? (
                <MainDrawer
                  filteredSpots={filteredSpots}
                  selectedLocId={selectedLocId}
                  handleSpotSelect={handleSpotSelect}
                  handleCloseSelection={handleCloseSelection}
                  selectedTags={selectedTags}
                  setShowFilter={setShowFilter}
                  isLoading={isLoadingSelectedLoc}
                  setOtherProfileId={setOtherProfileId}
                />
              ) : (
                <ProfilePage
                  userData={userData}
                  handleSpotSelect={handleSpotSelect}
                  setOtherProfileId={setOtherProfileId}
                />
              )}

              <BottomMenu
                handleStartCreation={handleStartCreation}
                setTab={setTab}
                tab={tab}
              />
            </div>
          )}

          {showCreateForm && isCreationMode && (
            <CreationDrawer
              location={newSpotLocation}
              closeDrawer={handleCancelCreation}
              onSpotCreated={refetchSpots}
            />
          )}
        </div>

        {/* Map */}
        <div
          className={`fixed inset-0 rounded overflow-hidden ${
            tab === "profile" ? "hidden" : "block"
          }`}
        >
          <Map
            spots={spots}
            filteredSpots={filteredSpots}
            selectedLocId={selectedLocId}
            onSpotSelect={handleSpotSelect}
            mapBounds={mapBounds}
            setMapBounds={setMapBounds}
            isCreationMode={isCreationMode}
            newSpotLocation={newSpotLocation}
            setNewSpotLocation={setNewSpotLocation}
            shouldAnimate={shouldAnimate}
            setShouldAnimate={setShouldAnimate}
          />
        </div>

        {otherProfileId && (
          <div className="h-dvh w-dvw absolute bottom-0 bg-white z-2000">
            <ProfilePage
              userData={otherUserData}
              handleSpotSelect={handleSpotSelect}
              setOtherProfileId={setOtherProfileId}
            ></ProfilePage>
          </div>
        )}
      </div>
    </>
  );
}
