/** Grounded short steps, sampled once into WAAPI keyframes by the caller. */
export type RooFootPose = {
  /** Desired toe displacement. Compensate the leg's rotation around its hip. */
  x: number;
  y: number;
  angle: number;
  planted: boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

/** `phase` is a fraction of a stride, not radians. The phase follows traveled
 * distance, so the root's easing does not make a planted paw skate backwards. */
export function footPose(progress: number, phase: number, distance: number, strides = 2.2): RooFootPose {
  const t = clamp(progress);
  const travel = Math.max(0, distance);
  if (!travel || !Number.isFinite(t) || !Number.isFinite(phase)) return { x: 0, y: 0, angle: 0, planted: true };
  const count = Math.max(.5, strides);
  const length = travel / count;
  const cycle = ((smooth(t) * count + phase) % 1 + 1) % 1;
  const stance = .62;
  const planted = cycle < stance;
  const swing = clamp((cycle - stance) / (1 - stance));
  const halfStep = length * stance / 2;
  const toe = planted ? halfStep - cycle * length : -halfStep + 2 * halfStep * smooth(swing);
  // A short settle at either end returns to the exact standing drawing. These
  // transitions happen while the root itself is barely moving.
  const weight = smooth(clamp(t / .08)) * smooth(clamp((1 - t) / .08));
  return {
    x: toe * weight,
    y: planted ? 0 : -Math.sin(swing * Math.PI) * Math.min(20, length * .15) * weight,
    angle: -toe / halfStep * 5.5 * weight,
    planted,
  };
}
