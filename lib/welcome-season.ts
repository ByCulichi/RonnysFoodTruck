import type { CinemaSeason } from "@/lib/truck-cinema";

// One deliberate campaign choice for the page, outfits, welcome and scenery.
// A month/date does not silently replace the campaign approved for the page.
export const activeSeason: CinemaSeason = "muertos";
export const activeWelcomeSeason = activeSeason;

export const welcomeSeasonOutfits = {
  halloween: { name: "Halloween", outfit: "hechicero", accent: "#b57aff" },
  muertos: { name: "Día de Muertos", outfit: "catrín", accent: "#ffae44" },
  christmas: { name: "Navidad", outfit: "Santa", accent: "#da5669" },
  newyear: { name: "Año Nuevo", outfit: "gala", accent: "#efd18a" },
  valentines: { name: "Amor y amistad", outfit: "cupido", accent: "#f39ab8" },
} as const satisfies Record<CinemaSeason, { name: string; outfit: string; accent: string }>;

function getSeasonDetails(season: CinemaSeason) {
  const outfit = welcomeSeasonOutfits[season];
  return {
    ...outfit,
    kicker: `${outfit.name.toLocaleUpperCase("es-MX")} EN EL TRUCK`,
    heroLine: season === "muertos" ? "Sabor que se recuerda." : `Un toque de ${outfit.name}.`,
    heroDescription: season === "muertos"
      ? "Waffles, malteadas, crepas y snacks. Roo de catrín te espera entre cempasúchil y el cariño de noviembre."
      : `Waffles, malteadas, crepas y snacks. Nuestro carrito rojo te espera con Roo vestido para ${outfit.name}.`,
    heroAlt: season === "muertos"
      ? "Roo de catrín junto al food truck rojo entre cempasúchil, ofrendas y luz naranja de Día de Muertos"
      : `Roo y el food truck rojo vestidos para ${outfit.name}`,
  };
}
export const activeSeasonDetails = getSeasonDetails(activeSeason);
