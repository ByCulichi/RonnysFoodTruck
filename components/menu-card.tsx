"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { FoodIcon } from "@/components/food-icon";
import { menuPhotoUrl, type Dish } from "@/lib/menu";

export function MenuCard({ dish, index }: { dish: Dish; index: number }) {
  const photo = dish.photos[0];
  const price = Math.min(...dish.options.map((option) => option.price));
  const hasVariants = dish.options.length > 1;
  const hasFlavors = ["Crepas", "Waffles", "Hotcakes", "Banderilla dulce", "Banderilla coreana", "Malteadas"].includes(dish.name);
  const variablePrice = dish.options.some((option) => option.price !== price);

  return <article className={`dish-card menu-product ${dish.name === "Malteadas" ? "dish-card-featured" : ""}`} data-group={dish.group}>
    <div className={`dish-image ${photo ? "real-food-photo" : "illustrated-food"}`}>
      {photo ? <>
        <Image src={menuPhotoUrl(photo)} alt={photo.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 40vw, 460px" style={{ objectFit: "contain", objectPosition: "center" }} />
      </> : <>
        <FoodIcon kind={dish.kind} />
        <span className="food-art-label">DEL MENÚ DEL TRUCK</span>
      </>}
      <span className="dish-number">{String(index + 1).padStart(2, "0")}</span>
      {dish.name === "Malteadas" && <span className="dish-favorite"><Star size={14} fill="currentColor" /> EL ANTOJO DE RONNY</span>}
    </div>
    <div className="dish-info">
      <span className="dish-category">{dish.category}</span>
      <div className="dish-title">
        <h3>{dish.name}</h3>
        <div className="dish-price"><small>{variablePrice ? "desde" : "MXN"}</small><strong>${price}</strong></div>
      </div>
      {hasFlavors && <p>{dish.description}</p>}
      {hasVariants && <dl className="dish-price-list" aria-label={`Precios de ${dish.name}`}>
        {dish.options.map((option) => <div key={option.name}><dt>{option.name}</dt><dd>${option.price}</dd></div>)}
      </dl>}
    </div>
  </article>;
}
