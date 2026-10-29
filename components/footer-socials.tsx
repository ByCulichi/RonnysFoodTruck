import { business, contactDetailsVisible, contactPresentationVisible } from "@/lib/business";

const networks = [
  { id: "google", label: "Google", url: business.mapsUrl },
  { id: "whatsapp", label: "WhatsApp", url: business.whatsappUrl },
  { id: "instagram", label: "Instagram", url: business.socials.instagram },
  { id: "facebook", label: "Facebook", url: business.socials.facebook },
  { id: "tiktok", label: "TikTok", url: business.socials.tiktok },
] as const;

function hasContactDestination(id: typeof networks[number]["id"], value: string) {
  if (!contactDetailsVisible || !value) return false;
  try {
    const url = new URL(value);
    const hosts = {
      google: ["google.com", "www.google.com", "maps.google.com", "maps.app.goo.gl"],
      whatsapp: ["wa.me"],
      instagram: ["instagram.com", "www.instagram.com"],
      facebook: ["facebook.com", "www.facebook.com", "fb.com", "www.fb.com"],
      tiktok: ["tiktok.com", "www.tiktok.com"],
    };
    if (url.protocol !== "https:" || !hosts[id].includes(url.hostname)) return false;
    return id === "whatsapp" ? /^\/\d{8,15}$/.test(url.pathname) : url.pathname.length > 1 || url.search.length > 1;
  } catch { return false; }
}

export function FooterSocials() {
  if (!contactPresentationVisible) return null;
  return (
    <div className="footer-socials">
      <ul className="footer-networks" aria-label="Redes y contacto de Ronny’s">
        {networks.map(({ id, label, url }) => (
          <li key={id} className={`footer-network network-${id}`}>
            {hasContactDestination(id, url) ? <a
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
            </a> : <button type="button" className="network-trigger contact-placeholder-action" disabled aria-label={`${label} próximamente`} title={`${label} próximamente`}><span className={`social-logo social-logo-${id}`}><img src={`/brands/${id}.svg`} alt="" width={38} height={38} /></span></button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
