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
  Portrait: "👤",
  Street: "🚶",
  Landscape: "🏔️", 
  Architecture: "🏗️",
  Wildlife: "🦅",
  Macro: "🔍",
  Night: "🌙",
  Abstract: "🎨",
  Gems: "💎",
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

// Helper functions for safe access
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category as CategoryType] || "#666";
}

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category as CategoryType] || "📍";
}
