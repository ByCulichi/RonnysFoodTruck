import { business } from "@/lib/business";

const networks = [
  { id: "google", label: "Google", url: business.mapsUrl, confirmed: true },
  { id: "whatsapp", label: "WhatsApp", url: business.whatsappUrl, confirmed: true },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/", confirmed: false },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/", confirmed: false },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/", confirmed: false },
  { id: "x", label: "X", url: "https://x.com/", confirmed: false },
] as const;

export function FooterSocials() {
  return (
    <div className="footer-socials">
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label, url, confirmed }) => (
          <li key={id} className={`footer-network network-${id}`}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="network-trigger"
              aria-label={confirmed ? `Abrir Ronny’s en ${label}` : `Abrir ${label}; perfil de Ronny’s pendiente`}
              title={confirmed ? label : `${label} · Perfil oficial pendiente`}
            >
              <span className={`social-logo social-logo-${id}`}>
                <img src={`/brands/${id}.svg`} alt="" width={38} height={38} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
