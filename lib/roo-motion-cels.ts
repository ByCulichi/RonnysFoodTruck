/** Original generated sheets stay intact. Registration selects each drawing in
 * source pixels, with a constant camera scale and a shared floor. */
export type RooMotionKind = "rise" | "turn";
export type CelCrop = { x: number; y: number; width: number; height: number };
export type CelPlacement = { x: number; y: number; width: number; height: number };
export type RooMotionFrame = {
  index: number;
  crop: CelCrop;
  scale: number;
  tx: number;
  ty: number;
  mirror: boolean;
  neck: { x: number; y: number };
  head?: { x: number; y: number; scale: number; angle?: number };
  cape: CelPlacement;
  rear: boolean;
};

export const rooMotionSheets = {
  rise: { src: "/images/ronny/welcome/motion/roo-rise-inbetweens.png", width: 1774, height: 887, optimizedWidth: 1920 },
  turn: { src: "/images/ronny/welcome/motion/roo-turn-step-sheet.png", width: 1254, height: 1254, optimizedWidth: 1200 },
} as const;

const floor = 1230;
const riseScale = 1.8;
const riseDrawings = [
  { crop: { x: 0, y: 0, width: 459, height: 444 }, ground: 405, neck: [328, 242] },
  { crop: { x: 459, y: 0, width: 447, height: 444 }, ground: 403, neck: [769, 226] },
  { crop: { x: 906, y: 0, width: 429, height: 444 }, ground: 403, neck: [1212, 207] },
  { crop: { x: 1335, y: 0, width: 439, height: 444 }, ground: 404, neck: [1670, 190] },
  { crop: { x: 0, y: 444, width: 449, height: 443 }, ground: 818, neck: [340, 579] },
  { crop: { x: 449, y: 444, width: 444, height: 443 }, ground: 818, neck: [777, 560] },
  { crop: { x: 893, y: 444, width: 443, height: 443 }, ground: 818, neck: [1224, 568] },
  { crop: { x: 1336, y: 444, width: 438, height: 443 }, ground: 817, neck: [1654, 568] },
] as const;

const capeY = [960, 945, 928, 900, 860, 840, 846, 846];
export const rooRiseFrames: RooMotionFrame[] = riseDrawings.map((frame, index) => ({
  index,
  crop: frame.crop,
  scale: riseScale,
  tx: 900 - frame.neck[0] * riseScale,
  ty: floor - frame.ground * riseScale,
  mirror: false,
  neck: { x: 900, y: floor + (frame.neck[1] - frame.ground) * riseScale },
  cape: { x: 465, y: capeY[index], width: 480, height: 150 + index * 3 },
  rear: false,
}));

/** Original head is continuous: sample these anchors with normal easing, rather
 * than the stepped image selector. The last pose is exactly the walking head. */
export const riseHeadFrames = rooRiseFrames.map((frame, index) => ({
  offset: index / (rooRiseFrames.length - 1),
  x: 0,
  y: frame.neck.y - rooRiseFrames.at(-1)!.neck.y,
  angle: 5 * (1 - index / (rooRiseFrames.length - 1)),
}));

const turnDrawings = [
  { crop: { x: 0, y: 0, width: 432, height: 432 }, ground: 425, head: [235, 94], neck: [236, 258], cape: [144, 270, 180, 70] },
  { crop: { x: 432, y: 0, width: 420, height: 432 }, ground: 425, head: [230, 95], neck: [233, 261], cape: [112, 275, 180, 70] },
  { crop: { x: 852, y: 0, width: 402, height: 432 }, ground: 425, head: [239, 98], neck: [251, 263], cape: [96, 287.5, 171.43, 61.07] },
  { crop: { x: 0, y: 432, width: 432, height: 404 }, ground: 396, head: [282, 81], neck: [308, 248], cape: [148, 263, 183, 70] },
  { crop: { x: 432, y: 432, width: 420, height: 404 }, ground: 396, head: [295, 88], neck: [331, 253], cape: [120, 265, 200, 75] },
  { crop: { x: 852, y: 432, width: 402, height: 404 }, ground: 397, head: [259, 90], neck: [278, 255], cape: [140, 263, 185, 75] },
  { crop: { x: 0, y: 836, width: 432, height: 418 }, ground: 389, head: [278, 87], neck: [280, 220], cape: [165, 242, 160, 85] },
  { crop: { x: 432, y: 836, width: 420, height: 418 }, ground: 388, head: [249, 83], neck: [250, 222], cape: [155, 245, 155, 90] },
  { crop: { x: 852, y: 836, width: 402, height: 418 }, ground: 385, head: [209, 87], neck: [210, 223], cape: [133, 245, 155, 90] },
] as const;

const turnOrder = [1, 2, 3, 4, 5, 6, 7, 8, -7, -6, -5, -4, -3, -2, -1, 0, 1];
export const rooTurnFrames: RooMotionFrame[] = turnOrder.map((entry, step) => {
  const index = Math.abs(entry), frame = turnDrawings[index], mirror = entry < 0;
  const scale = 2.8;
  const angle = (45 + step * 22.5) * Math.PI / 180;
  // The neck moves around a fixed body centre during the turn. Mirroring around
  // the neck itself would throw the tail outside the source canvas.
  const neckX = 720 + 140 * Math.SQRT2 * Math.sin(angle);
  const sx = mirror ? -scale : scale;
  const tx = neckX - (frame.crop.x + frame.neck[0]) * sx;
  const ty = floor - (frame.crop.y + frame.ground) * scale;
  const capeX = neckX + (frame.cape[0] - frame.neck[0]) * scale;
  return {
    index, crop: frame.crop, scale, tx, ty, mirror,
    neck: { x: neckX, y: floor + (frame.neck[1] - frame.ground) * scale },
    head: { x: neckX + (frame.head[0] - frame.neck[0]) * sx, y: floor + (frame.head[1] - frame.ground) * scale, scale: 1.15 + .15 * Math.max(0, Math.cos(index * Math.PI / 8)), angle: 12 * Math.max(0, Math.cos(index * Math.PI / 8)) },
    cape: { x: capeX, y: floor + (frame.cape[1] - frame.ground) * scale, width: frame.cape[2] * scale, height: frame.cape[3] * scale },
    rear: index >= 5,
  };
});

export const rooMotionFrames = { rise: rooRiseFrames, turn: rooTurnFrames };

/** Nearest-angle sampling leaves a short hold on the matching facing pose at
 * either end. The live rig supplies that pose, so there is no model handoff. */
export function motionFrameTime(kind: RooMotionKind, index: number, count: number) {
  const progress = kind === "turn" && index > 0 ? (index - .5) / (count - 1) : index / (count - 1);
  return kind === "turn" ? .5 - Math.sin(Math.asin(1 - 2 * progress) / 3) : progress;
}

const rigMap = ([x, y]: readonly number[]) => ({ x: rooRiseFrames[7].tx + x * riseScale, y: rooRiseFrames[7].ty + y * riseScale });
const sourceRig = {
  tail: [[1336, 485], [1510, 485], [1510, 576], [1482, 594], [1468, 618], [1420, 652], [1374, 632], [1336, 592]],
  "rear-near": [[1390, 656], [1482, 656], [1516, 706], [1485, 748], [1460, 787], [1468, 820], [1378, 825], [1378, 786], [1400, 728]],
  "rear-far": [[1495, 684], [1563, 684], [1602, 810], [1538, 825], [1510, 786], [1478, 735]],
  "front-near": [[1590, 640], [1679, 640], [1697, 727], [1687, 785], [1713, 815], [1598, 825], [1589, 787], [1604, 717]],
  "front-far": [[1685, 635], [1746, 635], [1770, 819], [1691, 825], [1690, 765]],
} as const;
export const rooRigRegions = Object.fromEntries(Object.entries(sourceRig).map(([name, points]) => [name, points.map(point => { const p = rigMap(point); return `${p.x},${p.y}`; }).join(" ")])) as Record<keyof typeof sourceRig, string>;

const joint = (x: number, y: number) => { const p = rigMap([x, y]); return { originX: p.x, originY: p.y, legLength: floor - p.y }; };
export const rigJoints = {
  "rear-near": joint(1445, 685),
  "rear-far": joint(1530, 707),
  "front-near": joint(1635, 665),
  "front-far": joint(1721, 680),
  tail: { ...joint(1430, 630), legLength: 0 },
  torso: { ...joint(1560, 660), legLength: 0 },
};

export function celTransform(frame: RooMotionFrame) {
  return `matrix(${frame.mirror ? -frame.scale : frame.scale}, 0, 0, ${frame.scale}, ${frame.tx}, ${frame.ty})`;
}

export function celClip(frame: RooMotionFrame) {
  const { x, y, width, height } = frame.crop;
  return `polygon(${x}px ${y}px, ${x + width}px ${y}px, ${x + width}px ${y + height}px, ${x}px ${y + height}px)`;
}
