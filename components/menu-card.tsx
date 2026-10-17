"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { FoodIcon } from "@/components/food-icon";
import type { Dish } from "@/lib/menu";

export function MenuCard({ dish, index }: { dish: Dish; index: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = dish.photos[photoIndex];
  const price = Math.min(...dish.options.map((option) => option.price));
  const variablePrice = dish.options.some((option) => option.price !== price);
  return <article className={`dish-card menu-product ${dish.name === "Malteadas" ? "dish-card-featured" : ""}`} data-group={dish.group}>
    <div className={`dish-image ${photo ? "real-food-photo" : "illustrated-food"}`}>
      {photo ? <img src={`/menu/${photo.src}.jpg`} alt={photo.alt} width={600} height={600} loading="lazy" style={{ objectPosition: photo.position || "center 70%" }} /> : <>
        <FoodIcon kind={dish.kind} />
        <span className="food-art-label">DEL MENÚ DEL TRUCK</span>
      </>}
      <span className="dish-number">{String(index + 1).padStart(2, "0")}</span>
      {dish.name === "Malteadas" && <span className="dish-favorite"><Star size={12} fill="currentColor" /> EL ANTOJO DE RONNY</span>}
      {dish.photos.length > 1 && <div className="dish-photo-picker" role="group" aria-label={`Fotos de ${dish.name}`}>
        {dish.photos.map((item, photoNumber) => <button type="button" key={item.src} aria-label={item.alt} aria-pressed={photoNumber === photoIndex} onClick={() => setPhotoIndex(photoNumber)}>
          <img src={`/menu/${item.src}.jpg`} alt="" width={48} height={48} loading="lazy" />
        </button>)}
      </div>}
    </div>
    <div className="dish-info">
      <span className="dish-category">{dish.category}</span>
      <div className="dish-title">
        <h3>{dish.name}</h3>
        <div><small>{variablePrice ? "desde" : "MXN"}</small><strong>${price}</strong></div>
      </div>
      <p>{dish.description}</p>
      {dish.options.length > 1 ? <details className="dish-options">
        <summary>Opciones y precios <ChevronDown size={16} aria-hidden="true" /></summary>
        <dl>{dish.options.map((option) => <div key={option.name}><dt>{option.name}</dt><dd>${option.price}</dd></div>)}</dl>
      </details> : <div className="dish-detail">{dish.options[0].name} · ${price}</div>}
    </div>
  </article>;
}
