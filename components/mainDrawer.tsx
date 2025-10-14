'use client'
import { Drawer } from 'vaul';
import { Spot } from '@/types/spot';
import { Tag } from '@/types/spot';
import useSpotDetails from '@/hooks/useSpotDetails';
import SpotList from './spotList';
import { useDrawerState } from '@/hooks/useDrawerState';
import { DrawerHeader } from './drawers/DrawerHeader';
import { SpotPreviewGrid } from './drawers/SpotPreviewGrid';
import { SpotDetailsDrawer } from './drawers/SpotDetailsDrawer';

interface MainDrawerProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void;
  handleCloseSelection: () => void;
  selectedCategory: string[],
  selectedTags: Tag[],
  setShowFilter: (version: boolean) => void
}

export function MainDrawer({ filteredSpots, selectedLocId, handleSpotSelect, handleCloseSelection, selectedCategory, selectedTags, setShowFilter }: MainDrawerProps) {
  const { selectedLocation } = useSpotDetails(selectedLocId);

  const { snap, setSnap, nestedOpen, handleNestedChange, currentSnapPoints, snapPoints } = useDrawerState(selectedLocId);

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
          className={`${nestedOpen ? 'h-0' : 'h-full'} z-100 fixed flex flex-col bg-neutral-100 text-white   rounded-t-[10px] bottom-0 left-0 right-0 max-h-[95%] mx-[-1px]`}
        >
          <DrawerHeader
            title="Photography Spots"
            spotCount={filteredSpots.length}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setShowFilter={setShowFilter}
          />

          {/* Peek view - empty for now */}
          {snap === snapPoints[0] && (
            <div className="px-4">
            </div>
          )}

          {/* Medium view - photo grid */}
          {snap === snapPoints[1] && (
            <div className="px-4 border-none">
              <SpotPreviewGrid
                spots={filteredSpots}
                onSpotSelect={handleSpotSelect}
                maxItems={15}
              />
            </div>
          )}

          {/* Full view - complete list */}
          {snap === snapPoints[2] && (
            <div className="h-screen w-full px-3">
              <SpotList
                filteredSpots={filteredSpots}
                selectedLocId={selectedLocId}
                handleSpotSelect={handleSpotSelect}
              />
            </div>
          )}

          {/* Nested drawer for spot details */}
          <SpotDetailsDrawer
            isOpen={nestedOpen}
            onOpenChange={handleNestedChange}
            selectedLocation={selectedLocation}
            handleCloseSelection={handleCloseSelection}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}