"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Camera, Minus, PawPrint, Plus, X } from "lucide-react";
import { dishes, type Dish } from "@/lib/menu";
import { getMenuCategory, menuCategories, type MenuCategory } from "@/lib/menu-categories";
import { halloweenCostumes } from "@/lib/ronny-costumes";
import { FoodIcon } from "@/components/food-icon";
import "./menu-carta.css";

const originals = [{ id: "dulces", title: "Dulces" }, { id: "salados", title: "Salados" }, { id: "bebidas", title: "Bebidas" }];

function CartaItem({ dish, onSelect }: { dish: Dish; onSelect?: (name: string) => void }) {
  const multiple = dish.options.length > 1;
  return <li className="carta-item" data-product={dish.name}>
    <div className="carta-item-heading"><h4>{dish.name}</h4>{!multiple && <strong>${dish.options[0].price}</strong>}</div>
    {multiple && <dl>{dish.options.map((option) => <div key={option.name}><dt>{option.name}</dt><dd>${option.price}</dd></div>)}</dl>}
    {["Crepas", "Waffles", "Hotcakes", "Banderilla dulce", "Malteadas"].includes(dish.name) && <p>{dish.description}</p>}
    {onSelect && <a href="#selected-menu-dish" onClick={() => onSelect(dish.name)} aria-label={`Ver foto de ${dish.name}`}>Ver foto <ArrowUpRight size={14} aria-hidden="true" /></a>}
  </li>;
}

export function MenuCarta({ selection, onSelect }: { selection: string; onSelect: (name: string) => void }) {
  const category = getMenuCategory(dishes.find(({ name }) => name === selection) || dishes[0]);
  const [page, setPage] = useState({ category, index: 0 });
  const index = page.category === category ? page.index : 0;
  const products = dishes.filter((dish) => getMenuCategory(dish) === category);
  const pageSize = 4;
  const pageCount = Math.ceil(products.length / pageSize);
  const label = menuCategories.find(({ id }) => id === category)!.label;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"digital" | "original">("original");
  const [original, setOriginal] = useState(0);
  const [zoom, setZoom] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function selectCategory(next: MenuCategory) {
    setPage({ category: next, index: 0 });
    onSelect(dishes.find((dish) => getMenuCategory(dish) === next)!.name);
  }

  function openCarta(button: HTMLButtonElement, nextMode: typeof mode) {
    triggerRef.current = button;
    setMode(nextMode);
    setZoom(0);
    setOriginal(category === "dulces" ? 0 : category === "salados" ? 1 : 2);
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function showOriginal(next: number) {
    setOriginal((next + originals.length) % originals.length);
    setZoom(0);
    canvasRef.current?.scrollTo(0, 0);
  }

  function switchMode(next: typeof mode) {
    if (next === "original") setOriginal(category === "dulces" ? 0 : category === "salados" ? 1 : 2);
    else selectCategory(original === 0 ? "dulces" : original === 1 ? "salados" : category === "calientes" ? "calientes" : "frias");
    setMode(next);
    setZoom(0);
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (mode === "original" && zoom === 0 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      showOriginal(original + (event.key === "ArrowRight" ? 1 : -1));
      return;
    }
    if (event.key !== "Tab") return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], [tabindex='0']");
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  const categories = (dialog = false) => <div className="carta-categories" role="group" aria-label={dialog ? "Categorías de la carta ampliada" : "Categorías de la carta"}>
    {menuCategories.map((item) => <button key={item.id} type="button" aria-label={item.label} aria-pressed={category === item.id} onClick={() => selectCategory(item.id)}><FoodIcon kind={item.icon} /><span>{item.shortLabel}</span></button>)}
  </div>;

  return <section className="truck-carta" id="carta-original" aria-labelledby="truck-carta-title">
    <div className="carta-heading"><div><span className="eyebrow"><BookOpen size={17} aria-hidden="true" /> EL SABOR, BIEN CLARO</span><h3 id="truck-carta-title">La carta del truck.</h3></div><button type="button" className="carta-expand" onClick={(event) => openCarta(event.currentTarget, "original")}><BookOpen size={18} aria-hidden="true" /> Abrir carta</button></div>
    <p className="carta-intro">La misma carta del truck. Ábrela, cambia de hoja y amplía tu antojo.</p>
    <div className="carta-layout">
      <div className="carta-board">
        <div className="carta-paper-brand"><span>Ronny’s</span><small>FOOD TRUCK</small><BookOpen size={24} aria-hidden="true" /></div>
        {categories()}
        <div className="carta-board-caption"><span aria-live="polite">{label}</span><small>Precios en MXN</small></div>
        <ul className="carta-product-list" aria-label={`Carta de ${label.toLowerCase()}`}>
          {products.slice(index * pageSize, (index + 1) * pageSize).map((dish) => <CartaItem key={dish.name} dish={dish} onSelect={onSelect} />)}
        </ul>
        <div className="carta-board-footer"><button type="button" className="carta-original-link" onClick={(event) => openCarta(event.currentTarget, "original")}><Camera size={16} aria-hidden="true" /> Ver fotos originales</button><div className="carta-pagination" role="group" aria-label="Páginas de la carta"><button type="button" aria-label="Página anterior de la carta" disabled={index === 0} onClick={() => setPage({ category, index: index - 1 })}><ArrowLeft size={18} /></button><span aria-live="polite">{index + 1} / {pageCount}</span><button type="button" aria-label="Página siguiente de la carta" disabled={index === pageCount - 1} onClick={() => setPage({ category, index: index + 1 })}><ArrowRight size={18} /></button></div></div>
      </div>
      <aside className="carta-ronny" id="historia" aria-labelledby="carta-ronny-title">
        <div className="carta-ronny-art"><Image src={halloweenCostumes.zombi.src} alt={halloweenCostumes.zombi.alt} width={1024} height={1536} sizes="(max-width: 600px) 125px, 210px" /></div>
        <div className="carta-ronny-copy"><span className="eyebrow"><PawPrint size={15} aria-hidden="true" /> NUESTRO RONNY</span><h3 id="carta-ronny-title">Tiene su genio.<br /><em>Y buen gusto.</em></h3><p>Nuestro chihuahua le pone el nombre; nuestra familia, el sabor.</p><a href="#selected-menu-dish" onClick={() => onSelect("Salchipulpos")}>Sus snacks favoritos <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </aside>
    </div>
    <dialog ref={dialogRef} className="carta-reader" data-mode={mode} aria-label={mode === "digital" ? "Carta en texto grande" : `Carta original de ${originals[original].title.toLowerCase()}`} onKeyDown={trapFocus} onClose={() => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="carta-reader-heading"><strong>{mode === "digital" ? "Carta en texto grande" : `La carta del truck · ${originals[original].title}`}</strong><button type="button" autoFocus aria-label="Cerrar carta" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
      <div className="carta-reader-toolbar"><div className="carta-reader-modes" role="group" aria-label="Vista de la carta"><button type="button" aria-pressed={mode === "original"} onClick={() => switchMode("original")}><BookOpen size={16} aria-hidden="true" /> Carta del truck</button><button type="button" aria-pressed={mode === "digital"} onClick={() => switchMode("digital")}>Texto grande</button></div><div className="carta-pagination" role="group" aria-label="Tamaño de la carta"><button type="button" aria-label="Reducir carta" disabled={zoom === 0} onClick={() => setZoom(zoom - 1)}><Minus size={18} /></button><span aria-live="polite">{100 + zoom * 25}%</span><button type="button" aria-label="Aumentar carta" disabled={zoom === (mode === "original" ? 6 : 3)} onClick={() => setZoom(zoom + 1)}><Plus size={18} /></button></div></div>
      {mode === "digital" ? <>
        {categories(true)}
        <div className="carta-reader-scroll" tabIndex={0} aria-label="Productos y precios de la carta" style={{ "--carta-text-size": `${20 * (1 + zoom * .25)}px` } as CSSProperties}>
          <div className="carta-board-caption"><span>{label}</span><small>Precios en MXN</small></div>
          <ul className="carta-product-list">{products.map((dish) => <CartaItem key={dish.name} dish={dish} />)}</ul>
        </div>
      </> : <>
        <div className="carta-original-tabs" role="group" aria-label="Hojas de la carta original">
          {originals.map((sheet, sheetIndex) => <button type="button" key={sheet.id} aria-pressed={original === sheetIndex} onClick={() => showOriginal(sheetIndex)}>{sheet.title}</button>)}
        </div>
        <div ref={canvasRef} className="carta-original-canvas" tabIndex={0} aria-label="Carta original ampliable; desliza para recorrerla" style={{ "--carta-zoom": 1 + zoom * .25 } as CSSProperties}>
          <div className="carta-original-page">{open && <Image key={original} src={`/images/menu/cartas/carta-${originals[original].id}.jpg`} alt={`Carta original de ${originals[original].title.toLowerCase()} de Ronny’s`} width={828} height={1104} sizes="(max-width: 600px) 100vw, 900px" quality={90} />}</div>
        </div>
        <div className="carta-reader-footer"><a href={`/images/menu/cartas/carta-${originals[original].id}.jpg`} target="_blank" rel="noopener noreferrer">Abrir imagen original <ArrowUpRight size={16} /></a><div className="carta-pagination" role="group" aria-label="Pasar hojas de la carta"><button type="button" aria-label="Hoja anterior" onClick={() => showOriginal(original - 1)}><ArrowLeft size={18} /></button><span aria-live="polite">{original + 1} / 3</span><button type="button" aria-label="Hoja siguiente" onClick={() => showOriginal(original + 1)}><ArrowRight size={18} /></button></div></div>
      </>}
    </dialog>
  </section>;
}
