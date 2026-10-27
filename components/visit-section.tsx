import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Maximize2, Phone } from "lucide-react";
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
          <a className="visit-truck-photo" href="/images/hero/food-truck.jpg" target="_blank" rel="noopener noreferrer" aria-label="Ampliar foto real del truck"><Image src="/images/hero/food-truck.jpg" alt="Food truck rojo de Ronny’s con su logo y letrero de crepas" fill sizes="(max-width: 600px) 76px, 100px" style={{ objectFit: "cover", objectPosition: "center 85%" }} /><Maximize2 size={15} aria-hidden="true" /></a>
          <a className="button button-gold visit-map-button" href={business.mapsUrl} target="_blank" rel="noopener noreferrer"><img src="/brands/google.svg" alt="" width={20} height={20} loading="lazy" />Cómo llegar <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  </div>;
}
