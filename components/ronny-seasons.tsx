import Image from "next/image";
import { ArrowUpRight, Flower2, Ghost, Snowflake, Sparkles } from "lucide-react";
import "./ronny-seasons.css";

export function RonnySeasons() {
  return <section className="seasons-section shell section-space" id="temporadas" aria-labelledby="seasons-title">
    <div className="seasons-heading"><div><div className="eyebrow"><Sparkles size={17} aria-hidden="true" /> RONNY’S POR TEMPORADAS</div><h2 id="seasons-title">Cambian los disfraces.<br /><em>El antojo se queda.</em></h2></div></div>
    <div className="seasons-grid">
      <article className="season-chapter season-halloween" aria-labelledby="halloween-title">
        <div className="season-current-art"><Image src="/images/hero/ronny-halloween-truck.png" alt="Ronny de hechicero junto al food truck rojo decorado para Halloween" width={1536} height={1024} sizes="(max-width: 600px) 35vw, (max-width: 1000px) 40vw, 400px" /><span className="season-state season-state-current">TEMPORADA ACTUAL</span></div>
        <div className="season-copy"><Ghost size={22} aria-hidden="true" /><h3 id="halloween-title">Halloween</h3><p>Sombrero de hechicero y luces en el truck.</p><a href="#menu">Se antoja una visita <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </article>
      <article className="season-chapter season-future season-muertos" aria-labelledby="muertos-title">
        <div className="season-copy"><span className="season-state season-state-next"><Flower2 size={14} aria-hidden="true" /> NOVIEMBRE · LO QUE SIGUE</span><h3 id="muertos-title">Día de<br /><em>Muertos.</em></h3><p>Cempasúchil, tradición y Ronny de catrín.</p><a href="#menu">Mientras llega, al menú <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="season-character"><Image src="/images/seasons/ronny-dia-de-muertos.png" alt="Ronny café vestido de catrín de Día de Muertos, con sombrero de cempasúchil, traje negro y morado, pañuelo rojo y un pan de muerto" width={1024} height={1536} sizes="(max-width: 600px) 140px, (max-width: 1000px) 200px, 180px" /></div>
        <Flower2 className="season-flower" size={28} aria-hidden="true" />
      </article>
      <article className="season-chapter season-future season-christmas" aria-labelledby="christmas-title">
        <div className="season-copy"><span className="season-state season-state-next"><Snowflake size={14} aria-hidden="true" /> MÁS ADELANTE</span><h3 id="christmas-title">Navidad<br /><em>ya se antoja.</em></h3><p>Ronny de Santa, malteada y hot dog.</p><a href="#menu">Mientras llega, al menú <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="season-character"><Image src="/images/seasons/ronny-christmas.png" alt="Ronny café vestido de Santa con una malteada de fresa y un hot dog, adelanto de Navidad" width={1161} height={1354} sizes="(max-width: 600px) 140px, (max-width: 1000px) 200px, 180px" /></div>
        <Snowflake className="season-flower" size={25} aria-hidden="true" />
      </article>
    </div>
  </section>;
}
