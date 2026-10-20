"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Ghost } from "lucide-react";
import Image from "next/image";
import { business } from "@/lib/business";
import { dishes, menuPhotoUrl, type Dish } from "@/lib/menu";
import { FoodIcon } from "@/components/food-icon";
import { MenuCard } from "@/components/menu-card";
import { getMenuCostume, halloweenCostumes } from "@/lib/ronny-costumes";
import { menuCategories, getMenuCategory, type MenuCategory } from "@/lib/menu-categories";
import { RonnyOutfitStage } from "@/components/ronny-outfit-stage";
import "./interactive-menu.css";
import "./ronny-menu-orbit.css";

const getPrice = (dish: Dish) => Math.min(...dish.options.map(({ price }) => price));

export function InteractiveMenu({ selection, onSelect }: { selection: string; onSelect: (name: string) => void }) {
  const active = dishes.find(({ name }) => name === selection) || dishes[1];
  const category = getMenuCategory(active);
  const choices = dishes.filter((dish) => getMenuCategory(dish) === category);
  const categoryLabel = menuCategories.find(({ id }) => id === category)!.label;
  const costume = getMenuCostume(active);
  const guide = halloweenCostumes[costume];
  const selectedIndex = choices.findIndex(({ name }) => name === active.name);
  const pageSize = 6;
  const currentPage = Math.max(0, Math.floor(selectedIndex / pageSize));
  const totalPages = Math.ceil(choices.length / pageSize);
  const pageChoices = choices.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  function selectCategory(next: MenuCategory) {
    if (next !== category) onSelect(dishes.find((dish) => getMenuCategory(dish) === next)!.name);
  }

  function selectNext(direction: number) {
    onSelect(choices[(selectedIndex + direction + choices.length) % choices.length].name);
  }

  return (
    <div className="interactive-menu">
      <div className="compact-menu-heading">
        <div>
          <div className="eyebrow"><Ghost size={18} aria-hidden="true" /> HALLOWEEN EN EL TRUCK</div>
          <h2 id="compact-menu-title">Antojos de <em>otro mundo.</em></h2>
          <p>Elige tu antojo y mira cómo Ronny cambia de disfraz.</p>
        </div>
        <div className="menu-heading-actions"><a href="#carta-original"><BookOpen size={18} aria-hidden="true" /> Carta del truck <ArrowUpRight size={16} aria-hidden="true" /></a><span className="compact-menu-currency">Precios en MXN</span></div>
      </div>
      <div className="compact-menu-controls">
        <div className="menu-group-switch" role="group" aria-label="Categorías del menú">
          {menuCategories.map((item) => <button type="button" key={item.id} className={`menu-category-logo logo-${item.id}`} title={item.label} aria-label={item.label} aria-pressed={category === item.id} aria-controls="menu-product-browser" onClick={() => selectCategory(item.id)}>
            <FoodIcon kind={item.icon} /><span className="sr-only">{item.label}</span>{category === item.id && <Check className="menu-category-check" size={14} aria-hidden="true" />}
          </button>)}
        </div>
      </div>
      <div className="menu-workspace">
        <aside className={`menu-ronny-guide guide-${category}`} aria-label="Elige tu antojo con Ronny" data-menu-outfit={costume}>
          <div className="menu-guide-art">
            <span className="ronny-orbit-ring" aria-hidden="true" />
            <RonnyOutfitStage costume={costume} />
            <div className="ronny-orbit-options" role="group" aria-label="Opciones alrededor de Ronny">
              {menuCategories.map((item) => <button type="button" key={item.id} className={`ronny-category-orb orb-${item.id}`} aria-label={item.label} aria-pressed={category === item.id} aria-controls="menu-product-browser" onClick={() => selectCategory(item.id)}>
                <FoodIcon kind={item.icon} /><span>{item.id === "frias" ? <>Bebidas<br />frías</> : item.id === "calientes" ? <>Bebidas<br />calientes</> : item.label}</span>
              </button>)}
            </div>
          </div>
          <div className="menu-guide-message"><strong>{guide.title}</strong><p>{guide.message}</p></div>
        </aside>
        <div className="menu-browser" id="menu-product-browser">
          <span className="sr-only" role="status">{`${active.name}. Precio inicial: ${getPrice(active)} pesos.`}</span>
          <div className="menu-choice-heading"><span aria-live="polite">{`${categoryLabel} · ${choices.length} antojos`}</span>{totalPages > 1 && <div className="menu-page-controls"><button type="button" aria-label="Página anterior de productos" disabled={currentPage === 0} onClick={() => onSelect(choices[(currentPage - 1) * pageSize].name)}><ArrowLeft size={17} /></button><span>{currentPage + 1} / {totalPages}</span><button type="button" aria-label="Página siguiente de productos" disabled={currentPage === totalPages - 1} onClick={() => onSelect(choices[(currentPage + 1) * pageSize].name)}><ArrowRight size={17} /></button></div>}</div>
          <>
            <div className="menu-choice-grid" role="group" aria-label="Elegir producto">
              {pageChoices.map((dish) => <button type="button" key={dish.name} aria-label={`Ver ${dish.name}`} aria-pressed={dish.name === active.name} aria-controls="selected-menu-dish" onClick={() => onSelect(dish.name)}>
                <span className="menu-choice-photo"><Image src={menuPhotoUrl(dish.photos[0])} alt="" fill sizes="(max-width: 600px) 30vw, 170px" style={{ objectFit: "cover", objectPosition: dish.photos[0].position || "center 65%" }} /></span>
                <span className="menu-choice-name">{dish.name}</span>
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
          </>
        </div>
      </div>
    </div>
  );
}
