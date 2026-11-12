import type { CinemaSeason } from "@/lib/truck-cinema";
import { performanceArtwork, performanceStandingStature } from "@/lib/roo-performance-art";

/** A complete connected drawing: head, neck, body and outfit share pixels. */
export type CoherentTurnRegistration = {
  crop: { x: number; y: number; width: number; height: number };
  footCenterX: number;
  groundY: number;
  muzzle?: readonly [number, number];
};
export type CoherentTurnSheet = {
  src: string;
  width: number;
  height: number;
  optimizedWidth: number;
  scale: number;
  registrations: readonly CoherentTurnRegistration[];
};
export type CoherentTurnArtwork = {
  outward: CoherentTurnSheet;
  returning: CoherentTurnSheet;
};
export type CoherentTurnFrame = {
  index: number;
  source: "outward" | "returning";
  angle: number;
  turnProgress: number;
  crop: CoherentTurnRegistration["crop"];
  scale: number;
  tx: number;
  ty: number;
  muzzle?: { x: number; y: number };
};

/** The supports, rather than the hat's changing silhouette, register the camera.
 * Keep a constant scale within each sheet, with one floor and body centre. */
export const coherentTurnCamera = { floor: 1230, bodyCenterX: 680, startAngle: 37.5 } as const;

/** Five-pixel source margins exclude the thin generation grid. All sheet
 * pixels remain intact; registration never edits or stretches facial features. */
function connectedSheet(src: string, width: number, height: number, scale: number,
  supports: readonly (readonly [number, number])[],
  muzzles: Partial<Record<number, readonly [number, number]>> = {},
): CoherentTurnSheet {
  return {
    src, width, height, optimizedWidth: 1200, scale,
    registrations: supports.map(([footCenterX, groundY], index) => {
      const col = index % 4, row = Math.floor(index / 4);
      const x = Math.round(col * width / 4), y = Math.round(row * height / 5);
      return {
        crop: { x: x + 5, y: y + 5, width: Math.round((col + 1) * width / 4) - x - 10, height: Math.round((row + 1) * height / 5) - y - 10 },
        footCenterX, groundY, ...(muzzles[index] ? { muzzle: muzzles[index] } : {}),
      };
    }),
  };
}

/** Complete connected art for both halves; only the active outfit is loaded. */
export const coherentTurnArtwork: Record<CinemaSeason, CoherentTurnArtwork> = {
  halloween: {
    outward: connectedSheet("/images/ronny/welcome/motion/roo-wizard-turn-connected.png", 1122, 1402, 4.5, [
      [144.5, 266], [421.5, 266], [697, 266], [974.5, 265],
      [132, 546], [414, 546], [697, 545], [980, 544],
      [141, 824], [417.5, 823], [696.5, 822], [972.5, 822],
      [135, 1102], [414.5, 1102], [697, 1102], [976.5, 1102],
      [142, 1385],
    ], {"2": [757, 143.5]}),
    returning: connectedSheet("/images/ronny/welcome/motion/roo-wizard-turn-return-connected.png", 1072, 1467, 4.15, [
      [141.5, 286], [410.0, 287], [682.0, 287], [950.0, 288],
      [160.5, 579], [423.0, 578], [681.5, 578], [938.5, 578],
      [146.5, 870], [410.0, 869], [671.5, 869], [936.0, 868],
      [145.0, 1160], [409.5, 1160], [671.0, 1160], [933.0, 1160],
      [132.5, 1452],
    ]),
  },
  muertos: {
    outward: connectedSheet("/images/ronny/welcome/motion/roo-muertos-turn-connected.png", 1122, 1402, 4.5, [
      [141.5, 266], [418.5, 267], [696.5, 267], [974, 267],
      [130.5, 547], [413, 546], [698, 546], [979.5, 546],
      [140, 826], [417, 825], [696.5, 824], [972.5, 824],
      [134.5, 1105], [413.5, 1105], [696, 1105], [975.5, 1104],
      [141.5, 1387],
    ], {"2": [756, 144]}),
    returning: connectedSheet("/images/ronny/welcome/motion/roo-muertos-turn-return-connected.png", 1072, 1467, 4.15, [
      [138.5, 288], [409, 288], [682.5, 288], [955, 288],
      [158.5, 579], [423, 578], [682, 578], [940.5, 578],
      [150.5, 870], [415, 870], [673.5, 870], [938, 870],
      [146, 1161], [411.5, 1161], [672.5, 1161], [935, 1160],
      [132.5, 1452],
    ]),
  },
  christmas: {
    outward: connectedSheet("/images/ronny/welcome/motion/roo-christmas-turn-connected.png", 1122, 1402, 4.5, [
      [140, 267], [419.5, 267], [695.5, 268], [974, 267],
      [131, 547], [412.5, 547], [695, 547], [980.5, 547],
      [138, 825], [416.5, 825], [696.5, 825], [974, 825],
      [136, 1105], [414.5, 1104], [697.5, 1105], [973.5, 1105],
      [134.5, 1388],
    ], {"2": [756, 144]}),
    returning: connectedSheet("/images/ronny/welcome/motion/roo-christmas-turn-return-connected.png", 1072, 1467, 4.15, [
      [139.5, 286], [407.0, 287], [680.0, 287], [949.5, 287],
      [159.5, 578], [423.5, 578], [680.0, 578], [939.5, 577],
      [145.5, 869], [411.0, 869], [672.0, 869], [936.0, 869],
      [145.5, 1160], [410.0, 1160], [671.5, 1160], [933.0, 1160],
      [132.0, 1451],
    ]),
  },
  newyear: {
    outward: connectedSheet("/images/ronny/welcome/motion/roo-newyear-turn-connected.png", 1122, 1402, 4.5, [
      [142.5, 266], [420, 266], [697, 266], [974.5, 266],
      [131.5, 547], [414.5, 547], [697, 546], [979, 545],
      [141, 824], [417.5, 824], [696.5, 824], [974, 823],
      [137.5, 1105], [417, 1103], [696, 1104], [974.5, 1104],
      [142.5, 1386],
    ], {"2": [758, 143]}),
    returning: connectedSheet("/images/ronny/welcome/motion/roo-newyear-turn-return-connected.png", 1072, 1467, 4.15, [
      [140.5, 287], [412.5, 288], [684.5, 287], [953, 288],
      [159.5, 579], [423.5, 578], [682, 578], [940, 578],
      [144, 870], [411, 870], [673, 870], [936.5, 870],
      [144.5, 1162], [408.5, 1162], [670.5, 1161], [931.5, 1162],
      [132, 1452],
    ]),
  },
  valentines: {
    outward: connectedSheet("/images/ronny/welcome/motion/roo-valentines-turn-connected.png", 1122, 1402, 4.5, [
      [143.5, 266], [420.5, 266], [696.5, 266], [974.5, 265],
      [133.5, 547], [414.5, 547], [697.5, 545], [981, 545],
      [141, 825], [417, 824], [696.5, 824], [974, 824],
      [136.5, 1105], [416, 1104], [697.5, 1104], [977.5, 1103],
      [137, 1386],
    ], {"2": [757, 143.5]}),
    returning: connectedSheet("/images/ronny/welcome/motion/roo-valentines-turn-return-connected.png", 1072, 1467, 4.15, [
      [140.0, 287], [409.5, 288], [679.5, 288], [949.0, 288],
      [161.0, 579], [424.0, 579], [681.5, 579], [940.0, 579],
      [147.5, 871], [410.5, 871], [670.5, 871], [936.5, 869],
      [144.0, 1162], [408.0, 1162], [670.5, 1162], [932.0, 1162],
      [133.0, 1453],
    ]),
  },
};

// Painted top of the reference front-facing cel in each ORIGINAL turn sheet.
// Measurements exclude transparent padding and thin generation grid pixels.
const turnReferenceTop: Record<CinemaSeason, readonly [number, number]> = {
  halloween: [13, 1189], muertos: [11, 1189], christmas: [11, 1197],
  newyear: [12, 1196], valentines: [12, 1192],
};

function registeredFrame(season: CinemaSeason, sheet: CoherentTurnSheet, source: CoherentTurnFrame["source"], index: number, angle: number): CoherentTurnFrame {
  const registration = sheet.registrations[index];
  const action = performanceArtwork[season].action;
  const stature = performanceStandingStature(season);
  const reference = sheet.registrations[source === "outward" ? 2 : 16];
  // One camera per sheet preserves the approved rotation. Its front-facing
  // endpoint now has the same painted stature/support centre as the walk.
  const scale = stature / (reference.groundY - turnReferenceTop[season][source === "outward" ? 0 : 1]);
  const tx = action.bodyCenterX - registration.footCenterX * scale;
  const ty = coherentTurnCamera.floor - registration.groundY * scale;
  return {
    index, source, angle, turnProgress: (angle - coherentTurnCamera.startAngle) / 360,
    crop: registration.crop, scale, tx, ty,
    ...(registration.muzzle ? { muzzle: { x: tx + registration.muzzle[0] * scale, y: ty + registration.muzzle[1] * scale } } : {}),
  };
}

/** Each half has seventeen real views, including its cardinal endpoints.
 * Do not reflect asymmetric clothes/tail across the back of the character. */
const outwardAngles = [12.5, 25, 37.5, 50, 60, 70, 80, 85, 90, 101.25, 112.5, 123.75, 135, 146.25, 157.5, 168.75, 180] as const;

/** The outward's first drawing is slightly right-facing, rather than a true
 * front view. Keep it at 372.5 degrees after the real front view on return;
 * skipping it would jump the muzzle sideways by almost two whole poses. */
export function framesForSeason(season: CinemaSeason): CoherentTurnFrame[] {
  const art = coherentTurnArtwork[season];
  return [
    ...art.outward.registrations.slice(2).map((_, i) => registeredFrame(season, art.outward, "outward", i + 2, outwardAngles[i + 2])),
    ...art.returning.registrations.slice(1).map((_, i) => registeredFrame(season, art.returning, "returning", i + 1, 180 + (i + 1) * 11.25)),
    ...art.outward.registrations.slice(0, 3).map((_, i) => registeredFrame(season, art.outward, "outward", i, 360 + outwardAngles[i])),
  ];
}

/** Inverse of the same smoothstep used by Roo's circular path. */
export function coherentTurnTime(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  return .5 - Math.sin(Math.asin(1 - 2 * clamped) / 3);
}

export function coherentFrameTime(index: number, frames: readonly CoherentTurnFrame[]) {
  if (!index) return 0;
  return coherentTurnTime((frames[index - 1].turnProgress + frames[index].turnProgress) / 2);
}

export function coherentTurnTransform(frame: CoherentTurnFrame) {
  return `matrix(${frame.scale}, 0, 0, ${frame.scale}, ${frame.tx}, ${frame.ty})`;
}
