"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Star, X } from "lucide-react";
import Image from "next/image";
import { FoodIcon } from "@/components/food-icon";
import { menuPhotoUrl, type Dish } from "@/lib/menu";

export function MenuCard({ dish, index }: { dish: Dish; index: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoOpen, setPhotoOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = dish.photos[photoIndex];
  const price = Math.min(...dish.options.map((option) => option.price));
  const hasVariants = dish.options.length > 1;
  const hasFlavors = ["Crepas", "Waffles", "Hotcakes", "Banderilla dulce", "Banderilla coreana", "Malteadas"].includes(dish.name);
  const variablePrice = dish.options.some((option) => option.price !== price);

  useEffect(() => {
    if (!photoOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [photoOpen]);

  function openPhoto() {
    dialogRef.current?.showModal();
    setPhotoOpen(true);
  }

  function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return <article className={`dish-card menu-product ${dish.name === "Malteadas" ? "dish-card-featured" : ""}`} data-group={dish.group}>
    <div className={`dish-image ${photo ? "real-food-photo" : "illustrated-food"}`}>
      {photo ? <>
        <Image src={menuPhotoUrl(photo)} alt={photo.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 40vw, 460px" style={{ objectPosition: photo.position || "center 72%" }} />
        <button type="button" className="photo-zoom" aria-label={`Ampliar foto de ${dish.name}`} onClick={openPhoto}><span><Maximize2 size={16} /> Ampliar foto</span></button>
      </> : <>
        <FoodIcon kind={dish.kind} />
        <span className="food-art-label">DEL MENÚ DEL TRUCK</span>
      </>}
      <span className="dish-number">{String(index + 1).padStart(2, "0")}</span>
      {dish.name === "Malteadas" && <span className="dish-favorite"><Star size={14} fill="currentColor" /> EL ANTOJO DE RONNY</span>}
      {dish.photos.length > 1 && <div className="dish-photo-picker" role="group" aria-label={`Fotos de ${dish.name}`}>
        {dish.photos.map((item, photoNumber) => <button type="button" key={item.src} aria-label={item.alt} aria-pressed={photoNumber === photoIndex} onClick={() => setPhotoIndex(photoNumber)}>
          <Image src={menuPhotoUrl(item)} alt="" width={56} height={56} />
        </button>)}
      </div>}
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
    {photo && <dialog className="food-photo-dialog" ref={dialogRef} aria-label={`Foto ampliada de ${dish.name}`} onKeyDown={keepDialogFocus} onClose={() => setPhotoOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="photo-dialog-content">
        <div className="photo-dialog-heading"><strong>{dish.name}</strong><button type="button" autoFocus aria-label="Cerrar foto" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
        {photoOpen && <Image src={menuPhotoUrl(photo)} alt={photo.alt} width={900} height={1200} sizes="90vw" />}
        <div className="photo-dialog-footer">
          {!photo.generated && <p>{photo.alt}</p>}
          {dish.photos.length > 1 && <div className="photo-dialog-controls"><button type="button" aria-label="Foto anterior" onClick={() => setPhotoIndex((photoIndex + dish.photos.length - 1) % dish.photos.length)}><ArrowLeft size={20} /></button><span>{photoIndex + 1} / {dish.photos.length}</span><button type="button" aria-label="Siguiente foto" onClick={() => setPhotoIndex((photoIndex + 1) % dish.photos.length)}><ArrowRight size={20} /></button></div>}
        </div>
      </div>
    </dialog>}
  </article>;
}
