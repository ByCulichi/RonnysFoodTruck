"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties, type Ref } from "react";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { WelcomeBurger } from "@/components/welcome-burger";
import { RooCoherentTurn, animateCoherentTurn } from "@/components/roo-coherent-cels";
import { RooPerformanceCels, animatePerformanceCels, performanceSelectionKeys } from "@/components/roo-performance-cels";
import { performancePlan } from "@/lib/roo-performance-motion";
import { baseHandoffTransform } from "@/lib/roo-pose-handoff";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason, welcomeSeasonOutfits } from "@/lib/welcome-season";
import { unifiedRooArtwork, unifiedHeadLocalOutline, unifiedRooPlacementTransform } from "@/lib/roo-unified-art";

function optimizedSource(src: string) {
  const { props } = getImageProps({ src, width: 640, height: 640, alt: "Roo", quality: 80 });
  return props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src;
}

/** The closed base is also the permanent navbar head. Expressions, gait and
 * rise are authored into whole-pose cels rather than layered body fragments. */
export const puppetSourcesForSeason = (season: CinemaSeason) => ({ closed: optimizedSource(unifiedRooArtwork[season]) });
export const rooPuppetSources = puppetSourcesForSeason(activeWelcomeSeason);
const headPoints = unifiedHeadLocalOutline.map(point => point.join(",")).join(" ");

export function RooPuppet({ puppetRef, style, season = activeWelcomeSeason }: { puppetRef: Ref<SVGSVGElement>; style: CSSProperties; season?: CinemaSeason }) {
  const id = `roo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const sources = puppetSourcesForSeason(season);
  return <svg ref={puppetRef} className="roo-welcome-character roo-puppet" style={style} viewBox="0 0 1254 1254" role="img" aria-label={`Roo, el chihuahua de ${welcomeSeasonOutfits[season].outfit}, dando la bienvenida`} data-roo-puppet="true" data-welcome-outfit={season}>
    <defs>
      <image id={`${id}-skin`} href={sources.closed} data-roo-unified-source={season} width="1254" height="1254" />
      {/* Only the final flight changes a full character into its head crop.
          During every body pose, no mask crosses a leg, knee, neck or cape. */}
      <mask id={`${id}-flight-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <g data-roo-part="body-reveal" opacity="0"><rect width="1254" height="1254" fill="white" /></g>
        <polygon points={headPoints} fill="white" />
      </mask>
    </defs>
    <ellipse data-roo-part="ground-shadow" cx="827" cy="1230" rx="375" ry="32" fill="#10081b" opacity="0" aria-hidden="true" />
    <g data-roo-part="pivot">
      {/* This same persistent group owns every complete drawing and remains
          the actual head that travels into the reserved navigation slot. */}
      <g data-roo-part="head"><g data-roo-part="head-proportion">
        <g data-roo-part="base-pose" opacity="1" data-roo-exact-base="true">
          <g transform={unifiedRooPlacementTransform}><use data-roo-base-pose="true" href={`#${id}-skin`} mask={`url(#${id}-flight-reveal)`} /></g>
        </g>
        <RooPerformanceCels season={season} kind="rise" />
        <RooPerformanceCels season={season} kind="action" />
        <RooCoherentTurn season={season} />
      </g></g>
    </g>
    <g data-roo-part="aroma" fill="none" stroke="#ffe2b7" strokeWidth="6" strokeLinecap="round" aria-hidden="true" opacity="0">
      <path d="M1065 802c-38-7-12-38-54-46s-11-28-43-38M1112 791c-45-15-15-41-52-55M1130 815c-39-12-5-34-30-47" />
    </g>
    <WelcomeBurger />
  </svg>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;

/** Every pose is selected as one opaque drawing on a shared finite clock.
 * Native transforms move the whole character; no anatomical cutout animates. */
export function animateRooPuppet(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation, measuredWalkDistance: number = rooWelcomeStory.walkDistance) {
  const move = (name: string, frames: Keyframe[], origin?: string) => {
    const node = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (!node) return;
    if (origin) node.style.transformOrigin = origin;
    animate(node, frames, { duration, fill: "both", easing: "linear" });
  };
  const { restEnd, riseStart, riseEnd, walkStart, walkEnd, sniffEnd, spinStart, spinEnd, barkStart, flightStart } = rooWelcomeStory;
  const walkDistance = Math.min(rooWelcomeStory.walkDistance, Math.max(0, measuredWalkDistance));
  const season = (puppet.dataset.welcomeOutfit || activeWelcomeSeason) as CinemaSeason;
  const plan = performancePlan(season, walkDistance);
  for (const kind of ["rise", "action", "base", "turn"] as const) {
    const part = kind === "base" ? "base-pose" : `motion-${kind}`;
    // Each complete cel already owns its exact visibility window. A second
    // discrete gate on its atlas layer can round the same boundary differently
    // and leave a blank frame at a handoff. Keep prepared atlas layers open;
    // cancellation restores their original opacity=0 and hidden cel attributes.
    const keys = kind === "base"
      ? performanceSelectionKeys(plan, beat => beat.kind === kind).map(key => ({ ...key, opacity: key.visibility === "visible" ? 1 : 0 }))
      : [{ offset: 0, opacity: 1 }, { offset: 1, opacity: 1 }];
    move(part, keys);
  }
  animatePerformanceCels(puppet, season, duration, animate, plan);
  animateCoherentTurn(puppet, season, duration, animate, plan);
  const handoff = baseHandoffTransform(season);
  move("base-pose", [
    { offset: 0, transform: handoff },
    { offset: flightStart, transform: handoff, easing: "cubic-bezier(.4, 0, .2, 1)" },
    { offset: 1, transform: "matrix(1, 0, 0, 1, 0, 0)" },
  ], "0px 0px");
  move("body-reveal", [
    { offset: 0, opacity: 1 }, { offset: flightStart + .02, opacity: 1 },
    { offset: flightStart + .095, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const sniffTime = (progress: number) => walkEnd + (sniffEnd - walkEnd) * progress;
  const cravingTime = (progress: number) => sniffEnd + (spinStart - sniffEnd) * progress;
  const spinPoint = (t: number) => {
    // A little circle on the ground, with registered side and rear drawings.
    // The pivot keeps its volume instead of rotating an edge-on flat card.
    const angle = smooth(t) * Math.PI * 2;
    const envelope = Math.sin(t * Math.PI);
    return { x: Math.sin(angle) * 64, y: (Math.cos(angle) - 1) * 12, tilt: Math.sin(angle - .35) * 4 * envelope };
  };
  const walkFrames: Keyframe[] = [];
  const shadowWalk: Keyframe[] = [];
  for (let step = 1; step <= 48; step++) {
    const t = step / 48;
    const x = -walkDistance * (1 - smooth(t));
    // A calm four-beat walk advances on the ground. Neither the actor nor its
    // shadow bounce to manufacture motion between the authored paw poses.
    walkFrames.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translateX(${x}px)`, easing: "linear" });
    shadowWalk.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translateX(${x}px)`, opacity: .22, easing: "linear" });
  }
  const loopFrames: Keyframe[] = [];
  const shadowLoop: Keyframe[] = [];
  for (let step = 1; step <= 36; step++) {
    const t = step / 36, point = spinPoint(t);
    const lift = Math.abs(Math.sin(t * Math.PI * 5)) * 5 * Math.sin(t * Math.PI);
    loopFrames.push({ offset: spinStart + (spinEnd - spinStart) * t, transform: `translate(${point.x}px, ${point.y - lift}px) rotate(${point.tilt}deg)`, easing: "linear" });
    shadowLoop.push({ offset: spinStart + (spinEnd - spinStart) * t, transform: `translate(${point.x}px, ${point.y * .2}px)`, opacity: .22, easing: "linear" });
  }
  move("pivot", [
    { offset: 0, transform: `translate(${-walkDistance}px, 0)` },
    { offset: restEnd, transform: `translate(${-walkDistance}px, 0)` },
    { offset: riseEnd, transform: `translate(${-walkDistance}px, 0)` },
    { offset: walkStart, transform: `translate(${-walkDistance}px, 0)` },
    ...walkFrames,
    // The complete drawings supply the lean. Inhalations move the whole dog
    // less than a source pixel; paws stay on their registered floor.
    { offset: sniffTime(.30), transform: "translateX(.8px)" },
    { offset: sniffTime(.43), transform: "translateX(.2px)" },
    { offset: sniffTime(.51), transform: "translateX(.9px)" },
    { offset: sniffTime(.60), transform: "translateX(.2px)" },
    { offset: sniffEnd, transform: "none" },
    { offset: cravingTime(.5), transform: "translateX(-1px)" },
    { offset: spinStart, transform: "none" },
    ...loopFrames,
    { offset: barkStart, transform: "none" },
    { offset: barkStart + .015, transform: "translate(0, -2px) rotate(-.3deg)" },
    { offset: flightStart - .01, transform: "none" },
    { offset: flightStart, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("ground-shadow", [
    { offset: 0, transform: `translateX(${-walkDistance}px)`, opacity: 0 },
    { offset: .025, transform: `translateX(${-walkDistance}px)`, opacity: .22 },
    { offset: riseStart, transform: `translateX(${-walkDistance}px)`, opacity: .22 },
    { offset: riseEnd, transform: `translateX(${-walkDistance}px) scale(1, 1)`, opacity: .22 },
    { offset: walkStart, transform: `translateX(${-walkDistance}px)`, opacity: .22 },
    ...shadowWalk,
    { offset: spinStart, transform: "none", opacity: .22 },
    ...shadowLoop,
    { offset: flightStart - .005, opacity: .22, transform: "none" },
    { offset: flightStart + .045, opacity: 0, transform: "scale(.8, .7)" },
    { offset: 1, opacity: 0, transform: "scale(.8, .7)" },
  ], "827px 1230px");

  move("burger", [
    { offset: 0, opacity: 0 }, { offset: .035, opacity: 1 },
    { offset: flightStart - .025, opacity: 1 }, { offset: flightStart + .008, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("aroma", [
    { offset: 0, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: walkEnd, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: sniffTime(.30), opacity: .60, transform: "translate(0, 0)" },
    { offset: sniffTime(.43), opacity: .30, transform: "translate(-4px, -3px)" },
    { offset: sniffTime(.53), opacity: .60, transform: "translate(0, 0)" },
    { offset: sniffTime(.73), opacity: .20, transform: "translate(-6px, -4px)" },
    { offset: sniffEnd, opacity: 0, transform: "translate(-8px, -6px)" },
    { offset: 1, opacity: 0, transform: "translate(-8px, -6px)" },
  ]);
}
