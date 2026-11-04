"use client";

import { getImageProps } from "next/image";
import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason } from "@/lib/welcome-season";
import { celClip, celTransform, motionFrameTime, riseBodyScale, rooMotionFrames, rooMotionSheets, rooRigRegions, rooRiseFrames, type RooMotionFrame, type RooMotionKind } from "@/lib/roo-motion-cels";
import { PoseBandana, PoseCape, PoseHat } from "@/components/roo-pose-art";
import { WelcomeWizardHat } from "@/components/welcome-costume";
import { rooHeadProportion } from "@/lib/roo-welcome-art";

export const rooMotionSources = Object.fromEntries(Object.entries(rooMotionSheets).map(([name, sheet]) => {
  const { props } = getImageProps({ src: sheet.src, width: sheet.optimizedWidth, height: Math.round(sheet.height / sheet.width * sheet.optimizedWidth), quality: 85, alt: "" });
  return [name, props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src];
})) as Record<keyof typeof rooMotionSheets, string>;

const uniqueId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "");
const identityCape = { x: 0, y: 0, width: 1000, height: 400 };

function capeTransform(frame: RooMotionFrame) {
  const { x, y, width, height } = frame.cape;
  return `matrix(${frame.mirror ? -width / 1000 : width / 1000}, 0, 0, ${height / 400}, ${frame.mirror ? 2 * frame.neck.x - x : x}, ${y})`;
}

function headTransform(frame: RooMotionFrame) {
  const head = frame.head!;
  const angle = (head.angle || 0) * Math.PI / 180;
  const sx = frame.mirror ? -head.scale : head.scale;
  return `matrix(${sx * Math.cos(angle)}, ${sx * Math.sin(angle)}, ${-head.scale * Math.sin(angle)}, ${head.scale * Math.cos(angle)}, ${head.x}, ${head.y})`;
}

function wizardHatTransform(frame: RooMotionFrame) {
  const head = frame.head!;
  const perspective = (1 - .18 * Math.sin(frame.index * Math.PI / 8)) / (1 - .18 * Math.sin(Math.PI / 8));
  const sx = frame.mirror ? -perspective : perspective;
  const x = head.x + (frame.mirror ? -56.4 : 56.4);
  const y = head.y - 51;
  const p = rooHeadProportion;
  return `matrix(${sx * p.scale}, 0, 0, ${p.scale}, ${x - 850 * sx + (1 - p.scale) * sx * p.x}, ${y - 315 + (1 - p.scale) * p.y})`;
}

/** Remove the artificial open rim of the headless body drawing only where the
 * approved jaw and bandana overlap it. Tail, shoulders and paws stay intact. */
function NeckBlend({ id, frame }: { id: string; frame: RooMotionFrame }) {
  return <>
    <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={frame.neck.y - 5} y2={frame.neck.y + 38}>
      <stop stopColor="black" /><stop offset="1" stopColor="white" />
    </linearGradient>
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
      <rect width="1254" height="1254" fill="white" />
      <rect x={frame.neck.x - 115} y={frame.neck.y - 160} width="360" height="198" fill={`url(#${id}-fade)`} />
    </mask>
  </>;
}

function bandanaTransform(frame: RooMotionFrame) {
  return `matrix(${frame.mirror ? -.85 : .85}, 0, 0, .85, ${frame.neck.x}, ${frame.neck.y})`;
}

/** Each drawing is a fixed SVG composition: skin, crop and costume never
 * animate separately. The complete pose becomes visible on one shared clock. */
export function RooMotionCels({ kind, season = activeWelcomeSeason, sourceId }: { kind: RooMotionKind; season?: CinemaSeason; sourceId?: string }) {
  const id = `roo-motion-${kind}-${uniqueId(useId())}`;
  const frames = rooMotionFrames[kind];
  const sheets = [...new Set(frames.map(frame => frame.sheet || kind))];
  const useSourceHat = season === "halloween" && !!sourceId;
  return <g data-roo-part={`motion-${kind}`} data-roo-motion-kind={kind} data-roo-motion-frame-count={frames.length} opacity="0" aria-hidden="true">
    <defs>
      {sheets.map(name => { const sheet = rooMotionSheets[name]; return <image key={name} id={`${id}-sheet-${name}`} data-roo-motion-cel={name} width={sheet.width} height={sheet.height} preserveAspectRatio="none" />; })}
      {frames.map((frame, index) => <clipPath key={index} id={`${id}-crop-${index}`}><rect {...frame.crop} /></clipPath>)}
      {kind === "rise" && frames.map((frame, index) => <NeckBlend key={index} id={`${id}-neck-${index}`} frame={frame} />)}
      <g id={`${id}-cape-front`}><PoseCape id={`${id}-cloth-front`} season={season} placement={identityCape} /></g>
      {kind === "turn" && <>
        <g id={`${id}-cape-rear`}><PoseCape id={`${id}-cloth-rear`} season={season} placement={identityCape} rear /></g>
        <g id={`${id}-bandana-front`}><PoseBandana x={0} y={0} scale={1} rear={false} /></g>
        <g id={`${id}-bandana-rear`}><PoseBandana x={0} y={0} scale={1} rear /></g>
        <g id={`${id}-hat-front`}>{useSourceHat ? <WelcomeWizardHat id={`${id}-original-hat`} sourceId={sourceId!} /> : <PoseHat x={0} y={0} scale={1} rear={false} season={season} />}</g>
        <g id={`${id}-hat-rear`}><PoseHat x={0} y={0} scale={1} rear season={season} /></g>
      </>}
    </defs>
    <g>
        {frames.map((frame, index) => {
          const view = frame.rear ? "rear" : "front";
          return <g key={index} data-roo-part={`motion-${kind}-frame-${index}`} data-roo-motion-frame={index} visibility="hidden">
            <g mask={kind === "rise" ? `url(#${id}-neck-${index})` : undefined}><g data-roo-frame-art="true" transform={celTransform(frame)}><use data-roo-frame-source="true" href={`#${id}-sheet-${frame.sheet || kind}`} clipPath={`url(#${id}-crop-${index})`} /></g></g>
            <use href={`#${id}-cape-${kind === "rise" ? "front" : view}`} transform={capeTransform(frame)} />
            {kind === "turn" && <>
              <use href={`#${id}-bandana-${view}`} transform={bandanaTransform(frame)} />
              <use href={`#${id}-hat-${view}`} transform={!frame.rear && useSourceHat ? wizardHatTransform(frame) : headTransform(frame)} />
            </>}
          </g>;
        })}
    </g>
  </g>;
}

/** The standing model is the exact final rise drawing. Parts overlap under an
 * opaque torso so a knee or shoulder cannot leave a transparent hinge hole. */
export function RooMotionRig({ season = activeWelcomeSeason }: { season?: CinemaSeason }) {
  const id = `roo-motion-rig-${uniqueId(useId())}`;
  const last = rooRiseFrames.at(-1)!;
  const sheet = rooMotionSheets.rise;
  const legNames = ["rear-far", "front-far", "rear-near", "front-near"] as const;
  const part = (name: keyof typeof rooRigRegions) => <g key={name} data-roo-part={name}><use href={`#${id}-skin`} clipPath={`url(#${id}-${name})`} /></g>;
  // Below this height the leg cutouts move independently; above it the torso
  // overlaps their upper ends, preserving a natural shoulder/knee silhouette.
  const overlapY = last.ty + 710 * last.scale;
  return <g data-roo-motion-rig="true" aria-hidden="true">
    <defs>
      <NeckBlend id={`${id}-neck`} frame={last} />
      <g id={`${id}-skin`}><image data-roo-motion-cel="rise" data-roo-motion-rig-source="true" width={sheet.width} height={sheet.height} preserveAspectRatio="none" style={{ transformOrigin: "0px 0px", transformBox: "fill-box", transform: celTransform(last), clipPath: celClip(last) }} /></g>
      {Object.entries(rooRigRegions).map(([name, points]) => <clipPath key={name} id={`${id}-${name}`}><polygon points={points} /></clipPath>)}
      <clipPath id={`${id}-below-hips`}><rect x="0" y={overlapY} width="1254" height="1254" /></clipPath>
      <mask id={`${id}-torso`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <rect width="1254" height="1254" fill="white" />
        <polygon points={rooRigRegions.tail} fill="black" />
        <g clipPath={`url(#${id}-below-hips)`}>{legNames.map(name => <polygon key={name} points={rooRigRegions[name]} fill="black" />)}</g>
      </mask>
    </defs>
    {legNames.map(part)}
    {part("tail")}
    <g data-roo-part="torso">
      <g mask={`url(#${id}-neck)`}><use href={`#${id}-skin`} mask={`url(#${id}-torso)`} /></g>
      <PoseCape id={`${id}-cape`} season={season} placement={last.cape} />
    </g>
  </g>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;
type MotionSpan = { start: number; end: number };

/** Select complete opaque poses without animating dozens of alpha surfaces.
 * Visibility is the fallback where discrete display animation is unsupported. */
export function animateRooMotionCels(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation, spans: Record<RooMotionKind, MotionSpan>) {
  for (const kind of ["rise", "turn"] as const) {
    const { start, end } = spans[kind], frames = rooMotionFrames[kind];
    const time = (index: number) => start + (end - start) * motionFrameTime(kind, index, frames.length);
    frames.forEach((frame, index) => {
      const target = puppet.querySelector<SVGElement>(`[data-roo-part="motion-${kind}-frame-${index}"]`);
      if (!target) return;
      const state = (visible: boolean) => ({ visibility: visible ? "visible" : "hidden", display: visible ? "inline" : "none" });
      const keys: Keyframe[] = [{ offset: 0, ...state(index === 0), easing: "steps(1, end)" }];
      if (index > 0) keys.push({ offset: time(index), ...state(true), easing: "steps(1, end)" });
      if (index < frames.length - 1) keys.push({ offset: time(index + 1), ...state(false), easing: "steps(1, end)" });
      keys.push({ offset: 1, ...state(index === frames.length - 1) });
      animate(target, keys, { duration, fill: "both", easing: "linear" });
      if (kind === "rise") {
        // Only the complete pose moves: its crop and clothing stay registered.
        // Interpolate the same neck anchors as the live head, around the floor.
        target.style.transformOrigin = "0px 1230px";
        const bodyScale = (neckY: number) => `scaleY(${riseBodyScale(frame, neckY)})`;
        const first = rooRiseFrames[0].neck.y;
        animate(target, [
          { offset: 0, transform: bodyScale(first) },
          { offset: start * .49, transform: bodyScale(first - 2) },
          { offset: start, transform: bodyScale(first) },
          ...rooRiseFrames.slice(1).map((pose, i) => ({ offset: start + (end - start) * (i + 1) / (rooRiseFrames.length - 1), transform: bodyScale(pose.neck.y) })),
          { offset: 1, transform: bodyScale(rooRiseFrames.at(-1)!.neck.y) },
        ], { duration, fill: "both", easing: "linear" });
      }
    });
  }
}
