export const CATEGORY_COLORS = {
  Urban: "#8B4513",
  Coastal: "#4A90E2",
  Mountain: "#228B22",
  Forest: "#006400",
} as const;

export const CATEGORY_ICONS = {
  Urban: "⛪︎",
  Coastal: "⛵︎",
  Mountain: "⛰",
  Forest: "𐂷",
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

// Helper functions for safe access
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category as CategoryType] || "#666";
}

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category as CategoryType] || "📍";
}
