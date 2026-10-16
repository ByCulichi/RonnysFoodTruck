"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  Menu,
  PawPrint,
  Sparkles,
  Ghost,
  Star,
  UtensilsCrossed,
  Search,
  CakeSlice,
  Coffee,
  Phone,
  MessageCircle,
  Clock,
  X,
} from "lucide-react";
import { sendContactEmail } from "./actions";
import { business } from "@/lib/business";

const ronnyCharacters = [
  { name: "Ronny chef con su waffle", position: 0 },
  { name: "Ronny malteadero con una malteada", position: 1 },
  { name: "Ronny anfitrión saludando", position: 2 },
  { name: "Ronny enojón cuidando sus gusgerías", position: 0, sheet: "/ronny-personalities.png" },
  { name: "Ronny guardián con capa y escudo", position: 1, sheet: "/ronny-personalities.png" },
  { name: "Ronny hechicero de Halloween con sombrero y capa", position: 2, sheet: "/ronny-personalities.png" },
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
const categoryIcons = { Todo: UtensilsCrossed, Dulces: CakeSlice, Salados: UtensilsCrossed, Bebidas: Coffee };
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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
        src={ronnyCharacters[outfit].sheet ?? "/ronny-flat-outfits.png"}
        alt={ronnyCharacters[outfit].name}
        style={{ transform: `translateX(-${(ronnyCharacters[outfit].position * 100) / 3}%)` }}
        width={1536}
        height={1024}
      />
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("Todo");
  const [searchQuery, setSearchQuery] = useState("");
  const visibleDishes = dishes.filter((dish) =>
    (filter === "Todo" || dish.group === filter) &&
    normalizeSearch(`${dish.name} ${dish.description} ${dish.details}`).includes(normalizeSearch(searchQuery.trim()))
  ).sort((a, b) => Number(b.name === "Malteadas") - Number(a.name === "Malteadas"));
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [sending, setSending] = useState(false);

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
    <div className="ronny-site halloween-season">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#inicio" className="brand" aria-label="Ronny’s, inicio">
            <img src="/ronny-flat-logo.png" alt="" width={50} height={50} />
            <span>
              RONNY’S<span className="brand-sub">FOOD TRUCK · HALLOWEEN</span>
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
        <section className="night-hero halloween-hero" id="inicio" aria-labelledby="night-title">
          <div className="night-scene">
            <img
              src="/ronny-halloween-truck.png"
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
            <p className="night-specialties">Waffles <span>✦</span> Malteadas <span>✦</span> Crepas <span>✦</span> Snacks</p>
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
            <div className="menu-ronny-note">
              <div className="menu-milkshake-art">
                <img
                  src="/ronny-halloween-milkshake.png"
                  alt="Ronny con sombrero morado, sudadera y delantal de Halloween preparando una malteada de fresa con crema batida"
                  width={1536}
                  height={1024}
                  loading="lazy"
                />
                <Sparkles className="milkshake-spark" size={20} aria-hidden="true" />
              </div>
              <div className="menu-milkshake-copy">
                <p>Ronny está preparando<br /><strong>una malteada de miedo.</strong></p>
                <button type="button" className="ronny-drinks-link" onClick={() => { setFilter("Bebidas"); setSearchQuery(""); }}>
                  Ver bebidas <ArrowDown size={15} />
                </button>
                <small>Precios en pesos mexicanos.</small>
              </div>
            </div>
          </div>
          <div className="menu-search-row">
            <label className="menu-search">
              <Search size={18} aria-hidden="true" />
              <input type="search" aria-label="Buscar en el menú" placeholder="¿Qué se te antoja? Busca tu favorito…" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            </label>
            <span className="menu-currency">Preparado con corazón · Precios en MXN</span>
          </div>
          <div className="menu-toolbar">
            <div
              className="filter-group"
              role="group"
              aria-label="Filtrar menú"
            >
              {(["Todo", "Dulces", "Salados", "Bebidas"] as const).map((item) => {
                const Icon = categoryIcons[item];
                return <button
                  key={item}
                  aria-label={item}
                  aria-pressed={filter === item}
                  className={filter === item ? "selected" : ""}
                  onClick={() => setFilter(item)}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item}
                  <span aria-hidden="true">{item === "Todo" ? dishes.length : dishes.filter((dish) => dish.group === item).length}</span>
                </button>;
              })}
            </div>
            <span className="menu-aside" aria-live="polite">
              <Sparkles size={15} /> {visibleDishes.length} {visibleDishes.length === 1 ? "antojo para ti" : "antojos para ti"}
            </span>
          </div>
          <div className="dish-grid">
            {visibleDishes.map((dish, index) => (
                <article className={`dish-card ${dish.name === "Malteadas" ? "dish-card-featured" : ""}`} key={dish.name}>
                  <div className="dish-image">
                    <img
                      src={`/${dish.image}`}
                      alt={dish.name}
                      width={600}
                      height={400}
                      loading="lazy"
                    />
                    <span className="dish-number">
                      0{index + 1}
                    </span>
                    {dish.name === "Malteadas" && (
                      <span className="dish-favorite">
                        <Star size={12} fill="currentColor" /> EL ANTOJO DE RONNY
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
          {visibleDishes.length === 0 && (
            <div className="menu-empty" role="status">
              <Search size={28} />
              <h3>No encontramos ese antojo.</h3>
              <p>Prueba otro nombre o vuelve a explorar el menú completo.</p>
              <button type="button" className="button button-gold" onClick={() => { setSearchQuery(""); setFilter("Todo"); }}>Ver todo el menú</button>
            </div>
          )}
          <div className="friday-banner">
            <Mascot outfit={1} className="promo-ronny" />
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
              <Mascot outfit={3} />
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
                detrás de cada antojo. Tiene su genio, es valiente, leal y
                protector de los suyos. También es divertido y tiene una debilidad:
                las gusgerías. Pequeñito, pero siempre listo para defender a su familia.
              </p>
              <figure className="family-memory">
                <img src="/ronny-night-truck.png" alt="Ronny en caricatura plana y nuestra familia en el carrito rojo" width={1536} height={1024} loading="lazy" />
                <figcaption>El ingrediente de siempre: nuestra familia.</figcaption>
              </figure>
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
                <MapPin size={18} aria-hidden="true" /> {business.address}
              </p>
              <a
                className="button button-gold"
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar <ArrowUpRight size={18} />
              </a>
              <div className="visit-hours">
                <Clock size={18} aria-hidden="true" />
                <div><span>Viernes, sábado y domingo</span><strong>7 p. m.–12 a. m.</strong><small>{business.closedDays}</small></div>
              </div>
              <div className="business-contact-links">
                <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp</a>
                <a href={`tel:${business.phoneInternational}`}><Phone size={17} /> {business.phone}</a>
              </div>
            </div>
            <div className="visit-visual">
              <div className="map-grid" />
              <div className="map-ring ring-one" />
              <div className="map-ring ring-two" />
              <Mascot outfit={4} className="visit-guardian" />
              <span className="map-location">
                NEW YORK<span>ECATEPEC · C. P. 55330</span>
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
            <div className="business-contact-links contact-direct">
              <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Escríbenos por WhatsApp</a>
              <a href={`tel:${business.phoneInternational}`}><Phone size={17} /> {business.phone}</a>
            </div>
            <Mascot outfit={2} className="contact-host" />
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
