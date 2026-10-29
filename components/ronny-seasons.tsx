"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Flower2, Ghost, Heart, PartyPopper, Snowflake, Sparkles } from "lucide-react";
import { TruckCinema } from "@/components/truck-cinema";
import { truckArtwork } from "@/lib/truck-cinema";
import "./ronny-seasons.css";

const seasons = [
  { id: "halloween", title: "Halloween", state: "TEMPORADA ACTUAL", image: truckArtwork.halloween.src, alt: "Ronny de hechicero junto al truck rojo iluminado, con calabazas y un bosque oscuro de Halloween", description: "Roo de hechicero. Una noche de miedo en el truck.", action: "Se antoja una visita", Icon: Ghost },
  { id: "muertos", title: "Día de Muertos", state: "NOVIEMBRE · LO QUE SIGUE", image: truckArtwork.muertos.src, alt: "Ronny de catrín con maquillaje de calavera y el truck rojo entre cempasúchil y luz naranja de noviembre", description: "Roo de catrín, cempasúchil y tradición.", action: "Mientras llega, al menú", Icon: Flower2 },
  { id: "christmas", title: "Navidad", state: "DICIEMBRE · MÁS ADELANTE", image: truckArtwork.christmas.src, alt: "Ronny de Santa con chocolate caliente junto al truck rojo, entre nieve y pinos en una noche azul", description: "Roo de Santa. Nieve, luces y algo calientito.", action: "Mientras llega, al menú", Icon: Snowflake },
  { id: "newyear", title: "¡Hola, 2027!", state: "ENERO · AÑO NUEVO", image: truckArtwork.newyear.src, alt: "Roo de gala recibe el 2027 junto al food truck rojo, entre luces doradas y fuegos artificiales", description: "Año nuevo, los mismos antojos. Roo y el truck reciben el 2027.", action: "Empieza por el menú", Icon: PartyPopper },
  { id: "valentines", title: "Amor y amistad", state: "FEBRERO · AMOR Y AMISTAD", image: truckArtwork.valentines.src, alt: "Roo de cupido con atuendo cereza, alas y una bandeja para compartir junto al truck rojo decorado con corazones", description: "Roo de cupido. El mejor antojo es el que se comparte.", action: "Un antojo para compartir", Icon: Heart },
] as const;

export function RonnySeasons() {
  const railRef = useRef<HTMLDivElement>(null);
  const snowRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const snow = snowRef.current;
    if (!snow) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => { snow.dataset.playing = String(visible && !document.hidden && !preference.matches); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
    observer.observe(snow);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <section className="seasons-section shell section-space" id="temporadas" aria-labelledby="seasons-title">
    <div className="seasons-heading"><div><div className="eyebrow"><Sparkles size={17} aria-hidden="true" /> RONNY’S POR TEMPORADAS</div><h2 id="seasons-title">Cambian los disfraces.<br /><em>El antojo se queda.</em></h2></div></div>
    <div ref={railRef} className="seasons-grid" id="season-cards" onScroll={updateCurrent} role="group" aria-label="Temporadas de Ronny’s">
      {seasons.map(({ id, title, state, image, alt, description, action, Icon }, index) => <article key={id} className={`season-chapter season-${id}`} aria-labelledby={`${id}-title`}>
        <div className="season-banner"><Image src={image} alt={alt} width={truckArtwork[id].width} height={truckArtwork[id].height} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 50vw, 640px" /><TruckCinema season={id} />{id === "christmas" && <div ref={snowRef} className="season-snow" aria-hidden="true" data-playing="false">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>}<span className={`season-state ${index===0?"season-state-current":"season-state-next"}`}>{index>0 && <Icon size={13} aria-hidden="true" />}{state}</span></div>
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
