"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  ArrowDown,
  House,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Menu,
  PawPrint,
  Ghost,
  UtensilsCrossed,
  Phone,
  MessageCircle,
  Bike,
  Clock,
  CalendarDays,
  X,
} from "lucide-react";
import { business, contactDetailsVisible } from "@/lib/business";
import { VisitSection } from "@/components/visit-section";
import { SiteFooter } from "@/components/site-footer";
import { RonnySeasons } from "@/components/ronny-seasons";
import { InteractiveMenu } from "@/components/interactive-menu";
import { halloweenCostumes } from "@/lib/ronny-costumes";
import { MenuCarta } from "@/components/menu-carta";
import { HalloweenFairground, HalloweenMarketScene } from "@/components/halloween-market-scene";
import { FridayPromo } from "@/components/friday-promo";
import { MenuNightScenery } from "@/components/menu-night-scenery";
import { TruckCinema } from "@/components/truck-cinema";
import { truckArtwork } from "@/lib/truck-cinema";
import { RooWelcome } from "@/components/roo-welcome";

const ronnyCharacters = {
  sport: { name: "Ronny con su playerita roja Adidas descansando sobre su cobija", image: "/images/ronny/ronny-red-sports.png", width: 1536, height: 1024 },
  grumpy: { name: halloweenCostumes.zombi.alt, image: halloweenCostumes.zombi.src, width: 1024, height: 1536 },
  host: { name: halloweenCostumes.diablito.alt, image: halloweenCostumes.diablito.src, width: 1024, height: 1536 },
  nose: { name: "Ronny con chamarrita roja lamiéndose la nariz", image: "/images/ronny/ronny-nose-lick.png", width: 1230, height: 1278 },
};
const navLinks = [
  ["inicio", "Inicio"],
  ["menu", "Menú"],
  ["temporadas", "Temporadas"],
  ["encuentranos", "Encuéntranos"],
].filter(([id]) => contactDetailsVisible || id !== "encuentranos");

const navIcons = { inicio: House, menu: UtensilsCrossed, temporadas: CalendarDays, historia: PawPrint, encuentranos: MapPin, contacto: MessageCircle, domicilio: Bike };

function Mascot({ character, className = "" }: { character: keyof typeof ronnyCharacters; className?: string }) {
  const art = ronnyCharacters[character];
  return <div className={`ronny-cutout ${className}`} data-character={character}><Image src={art.image} alt={art.name} width={art.width} height={art.height} sizes="(max-width: 600px) 180px, 320px" /></div>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); mobileToggleRef.current?.focus({ preventScroll: true }); }
    };
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    document.addEventListener("keydown", handleEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);
  function keepMobileFocus(event: KeyboardEvent<HTMLElement>) {
    if (!mobileOpen) return;
    if (event.key !== "Tab") return;
    const links = mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    const first = mobileToggleRef.current, last = links?.[links.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  useEffect(() => {
    const updateActiveSection = () => {
      let current = "inicio";
      let closestTop = -Infinity;
      for (const [id] of navLinks) {
        const section = document.getElementById(id);
        const top = section?.getBoundingClientRect().top;
        if (top !== undefined && top <= window.innerHeight * .3 && top >= closestTop) { current = id; closestTop = top; }
      }
      setActiveSection(current);
    };
    const observer = new IntersectionObserver(updateActiveSection, { rootMargin: "-15% 0px -55% 0px" });
    updateActiveSection();
    for (const [id] of navLinks) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  const [menuSelection, setMenuSelection] = useState("Crepas");
  function viewCartaDish(name: string) {
    setMenuSelection(name);
  }
  return (
    <div className="ronny-site halloween-season" data-navigation-open={mobileOpen}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header" onKeyDown={keepMobileFocus}>
        <div className="shell header-inner">
          <a href="#inicio" className="brand" aria-label="Ronny’s, inicio">
            <RooWelcome />
            <span>
              RONNY’S<span className="brand-sub"><Ghost size={12} aria-hidden="true" /> FOOD TRUCK · HALLOWEEN</span>
            </span>
            <span className="brand-dot">®</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navLinks.map(([id, label]) => {
              const Icon = navIcons[id as keyof typeof navIcons];
              return <a href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}><Icon size={18} aria-hidden="true" />{label}</a>;
            })}
          </nav>
          <a className="header-cta" href="#menu" aria-label="Ver el menú de Ronny’s">
            <UtensilsCrossed size={18} aria-hidden="true" /><span>Ver menú</span>
          </a>
          <button
            className="mobile-toggle"
            ref={mobileToggleRef}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-nav"
            ref={mobileNavRef}
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            <p className="mobile-nav-heading">Tu próxima parada feliz.</p>
            {[...navLinks, ...(contactDetailsVisible ? [["domicilio", "A domicilio"], ["contacto", "Contacto"]] : [])].map(([id, label]) => {
              const Icon = navIcons[id as keyof typeof navIcons];
              return <a href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined} onClick={() => { setMobileOpen(false); setActiveSection(id); }}><span><Icon size={22} aria-hidden="true" />{label}</span><ArrowUpRight size={18} aria-hidden="true" /></a>;
            })}
            {contactDetailsVisible && <a className="mobile-whatsapp" href={business.whatsappUrl} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={22} aria-hidden="true" />Escríbenos por WhatsApp</span><ArrowUpRight size={18} /></a>}
          </nav>
        )}
      </header>

      <main id="contenido">
        <section className="night-hero halloween-hero" id="inicio" aria-labelledby="night-title">
          <div className="night-scene">
            <Image
              src={truckArtwork.halloween.src}
              alt="Roo de hechicero junto al truck rojo iluminado, entre calabazas, niebla y árboles oscuros de Halloween"
              width={truckArtwork.halloween.width}
              height={truckArtwork.halloween.height}
              priority
              sizes="100vw"
            />
            <TruckCinema season="halloween" />
          </div>
          <div className="night-lights" aria-hidden="true">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
              <path d="M-20 0 Q360 180 720 35 Q1080 180 1460 0" />
              {[45, 140, 240, 340, 440, 540, 640, 800, 900, 1000, 1100, 1200, 1300, 1395].map((x, i) => (
                <ellipse key={x} cx={x} cy={[20, 47, 65, 78, 78, 68, 51, 51, 68, 78, 78, 65, 47, 20][i]} rx="5" ry="8" />
              ))}
            </svg>
          </div>
          <div className="night-heading shell">
            <p className="night-kicker"><span /> HALLOWEEN EN EL TRUCK <span /></p>
            <h1 id="night-title">Ronny’s<span className="sr-only"> Food Truck</span></h1>
          </div>
          <div className="night-bottom shell">
            <div className="night-welcome">
              <span className="night-label"><Ghost size={15} /> RONNY YA SE PUSO EL DISFRAZ</span>
              <h2>Mucho sabor.<br /><em>Un toque de Halloween.</em></h2>
              <p>Waffles, malteadas, crepas y snacks. Nuestro carrito rojo te espera con Ronny vestido para Halloween.</p>
            </div>
            <div className="night-invitation">
              <a className="button button-gold" href="#menu">Ver el menú <ArrowUpRight size={21} /></a>
              {contactDetailsVisible && <a className="night-location" href="#encuentranos"><MapPin size={20} /><span>{business.address}<small>{business.hours}</small></span><ArrowRight size={18} /></a>}
            </div>
          </div>
          <a className="night-scroll" href="#menu" aria-label="Descubrir el menú"><ArrowDown size={17} /></a>
        </section>

        <div className="flavor-strip" aria-label="Las especialidades de Ronny">
          <div>
            CREPAS <span>✦</span> MALTEADAS <span>✦</span> WAFFLES{" "}
            <span>✦</span> BUENA VIBRA <span>✦</span> SNACKS <span>✦</span>{" "}
            MUCHO CORAZÓN <PawPrint size={24} />
          </div>
        </div>

        <div className="halloween-market">
          <HalloweenMarketScene />
          <section className="halloween-menu-scene" id="menu" aria-labelledby="compact-menu-title">
            <MenuNightScenery />
            <div className="menu-section compact-menu-section shell section-space">
              <InteractiveMenu selection={menuSelection} onSelect={setMenuSelection} />
              <MenuCarta selection={menuSelection} onSelect={viewCartaDish} />
            </div>
          </section>

          <div className="market-fairground">
            <HalloweenFairground />
            <section className="promo-delivery shell" id="domicilio" aria-label={contactDetailsVisible ? "Promoción y pedidos a domicilio" : "Promoción y menú"}>
              <FridayPromo />
              <div className="promo-delivery-service">
                <div className="promo-delivery-copy">
                  <div className="eyebrow"><Bike size={18} aria-hidden="true" /> {contactDetailsVisible ? "EL ANTOJO VA CONTIGO" : "EL ANTOJO TE ESPERA"}</div>
                  <h2 id="delivery-title">{contactDetailsVisible ? <>¿Se te antojó <em>en casa?</em></> : <>¿Cuál se te <em>antoja?</em></>}</h2>
                  <p>{contactDetailsVisible ? "Elige tu antojo y mándanos tu ubicación por WhatsApp." : "Descubre nuestros dulces, snacks y bebidas."}</p>
                </div>
                <Mascot character="host" className="promo-delivery-host" />
                {contactDetailsVisible ? <a className="button button-gold promo-delivery-order" href={business.deliveryWhatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" /> Pedir a domicilio <ArrowUpRight size={18} aria-hidden="true" /></a> : <a className="button button-gold promo-delivery-order" href="#menu"><UtensilsCrossed size={20} aria-hidden="true" /> Ver menú <ArrowUpRight size={18} aria-hidden="true" /></a>}
                {contactDetailsVisible && <small>Consulta cobertura, costo de envío y disponibilidad.</small>}
              </div>
            </section>

            <RonnySeasons />
          </div>

          <VisitSection />
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
