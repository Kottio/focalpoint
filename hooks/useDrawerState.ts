"use client";
import { useState, useEffect } from "react";

const SNAP_POINTS = ["90px", "320px", 0.95];

export function useDrawerState(selectedLocId: number | null) {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[0]);
  const [nestedOpen, setNestedOpen] = useState(false);

  // Auto-open nested drawer when a spot is selected
  useEffect(() => {
    if (selectedLocId) {
      setNestedOpen(true);
    }
  }, [selectedLocId]);

  const handleNestedChange = (open: boolean) => {
    setNestedOpen(open);
    if (!open) {
      setSnap(SNAP_POINTS[1]);
    }
  };

  // Dynamic snap points - lock to middle when nested is open
  const currentSnapPoints = nestedOpen ? [SNAP_POINTS[1]] : SNAP_POINTS;

  return {
    snap,
    setSnap,
    nestedOpen,
    handleNestedChange,
    currentSnapPoints,
    snapPoints: SNAP_POINTS,
  };
}
