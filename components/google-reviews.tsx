import { ArrowUpRight, Star } from "lucide-react";

// Deliberately static: no API requests, credentials, ratings or invented counts.
export function GoogleReviews({ mapsUrl }: { mapsUrl: string }) {
  return (
    <section className="google-reviews shell" aria-labelledby="google-reviews-title">
      <div className="reviews-heading">
        <div>
          <div className="eyebrow">GOOGLE · LA VOZ DE NUESTROS VISITANTES</div>
          <h2 id="google-reviews-title">El antojo se cuenta.<br /><em>Las opiniones también.</em></h2>
        </div>
        <a className="text-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Ver en Google <ArrowUpRight size={18} /></a>
      </div>
      <div className="reviews-invitation">
        <Star size={26} aria-hidden="true" />
        <p>Conoce las experiencias de quienes nos visitan y comparte la tuya en nuestra ficha de Google.</p>
        <a className="button button-gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">Consultar opiniones <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}
