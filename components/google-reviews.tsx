import { ArrowUpRight, Camera, MessageCircle, Star } from "lucide-react";

// Link to the real listing; no API, fabricated reviews, ratings or follower counts.
export function GoogleReviews({ mapsUrl }: { mapsUrl: string }) {
  return <section className="google-reviews halloween-reviews shell" aria-labelledby="google-reviews-title">
    <div className="halloween-reviews-heading"><div className="eyebrow">RESEÑAS DE GOOGLE</div><h2 id="google-reviews-title">El antojo se cuenta.<br /> <em>Las opiniones también.</em></h2></div>
    <div className="halloween-review-links">
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={23} aria-hidden="true" /><div><h3>Opiniones de visitantes</h3><p>Lee las experiencias de quienes ya se dieron un antojo.</p><span>Ver todas las opiniones <ArrowUpRight size={16} aria-hidden="true" /></span></div></a>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Star size={23} aria-hidden="true" /><div><h3>Tu experiencia cuenta</h3><p>¿Ya nos visitaste? Cuéntalo en nuestra ficha de Google.</p><span>Compartir mi experiencia <ArrowUpRight size={16} aria-hidden="true" /></span></div></a>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Camera size={23} aria-hidden="true" /><div><h3>Una mirada al truck</h3><p>Descubre las fotos que se comparten en nuestra ficha.</p><span>Ver la ficha en Google <ArrowUpRight size={16} aria-hidden="true" /></span></div></a>
    </div>
  </section>;
}
