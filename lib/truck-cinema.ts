// The active campaign stays explicit. These are original animated vignettes,
// inspired by the owner's films, without footage or external video playback.
export const truckCinema = {
  halloween: { season: "Halloween", title: "Viernes 13" },
  muertos: { season: "Día de Muertos", title: "Coco" },
  christmas: { season: "Navidad", title: "Una Navidad con Mickey" },
} as const;
export type CinemaSeason = keyof typeof truckCinema;
