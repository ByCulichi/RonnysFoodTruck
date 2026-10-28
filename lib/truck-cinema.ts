// The active campaign stays explicit. These are original animated vignettes,
// inspired by the owner's films, without footage or external video playback.
export const truckCinema = {
  halloween: { season: "Halloween", title: "Viernes 13" },
  muertos: { season: "Día de Muertos", title: "Coco" },
  christmas: { season: "Navidad", title: "Una Navidad con Mickey" },
} as const;
export type CinemaSeason = keyof typeof truckCinema;

// Original artwork pixels, independent of Next Image's optimized raster size.
// Each TV sits on the back wall inside its own truck's serving window.
export const truckArtwork = {
  halloween: { src: "/images/seasons/ronny-halloween-foreground.png", width: 1448, height: 1086, screen: { x: 700, y: 389, width: 174, height: 97.875 } },
  muertos: { src: "/images/seasons/ronny-muertos-foreground.png", width: 1448, height: 1086, screen: { x: 550, y: 337, width: 170, height: 95.625 } },
  christmas: { src: "/images/seasons/ronny-christmas-foreground.png", width: 1448, height: 1086, screen: { x: 575, y: 369, width: 170, height: 95.625 } },
} as const;
