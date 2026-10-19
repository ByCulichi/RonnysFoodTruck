"use client";

import { useEffect, useRef, useState } from "react";
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
import { business } from "@/lib/business";
import { VisitSection } from "@/components/visit-section";
import { FoodIcon, type FoodKind } from "@/components/food-icon";
import { SiteFooter } from "@/components/site-footer";
import { RonnySeasons } from "@/components/ronny-seasons";
import { dishes } from "@/lib/menu";
import { InteractiveMenu } from "@/components/interactive-menu";
import { halloweenCostumes } from "@/lib/ronny-costumes";
import { MenuCarta } from "@/components/menu-carta";
import { HalloweenMarketScene } from "@/components/halloween-market-scene";
import { FridayPromo } from "@/components/friday-promo";

const ronnyCharacters = {
  sport: { name: "Ronny con su playerita roja Adidas descansando sobre su cobija", image: "/images/ronny/ronny-red-sports.png", width: 1536, height: 1024 },
  grumpy: { name: halloweenCostumes.zombi.alt, image: halloweenCostumes.zombi.src, width: 1024, height: 1536 },
  host: { name: halloweenCostumes.diablito.alt, image: halloweenCostumes.diablito.src, width: 1024, height: 1536 },
  nose: { name: "Ronny con chamarrita roja lamiéndose la nariz", image: "/images/ronny/ronny-nose-lick.png", width: 1230, height: 1278 },
};
const heroSpecialties: { label: string; kind: FoodKind }[] = [
  { label: "Waffles", kind: "Waffles" },
  { label: "Malteadas", kind: "Malteadas" },
  { label: "Crepas", kind: "Crepas" },
  { label: "Snacks", kind: "Snacks" },
];
const navLinks = [
  ["inicio", "Inicio"],
  ["menu", "Menú"],
  ["temporadas", "Temporadas"],
  ["historia", "Nuestro Ronny"],
  ["encuentranos", "Encuéntranos"],
];

const navIcons = { inicio: House, menu: UtensilsCrossed, temporadas: CalendarDays, historia: PawPrint, encuentranos: MapPin, contacto: MessageCircle, domicilio: Bike };

function Mascot({ character, className = "" }: { character: keyof typeof ronnyCharacters; className?: string }) {
  const art = ronnyCharacters[character];
  return <div className={`ronny-cutout ${className}`} data-character={character}><img src={art.image} alt={art.name} width={art.width} height={art.height} loading="lazy" /></div>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); mobileToggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);
  useEffect(() => {
    const updateActiveSection = () => {
      let current = "inicio";
      for (const [id] of navLinks) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * .3) current = id;
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
  const [menuEntry, setMenuEntry] = useState(0);
  function openMenu(kind: FoodKind) {
    setMenuSelection(dishes.find((dish) => dish.kind === kind)?.name || "Crepas");
    setMenuEntry((entry) => entry + 1);
  }
  return (
    <div className="ronny-site halloween-season">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#inicio" className="brand" aria-label="Ronny’s, inicio">
            <img src="/images/brand/ronny-flat-logo.png" alt="" width={64} height={64} />
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
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            <p className="mobile-nav-heading">Tu próxima parada feliz.</p>
            {[...navLinks, ["domicilio", "A domicilio"], ["contacto", "Contacto"]].map(([id, label]) => {
              const Icon = navIcons[id as keyof typeof navIcons];
              return <a href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined} onClick={() => { setMobileOpen(false); setActiveSection(id); }}><span><Icon size={22} aria-hidden="true" />{label}</span><ArrowUpRight size={18} aria-hidden="true" /></a>;
            })}
            <a className="mobile-whatsapp" href={business.whatsappUrl} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={22} aria-hidden="true" />Escríbenos por WhatsApp</span><ArrowUpRight size={18} /></a>
          </nav>
        )}
      </header>

      <main id="contenido">
        <section className="night-hero halloween-hero" id="inicio" aria-labelledby="night-title">
          <div className="night-scene">
            <img
              src="/images/hero/ronny-halloween-truck.png"
              alt="Ronny vestido de hechicero con sombrero morado y capa, sosteniendo un antojo con queso junto al food truck rojo decorado con calabazas, telarañas y murciélagos de Halloween"
              width={1536}
              height={1024}
              fetchPriority="high"
            />
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
            <p className="night-kicker"><span /> HALLOWEEN EN EL TRUCK · ECATEPEC <span /></p>
            <h1 id="night-title">Ronny’s<span className="sr-only"> Food Truck</span></h1>
            <div className="night-specialties hero-food-emojis" role="group" aria-label="Especialidades del truck">
              {heroSpecialties.map(({ label, kind }) => <a key={kind} href="#menu" aria-label={`Ver ${label.toLowerCase()}`} title={label} onClick={() => openMenu(kind)}><FoodIcon kind={kind} /></a>)}
            </div>
          </div>
          <div className="night-bottom shell">
            <div className="night-welcome">
              <span className="night-label"><Ghost size={15} /> RONNY YA SE PUSO EL DISFRAZ</span>
              <h2>Mucho sabor.<br /><em>Un toque de Halloween.</em></h2>
              <p>Waffles, malteadas, crepas y snacks. Nuestro carrito rojo te espera con Ronny vestido para Halloween.</p>
            </div>
            <div className="night-invitation">
              <a className="button button-gold" href="#menu">Ver el menú <ArrowUpRight size={21} /></a>
              <a className="night-location" href="#encuentranos"><MapPin size={20} /><span>New York, Ecatepec<small>{business.hours}</small></span><ArrowRight size={18} /></a>
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
            <div className="menu-section compact-menu-section shell section-space">
              <InteractiveMenu selection={menuSelection} onSelect={setMenuSelection} key={menuEntry} />
              <MenuCarta />
              <FridayPromo />
            </div>
          </section>

          <section className="delivery-section shell" id="domicilio" aria-labelledby="delivery-title">
            <div className="delivery-copy">
              <div className="eyebrow"><Bike size={18} /> EL ANTOJO VA CONTIGO</div>
              <h2 id="delivery-title">¿Se te antojó <em>en casa?</em></h2>
              <p>Consulta tu pedido a domicilio por WhatsApp. Compártenos qué se te antoja y tu ubicación para confirmar la entrega.</p>
              <a className="button button-gold" href={business.deliveryWhatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Consultar pedido a domicilio <ArrowUpRight size={18} /></a>
              <small>Confirma cobertura, costo de envío y disponibilidad antes de pedir.</small>
            </div>
            <Mascot character="host" className="delivery-host" />
          </section>

          <RonnySeasons />

          <section className="story-section" id="historia">
            <div className="shell story-layout">
              <div className="story-art">
                <Mascot character="grumpy" />
                <div className="story-stamp">
                  <PawPrint size={24} />
                  <span>
                    CHIHUAHUA
                    <br />
                    DE CORAZÓN
                  </span>
                </div>
                <p className="story-character-note">Tiene su genio.<br /><strong>Y un corazón enorme.</strong></p>
              </div>
              <div className="story-copy">
                <div className="eyebrow">
                  <PawPrint size={16} /> RONNY Y LA FAMILIA
                </div>
                <h2>
                  Orejas grandes.
                  <br />
                  Un corazón
                  <br />
                  <em>todavía más.</em>
                </h2>
                <p>Detrás del carrito rojo está nuestra familia: manos que preparan, sonrisas que reciben y cariño en cada antojo.</p>
                <p>Y el nombre lo pone Ronny, nuestro chihuahua. Tiene su genio: es valiente, leal y protector de los suyos. También es divertido y fan de las gusgerías.</p>
                <p>Su playerita roja y esa lengua que siempre acaba en la nariz lo hacen inconfundible. Pequeñito, pero con un corazón enorme.</p>
                <p className="story-signature">
                  Aquí no solo hacemos postres.
                  <br />
                  <strong>Hacemos que te sientas en casa.</strong>
                </p>
                <a className="text-link" href="#encuentranos">
                  Ven a conocernos <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </section>

        </div>

        <VisitSection />

      </main>
      <SiteFooter />
      <nav className="mobile-order-bar" aria-label="Accesos rápidos para pedir"><a href="#menu"><UtensilsCrossed size={19} /> Ver menú</a><a href={business.deliveryWhatsappUrl} target="_blank" rel="noopener noreferrer"><Bike size={20} /> A domicilio <ArrowUpRight size={16} /></a></nav>
    </div>
  );
}
