"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Minus, PawPrint, Plus, X } from "lucide-react";
import { dishes, type Dish } from "@/lib/menu";
import { getMenuCategory } from "@/lib/menu-categories";
import { halloweenCostumes } from "@/lib/ronny-costumes";
import { truckSheets } from "@/components/truck-menu-sheet";
import { MenuBook } from "@/components/menu-book";
import "./menu-carta.css";

function CartaItem({ dish }: { dish: Dish }) {
  const multiple = dish.options.length > 1;
  return <li className="carta-item" data-product={dish.name}>
    <div className="carta-item-heading"><h4>{dish.name}</h4>{!multiple && <strong>${dish.options[0].price}</strong>}</div>
    {multiple && <dl>{dish.options.map((option) => <div key={option.name}><dt>{option.name}</dt><dd>${option.price}</dd></div>)}</dl>}
    {["Crepas", "Waffles", "Hotcakes", "Banderilla dulce", "Malteadas"].includes(dish.name) && <p>{dish.description}</p>}
  </li>;
}

export function MenuCarta({ selection, onSelect }: { selection: string; onSelect: (name: string) => void }) {
  const category = getMenuCategory(dishes.find(({ name }) => name === selection) || dishes[0]);
  const previewIndex = category === "dulces" ? 0 : category === "salados" ? 1 : 2;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"design" | "text">("design");
  const [sheet, setSheet] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [previewClosed, setPreviewClosed] = useState(true);
  const [closed, setClosed] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const products = dishes.filter(dish => dish.group === (sheet === 0 ? "Dulces" : sheet === 1 ? "Salados" : "Bebidas"));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function selectSheet(next: number) {
    const index = (next + truckSheets.length) % truckSheets.length;
    setPreviewClosed(false);
    onSelect(dishes.find(dish => dish.group === (index === 0 ? "Dulces" : index === 1 ? "Salados" : "Bebidas"))!.name);
  }

  function openCarta(button: HTMLButtonElement) {
    triggerRef.current = button;
    setMode("design"); setZoom(0); setClosed(true); setSheet(previewIndex);
    dialogRef.current?.showModal(); setOpen(true);
  }

  function showSheet(next: number) {
    setClosed(false);
    setSheet((next + truckSheets.length) % truckSheets.length);
    setZoom(0); canvasRef.current?.scrollTo(0, 0);
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (zoom === 0 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      if (event.key === "ArrowRight") { if (closed) showSheet(0); else if (sheet < 2) showSheet(sheet + 1); }
      else if (!closed) { if (sheet > 0) showSheet(sheet - 1); else closeBook(); }
      return;
    }
    if (event.key !== "Tab") return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], [tabindex='0']");
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  function closeBook(inDialog = true) {
    if (inDialog) { setClosed(true); setZoom(0); setMode("design"); }
    else { setPreviewClosed(true); }
  }

  const tabs = (inDialog = false) => {
    const isClosed = inDialog ? closed && mode === "design" : previewClosed;
    return <div className="carta-sheet-tabs" role="group" aria-label={inDialog ? "Hojas de la carta ampliada" : "Hojas de la carta del truck"}>
      <button type="button" aria-pressed={isClosed} onClick={() => closeBook(inDialog)}>Portada</button>
      {truckSheets.map((item, index) => <button type="button" key={item.id} aria-pressed={!isClosed && (inDialog ? sheet : previewIndex) === index} onClick={() => inDialog ? showSheet(index) : selectSheet(index)}>{item.title}</button>)}
    </div>;
  };

  return <section className="truck-carta" id="carta-original" aria-labelledby="truck-carta-title">
    <div className="carta-heading"><div><span className="eyebrow"><BookOpen size={17} aria-hidden="true" /> EL SABOR, BIEN CLARO</span><h3 id="truck-carta-title">La carta del truck.</h3></div><button type="button" className="carta-expand" onClick={(event) => openCarta(event.currentTarget)}><BookOpen size={18} aria-hidden="true" /> Abrir carta</button></div>
    <div className="carta-layout">
      <div className="carta-digital-preview">
        {tabs()}<MenuBook page={previewClosed ? "cover" : previewIndex} onOpen={() => { setPreviewClosed(false); }} />
        <div className="carta-preview-footer"><div className="carta-pagination" role="group" aria-label="Recorrer carta">
          <button type="button" aria-label="Carta anterior" disabled={previewClosed} onClick={() => previewIndex === 0 ? closeBook(false) : selectSheet(previewIndex - 1)}><ArrowLeft size={18} /></button>
          <span aria-live="polite">{previewClosed ? "Portada" : `${previewIndex + 1} / 3`}</span>
          <button type="button" aria-label="Carta siguiente" disabled={!previewClosed && previewIndex === 2} onClick={() => selectSheet(previewClosed ? 0 : previewIndex + 1)}><ArrowRight size={18} /></button>
        </div></div>
      </div>
      <aside className="carta-ronny" id="historia" aria-labelledby="carta-ronny-title">
        <div className="carta-ronny-art"><Image src={halloweenCostumes.zombi.src} alt={halloweenCostumes.zombi.alt} width={1024} height={1536} sizes="(max-width: 600px) 85px, 210px" /></div>
        <div className="carta-ronny-copy"><span className="eyebrow"><PawPrint size={15} aria-hidden="true" /> NUESTRO RONNY</span><h3 id="carta-ronny-title">Tiene su genio.<br /><em>Y buen gusto.</em></h3><a href="#selected-menu-dish" onClick={() => onSelect("Salchipulpos")}>Sus snacks favoritos <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </aside>
    </div>
    <dialog ref={dialogRef} className="carta-reader" data-mode={mode} aria-label={closed && mode === "design" ? "Portada del menú de Ronny’s" : `Carta digital de ${truckSheets[sheet].title.toLowerCase()}`} onKeyDown={trapFocus} onClose={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="carta-reader-heading"><strong>La carta del truck</strong><button type="button" autoFocus aria-label="Cerrar carta" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
      <div className="carta-reader-toolbar"><div className="carta-reader-modes" role="group" aria-label="Vista de la carta"><button type="button" aria-pressed={mode === "design"} onClick={() => { setMode("design"); setZoom(0); }}>Diseño del truck</button><button type="button" aria-pressed={mode === "text"} onClick={() => { setMode("text"); setClosed(false); setZoom(0); }}>Texto grande</button></div><div className="carta-pagination" role="group" aria-label="Tamaño de la carta"><button type="button" aria-label="Reducir carta" disabled={zoom === 0} onClick={() => setZoom(zoom - 1)}><Minus size={18} /></button><span aria-live="polite">{100 + zoom * 25}%</span><button type="button" aria-label="Aumentar carta" disabled={zoom === 4} onClick={() => setZoom(zoom + 1)}><Plus size={18} /></button></div></div>
      {tabs(true)}
      <div ref={canvasRef} className="carta-reader-canvas" data-mode={mode} tabIndex={mode === "text" ? 0 : undefined} aria-label="Productos y precios de la carta" style={{ "--carta-text-size": `${20 * (1 + zoom * .25)}px` } as CSSProperties}>
        {open && (mode === "design" ? <MenuBook page={closed ? "cover" : sheet} zoom={1 + zoom * .25} onOpen={() => { setClosed(false); }} /> : <div className="carta-reader-text"><h4>{truckSheets[sheet].title}</h4><p>Precios en MXN</p><ul className="carta-product-list">{products.map(dish=><CartaItem key={dish.name} dish={dish} />)}</ul></div>)}
      </div>
      <div className="carta-reader-footer"><span>Precios en MXN</span><div className="carta-pagination" role="group" aria-label="Pasar hojas de la carta">
        <button type="button" aria-label="Hoja anterior" disabled={closed} onClick={() => sheet === 0 ? closeBook() : showSheet(sheet - 1)}><ArrowLeft size={18} /></button>
        <span aria-live="polite">{closed && mode === "design" ? "Portada" : `${sheet + 1} / 3`}</span>
        <button type="button" aria-label="Hoja siguiente" disabled={!closed && sheet === 2} onClick={() => showSheet(closed ? 0 : sheet + 1)}><ArrowRight size={18} /></button>
      </div></div>
    </dialog>
  </section>;
}
