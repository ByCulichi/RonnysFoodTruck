"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { truckArtwork, truckCinema, type CinemaSeason } from "@/lib/truck-cinema";
import { MoviePreviewArt } from "@/components/movie-preview-art";
import "./truck-cinema.css";

export function TruckCinema({ season = "halloween" }: { season?: CinemaSeason }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<CSSProperties>();
  const [playing, setPlaying] = useState(false);
  const movie = truckCinema[season];

  useEffect(() => {
    const scene = rootRef.current?.parentElement;
    const image = scene?.querySelector<HTMLImageElement>(":scope > img");
    if (!scene || !image) return;
    const { width: naturalWidth, height: naturalHeight, screen } = truckArtwork[season];
    function position() {
      const box = image!.getBoundingClientRect(), parent = scene!.getBoundingClientRect();
      const style = getComputedStyle(image!);
      // The hero uses cover; the cards keep the entire illustration with contain.
      const scale = (style.objectFit === "contain" ? Math.min : Math.max)(box.width / naturalWidth, box.height / naturalHeight);
      const [x, y] = style.objectPosition.split(" ").map(value => parseFloat(value) / 100);
      setPlacement({ left: box.left - parent.left + (box.width - naturalWidth * scale) * x + screen.x * scale, top: box.top - parent.top + (box.height - naturalHeight * scale) * y + screen.y * scale, width: screen.width * scale, height: screen.height * scale } as CSSProperties);
    }
    position();
    const resize = new ResizeObserver(position);
    resize.observe(scene); resize.observe(image);
    image.addEventListener("load", position);
    return () => { resize.disconnect(); image.removeEventListener("load", position); };
  }, [season]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atmosphere = document.querySelector<HTMLElement>(".market-night-decoration");
    let visible = false, ready = false;
    const update = () => setPlaying(ready && visible && !document.hidden && !preference.matches && atmosphere?.dataset.paused !== "true");
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
    observer.observe(root);
    const pause = new MutationObserver(update);
    if (atmosphere) pause.observe(atmosphere, { attributes: true, attributeFilter: ["data-paused"] });
    // Give the hero time to settle before starting the tiny local animation.
    const timer = window.setTimeout(() => { ready = true; update(); }, 1800);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { clearTimeout(timer); observer.disconnect(); pause.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [season]);

  return <div ref={rootRef} className="truck-cinema" data-season={season} data-playing={playing} style={placement} hidden={!placement} role="img" aria-label={`Mini animación inspirada en ${movie.title}, ${movie.season}`}>
    <div className="truck-tv-mount" aria-hidden="true" />
    <div className="truck-tv-bezel">
      <div className="truck-tv-picture" aria-hidden="true"><MoviePreviewArt season={season} /><span className="truck-movie-title">{movie.title}</span></div>
      <span className="truck-tv-led" aria-hidden="true" />
    </div>
  </div>;
}
