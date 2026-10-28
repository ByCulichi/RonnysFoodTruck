"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import "./roo-welcome.css";

/** Times are milliseconds. Geometry is measured again when the viewport changes. */
export const rooWelcomeMotion = {
  duration: 3100,
  imageTimeout: 850,
  maxSize: 380,
  viewportWidth: .72,
  viewportHeight: .44,
  centerY: .40,
  entranceLift: 32,
  entranceTilt: -7,
  flightTilt: -8,
  flightStart: .49,
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
  const size = Math.min(rooWelcomeMotion.maxSize, width * rooWelcomeMotion.viewportWidth, height * rooWelcomeMotion.viewportHeight);
  scene.style.setProperty("--roo-center-x", `${x}px`);
  scene.style.setProperty("--roo-center-y", `${y}px`);
  scene.style.setProperty("--roo-size", `${size}px`);
  scene.style.setProperty("--roo-copy-top", `${y + size / 2 + 18}px`);
  const destination = { x: target.left + target.width / 2, y: target.top + target.height / 2, width: target.width };
  return { x: x - destination.x, y: y - destination.y, scale: size / target.width, destination };
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
    { offset: 0, transform: pose(x, y + rooWelcomeMotion.entranceLift, scale * .88, rooWelcomeMotion.entranceTilt), opacity: 0, easing: "cubic-bezier(.16, 1, .3, 1)" },
    { offset: .20, transform: pose(x, y - 5, scale * 1.018, 1.5), opacity: 1, easing: "ease-in-out" },
    { offset: .29, transform: pose(x, y, scale), opacity: 1, easing: "ease-in-out" },
    { offset: .39, transform: pose(x, y - 4, scale, -2), opacity: 1, easing: "ease-in-out" },
    { offset: rooWelcomeMotion.flightStart, transform: pose(x, y, scale), opacity: 1 },
    ...flightFrames({ x, y, scale }, rooWelcomeMotion.flightStart),
  ];
}

export function RooWelcome() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sceneRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current, image = imageRef.current, scene = sceneRef.current;
    if (!anchor || !image || !scene) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preparationStarted = performance.now();
    const animations: Animation[] = [];
    const removeListeners: (() => void)[] = [];
    let stopped = false;
    let character: Animation | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    function finish(remember = true) {
      if (stopped) return;
      stopped = true;
      if (remember) welcomeAttempted = true;
      // Restore the real, already reserved navbar box BEFORE canceling effects.
      // This is the same image node throughout; there is no clone or handoff.
      anchor!.dataset.welcomeState = "done";
      scene!.dataset.state = "done";
      animations.forEach(animation => animation.cancel());
      clearTimeout(deadline);
      clearTimeout(watchdog);
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
      // Decode this exact original asset before hiding the site behind a flight.
      // Slow / missing imagery simply skips the sequence, never holds the site.
      await image!.decode();
      if (stopped) return;
      if (!image!.naturalWidth || !anchor!.getBoundingClientRect().width) { finish(); return; }
      clearTimeout(deadline);
      welcomeAttempted = true;
      let geometry = measureWelcome(anchor!, scene!);
      let elapsedBeforeResize = 0;
      anchor!.dataset.welcomeState = "running";
      scene!.dataset.state = "running";
      // Keep the complete experience near three seconds on a cold image cache.
      const duration = Math.max(rooWelcomeMotion.duration * .8, rooWelcomeMotion.duration - Math.max(0, performance.now() - preparationStarted - 100));
      const animate = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, options);
        animation.id = `roo-welcome-${element.className}`;
        animations.push(animation);
        return animation;
      };
      character = animate(image!, welcomeFrames(geometry), { duration, fill: "both", easing: "linear" });
      animate(scene!, [
        { offset: 0, opacity: 1 },
        { offset: .54, opacity: 1, easing: "cubic-bezier(.4, 0, .2, 1)" },
        { offset: .93, opacity: 0 },
        { offset: 1, opacity: 0 },
      ], { duration, fill: "both" });
      if (copyRef.current) animate(copyRef.current, [
        { offset: 0, opacity: 0, transform: "translateY(16px)", easing: "ease-out" },
        { offset: .16, opacity: 0, transform: "translateY(16px)", easing: "cubic-bezier(.16, 1, .3, 1)" },
        { offset: .31, opacity: 1, transform: "translateY(0)", easing: "ease-in-out" },
        { offset: .48, opacity: 1, transform: "translateY(0)", easing: "ease-in" },
        { offset: .61, opacity: 0, transform: "translateY(-12px)" },
        { offset: 1, opacity: 0, transform: "translateY(-12px)" },
      ], { duration, fill: "both" });
      if (glowRef.current) animate(glowRef.current, [
        { opacity: 0, transform: "scale(.88) rotate(-8deg)" },
        { offset: .3, opacity: 1, transform: "scale(1) rotate(0deg)" },
        { offset: .54, opacity: 1, transform: "scale(1.03) rotate(3deg)" },
        { opacity: 0, transform: "scale(1.1) rotate(5deg)" },
      ], { duration, fill: "both", easing: "ease-in-out" });

      const remeasure = () => {
        if (stopped) return;
        try {
          const next = measureWelcome(anchor!, scene!);
          if (JSON.stringify(next) === JSON.stringify(geometry)) return;
          const elapsed = elapsedBeforeResize + Number(character!.currentTime ?? 0);
          const remaining = duration - elapsed;
          if (remaining < 80) { finish(); return; }
          const matrix = new DOMMatrixReadOnly(getComputedStyle(image!).transform);
          // Rebase the CURRENT visible pose to the new reserved navbar box.
          // Orientation changes keep Roo's screen position, size and angle,
          // then continue toward the newly measured destination without a jump.
          const current = {
            x: geometry.destination.x + matrix.e - next.destination.x,
            y: geometry.destination.y + matrix.f - next.destination.y,
            scale: Math.hypot(matrix.a, matrix.b) * geometry.destination.width / next.destination.width,
          };
          const tilt = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
          const frames: Keyframe[] = [{ offset: 0, transform: pose(current.x, current.y, current.scale, tilt), opacity: getComputedStyle(image!).opacity }];
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
  }, []);

  const safetyStyle = { "--roo-welcome-failsafe": `${rooWelcomeMotion.duration + rooWelcomeMotion.imageTimeout + 500}ms` } as CSSProperties;
  return <>
    <span ref={anchorRef} className="roo-welcome-anchor" data-welcome-state="pending" style={safetyStyle}>
      <Image ref={imageRef} className="roo-welcome-character" src="/images/brand/ronny-wizard-head.png" alt="Ronny con sombrero de hechicero de Halloween" width={1254} height={1254} sizes={`(max-width: ${Math.ceil(rooWelcomeMotion.maxSize / rooWelcomeMotion.viewportWidth)}px) ${rooWelcomeMotion.viewportWidth * 100}vw, ${rooWelcomeMotion.maxSize}px`} priority />
    </span>
    <span ref={sceneRef} className="roo-welcome-scene" data-state="pending" style={safetyStyle} aria-hidden="true">
      <span ref={glowRef} className="roo-welcome-glow"><span /><span /><i>✦</i><i>✦</i><i>✧</i></span>
      <span ref={copyRef} className="roo-welcome-copy"><span>¡Bienvenido a</span><strong>Ronny’s!</strong></span>
    </span>
    <noscript><style>{`.roo-welcome-scene{display:none!important}.brand .roo-welcome-anchor .roo-welcome-character{opacity:1!important;animation:none!important}.site-header:has(.roo-welcome-scene){backdrop-filter:blur(18px)!important}`}</style></noscript>
  </>;
}
