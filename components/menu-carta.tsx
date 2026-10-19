"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Maximize2, X } from "lucide-react";

const pages = [
  { id: "dulces", title: "Dulces", description: "Crepas, waffles y postres" },
  { id: "salados", title: "Salados", description: "Hamburguesas, hot dogs y snacks" },
  { id: "bebidas", title: "Bebidas", description: "Malteadas, café y bebidas" },
];

export function MenuCarta() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const active = pages[index];
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]");
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return (
    <section className="truck-carta" id="carta-original" aria-labelledby="truck-carta-title">
      <div className="truck-carta-heading"><div><span className="eyebrow"><BookOpen size={17} aria-hidden="true" /> LA ORIGINAL, AQUÍ MISMO</span><h3 id="truck-carta-title">La carta del truck.</h3></div><p>Toca una carta para verla completa.</p></div>
      <div className="truck-carta-pages">
        {pages.map((page, number) => <button type="button" key={page.id} aria-label={`Ampliar carta original de ${page.title.toLowerCase()}`} onClick={(event) => { triggerRef.current = event.currentTarget; setIndex(number); dialogRef.current?.showModal(); setOpen(true); }}>
          <span className="truck-carta-photo"><Image src={`/images/menu/cartas/carta-${page.id}.jpg`} alt={`Carta original de ${page.title.toLowerCase()} de Ronny’s`} fill sizes="(max-width: 600px) 30vw, 350px" style={{ objectFit: "contain" }} /></span>
          <span className="truck-carta-caption"><strong>{page.title}</strong><span><Maximize2 size={14} aria-hidden="true" /> Ampliar</span></span>
        </button>)}
      </div>
      <dialog ref={dialogRef} className="food-photo-dialog letter-dialog" aria-label={`Carta original de ${active.title.toLowerCase()}`} onKeyDown={trapFocus} onClose={() => { setOpen(false); triggerRef.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <div className="photo-dialog-content">
          <div className="photo-dialog-heading"><strong>Carta de {active.title.toLowerCase()}</strong><button type="button" autoFocus aria-label="Cerrar carta" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
          {open && <Image src={`/images/menu/cartas/carta-${active.id}.jpg`} alt={`Carta original de ${active.title.toLowerCase()}: ${active.description}`} width={828} height={1104} sizes="90vw" />}
          <div className="photo-dialog-footer"><a href={`/images/menu/cartas/carta-${active.id}.jpg`} target="_blank" rel="noopener noreferrer">Abrir imagen original <ArrowUpRight size={17} /></a><div className="photo-dialog-controls"><button type="button" aria-label="Carta anterior" onClick={() => setIndex((index + pages.length - 1) % pages.length)}><ArrowLeft size={20} /></button><span aria-live="polite">{index + 1} / {pages.length}</span><button type="button" aria-label="Carta siguiente" onClick={() => setIndex((index + 1) % pages.length)}><ArrowRight size={20} /></button></div></div>
        </div>
      </dialog>
    </section>
  );
}
