"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties, type Ref } from "react";
import { rooHeadOutline, rooWelcomeArt } from "@/lib/roo-welcome-art";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { WelcomeBurger } from "@/components/welcome-burger";

function optimizedSource(src: string) {
  const { props } = getImageProps({ src, width: 640, height: 640, alt: "Roo", quality: 80 });
  return props.srcSet?.split(",")[0].trim().split(" ")[0] || props.src;
}

// Registered cels share the small Next Image optimization. Expression patches
// change only the face, never replace the walking character or navbar head.
export const rooPuppetSources = {
  closed: optimizedSource(rooWelcomeArt.src),
  bark: optimizedSource(rooWelcomeArt.bark),
  craving: optimizedSource(rooWelcomeArt.craving),
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
      <mask id={`${id}-face`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
        <ellipse cx="860" cy="640" rx="310" ry="240" fill={`url(#${id}-muzzle-blend)`} />
      </mask>
    </defs>
    <g data-roo-part="pivot">
      {part("rear-far")}{part("front-far")}{part("tail")}
      <use href={`#${id}-skin`} mask={`url(#${id}-torso)`} data-roo-part="torso" />
      {part("rear-near")}{part("front-near")}
      <g data-roo-part="head">
        <use href={`#${id}-skin`} clipPath={`url(#${id}-head)`} />
        <g data-roo-part="craving">
          <image data-roo-craving-cel="true" width="1254" height="1254" mask={`url(#${id}-face)`} />
          <path d="M1137 456v32m-16-16h32M1170 530v20m-10-10h20" fill="none" stroke="#ffe3a4" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g data-roo-part="mouth"><image data-roo-mouth-cel="true" width="1254" height="1254" mask={`url(#${id}-mouth)`} /></g>
      </g>
    </g>
    <g data-roo-part="aroma" fill="none" stroke="#ffe2b7" strokeWidth="6" strokeLinecap="round" aria-hidden="true">
      <path d="M1065 802c-38-7-12-38-54-46s-11-28-43-38M1112 791c-45-15-15-41-52-55M1130 815c-39-12-5-34-30-47" />
    </g>
    <WelcomeBurger />
  </svg>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;

/** Finite joint animation; the browser interpolates it without a JS frame loop. */
export function animateRooPuppet(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation) {
  const move = (name: string, frames: Keyframe[]) => {
    const joint = puppet.querySelector(`[data-roo-part="${name}"]`);
    if (joint) animate(joint, frames.map(frame => ({ ...frame, easing: frame.easing || "ease-in-out" })), { duration, fill: "both", easing: "linear" });
  };
  move("pivot", [
    { offset: 0, transform: `translate(${-rooWelcomeStory.walkDistance}px, 0) rotate(-1deg)`, easing: "linear" },
    { offset: .06, transform: "translate(-615px, -7px) rotate(1deg)", easing: "linear" },
    { offset: .12, transform: "translate(-410px, 0) rotate(-1deg)", easing: "linear" },
    { offset: .18, transform: "translate(-175px, -6px) rotate(1deg)" },
    { offset: rooWelcomeStory.walkEnd, transform: "none" },
    { offset: .31, transform: "translate(12px, 8px) rotate(6deg)" },
    { offset: .345, transform: "translate(5px, 3px) rotate(3deg)" },
    { offset: .385, transform: "translate(12px, 8px) rotate(6deg)" },
    { offset: rooWelcomeStory.sniffEnd, transform: "none" },
    { offset: .48, transform: "translate(0, -6px) rotate(-1deg)" },
    { offset: rooWelcomeStory.cravingEnd, transform: "none" },
    { offset: 1, transform: "none" },
  ]);
  const legOrigins = { "rear-near": "310px 960px", "rear-far": "455px 970px", "front-near": "685px 965px", "front-far": "850px 965px" };
  Object.entries(legOrigins).forEach(([name, origin], index) => {
    const element = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (element) element.style.transformOrigin = origin;
    const direction = index === 0 || index === 3 ? 1 : -1;
    move(name, [
      { offset: 0, transform: `rotate(${direction * -4}deg)` },
      { offset: .045, transform: `rotate(${direction * 6}deg)` },
      { offset: .09, transform: `rotate(${direction * -5}deg)` },
      { offset: .135, transform: `rotate(${direction * 6}deg)` },
      { offset: .18, transform: `rotate(${direction * -4}deg)` },
      { offset: .22, transform: `rotate(${direction * 2}deg)` },
      { offset: rooWelcomeStory.walkEnd, transform: "none" }, { offset: 1, transform: "none" },
    ]);
  });
  move("tail", [
    { offset: 0, transform: "rotate(-12deg)" },
    { offset: .09, transform: "rotate(13deg)" },
    { offset: .18, transform: "rotate(-12deg)" },
    { offset: .26, transform: "rotate(7deg)" },
    { offset: .36, transform: "rotate(-4deg)" },
    { offset: .43, transform: "rotate(8deg)" },
    { offset: .48, transform: "rotate(-12deg)" },
    { offset: .53, transform: "rotate(12deg)" },
    { offset: .59, transform: "rotate(-9deg)" },
    { offset: .65, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("head", [
    { offset: 0, transform: "rotate(-2deg)" },
    { offset: .12, transform: "rotate(2deg)" },
    { offset: rooWelcomeStory.walkEnd, transform: "none" },
    { offset: .31, transform: "translate(12px, 24px) rotate(6deg)" },
    { offset: .345, transform: "translate(3px, 6px) rotate(2deg)" },
    { offset: .385, transform: "translate(12px, 24px) rotate(6deg)" },
    { offset: rooWelcomeStory.sniffEnd, transform: "none" },
    { offset: .48, transform: "rotate(-4deg)" },
    { offset: rooWelcomeStory.cravingEnd, transform: "none" },
    { offset: .60, transform: "rotate(-2deg)" },
    { offset: .65, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("mouth", [
    { offset: 0, opacity: 0, transform: "scaleY(.72)" },
    { offset: .57, opacity: 0, transform: "scaleY(.72)" },
    { offset: .59, opacity: 1, transform: "scaleY(1)" },
    { offset: .605, opacity: 0, transform: "scaleY(.72)" },
    { offset: .625, opacity: 1, transform: "scaleY(1)" },
    { offset: .65, opacity: 0, transform: "scaleY(.72)" },
    { offset: 1, opacity: 0, transform: "scaleY(.72)" },
  ]);
  move("craving", [
    { offset: 0, opacity: 0 }, { offset: rooWelcomeStory.sniffEnd, opacity: 0 },
    { offset: .46, opacity: 1 }, { offset: .54, opacity: 1 },
    { offset: .57, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("burger", [
    { offset: 0, opacity: 0 }, { offset: .04, opacity: 1 },
    { offset: .60, opacity: 1 }, { offset: .665, opacity: 0 },
    { offset: 1, opacity: 0 },
  ]);
  move("aroma", [
    { offset: 0, opacity: 0, transform: "translate(6px, 7px)" },
    { offset: rooWelcomeStory.walkEnd, opacity: 0, transform: "translate(6px, 7px)" },
    { offset: .295, opacity: .8, transform: "translate(0, 0)" },
    { offset: .335, opacity: .4, transform: "translate(-9px, -6px)" },
    { offset: .36, opacity: .8, transform: "translate(0, 0)" },
    { offset: .415, opacity: 0, transform: "translate(-9px, -6px)" },
    { offset: 1, opacity: 0, transform: "translate(-9px, -6px)" },
  ]);
}
