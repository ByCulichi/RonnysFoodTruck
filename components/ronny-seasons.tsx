import Image from "next/image";
import { ArrowUpRight, Flower2, Ghost, Snowflake, Sparkles } from "lucide-react";
import "./ronny-seasons.css";

const seasons = [
  { id: "halloween", title: "Halloween", state: "TEMPORADA ACTUAL", image: "/images/hero/ronny-halloween-truck.png", alt: "Ronny de hechicero junto al food truck rojo, con luces, calabazas y un bosque nocturno de Halloween", description: "Sombrero de hechicero y luces en el truck.", action: "Se antoja una visita", Icon: Ghost },
  { id: "muertos", title: "Día de Muertos", state: "NOVIEMBRE · LO QUE SIGUE", image: "/images/hero/ronny-dia-de-muertos-truck.png", alt: "Ronny de catrín con maquillaje de calavera junto al food truck rojo, entre cempasúchil, velas y papel picado en una plaza de Día de Muertos", description: "Cempasúchil, tradición y Ronny de catrín.", action: "Mientras llega, al menú", Icon: Flower2 },
  { id: "christmas", title: "Navidad", state: "MÁS ADELANTE", image: "/images/hero/ronny-christmas-truck.png", alt: "Ronny vestido de Santa junto al food truck rojo con guirnaldas, luces y un mercado navideño bajo el cielo azul de noche", description: "Ronny de Santa, malteada y hot dog.", action: "Mientras llega, al menú", Icon: Snowflake },
];

export function RonnySeasons() {
  return <section className="seasons-section shell section-space" id="temporadas" aria-labelledby="seasons-title">
    <div className="seasons-heading"><div><div className="eyebrow"><Sparkles size={17} aria-hidden="true" /> RONNY’S POR TEMPORADAS</div><h2 id="seasons-title">Cambian los disfraces.<br /><em>El antojo se queda.</em></h2></div></div>
    <div className="seasons-grid">
      {seasons.map(({ id, title, state, image, alt, description, action, Icon }, index) => <article key={id} className={`season-chapter season-${id}`} aria-labelledby={`${id}-title`}>
        <div className="season-banner"><Image src={image} alt={alt} width={1536} height={1024} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 40vw, 400px" /><span className={`season-state ${index===0?"season-state-current":"season-state-next"}`}>{index>0 && <Icon size={13} aria-hidden="true" />}{state}</span></div>
        <div className="season-copy"><Icon size={21} aria-hidden="true" /><h3 id={`${id}-title`}>{title}</h3><p>{description}</p><a href="#menu">{action} <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </article>)}
    </div>
  </section>;
}
