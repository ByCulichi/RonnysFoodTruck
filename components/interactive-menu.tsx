"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Search, UtensilsCrossed, X } from "lucide-react";
import { business } from "@/lib/business";
import { dishes, type Dish } from "@/lib/menu";
import { FoodIcon } from "@/components/food-icon";
import { MenuCard } from "@/components/menu-card";
import "./interactive-menu.css";

type Group = Dish["group"];
const groups: Group[] = ["Dulces", "Salados", "Bebidas"];
const guides = {
  Dulces: { image: "dulces", width: 1024, height: 1536, title: "El lado dulce de Ronny.", message: "Waffles, crepas y postres. Tú elige, que yo pongo la crema.", alt: "Ronny café de repostero de Halloween decorando un waffle" },
  Salados: { image: "salados", width: 1024, height: 1536, title: "Pequeño, pero con hambre.", message: "Hot dogs, hamburguesas y snacks. Estos antojos sí los defiendo.", alt: "Ronny café de anfitrión de Halloween con su hot dog" },
  Bebidas: { image: "bebidas", width: 1536, height: 1024, title: "Un sorbito y se me pasa.", message: "Malteadas, frappés y cafecito. Yo ya estoy preparando el mío.", alt: "Ronny café de malteadero de Halloween preparando una malteada" },
};
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const getPrice = (dish: Dish) => Math.min(...dish.options.map(({ price }) => price));

export function InteractiveMenu({ selection, onSelect }: { selection: string; onSelect: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const requested = dishes.find(({ name }) => name === selection) || dishes[1];
  const term = normalize(query.trim());
  const choices = term ? dishes.filter((dish) => normalize(`${dish.name} ${dish.description} ${dish.options.map(({ name }) => name).join(" ")}`).includes(term)) : dishes.filter(({ group }) => group === requested.group);
  const active = choices.find(({ name }) => name === selection) || choices[0];
  const group = active?.group || requested.group;
  const guide = guides[group];
  const selectedIndex = choices.findIndex(({ name }) => name === active?.name);

  function selectGroup(next: Group) {
    setQuery("");
    if (next !== requested.group) onSelect(dishes.find(({ group }) => group === next)!.name);
  }

  function selectNext(direction: number) {
    onSelect(choices[(selectedIndex + direction + choices.length) % choices.length].name);
  }

  function clearSearch() {
    setQuery("");
    searchRef.current?.focus();
  }

  return (
    <div className="interactive-menu">
      <div className="compact-menu-heading">
        <div>
          <div className="eyebrow"><UtensilsCrossed size={16} aria-hidden="true" /> EL MENÚ DEL TRUCK</div>
          <h2 id="compact-menu-title">Tu antojo, <em>sin vueltas.</em></h2>
          <p>Elige una categoría y toca lo que se te antoje.</p>
        </div>
        <span className="compact-menu-currency">Precios en MXN</span>
      </div>
      <div className="compact-menu-controls">
        <div className="menu-group-switch" role="group" aria-label="Categorías del menú">
          {groups.map((item) => <button type="button" key={item} aria-pressed={!term && group === item} onClick={() => selectGroup(item)}>
            <FoodIcon kind={item === "Dulces" ? "Waffles" : item === "Salados" ? "Hamburguesas" : "Malteadas"} />
            <span>{item}</span><small>{dishes.filter(({ group }) => group === item).length}</small>
          </button>)}
        </div>
        <div className="compact-menu-search">
          <Search size={18} aria-hidden="true" />
          <input ref={searchRef} type="search" aria-label="Buscar en todo el menú" placeholder="Busca tu antojo…" value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && <button type="button" aria-label="Limpiar búsqueda" onClick={clearSearch}><X size={18} /></button>}
        </div>
      </div>
      <div className="menu-workspace">
        <aside className={`menu-ronny-guide guide-${guide.image}`} aria-label="Ronny te acompaña" data-menu-outfit={guide.image}>
          <div className="menu-guide-art">
            <img key={guide.image} src={`/images/ronny/menu/ronny-${guide.image}.png`} alt={guide.alt} width={guide.width} height={guide.height} loading="lazy" />
            <span className="guide-orbit orbit-dulces" aria-hidden="true"><FoodIcon kind="Waffles" /></span>
            <span className="guide-orbit orbit-salados" aria-hidden="true"><FoodIcon kind="Hamburguesas" /></span>
            <span className="guide-orbit orbit-bebidas" aria-hidden="true"><FoodIcon kind="Malteadas" /></span>
          </div>
          <div className="menu-guide-message"><strong>{guide.title}</strong><p>{guide.message}</p></div>
        </aside>
        <div className="menu-browser">
          <span className="sr-only" role="status">{active ? `${active.name}. Precio inicial: ${getPrice(active)} pesos.` : "Sin productos para esta búsqueda."}</span>
          <div className="menu-choice-heading"><span aria-live="polite">{term ? `${choices.length} resultados en todo el menú` : `${group} · ${choices.length} antojos`}</span><span>Toca para ver</span></div>
          {choices.length > 0 ? <>
            <div className="menu-choice-grid" role="group" aria-label="Elegir producto">
              {choices.map((dish) => <button type="button" key={dish.name} aria-label={`Ver ${dish.name}`} aria-pressed={dish.name === active.name} aria-controls="selected-menu-dish" onClick={() => onSelect(dish.name)}>
                <FoodIcon kind={dish.kind} />
                <span>{dish.name}</span>
                <small>{dish.options.some(({ price }) => price !== getPrice(dish)) ? "Desde" : "MXN"} <strong>${getPrice(dish)}</strong></small>
                {dish.name === active.name && <Check size={14} className="menu-choice-check" aria-hidden="true" />}
              </button>)}
            </div>
            <div id="selected-menu-dish" className="selected-menu-dish" role="region" aria-label={`Detalles de ${active.name}`}>
              <MenuCard dish={active} index={dishes.indexOf(active)} key={active.name} />
              <div className="menu-detail-actions">
                <div className="menu-stepper" aria-label="Recorrer productos">
                  <button type="button" aria-label="Producto anterior" disabled={choices.length < 2} onClick={() => selectNext(-1)}><ArrowLeft size={18} /></button>
                  <span>{selectedIndex + 1} de {choices.length}</span>
                  <button type="button" aria-label="Producto siguiente" disabled={choices.length < 2} onClick={() => selectNext(1)}><ArrowRight size={18} /></button>
                </div>
                <a href={`${business.whatsappUrl}?text=${encodeURIComponent(`Hola, Ronny’s. Me gustaría consultar disponibilidad de ${active.name.toLowerCase()}.`)}`} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </> : <div className="compact-menu-empty"><Search size={27} aria-hidden="true" /><h3>No encontramos ese antojo.</h3><p>Prueba con otro nombre o ingrediente.</p><button type="button" onClick={clearSearch}>Volver al menú</button></div>}
        </div>
      </div>
    </div>
  );
}
