"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { BookOpen, Minus, PawPrint, Plus, Type } from "lucide-react";
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
  const [mode, setMode] = useState<"design" | "text">("design");
  const [page, setPage] = useState<BookPage>("cover");
  const [zoom, setZoom] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sheet = typeof page === "number" ? page : page === "back" ? 2 : 0;
  const products = dishes.filter(dish => dish.group === (sheet === 0 ? "Dulces" : sheet === 1 ? "Salados" : "Bebidas"));
  const reading = typeof page === "number" || mode === "text";

  function showPage(next: BookPage) {
    canvasRef.current?.querySelector<HTMLElement>(".menu-book-viewport")?.focus({ preventScroll: true });
    setPage(next); setZoom(0);
  }
  function nextPage() { if (page === "cover") showPage(0); else if (typeof page === "number") showPage(page === 2 ? "back" : page + 1); }
  function previousPage() { if (page === "back") showPage(2); else if (typeof page === "number") showPage(page === 0 ? "cover" : page - 1); }

  function handleBookKeys(event: KeyboardEvent<HTMLDivElement>) {
    // Keep page navigation local to the book; Tab and the rest of the page stay native.
    if (mode !== "design") return;
    if (event.key === "Escape") { event.preventDefault(); showPage("cover"); return; }
    if (zoom !== 0 || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    if (event.key === "ArrowRight") nextPage(); else previousPage();
  }

  return <section className="truck-carta" id="carta-original" aria-labelledby="truck-carta-title">
    <div className="carta-heading"><div><span className="eyebrow"><BookOpen size={17} aria-hidden="true" /> EL SABOR, BIEN CLARO</span><h3 id="truck-carta-title">La carta del truck.</h3></div></div>
    <div className="carta-layout">
      <div className="carta-digital-preview">
        <div ref={canvasRef} className="carta-inline-canvas" data-mode={mode} onKeyDown={handleBookKeys} tabIndex={mode === "text" ? 0 : undefined} aria-label="Productos y precios de la carta" style={{ "--carta-text-size": `${20 * (1 + zoom * .25)}px` } as CSSProperties}>
          {mode === "design" ? <MenuBook page={page} zoom={1 + zoom * .25} onOpen={() => showPage(page === "back" ? 2 : 0)} onNext={nextPage} onPrevious={previousPage} /> : <div className="carta-inline-text"><label className="carta-text-category">Carta <select aria-label="Categoría de la carta" value={sheet} onChange={event => { setPage(Number(event.target.value)); canvasRef.current?.scrollTo(0, 0); }}>{truckSheets.map((item, index) => <option value={index} key={item.id}>{item.title}</option>)}</select></label><h4>{truckSheets[sheet].title}</h4><ul className="carta-product-list">{products.map(dish => <CartaItem key={dish.name} dish={dish} />)}</ul></div>}
        </div>
        <div className="carta-inline-tools" data-visible={reading} role="group" aria-label="Opciones de lectura de la carta">
          <button type="button" className="carta-text-toggle" onClick={() => { setMode(mode === "design" ? "text" : "design"); setZoom(0); }}>{mode === "design" ? <Type size={18} aria-hidden="true" /> : <BookOpen size={18} aria-hidden="true" />}{mode === "design" ? "Texto grande" : "Volver al libro"}</button>
          <div className="carta-pagination" role="group" aria-label="Tamaño de la carta"><button type="button" aria-label="Reducir carta" disabled={zoom === 0} onClick={() => setZoom(zoom - 1)}><Minus size={18} aria-hidden="true" /></button><span aria-live="polite">{100 + zoom * 25}%</span><button type="button" aria-label="Aumentar carta" disabled={zoom === (mode === "design" ? 12 : 4)} onClick={() => setZoom(zoom + 1)}><Plus size={18} aria-hidden="true" /></button></div>
        </div>
        <span className="sr-only" aria-live="polite">{page === "back" ? "Libro cerrado. Contraportada." : page === "cover" ? "Libro cerrado. Portada." : `${truckSheets[sheet].title}. Hoja ${sheet + 1} de 3.`}</span>
      </div>
      <aside className="carta-ronny" id="historia" aria-labelledby="carta-ronny-title">
        <div className="carta-ronny-art"><Image src={halloweenCostumes.zombi.src} alt={halloweenCostumes.zombi.alt} width={1024} height={1536} sizes="(max-width: 600px) 85px, 210px" /></div>
        <div className="carta-ronny-copy"><span className="eyebrow"><PawPrint size={15} aria-hidden="true" /> NUESTRO RONNY</span><h3 id="carta-ronny-title">Tiene su genio.<br /><em>Y buen gusto.</em></h3></div>
      </aside>
    </div>
  </section>;
}
