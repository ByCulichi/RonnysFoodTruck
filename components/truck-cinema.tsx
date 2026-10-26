"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ExternalLink, Maximize2, Play, X } from "lucide-react";
import { cinemaEmbed, truckCinema, type CinemaSeason } from "@/lib/truck-cinema";
import "./truck-cinema.css";

// Coordinates are on the original 1536 × 1024 illustration, inside the serving
// window. Map them through object-fit rather than moving or redrawing the art.
const screen = { x: 480, y: 371, width: 132, height: 74.25 };

export function TruckCinema({ season = "halloween" }: { season?: CinemaSeason }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [placement, setPlacement] = useState<CSSProperties>();
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const movie = truckCinema[season];

  useEffect(() => {
    const scene = rootRef.current?.parentElement;
    const image = scene?.querySelector<HTMLImageElement>(":scope > img");
    if (!scene || !image) return;
    function position() {
      const box = image!.getBoundingClientRect(), parent = scene!.getBoundingClientRect();
      // Next Image may serve a different raster size; coordinates stay in the
      // original artwork's coordinate system, independently of the downloaded size.
      const naturalWidth = 1536, naturalHeight = 1024;
      const scale = Math.max(box.width / naturalWidth, box.height / naturalHeight);
      const [x, y] = getComputedStyle(image!).objectPosition.split(" ").map(value => parseFloat(value) / 100);
      setPlacement({ left: box.left - parent.left + (box.width - naturalWidth * scale) * x + screen.x * scale, top: box.top - parent.top + (box.height - naturalHeight * scale) * y + screen.y * scale, width: screen.width * scale, height: screen.height * scale, "--tv-scale": screen.width * scale * .94 / 480 } as CSSProperties);
    }
    position();
    const resize = new ResizeObserver(position);
    resize.observe(scene); resize.observe(image);
    image.addEventListener("load", position);
    return () => { resize.disconnect(); image.removeEventListener("load", position); };
  }, []);

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
    // Let the hero and its controls render before requesting the movie player.
    const timer = window.setTimeout(() => { ready = true; update(); }, 1800);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { clearTimeout(timer); observer.disconnect(); pause.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function showCinema() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return <>
    <div ref={rootRef} className="truck-cinema" data-season={season} data-playing={playing && !open} style={placement} hidden={!placement}>
      <div className="truck-tv-mount" aria-hidden="true" />
      <div className="truck-tv-bezel">
        <div className="truck-tv-picture" aria-hidden="true">
          <div className="truck-tv-poster"><span>RONNY’S CINEMA</span><strong>{movie.title}</strong><Play /><small>{movie.season}</small></div>
          {playing && !open && <iframe key={season} title={`Avance sin sonido de ${movie.title}`} src={cinemaEmbed(season, true)} tabIndex={-1} allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" />}
        </div>
        <button ref={triggerRef} type="button" className="truck-tv-open" aria-label={`Ampliar pantalla del truck: ${movie.title}, ${movie.season}`} title={`${movie.title} · ${movie.format}`} onClick={showCinema}><Maximize2 aria-hidden="true" /><span className="sr-only">Ampliar pantalla</span></button>
        <span className="truck-tv-led" aria-hidden="true" />
      </div>
    </div>
    <dialog ref={dialogRef} className="truck-cinema-dialog" aria-labelledby="truck-cinema-title" onClose={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="truck-cinema-heading"><div><span>RONNY’S CINEMA · {movie.season}</span><h2 id="truck-cinema-title">{movie.title}</h2></div><button type="button" autoFocus aria-label="Cerrar pantalla del truck" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button></div>
      <div className="truck-cinema-player">{open && <iframe key={season} title={`${movie.format} de ${movie.title}`} src={cinemaEmbed(season)} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}</div>
      <div className="truck-cinema-footer"><span>{movie.format} · {movie.publisher}</span><a href={`https://www.youtube.com/watch?v=${movie.videoId}`} target="_blank" rel="noopener noreferrer">Ver en YouTube <ExternalLink size={15} aria-hidden="true" /></a></div>
    </dialog>
  </>;
}
