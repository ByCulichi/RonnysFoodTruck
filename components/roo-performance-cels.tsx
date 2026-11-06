"use client";

import { getImageProps } from "next/image";
import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { performanceArtwork, type PerformanceKind } from "@/lib/roo-performance-art";
import { performanceFrames, performanceFrameTransform, risePoseCorrection, type PerformanceBeat } from "@/lib/roo-performance-motion";
import { coherentSources } from "@/components/roo-coherent-cels";
import { activeWelcomeSeason } from "@/lib/welcome-season";

export function performanceSourcesForSeason(season: CinemaSeason): Record<string, string> {
  const art = performanceArtwork[season];
  const sheets = Object.fromEntries(Object.entries(art).map(([kind, sheet]) => {
    const { props } = getImageProps({ src: sheet.src, width: sheet.optimizedWidth, height: Math.round(sheet.height / sheet.width * sheet.optimizedWidth), quality: 85, alt: "" });
    return [kind, props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src];
  }));
  return { ...sheets, ...coherentSources(season) };
}
export const rooPerformanceSources = performanceSourcesForSeason(activeWelcomeSeason);

/** Every use is one intact pose; cell boundaries are only in the empty atlas
 * gutters. There are no anatomical masks or independently moving body pieces. */
export function RooPerformanceCels({ season, kind }: { season: CinemaSeason; kind: PerformanceKind }) {
  const id = `roo-performance-${kind}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const sheet = performanceArtwork[season][kind];
  const frames = performanceFrames(season, kind);
  return <g data-roo-part={`motion-${kind}`} data-roo-motion-kind={kind} data-roo-complete-poses="true" data-roo-motion-frame-count={frames.length} opacity="0" aria-hidden="true">
    <defs>
      <image id={`${id}-source`} data-roo-motion-cel={kind} width={sheet.width} height={sheet.height} preserveAspectRatio="none" />
      {frames.map((frame, i) => <clipPath key={i} id={`${id}-crop-${i}`}><rect {...frame.crop} /></clipPath>)}
    </defs>
    {frames.map((frame, i) => <g key={i} data-roo-part={`motion-${kind}-frame-${i}`} data-roo-motion-frame={i} data-roo-whole-pose="true" visibility="hidden">
      <g data-roo-frame-art="true" transform={performanceFrameTransform(frame)}><use data-roo-frame-source="true" href={`#${id}-source`} clipPath={`url(#${id}-crop-${i})`} /></g>
    </g>)}
  </g>;
}

export type RegisterPerformanceAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;

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

export function animatePerformanceCels(puppet: SVGSVGElement, season: CinemaSeason, duration: number, animate: RegisterPerformanceAnimation, plan: readonly PerformanceBeat[]) {
  for (const kind of ["rise", "action"] as const) {
    const frames = performanceFrames(season, kind);
    frames.forEach((frame, i) => {
      const node = puppet.querySelector<SVGElement>(`[data-roo-part="motion-${kind}-frame-${i}"]`);
      if (!node) return;
      animate(node, performanceSelectionKeys(plan, beat => beat.kind === kind && beat.frame === i), { duration, fill: "both", easing: "linear" });
      if (kind === "rise") {
        // The full cel—not a crop, head or a leg—follows the sampled nose arc.
        // Its floor remains fixed. No raster image data is altered.
        const correction: Keyframe[] = [{ offset: 0, transform: risePoseCorrection(frame, frames[0].muzzle) }];
        frames.forEach((pose, index) => correction.push({ offset: rooWelcomeStory.riseStart + (rooWelcomeStory.riseEnd - rooWelcomeStory.riseStart) * index / (frames.length - 1), transform: risePoseCorrection(frame, pose.muzzle), easing: "linear" }));
        correction.push({ offset: 1, transform: "none" });
        animate(node, correction, { duration, fill: "both", easing: "linear" });
      }
    });
  }
}
