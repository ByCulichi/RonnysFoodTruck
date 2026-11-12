"use client";

import { getImageProps } from "next/image";
import { useId } from "react";
import { performanceSelectionKeys } from "@/lib/roo-pose-selection";
import type { PerformanceBeat } from "@/lib/roo-performance-motion";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { coherentTurnArtwork, coherentTurnTransform, framesForSeason } from "@/lib/roo-coherent-turn";

export function coherentSources(season: CinemaSeason) {
  const art = coherentTurnArtwork[season];
  return Object.fromEntries(Object.entries(art || {}).map(([name, sheet]) => {
    const { props } = getImageProps({ src: sheet.src, width: sheet.optimizedWidth, height: Math.round(sheet.height / sheet.width * sheet.optimizedWidth), quality: 85, alt: "" });
    return [name, props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src];
  })) as Record<string, string>;
}

/** Clothing, skin and face are painted together in every actual view. There
 * are no reflected drawings or independently projected clothing fragments. */
export function RooCoherentTurn({ season }: { season: CinemaSeason }) {
  const id = `roo-connected-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const art = coherentTurnArtwork[season];
  const frames = framesForSeason(season);
  return <g data-roo-part="motion-turn" data-roo-motion-kind="turn" data-roo-motion-frame-count={frames.length} data-roo-connected-outfit={season} opacity="0" aria-hidden="true">
    <defs>
      {Object.entries(art || {}).map(([name, sheet]) => <image key={name} id={`${id}-${name}`} data-roo-motion-cel={name} width={sheet.width} height={sheet.height} preserveAspectRatio="none" />)}
      {frames.map((frame, i) => <clipPath key={i} id={`${id}-crop-${i}`}><rect {...frame.crop} /></clipPath>)}
    </defs>
    {frames.map((frame, i) => <g key={i} data-roo-part={`motion-turn-frame-${i}`} data-roo-motion-frame={i} data-roo-turn-angle={frame.angle} visibility="hidden">
      <g data-roo-frame-art="true" transform={coherentTurnTransform(frame)}>
        <use data-roo-frame-source="true" href={`#${id}-${frame.source}`} clipPath={`url(#${id}-crop-${i})`} />
      </g>
    </g>)}
  </g>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;
export function animateCoherentTurn(puppet: SVGSVGElement, season: CinemaSeason, duration: number, animate: RegisterAnimation, plan: readonly PerformanceBeat[]) {
  const frames = framesForSeason(season);
  frames.forEach((_, i) => {
    const target = puppet.querySelector<SVGElement>(`[data-roo-part="motion-turn-frame-${i}"]`);
    if (!target) return;
    const keys = performanceSelectionKeys(plan, beat => beat.kind === "turn" && beat.frame === i);
    animate(target, keys, { duration, fill: "both", easing: "linear" });
  });
}
