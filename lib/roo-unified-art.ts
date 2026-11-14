import type { CinemaSeason } from "@/lib/truck-cinema";
import { performanceFrames } from "@/lib/roo-performance-motion";
import { performanceArtwork } from "@/lib/roo-performance-art";
import { rooHeadOutline, rooHeadProportion } from "@/lib/roo-welcome-art";

/** Each base is one authored, continuous painting: face, neck, scarf, cape and
 * chest. Its head is already proportioned; never scale it a second time. */
export const unifiedRooArtwork = {
  halloween: "/images/ronny/welcome/unified/roo-halloween-unified.png",
  muertos: "/images/ronny/welcome/performance/roo-muertos-ornate-action.png",
  christmas: "/images/ronny/welcome/unified/roo-christmas-unified.png",
  newyear: "/images/ronny/welcome/unified/roo-newyear-unified.png",
  valentines: "/images/ronny/welcome/unified/roo-valentines-unified.png",
} as const satisfies Record<CinemaSeason, string>;

const { scale, x, y } = rooHeadProportion;
export const unifiedExpressionTransform = `matrix(${scale}, 0, 0, ${scale}, ${(1 - scale) * x}, ${(1 - scale) * y})`;
export const unifiedHeadLocalOutline = rooHeadOutline.map(([px, py]) => [px * scale + (1 - scale) * x, py * scale + (1 - scale) * y]);
// Match the canonical turn's muzzle while keeping the same floor. This moves
// the entire painting, rise and leg rig uniformly, never the face alone.
const registrationScale = (1230 - 679) / (1230 - 654);
export const unifiedRooPlacement = {
  scale: registrationScale,
  x: 950 - 892 * registrationScale,
  y: 1230 * (1 - registrationScale),
} as const;
export const unifiedRooPlacementTransform = `matrix(${registrationScale}, 0, 0, ${registrationScale}, ${unifiedRooPlacement.x}, ${unifiedRooPlacement.y})`;
export const unifiedHeadOutline = unifiedHeadLocalOutline.map(([px, py]) => [px * registrationScale + unifiedRooPlacement.x, py * registrationScale + unifiedRooPlacement.y]);
export const unifiedRooCanvas = {
  width: 1254, height: 1254, floor: 1230,
  muzzle: { x: 950, y: 679 },
  head: { left: 335.84 * registrationScale + unifiedRooPlacement.x, top: 95.2 * registrationScale + unifiedRooPlacement.y, size: 868.6 * registrationScale },
} as const;
export const unifiedHeadMask = `polygon(${unifiedHeadOutline.map(([px, py]) => `${px / unifiedRooCanvas.width * 100}% ${py / unifiedRooCanvas.height * 100}%`).join(",")})`;

/** The same painted clothing follows the head while rising. Once standing,
 * the whole upper body is revealed, so there is no cut across the neck. */
export const unifiedWardrobeOutline = "M327 725Q445 638 600 684Q660 720 730 746L1004 741Q1058 788 1078 865L1038 987L910 1014L782 1000Q607 1055 327 1010Z";

/** Tail extraction includes a small root underlap. The torso subtracts a
 * smaller region, keeping the new cape in front of the tail's moving root. */
export const unifiedTailClip = "M330 630H650V744L583 750Q542 761 502 790Q458 826 418 895L330 923Z";
export const unifiedTailCutout = "M330 630H630V736L564 750Q521 768 480 800Q440 837 398 898L330 923Z";
// Tight exclusion of the actual rear hat/cheek pixels. The roomy navbar outline
// is unsuitable here: it would also remove the tail's fine curled tip.
export const unifiedTailHeadExclusion = "M0 0H1254V1254H650V710L640 700L630 690L620 680L615 675L505 670V600H0Z";
export const unifiedTailGarmentExclusion: Partial<Record<CinemaSeason, string>> = {
  valentines: "M480 765H840V930H480Z",
};

/** The new chest has a low fur ruff. Keep its curved roots together rather
 * than cutting the texture along a horizontal line above the swinging paws. */
export const unifiedChestUnderlap = "M780 1000Q920 1040 1050 998L1050 1035Q1036 1055 1020 1042L1005 1070L983 1055L963 1093Q932 1094 909 1076L890 1089L864 1070L840 1085L806 1063Z";

// The permanent November head is the very same neutral whole-cell painting
// used in the action. Only the final flight removes the attached body; there
// is no source-model, camera, head-size or colour replacement at the handoff.
const ornateMuertosHeadOutline = [
  [48, 2], [224, 2], [224, 105], [214, 122], [205, 143],
  [192, 157], [176, 164], [158, 161], [143, 155], [131, 145],
  [125, 138], [110, 138], [100, 132], [87, 122], [81, 100], [48, 100],
] as const;

export function unifiedPlacementForSeason(season: CinemaSeason) {
  if (season !== "muertos") return unifiedRooPlacement;
  const { scale, x, y } = performanceFrames(season, "action")[31];
  return { scale, x, y };
}
export function unifiedPlacementTransformForSeason(season: CinemaSeason) {
  const p = unifiedPlacementForSeason(season);
  return `matrix(${p.scale}, 0, 0, ${p.scale}, ${p.x}, ${p.y})`;
}
export function unifiedLocalHeadOutlineForSeason(season: CinemaSeason) {
  return season === "muertos" ? ornateMuertosHeadOutline : unifiedHeadLocalOutline;
}
export function unifiedImageSizeForSeason(season: CinemaSeason) {
  if (season !== "muertos") return { width: 1254, height: 1254 };
  const { width, height } = performanceArtwork.muertos.action;
  return { width, height };
}
export function unifiedSourceCropForSeason(season: CinemaSeason) {
  return season === "muertos" ? performanceFrames(season, "action")[31].crop : null;
}
export function unifiedCanvasForSeason(season: CinemaSeason) {
  if (season !== "muertos") return unifiedRooCanvas;
  const p = unifiedPlacementForSeason(season);
  const muzzle = performanceFrames(season, "action")[31].muzzle;
  return {
    width: 1254, height: 1254, floor: 1230, muzzle,
    // Enclose the entire broad sombrero, ears and face with the same source
    // crop at rest and in the measured navigation slot.
    head: { left: 48 * p.scale + p.x, top: p.y, size: 176 * p.scale },
  };
}
export function unifiedMaskForSeason(season: CinemaSeason) {
  if (season !== "muertos") return unifiedHeadMask;
  const p = unifiedPlacementForSeason(season);
  return `polygon(${ornateMuertosHeadOutline.map(([x, y]) => `${(x * p.scale + p.x) / 1254 * 100}% ${(y * p.scale + p.y) / 1254 * 100}%`).join(",")})`;
}
