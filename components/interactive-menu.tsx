"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Ghost, X } from "lucide-react";
import { business, contactDetailsVisible, contactPresentationVisible } from "@/lib/business";
import { dishes, type Dish } from "@/lib/menu";
import { FoodIcon } from "@/components/food-icon";
import { MenuCard } from "@/components/menu-card";
import { MenuPhoto } from "@/components/menu-photo";
import { getMenuCostume, halloweenCostumes } from "@/lib/ronny-costumes";
import { menuCategories, getMenuCategory, type MenuCategory } from "@/lib/menu-categories";
import { RonnyOutfitStage } from "@/components/ronny-outfit-stage";
import "./interactive-menu.css";
import "./ronny-menu-orbit.css";

const getPrice = (dish: Dish) => Math.min(...dish.options.map(({ price }) => price));
const whatsappAvailable = contactDetailsVisible && /^https:\/\/wa\.me\/\d{8,15}(?:\?[^#\s]*)?$/.test(business.whatsappUrl);

export function InteractiveMenu({ selection, onSelect }: { selection: string; onSelect: (name: string) => void }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);
  const active = dishes.find(({ name }) => name === selection) || dishes[1];
  const category = getMenuCategory(active);
  const choices = dishes.filter((dish) => getMenuCategory(dish) === category);
  const categoryLabel = menuCategories.find(({ id }) => id === category)!.label;
  const costume = getMenuCostume(active);
  const guide = halloweenCostumes[costume];
  const selectedIndex = choices.findIndex(({ name }) => name === active.name);
  // Reserve a full-width detail row immediately below the selected product row.
  // CSS chooses the matching row for its column count; every thumbnail keeps
  // the same DOM node and native focus, without resize observers or scrolling.
  const detailRows = {
    "--menu-detail-row-wide": Math.floor(selectedIndex / 4) + 2,
    "--menu-detail-row-medium": Math.floor(selectedIndex / 3) + 2,
    "--menu-detail-row-small": Math.floor(selectedIndex / 2) + 2,
  } as CSSProperties;

  function selectCategory(next: MenuCategory) {
    if (next !== category) {
      setDetailOpen(false);
      onSelect(dishes.find((dish) => getMenuCategory(dish) === next)!.name);
    }
  }

  function closeDetails() {
    setDetailOpen(false);
    selectedButtonRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="interactive-menu">
      <div className="compact-menu-heading">
        <div>
          <div className="eyebrow"><Ghost size={18} aria-hidden="true" /> HALLOWEEN EN EL TRUCK</div>
          <h2 id="compact-menu-title">Antojos de <em>otro mundo.</em></h2>
        </div>
      </div>
      <div className="menu-workspace">
        <aside className={`menu-ronny-guide guide-${category}`} aria-label="Elige tu antojo con Ronny" data-menu-outfit={costume}>
          <div className="menu-guide-art">
            <span className="ronny-orbit-ring" aria-hidden="true" />
            <RonnyOutfitStage costume={costume} />
            <div className="ronny-orbit-options" role="group" aria-label="Opciones alrededor de Ronny">
              {menuCategories.map((item) => <button type="button" key={item.id} className={`ronny-category-orb orb-${item.id}`} title={item.label} aria-label={item.label} aria-pressed={category === item.id} aria-controls="menu-product-browser" onClick={() => selectCategory(item.id)}>
                <FoodIcon kind={item.icon} />{category === item.id && <Check className="ronny-orb-check" size={16} aria-hidden="true" />}
              </button>)}
            </div>
          </div>
          <div className="menu-guide-message"><strong>{guide.title}</strong></div>
        </aside>
        <div className="menu-browser" id="menu-product-browser">
          <span className="sr-only" role="status">{`${active.name}. Precio inicial: ${getPrice(active)} pesos.`}</span>
          <div className="menu-choice-heading"><span aria-live="polite"><strong>{categoryLabel}</strong><small>Fotos y precios · {choices.length} antojos</small></span></div>
          <div className="menu-choice-grid" role="group" aria-label="Elegir producto" style={detailRows}>
            {choices.map((dish) => <button type="button" key={dish.name} ref={dish.name === active.name ? selectedButtonRef : undefined} aria-label={`Ver ${dish.name}`} aria-pressed={detailOpen && dish.name === active.name} aria-expanded={detailOpen && dish.name === active.name} aria-controls="selected-menu-dish" onClick={() => { onSelect(dish.name); setDetailOpen(true); }}>
              <span className="menu-choice-photo"><MenuPhoto photo={dish.photos[0]} alt="" sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 220px" /></span>
              <span className="menu-choice-name">{dish.name}</span>
              <small>{dish.options.some(({ price }) => price !== getPrice(dish)) && "Desde "}<strong>${getPrice(dish)}</strong></small>
              {detailOpen && dish.name === active.name && <Check size={14} className="menu-choice-check" aria-hidden="true" />}
            </button>)}
            <div id="selected-menu-dish" className="selected-menu-dish" role="region" aria-label={`Detalles de ${active.name}`} hidden={!detailOpen}>
              <MenuCard dish={active} index={dishes.indexOf(active)} key={active.name} />
              <div className="menu-detail-actions">
                <button type="button" className="menu-detail-close" aria-label={`Cerrar detalles de ${active.name}`} onClick={closeDetails}><X size={16} aria-hidden="true" /> Cerrar</button>
                {whatsappAvailable ? <a href={`${business.whatsappUrl}?text=${encodeURIComponent(`Hola, Ronny’s. Me gustaría consultar disponibilidad de ${active.name.toLowerCase()}.`)}`} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a> : contactPresentationVisible && <button type="button" className="menu-contact-placeholder contact-placeholder-action" disabled aria-label="Consultar por WhatsApp próximamente" title="WhatsApp próximamente">Consultar por WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
