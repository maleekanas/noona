export type BrandSummary = { id: string; name: string };

const RAIL_COLORS = [
  "#6366f1", // indigo (primary)
  "#f45d48", // terra cotta (secondary)
  "#10b981", // sentiment positive
  "#f59e0b",
  "#0ea5e9",
  "#a855f7",
];

/** Deterministic per-brand accent color so a brand keeps the same ring color
 * across sessions without storing one — avoids "context-switching fatigue"
 * per the design system's Brand Switcher spec. */
export function brandColor(brandId: string): string {
  let hash = 0;
  for (let i = 0; i < brandId.length; i++) {
    hash = (hash * 31 + brandId.charCodeAt(i)) >>> 0;
  }
  return RAIL_COLORS[hash % RAIL_COLORS.length];
}

export function brandInitials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}
