"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { BookOpen, Minus, PawPrint, Plus, X } from "lucide-react";
import { dishes, type Dish } from "@/lib/menu";
import { halloweenCostumes } from "@/lib/ronny-costumes";
import { truckSheets } from "@/components/truck-menu-sheet";
import { MenuBook, type BookPage } from "@/components/menu-book";
import "./menu-carta.css";

function CartaItem({ dish }: { dish: Dish }) {
  const multiple = dish.options.length > 1;
  return <li className="carta-item" data-product={dish.name}>
    <div className="carta-item-heading"><h4>{dish.name}</h4>{!multiple && <strong>${dish.options[0].price}</strong>}</div>
    {multiple && <dl>{dish.options.map((option) => <div key={option.name}><dt>{option.name}</dt><dd>${option.price}</dd></div>)}</dl>}
    {["Crepas", "Waffles", "Hotcakes", "Banderilla dulce", "Malteadas"].includes(dish.name) && <p>{dish.description}</p>}
  </li>;
}

export function MenuCarta(_props: { selection: string; onSelect: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"design" | "text">("design");
  const [page, setPage] = useState<BookPage>("cover");
  const [preview, setPreview] = useState<BookPage>("cover");
  const [zoom, setZoom] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const autoOpen = useRef<0 | 2>(0);
  const sheet = typeof page === "number" ? page : page === "back" ? 2 : 0;
  const products = dishes.filter(dish => dish.group === (sheet === 0 ? "Dulces" : sheet === 1 ? "Salados" : "Bebidas"));

  useEffect(() => {
    if (!open && triggerRef.current) previewRef.current?.querySelector<HTMLButtonElement>(".menu-cover-open")?.focus({ preventScroll: true });
  }, [open, preview]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Mount the closed book before lifting its cover, including reduced motion.
    let second = 0;
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setPage(autoOpen.current)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); document.body.style.overflow = previous; };
  }, [open]);

  function openCarta(trigger?: HTMLButtonElement) {
    triggerRef.current = trigger || document.activeElement as HTMLElement;
    autoOpen.current = preview === "back" ? 2 : 0;
    setMode("design"); setZoom(0); setPage(preview);
    dialogRef.current?.showModal(); setOpen(true);
  }

  function showPage(next: BookPage) {
    canvasRef.current?.querySelector<HTMLElement>(".menu-book-viewport")?.focus({ preventScroll: true });
    setPage(next); setZoom(0);
  }
  function nextPage() { if (page === "cover") showPage(0); else if (typeof page === "number") showPage(page === 2 ? "back" : page + 1); }
  function previousPage() { if (page === "back") showPage(2); else if (typeof page === "number") showPage(page === 0 ? "cover" : page - 1); }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (zoom === 0 && mode === "design" && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      if (event.key === "ArrowRight") nextPage(); else previousPage();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), select, [tabindex='0']")).filter(item => item.getClientRects().length > 0);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <section className="truck-carta" id="carta-original" aria-labelledby="truck-carta-title">
    <div className="carta-heading"><div><span className="eyebrow"><BookOpen size={17} aria-hidden="true" /> EL SABOR, BIEN CLARO</span><h3 id="truck-carta-title">La carta del truck.</h3></div></div>
    <div className="carta-layout">
      <div ref={previewRef} className="carta-digital-preview">
        <MenuBook key={preview} page={preview} onOpen={openCarta} onNext={() => openCarta()} onPrevious={() => { if (preview === "back") openCarta(); }} />
      </div>
      <aside className="carta-ronny" id="historia" aria-labelledby="carta-ronny-title">
        <div className="carta-ronny-art"><Image src={halloweenCostumes.zombi.src} alt={halloweenCostumes.zombi.alt} width={1024} height={1536} sizes="(max-width: 600px) 85px, 210px" /></div>
        <div className="carta-ronny-copy"><span className="eyebrow"><PawPrint size={15} aria-hidden="true" /> NUESTRO RONNY</span><h3 id="carta-ronny-title">Tiene su genio.<br /><em>Y buen gusto.</em></h3></div>
      </aside>
    </div>
    <dialog ref={dialogRef} className="carta-reader" data-mode={mode} aria-label={page === "back" ? "Contraportada del menú de Ronny’s" : page === "cover" ? "Portada del menú de Ronny’s" : `Carta digital de ${truckSheets[sheet].title.toLowerCase()}`} onKeyDown={trapFocus} onClose={() => { setPreview(page === "back" ? "back" : "cover"); setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="carta-reader-heading"><strong>La carta del truck</strong><button type="button" autoFocus aria-label="Cerrar carta" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
      <div className="carta-reader-toolbar"><div className="carta-reader-modes" role="group" aria-label="Vista de la carta"><button type="button" aria-pressed={mode === "design"} onClick={() => { setMode("design"); setZoom(0); }}>Diseño del truck</button><button type="button" aria-pressed={mode === "text"} onClick={() => { setMode("text"); setZoom(0); }}>Texto grande</button></div><div className="carta-pagination" role="group" aria-label="Tamaño de la carta"><button type="button" aria-label="Reducir carta" disabled={zoom === 0} onClick={() => setZoom(zoom - 1)}><Minus size={18} /></button><span aria-live="polite">{100 + zoom * 25}%</span><button type="button" aria-label="Aumentar carta" disabled={zoom === (mode === "design" ? 12 : 4)} onClick={() => setZoom(zoom + 1)}><Plus size={18} /></button></div></div>
      <div ref={canvasRef} className="carta-reader-canvas" data-mode={mode} tabIndex={mode === "text" ? 0 : undefined} aria-label="Productos y precios de la carta" style={{ "--carta-text-size": `${20 * (1 + zoom * .25)}px` } as CSSProperties}>
        {open && (mode === "design" ? <MenuBook page={page} zoom={1 + zoom * .25} onOpen={() => showPage(page === "back" ? 2 : 0)} onNext={nextPage} onPrevious={previousPage} /> : <div className="carta-reader-text"><label className="carta-text-category">Carta <select aria-label="Categoría de la carta" value={sheet} onChange={event => setPage(Number(event.target.value))}>{truckSheets.map((item, index) => <option value={index} key={item.id}>{item.title}</option>)}</select></label><h4>{truckSheets[sheet].title}</h4><ul className="carta-product-list">{products.map(dish => <CartaItem key={dish.name} dish={dish} />)}</ul></div>)}
      </div>
      <span className="sr-only" aria-live="polite">{page === "back" ? "Libro cerrado. Contraportada." : page === "cover" ? "Libro cerrado. Portada." : `${truckSheets[sheet].title}. Hoja ${sheet + 1} de 3.`}</span>
    </dialog>
  </section>;
}
