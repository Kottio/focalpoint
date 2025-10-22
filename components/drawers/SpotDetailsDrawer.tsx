'use client'
import { Drawer } from 'vaul';
import { useEffect, useState } from 'react';
import SpotDetails from '../spotDetails';
import { SpotDetailsType } from '@/types/spot-details';
import { X } from 'lucide-react';
import { getCategoryColor } from '@/utils/map-constants';

interface SpotDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLocation: SpotDetailsType | null;
  handleCloseSelection: () => void;
}

// Snap points as fractions of available height (95vh - 80px bottom menu)
// 0.25 = peek view, 0.5 = medium view, 0.9 = almost full screen
const snapPoints = [0.15, 0.5, 0.9];

export function SpotDetailsDrawer({
  isOpen,
  onOpenChange,
  selectedLocation,
  handleCloseSelection
}: SpotDetailsDrawerProps) {

  const [snapDetails, setSnapDetails] = useState<number | string | null>(snapPoints[1]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      handleCloseSelection();
      setSnapDetails(snapPoints[1])
    }
  };

  useEffect(() => { setSnapDetails(snapPoints[1]) }, [selectedLocation])

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
          className="z-200 bg-gray-800 flex flex-col rounded-t-4xl fixed left-0 right-0 outline-none  border-5"
          style={{ bottom: '80px', height: 'calc(95vh - 80px)', borderColor: getCategoryColor(selectedLocation?.category || 'Street') }}


        >
          {/* Drag handle */}
          {/* <div className='absolute h-10 w-screen z-50'> */}
          <div aria-hidden className=" z-50 left-50 mx-auto mt-3 w-12 h-1 flex-shrink-0 rounded-full bg-gray-300 mb-1" />
          {/* </div> */}
          {/* Close button */}

          <div className='flex justify-between items-center mb-0 px-4'>
            <Drawer.Title className="text-lg text-gray-100" >{selectedLocation?.title}</Drawer.Title>
            <button
              onClick={() => {
                handleCloseSelection()
                onOpenChange(false)
              }}
              className=' p-1 bg-gray-100  hover:bg-gray-100  rounded-full transition-all duration-200 hover:scale-110'
            >
              <X size={20} className="text-gray-800" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">


            {selectedLocation && (
              <SpotDetails
                selectedLocation={selectedLocation}
                handleCloseSelection={handleCloseSelection}
              />
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
}