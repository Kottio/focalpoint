"use client";
import { Drawer } from "vaul";
import { Spot } from "@/types/spot";
import { Tag } from "@/types/spot";
import useSpotDetails from "@/hooks/useSpotDetails";
import SpotList from "./spotList";
import { useDrawerState } from "@/hooks/useDrawerState";
import { DrawerHeader } from "./drawers/DrawerHeader";
import { SpotPreviewGrid } from "./drawers/SpotPreviewGrid";
import { SpotDetailsDrawer } from "./drawers/SpotDetailsDrawer";

interface MainDrawerProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void;
  handleCloseSelection: () => void;
  isLoading: boolean;
  selectedTags: Tag[];
  setShowFilter: (version: boolean) => void;
  setOtherProfileId: (userId: string) => void;
}

export function MainDrawer({
  filteredSpots,
  selectedLocId,
  handleSpotSelect,
  handleCloseSelection,
  selectedTags,
  setShowFilter,
  isLoading,
  setOtherProfileId,
}: MainDrawerProps) {
  const { selectedLocation } = useSpotDetails(selectedLocId);

  const {
    snap,
    setSnap,
    nestedOpen,
    handleNestedChange,
    currentSnapPoints,
    snapPoints,
  } = useDrawerState(selectedLocId);

  return (
    <Drawer.Root
      open={true}
      modal={false}
      snapPoints={currentSnapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Content
          className={`${nestedOpen ? "h-0" : "h-full"} z-10 fixed flex flex-col bg-white rounded-t-4xl bottom-18 left-0 right-0 max-h-[95%] mx-[-1px] outline-none focus:outline-none`}
        >
          <Drawer.Description className="sr-only">
            Browse and explore available spots with filtering options
          </Drawer.Description>
          <DrawerHeader selectedTags={selectedTags} />

          {/* Medium view - photo grid */}
          {snap === snapPoints[1] && (
            <div className="px-4  py-3 border-none w-full bg-gray-50">
              <SpotPreviewGrid
                spots={filteredSpots}
                onSpotSelect={handleSpotSelect}
                maxItems={15}
              />
            </div>
          )}

          {/* Full view - complete list */}
          {snap === snapPoints[2] && (
            <div className="h-screen w-full" data-vaul-no-drag>
              <SpotList
                filteredSpots={filteredSpots}
                selectedLocId={selectedLocId}
                handleSpotSelect={handleSpotSelect}
                setShowFilter={setShowFilter}
              />
            </div>
          )}

          {/* Nested drawer for spot details */}
          <SpotDetailsDrawer
            isOpen={nestedOpen}
            onOpenChange={handleNestedChange}
            selectedLocation={selectedLocation}
            handleCloseSelection={handleCloseSelection}
            isLoading={isLoading}
            setOtherProfileId={setOtherProfileId}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
