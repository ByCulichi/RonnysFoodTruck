import type { PerformanceBeat } from "@/lib/roo-performance-motion";

/** Coalesce consecutive states so only real changes are keyframed. Discrete
 * visibility/display has an opacity-free fallback and does not blend poses. */
export function performanceSelectionKeys(plan: readonly PerformanceBeat[], selected: (beat: PerformanceBeat) => boolean): Keyframe[] {
  const state = (visible: boolean) => ({ visibility: visible ? "visible" : "hidden", display: visible ? "inline" : "none" });
  let previous = selected(plan[0]);
  const keys: Keyframe[] = [{ offset: 0, ...state(previous), easing: "steps(1, end)" }];
  for (const beat of plan.slice(1)) {
    const next = selected(beat);
    if (next !== previous) keys.push({ offset: beat.offset, ...state(next), easing: "steps(1, end)" });
    previous = next;
  }
  if (keys.at(-1)!.offset !== 1) keys.push({ offset: 1, ...state(previous) });
  return keys;
}

