"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { business } from "@/lib/business";

const networks = [
  { id: "google", label: "Google", url: business.mapsUrl },
  { id: "whatsapp", label: "WhatsApp", url: business.whatsappUrl },
  { id: "instagram", label: "Instagram", url: null },
  { id: "facebook", label: "Facebook", url: null },
  { id: "tiktok", label: "TikTok", url: null },
  { id: "x", label: "X", url: null },
] as const;

// Local previews only. Never fetch social profiles or invent posts/follower counts.
export function FooterSocials() {
  const [selected, setSelected] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const active = networks.find(({ id }) => id === selected);

  function closePreview() {
    setSelected(null);
    triggerRef.current?.focus();
  }

  return (
    <div className="footer-socials" onKeyDown={(event) => { if (event.key === "Escape" && active) { event.preventDefault(); closePreview(); } }}>
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label }) => (
          <li key={id} className={`footer-network network-${id}`}>
            <button
              type="button"
              className="network-trigger"
              aria-label={`Ver vista previa de ${label}`}
              aria-pressed={selected === id}
              aria-expanded={selected === id}
              aria-controls="footer-network-preview"
              onPointerEnter={(event) => { if (event.pointerType === "mouse") { triggerRef.current = event.currentTarget; setSelected(id); } }}
              onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(id); }}
            >
              <span className={`social-logo social-logo-${id}`}>
                <img src={`/brands/${id}.svg`} alt="" width={38} height={38} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <section id="footer-network-preview" className="social-preview-strip" aria-label={active ? `Vista previa de ${active.label}` : "Vista previa de redes"} hidden={!active}>
        {active && <>
          <div className="social-preview-text"><h3>{active.label}</h3><p>{active.id === "whatsapp" ? business.phone : active.id === "google" ? business.address : "Enlace oficial pendiente."}</p></div>
          {active.url && <a href={active.url} target="_blank" rel="noopener noreferrer">{active.id === "whatsapp" ? "Abrir WhatsApp" : "Ver ficha y opiniones"}<ArrowUpRight size={17} aria-hidden="true" /></a>}
          <button className="social-preview-close" type="button" aria-label="Cerrar vista previa" onClick={closePreview}><X size={18} /></button>
        </>}
      </section>
    </div>
  );
}
