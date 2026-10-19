import { ArrowUpRight, Ghost, Snowflake, Sparkles } from "lucide-react";

export function RonnySeasons() {
  return (
    <section className="seasons-section shell section-space" id="temporadas" aria-labelledby="seasons-title">
      <div className="seasons-heading">
        <div>
          <div className="eyebrow"><Sparkles size={17} aria-hidden="true" /> RONNY’S POR TEMPORADAS</div>
          <h2 id="seasons-title">Cambian los disfraces.<br /><em>El antojo se queda.</em></h2>
        </div>
        <p>El truck rojo, tus favoritos y un Ronny con mucho carácter. Cada temporada tiene su propia magia.</p>
      </div>
      <div className="seasons-grid">
        <article className="season-chapter season-halloween" aria-labelledby="halloween-title">
          <div className="season-current-art">
            <img src="/images/hero/ronny-halloween-truck.png" alt="Ronny de hechicero junto al food truck rojo decorado para Halloween" width={1536} height={1024} loading="lazy" />
            <span className="season-state season-state-current">TEMPORADA ACTUAL</span>
          </div>
          <div className="season-copy">
            <Ghost size={24} aria-hidden="true" />
            <h3 id="halloween-title">Halloween</h3>
            <p>Sombrero de hechicero, luces en el truck y gusgerías para una noche de miedo.</p>
            <a href="#menu">Se antoja una visita <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </article>
        <article className="season-chapter season-christmas" aria-labelledby="christmas-title">
          <div className="season-copy">
            <span className="season-state season-state-next"><Snowflake size={14} aria-hidden="true" /> PRÓXIMA TEMPORADA</span>
            <h3 id="christmas-title">Navidad<br /><em>ya se antoja.</em></h3>
            <p>Ronny ya tiene su traje de Santa. Su malteada, su hot dog y toda la ilusión de compartir algo rico contigo.</p>
            <span className="season-coming-soon">Próximamente en Ronny’s.</span>
            <a href="#menu">Mientras llega, al menú <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="season-santa">
            <img src="/images/seasons/ronny-christmas.png" alt="Ronny café vestido de Santa con una malteada de fresa y un hot dog, adelanto de Navidad" width={1161} height={1354} loading="lazy" />
          </div>
          <Sparkles className="season-sparkle season-sparkle-one" size={26} aria-hidden="true" />
          <Snowflake className="season-sparkle season-sparkle-two" size={23} aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
