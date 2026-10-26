"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { TruckMenuSheet, TruckStamp, truckSheets } from "@/components/truck-menu-sheet";
import { halloweenCostumes } from "@/lib/ronny-costumes";

export type BookPage = "cover" | "back" | number;
type LeafBack = number;
const PAGE_WIDTH = 596;
const CLOSED_WIDTH = 628;
const OPEN_WIDTH = 1224;
const BOOK_HEIGHT = 878;
const CLOSED_OFFSET = (OPEN_WIDTH - CLOSED_WIDTH) / 2;

function MenuCover({ back = false }: { back?: boolean }) {
  return <div className="menu-book-cover">
    <div className="menu-cover-rule" aria-hidden="true"><PawPrint /><span />FOOD TRUCK<span /><PawPrint /></div>
    <strong className="menu-cover-brand">Ronny’s</strong>
    <TruckStamp sizes="200px" />
    <span className="menu-cover-title">{back ? "Food Truck" : "Menú"}</span>
    <span className="menu-cover-categories">Dulces · Snacks · Bebidas</span>
    <div className="menu-cover-food" aria-hidden="true"><Image src="/images/menu/illustrations/waffle.png" alt="" width={1254} height={1254} sizes="100px" /><PawPrint /><Image src="/images/menu/illustrations/crepa.png" alt="" width={1254} height={1254} sizes="100px" /></div>
    <span className="menu-cover-action">{back ? "Toca para volver a abrir" : "Toca para abrir"} <ArrowUpRight size={24} /></span>
  </div>;
}

const reverseArt = [
  { costume: halloweenCostumes.bruja, food: "waffle" },
  { costume: halloweenCostumes.zombi, food: "papas" },
  { costume: halloweenCostumes.vampiro, food: "cafe" },
] as const;

// The facing illustration belongs to the same category as the readable right page.
function MenuReverse({ page }: { page: LeafBack }) {
  const art = reverseArt[page];
  const title = truckSheets[page].title;
  return <div className="menu-page-reverse" data-reverse={page} role="img" aria-label={`Reverso de ${title}: ${art.costume.alt}`}>
    <div className="menu-reverse-checkers" />
    <div className="menu-reverse-content">
      <span className="menu-reverse-rule"><PawPrint size={22} /> RONNY’S FOOD TRUCK <PawPrint size={22} /></span>
      <h4>{title}</h4>
      {<div className="menu-reverse-emblem"><Image src={art.costume.src} alt="" width={1024} height={1536} loading="eager" sizes="(max-width: 600px) 180px, 300px" /></div>}
      <div className="menu-reverse-food" aria-hidden="true">
        <PawPrint size={30} />
        {<Image src={`/images/menu/illustrations/${art.food}.png`} alt="" width={1254} height={1254} loading="eager" sizes="100px" />}
        <PawPrint size={30} />
      </div>
    </div>
    <div className="menu-reverse-checkers" />
  </div>;
}

function BookContent({ page }: { page: BookPage }) {
  return page === "cover" ? <MenuCover /> : page === "back" ? <MenuCover back /> : <TruckMenuSheet sheet={page} />;
}

const leftPage = (page: BookPage): LeafBack | null => page === "cover" ? null : page === "back" ? null : page;
const pageOrder = (page: BookPage) => page === "cover" ? -1 : page === "back" ? 3 : page;
type Turn = { from: BookPage; to: BookPage; id: number; direction: "next" | "previous" };
type Point = { x: number; y: number };
type Gesture = { pointer: number; x: number; y: number; width: number; active: boolean; progress: number; direction: "next" | "previous" };

// Clip a sheet against the perpendicular bisector between its resting corner
// and the moving corner. Reflecting the folded polygon keeps both faces joined.
function clipSheet(normal: Point, distance: number, folded: boolean) {
  const rectangle = [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: 850 }, { x: 0, y: 850 }];
  const polygon: Point[] = [];
  const side = (point: Point) => (normal.x * point.x + normal.y * point.y - distance) * (folded ? 1 : -1);
  for (let i = 0; i < rectangle.length; i++) {
    const a = rectangle[i], b = rectangle[(i + 1) % rectangle.length];
    const da = side(a), db = side(b);
    if (da >= 0) polygon.push(a);
    if ((da >= 0) !== (db >= 0)) {
      const fraction = da / (da - db);
      polygon.push({ x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction });
    }
  }
  return polygon.length < 3 ? "polygon(0px 0px, 0px 0px, 0px 0px)" : `polygon(${polygon.map(point => `${point.x.toFixed(2)}px ${point.y.toFixed(2)}px`).join(",")})`;
}

export function MenuBook({ page, zoom = 1, onOpen, onNext, onPrevious }: { page: BookPage; zoom?: number; onOpen: (trigger?: HTMLButtonElement) => void; onNext?: () => void; onPrevious?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const controllerRef = useRef<{ draw: (progress: number) => void; resume: () => void; direction: "next" | "previous" } | null>(null);
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

  // Keep room above and below the paper for the lifted corner and hard cover.
  const fit = Math.max(0.05, Math.min((bounds.width - 16) / OPEN_WIDTH, (bounds.height - 16) * .86 / BOOK_HEIGHT, 1));
  const scale = fit * zoom;
  const turn = motion.turn;
  const backTurn = Boolean(turn && (turn.from === "back" || turn.to === "back"));
  const hard = Boolean(turn && (turn.from === "cover" || turn.to === "cover" || backTurn));
  const left = turn?.to === "cover" ? null : turn?.direction === "next" ? leftPage(turn.from) : leftPage(page);
  const right = turn?.direction === "previous" ? turn.from : page;
  const reverse = turn && (turn.direction === "next" ? leftPage(turn.to) : leftPage(turn.from));

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const leaf = turnRef.current;
    const board = frame?.querySelector<HTMLElement>(".menu-book-board-left");
    const rightBoard = frame?.querySelector<HTMLElement>(".menu-book-board-right");
    const rest = () => {
      if (frame) frame.style.transform = `scale(var(--book-scale)) translateX(${page === "cover" ? -CLOSED_OFFSET : page === "back" ? CLOSED_OFFSET : 0}px)`;
      if (board) board.style.transform = `rotateY(${page === "cover" ? 180 : 0}deg)`;
      if (rightBoard) rightBoard.style.transform = `rotateY(${page === "back" ? -180 : 0}deg)`;
    };
    if (!turn || !leaf || !frame) { rest(); return; }
    const front = leaf.querySelector<HTMLElement>(".menu-book-front")!;
    const back = leaf.querySelector<HTMLElement>(".menu-book-back")!;
    const lift = leaf.querySelector<HTMLElement>(".menu-fold-lift")!;
    const shades = leaf.querySelectorAll<HTMLElement>(".menu-fold-shade");
    const finish = turn.direction === "next" ? 1 : 0;
    let progress = gestureRef.current?.active ? (turn.direction === "next" ? gestureRef.current.progress : 1 - gestureRef.current.progress) : 1 - finish;
    let request = 0, alive = true;
    function draw(value: number) {
      progress = value;
      if (hard) {
        // Show only the facing surface of the hard cover as it crosses 90°.
        front.style.visibility = value < .5 ? "visible" : "hidden";
        lift.style.visibility = value >= .5 ? "visible" : "hidden";
        leaf!.style.transform = `rotateY(${-180 * value}deg)`;
        frame!.style.transform = `scale(var(--book-scale)) translateX(${backTurn ? CLOSED_OFFSET * value : -CLOSED_OFFSET * (1 - value)}px)`;
        if (board) board.style.transform = `rotateY(${backTurn ? 0 : 180 * (1 - value)}deg)`;
        if (rightBoard) rightBoard.style.transform = `rotateY(${backTurn ? -180 * value : 0}deg)`;
        return;
      }
      const amount = Math.max(.00001, Math.min(.99999, value));
      const corner = { x: PAGE_WIDTH * (1 - 2 * amount), y: 850 - 80 * Math.sin(Math.PI * amount) };
      const delta = { x: PAGE_WIDTH - corner.x, y: 850 - corner.y };
      const length = Math.hypot(delta.x, delta.y);
      const normal = { x: delta.x / length, y: delta.y / length };
      const middle = { x: (PAGE_WIDTH + corner.x) / 2, y: (850 + corner.y) / 2 };
      const distance = normal.x * middle.x + normal.y * middle.y;
      front.style.clipPath = clipSheet(normal, distance, false);
      back.style.clipPath = clipSheet(normal, distance, true);
      lift.style.transform = `matrix(${1 - 2 * normal.x ** 2},${-2 * normal.x * normal.y},${-2 * normal.x * normal.y},${1 - 2 * normal.y ** 2},${2 * normal.x * distance},${2 * normal.y * distance})`;
      shades.forEach(shade => {
        shade.style.transform = `translate(${middle.x}px,${middle.y}px) translate(-50%,-50%) rotate(${Math.atan2(normal.y, normal.x)}rad)`;
        shade.style.opacity = `${Math.sin(Math.PI * amount) * .55}`;
      });
    }
    function resume() {
      cancelAnimationFrame(request);
      const from = progress, start = performance.now();
      const duration = Math.max(140, (hard ? 850 : 680) * Math.abs(finish - from));
      const animate = (time: number) => {
        if (!alive) return;
        const elapsed = Math.min(1, (time - start) / duration);
        const ease = .5 - .5 * Math.cos(Math.PI * elapsed);
        draw(from + (finish - from) * ease);
        if (elapsed < 1) request = requestAnimationFrame(animate);
        else setMotion(current => current.turn?.id === turn!.id ? { ...current, turn: null } : current);
      };
      request = requestAnimationFrame(animate);
    }
    controllerRef.current = { draw, resume, direction: turn.direction };
    draw(progress);
    if (!gestureRef.current?.active) resume();
    return () => { alive = false; cancelAnimationFrame(request); controllerRef.current = null; };
  }, [turn, hard, backTurn, page]);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (zoom === 1) { host.scrollTo(0, 0); return; }
    const center = ((page === "cover" || page === "back") ? OPEN_WIDTH / 2 : PAGE_WIDTH * 1.5 + 18) * scale;
    host.scrollTo({ left: Math.max(0, center - host.clientWidth / 2) });
  }, [zoom, page, scale]);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (zoom !== 1 || turn || !event.isPrimary || event.button !== 0) return;
    const paper = hostRef.current?.querySelector<HTMLElement>(page === "back" ? ".menu-book-back-closed" : ".menu-book-paper");
    gestureRef.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, width: paper?.getBoundingClientRect().width || 200, active: false, progress: 0, direction: "next" };
    suppressClick.current = false;
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.active) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      const direction = dx < 0 ? "next" : "previous";
      const action = direction === "next" ? onNext : onPrevious;
      if (!action || (direction === "previous" && page === "cover") || (direction === "next" && page === "back")) return;
      gesture.active = true; gesture.direction = direction;
      event.currentTarget.setPointerCapture(event.pointerId);
      suppressClick.current = true;
      action();
    }
    event.preventDefault();
    gesture.progress = Math.min(.98, Math.max(0, (gesture.direction === "next" ? -dx : dx) / (gesture.width * 2)));
    controllerRef.current?.draw(gesture.direction === "next" ? gesture.progress : 1 - gesture.progress);
  }
  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    const active = gesture.active;
    gesture.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (active) controllerRef.current?.resume();
    gestureRef.current = null;
  }

  return <div ref={hostRef} className="menu-book-viewport" data-zoomed={zoom > 1} data-page={page} data-spread={(page !== "cover" && page !== "back") || Boolean(turn)} data-turning={Boolean(turn)} data-closing={turn?.to === "cover"} tabIndex={0} aria-label="Libro del menú; desliza horizontalmente o usa las flechas para pasar las hojas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
    <div className="menu-book-space" style={{ width: OPEN_WIDTH * scale, height: BOOK_HEIGHT * scale }}>
      <div ref={frameRef} className="menu-book-frame" style={{ "--book-scale": scale, "--book-offset": page === "cover" ? `${-CLOSED_OFFSET}px` : page === "back" ? `${CLOSED_OFFSET}px` : "0px", "--cover-angle": page === "cover" ? "180deg" : "0deg" } as CSSProperties}>
        <div className="menu-book-spread">
          <div className="menu-book-board menu-book-board-left" aria-hidden="true" />
          <div className="menu-book-board menu-book-board-right" aria-hidden="true" />
          {page === "back" && !turn && <div className="menu-book-left menu-book-back-closed"><MenuCover back /><button type="button" className="menu-cover-open" aria-label="Volver a abrir el menú" onClick={event => { onOpen(event.currentTarget); hostRef.current?.focus({ preventScroll: true }); }} /></div>}
          {left !== null && <div className="menu-book-left"><MenuReverse page={left} />{!turn && <button type="button" className="menu-page-touch" aria-label="Volver a la hoja anterior" onClick={() => { onPrevious?.(); hostRef.current?.focus({ preventScroll: true }); }} />}</div>}
          <div className="menu-book-paper">
            <div className="menu-book-current" hidden={page === "back" || backTurn}><BookContent page={right} />{page === "cover" && !turn && <button type="button" className="menu-cover-open" aria-label="Abrir menú de Ronny’s" onClick={event => { onOpen(event.currentTarget); hostRef.current?.focus({ preventScroll: true }); }} />}
              {typeof page === "number" && !turn && <button type="button" className="menu-page-touch" aria-label={page === 2 ? "Cerrar por la contraportada" : "Pasar a la hoja siguiente"} onClick={() => { onNext?.(); hostRef.current?.focus({ preventScroll: true }); }} />}</div>
            {turn && <div ref={turnRef} key={turn.id} className="menu-book-turn" data-direction={turn.direction} data-kind={hard ? "hard" : "paper"} aria-hidden="true" inert>
              <div className="menu-book-front"><BookContent page={turn.direction === "next" ? turn.from : turn.to} /><span className="menu-fold-shade" /></div>
              <div className="menu-fold-lift"><div className="menu-book-back"><div className="menu-fold-back-content">{backTurn ? <MenuCover back /> : reverse !== null && <MenuReverse page={reverse} />}</div><span className="menu-fold-shade" /></div></div>
            </div>}
          </div>
          {(((page !== "cover" && page !== "back") || turn)) && <span className="menu-book-spine" aria-hidden="true" />}
        </div>
      </div>
    </div>
  </div>;
}
