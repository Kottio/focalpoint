export const CATEGORY_COLORS = {
  Forest: "#006400",
  "River/Lake": "#4A90E2",
  "Beach/Coast": "#20B2AA",
  "Mountain/Hill": "#8B4513",
  "Garden/Park": "#32CD32",
  Structure: "#696969",
  Underground: "#2F4F4F",
  Urban: "#FF6347",
  Cave: "#8B4513",
  Desert: "#DEB887",
  "Religious Site": "#9370DB",
  Bridges: "#708090",
} as const;

export const CATEGORY_ICONS = {
  Forest: "🌲",
  "River/Lake": "💦",
  "Beach/Coast": "🌊",
  "Mountain/Hill": "⛰️",
  "Garden/Park": "🌳",
  Structure: "🏛️",
  Underground: "☠️",
  Urban: "🏙️",
  Cave: "🔦",
  Desert: "🏜️",
  "Religious Site": "⛪",
  Bridges: "🌉",
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

// Helper functions for safe access
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category as CategoryType] || "#666";
}

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category as CategoryType] || "📍";
}
