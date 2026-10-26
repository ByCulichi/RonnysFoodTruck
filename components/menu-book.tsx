"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { TruckMenuSheet, TruckStamp, truckSheets } from "@/components/truck-menu-sheet";
import { halloweenCostumes } from "@/lib/ronny-costumes";

export type BookPage = "cover" | "end" | number;
type LeafBack = "cover" | number;
const PAGE_WIDTH = 596;
const CLOSED_WIDTH = 628;
const OPEN_WIDTH = 1224;
const BOOK_HEIGHT = 878;

function MenuCover({ back = false }: { back?: boolean }) {
  return <div className="menu-book-cover">
    <div className="menu-cover-rule" aria-hidden="true"><PawPrint /><span />FOOD TRUCK<span /><PawPrint /></div>
    <strong className="menu-cover-brand">Ronny’s</strong>
    <TruckStamp sizes="200px" />
    <span className="menu-cover-title">{back ? "Food Truck" : "Menú"}</span>
    <span className="menu-cover-categories">Dulces · Snacks · Bebidas</span>
    <div className="menu-cover-food" aria-hidden="true"><Image src="/images/menu/illustrations/waffle.png" alt="" width={1254} height={1254} sizes="100px" /><PawPrint /><Image src="/images/menu/illustrations/crepa.png" alt="" width={1254} height={1254} sizes="100px" /></div>
    <span className="menu-cover-action">{back ? "Cerrar menú" : "Abre y elige tu antojo"} <ArrowUpRight size={24} /></span>
  </div>;
}

const reverseArt = [
  { costume: halloweenCostumes.bruja, food: "waffle" },
  { costume: halloweenCostumes.diablito, food: "papas" },
  { costume: halloweenCostumes.vampiro, food: "cafe" },
] as const;

// Each printed front has an illustrated back, which stays on the left stack.
function MenuReverse({ page }: { page: LeafBack }) {
  const art = page === "cover" ? null : reverseArt[page];
  const title = page === "cover" ? "Ronny’s" : truckSheets[page].title;
  return <div className="menu-page-reverse" data-reverse={page} role="img" aria-label={art ? `Reverso de ${title}: ${art.costume.alt}` : "Interior de la portada con el sello de Ronny’s"}>
    <div className="menu-reverse-checkers" />
    <div className="menu-reverse-content">
      <span className="menu-reverse-rule"><PawPrint size={22} /> RONNY’S FOOD TRUCK <PawPrint size={22} /></span>
      <h4>{title}</h4>
      {art ? <div className="menu-reverse-emblem"><Image src={art.costume.src} alt="" width={1024} height={1536} loading="eager" sizes="(max-width: 600px) 180px, 300px" /></div> : <div className="menu-reverse-seal"><TruckStamp sizes="200px" /></div>}
      <div className="menu-reverse-food" aria-hidden="true">
        <PawPrint size={30} />
        {art ? <Image src={`/images/menu/illustrations/${art.food}.png`} alt="" width={1254} height={1254} loading="eager" sizes="100px" /> : <span>Dulces · Snacks · Bebidas</span>}
        <PawPrint size={30} />
      </div>
    </div>
    <div className="menu-reverse-checkers" />
  </div>;
}

function BookContent({ page }: { page: BookPage }) {
  return page === "cover" ? <MenuCover /> : page === "end" ? <MenuCover back /> : <TruckMenuSheet sheet={page} />;
}

const leftPage = (page: BookPage): LeafBack | null => page === "cover" ? null : page === "end" ? 2 : page === 0 ? "cover" : page - 1;
const pageOrder = (page: BookPage) => page === "cover" ? -1 : page === "end" ? 3 : page;
type Turn = { from: BookPage; to: BookPage; id: number; direction: "next" | "previous" };

export function MenuBook({ page, zoom = 1, onOpen, onClose }: { page: BookPage; zoom?: number; onOpen: () => void; onClose: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 400, height: 560 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motion, setMotion] = useState<{ page: BookPage; serial: number; turn: Turn | null }>({ page, serial: 0, turn: null });
  if (motion.page !== page) {
    const direction = pageOrder(page) > pageOrder(motion.page) ? "next" : "previous";
    const id = motion.serial + 1;
    setMotion({ page, serial: id, turn: reduceMotion ? null : { from: motion.page, to: page, id, direction } });
  }

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => setBounds({ width: host.clientWidth, height: host.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduceMotion(preference.matches);
      if (preference.matches) setMotion(current => ({ ...current, turn: null }));
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const width = page === "cover" ? CLOSED_WIDTH : OPEN_WIDTH;
  const fit = Math.max(0.05, Math.min((bounds.width - 16) / width, (bounds.height - 16) / BOOK_HEIGHT, 1));
  const scale = fit * zoom;
  const turn = motion.turn;
  const left = turn?.direction === "next" ? leftPage(turn.from) : leftPage(page);
  const right = turn?.direction === "previous" ? turn.from : page;
  const reverse = turn && (turn.direction === "next" ? leftPage(turn.to) : leftPage(turn.from));

  // Enlarging focuses the readable front; the left stack remains available by panning.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (zoom === 1) { host.scrollTo(0, 0); return; }
    const center = (page === "cover" ? PAGE_WIDTH / 2 + 18 : PAGE_WIDTH * 1.5 + 18) * scale;
    host.scrollTo({ left: Math.max(0, center - host.clientWidth / 2) });
  }, [zoom, page, scale]);

  return <div ref={hostRef} className="menu-book-viewport" data-zoomed={zoom > 1} data-page={page} data-spread={page !== "cover"} data-cover-turn={Boolean(turn && (turn.from === "cover" || turn.to === "cover") && zoom === 1)} tabIndex={0} aria-label="Libro del menú; las hojas giradas permanecen a la izquierda">
    <div className="menu-book-space" style={{ width: width * scale, height: BOOK_HEIGHT * scale }}>
      <div className="menu-book-frame" style={{ "--book-scale": scale, "--book-width": `${width}px`, "--right-page-left": page === "cover" ? "0px" : `${PAGE_WIDTH}px` } as CSSProperties}>
        <div className="menu-book-spread">
          {left !== null && <div className="menu-book-left"><MenuReverse page={left} /></div>}
          <div className="menu-book-paper">
            <div className="menu-book-current"><BookContent page={right} />{(page === "cover" || page === "end") && !turn && <button type="button" className="menu-cover-open" aria-label={page === "cover" ? "Abrir menú de Ronny’s" : "Cerrar menú de Ronny’s"} onClick={() => { (page === "cover" ? onOpen : onClose)(); hostRef.current?.focus({ preventScroll: true }); }} />}</div>
            {turn && <div key={turn.id} className="menu-book-turn" data-direction={turn.direction} data-opening={turn.from === "cover" || turn.to === "cover"} aria-hidden="true" inert onAnimationEnd={event => {
              if (event.target === event.currentTarget) setMotion(current => current.turn?.id === turn.id ? { ...current, turn: null } : current);
            }}>
              <div className="menu-book-front"><BookContent page={turn.direction === "next" ? turn.from : turn.to} /></div>
              <div className="menu-book-back">{reverse !== null && <MenuReverse page={reverse} />}</div>
              <span className="menu-book-fold" />
            </div>}
          </div>
          {page !== "cover" && <span className="menu-book-spine" aria-hidden="true" />}
        </div>
      </div>
    </div>
  </div>;
}
