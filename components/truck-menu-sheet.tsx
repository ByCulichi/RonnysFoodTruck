import Image from "next/image";
import { dishes } from "@/lib/menu";
import "./truck-menu-sheet.css";

export const truckSheets = [
  { id: "dulces", title: "Dulces" },
  { id: "salados", title: "Snacks" },
  { id: "bebidas", title: "Bebidas" },
] as const;
const product = (name: string) => dishes.find((dish) => dish.name === name)!;

const paperArt = {
  Crepas: "crepa", Waffles: "waffle", Hotcakes: "hotcakes", Crema: "fresas-crema",
  Postres: "banana-split", Snacks: "papas", Café: "cafe",
} as const;

function PaperArt({ kind }: { kind: keyof typeof paperArt }) {
  return <Image src={`/images/menu/illustrations/${paperArt[kind]}.png`} alt="" width={1024} height={1024} sizes="(max-width: 600px) 80px, 150px" />;
}

export function TruckStamp({ thankYou = false }: { thankYou?: boolean }) {
  return <div className={`truck-stamp ${thankYou ? "stamp-thanks" : ""}`} role="img" aria-label={thankYou ? "Gracias por tu visita a Ronny’s" : "Sello de Ronny’s"}>
    {thankYou && <span className="stamp-thanks-label">THANK YOU</span>}
    <div className="truck-stamp-circle"><Image src="/images/menu/illustrations/sello-ronny.png" alt="" width={1024} height={1024} sizes="120px" /></div>
  </div>;
}

function PriceLine({ name, option = 0, label }: { name: string; option?: number; label?: string }) {
  const dish = product(name), item = dish.options[option];
  return <li className="paper-price-line" data-dish={name} data-option={option}><span>{label || name}</span><i aria-hidden="true" /><strong>${item.price}</strong></li>;
}

function SweetPanel({ name, flavors }: { name: string; flavors: string[] }) {
  const dish = product(name);
  return <section className="paper-panel paper-sweet-panel" aria-label={name}>
    <div className="paper-food-art"><PaperArt kind={name as "Crepas" | "Waffles" | "Hotcakes"} /></div>
    <div className="paper-sweet-flavors"><h4>{name}</h4><p>{flavors.map(flavor=><span key={flavor}>{flavor}</span>)}</p></div>
    <table className="paper-variants"><caption className="sr-only">Precios de {name}</caption><thead><tr>{dish.options.map((item,i)=><th key={item.name} scope="col">{i===0?"Sencillos":i===1?"Con fruta":<>Con fruta<br />y helado</>}</th>)}</tr></thead><tbody><tr>{dish.options.map((item,i)=><td key={item.name} data-dish={name} data-option={i}>${item.price}</td>)}</tr></tbody></table>
  </section>;
}

export function TruckMenuSheet({ sheet }: { sheet: number }) {
  return <div className={`truck-menu-sheet sheet-${truckSheets[sheet].id}`} aria-label={`Carta digital de ${truckSheets[sheet].title.toLowerCase()}`}>
    <div className="paper-checkers" aria-hidden="true" />
    {sheet === 0 ? <div className="paper-sweet-sections">
      <SweetPanel name="Crepas" flavors={["Nutella", "Cajeta", "Zarzamora con queso", "Fresa con queso"]} />
      <SweetPanel name="Waffles" flavors={["Cajeta", "Nutella", "Fresa", "Maple", "Lechera"]} />
      <SweetPanel name="Hotcakes" flavors={["Nutella", "Fresa", "Cajeta", "Maple", "Lechera"]} />
      <section className="paper-panel paper-list-panel" aria-label="Con crema"><div className="paper-food-art"><PaperArt kind="Crema" /></div><div><h4>Con crema</h4><ul><PriceLine name="Fresas con crema" /><PriceLine name="Plátanos con crema" /><PriceLine name="Duraznos con crema" /></ul></div></section>
      <section className="paper-panel paper-list-panel" aria-label="Postres"><div className="paper-food-art"><PaperArt kind="Postres" /></div><div><h4>Postres</h4><ul><PriceLine name="Banana split" /><PriceLine name="Banderilla dulce" label="Banderilla coreana Milky Way, Snickers, Oreo y Kinder Delice" /></ul></div></section>
    </div> : <>
      <header className="paper-sheet-heading">{sheet===2 && <TruckStamp />}<h4>{truckSheets[sheet].title}</h4></header>
      <section className="paper-panel paper-main-panel" aria-label={`Productos de ${truckSheets[sheet].title.toLowerCase()}`}>
        <div className="paper-food-art"><PaperArt kind={sheet===1?"Snacks":"Café"} /></div>
        <ul>{sheet===1 ? <>
          <PriceLine name="Alitas" /><PriceLine name="Alitas" option={1} label="Alitas con papas" />
          <PriceLine name="Hamburguesas" option={2} label="Hamburguesa con salsa de tocino" /><PriceLine name="Hamburguesas" option={1} label="Hamburguesa hawaiana" /><PriceLine name="Hamburguesas" label="Hamburguesa sencilla" /><PriceLine name="Hamburguesas" option={3} label="Hamburguesa doble (res, arrachera, sirloin, pollo)" />
          <PriceLine name="Hot dogs" label="Hotdog sencillo" /><PriceLine name="Hot dogs" option={1} label="Hotdog pack (3)" />
          <PriceLine name="Salchipapas" /><PriceLine name="Papas a la francesa" /><PriceLine name="Salchipulpos" />
          <PriceLine name="Banderilla coreana" label="Banderilla coreana (salchicha jumbo)" /><PriceLine name="Sincronizada jumbo" label="Sincronizada (jumbo)" /><PriceLine name="Maruchan" /><PriceLine name="Nachos" /><PriceLine name="Papas locas" />
        </> : <>
          <PriceLine name="Capuchino" /><PriceLine name="Capuchino cajeta" /><PriceLine name="Moka" /><PriceLine name="Americano" />
          <PriceLine name="Malteadas" label="Malteada fresa, vainilla, chocolate y galleta" />
          <PriceLine name="Frappé de mazapán" label="Frappé Mazapán, Café" />
          <PriceLine name="ICE de cereza" label="ICEE cereza y mora" />
        </>}</ul>
      </section>
      <footer className="paper-sheet-footer">{sheet===1 && <span className="paper-star" aria-hidden="true">★</span>}<TruckStamp thankYou={sheet===2} /></footer>
    </>}
    <div className="paper-checkers" aria-hidden="true" />
  </div>;
}
