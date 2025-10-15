'use client'
import { Drawer } from 'vaul';
import { useState } from 'react';
import SpotDetails from '../spotDetails';
import { SpotDetailsType } from '@/types/spot-details';

interface SpotDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLocation: SpotDetailsType | null;
  handleCloseSelection: () => void;
}

const snapPoints = ['300px', 1];

export function SpotDetailsDrawer({
  isOpen,
  onOpenChange,
  selectedLocation,
  handleCloseSelection
}: SpotDetailsDrawerProps) {
  const [snapDetails, setSnapDetails] = useState<number | string | null>(snapPoints[0]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      handleCloseSelection();
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
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-200 bg-gray-800 flex text-white flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 h-[95%]">
          <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
          <div className="px-4">
            <Drawer.Title className="text-xl font-bold"></Drawer.Title>
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