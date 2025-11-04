'use client'
import { Drawer } from 'vaul';
import { useEffect, useState } from 'react';
// import SpotDetails from '../spotDetails';
import SpotDetails2 from '../spotDetails2';
import { SpotDetailsType } from '@/types/spot-details';
import { X } from 'lucide-react';
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"



interface SpotDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLocation: SpotDetailsType | null;
  handleCloseSelection: () => void;
  isLoading: boolean
}

// Snap points as fractions of available height (95vh - 80px bottom menu)
// 0.25 = peek view, 0.5 = medium view, 0.9 = almost full screen
const snapPoints = [0.15, 0.5, 1];

export function SpotDetailsDrawer({
  isOpen,
  onOpenChange,
  selectedLocation,
  handleCloseSelection,
  isLoading
}: SpotDetailsDrawerProps) {

  console.log("Loading", isLoading)
  const [snapDetails, setSnapDetails] = useState<number | string | null>(snapPoints[2]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      handleCloseSelection();
      setSnapDetails(snapPoints[2])
    }
  };

  useEffect(() => { setSnapDetails(snapPoints[2]) }, [selectedLocation])

  return (
    <Drawer.NestedRoot
      open={isOpen}
      onOpenChange={handleOpenChange}
      modal={false}
      snapPoints={snapPoints}
      activeSnapPoint={snapDetails}
      setActiveSnapPoint={setSnapDetails}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="z-500 bottom-0 h-dvh bg-white flex flex-col rounded-t-4xl fixed left-0 right-0 outline-none border-t-4"


        >
          <Drawer.Description className="sr-only">
            View detailed information about the selected spot
          </Drawer.Description>
          {/* Drag handle */}
          {/* <div className='absolute h-10 w-screen z-50'> */}
          <div aria-hidden className=" z-50 left-50 mx-auto mt-3 w-12 h-1 flex-shrink-0 rounded-full bg-gray-300 mb-1" />
          {/* </div> */}
          {/* Close button */}

          <div className='flex justify-between items-center border-b-5 px-4'
            style={{ borderBottomColor: getCategoryColor(selectedLocation?.category || '') }}
          >

            <div
              className="w-auto h-auto rounded-t  p-1 flex items-center gap-2 px-5 text-white justify-center"
              style={{ backgroundColor: getCategoryColor(selectedLocation?.category || '') }}
            > {getCategoryIcon(selectedLocation?.category || '')}
              {selectedLocation?.category || ''}

            </div>



            <Drawer.Title className="text-lg text-gray-900" ></Drawer.Title>
            <button
              onClick={() => {
                handleCloseSelection()
                onOpenChange(false)
              }}
              className=' p-1 bg-white hover:bg-gray-100 shadow-xl border-1 rounded-full transition-all duration-200 hover:scale-110 -mt-2'
            >
              <X size={20} className="text-gray-800" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-gray-500 text-sm">Loading spot details...</p>
                </div>
              </div>
            ) : selectedLocation ? (
              <SpotDetails2
                selectedLocation={selectedLocation}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No spot selected</p>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
}