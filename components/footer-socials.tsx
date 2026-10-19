"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const [selected, setSelected] = useState<string>("whatsapp");
  const active = networks.find(({ id }) => id === selected)!;
  const isWhatsapp = active.id === "whatsapp";

  return (
    <div className="footer-socials">
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label }) => (
          <li key={id} className={`footer-network network-${id}`}>
            <button
              type="button"
              className="network-trigger"
              aria-label={`Ver vista previa de ${label}`}
              aria-pressed={selected === id}
              aria-controls="footer-network-preview"
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setSelected(id); }}
              onClick={() => setSelected(id)}
            >
              <span className={`social-logo social-logo-${id}`}>
                <img src={`/brands/${id}.svg`} alt="" width={38} height={38} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="social-preview-hint">Toca un logo y descubre más.</p>
      <section id="footer-network-preview" className={`network-preview preview-${active.id}`} aria-label={`Vista previa de ${active.label}`}>
        {active.url ? (
          <>
            <div className="network-preview-art">
              <img className="network-preview-cover" src={isWhatsapp ? "/images/hero/ronny-night-truck.png" : "/images/hero/food-truck.jpg"} alt={isWhatsapp ? "Ronny con su malteada junto al food truck rojo" : "El food truck de Ronny’s"} width={480} height={320} loading="lazy" />
              <img className="network-preview-avatar" src="/images/brand/ronny-flat-logo.png" alt="" width={60} height={60} loading="lazy" />
            </div>
            <div className="network-preview-copy">
              <span className="network-preview-kicker">{isWhatsapp ? "WHATSAPP · CUENTA DE NEGOCIO" : "GOOGLE · FICHA OFICIAL"}</span>
              <h3>Ronny’s Food Truck</h3>
              <p>{isWhatsapp ? business.phone : business.address}</p>
              <a href={active.url} target="_blank" rel="noopener noreferrer">
                {isWhatsapp ? "Abrir WhatsApp" : "Ver ficha y opiniones"} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          <div className="network-preview-pending">
            <img src={`/brands/${active.id}.svg`} alt="" width={34} height={34} />
            <div>
              <h3>{active.label} de Ronny’s</h3>
              <p>Enlace oficial pendiente.</p>
              <small>Lo encontrarás aquí cuando esté confirmado.</small>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
