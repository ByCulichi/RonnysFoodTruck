"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason } from "@/lib/welcome-season";
import { celClip, celTransform, motionFrameTime, rooMotionFrames, rooMotionSheets, rooRigRegions, rooRiseFrames, type RooMotionFrame, type RooMotionKind } from "@/lib/roo-motion-cels";
import { PoseBandana, PoseCape, PoseHat } from "@/components/roo-pose-art";
import { WelcomeWizardHat } from "@/components/welcome-costume";

export const rooMotionSources = Object.fromEntries(Object.entries(rooMotionSheets).map(([name, sheet]) => {
  const { props } = getImageProps({ src: sheet.src, width: sheet.optimizedWidth, height: Math.round(sheet.height / sheet.width * sheet.optimizedWidth), quality: 85, alt: "" });
  return [name, props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src];
})) as Record<RooMotionKind, string>;

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
  return `matrix(${sx}, 0, 0, 1, ${x - 850 * sx}, ${y - 315})`;
}

function bandanaTransform(frame: RooMotionFrame) {
  return `matrix(${frame.mirror ? -.85 : .85}, 0, 0, .85, ${frame.neck.x}, ${frame.neck.y})`;
}

/** One selected drawing is always fully opaque. A source-space clip and matrix
 * change together in one stepped WAAPI effect; no JS work runs per frame. */
export function RooMotionCels({ kind, season = activeWelcomeSeason, sourceId }: { kind: RooMotionKind; season?: CinemaSeason; sourceId?: string }) {
  const id = `roo-motion-${kind}-${uniqueId(useId())}`;
  const sheet = rooMotionSheets[kind], frames = rooMotionFrames[kind], first = frames[0];
  const imageStyle: CSSProperties = { transformOrigin: "0px 0px", transformBox: "fill-box", transform: celTransform(first), clipPath: celClip(first) };
  return <g data-roo-part={`motion-${kind}`} data-roo-motion-kind={kind} data-roo-motion-frame-count={frames.length} opacity="0" aria-hidden="true">
    <image data-roo-part={`motion-${kind}-sheet`} data-roo-motion-cel={kind} width={sheet.width} height={sheet.height} preserveAspectRatio="none" style={imageStyle} />
    {kind === "rise" ? <g data-roo-part="motion-rise-cape" style={{ transform: capeTransform(first), transformOrigin: "0px 0px" }}>
      <PoseCape id={id} season={season} placement={identityCape} />
    </g> : <>
      {([false, true] as const).map(rear => <g key={String(rear)}>
        <g data-roo-part={`motion-turn-cape-${rear ? "rear" : "front"}`} opacity="0" style={{ transformOrigin: "0px 0px" }}><PoseCape id={`${id}-cape-${rear}`} season={season} placement={identityCape} rear={rear} /></g>
        <g data-roo-part={`motion-turn-bandana-${rear ? "rear" : "front"}`} opacity="0" style={{ transformOrigin: "0px 0px" }}><PoseBandana x={0} y={0} scale={1} rear={rear} /></g>
        <g data-roo-part={`motion-turn-hat-${rear ? "rear" : "front"}`} opacity="0" style={{ transformOrigin: "0px 0px" }}>
          {season === "halloween" && !rear && sourceId ? <WelcomeWizardHat id={`${id}-original-hat`} sourceId={sourceId} /> : <PoseHat x={0} y={0} scale={1} rear={rear} season={season} />}
        </g>
      </g>)}
    </>}
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
      <use href={`#${id}-skin`} mask={`url(#${id}-torso)`} />
      <PoseCape id={`${id}-cape`} season={season} placement={last.cape} />
    </g>
  </g>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;
type MotionSpan = { start: number; end: number };

/** All source, crop and clothing tracks share exactly the same frame boundaries. */
export function animateRooMotionCels(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation, spans: Record<RooMotionKind, MotionSpan>) {
  const add = (name: string, kind: RooMotionKind, select: (frame: RooMotionFrame) => Keyframe) => {
    const target = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (!target) return;
    const { start, end } = spans[kind], frames = rooMotionFrames[kind];
    const keys = frames.map((frame, index) => {
      const time = motionFrameTime(kind, index, frames.length);
      return { ...select(frame), offset: start + (end - start) * time, easing: "steps(1, end)" };
    });
    keys.unshift({ ...select(frames[0]), offset: 0, easing: "steps(1, end)" });
    keys.push({ ...select(frames.at(-1)!), offset: 1, easing: "steps(1, end)" });
    animate(target, keys, { duration, fill: "both", easing: "linear" });
  };
  for (const kind of ["rise", "turn"] as const) add(`motion-${kind}-sheet`, kind, frame => ({ transform: celTransform(frame), clipPath: celClip(frame) }));
  add("motion-rise-cape", "rise", frame => ({ transform: capeTransform(frame) }));
  for (const rear of [false, true]) {
    const suffix = rear ? "rear" : "front";
    const opacity = (frame: RooMotionFrame) => Number(frame.rear === rear);
    add(`motion-turn-cape-${suffix}`, "turn", frame => ({ transform: capeTransform(frame), opacity: opacity(frame) }));
    add(`motion-turn-bandana-${suffix}`, "turn", frame => ({ transform: bandanaTransform(frame), opacity: opacity(frame) }));
    add(`motion-turn-hat-${suffix}`, "turn", frame => ({ transform: !rear && puppet.dataset.welcomeOutfit === "halloween" ? wizardHatTransform(frame) : headTransform(frame), opacity: opacity(frame) }));
  }
}
