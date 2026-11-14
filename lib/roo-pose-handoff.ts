import type { CinemaSeason } from "@/lib/truck-cinema";
import { performanceFrames } from "@/lib/roo-performance-motion";
import { unifiedPlacementForSeason } from "@/lib/roo-unified-art";

type Pair = readonly [readonly [number, number], readonly [number, number]];
// Centres of the actual eye rings in the original PNGs, not crop-box centres.
// Keep these source landmarks with the artwork registration when art changes.
const eyes: Record<CinemaSeason, { base: Pair; neutral: Pair }> = {
  halloween: { base: [[748, 623], [1007, 589]], neutral: [[135.5, 119], [182, 111.5]] },
  muertos: { base: [[139, 113.5], [188, 105.5]], neutral: [[139, 113.5], [188, 105.5]] },
  christmas: { base: [[748.5, 623], [1007, 589]], neutral: [[121, 97], [169.5, 91]] },
  newyear: { base: [[747.5, 623.5], [1009.5, 589.5]], neutral: [[124, 112.5], [173, 106.5]] },
  valentines: { base: [[748.5, 624], [1007.5, 589.5]], neutral: [[138, 112], [189.5, 106.5]] },
};

/** Register the COMPLETE final painting to the last neutral face. The body
 * stays attached; the existing flight mask alone fades it away. The correction
 * relaxes to identity during the measured flight, ending at the exact nav art. */
export function baseHandoffTransform(season: CinemaSeason) {
  const frame = performanceFrames(season, "action")[31];
  const map = (pair: Pair, camera: { x: number; y: number; scale: number }) => pair.map(([x, y]) => ({ x: x * camera.scale + camera.x, y: y * camera.scale + camera.y }));
  const from = map(eyes[season].base, unifiedPlacementForSeason(season));
  const to = map(eyes[season].neutral, frame);
  const span = (points: typeof from) => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  const scale = span(to) / span(from);
  const x = (to[0].x + to[1].x - (from[0].x + from[1].x) * scale) / 2;
  const y = (to[0].y + to[1].y - (from[0].y + from[1].y) * scale) / 2;
  return `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`;
}
