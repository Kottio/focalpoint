import React from "react";
import {
  Smile,
  Building,
  MountainSnow,
  Landmark,
  Bird,
  Search,
  MoonStar,
  Brush,
  Gem,
} from "lucide-react";

export const CATEGORY_COLORS = {
  Portrait: "#E91E63",
  Street: "#FF9800",
  Landscape: "#4CAF50",
  Architecture: "#607D8B",
  Wildlife: "#8BC34A",
  Macro: "#9C27B0",
  Night: "#1A1A2E",
  Abstract: "#FF5722",
  Gems: "#6B46C1",
} as const;

export const CATEGORY_ICONS = {
  Portrait: <Smile size={16} />,
  Street: <Building size={16} />,
  Landscape: <MountainSnow size={16} />,
  Architecture: <Landmark size={16} />,
  Wildlife: <Bird size={16} />,
  Macro: <Search size={16} />,
  Night: <MoonStar size={16} />,
  Abstract: <Brush size={16} />,
  Gems: <Gem size={16} />,
};

export type CategoryType = keyof typeof CATEGORY_COLORS;

// Helper functions for safe access
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category as CategoryType] || "#666";
}

export function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category as CategoryType] || <Search size={16} />;
}
