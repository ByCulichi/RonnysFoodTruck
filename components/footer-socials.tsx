"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { business } from "@/lib/business";

const networks = [
  { id: "google", label: "Google", url: business.mapsUrl, confirmed: true },
  { id: "whatsapp", label: "WhatsApp", url: business.whatsappUrl, confirmed: true },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/", confirmed: false },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/", confirmed: false },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/", confirmed: false },
  { id: "x", label: "X", url: "https://x.com/", confirmed: false },
] as const;

// Local previews only. Never fetch social profiles or invent posts/follower counts.
export function FooterSocials() {
  const [selected, setSelected] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const restoringFocusRef = useRef(false);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const active = networks.find(({ id }) => id === selected);

  const closePreview = useCallback(() => {
    setSelected(null);
    restoringFocusRef.current = true;
    triggerRef.current?.focus({ preventScroll: true });
    restoringFocusRef.current = false;
  }, []);

  useEffect(() => {
    if (!selected) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); closePreview(); }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setSelected(null);
    }
    // A hover preview can open without focus inside this component.
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [selected, closePreview]);

  return (
    <div className="footer-socials" ref={containerRef}>
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label, url, confirmed }) => (
          <li key={id} className={`footer-network network-${id}`}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="network-trigger"
              aria-label={confirmed ? `Abrir Ronny’s en ${label}` : `Abrir ${label}; perfil de Ronny’s pendiente`}
              aria-expanded={selected === id}
              aria-controls="footer-network-preview"
              onPointerEnter={(event) => { if (event.pointerType === "mouse") { triggerRef.current = event.currentTarget; setSelected(id); } }}
              onFocus={(event) => { if (!restoringFocusRef.current) { triggerRef.current = event.currentTarget; setSelected(id); } }}
              onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(id); }}
            >
              <span className={`social-logo social-logo-${id}`}>
                <img src={`/brands/${id}.svg`} alt="" width={38} height={38} />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <section id="footer-network-preview" className="social-preview-strip" aria-label={active ? `Vista previa de ${active.label}` : "Vista previa de redes"} hidden={!active}>
        {active && <>
          <div className="social-preview-text"><h3>{active.label}</h3><p>{active.id === "whatsapp" ? business.phone : active.id === "google" ? business.address : `Perfil oficial de Ronny’s pendiente. El logo abre ${active.label}.`}</p></div>
          <a href={active.url} target="_blank" rel="noopener noreferrer">{active.id === "whatsapp" ? "Abrir WhatsApp" : active.id === "google" ? "Ver ficha y opiniones" : `Abrir ${active.label}`}<ArrowUpRight size={17} aria-hidden="true" /></a>
          <button className="social-preview-close" type="button" aria-label="Cerrar vista previa" onClick={closePreview}><X size={18} /></button>
        </>}
      </section>
    </div>
  );
}
