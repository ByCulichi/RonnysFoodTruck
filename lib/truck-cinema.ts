// Keep the active campaign explicit; the calendar does not change the home page.
export const truckCinema = {
  halloween: { season: "Halloween", title: "Viernes 13", videoId: "sAzkW7HFh5U", publisher: "Paramount Movies", format: "Avance oficial" },
  muertos: { season: "Día de Muertos", title: "Coco", videoId: "xlnPHQ3TLX8", publisher: "Pixar", format: "Avance oficial" },
  christmas: { season: "Navidad", title: "Una Navidad con Mickey", videoId: "uhfS2k_KCfw", publisher: "Disney Kids", format: "Especial oficial" },
} as const;

export type CinemaSeason = keyof typeof truckCinema;

export function cinemaEmbed(season: CinemaSeason, small = false) {
  const { videoId } = truckCinema[season];
  const params = new URLSearchParams({ autoplay: "1", mute: "1", playsinline: "1", rel: "0", controls: small ? "0" : "1", loop: "1", playlist: videoId });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}
