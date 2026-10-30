"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason } from "@/lib/welcome-season";
import { TruckCinema } from "@/components/truck-cinema";

// Clean plates derived from the approved campaign illustrations. The truck,
// camera and atmosphere are preserved; the foreground Roo is removed so the
// articulated character remains the only mascot during the welcome.
export const welcomeTruckArtwork = {
  halloween: { src: "/images/scenes/welcome/truck-halloween.png", width: 1448, height: 1086 },
  muertos: { src: "/images/scenes/welcome/truck-muertos.png", width: 1448, height: 1086 },
  christmas: { src: "/images/scenes/welcome/truck-christmas.png", width: 1448, height: 1086 },
  newyear: { src: "/images/scenes/welcome/truck-newyear.png", width: 1448, height: 1086 },
  valentines: { src: "/images/scenes/welcome/truck-valentines.png", width: 1448, height: 1086 },
} as const satisfies Record<CinemaSeason, { src: string; width: number; height: number }>;

export function WelcomeTruck({ season = activeWelcomeSeason }: { season?: CinemaSeason }) {
  const art = welcomeTruckArtwork[season];
  const rootRef = useRef<HTMLDivElement>(null);
  const [loadedSource, setLoadedSource] = useState("");
  const [visible, setVisible] = useState(false);
  const ready = loadedSource === art.src;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef} className="roo-welcome-truck" data-truck-season={season} data-truck-ready={ready} aria-hidden="true">
    <Image
      src={art.src}
      alt=""
      width={art.width}
      height={art.height}
      sizes="min(120vw, 147.2vh, 1200px)"
      quality={75}
      loading="lazy"
      onLoad={() => setLoadedSource(art.src)}
      style={{ display: "block", width: "100%", height: "auto", maxWidth: "none", opacity: ready ? 1 : 0, transition: "opacity 240ms ease-out" }}
    />
    {ready && visible && <TruckCinema season={season} />}
  </div>;
}
