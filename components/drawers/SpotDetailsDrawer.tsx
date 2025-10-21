'use client'
import { Drawer } from 'vaul';
import { useState } from 'react';
import SpotDetails from '../spotDetails';
import { SpotDetailsType } from '@/types/spot-details';
import { X } from 'lucide-react';

interface SpotDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLocation: SpotDetailsType | null;
  handleCloseSelection: () => void;
}

const snapPoints = ['100px', '300px', 0.9];

export function SpotDetailsDrawer({
  isOpen,
  onOpenChange,
  selectedLocation,
  handleCloseSelection
}: SpotDetailsDrawerProps) {

  const [snapDetails, setSnapDetails] = useState<number | string | null>(snapPoints[2]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      handleCloseSelection();
      setSnapDetails(snapPoints[2])
    }
  };

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
          className="z-200 bg-white flex flex-col rounded-t-2xl fixed left-0 right-0 outline-none"
          style={{ bottom: '100px', height: 'calc(95vh - 120px)' }}
        >
          {/* Drag handle */}
          <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-5" />

          {/* Close button */}
          <button
            onClick={() => {
              handleCloseSelection()
              onOpenChange(false)
            }}
            className='absolute right-2 top-2 z-50 p-1 bg-white border-1 border-gray-300 hover:bg-gray-100 shadow-md rounded-full transition-all duration-200 hover:scale-110'
          >
            <X size={20} className="text-gray-700" />
          </button>

          <div className="flex-1 overflow-hidden">
            <Drawer.Title className="sr-only"></Drawer.Title>
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