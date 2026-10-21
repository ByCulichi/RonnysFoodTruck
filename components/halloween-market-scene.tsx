"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./halloween-market-scene.css";

const web = "M0 0h175M0 0v175M0 0l175 175M0 0l155 65M0 0l65 155M0 35q20-2 25-10q10-5 10-25M0 75q35-4 53-22q20-18 22-53M0 115q54-5 81-34q30-28 34-81M0 160q75-8 113-47q40-38 47-113";
const bat = "M50 18 44 10 42 20Q23 8 0 0q8 20 15 35 8-12 16-3 8-8 19 13 11-21 19-13 8-9 16 3 7-15 15-35-23 8-42 20l-2-10Z";

// A second, static layer gives the delivery/seasons area its own fairground.
// The shared moving mist and bats still obey the main pause control.
export function HalloweenFairground() {
  return <div className="market-fair-decoration" aria-hidden="true">
    <svg className="market-fair-panorama" viewBox="0 0 1600 900" preserveAspectRatio="none" fill="none">
      <path d="M0 180Q800 380 1600 140" stroke="#b7804c" strokeWidth="2" opacity=".55" />
      {[80, 240, 410, 590, 780, 970, 1150, 1330, 1510].map((x, i) => <g key={x} transform={`translate(${x} ${[200, 230, 258, 277, 280, 269, 244, 207, 167][i]})`}><path d="M0-14V0" stroke="#bc8a63" /><path d="M-12 0Q-21 17-10 29H10Q21 17 12 0Z" fill="#b76725" stroke="#e8ac64" /><path d="m-10 11 7 3-1-8Zm20 0-7 3 1-8ZM-6 20q6 6 12 0" stroke="#ffdc8e" strokeWidth="2" /></g>)}
      <path d="M0 760Q270 620 520 780T1100 765Q1370 620 1600 735V900H0Z" fill="#171023" />
      <g fill="#0d0b1a" stroke="#613947" strokeWidth="2">
        <path d="m-40 775 15-215 70-44 70 38-4 243ZM18 519l25-148 22 146M-28 550l70-83 75 82ZM122 786l-4-126 55-47 64 51 1 139ZM111 664l62-86 72 86Z" />
        <path d="m1401 790-5-205 82-72 82 78-5 199ZM1384 590l93-126 95 128ZM1454 514l22-144 24 150M1560 792l-2-142 66-52 49 63v141Z" />
      </g>
      <g fill="#ffad57" opacity=".65"><path d="M13 615q14-23 27 0v47H13ZM65 595q13-22 26 0v52H65ZM156 698q17-28 34 0v43h-34ZM1422 644q18-34 37 0v54h-37ZM1490 610q15-25 30 0v50h-30ZM1581 697q15-25 30 0v42h-30Z" /><path d="M1467 751v-37q15-25 30 0v37Z" /></g>
      <g stroke="#b9866966" strokeWidth="3"><path d="M-5 900 8 801l12 99M20 900l12-123 15 123M130 900l7-100 14 100M1525 900l17-116 12 116M1562 900l15-127 13 127" /></g>
      <g fill="#a96539" opacity=".65"><path d="m65 406 12-9 19 10-14 5-5 14-4-14ZM1510 315l13-10 19 12-17 4-3 13-4-14Z" /><path d="m202 509 8-8 17 6-12 6-4 12-2-12ZM1376 412l10-13 19 5-12 9-2 13-6-10Z" /></g>
    </svg>
    <div className="market-fair-moon" />
  </div>;
}

function Pumpkin({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 180 170" fill="none">
    <path d="m86 35 8-24 14 3-10 25" fill="#786337" />
    <path d="M90 40C26 11-7 83 19 128c17 30 43 28 71 24 30 4 56 6 73-24 27-45-7-117-73-88Z" fill="#66301f" stroke="#cf7435" strokeWidth="2" />
    <path d="M90 42C44 43 44 142 90 151m3-109c45 2 45 99 0 109" stroke="#c56b2b" strokeWidth="3" opacity=".5" />
    <g className="market-pumpkin-face" fill="#ffd78c"><path d="m38 85 33 3-18-23Zm105 0-33 3 18-23ZM84 96l8-14 9 14Z" /><path d="m39 108 18 6 8-7 14 12 12-7 15 5 10-10 24-2-17 23-15 2-14 7-16-6-13 1-13-10Z" /></g>
  </svg>;
}

// Decorative SVG/CSS only: no image downloads, APIs, timers or scroll handlers.
export function HalloweenMarketScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    // The market spans several screens; observe each moving decoration separately.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.setAttribute("data-in-view", String(entry.isIntersecting));
      }
    }, { rootMargin: "80px 0px" });
    scene.parentElement?.querySelectorAll(".market-mist, .market-bat, .market-ember, .ronny-category-orb").forEach((element) => observer.observe(element));
    const updateVisibility = () => { scene.dataset.hidden = String(document.hidden); };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return <>
    <div ref={sceneRef} className="market-night-decoration" aria-hidden="true" data-paused={paused}>
      <span className="market-moon" />
      <svg className="market-web market-web-left" viewBox="0 0 180 180"><path d={web} /></svg>
      <svg className="market-web market-web-right" viewBox="0 0 180 180"><path d={web} /></svg>
      <span className="market-mist market-mist-one" /><span className="market-mist market-mist-two" />
      {[0, 1, 2, 3, 4, 5].map((index) => <svg key={index} className={`market-bat market-bat-${index}`} viewBox="0 0 100 45"><path d={bat} /></svg>)}
      <Pumpkin className="market-pumpkin market-pumpkin-left" />
      <Pumpkin className="market-pumpkin market-pumpkin-right" />
      {Array.from({ length: 12 }, (_, index) => <span className={`market-ember market-ember-${index}`} key={index} />)}
    </div>
    <button className="market-motion-control" type="button" aria-pressed={paused} aria-label={paused ? "Activar movimiento" : "Pausar movimiento"} onClick={() => setPaused(!paused)}>
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{paused ? "Activar movimiento" : "Pausar movimiento"}</span>
    </button>
  </>;
}
