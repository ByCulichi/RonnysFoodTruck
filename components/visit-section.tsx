import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Maximize2, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { GoogleReviews } from "@/components/google-reviews";
import { VisitNightScenery } from "@/components/visit-night-scenery";
import "./visit-section.css";

export function VisitSection() {
  return <div className="halloween-visit-scene">
    <VisitNightScenery />
    <section className="halloween-visit shell" id="encuentranos" aria-labelledby="visit-title">
      <div className="halloween-visit-copy">
        <div className="eyebrow"><MapPin size={16} aria-hidden="true" /> NUESTRA UBICACIÓN Y CONTACTO</div>
        <h2 id="visit-title">Tu próxima<br /><em>parada feliz.</em></h2>
        <div className="visit-contact-card">
          <div className="visit-contact-row"><CalendarDays size={20} aria-hidden="true" /><p>{business.hours}<small>{business.closedDays}</small></p></div>
          <a className="visit-contact-row visit-call" href={`tel:${business.phoneInternational}`}><Phone size={21} aria-hidden="true" /><span><span className="visit-contact-label">Llámanos</span><strong>{business.phone}</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
          <a className="visit-contact-row" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={20} aria-hidden="true" /><span>{business.address}</span><ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="visit-ronny-welcome"><p>¡Te esperamos!</p><img src="/images/ronny/ronny-nose-lick.png" alt="Ronny con su playerita roja lamiéndose la nariz, listo para recibirte" width={1230} height={1278} loading="lazy" /></div>
      </div>
      <div className="visit-destination">
        <h3>¡Visítanos!</h3>
        <div className="visit-destination-views">
          <figure className="visit-live-map"><iframe title="Ubicación de Ronny’s Food Truck en Google Maps" src={business.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><figcaption>Encuéntranos en Google Maps.</figcaption></figure>
          <figure className="visit-truck"><a className="visit-truck-photo" href="/images/hero/food-truck.jpg" target="_blank" rel="noopener noreferrer" aria-label="Abrir foto real del truck"><Image src="/images/hero/food-truck.jpg" alt="Foto real del food truck rojo de Ronny’s, con su logo y letrero de crepas" fill sizes="(max-width: 600px) 100px, (max-width: 1000px) 40vw, 300px" style={{ objectFit: "cover", objectPosition: "center 85%" }} /><span><Maximize2 size={14} aria-hidden="true" /> Ver foto</span></a><figcaption>Así se ve nuestro truck.<small>Foto de Ronny’s.</small></figcaption></figure>
        </div>
        <a className="button button-gold visit-map-button" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
    <GoogleReviews mapsUrl={business.mapsUrl} />
  </div>;
}
