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
  surprise: optimizedSource(rooWelcomeArt.surprise),
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
        <g data-roo-part="surprise"><image data-roo-surprise-cel="true" width="1254" height="1254" mask={`url(#${id}-face)`} /></g>
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

/** Natural beats are sampled once; the browser animates the finite joint curves. */
export function animateRooPuppet(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation) {
  const move = (name: string, frames: Keyframe[]) => {
    const joint = puppet.querySelector(`[data-roo-part="${name}"]`);
    if (joint) animate(joint, frames.map(frame => ({ ...frame, easing: frame.easing || "cubic-bezier(.37, 0, .32, 1)" })), { duration, fill: "both", easing: "linear" });
  };
  const { walkDistance, walkStart, walkEnd } = rooWelcomeStory;
  const walk: Keyframe[] = [];
  for (let step = 1; step <= 48; step++) {
    const t = step / 48;
    const progress = t * t * (3 - 2 * t);
    const weight = Math.sin(t * Math.PI);
    const stride = Math.sin(t * Math.PI * 5.3);
    // Gradual acceleration and a soft stop; tiny weight shifts follow the paws.
    walk.push({
      offset: walkStart + (walkEnd - walkStart) * t,
      transform: `translate(${-walkDistance * (1 - progress)}px, ${-Math.abs(stride) * 3.5 * weight}px) rotate(${stride * .65 * weight}deg)`,
      easing: "linear",
    });
  }
  move("pivot", [
    { offset: 0, transform: `translate(${-walkDistance}px, 0) rotate(-.3deg)` },
    { offset: .055, transform: `translate(${-walkDistance - 4}px, -2px) rotate(-.8deg)` },
    { offset: walkStart, transform: `translate(${-walkDistance}px, 0)` },
    ...walk,
    { offset: .352, transform: "translate(4px, 3px) rotate(1.4deg)" },
    { offset: .389, transform: "translate(1px, 1px) rotate(.3deg)" },
    { offset: .419, transform: "translate(3px, 2px) rotate(1.1deg)" },
    { offset: rooWelcomeStory.sniffEnd, transform: "none" },
    { offset: .49, transform: "translate(-2px, -3px) rotate(-.5deg)" },
    { offset: rooWelcomeStory.cravingEnd, transform: "none" },
    { offset: .594, transform: "translate(0, -2px) rotate(-.5deg)" },
    { offset: .62, transform: "none" },
    { offset: .646, transform: "translate(0, -1px) rotate(-.3deg)" },
    { offset: .69, transform: "none" },
    { offset: 1, transform: "none" },
  ]);

  const legs = [
    { name: "rear-near", origin: "310px 960px", phase: Math.PI * 1.5, amplitude: 4.1 },
    { name: "rear-far", origin: "455px 970px", phase: Math.PI * .55, amplitude: 3.7 },
    { name: "front-near", origin: "685px 965px", phase: 0, amplitude: 4.8 },
    { name: "front-far", origin: "850px 965px", phase: Math.PI * 1.04, amplitude: 4.2 },
  ];
  for (const { name, origin, phase, amplitude } of legs) {
    const element = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (element) element.style.transformOrigin = origin;
    const frames: Keyframe[] = [{ offset: 0, transform: "none" }, { offset: walkStart, transform: "none", easing: "linear" }];
    for (let step = 1; step <= 48; step++) {
      const t = step / 48;
      const weight = Math.min(1, t * 5) * Math.min(1, (1 - t) * 6);
      const stride = Math.sin(t * Math.PI * 4.4 + phase + Math.sin(t * Math.PI) * .16);
      frames.push({
        offset: walkStart + (walkEnd - walkStart) * t,
        transform: `translate(0, ${-Math.max(0, stride) * 2.5 * weight}px) rotate(${stride * amplitude * weight}deg)`,
        easing: "linear",
      });
    }
    frames.push({ offset: .33, transform: "none" }, { offset: 1, transform: "none" });
    move(name, frames);
  }

  move("tail", [
    { offset: 0, transform: "rotate(-1deg)" },
    { offset: .09, transform: "rotate(2deg)" },
    { offset: .18, transform: "rotate(-3deg)" },
    { offset: .27, transform: "rotate(3deg)" },
    { offset: .365, transform: "rotate(-2deg)" },
    { offset: rooWelcomeStory.sniffEnd, transform: "rotate(3deg)" },
    { offset: .48, transform: "rotate(-10deg)" },
    { offset: .515, transform: "rotate(13deg)" },
    { offset: .551, transform: "rotate(-12deg)" },
    { offset: .589, transform: "rotate(14deg)" },
    { offset: .623, transform: "rotate(-11deg)" },
    { offset: .662, transform: "rotate(10deg)" },
    { offset: .695, transform: "rotate(-6deg)" },
    { offset: .724, transform: "rotate(2deg)" },
    { offset: rooWelcomeStory.flightStart, transform: "none" },
    { offset: 1, transform: "none" },
  ]);
  move("head", [
    // A quick, restrained double take precedes the approach to the food.
    { offset: 0, transform: "rotate(-1deg)" },
    { offset: .045, transform: "translate(-3px, -6px) rotate(-5deg) scale(1.012)" },
    { offset: .078, transform: "translate(1px, -2px) rotate(-2.8deg)" },
    { offset: walkStart, transform: "rotate(-1.5deg)" },
    { offset: .15, transform: "rotate(1.2deg)" },
    { offset: .198, transform: "rotate(-1.4deg)" },
    { offset: .251, transform: "rotate(.9deg)" },
    { offset: walkEnd, transform: "none" },
    // Two unequal sniffs: the paws stay planted while nose and neck lean in.
    { offset: .353, transform: "translate(8px, 16px) rotate(3.4deg)" },
    { offset: .389, transform: "translate(2px, 5px) rotate(1.2deg)" },
    { offset: .419, transform: "translate(7px, 13px) rotate(2.9deg)" },
    { offset: rooWelcomeStory.sniffEnd, transform: "none" },
    { offset: .49, transform: "rotate(-2.8deg)" },
    { offset: .537, transform: "rotate(-1.2deg)" },
    { offset: rooWelcomeStory.cravingEnd, transform: "none" },
    { offset: .592, transform: "translate(0, -2px) rotate(-1.6deg)" },
    { offset: .619, transform: "none" },
    { offset: .644, transform: "translate(0, -1px) rotate(-1.1deg)" },
    { offset: .686, transform: "none" },
    { offset: rooWelcomeStory.flightStart, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("mouth", [
    { offset: 0, opacity: 0, transform: "scaleY(.78)" },
    { offset: rooWelcomeStory.barkStart, opacity: 0, transform: "scaleY(.78)" },
    { offset: .597, opacity: 1, transform: "scaleY(1)" },
    { offset: .616, opacity: 0, transform: "scaleY(.78)" },
    { offset: .632, opacity: 0, transform: "scaleY(.78)" },
    { offset: .645, opacity: 1, transform: "scaleY(1)" },
    { offset: .668, opacity: 0, transform: "scaleY(.78)" },
    { offset: 1, opacity: 0, transform: "scaleY(.78)" },
  ]);
  move("surprise", [
    { offset: 0, opacity: 0 }, { offset: .018, opacity: 1 },
    { offset: .072, opacity: 1 }, { offset: rooWelcomeStory.noticeEnd + .002, opacity: 0 },
    { offset: 1, opacity: 0 },
  ]);
  move("craving", [
    { offset: 0, opacity: 0 }, { offset: rooWelcomeStory.sniffEnd, opacity: 0 },
    { offset: .471, opacity: 1 }, { offset: .54, opacity: 1 },
    { offset: .577, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("burger", [
    { offset: 0, opacity: 0 }, { offset: .035, opacity: 1 },
    { offset: .665, opacity: 1 }, { offset: .73, opacity: 0 },
    { offset: 1, opacity: 0 },
  ]);
  move("aroma", [
    { offset: 0, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: walkEnd, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: .35, opacity: .72, transform: "translate(0, 0)" },
    { offset: .389, opacity: .32, transform: "translate(-8px, -5px)" },
    { offset: .416, opacity: .7, transform: "translate(0, 0)" },
    { offset: .46, opacity: 0, transform: "translate(-8px, -6px)" },
    { offset: 1, opacity: 0, transform: "translate(-8px, -6px)" },
  ]);
}
