"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties, type Ref } from "react";
import { rooHeadOutline, rooWelcomeArt } from "@/lib/roo-welcome-art";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { WelcomeBurger } from "@/components/welcome-burger";
import { RooBodyPose, RooTurnViews } from "@/components/roo-pose-art";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason, welcomeSeasonOutfits } from "@/lib/welcome-season";
import { WelcomeBodyCostume, WelcomeCostumeDefinitions, WelcomeHeadCostume, WelcomeHeadUnderlay } from "@/components/welcome-costume";

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

export function RooPuppet({ puppetRef, style, season = activeWelcomeSeason }: { puppetRef: Ref<SVGSVGElement>; style: CSSProperties; season?: CinemaSeason }) {
  const id = `roo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const part = (name: keyof typeof regions) => <g data-roo-part={name}><use href={`#${id}-skin`} clipPath={`url(#${id}-${name})`} mask={name === "tail" ? undefined : `url(#${id}-body-only)`} /></g>;
  return <svg ref={puppetRef} className="roo-welcome-character roo-puppet" style={style} viewBox="0 0 1254 1254" role="img" aria-label={`Roo, el chihuahua de ${welcomeSeasonOutfits[season].outfit}, dando la bienvenida`} data-roo-puppet="true" data-welcome-outfit={season}>
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
      <WelcomeCostumeDefinitions id={id} season={season} />
    </defs>
    <ellipse data-roo-part="ground-shadow" cx="568" cy="1230" rx="403" ry="32" fill="#10081b" opacity="0" aria-hidden="true" />
    <g data-roo-part="pivot">
      <RooBodyPose pose="rest" season={season} />
      <RooBodyPose pose="rise" season={season} />
      <g data-roo-part="body-rig">
      {part("rear-far")}{part("front-far")}{part("tail")}
      <g data-roo-part="torso">
        <g mask={`url(#${id}-costume-body)`}><use href={`#${id}-skin`} mask={`url(#${id}-torso)`} /></g>
        <WelcomeBodyCostume season={season} />
      </g>
      {part("rear-near")}{part("front-near")}
      </g>
      <g data-roo-part="head">
        <WelcomeHeadUnderlay season={season} />
        <g mask={`url(#${id}-costume-head)`}>
          <use href={`#${id}-skin`} clipPath={`url(#${id}-head)`} />
          <g data-roo-part="surprise"><image data-roo-surprise-cel="true" width="1254" height="1254" mask={`url(#${id}-face)`} /></g>
          <g data-roo-part="craving">
            <image data-roo-craving-cel="true" width="1254" height="1254" mask={`url(#${id}-face)`} />
            <path d="M1137 456v32m-16-16h32M1170 530v20m-10-10h20" fill="none" stroke="#ffe3a4" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g data-roo-part="mouth"><image data-roo-mouth-cel="true" width="1254" height="1254" mask={`url(#${id}-mouth)`} /></g>
          {/* A closed-eye cel is vector-only and appears just during two blinks. */}
          <g data-roo-part="eyelids" opacity="0" aria-hidden="true">
            <ellipse cx="731" cy="626" rx="96" ry="91" transform="rotate(-11 731 626)" fill="#e9a649" />
            <ellipse cx="1007" cy="574" rx="68" ry="83" transform="rotate(-16 1007 574)" fill="#e9a649" />
            <path d="M652 623Q728 669 802 615M953 572Q1007 603 1061 559" fill="none" stroke="#5e2d19" strokeWidth="9" strokeLinecap="round" />
          </g>
        </g>
        <WelcomeHeadCostume season={season} />
      </g>
      <RooTurnViews season={season} />
    </g>
    <g data-roo-part="aroma" fill="none" stroke="#ffe2b7" strokeWidth="6" strokeLinecap="round" aria-hidden="true">
      <path d="M1065 802c-38-7-12-38-54-46s-11-28-43-38M1112 791c-45-15-15-41-52-55M1130 815c-39-12-5-34-30-47" />
    </g>
    <WelcomeBurger />
  </svg>;
}

type RegisterAnimation = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Animation;

/** Each curve is sampled once; the compositor owns the finite performance. */
export function animateRooPuppet(puppet: SVGSVGElement, duration: number, animate: RegisterAnimation, measuredWalkDistance: number = rooWelcomeStory.walkDistance) {
  const move = (name: string, frames: Keyframe[], origin?: string) => {
    const joint = puppet.querySelector<SVGElement>(`[data-roo-part="${name}"]`);
    if (!joint) return;
    if (origin) joint.style.transformOrigin = origin;
    animate(joint, frames.slice().sort((a, b) => Number(a.offset) - Number(b.offset)).map(frame => ({ ...frame, easing: frame.easing || "cubic-bezier(.37, 0, .32, 1)" })), { duration, fill: "both", easing: "linear" });
  };
  const { restEnd, riseStart, riseEnd, walkStart, walkEnd, sniffEnd, cravingEnd, spinStart, spinEnd, barkStart, flightStart } = rooWelcomeStory;
  const walkDistance = Math.min(rooWelcomeStory.walkDistance, Math.max(0, measuredWalkDistance));
  move("pose-rest", [
    { offset: 0, opacity: 1, transform: "none" },
    { offset: .05, opacity: 1, transform: "translateY(-2px)" },
    { offset: .145, opacity: 1, transform: "none" },
    { offset: .153, opacity: 0, transform: "translateY(-8px)" },
    { offset: 1, opacity: 0, transform: "none" },
  ]);
  move("pose-rise", [
    { offset: 0, opacity: 0 }, { offset: .145, opacity: 0 },
    { offset: .153, opacity: 1 }, { offset: .217, opacity: 1 },
    { offset: .225, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("body-rig", [
    { offset: 0, opacity: 0 }, { offset: .217, opacity: 0 },
    { offset: .225, opacity: 1 }, { offset: .626, opacity: 1 },
    { offset: .629, opacity: 0 }, { offset: .739, opacity: 0 },
    { offset: .742, opacity: 1 }, { offset: 1, opacity: 1 },
  ]);
  // Directional cels blend for about one compositor frame, so their distinct
  // silhouettes read as a turn without long translucent ears or extra paws.
  move("turn-profile-right", [
    { offset: 0, opacity: 0, transform: "none" }, { offset: .626, opacity: 0 },
    { offset: .629, opacity: 1, transform: "translateY(-3px)" },
    { offset: .654, opacity: 1 }, { offset: .657, opacity: 0, transform: "translateY(0)" },
    { offset: 1, opacity: 0 },
  ]);
  move("turn-rear", [
    { offset: 0, opacity: 0, transform: "none" }, { offset: .654, opacity: 0 },
    { offset: .657, opacity: 1, transform: "translateY(-4px)" },
    { offset: .704, opacity: 1 }, { offset: .707, opacity: 0, transform: "none" },
    { offset: 1, opacity: 0 },
  ]);
  move("turn-profile-left", [
    { offset: 0, opacity: 0, transform: "none" }, { offset: .704, opacity: 0 },
    { offset: .707, opacity: 1, transform: "translateY(-3px)" },
    { offset: .739, opacity: 1 }, { offset: .742, opacity: 0, transform: "none" },
    { offset: 1, opacity: 0 },
  ]);
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const spinPoint = (t: number) => {
    // A little circle on the ground, with registered side and rear drawings.
    // The pivot keeps its volume instead of rotating an edge-on flat card.
    const angle = t * Math.PI * 2;
    const envelope = Math.sin(t * Math.PI);
    return { x: Math.sin(angle) * 92, y: (Math.cos(angle) - 1) * 17, tilt: Math.sin(angle - .35) * 7.5 * envelope };
  };
  const walkFrames: Keyframe[] = [];
  const shadowWalk: Keyframe[] = [];
  for (let step = 1; step <= 48; step++) {
    const t = step / 48;
    const weight = Math.sin(t * Math.PI);
    const stride = Math.sin(t * Math.PI * 5.3);
    const x = -walkDistance * (1 - smooth(t));
    walkFrames.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translate(${x}px, ${-Math.abs(stride) * 4 * weight}px) rotate(${stride * .8 * weight}deg)`, easing: "linear" });
    shadowWalk.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translateX(${x}px) scaleX(${1 - Math.abs(stride) * .025 * weight})`, opacity: .22, easing: "linear" });
  }
  const loopFrames: Keyframe[] = [];
  const shadowLoop: Keyframe[] = [];
  for (let step = 1; step <= 36; step++) {
    const t = step / 36, point = spinPoint(t);
    const lift = Math.abs(Math.sin(t * Math.PI * 5)) * 7 * Math.sin(t * Math.PI);
    loopFrames.push({ offset: spinStart + (spinEnd - spinStart) * t, transform: `translate(${point.x}px, ${point.y - lift}px) rotate(${point.tilt}deg)`, easing: "linear" });
    shadowLoop.push({ offset: spinStart + (spinEnd - spinStart) * t, transform: `translate(${point.x}px, ${point.y * .2}px) scale(${1 - Math.sin(t * Math.PI) * .08}, ${1 - Math.sin(t * Math.PI) * .12})`, opacity: .22 - lift * .003, easing: "linear" });
  }
  move("pivot", [
    { offset: 0, transform: `translate(${-walkDistance}px, 0)` },
    { offset: restEnd, transform: `translate(${-walkDistance}px, 0)` },
    { offset: .17, transform: `translate(${-walkDistance - 4}px, 3px) rotate(-.5deg)` },
    { offset: riseEnd, transform: `translate(${-walkDistance}px, 0)` },
    { offset: walkStart, transform: `translate(${-walkDistance}px, 0)` },
    ...walkFrames,
    { offset: .457, transform: "translate(4px, 3px) rotate(1.3deg)" },
    { offset: .488, transform: "translate(1px, 0)" },
    { offset: .521, transform: "translate(3px, 2px) rotate(.9deg)" },
    { offset: sniffEnd, transform: "none" },
    { offset: .585, transform: "translate(-2px, -4px) rotate(-.7deg)" },
    { offset: spinStart, transform: "none" },
    ...loopFrames,
    { offset: barkStart, transform: "none" },
    { offset: .78, transform: "translate(0, -3px) rotate(-.6deg)" },
    { offset: .811, transform: "none" },
    { offset: flightStart, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("ground-shadow", [
    { offset: 0, transform: `translateX(${-walkDistance}px) scale(1.02, 1.12)`, opacity: 0 },
    { offset: .025, transform: `translateX(${-walkDistance}px) scale(1.02, 1.12)`, opacity: .25 },
    { offset: riseStart, transform: `translateX(${-walkDistance}px) scale(1.02, 1.12)`, opacity: .25 },
    { offset: riseEnd, transform: `translateX(${-walkDistance}px) scale(1, 1)`, opacity: .22 },
    { offset: walkStart, transform: `translateX(${-walkDistance}px)`, opacity: .22 },
    ...shadowWalk,
    { offset: spinStart, transform: "none", opacity: .22 },
    ...shadowLoop,
    { offset: .84, opacity: .22, transform: "none" },
    { offset: .89, opacity: 0, transform: "scale(.8, .7)" },
    { offset: 1, opacity: 0, transform: "scale(.8, .7)" },
  ], "568px 1230px");

  // Only the torso compresses during rest. The face and hat retain their shape;
  // the four paws tuck independently, then press into the ground to stand.
  move("torso", [
    { offset: 0, transform: "translate(0, 140px) scale(1.015, .62)" },
    { offset: .044, transform: "translate(0, 137px) scale(1.018, .635)" },
    { offset: restEnd, transform: "translate(0, 140px) scale(1.015, .62)" },
    { offset: .138, transform: "translate(-4px, 124px) scale(1.02, .68)" },
    { offset: .191, transform: "translate(-3px, 38px) scale(1.01, .91)" },
    { offset: riseEnd, transform: "none" },
    { offset: walkEnd, transform: "none" },
    { offset: .458, transform: "scale(1.005, 1.008)" },
    { offset: .49, transform: "none" },
    { offset: .523, transform: "scale(1.004, 1.006)" },
    { offset: sniffEnd, transform: "none" },
    { offset: spinStart, transform: "none" },
    { offset: .66, transform: "rotate(-1.8deg) scale(1.01, .99)" },
    { offset: .707, transform: "rotate(1.4deg)" },
    { offset: spinEnd, transform: "none" },
    { offset: .781, transform: "scale(1.004, 1.013)" },
    { offset: .81, transform: "none" }, { offset: 1, transform: "none" },
  ], "590px 1000px");

  const legs = [
    { name: "rear-near", origin: "310px 960px", phase: Math.PI * 1.5, amplitude: 4.7, rest: "translate(10px, 205px) rotate(-12deg) scaleY(.24)", push: "translate(4px, 72px) rotate(-8deg) scaleY(.66)", release: .221 },
    { name: "rear-far", origin: "455px 970px", phase: Math.PI * .55, amplitude: 4.2, rest: "translate(-5px, 195px) rotate(-8deg) scaleY(.27)", push: "translate(-2px, 63px) rotate(-5deg) scaleY(.74)", release: .23 },
    { name: "front-near", origin: "685px 965px", phase: 0, amplitude: 5.5, rest: "translate(115px, 205px) rotate(-13deg) scaleY(.28)", push: "translate(0, 40px) rotate(-11deg) scaleY(.96)", release: .206 },
    { name: "front-far", origin: "850px 965px", phase: Math.PI * 1.04, amplitude: 4.9, rest: "translate(80px, 195px) rotate(-7deg) scaleY(.32)", push: "translate(0, 45px) rotate(-8deg) scaleY(.9)", release: .214 },
  ];
  for (const { name, origin, phase, amplitude, rest, push, release } of legs) {
    const frames: Keyframe[] = [
      { offset: 0, transform: rest, opacity: 0 }, { offset: riseStart, transform: rest, opacity: 0 },
      { offset: .125, opacity: 0 }, { offset: .169, transform: push },
      { offset: .175, opacity: 1 }, { offset: release, transform: "none" },
      { offset: walkStart, transform: "none", easing: "linear" },
    ];
    for (let step = 1; step <= 48; step++) {
      const t = step / 48;
      const weight = Math.min(1, t * 5) * Math.min(1, (1 - t) * 6);
      const cycle = (t * 2.2 + phase / (Math.PI * 2)) % 1;
      const planted = cycle < .62;
      const progress = planted ? cycle / .62 : (cycle - .62) / .38;
      const footX = (planted ? 44 - 88 * progress : -44 + 88 * smooth(progress)) * weight;
      const angle = -footX / 44 * amplitude;
      // A planted paw travels back relative to the shoulder as the body moves
      // forward; the return stroke lifts its toes instead of skating sideways.
      const rotationX = -260 * Math.sin(angle * Math.PI / 180);
      const footY = planted ? 0 : -Math.sin(progress * Math.PI) * 19 * weight;
      frames.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translate(${footX - rotationX}px, ${footY}px) rotate(${angle}deg)`, easing: "linear" });
    }
    frames.push({ offset: .441, transform: "none" }, { offset: spinStart, transform: "none" });
    for (let step = 1; step <= 32; step++) {
      const t = step / 32;
      const weight = Math.sin(t * Math.PI);
      const stepCycle = Math.sin(t * Math.PI * 5.5 + phase);
      frames.push({ offset: spinStart + (spinEnd - spinStart) * t, transform: `translate(${Math.sin(t * Math.PI * 2 + phase) * 5 * weight}px, ${-Math.max(0, stepCycle) * 8 * weight}px) rotate(${stepCycle * amplitude * 1.45 * weight}deg)`, easing: "linear" });
    }
    frames.push({ offset: barkStart, transform: "none" }, { offset: 1, transform: "none", opacity: 1 });
    move(name, frames, origin);
  }
  move("tail", [
    { offset: 0, transform: "translate(0, 210px) rotate(-20deg)" },
    { offset: .048, transform: "translate(0, 208px) rotate(-18deg)" },
    { offset: restEnd, transform: "translate(0, 210px) rotate(-20deg)" },
    { offset: .17, transform: "translate(0, 81px) rotate(-8deg)" },
    { offset: riseEnd, transform: "rotate(-2deg)" },
    { offset: .29, transform: "rotate(4deg)" },
    { offset: .352, transform: "rotate(-3deg)" },
    { offset: walkEnd, transform: "rotate(3deg)" },
    { offset: .49, transform: "rotate(-2deg)" },
    { offset: sniffEnd, transform: "rotate(4deg)" },
    { offset: .58, transform: "rotate(-11deg)" },
    { offset: cravingEnd, transform: "rotate(14deg)" },
    { offset: .632, transform: "rotate(-16deg)" },
    { offset: .653, transform: "rotate(17deg)" },
    { offset: .677, transform: "rotate(-15deg)" },
    { offset: .7, transform: "rotate(17deg)" },
    { offset: .723, transform: "rotate(-13deg)" },
    { offset: spinEnd, transform: "rotate(12deg)" },
    { offset: .771, transform: "rotate(-9deg)" },
    { offset: .796, transform: "rotate(8deg)" },
    { offset: .818, transform: "rotate(-4deg)" },
    { offset: flightStart, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("head", [
    { offset: 0, opacity: 1 }, { offset: .626, opacity: 1 },
    { offset: .629, opacity: 0 }, { offset: .739, opacity: 0 },
    { offset: .742, opacity: 1 }, { offset: 1, opacity: 1 },
    { offset: 0, transform: "translate(-12px, 200px) rotate(5deg)" },
    { offset: .044, transform: "translate(-12px, 197px) rotate(4.7deg)" },
    { offset: restEnd, transform: "translate(-12px, 200px) rotate(5deg)" },
    { offset: .12, transform: "translate(-9px, 163px) rotate(-1deg)" },
    { offset: .16, transform: "translate(-5px, 91px) rotate(-5deg)" },
    { offset: .209, transform: "translate(1px, 3px) rotate(-1.7deg)" },
    { offset: walkStart, transform: "none" },
    { offset: .29, transform: "rotate(1.4deg)" },
    { offset: .335, transform: "rotate(-1.6deg)" },
    { offset: .38, transform: "rotate(.9deg)" },
    { offset: walkEnd, transform: "none" },
    { offset: .457, transform: "translate(9px, 19px) rotate(3.7deg)" },
    { offset: .489, transform: "translate(2px, 4px) rotate(.9deg)" },
    { offset: .521, transform: "translate(8px, 15px) rotate(3deg)" },
    { offset: sniffEnd, transform: "none" },
    { offset: .586, transform: "translate(-2px, -3px) rotate(-3.3deg)" },
    { offset: spinStart, transform: "rotate(-1deg)" },
    { offset: .647, transform: "translate(3px, -2px) rotate(3.3deg)" },
    { offset: .682, transform: "translate(-3px, -1px) rotate(-4.4deg)" },
    { offset: .72, transform: "rotate(2.5deg)" },
    { offset: spinEnd, transform: "none" },
    { offset: barkStart, transform: "none" },
    { offset: .781, transform: "translate(0, -3px) rotate(-2deg)" },
    { offset: .807, transform: "rotate(-.7deg)" },
    { offset: flightStart, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("eyelids", [
    { offset: 0, opacity: 1 }, { offset: .058, opacity: 1 },
    { offset: .084, opacity: 0 },
    { offset: .575, opacity: 0 }, { offset: .583, opacity: 1 },
    { offset: .593, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("mouth", [
    { offset: 0, opacity: 0, transform: "scaleY(.78)" },
    { offset: barkStart, opacity: 0, transform: "scaleY(.78)" },
    { offset: .778, opacity: 1, transform: "scaleY(1)" },
    { offset: .797, opacity: .7, transform: "scaleY(.94)" },
    { offset: .824, opacity: 0, transform: "scaleY(.78)" },
    { offset: 1, opacity: 0, transform: "scaleY(.78)" },
  ]);
  move("surprise", [
    { offset: 0, opacity: 0 }, { offset: .09, opacity: 0 },
    { offset: .113, opacity: 1 }, { offset: .148, opacity: 1 },
    { offset: rooWelcomeStory.noticeEnd + .009, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("craving", [
    { offset: 0, opacity: 0 }, { offset: sniffEnd, opacity: 0 },
    { offset: .571, opacity: 1 }, { offset: .603, opacity: 1 },
    { offset: .621, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("burger", [
    { offset: 0, opacity: 0 }, { offset: .035, opacity: 1 },
    { offset: .82, opacity: 1 }, { offset: .853, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("aroma", [
    { offset: 0, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: walkEnd, opacity: 0, transform: "translate(5px, 6px)" },
    { offset: .455, opacity: .75, transform: "translate(0, 0)" },
    { offset: .49, opacity: .3, transform: "translate(-8px, -5px)" },
    { offset: .521, opacity: .7, transform: "translate(0, 0)" },
    { offset: .569, opacity: 0, transform: "translate(-8px, -6px)" },
    { offset: 1, opacity: 0, transform: "translate(-8px, -6px)" },
  ]);
}
