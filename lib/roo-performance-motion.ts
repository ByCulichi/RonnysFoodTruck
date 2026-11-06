import type { CinemaSeason } from "@/lib/truck-cinema";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { performanceArtwork, performanceCamera, type PerformanceKind, type PerformanceSheet } from "@/lib/roo-performance-art";
import { coherentFrameTime, framesForSeason } from "@/lib/roo-coherent-turn";

export type PerformancePose = { kind: PerformanceKind | "base" | "turn"; frame: number };
export type PerformanceBeat = PerformancePose & { offset: number };
export type RegisteredPerformanceFrame = {
  index: number;
  crop: PerformanceSheet["registrations"][number]["crop"];
  scale: number;
  x: number;
  y: number;
  muzzle: { x: number; y: number };
};

export function performanceFrames(season: CinemaSeason, kind: PerformanceKind): RegisteredPerformanceFrame[] {
  const sheet = performanceArtwork[season][kind];
  return sheet.registrations.map((frame, index) => {
    // Authored camera variation is calibrated on the complete character. The
    // same uniform matrix moves every pixel, including clothes and all paws.
    const scale = frame.scale ?? sheet.scale;
    const x = sheet.bodyCenterX - frame.footCenterX * scale;
    const y = performanceCamera.floor - frame.groundY * scale;
    return { index, crop: frame.crop, scale, x, y, muzzle: { x: x + frame.muzzle[0] * scale, y: y + frame.muzzle[1] * scale } };
  });
}

export function performanceFrameTransform(frame: RegisteredPerformanceFrame) {
  return `matrix(${frame.scale}, 0, 0, ${frame.scale}, ${frame.x}, ${frame.y})`;
}

/** The atlas has transparent camera padding. Reserve space for the complete
 * painted silhouettes, rather than treating that empty padding as the dog.
 * A conservative margin includes the small whole-pose rise correction. */
export function performanceBounds(season: CinemaSeason) {
  const action = performanceFrames(season, "action");
  const frames = [...performanceFrames(season, "rise"), ...action.slice(0, 16), action[31] ?? action[action.length - 1]];
  const margin = 32;
  return {
    minX: Math.min(...frames.map(frame => frame.x + frame.crop.x * frame.scale)) - margin,
    maxX: Math.max(...frames.map(frame => frame.x + (frame.crop.x + frame.crop.width) * frame.scale)) + margin,
    minY: Math.min(...frames.map(frame => frame.y + frame.crop.y * frame.scale)) - margin,
    maxY: Math.max(...frames.map(frame => frame.y + (frame.crop.y + frame.crop.height) * frame.scale)) + margin,
  };
}

/** Inverse smoothstep places gait changes at travelled distance. A full
 * 320-pixel approach needs one calm four-beat cycle, never repeated sprints. */
export function performanceTimeAtDistance(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  return .5 - Math.sin(Math.asin(1 - 2 * p) / 3);
}

export function performancePlan(season: CinemaSeason, measuredDistance: number): PerformanceBeat[] {
  const s = rooWelcomeStory;
  const riseCount = performanceArtwork[season].rise.count;
  const beats: PerformanceBeat[] = [{ offset: 0, kind: "rise", frame: 0 }];
  for (let frame = 1; frame < riseCount; frame++) {
    beats.push({ offset: s.riseStart + (s.riseEnd - s.riseStart) * (frame - .5) / (riseCount - 1), kind: "rise", frame });
  }
  beats.push({ offset: s.riseEnd, kind: "action", frame: 31 });

  const distance = Math.min(s.walkDistance, Math.max(0, measuredDistance));
  const walkFrames = distance > 0 ? Math.max(1, Math.ceil(distance / s.walkDistance * 16)) : 0;
  for (let step = 0; step < walkFrames; step++) {
    beats.push({ offset: s.walkStart + (s.walkEnd - s.walkStart) * performanceTimeAtDistance(step ? (step - .5) / walkFrames : 0), kind: "action", frame: step });
  }
  // One gradual approach, a held scent with two tiny inhalations, then a
  // gradual retreat. The muzzle never snaps upright between inhalations.
  const sniffTime = (progress: number) => s.walkEnd + (s.sniffEnd - s.walkEnd) * progress;
  const sniffProgress = [0, .075, .15, .225, .30, .38, .46, .55, .65, .75, .85, .94];
  sniffProgress.forEach((progress, frame) => beats.push({ offset: sniffTime(progress), kind: "action", frame: 16 + frame }));
  const cravingTime = (progress: number) => s.sniffEnd + (s.spinStart - s.sniffEnd) * progress;
  beats.push(
    { offset: s.sniffEnd, kind: "action", frame: 28 },
    { offset: cravingTime(.32), kind: "action", frame: 29 },
    { offset: cravingTime(.66), kind: "action", frame: 28 },
    { offset: cravingTime(.88), kind: "action", frame: 31 },
  );
  const turn = framesForSeason(season);
  beats.push(
    { offset: s.spinStart + (s.spinEnd - s.spinStart) * coherentFrameTime(1, turn), kind: "turn", frame: 0 },
    { offset: s.spinStart + (s.spinEnd - s.spinStart) * coherentFrameTime(turn.length - 1, turn), kind: "action", frame: 31 },
    { offset: s.greetingStart, kind: "action", frame: 28 },
    { offset: s.barkStart, kind: "action", frame: 30 },
    { offset: s.flightStart - .008, kind: "action", frame: 31 },
    // Keep the action sheet's neutral drawing between gestures. The exact
    // permanent head/base is restored only when its measured flight starts.
    { offset: s.flightStart, kind: "base", frame: 0 },
    { offset: 1, kind: "base", frame: 0 },
  );
  return beats.sort((a, b) => a.offset - b.offset);
}

/** Correct only the complete visible drawing around its floor. The cap keeps
 * authored proportions intact while smoothing the small cel-to-cel rise. */
export function risePoseCorrection(frame: RegisteredPerformanceFrame, desired: { x: number; y: number }) {
  const floor = performanceCamera.floor;
  const gap = Math.max(1, floor - frame.muzzle.y);
  const scale = Math.max(.98, Math.min(1.02, (floor - desired.y) / gap));
  return `matrix(${scale}, 0, 0, ${scale}, ${desired.x - frame.muzzle.x * scale}, ${floor * (1 - scale)})`;
}
