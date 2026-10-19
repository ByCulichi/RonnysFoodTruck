"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./halloween-market-scene.css";

const web = "M0 0h175M0 0v175M0 0l175 175M0 0l155 65M0 0l65 155M0 35q20-2 25-10q10-5 10-25M0 75q35-4 53-22q20-18 22-53M0 115q54-5 81-34q30-28 34-81M0 160q75-8 113-47q40-38 47-113";
const bat = "M50 18 44 10 42 20Q23 8 0 0q8 20 15 35 8-12 16-3 8-8 19 13 11-21 19-13 8-9 16 3 7-15 15-35-23 8-42 20l-2-10Z";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const region = sceneRef.current?.parentElement;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  return <>
    <div ref={sceneRef} className="market-night-decoration" aria-hidden="true" data-paused={paused || !visible}>
      <span className="market-moon" />
      <svg className="market-web market-web-left" viewBox="0 0 180 180"><path d={web} /></svg>
      <svg className="market-web market-web-right" viewBox="0 0 180 180"><path d={web} /></svg>
      <span className="market-mist market-mist-one" /><span className="market-mist market-mist-two" />
      {[0, 1, 2, 3, 4, 5].map((index) => <svg key={index} className={`market-bat market-bat-${index}`} viewBox="0 0 100 45"><path d={bat} /></svg>)}
      <Pumpkin className="market-pumpkin market-pumpkin-left" />
      <Pumpkin className="market-pumpkin market-pumpkin-right" />
      {Array.from({ length: 12 }, (_, index) => <span className={`market-ember market-ember-${index}`} key={index} />)}
    </div>
    <button className="market-motion-control" type="button" aria-pressed={paused} aria-label={paused ? "Activar fondo de Halloween" : "Pausar fondo de Halloween"} onClick={() => setPaused(!paused)}>
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{paused ? "Activar fondo" : "Pausar fondo"}</span>
    </button>
  </>;
}
