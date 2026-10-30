"use client";

import { getImageProps } from "next/image";
import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason } from "@/lib/welcome-season";
import { rooPoseArt, type RooBodyPoseName, type RooPoseName } from "@/lib/roo-pose-art";

function optimizedSource(src: string) {
  const { props } = getImageProps({ src, width: 640, height: 640, alt: "", quality: 80 });
  return props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src;
}

/** Computing a URL does not fetch it. RooWelcome assigns href only after an
 * eligible animation decodes its drawings; static/reduced-motion heads stay light. */
export const rooPoseSources = Object.fromEntries(
  Object.entries(rooPoseArt).map(([name, art]) => [name, optimizedSource(art.src)]),
) as Record<RooPoseName, string>;

const costumes = {
  halloween: { light: "#8c2cf2", dark: "#5412a0", edge: "#ffcf6c" },
  muertos: { light: "#4c3b52", dark: "#211c28", edge: "#e8c58b" },
  christmas: { light: "#e14a57", dark: "#a8243b", edge: "#fff0d5" },
  newyear: { light: "#4c3b48", dark: "#201c27", edge: "#e9bd67" },
  valentines: { light: "#be4b69", dark: "#81203c", edge: "#efc184" },
} as const;

function Star({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="m0-27 9 18 21-5-7 21 15 15-22 2-10 19-9-20-22-4 17-14Z" fill="#ffd46c" stroke="#b88a3e" strokeWidth="2" />;
}

function Heart({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 19C-8 13-29 1-29-15c0-21 22-28 29-10 7-18 29-11 29 10C29 1 8 13 0 19Z" fill="#f6bfca" stroke="#6e203b" strokeWidth="3" />;
}

function Marigold({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {[0, 45, 90, 135].map(angle => <ellipse key={angle} rx="27" ry="12" transform={`rotate(${angle})`} fill="#ef9b23" stroke="#9a4a1e" strokeWidth="2" />)}
    <circle r="13" fill="#ffcc3e" stroke="#a75e21" strokeWidth="2" />
  </g>;
}

/** The cape follows the registered back/shoulders, never the paws or face. */
function PoseCape({ id, season, placement, rear = false }: {
  id: string;
  season: CinemaSeason;
  placement: { x: number; y: number; width: number; height: number };
  rear?: boolean;
}) {
  const color = costumes[season];
  return <g transform={`translate(${placement.x} ${placement.y}) scale(${placement.width / 1000} ${placement.height / 400})`} data-pose-cape={season}>
    <defs><linearGradient id={`${id}-cloth`} x2=".25" y2="1"><stop stopColor={color.light} /><stop offset="1" stopColor={color.dark} /></linearGradient></defs>
    {season === "valentines" && <g fill="#fff0d4" stroke="#a47754" strokeWidth="10">
      <path d="M760 130Q680 10 745-90Q801-50 826 29Q838-47 881-66Q935 21 928 130Z" />
      <path d="M214 100Q123 3 168-61Q220-26 251 42Q277-36 319-42Q348 50 309 128Z" />
    </g>}
    <path d={rear ? "M184 15Q500-25 816 15L990 338Q735 418 500 370Q269 418 10 338Z" : "M0 310Q130 45 460 36Q690-2 1000 170L965 250Q520 480 0 360Z"} fill={`url(#${id}-cloth)`} stroke="#3d201c" strokeWidth="17" strokeLinejoin="round" />
    <path d={rear ? "M37 334Q275 399 500 353Q725 399 963 334" : "M20 343Q510 479 965 240"} fill="none" stroke={color.edge} strokeWidth={season === "christmas" ? 33 : 16} strokeLinecap="round" />
    <path d={rear ? "M259 56Q216 188 178 294M500 55V316M741 56Q784 188 822 294" : "M157 240Q330 89 578 113M189 302Q451 371 744 254"} fill="none" stroke={color.light} strokeWidth="13" opacity=".7" />
    {season === "halloween" && <>
      <Star x={rear ? 280 : 225} y={rear ? 183 : 245} scale={1.18} />
      <Star x={rear ? 505 : 430} y={rear ? 112 : 140} scale={1.05} />
      <Star x={rear ? 735 : 650} y={rear ? 210 : 242} scale={1.1} />
      {!rear && <Star x={840} y={157} scale={.95} />}
    </>}
    {season === "muertos" && <>
      <path d={rear ? "M260 89q-40 35-16 65m256-67q-37 42-8 77m235-73q35 43 7 82M331 252q22-28 47-7m215 4q31-31 58-3" : "M230 272q-33-38-2-62m114 44q-21-38 7-65m107 93q37-29 65-4m89-69q-9-32 19-47"} fill="none" stroke={color.edge} strokeWidth="9" />
      <Marigold x={rear ? 500 : 755} y={rear ? 245 : 128} scale={1.15} />
    </>}
    {season === "christmas" && <>
      <path d={rear ? "M156 225Q500 285 844 225" : "M89 281Q522 383 914 217"} fill="none" stroke="#30232b" strokeWidth="37" />
      <path d={rear ? "M460 241h81v43h-81Z" : "m492 298 76-6 4 44-76 7Z"} fill="#eac171" stroke="#452519" strokeWidth="6" />
    </>}
    {season === "newyear" && <>
      <path d={rear ? "M202 66Q500 36 800 66M64 315Q282 368 500 331Q718 368 936 315" : "M109 279Q429 381 895 228"} fill="none" stroke={color.edge} strokeWidth="7" />
      {[365, 460, 555].map((x, i) => <circle key={x} cx={rear ? 500 : x} cy={rear ? 140 + i * 60 : 249 - i * 18} r="9" fill={color.edge} />)}
    </>}
    {season === "valentines" && <>
      <Heart x={rear ? 337 : 290} y={rear ? 153 : 245} scale={1.35} />
      <Heart x={rear ? 673 : 570} y={rear ? 255 : 166} scale={.9} />
    </>}
  </g>;
}

/** Hats are drawn for the neutral full-turn art, leaving its face unchanged. */
function PoseHat({ season, rear, x, y, scale }: { season: CinemaSeason; rear: boolean; x: number; y: number; scale: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} data-pose-hat={season} stroke="#3d1c18" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
    {season === "halloween" ? <>
      <path d="M-210-9Q-207-99-174-168C-220-137-285-143-307-178Q-335-209-319-235Q-313-192-270-199C-228-207-198-250-157-280Q-95-310-35-278Q33-242 98-201Q162-155 195-29Z" fill="#721ce0" />
      <path d="M-288-194Q-243-175-193-225Q-135-289-86-277Q-27-250 19-218" fill="none" stroke="#a451fa" strokeWidth="13" />
      <path d="M-208-41Q-12-106 190-47L206-5Q-6-57-222 8Z" fill="#f18c2f" />
      <path d="M-302 35Q-229-32-31-35Q164-41 296 52Q211 101 63 65Q-109 21-244 78Q-286 72-302 35Z" fill="#6316c7" />
      <path d="M-273 38Q-83-27 260 55" fill="none" stroke="#a24cf0" strokeWidth="10" />
      {!rear && <g transform="translate(89 -38)">
        <ellipse rx="42" ry="36" fill="#f2a72d" strokeWidth="6" /><path d="M0-36q-1-17 13-17" fill="none" stroke="#5b762a" strokeWidth="8" />
        <path d="m-22-7 13-9 3 13Zm31-9 13 9-16 4ZM-22 10l14 7 9-8 10 8 13-9-6 17-18 4-17-5Z" fill="#382018" stroke="none" />
      </g>}
    </> : season === "muertos" ? <>
      <path d="M-189-11Q-179-143-100-188Q-6-244 100-186Q182-138 189-9Z" fill="#24202c" />
      <path d="M-189-52Q-5-110 188-52L196-5Q-4-62-197 8Z" fill="#745084" strokeWidth="6" />
      <path d="M-343 33Q-213-64 1-58Q223-60 344 37Q252 112 99 62Q-73 14-252 87Q-316 84-343 33Z" fill="#24202c" />
      <path d="M-308 36Q-1-86 305 42M-278 68Q-30-5 264 72" fill="none" stroke="#e9c78e" strokeWidth="7" />
      <Marigold x={rear ? -142 : 153} y={-28} scale={1.05} /><Marigold x={rear ? -188 : 199} y={-7} scale={.7} />
    </> : season === "christmas" ? <>
      <path d="M-211 5Q-212-177-93-235Q37-293 152-220Q225-178 231-61L160-38Q126-146 77-145Q11-144-14-4Z" fill="#c02f44" />
      <path d="M-224-5Q-2-79 207 12L203 81Q-9 3-232 65Q-255 31-224-5Z" fill="#fff0d6" />
      <path d="M-217 15Q-8-39 192 29" fill="none" stroke="#e1c8a3" strokeWidth="6" />
      <path d="M205-82q15-23 37-8 30 0 31 27 19 17 2 36-8 29-36 19-29 3-34-22-17-22 0-52Z" fill="#fff0d6" />
    </> : season === "newyear" ? <>
      <path d="M-173-17-155-235Q5-289 161-223L177-10Z" fill="#24202a" />
      <path d="M-170-70Q-2-112 172-61L176-12Q-2-60-177-20Z" fill="#d8a54e" strokeWidth="6" />
      <path d="M-270 14Q1-67 272 33L256 84Q8 1-265 66Z" fill="#26212b" />
      <path d="M-244 37Q-1-23 246 54" fill="none" stroke="#d6ab62" strokeWidth="6" />
      {!rear && <Star x={16} y={-156} scale={1.05} />}
    </> : <>
      <path d="M-226 6Q-244-131-129-190Q17-264 168-166Q236-119 249-10L189 58Q-15-17-231 51Z" fill="#9e2645" />
      <path d="M-226 18Q-7-55 225 29L213 79Q-10 7-232 62Z" fill="#672039" />
      <path d="M-193-63Q-154-148-83-166" fill="none" stroke="#cb526d" strokeWidth="10" />
      {!rear && <Heart x={96} y={-89} scale={1.05} />}
    </>}
  </g>;
}

function PoseBandana({ rear, x, y, scale }: { rear: boolean; x: number; y: number; scale: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#e92e36" stroke="#442019" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round">
    {rear ? <>
      <path d="M-158-18Q-12 30 151-17L170 28Q-3 77-169 25Z" />
      <path d="m139 10 69-18-6 56-45-8 41 61-56-16-22-48Z" />
      <path d="M-140 2Q-4 42 137 1" fill="none" stroke="#ff6552" strokeWidth="7" />
    </> : <>
      <path d="M-129-42Q-30 2 113-27L80 49 26 144-49 85Z" />
      <path d="m65 15 66-23-8 56-39-9 40 69-60-26-22-44Z" />
      <path d="M-102-20Q-43 39 31 75M45 80l18-44" fill="none" stroke="#ff6752" strokeWidth="7" />
      <ellipse cx="68" cy="27" rx="20" ry="25" fill="#cc242e" />
    </>}
  </g>;
}

export function RooBodyPose({ pose, season = activeWelcomeSeason }: { pose: RooBodyPoseName; season?: CinemaSeason }) {
  const id = `roo-body-pose-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const art = rooPoseArt[pose];
  return <g data-roo-part={`pose-${pose}`} data-roo-body-pose={pose} opacity="0" aria-hidden="true">
    <defs><clipPath id={`${id}-body-crop`}><rect x={art.image.x} y={art.image.y + art.clipTop} width={art.image.width} height={art.image.height - art.clipTop} /></clipPath></defs>
    <image data-roo-pose-cel={pose} {...art.image} preserveAspectRatio="xMidYMid meet" clipPath={`url(#${id}-body-crop)`} />
    <PoseCape id={id} season={season} placement={art.cape} />
  </g>;
}

/** Distinct drawings turn the dog, rather than rotating a flat card. The left
 * profile has a fixed alternate viewing direction and never interpolates through
 * scaleX(0); the persistent original head returns before the FLIP flight. */
export function RooTurnViews({ season = activeWelcomeSeason }: { season?: CinemaSeason }) {
  const id = `roo-turn-pose-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return <>
    {(["right", "rear", "left"] as const).map(view => {
      const rear = view === "rear";
      const pose = rear ? "back" : "profile";
      const art = rooPoseArt[pose];
      const suffix = `${id}-${view}`;
      return <g key={view} data-roo-part={rear ? "turn-rear" : `turn-profile-${view}`} data-roo-turn-view={view} opacity="0" aria-hidden="true">
        <g transform={view === "left" ? "translate(1254 0) scale(-1 1)" : undefined}>
          <image data-roo-pose-cel={pose} {...art.image} preserveAspectRatio="xMidYMid meet" />
          <PoseCape id={suffix} season={season} placement={art.cape} rear={rear} />
          <PoseBandana {...art.neck} rear={rear} />
          <PoseHat {...art.head} season={season} rear={rear} />
        </g>
      </g>;
    })}
  </>;
}
