"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { RooPuppet, animateRooPuppet, rooPuppetSources } from "@/components/roo-puppet";
import { rooWelcomeArt, rooHeadMask as headMask, rooFullMask as fullMask } from "@/lib/roo-welcome-art";
import { rooWelcomeStory } from "@/lib/roo-welcome-story";
import { activeWelcomeSeason, welcomeSeasonOutfits } from "@/lib/welcome-season";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { WelcomeTruck } from "@/components/welcome-truck";
import { rooPoseSources } from "@/components/roo-pose-art";
import "./roo-welcome.css";

/** Times are milliseconds. Geometry is measured again when the viewport changes. */
export const rooWelcomeMotion = {
  duration: 6200,
  imageTimeout: 1200,
  maxSize: 520,
  viewportWidth: .76,
  viewportHeight: .64,
  centerY: .40,
  flightTilt: -6,
  flightStart: rooWelcomeStory.flightStart,
  flightCurve: .22,
} as const;

// A new document (including refresh) gets a new module. Hash links and client
// remounts never replay the welcome. No cookies or sessionStorage are needed.
let welcomeAttempted = false;

function measureWelcome(anchor: HTMLElement, scene: HTMLElement) {
  const target = anchor.getBoundingClientRect();
  const viewport = window.visualViewport;
  const width = viewport?.width ?? window.innerWidth;
  const height = viewport?.height ?? window.innerHeight;
  const x = (viewport?.offsetLeft ?? 0) + width / 2;
  const y = (viewport?.offsetTop ?? 0) + height * rooWelcomeMotion.centerY;
  const size = Math.min(rooWelcomeMotion.maxSize, width * rooWelcomeMotion.viewportWidth * rooWelcomeArt.height / rooWelcomeArt.width, height * rooWelcomeMotion.viewportHeight);
  const sourceScale = size / rooWelcomeArt.height;
  const headSize = rooWelcomeArt.head.size * sourceScale;
  const headX = x + (rooWelcomeArt.head.left + rooWelcomeArt.head.size / 2 - rooWelcomeArt.width / 2) * sourceScale;
  const headY = y + (rooWelcomeArt.head.top + rooWelcomeArt.head.size / 2 - rooWelcomeArt.height / 2) * sourceScale;
  scene.style.setProperty("--roo-center-x", `${x}px`);
  scene.style.setProperty("--roo-center-y", `${y}px`);
  scene.style.setProperty("--roo-size", `${size}px`);
  scene.style.setProperty("--roo-copy-top", `${y + size / 2 + 18}px`);
  const destination = { x: target.left + target.width / 2, y: target.top + target.height / 2, width: target.width };
  // Reserve a real viewport margin for the whole source canvas at the first
  // reaction. Small screens shorten the approach, without shrinking Roo.
  const leftEdge = viewport?.offsetLeft ?? 0;
  const availableApproach = Math.max(0, (x - size / 2 - leftEdge - 10) / sourceScale);
  const walkDistance = Math.min(rooWelcomeStory.walkDistance, availableApproach);
  return { x: headX - destination.x, y: headY - destination.y, scale: headSize / target.width, walkDistance, destination };
}

const pose = (x: number, y: number, scale: number, tilt = 0) => `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) scale(${scale})`;

function flightFrames({ x, y, scale }: { x: number; y: number; scale: number }, start: number, initialTilt = 0): Keyframe[] {
  const frames: Keyframe[] = [];
  // Sample a curved, eased FLIP flight once. The browser composites transform /
  // opacity; there is no React state, layout read or JS work on animation frames.
  for (let step = 1; step <= 64; step++) {
    const time = step / 64;
    const t = time < .5 ? 4 * time ** 3 : 1 - (-2 * time + 2) ** 3 / 2;
    const u = 1 - t;
    const bend = rooWelcomeMotion.flightCurve;
    const dx = u ** 3 * x + 3 * u ** 2 * t * x * (1 - bend) + 3 * u * t ** 2 * x * .12;
    const dy = u ** 3 * y + 3 * u ** 2 * t * y * 1.06 + 3 * u * t ** 2 * y * bend;
    frames.push({
      offset: start + time * (1 - start),
      transform: pose(dx, dy, scale ** (1 - t), initialTilt * (1 - t) + Math.sin(t * Math.PI) * rooWelcomeMotion.flightTilt),
      opacity: 1,
    });
  }
  return frames;
}

function welcomeFrames({ x, y, scale }: ReturnType<typeof measureWelcome>): Keyframe[] {
  return [
    // Hold the stage still: Roo's inner joints walk toward a stationary burger.
    { offset: 0, transform: pose(x, y, scale), opacity: 0 },
    { offset: .04, transform: pose(x, y, scale), opacity: 1 },
    { offset: rooWelcomeMotion.flightStart, transform: pose(x, y, scale), opacity: 1 },
    ...flightFrames({ x, y, scale }, rooWelcomeMotion.flightStart),
  ];
}

export function RooWelcome({ season = activeWelcomeSeason }: { season?: CinemaSeason }) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<SVGSVGElement>(null);
  const figureRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current, image = imageRef.current, figure = figureRef.current, scene = sceneRef.current;
    if (!anchor || !image || !figure || !scene) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preparationStarted = performance.now();
    const animations: Animation[] = [];
    const removeListeners: (() => void)[] = [];
    let stopped = false;
    let character: Animation | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let soundCue: ReturnType<typeof setTimeout> | undefined;
    let barkAudio: HTMLAudioElement | undefined;

    function stopSound() {
      const audio = barkAudio;
      barkAudio = undefined;
      if (!audio) return;
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("src");
        audio.load();
      } catch { /* Audio support never controls the visual welcome. */ }
    }

    function finish(remember = true) {
      if (stopped) return;
      stopped = true;
      if (remember) welcomeAttempted = true;
      // Restore the real, already reserved navbar box BEFORE canceling effects.
      // The same SVG and head remain throughout; there is no clone or handoff.
      anchor!.dataset.welcomeState = "done";
      scene!.dataset.state = "done";
      animations.forEach(animation => animation.cancel());
      image!.querySelector("[data-roo-mouth-cel]")?.removeAttribute("href");
      image!.querySelector("[data-roo-craving-cel]")?.removeAttribute("href");
      image!.querySelector("[data-roo-surprise-cel]")?.removeAttribute("href");
      image!.querySelectorAll("[data-roo-pose-cel]").forEach(cel => cel.removeAttribute("href"));
      clearTimeout(deadline);
      clearTimeout(watchdog);
      clearTimeout(soundCue);
      stopSound();
      removeListeners.forEach(remove => remove());
    }
    const release = () => finish();
    const listen = (target: EventTarget, name: string, listener: EventListener) => {
      target.addEventListener(name, listener, { passive: true, capture: true });
      removeListeners.push(() => target.removeEventListener(name, listener, true));
    };

    if (welcomeAttempted || motion.matches || document.hidden || typeof image.animate !== "function") {
      finish();
      return;
    }

    anchor.dataset.welcomeState = "pending";
    scene.dataset.state = "pending";
    // No scroll locks or focus trap. Anyone who starts interacting gets the page
    // immediately, including keyboard / assistive-technology navigation.
    for (const name of ["pointerdown", "touchstart", "wheel", "keydown", "focusin"]) listen(document, name, release);
    listen(window, "pagehide", release);
    listen(document, "visibilitychange", () => { if (document.hidden) finish(); });
    listen(motion, "change", () => { if (motion.matches) finish(); });
    listen(image, "error", release);
    deadline = setTimeout(release, rooWelcomeMotion.imageTimeout);

    async function start() {
      // Decode the small registered cels before articulating the character.
      // A slow / missing resource skips the sequence, never holds the page.
      const bitmaps = await Promise.all([...Object.values(rooPuppetSources), ...Object.values(rooPoseSources)].map(async src => {
        const bitmap = new window.Image();
        bitmap.src = src;
        await bitmap.decode();
        return bitmap;
      }));
      if (stopped) return;
      if (bitmaps.some(bitmap => !bitmap.naturalWidth) || !anchor!.getBoundingClientRect().width) { finish(); return; }
      image!.querySelector("[data-roo-mouth-cel]")?.setAttribute("href", rooPuppetSources.bark);
      image!.querySelector("[data-roo-craving-cel]")?.setAttribute("href", rooPuppetSources.craving);
      image!.querySelector("[data-roo-surprise-cel]")?.setAttribute("href", rooPuppetSources.surprise);
      image!.querySelectorAll<SVGImageElement>("[data-roo-pose-cel]").forEach(cel => {
        const source = rooPoseSources[cel.dataset.rooPoseCel as keyof typeof rooPoseSources];
        if (source) cel.setAttribute("href", source);
      });
      clearTimeout(deadline);
      welcomeAttempted = true;
      let geometry = measureWelcome(anchor!, scene!);
      let elapsedBeforeResize = 0;
      anchor!.dataset.welcomeState = "running";
      scene!.dataset.state = "running";
      // Leave room for a grounded rise, the approach and a joyful little circle.
      // A slow resource never holds the page; eligible loads stay near six seconds.
      const duration = Math.max(rooWelcomeMotion.duration * .9, rooWelcomeMotion.duration - Math.max(0, performance.now() - preparationStarted - 100));
      const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, options);
        animation.id = `roo-welcome-${element.getAttribute("data-roo-part") || element.getAttribute("class")}`;
        animations.push(animation);
        return animation;
      };
      character = animate(figure!, welcomeFrames(geometry), { duration, fill: "both", easing: "linear" });
      animate(image!, [
        { offset: 0, clipPath: fullMask },
        { offset: rooWelcomeMotion.flightStart + .01, clipPath: fullMask, easing: "cubic-bezier(.4, 0, .2, 1)" },
        { offset: .975, clipPath: headMask },
        { offset: 1, clipPath: headMask },
      ], { duration, fill: "both" });
      animateRooPuppet(image!, duration, animate, geometry.walkDistance);
      animate(scene!, [
        { offset: 0, opacity: 1 },
        { offset: rooWelcomeMotion.flightStart + .01, opacity: 1, easing: "cubic-bezier(.4, 0, .2, 1)" },
        { offset: .99, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration, fill: "both" });
      if (copyRef.current) animate(copyRef.current, [
        { offset: 0, opacity: 0, transform: "translateY(16px)", easing: "ease-out" },
        { offset: rooWelcomeStory.greetingStart, opacity: 0, transform: "translateY(16px)", easing: "cubic-bezier(.16, 1, .3, 1)" },
        { offset: rooWelcomeStory.greetingStart + .018, opacity: 1, transform: "translateY(0)", easing: "ease-in-out" },
        { offset: .895, opacity: 1, transform: "translateY(0)", easing: "ease-in" },
        { offset: .97, opacity: 0, transform: "translateY(-12px)" },
        { offset: 1, opacity: 0, transform: "translateY(-12px)" },
      ], { duration, fill: "both" });
      if (glowRef.current) animate(glowRef.current, [
        { opacity: 0, transform: "scale(.88) rotate(-8deg)" },
        { offset: .2, opacity: 1, transform: "scale(1) rotate(0deg)" },
        { offset: rooWelcomeStory.spinEnd, opacity: 1, transform: "scale(1.03) rotate(3deg)" },
        { opacity: 0, transform: "scale(1.1) rotate(5deg)" },
      ], { duration, fill: "both", easing: "ease-in-out" });
      // A tiny real bark is optional enhancement, never a visual prerequisite.
      // One scheduled attempt only: blocked / late audio stays silent, and an
      // interaction or hidden page clears the cue instead of replaying later.
      try {
        barkAudio = new Audio(rooWelcomeArt.barkSound);
        barkAudio.preload = "auto";
        barkAudio.volume = .44;
        barkAudio.load();
        void character.ready.then(() => {
          if (stopped || !barkAudio) return;
          // WAAPI may start on a later compositor frame. Read its clock once so
          // the real bark follows the mouth, rather than a hydration timestamp.
          const delay = duration * rooWelcomeStory.barkStart - Number(character!.currentTime ?? 0);
          if (delay < 0) { stopSound(); return; }
          soundCue = setTimeout(() => {
            if (stopped || document.hidden || motion.matches || !barkAudio) return;
            const audio = barkAudio;
            if (audio.readyState < 3) { stopSound(); return; }
            try { void audio.play().catch(stopSound); }
            catch { stopSound(); }
          }, delay);
        }).catch(stopSound);
      } catch { stopSound(); }

      const remeasure = () => {
        if (stopped) return;
        try {
          const next = measureWelcome(anchor!, scene!);
          if (JSON.stringify(next) === JSON.stringify(geometry)) return;
          const elapsed = elapsedBeforeResize + Number(character!.currentTime ?? 0);
          const remaining = duration - elapsed;
          if (remaining < 80) { finish(); return; }
          const matrix = new DOMMatrixReadOnly(getComputedStyle(figure!).transform);
          // Rebase the CURRENT visible pose to the new reserved navbar box.
          // Orientation changes keep Roo's screen position, size and angle,
          // then continue toward the newly measured destination without a jump.
          const current = {
            x: geometry.destination.x + matrix.e - next.destination.x,
            y: geometry.destination.y + matrix.f - next.destination.y,
            scale: Math.hypot(matrix.a, matrix.b) * geometry.destination.width / next.destination.width,
          };
          const tilt = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
          const frames: Keyframe[] = [{ offset: 0, transform: pose(current.x, current.y, current.scale, tilt), opacity: getComputedStyle(figure!).opacity }];
          const hold = Math.max(0, (duration * rooWelcomeMotion.flightStart - elapsed) / remaining);
          if (hold > .06) {
            frames[0].easing = "cubic-bezier(.16, 1, .3, 1)";
            frames.push({ offset: hold * .75, transform: pose(next.x, next.y, next.scale), opacity: 1 });
            frames.push({ offset: hold, transform: pose(next.x, next.y, next.scale), opacity: 1 });
            frames.push(...flightFrames(next, hold));
          } else frames.push(...flightFrames(current, 0, tilt));
          const effect = character!.effect as KeyframeEffect;
          effect.setKeyframes(frames);
          effect.updateTiming({ duration: remaining });
          character!.currentTime = 0;
          elapsedBeforeResize = elapsed;
          geometry = next;
        }
        catch { finish(); }
      };
      listen(window, "resize", remeasure);
      if (window.visualViewport) listen(window.visualViewport, "resize", remeasure);
      const observer = new ResizeObserver(remeasure);
      observer.observe(anchor!);
      removeListeners.push(() => observer.disconnect());
      watchdog = setTimeout(release, duration + 250);
      await character.finished;
      finish();
    }
    void start().catch(release);
    return () => finish(false);
  }, [season]);

  const safetyStyle = { "--roo-welcome-failsafe": `${rooWelcomeMotion.duration + rooWelcomeMotion.imageTimeout + 500}ms` } as CSSProperties;
  const figureStyle = { "--roo-head-mask": headMask } as CSSProperties;
  const imageStyle = { width: `${rooWelcomeArt.width / rooWelcomeArt.head.size * 100}%`, height: `${rooWelcomeArt.height / rooWelcomeArt.head.size * 100}%`, left: `${-rooWelcomeArt.head.left / rooWelcomeArt.head.size * 100}%`, top: `${-rooWelcomeArt.head.top / rooWelcomeArt.head.size * 100}%` };
  return <>
    <link rel="preload" as="image" href={rooPuppetSources.closed} />
    <span ref={anchorRef} className="roo-welcome-anchor" data-welcome-state="pending" data-welcome-season={season} data-welcome-outfit={welcomeSeasonOutfits[season].outfit} style={safetyStyle}>
      <span ref={figureRef} className="roo-welcome-figure" style={figureStyle}>
        <RooPuppet puppetRef={imageRef} style={imageStyle} season={season} />
      </span>
    </span>
    <span ref={sceneRef} className="roo-welcome-scene" data-state="pending" data-season={season} style={safetyStyle} aria-hidden="true">
      <WelcomeTruck season={season} />
      <span ref={glowRef} className="roo-welcome-glow"><span /><span /><i>✦</i><i>✦</i><i>✧</i></span>
      <span ref={copyRef} className="roo-welcome-copy"><span>¡Bienvenidos a</span><strong>Ronny’s!</strong></span>
    </span>
    <noscript><style>{`.roo-welcome-scene{display:none!important}.brand .roo-welcome-anchor .roo-welcome-figure{opacity:1!important;animation:none!important}.site-header:has(.roo-welcome-scene){backdrop-filter:blur(18px)!important}`}</style></noscript>
  </>;
}
