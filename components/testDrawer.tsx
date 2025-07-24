'use client'
import { Drawer } from 'vaul';
import { useState, useEffect } from 'react';
import { Spot } from '@/types/spot';
import SpotDetails from './spotDetails';
import useSpotDetails from '@/hooks/useSpotDetails';

interface DrawerTestProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void;
  handleCloseSelection: () => void;
}

const snapPoints = ['148px', '300px', 1];
const snapPointsDetails = ['300px', 1]

export function DrawerTest({ filteredSpots, selectedLocId, handleSpotSelect, handleCloseSelection }: DrawerTestProps) {
  const { selectedLocation, isLoading } = useSpotDetails(selectedLocId)
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [snapDetails, setSnapDetails] = useState<number | string | null>(snapPointsDetails[0]);

  const [nestedOpen, setNestedOpen] = useState(false);

  const handleNestedChange = (open: boolean) => {
    setNestedOpen(open);
    if (!open) {
      setSnap(snapPoints[1]);
    }
  };

  // Auto-open nested drawer when a spot is selected
  useEffect(() => {
    if (selectedLocId) {
      setNestedOpen(true);
    }
  }, [selectedLocId]);



  return (
    <Drawer.Root
      open={true}
      modal={false}
      snapPoints={nestedOpen ? [snapPoints[1]] : snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={false}
    >


      <Drawer.Portal>
        <Drawer.Content
          data-testid="content"
          className={`${nestedOpen ? 'h-0' : 'h-full'} z-100 fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 max-h-[95%] mx-[-1px]`}>
          <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />

          <div
            className={'flex flex-col w-full px-4 '}
          >

            {/* Header */}
            <Drawer.Title className="text-2xl font-medium text-gray-900">Photography Spots</Drawer.Title>
            <p className="text-sm mt-1 text-gray-600 mb-2">{filteredSpots.length} spots found</p>

            {/* Peek view - horizontal cards */}
            {snap === snapPoints[0] && (<div>
            </div>
            )}

            <Drawer.NestedRoot open={nestedOpen} onOpenChange={handleNestedChange} modal={false} snapPoints={snapPointsDetails} activeSnapPoint={snapDetails} setActiveSnapPoint={setSnapDetails}>

              {/* Medium Open Spotlit */}
              {snap == snapPoints[1] && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {filteredSpots.slice(0, 6).map((spot) => (
                    <div
                      key={spot.id}
                      className={`flex-shrink-0  h-30 w-40 cursor-pointer transition-all duration-200 `}
                      onClick={() => handleSpotSelect(spot.id)}
                    >
                      <div className="relative w-full h-full rounded">
                        <img
                          src={spot.mediumPhotos[0].url}
                          alt={spot.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded " />

                        <div className="absolute bottom-1 left-2 right-2">
                          <p className="text-white text-xs font-medium truncate">{spot.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSpots.length > 5 && (
                    <div className="flex-shrink-0 w-28 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">+{filteredSpots.length - 5}</p>
                        <p className="text-xs text-gray-500">more</p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* FULL OPEN SPOTLIST */}
              {(snap === snapPoints[2]) && (
                <div className="space-y-3"></div>)}



              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="z-200 bg-white flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 h-[95%]">
                  <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
                  <div className="px-4">
                    <Drawer.Title className="text-xl font-bold"></Drawer.Title>
                    {selectedLocation && (
                      <SpotDetails selectedLocation={selectedLocation} handleCloseSelection={handleCloseSelection}></SpotDetails>
                    )}
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.NestedRoot>
          </div>

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root >
  )
}