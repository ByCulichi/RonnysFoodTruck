"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { TruckMenuSheet, TruckStamp } from "@/components/truck-menu-sheet";

export type BookPage = "cover" | number;
const BOOK_WIDTH = 628;
const BOOK_HEIGHT = 878;

function MenuCover() {
  return <div className="menu-book-cover">
    <div className="menu-cover-rule" aria-hidden="true"><PawPrint /><span />FOOD TRUCK<span /><PawPrint /></div>
    <strong className="menu-cover-brand">Ronny’s</strong>
    <TruckStamp sizes="200px" />
    <span className="menu-cover-title">Menú</span>
    <span className="menu-cover-categories">Dulces · Snacks · Bebidas</span>
    <div className="menu-cover-food" aria-hidden="true"><Image src="/images/menu/illustrations/waffle.png" alt="" width={1254} height={1254} sizes="100px" /><PawPrint /><Image src="/images/menu/illustrations/crepa.png" alt="" width={1254} height={1254} sizes="100px" /></div>
    <span className="menu-cover-action">Abre y elige tu antojo <ArrowUpRight size={24} /></span>
  </div>;
}

function BookContent({ page }: { page: BookPage }) {
  return page === "cover" ? <MenuCover /> : <TruckMenuSheet sheet={page} />;
}

type Turn = { from: BookPage; to: BookPage; id: number; direction: "next" | "previous" };

// A full-size HTML page is fitted as a whole. Zoom uses the same scale, so no
// names, prices or drawings are clipped and the paper keeps its proportions.
export function MenuBook({ page, zoom = 1, onOpen }: { page: BookPage; zoom?: number; onOpen: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.4);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motion, setMotion] = useState<{ page: BookPage; serial: number; turn: Turn | null }>({ page, serial: 0, turn: null });
  if (motion.page !== page) {
    const direction = page === "cover" ? "previous" : motion.page === "cover" || page > motion.page ? "next" : "previous";
    const id = motion.serial + 1;
    setMotion({ page, serial: id, turn: reduceMotion ? null : { from: motion.page, to: page, id, direction } });
  }

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => setFit(Math.min((host.clientWidth - 16) / BOOK_WIDTH, (host.clientHeight - 16) / BOOK_HEIGHT, 1));
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

  const scale = Math.max(0.05, fit) * zoom;
  const turn = motion.turn;
  return <div ref={hostRef} className="menu-book-viewport" data-zoomed={zoom > 1} data-page={page} tabIndex={0} aria-label="Carta completa; usa las pestañas o las flechas para pasar las hojas">
    <div className="menu-book-space" style={{ width: BOOK_WIDTH * scale, height: BOOK_HEIGHT * scale }}>
      <div className="menu-book-frame" style={{ "--book-scale": scale } as CSSProperties}>
        <div className="menu-book-paper">
          <div className="menu-book-current"><BookContent page={page} />{page === "cover" && <button type="button" className="menu-cover-open" aria-label="Abrir menú de Ronny’s" onClick={() => { onOpen(); hostRef.current?.focus({ preventScroll: true }); }} />}</div>
          {turn && <div key={turn.id} className="menu-book-turn" data-direction={turn.direction} data-opening={turn.from === "cover" || turn.to === "cover"} aria-hidden="true" inert onAnimationEnd={event => {
            if (event.target === event.currentTarget) setMotion(current => current.turn?.id === turn.id ? { ...current, turn: null } : current);
          }}>
            <div className="menu-book-front"><BookContent page={turn.direction === "next" ? turn.from : turn.to} /></div>
            <div className="menu-book-back"><TruckStamp /><span>Ronny’s</span><PawPrint size={45} /></div>
            <span className="menu-book-fold" />
          </div>}
        </div>
      </div>
    </div>
  </div>;
}
