"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  Coffee,
  Heart,
  MapPin,
  Menu,
  PawPrint,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { sendContactEmail } from "./actions";

const outfits = [
  {
    name: "El chef",
    label: "Chef de los antojos",
    description: "Una crepa, un poquito de magia y mucho corazón.",
    icon: ChefHat,
    position: 0,
  },
  {
    name: "El malteadero",
    label: "Maestro de malteadas",
    description: "La felicidad también se sirve con crema batida.",
    icon: Coffee,
    position: 1,
  },
  {
    name: "El anfitrión",
    label: "Tu nuevo mejor amigo",
    description: "Pasa, ponte cómodo. Aquí siempre eres de la familia.",
    icon: Heart,
    position: 2,
  },
];
const dishes = [
  {
    name: "Crepas",
    category: "UN CLÁSICO IRRESISTIBLE",
    image: "crepe-with-nutella-and-strawberries.jpg",
    price: 45,
    description: "Nutella, cajeta, zarzamora con queso o fresa con queso.",
    details: "Con fruta $55 · Con fruta y helado $65",
    group: "Dulces",
  },
  {
    name: "Waffles",
    category: "CRUJIENTES POR FUERA",
    image: "belgian-waffle-with-berries-and-syrup.jpg",
    price: 55,
    description:
      "Cajeta, Nutella, fresa, maple o lechera. Tú eliges el final feliz.",
    details: "Con fruta $65 · Con fruta y helado $75",
    group: "Dulces",
  },
  {
    name: "Malteadas",
    category: "UN SORBITO DE FELICIDAD",
    image: "strawberry-milkshake-retro.jpg",
    price: 55,
    description:
      "Fresa, vainilla, chocolate o galleta. Cremosas de principio a fin.",
    details: "Viernes de malteadas: 2 por $100",
    group: "Bebidas",
  },
  {
    name: "Snacks",
    category: "PARA EL ANTOJO SALADO",
    image: "loaded-fries-mexican-style.jpg",
    price: 25,
    description: "Papas locas $25 · Francesas $40 · Nachos $45 · Maruchan $30.",
    details: "Salchipapas y salchipulpos $55",
    group: "Salados",
  },
  {
    name: "Hotcakes",
    category: "ESPONJOSITOS Y FELICES",
    image: "stack-of-pancakes-with-butter-and-syrup.jpg",
    price: 50,
    description:
      "Nutella, fresa, cajeta, maple o lechera. Una torre de dulzura.",
    details: "Con fruta $60",
    group: "Dulces",
  },
  {
    name: "Con crema",
    category: "FRESCOS Y CONSENTIDOS",
    image: "strawberries-with-cream-dessert.jpg",
    price: 50,
    description: "Plátanos o duraznos $50. Fresas con crema $60.",
    details: "¿Otro antojo? Flan napolitano $42",
    group: "Dulces",
  },
  {
    name: "Cafecito",
    category: "EL COMPAÑERO PERFECTO",
    image: "coffee-cup-and-milkshake.jpg",
    price: 22,
    description:
      "Un americano para acompañar tu postre o un capuchino bien cremoso.",
    details: "Americano $22 · Capuchino $35",
    group: "Bebidas",
  },
];
const navLinks = [
  ["inicio", "Inicio"],
  ["menu", "El menú"],
  ["historia", "Nuestro Ronny"],
  ["encuentranos", "Encuéntranos"],
];

function Mascot({
  outfit = 0,
  className = "",
}: {
  outfit?: number;
  className?: string;
}) {
  return (
    <div className={`mascot-crop ${className}`}>
      <img
        src="/ronny-outfits.png"
        alt={`Ronny, el chihuahua de la casa, con su atuendo de ${outfits[outfit].name.toLowerCase()}`}
        style={{ transform: `translateX(-${(outfit * 100) / 3}%)` }}
        width={1536}
        height={1024}
      />
    </div>
  );
}

export default function Home() {
  const [outfit, setOutfit] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("Todo");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const OutfitIcon = outfits[outfit].icon;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const result = await sendContactEmail(form);
      setStatus(result);
      if (result.success) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        success: false,
        message: "No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="ronny-site">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#inicio" className="brand" aria-label="Ronny’s, inicio">
            <img src="/ronny-logo.png" alt="" width={50} height={50} />
            <span>
              RONNY’S<span className="brand-sub">FOOD TRUCK · ECATEPEC</span>
            </span>
            <span className="brand-dot">®</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navLinks.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contacto">
            ¿Se te antojó? <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-toggle"
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
            {[...navLinks, ["contacto", "Contacto"]].map(([id, label]) => (
              <a href={`#${id}`} key={id} onClick={() => setMobileOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="contenido">
        <section className="hero shell" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="small-line" /> UN CHIHUAHUA. UN CARRITO. UNA
              FAMILIA.
            </div>
            <h1>
              Mucho sabor.
              <br />
              En familia y con
              <br />
              <span className="hero-heart">
                travesura
                <svg viewBox="0 0 390 20" aria-hidden="true">
                  <path d="M3 12 Q175 -2 385 9 M55 18 Q200 7 345 16" />
                </svg>
              </span>
              <span className="gold-dot">.</span>
            </h1>
            <p className="hero-description">
              Soy Ronny, y este es nuestro pequeño mundo.
              <br />
              Un carrito, una familia y muchos antojos,
              <br className="desktop-break" /> preparados con corazón en
              Ecatepec.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#menu">
                Descubre el menú <ArrowUpRight size={20} />
              </a>
              <a className="text-link" href="#historia">
                Conoce a Ronny <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-note">
              <span className="paw-circle">
                <PawPrint size={19} />
              </span>
              <div>
                <strong>El sabor lo preparamos juntos.</strong>
                <span>Desde Las Vegas, Ecatepec, para tu antojo.</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="floating-spark spark-one" aria-hidden="true">
              ✦
            </span>
            <span className="floating-spark spark-two" aria-hidden="true">
              ✧
            </span>
            <div className="speech-bubble" key={`speech-${outfit}`}>
              ¡Hola, soy Ronny! <span>Tu antojo está en buenas patas.</span>
            </div>
            <div className="hero-character family-hero-art">
              <img
                src="/ronny-family-truck.png"
                alt="Ronny vestido de chef frente al carrito rojo, junto a una familia ilustrada preparando crepas y malteadas"
                width={1536}
                height={1024}
                fetchPriority="high"
              />
              <div className="character-shade" />
            </div>
            <div className="character-tag">
              <span>
                <Heart size={20} />
              </span>
              <div>
                <small>LA RECETA DE LA CASA</small>
                <strong>Hecho en familia</strong>
              </div>
              <Check size={16} />
            </div>
            <div className="family-pill">
              <PawPrint size={14} /> Ronny <span>·</span> El carrito{" "}
              <span>·</span> Nuestra familia
            </div>
          </div>
          <a className="scroll-cue" href="#menu">
            <ArrowDown size={14} /> SIGUE EL ANTOJO
          </a>
        </section>

        <div className="flavor-strip" aria-label="Las especialidades de Ronny">
          <div>
            CREPAS <span>✦</span> MALTEADAS <span>✦</span> WAFFLES{" "}
            <span>✦</span> BUENA VIBRA <span>✦</span> SNACKS <span>✦</span>{" "}
            MUCHO CORAZÓN <PawPrint size={24} />
          </div>
        </div>

        <section className="menu-section shell section-space" id="menu">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <UtensilsCrossed size={15} /> EL MENÚ DE LA CASA
              </div>
              <h2>
                Antojos que mueven
                <br />
                <em>la colita.</em>
              </h2>
            </div>
            <p>
              Elige tu favorito. Ronny ya se puso el delantal.
              <br />
              Todos los precios están en pesos mexicanos.
            </p>
          </div>
          <div className="menu-toolbar">
            <div
              className="filter-group"
              role="group"
              aria-label="Filtrar menú"
            >
              {["Todo", "Dulces", "Salados", "Bebidas"].map((item) => (
                <button
                  key={item}
                  aria-pressed={filter === item}
                  className={filter === item ? "selected" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "Todo" && <span>{dishes.length}</span>}
                </button>
              ))}
            </div>
            <span className="menu-aside">
              <Sparkles size={15} /> EL ANTOJO NO SE JUZGA
            </span>
          </div>
          <div className="dish-grid">
            {dishes
              .filter((dish) => filter === "Todo" || dish.group === filter)
              .map((dish, index) => (
                <article className="dish-card" key={dish.name}>
                  <div className="dish-image">
                    <img
                      src={`/${dish.image}`}
                      alt={dish.name}
                      width={600}
                      height={400}
                      loading="lazy"
                    />
                    <span className="dish-number">
                      0{dishes.indexOf(dish) + 1}
                    </span>
                    {index === 0 && (
                      <span className="dish-favorite">
                        <Star size={12} fill="currentColor" /> RONNY RECOMIENDA
                      </span>
                    )}
                  </div>
                  <div className="dish-info">
                    <span className="dish-category">{dish.category}</span>
                    <div className="dish-title">
                      <h3>{dish.name}</h3>
                      <div>
                        <small>desde</small>
                        <strong>${dish.price}</strong>
                      </div>
                    </div>
                    <p>{dish.description}</p>
                    <div className="dish-detail">{dish.details}</div>
                  </div>
                </article>
              ))}
          </div>
          <div className="friday-banner">
            <div className="friday-icon">
              <Coffee size={30} />
            </div>
            <div>
              <span>LOS VIERNES SABEN MEJOR</span>
              <h3>Una para ti. Otra para tu cómplice.</h3>
            </div>
            <strong>
              2 malteadas <span>× $100</span>
            </strong>
            <Sparkles className="friday-star" size={34} />
          </div>
        </section>

        <section className="story-section" id="historia">
          <div className="shell story-layout">
            <div className="story-art">
              <Mascot outfit={outfit} />
              <div className="story-stamp">
                <PawPrint size={24} />
                <span>
                  CHIHUAHUA
                  <br />
                  DE CORAZÓN
                </span>
              </div>
              <div className="story-outfits">
                <div className="outfit-status">
                  <OutfitIcon size={18} />
                  <strong>{outfits[outfit].label}</strong>
                </div>
                <div className="outfit-controls">
                  <span>ELIGE MI LOOK</span>
                  <div role="group" aria-label="Atuendos de Ronny">
                    {outfits.map((item, index) => (
                      <button
                        key={item.name}
                        className={
                          outfit === index
                            ? "outfit-button active"
                            : "outfit-button"
                        }
                        aria-pressed={outfit === index}
                        aria-label={item.name}
                        title={item.name}
                        onClick={() => setOutfit(index)}
                      >
                        <item.icon size={21} />
                      </button>
                    ))}
                  </div>
                </div>
                <p className="outfit-caption" aria-live="polite">
                  {outfits[outfit].description}
                </p>
              </div>
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
              <p>
                Todo empezó jugando a cocinar. La diversión se volvió pasión, y
                la pasión encontró su lugar sobre ruedas.
              </p>
              <p>
                Detrás del carrito está nuestra familia: manos que preparan,
                sonrisas que reciben y cariño en cada detalle.
              </p>
              <p>
                Y el nombre… bueno, ese lo puso el más pequeño de la familia.
                Ronny es nuestro chihuahua, nuestro compañero y la inspiración
                detrás de cada antojo.
              </p>
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

        <section
          className="visit-section shell section-space"
          id="encuentranos"
        >
          <div className="visit-card">
            <div className="visit-copy">
              <div className="eyebrow">
                <MapPin size={16} /> NOS VEMOS EN EL TRUCK
              </div>
              <h2>
                Tu próxima
                <br />
                <em>parada feliz.</em>
              </h2>
              <p>
                Estamos en Las Vegas, Ecatepec.
                <br />
                Ven por un antojo. Quédate por la buena vibra.
              </p>
              <a
                className="button button-gold"
                href="https://www.google.com/maps/search/?api=1&query=Las+Vegas+Ecatepec+Mexico"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver la zona en Maps <ArrowUpRight size={18} />
              </a>
              <small>
                ¿Nos visitas? Escríbenos para confirmar el punto exacto y
                horario.
              </small>
            </div>
            <div className="visit-visual">
              <div className="map-grid" />
              <div className="map-ring ring-one" />
              <div className="map-ring ring-two" />
              <div className="map-marker">
                <PawPrint size={33} />
              </div>
              <span className="map-location">
                LAS VEGAS<span>ECATEPEC, ESTADO DE MÉXICO</span>
              </span>
              <span className="map-caption">
                EL ANTOJO TIENE UN PUNTO DE ENCUENTRO.
              </span>
            </div>
          </div>
        </section>

        <section className="contact-section shell" id="contacto">
          <div className="contact-copy">
            <div className="eyebrow">
              <Heart size={15} /> AQUÍ TE ESCUCHAMOS
            </div>
            <h2>
              ¿Platicamos
              <br />
              <em>algo rico?</em>
            </h2>
            <p>
              Una pregunta, un saludo o ese antojo que no te deja en paz.
              Cuéntanos.
            </p>
            <span className="contact-signoff">
              Con cariño, <strong>Ronny.</strong> <PawPrint size={20} />
            </span>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="name">Tu nombre</label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="¿Cómo te llamas?"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={sending}
                />
              </div>
              <div>
                <label htmlFor="email">
                  Tu correo <span>(opcional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="hola@ejemplo.com"
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={sending}
                />
              </div>
            </div>
            <label htmlFor="message">¿Qué tienes en mente?</label>
            <textarea
              id="message"
              placeholder="Hola Ronny, me gustaría saber…"
              required
              maxLength={3000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              disabled={sending}
            />
            <div aria-live="polite">
              {status && (
                <p
                  className={`form-status ${status.success ? "success" : "error"}`}
                >
                  {status.message}
                </p>
              )}
            </div>
            <button
              className="button button-gold"
              type="submit"
              disabled={sending}
            >
              {sending ? "Enviando…" : "Enviar mi mensaje"}
              <ArrowUpRight size={18} />
            </button>
          </form>
        </section>
      </main>
      <footer className="site-footer shell">
        <a href="#inicio" className="footer-wordmark">
          RONNY’S<span>®</span>
        </a>
        <p>Pequeños antojos. Grandes momentos.</p>
        <div>
          <span>© {new Date().getFullYear()} Ronny’s Food Truck</span>
          <a href="#inicio">
            Hecho con <Heart size={12} /> y muchas patitas.
          </a>
        </div>
      </footer>
    </div>
  );
}
