import { ArrowUpRight, Clock, MapPin, MessageCircle, PawPrint, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { FooterSocials } from "@/components/footer-socials";
import "./site-footer.css";

export function SiteFooter() {
  return (
    <footer className="site-footer footer-refresh" id="contacto" aria-labelledby="footer-title">
      <div className="shell footer-refresh-inner">
        <div className="footer-refresh-main">
          <div className="footer-message">
            <a href="#inicio" className="footer-brand" aria-label="Ronny’s, volver al inicio"><img src="/images/brand/ronny-flat-logo.png" alt="" width={48} height={48} /><span>RONNY’S<sup>®</sup></span></a>
            <h2 id="footer-title">Aquí sigue<br /><em>el antojo.</em></h2>
            <p>Nos vemos en el truck. O escríbenos y armamos tu próximo antojo.</p>
          </div>
          <figure className="footer-family">
            <img src="/images/ronny/ronny-unicorn-owner-bunny.png" alt="Ronny café de unicornio con su ama pelirroja de conejito rosa" width={1024} height={1536} loading="lazy" />
            <figcaption>Con cariño, <strong>Ronny.</strong><PawPrint size={18} aria-hidden="true" /></figcaption>
          </figure>
          <div className="footer-contact-lines" aria-label="Visítanos o contáctanos">
            <a className="footer-contact-line" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19} aria-hidden="true" /><span>{business.address}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <div className="footer-contact-line footer-phone-line"><MessageCircle size={19} aria-hidden="true" /><a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer">{business.phone} <span>Escríbenos por WhatsApp</span></a><a className="footer-call" href={`tel:${business.phoneInternational}`} aria-label={`Llamar a Ronny’s al ${business.phone}`}><Phone size={17} aria-hidden="true" /></a></div>
            <div className="footer-contact-line"><Clock size={19} aria-hidden="true" /><p>{business.hours}<small>{business.closedDays}</small></p></div>
          </div>
        </div>
        <div className="footer-refresh-social"><FooterSocials /></div>
        <div className="footer-refresh-bottom"><span>© {new Date().getFullYear()} Ronny’s Food Truck</span><a href="#menu">Un antojo más <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
