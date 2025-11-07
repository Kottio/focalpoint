import { useState } from "react";

interface UseSpotCreationProps {
  mapBounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  onCreationStart?: () => void;
  onCreationEnd?: () => void;
}

export function useSpotCreation({
  mapBounds,
  onCreationStart,
  onCreationEnd,
}: UseSpotCreationProps) {
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSpotLocation, setNewSpotLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleStartCreation = () => {
    setIsCreationMode(true);
    const centerLat = (mapBounds.north + mapBounds.south) / 2;
    const centerLng = (mapBounds.east + mapBounds.west) / 2;
    setNewSpotLocation({ lat: centerLat, lng: centerLng });
    onCreationStart?.();
  };

  const handleCancelCreation = () => {
    setIsCreationMode(false);
    setNewSpotLocation(null);
    setShowCreateForm(false);
    onCreationEnd?.();
  };

  const handleConfirmLocation = () => {
    setShowCreateForm(true);
  };

  return {
    // State
    isCreationMode,
    showCreateForm,
    newSpotLocation,
    setNewSpotLocation,

    // Handlers
    handleStartCreation,
    handleCancelCreation,
    handleConfirmLocation,
  };
}
