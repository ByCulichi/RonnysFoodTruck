import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Maximize2, MessageSquare, Phone, Star } from "lucide-react";
import { business } from "@/lib/business";
import { VisitNightScenery } from "@/components/visit-night-scenery";
import "./visit-section.css";

export function VisitSection() {
  return <div className="halloween-visit-scene">
    <VisitNightScenery />
    <section className="halloween-visit shell" id="encuentranos" aria-labelledby="visit-title">
      <div className="visit-panel">
        <div className="visit-info">
          <div className="visit-heading">
            <h2 id="visit-title">¡Visítanos!</h2>
            <Image src="/images/ronny/ronny-nose-lick.png" alt="Ronny con su playerita roja, listo para recibirte" width={78} height={82} sizes="78px" />
          </div>
          <div className="visit-contact-details">
            <div className="visit-contact-row"><CalendarDays size={20} aria-hidden="true" /><p>{business.hours}<small>{business.closedDays}</small></p></div>
            <a className="visit-contact-row visit-call" href={`tel:${business.phoneInternational}`} aria-label={`Llamar al ${business.phone}`}><Phone size={21} aria-hidden="true" /><strong>{business.phone}</strong><ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="visit-contact-row" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" /><span>{business.address}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="visit-live-map"><iframe title="Ubicación de Ronny’s Food Truck en Google Maps" src={business.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
        <div className="visit-actions">
          <a className="visit-truck-photo" href="/images/hero/food-truck.jpg" target="_blank" rel="noopener noreferrer" aria-label="Ampliar foto real del truck"><Image src="/images/hero/food-truck.jpg" alt="Food truck rojo de Ronny’s con su logo y letrero de crepas" fill sizes="(max-width: 360px) 96px, (max-width: 700px) 112px, (max-width: 1000px) 116px, 156px" style={{ objectFit: "cover", objectPosition: "center 85%" }} /><Maximize2 size={18} aria-hidden="true" /></a>
          <div className="visit-google-actions">
            <a className="button button-gold visit-map-button" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><img src="/brands/google.svg" alt="" width={26} height={26} loading="lazy" />Cómo llegar</a>
            <a className="visit-review-link" href={business.reviewsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver reseñas en Google"><MessageSquare size={19} aria-hidden="true" />Ver reseñas</a>
            <a className="visit-review-link visit-write-review" href={business.writeReviewUrl} target="_blank" rel="noopener noreferrer" aria-label="Dejar reseña en Google"><Star size={19} aria-hidden="true" />Dejar reseña</a>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
