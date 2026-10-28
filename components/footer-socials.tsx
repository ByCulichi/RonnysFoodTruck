import { business, contactDetailsVisible } from "@/lib/business";

const networks = [
  { id: "google", label: "Google", url: business.mapsUrl },
  { id: "whatsapp", label: "WhatsApp", url: business.whatsappUrl },
  { id: "instagram", label: "Instagram", url: business.socials.instagram },
  { id: "facebook", label: "Facebook", url: business.socials.facebook },
  { id: "tiktok", label: "TikTok", url: business.socials.tiktok },
] as const;

export function FooterSocials() {
  if (!contactDetailsVisible) return null;
  return (
    <div className="footer-socials">
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label, url }) => (
          <li key={id} className={`footer-network network-${id}`}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="network-trigger"
              aria-label={`Abrir Ronny’s en ${label}`}
              title={label}
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
