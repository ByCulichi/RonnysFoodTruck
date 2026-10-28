"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties, type Ref } from "react";
import { rooHeadOutline, rooWelcomeArt } from "@/lib/roo-welcome-art";

function optimizedSource(src: string) {
  const { props } = getImageProps({ src, width: 640, height: 640, alt: "Roo", quality: 80 });
  return props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src;
}

// Both registered cels use the same small, cached Next Image optimization. The
// open-mouth cel is shown ONLY through a muzzle mask, never as another dog.
export const rooPuppetSources = {
  closed: optimizedSource(rooWelcomeArt.src),
  bark: optimizedSource(rooWelcomeArt.bark),
};

const regions = {
  tail: "0,400 340,400 340,655 275,660 230,680 225,715 268,733 244,770 212,802 190,810 0,810",
  "rear-near": "105,930 363,880 452,927 360,1040 277,1114 273,1245 110,1245",
  "rear-far": "370,935 570,935 570,1210 350,1210 350,1040",
  "front-near": "609,944 765,920 786,1040 746,1150 806,1245 610,1245 600,1110",
  "front-far": "787,930 918,918 950,1065 1020,1220 790,1220 777,1100",
};
const headPoints = rooHeadOutline.map(point => point.join(",")).join(" ");

export function RooPuppet({ puppetRef, style }: { puppetRef: Ref<SVGSVGElement>; style: CSSProperties }) {
  const id = `roo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const part = (name: keyof typeof regions) => <g data-roo-part={name}><use href={`#${id}-skin`} clipPath={`url(#${id}-${name})`} mask={name === "tail" ? undefined : `url(#${id}-body-only)`} /></g>;
  return <svg ref={puppetRef} className="roo-welcome-character roo-puppet" style={style} viewBox="0 0 1254 1254" role="img" aria-label="Roo, el chihuahua hechicero, dando la bienvenida" data-roo-puppet="true">
    <defs>
      <image id={`${id}-skin`} href={rooPuppetSources.closed} width="1254" height="1254" />
      {Object.entries(regions).map(([name, points]) => <clipPath key={name} id={`${id}-${name}`}><polygon points={points} /></clipPath>)}
      <clipPath id={`${id}-head`}><polygon points={headPoints} /></clipPath>
      <mask id={`${id}-body-only`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <rect width="1254" height="1254" fill="white" /><polygon points={headPoints} fill="black" />
      </mask>
      <mask id={`${id}-torso`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <rect width="1254" height="1254" fill="white" />
        <polygon points={headPoints} fill="black" />
        <polygon points={regions.tail} fill="black" />
        <rect x="0" y="1050" width="1254" height="204" fill="black" />
      </mask>
      <radialGradient id={`${id}-muzzle-blend`}>
        <stop offset="82%" stopColor="white" /><stop offset="100%" stopColor="black" />
      </radialGradient>
      <mask id={`${id}-mouth`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <ellipse cx="900" cy="714" rx="165" ry="112" fill={`url(#${id}-muzzle-blend)`} />
      </mask>
    </defs>
    <g data-roo-part="pivot">
      {part("rear-far")}{part("front-far")}{part("tail")}
      <use href={`#${id}-skin`} mask={`url(#${id}-torso)`} data-roo-part="torso" />
      {part("rear-near")}{part("front-near")}
      <g data-roo-part="head">
        <use href={`#${id}-skin`} clipPath={`url(#${id}-head)`} />
        <g data-roo-part="mouth"><image data-roo-mouth-cel="true" width="1254" height="1254" mask={`url(#${id}-mouth)`} /></g>
        <g data-roo-part="bark-lines" fill="none" stroke="#ffdb9c" strokeWidth="8" strokeLinecap="round">
          <path d="M1130 690l55-20M1140 730l65 3M1124 770l50 24" />
        </g>
      </g>
    </g>
  </svg>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;

/** Finite joint animation; the browser interpolates it without a JS frame loop. */
export function animateRooPuppet(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation) {
  const move = (name: string, frames: Keyframe[]) => {
    const joint = puppet.querySelector(`[data-roo-part="${name}"]`);
    if (joint) animate(joint, frames.map(frame => ({ ...frame, easing: "ease-in-out" })), { duration, fill: "both", easing: "linear" });
  };
  move("pivot", [
    { offset: 0, transform: "translate(-18px, 0) rotate(-5deg)" },
    { offset: .14, transform: "translate(10px, -9px) rotate(3deg)" },
    { offset: .24, transform: "translate(-9px, 0) rotate(-4deg)" },
    { offset: .34, transform: "translate(8px, -4px) rotate(2deg)" },
    { offset: .48, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  const legOrigins = { "rear-near": "310px 960px", "rear-far": "455px 970px", "front-near": "685px 965px", "front-far": "850px 965px" };
  Object.entries(legOrigins).forEach(([name, origin], index) => {
    const element = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (element) element.style.transformOrigin = origin;
    const direction = index % 2 ? -1 : 1;
    move(name, [
      { offset: 0, transform: `rotate(${direction * -4}deg)` },
      { offset: .13, transform: `rotate(${direction * 6}deg)` },
      { offset: .23, transform: `rotate(${direction * -5}deg)` },
      { offset: .32, transform: `rotate(${direction * 3}deg)` },
      { offset: .43, transform: "none" }, { offset: 1, transform: "none" },
    ]);
  });
  move("tail", [
    { offset: 0, transform: "rotate(-12deg)" },
    { offset: .1, transform: "rotate(13deg)" },
    { offset: .2, transform: "rotate(-12deg)" },
    { offset: .3, transform: "rotate(12deg)" },
    { offset: .4, transform: "rotate(-9deg)" },
    { offset: .5, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("head", [
    { offset: 0, transform: "rotate(3deg) skewX(2deg)" },
    { offset: .17, transform: "rotate(-7deg) skewX(-3deg)" },
    { offset: .27, transform: "rotate(4deg) skewX(2deg)" },
    { offset: .32, transform: "rotate(-3deg)" },
    { offset: .37, transform: "rotate(1deg)" },
    { offset: .41, transform: "rotate(-3deg)" },
    { offset: .48, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("mouth", [
    { offset: 0, opacity: 0, transform: "scaleY(.72)" },
    { offset: .29, opacity: 0, transform: "scaleY(.72)" },
    { offset: .315, opacity: 1, transform: "scaleY(1)" },
    { offset: .34, opacity: 1, transform: "scaleY(1)" },
    { offset: .365, opacity: 0, transform: "scaleY(.72)" },
    { offset: .39, opacity: 0, transform: "scaleY(.72)" },
    { offset: .415, opacity: 1, transform: "scaleY(1)" },
    { offset: .435, opacity: 1, transform: "scaleY(1)" },
    { offset: .46, opacity: 0, transform: "scaleY(.72)" },
    { offset: 1, opacity: 0, transform: "scaleY(.72)" },
  ]);
  move("bark-lines", [
    { offset: 0, opacity: 0 }, { offset: .30, opacity: 0 },
    { offset: .32, opacity: .85 }, { offset: .35, opacity: 0 },
    { offset: .40, opacity: 0 }, { offset: .42, opacity: .85 },
    { offset: .45, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
}
