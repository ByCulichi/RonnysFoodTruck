"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Flower2, Ghost, Snowflake, Sparkles } from "lucide-react";
import "./ronny-seasons.css";

const seasons = [
  { id: "halloween", title: "Halloween", state: "TEMPORADA ACTUAL", image: "/images/hero/ronny-halloween-fair.png", alt: "Ronny de hechicero con varita junto a un caldero, el truck rojo y una feria de Halloween con torre y luna creciente", description: "Hechizos, calabazas y antojos en la feria encantada.", action: "Se antoja una visita", Icon: Ghost },
  { id: "muertos", title: "Día de Muertos", state: "NOVIEMBRE · LO QUE SIGUE", image: "/images/hero/ronny-muertos-ofrenda.png", alt: "Ronny catrín bailando con bastón junto a una ofrenda y el truck rojo en un patio de arcos turquesa al atardecer", description: "Ronny de catrín entre ofrendas, flores y tradición.", action: "Mientras llega, al menú", Icon: Flower2 },
  { id: "christmas", title: "Navidad", state: "MÁS ADELANTE", image: "/images/hero/ronny-christmas-posada.png", alt: "Ronny de Santa saludando desde la ventana del truck rojo, en una posada con piñata de estrella, nochebuenas y faroles", description: "Una posada con luces, piñata y Ronny de Santa.", action: "Mientras llega, al menú", Icon: Snowflake },
];

export function RonnySeasons() {
  const railRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function updateCurrent() {
    const rail = railRef.current;
    if (!rail) return;
    if (rail.scrollWidth <= rail.clientWidth) { setCurrent(0); return; }
    if (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2) { setCurrent(seasons.length - 1); return; }
    const left = rail.getBoundingClientRect().left;
    let closest = 0, distance = Infinity;
    Array.from(rail.children).forEach((item, index) => {
      const next = Math.abs(item.getBoundingClientRect().left - left);
      if (next < distance) { closest = index; distance = next; }
    });
    setCurrent(closest);
  }

  function moveSeason(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const distance = rail.children[1].getBoundingClientRect().left - rail.children[0].getBoundingClientRect().left;
    rail.scrollBy({ left: distance * direction, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateCurrent);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return <section className="seasons-section shell section-space" id="temporadas" aria-labelledby="seasons-title">
    <div className="seasons-heading"><div><div className="eyebrow"><Sparkles size={17} aria-hidden="true" /> RONNY’S POR TEMPORADAS</div><h2 id="seasons-title">Cambian los disfraces.<br /><em>El antojo se queda.</em></h2></div></div>
    <div ref={railRef} className="seasons-grid" id="season-cards" onScroll={updateCurrent} role="group" aria-label="Temporadas de Ronny’s">
      {seasons.map(({ id, title, state, image, alt, description, action, Icon }, index) => <article key={id} className={`season-chapter season-${id}`} aria-labelledby={`${id}-title`}>
        <div className="season-banner"><Image src={image} alt={alt} width={1536} height={1024} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 400px" /><span className={`season-state ${index===0?"season-state-current":"season-state-next"}`}>{index>0 && <Icon size={13} aria-hidden="true" />}{state}</span></div>
        <div className="season-copy"><Icon size={21} aria-hidden="true" /><h3 id={`${id}-title`}>{title}</h3><p>{description}</p><a href="#menu">{action} <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </article>)}
    </div>
    <div className="season-navigation" role="group" aria-label="Recorrer temporadas">
      <button type="button" aria-label="Temporada anterior" aria-controls="season-cards" disabled={current === 0} onClick={() => moveSeason(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
      <span aria-live="polite">{current + 1} / {seasons.length}</span>
      <button type="button" aria-label="Temporada siguiente" aria-controls="season-cards" disabled={current === seasons.length - 1} onClick={() => moveSeason(1)}><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
  </section>;
}
