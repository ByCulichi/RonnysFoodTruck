import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Maximize2, MessageSquare, Phone, Star } from "lucide-react";
import { business, contactDetailsVisible, contactPlaceholders, contactPresentationVisible } from "@/lib/business";
import { VisitNightScenery } from "@/components/visit-night-scenery";
import { VisitMapPlaceholder } from "@/components/visit-map-placeholder";
import "./visit-section.css";

export function VisitSection() {
  if (!contactPresentationVisible && !contactDetailsVisible) return null;
  const phoneAvailable = contactDetailsVisible && Boolean(business.phoneInternational && business.phone);
  const mapAvailable = contactDetailsVisible && Boolean(business.mapsUrl);
  const mapAction = <><img src="/brands/google.svg" alt="" width={26} height={26} loading="lazy" />Cómo llegar</>;
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
            <div className="visit-contact-row"><CalendarDays size={20} aria-hidden="true" /><p>{contactDetailsVisible && business.hours ? business.hours : contactPlaceholders.hours}{contactDetailsVisible && business.closedDays && <small>{business.closedDays}</small>}</p></div>
            {phoneAvailable ? <a className="visit-contact-row visit-call" href={`tel:${business.phoneInternational}`} aria-label={`Llamar al ${business.phone}`}><Phone size={21} aria-hidden="true" /><strong>{business.phone}</strong><ArrowUpRight size={16} aria-hidden="true" /></a> : <div className="visit-contact-row visit-call visit-contact-placeholder"><Phone size={21} aria-hidden="true" /><strong aria-hidden="true">{contactPlaceholders.phone}</strong><span className="sr-only">Teléfono próximamente</span></div>}
            {mapAvailable ? <a className="visit-contact-row" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" /><span>{business.address}</span><ArrowUpRight size={16} aria-hidden="true" /></a> : <div className="visit-contact-row visit-contact-placeholder"><MapPin size={20} aria-hidden="true" /><span>{contactPlaceholders.address}</span></div>}
          </div>
        </div>
        <div className="visit-live-map">{contactDetailsVisible && business.mapsEmbedUrl ? <iframe title="Ubicación de Ronny’s Food Truck en Google Maps" src={business.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <VisitMapPlaceholder />}</div>
        <div className="visit-actions">
          {contactDetailsVisible ? <a className="visit-truck-photo" href="/images/hero/food-truck.jpg" target="_blank" rel="noopener noreferrer" aria-label="Ampliar foto real del truck"><Image src="/images/hero/food-truck.jpg" alt="Food truck rojo de Ronny’s con su logo y letrero de crepas" fill sizes="(max-width: 360px) 96px, (max-width: 700px) 112px, (max-width: 1000px) 116px, 156px" style={{ objectFit: "cover", objectPosition: "center 85%" }} /><Maximize2 size={18} aria-hidden="true" /></a> : <div className="visit-truck-photo visit-preview-art"><Image src="/images/seasons/ronny-halloween-foreground.png" alt="Ilustración del food truck rojo de Ronny’s en Halloween" fill sizes="(max-width: 360px) 96px, (max-width: 700px) 112px, (max-width: 1000px) 116px, 156px" style={{ objectFit: "cover", objectPosition: "38% center" }} /></div>}
          <div className="visit-google-actions">
            {mapAvailable ? <a className="button button-gold visit-map-button" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">{mapAction}</a> : <button type="button" disabled className="button button-gold visit-map-button" aria-label="Cómo llegar, próximamente">{mapAction}</button>}
            {contactDetailsVisible && business.reviewsUrl ? <a className="visit-review-link" href={business.reviewsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver reseñas en Google"><MessageSquare size={19} aria-hidden="true" />Ver reseñas</a> : <button type="button" disabled className="visit-review-link" aria-label="Ver reseñas, próximamente"><MessageSquare size={19} aria-hidden="true" />Ver reseñas</button>}
            {contactDetailsVisible && business.writeReviewUrl ? <a className="visit-review-link visit-write-review" href={business.writeReviewUrl} target="_blank" rel="noopener noreferrer" aria-label="Dejar reseña en Google"><Star size={19} aria-hidden="true" />Dejar reseña</a> : <button type="button" disabled className="visit-review-link visit-write-review" aria-label="Dejar reseña, próximamente"><Star size={19} aria-hidden="true" />Dejar reseña</button>}
          </div>
        </div>
      </div>
    </section>
  </div>;
}
