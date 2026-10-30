import type { CinemaSeason } from "@/lib/truck-cinema";

// Deliberate campaign choice, shared by the welcome's outfit and its scenery.
// A month/date does not silently replace the campaign approved for the page.
export const activeWelcomeSeason: CinemaSeason = "halloween";

export const welcomeSeasonOutfits = {
  halloween: { name: "Halloween", outfit: "hechicero", accent: "#b57aff" },
  muertos: { name: "Día de Muertos", outfit: "catrín", accent: "#ffae44" },
  christmas: { name: "Navidad", outfit: "Santa", accent: "#da5669" },
  newyear: { name: "Año Nuevo", outfit: "gala", accent: "#efd18a" },
  valentines: { name: "Amor y amistad", outfit: "cupido", accent: "#f39ab8" },
} as const satisfies Record<CinemaSeason, { name: string; outfit: string; accent: string }>;
