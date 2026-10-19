import { ArrowUpRight, CupSoda, Ghost } from "lucide-react";
import { business } from "@/lib/business";
import "./friday-promo.css";

const promoWhatsapp = `${business.whatsappUrl}?text=${encodeURIComponent("Hola, Ronny’s. Me gustaría consultar la promo de viernes de 2 malteadas por $100 y su disponibilidad.")}`;

export function FridayPromo() {
  return <aside className="friday-promo" aria-labelledby="friday-promo-title">
    <CupSoda className="friday-promo-drink" size={165} aria-hidden="true" />
    <div className="friday-promo-ronny"><img src="/images/ronny/ronny-red-sports.png" alt="Ronny con su playerita roja Adidas, descansando sobre su cobija azul" width={1536} height={1024} loading="lazy" /></div>
    <div className="friday-promo-copy"><span><Ghost size={17} aria-hidden="true" /> LOS VIERNES SABEN MEJOR</span><h3 id="friday-promo-title">Una para ti.<br /><em>Otra para tu cómplice.</em></h3><p>El plan está servido. Tú trae la compañía.</p></div>
    <div className="friday-promo-offer" aria-label="Promoción de viernes: dos malteadas por cien pesos"><span>2 malteadas</span><strong><small>por</small> $100</strong><small>Pesos mexicanos</small><a href={promoWhatsapp} target="_blank" rel="noopener noreferrer">Consultar promo <ArrowUpRight size={17} aria-hidden="true" /></a></div>
  </aside>;
}
