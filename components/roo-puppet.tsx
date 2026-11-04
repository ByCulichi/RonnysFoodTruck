"use client";

import { getImageProps } from "next/image";
import { useId, type CSSProperties, type Ref } from "react";
import { rooHeadOutline, rooHeadProportion, rooWelcomeArt } from "@/lib/roo-welcome-art";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { WelcomeBurger } from "@/components/welcome-burger";
import { RooMotionCels, RooMotionRig, animateRooMotionCels } from "@/components/roo-motion-cels";
import { footPose } from "@/lib/roo-gait";
import { motionFrameTime, riseHeadFrames, rigJoints, rooTurnFrames } from "@/lib/roo-motion-cels";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason, welcomeSeasonOutfits } from "@/lib/welcome-season";
import { WelcomeCostumeDefinitions, WelcomeHeadCostume, WelcomeHeadUnderlay } from "@/components/welcome-costume";

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

const headPoints = rooHeadOutline.map(point => point.join(",")).join(" ");

export function RooPuppet({ puppetRef, style, season = activeWelcomeSeason }: { puppetRef: Ref<SVGSVGElement>; style: CSSProperties; season?: CinemaSeason }) {
  const id = `roo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return <svg ref={puppetRef} className="roo-welcome-character roo-puppet" style={style} viewBox="0 0 1254 1254" role="img" aria-label={`Roo, el chihuahua de ${welcomeSeasonOutfits[season].outfit}, dando la bienvenida`} data-roo-puppet="true" data-welcome-outfit={season}>
    <defs>
      <image id={`${id}-skin`} href={rooPuppetSources.closed} width="1254" height="1254" />
      <clipPath id={`${id}-head`}><polygon points={headPoints} /></clipPath>
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
    <ellipse data-roo-part="ground-shadow" cx="710" cy="1230" rx="375" ry="32" fill="#10081b" opacity="0" aria-hidden="true" />
    <g data-roo-part="pivot">
      <RooMotionCels kind="rise" season={season} />
      <g data-roo-part="body-rig">
        <RooMotionRig season={season} />
      </g>
      <g data-roo-part="head-visibility"><g data-roo-part="head"><g data-roo-part="head-proportion">
        <WelcomeHeadUnderlay season={season} />
        <g mask={season === "halloween" ? undefined : `url(#${id}-costume-head)`}>
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
      </g></g></g>
      <RooMotionCels kind="turn" season={season} sourceId={`${id}-skin`} />
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
    const cullHidden = ["motion-rise", "body-rig", "motion-turn", "head-visibility", "mouth", "surprise", "craving", "eyelids"].includes(name);
    animate(joint, frames.slice().sort((a, b) => Number(a.offset) - Number(b.offset)).map(frame => ({
      ...frame,
      ...(cullHidden && frame.opacity !== undefined ? { display: Number(frame.opacity) > 0 ? "inline" : "none" } : {}),
      easing: frame.easing || "cubic-bezier(.37, 0, .32, 1)",
    })), { duration, fill: "both", easing: "linear" });
  };
  const { restEnd, riseStart, riseEnd, walkStart, walkEnd, sniffEnd, cravingEnd, spinStart, spinEnd, barkStart, flightStart } = rooWelcomeStory;
  const walkDistance = Math.min(rooWelcomeStory.walkDistance, Math.max(0, measuredWalkDistance));
  const turnDrawingsStart = spinStart + (spinEnd - spinStart) * motionFrameTime("turn", 1, rooTurnFrames.length);
  const turnDrawingsEnd = spinStart + (spinEnd - spinStart) * motionFrameTime("turn", rooTurnFrames.length - 1, rooTurnFrames.length);
  // The rise and turn use dense registered cels. Exactly one opaque drawing
  // is visible; the standing rig starts from the exact last rise drawing.
  move("motion-rise", [
    { offset: 0, opacity: 1, easing: "steps(1, end)" },
    { offset: riseEnd, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("body-rig", [
    { offset: 0, opacity: 0, easing: "steps(1, end)" },
    { offset: riseEnd, opacity: 1, easing: "steps(1, end)" },
    { offset: turnDrawingsStart, opacity: 0, easing: "steps(1, end)" },
    { offset: turnDrawingsEnd, opacity: 1 },
    { offset: flightStart + .02, opacity: 1 },
    { offset: .94, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  move("motion-turn", [
    { offset: 0, opacity: 0, easing: "steps(1, end)" },
    { offset: turnDrawingsStart, opacity: 1, easing: "steps(1, end)" },
    { offset: turnDrawingsEnd, opacity: 0 }, { offset: 1, opacity: 0 },
  ]);
  animateRooMotionCels(puppet, duration, animate, {
    rise: { start: riseStart, end: riseEnd },
    turn: { start: spinStart, end: spinEnd },
  });
  const smooth = (t: number) => t * t * (3 - 2 * t);
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
    const weight = Math.sin(t * Math.PI);
    const stride = Math.sin(t * Math.PI * 5.3);
    const x = -walkDistance * (1 - smooth(t));
    walkFrames.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translateX(${x}px)`, easing: "linear" });
    shadowWalk.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translateX(${x}px) scaleX(${1 - Math.abs(stride) * .025 * weight})`, opacity: .22, easing: "linear" });
  }
  const loopFrames: Keyframe[] = [];
  const shadowLoop: Keyframe[] = [];
  for (let step = 1; step <= 36; step++) {
    const t = step / 36, point = spinPoint(t);
    const lift = Math.abs(Math.sin(t * Math.PI * 5)) * 5 * Math.sin(t * Math.PI);
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
  ], "710px 1230px");

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
  ], `${rigJoints.torso.originX}px ${rigJoints.torso.originY}px`);

  const legs = [
    { name: "rear-near", phase: .75, toeX: -72 },
    { name: "rear-far", phase: .275, toeX: 0 },
    { name: "front-near", phase: 0, toeX: 9 },
    { name: "front-far", phase: .52, toeX: 34.2 },
  ] as const;
  for (const { name, phase, toeX } of legs) {
    const joint = rigJoints[name];
    const frames: Keyframe[] = [{ offset: 0, transform: "none" }, { offset: walkStart, transform: "none", easing: "linear" }];
    for (let step = 1; step <= 72; step++) {
      const t = step / 72;
      const foot = footPose(t, phase, walkDistance);
      const angle = foot.angle * Math.PI / 180;
      // Rotate around the real hip, then counter the toe's rotation. During
      // stance its world position stays fixed while the eased body approaches.
      const rotationX = toeX * (Math.cos(angle) - 1) - joint.legLength * Math.sin(angle);
      const rotationY = toeX * Math.sin(angle) + joint.legLength * (Math.cos(angle) - 1);
      frames.push({ offset: walkStart + (walkEnd - walkStart) * t, transform: `translate(${foot.x - rotationX}px, ${foot.y - rotationY}px) rotate(${foot.angle}deg)`, easing: "linear" });
    }
    frames.push({ offset: .441, transform: "none" }, { offset: 1, transform: "none" });
    move(name, frames, `${joint.originX}px ${joint.originY}px`);
  }
  move("tail", [
    { offset: 0, transform: "translate(0, 210px) rotate(-20deg)" },
    { offset: .048, transform: "translate(0, 208px) rotate(-18deg)" },
    { offset: restEnd, transform: "translate(0, 210px) rotate(-20deg)" },
    { offset: .17, transform: "translate(0, 81px) rotate(-8deg)" },
    { offset: riseEnd, transform: "none" },
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
  ], `${rigJoints.tail.originX}px ${rigJoints.tail.originY}px`);
  move("head-visibility", [
    { offset: 0, opacity: 1, easing: "steps(1, end)" },
    { offset: turnDrawingsStart, opacity: 0, easing: "steps(1, end)" },
    { offset: turnDrawingsEnd, opacity: 1 }, { offset: 1, opacity: 1 },
  ]);
  const balancedHead = `translate(${rooHeadProportion.x}px, ${rooHeadProportion.y}px) scale(${rooHeadProportion.scale}) translate(${-rooHeadProportion.x}px, ${-rooHeadProportion.y}px)`;
  move("head-proportion", [
    { offset: 0, transform: balancedHead },
    { offset: flightStart + .01, transform: balancedHead },
    { offset: .975, transform: "none" }, { offset: 1, transform: "none" },
  ]);
  move("head", [
    { offset: 0, transform: `translate(0, ${riseHeadFrames[0].y}px) rotate(5deg)` },
    { offset: riseStart, transform: `translate(0, ${riseHeadFrames[0].y}px) rotate(5deg)` },
    ...riseHeadFrames.slice(1).map(frame => ({ offset: riseStart + (riseEnd - riseStart) * frame.offset, transform: `translate(${frame.x}px, ${frame.y}px) rotate(${frame.angle}deg)`, easing: "linear" })),
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
    { offset: spinStart, transform: "translate(58px, -60px)" },
    { offset: turnDrawingsStart, transform: "translate(58px, -60px)" },
    { offset: .647, transform: "translate(3px, -2px) rotate(3.3deg)" },
    { offset: .682, transform: "translate(-3px, -1px) rotate(-4.4deg)" },
    { offset: .72, transform: "rotate(2.5deg)" },
    { offset: turnDrawingsEnd, transform: "translate(58px, -60px)" },
    { offset: spinEnd, transform: "translate(58px, -60px)" },
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
