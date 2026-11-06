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

/** Inverse smoothstep places gait changes at travelled distance, not at a
 * fixed clock rate. Short phone approaches get fewer complete gait cycles. */
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
  beats.push({ offset: s.riseEnd, kind: "action", frame: 12 });

  const cycles = Math.max(1, Math.min(3, Math.ceil(Math.max(0, measuredDistance) / 120)));
  const walkFrames = cycles * 12;
  for (let step = 0; step < walkFrames; step++) {
    beats.push({ offset: s.walkStart + (s.walkEnd - s.walkStart) * performanceTimeAtDistance(step ? (step - .5) / walkFrames : 0), kind: "action", frame: step % 12 });
  }
  // Each expression/lean is also a complete body drawing. Never lay a standing
  // chest or a separate mouth on top of folded/rising legs.
  beats.push(
    { offset: s.walkEnd, kind: "action", frame: 12 },
    { offset: .438, kind: "action", frame: 13 },
    { offset: .455, kind: "action", frame: 14 },
    { offset: .470, kind: "action", frame: 13 },
    { offset: .489, kind: "action", frame: 12 },
    { offset: .504, kind: "action", frame: 13 },
    { offset: .521, kind: "action", frame: 14 },
    { offset: .538, kind: "action", frame: 13 },
    { offset: s.sniffEnd, kind: "action", frame: 15 },
    { offset: .571, kind: "action", frame: 16 },
    { offset: .585, kind: "action", frame: 17 },
    { offset: .597, kind: "action", frame: 16 },
    { offset: .605, kind: "action", frame: 12 },
  );
  const turn = framesForSeason(season);
  beats.push(
    { offset: s.spinStart + (s.spinEnd - s.spinStart) * coherentFrameTime(1, turn), kind: "turn", frame: 0 },
    { offset: s.spinStart + (s.spinEnd - s.spinStart) * coherentFrameTime(turn.length - 1, turn), kind: "action", frame: 12 },
    { offset: s.greetingStart, kind: "action", frame: 15 },
    { offset: s.barkStart, kind: "action", frame: 18 },
    { offset: .804, kind: "action", frame: 19 },
    { offset: .818, kind: "action", frame: 15 },
    { offset: .834, kind: "action", frame: 12 },
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
