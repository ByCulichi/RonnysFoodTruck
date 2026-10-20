import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FooterSocials } from "@/components/footer-socials";
import { HalloweenFooterIcon } from "@/components/halloween-footer-icon";
import { HalloweenScenery } from "@/components/halloween-scenery";
import { FooterFamilyGround } from "@/components/footer-family-ground";
import "./site-footer.css";

const explore = [
  { href: "#inicio", label: "Inicio", icon: "pumpkin" },
  { href: "#menu", label: "Menú", icon: "treat" },
  { href: "#encuentranos", label: "Ubicación", icon: "pin" },
  { href: "#temporadas", label: "Temporadas", icon: "bat" },
  { href: "#historia", label: "Nuestro Ronny", icon: "paw" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer footer-refresh footer-halloween" id="contacto" aria-labelledby="footer-title">
      <HalloweenScenery className="footer-scenery" />
      <div className="shell footer-refresh-inner">
        <div className="footer-refresh-main">
          <figure className="footer-family"><img src="/images/ronny/ronny-unicorn-owner-bunny.png" alt="Ronny café de unicornio con su ama pelirroja de conejito rosa" width={1024} height={1536} loading="lazy" /><FooterFamilyGround /></figure>
          <nav className="footer-explore" aria-labelledby="footer-explore-title">
            <h3 id="footer-explore-title">Explora <HalloweenFooterIcon kind="paw" /></h3>
            <ul>{explore.map(({ href, label, icon }) => <li key={href}><a href={href}><HalloweenFooterIcon kind={icon} /><span>{label}</span></a></li>)}</ul>
          </nav>
          <div className="footer-message">
            <a href="#inicio" className="footer-brand" aria-label="Ronny’s, volver al inicio"><Image className="footer-ronny-head" src="/images/brand/ronny-devil-head-caracter.png" alt="Cabeza de Ronny con gesto enojón y travieso, cuernitos de diablito y pañuelo rojo" width={1254} height={1254} sizes="(max-width: 760px) 64px, 88px" /><span>RONNY’S<sup>®</sup></span></a>
            <h2 id="footer-title"><span>Aquí sigue</span><em>el antojo.</em></h2>
            <p className="footer-tagline"><span>Los sustos pasan.</span><strong>El antojo se queda.</strong></p>
          </div>
        </div>
        <section className="footer-refresh-social" aria-labelledby="footer-follow-title"><h3 id="footer-follow-title">Síguenos</h3><FooterSocials /></section>
        <div className="footer-refresh-bottom"><span>© {new Date().getFullYear()} Ronny’s Food Truck</span><a href="#menu">Un antojo más <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
