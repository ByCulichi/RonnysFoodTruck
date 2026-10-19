import { ArrowUpRight } from "lucide-react";
import { FooterSocials } from "@/components/footer-socials";
import { HalloweenFooterIcon } from "@/components/halloween-footer-icon";
import { HalloweenScenery } from "@/components/halloween-scenery";
import { FooterFamilyGround } from "@/components/footer-family-ground";
import { FooterPumpkinLights } from "@/components/footer-pumpkin-lights";
import "./site-footer.css";

const explore = [
  { href: "#inicio", label: "Inicio", icon: "pumpkin" },
  { href: "#menu", label: "Menú", icon: "spider" },
  { href: "#encuentranos", label: "Ubicación", icon: "pumpkin" },
  { href: "#temporadas", label: "Temporadas", icon: "bat" },
  { href: "#historia", label: "Nuestro Ronny", icon: "ghost" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer footer-refresh footer-halloween" id="contacto" aria-labelledby="footer-title">
      <HalloweenScenery className="footer-scenery" />
      <FooterPumpkinLights />
      <div className="shell footer-refresh-inner">
        <div className="footer-refresh-main">
          <div className="footer-message">
            <a href="#inicio" className="footer-brand" aria-label="Ronny’s, volver al inicio"><img src="/images/brand/ronny-flat-logo.png" alt="" width={48} height={48} /><span>RONNY’S<sup>®</sup></span></a>
            <h2 id="footer-title">Aquí sigue<br /><em>el antojo.</em></h2>
            <p>Los sustos pasan.<br />El antojo se queda.</p>
          </div>
          <nav className="footer-explore" aria-labelledby="footer-explore-title">
            <h3 id="footer-explore-title">Explora <HalloweenFooterIcon kind="paw" /></h3>
            <ul>{explore.map(({ href, label, icon }) => <li key={href}><a href={href}><HalloweenFooterIcon kind={icon} /><span>{label}</span></a></li>)}</ul>
          </nav>
          <figure className="footer-family"><img src="/images/ronny/ronny-unicorn-owner-bunny.png" alt="Ronny café de unicornio con su ama pelirroja de conejito rosa" width={1024} height={1536} loading="lazy" /><FooterFamilyGround /></figure>
        </div>
        <section className="footer-refresh-social" aria-labelledby="footer-follow-title"><h3 id="footer-follow-title">Síguenos</h3><FooterSocials /></section>
        <div className="footer-refresh-bottom"><span>© {new Date().getFullYear()} Ronny’s Food Truck</span><a href="#menu">Un antojo más <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
