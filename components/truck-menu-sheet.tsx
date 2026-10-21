import Image from "next/image";
import { dishes } from "@/lib/menu";
import { FoodIcon } from "@/components/food-icon";
import "./truck-menu-sheet.css";

export const truckSheets = [
  { id: "dulces", title: "Dulces" },
  { id: "salados", title: "Snacks" },
  { id: "bebidas", title: "Bebidas" },
] as const;
const product = (name: string) => dishes.find((dish) => dish.name === name)!;

function PaperArt({ kind }: { kind: "Crepas" | "Waffles" | "Hotcakes" | "Crema" | "Postres" | "Snacks" | "Café" }) {
  if (kind === "Crepas" || kind === "Waffles") return <FoodIcon kind={kind} />;
  return <svg viewBox="0 0 100 110" fill="none" stroke="#503426" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    {kind === "Café" ? <>
      <path d="m18 33 10 67q22 10 44 0l10-67" fill="#e7cfad" /><path d="m22 50 5 36q23 11 47 0l5-36" fill="#b17c52" /><ellipse cx="50" cy="32" rx="34" ry="12" fill="#bd885b" /><path d="M20 27q30-25 60 0v8q-30 15-60 0Z" fill="#bf8d60" /><ellipse cx="50" cy="26" rx="27" ry="8" fill="#d2a87e" /><path d="M30 26q20-7 40 0M35 19q15-4 30 0" /><path d="M33 63q7-9 11 0t11 0 11 0" stroke="#f8e0b9" strokeWidth="3" />
    </> : kind === "Snacks" ? <>
      {[17,29,41,53,65,77].map((x,i)=><path key={x} d={`m${x} ${12+i%3*7} ${i%2?8:-7} 51`} stroke="#efa93a" strokeWidth="9" />)}
      <path d="m12 53 13 49q25 13 50 0l13-49Z" fill="#d2493d" /><path d="m15 63 68 11m-63 7 60 10m-57 7 53 9" stroke="#fff0d6" strokeWidth="10" />
    </> : kind === "Hotcakes" ? <>
      {[70,53,36].map(y=><g key={y}><path d={`M8 ${y}v13q40 25 84 0v-13`} fill="#d89435" /><ellipse cx="50" cy={y} rx="42" ry="17" fill="#efbd5c" /></g>)}
      <path d="M15 35q15-18 38-7t29 7q-3 12-17 6t-11 17q-14 7-16-9t-23-14Z" fill="#a84f27" /><path d="m42 22 20 4-4 15-20-4Z" fill="#ffe577" />
    </> : kind === "Crema" ? <>
      <path d="m23 49 12 38q15 15 30 0l12-38Z" fill="#efa0ad" /><path d="M49 93v10m-18 2h38" stroke="#bc7c85" strokeWidth="4" /><path d="M19 49q1-25 18-22 3-27 22-9 21-1 21 31-30 15-61 0Z" fill="#fff1d1" /><path d="m24 32 10-11 12 9-10 14Zm29-9 10-13 11 9-9 15Z" fill="#dc4651" /><path d="m26 25 6-9 6 7m19-5 5-11 7 7" stroke="#688949" strokeWidth="4" />
    </> : <>
      <path d="M5 72q44 45 90 0l-20 26H25Z" fill="#edb55e" /><path d="M8 69q15-22 24-4t24-3 35 8" stroke="#f5cb48" strokeWidth="10" /><circle cx="28" cy="57" r="19" fill="#d18a65" /><circle cx="52" cy="54" r="20" fill="#fff1d1" /><circle cx="75" cy="59" r="17" fill="#f1a9ae" /><path d="M15 49q14-18 25 5t24-6 25 11" stroke="#7c4636" strokeWidth="7" /><circle cx="30" cy="33" r="6" fill="#d53e49" /><circle cx="56" cy="29" r="6" fill="#d53e49" /><circle cx="78" cy="38" r="6" fill="#d53e49" /><path d="m31 27 3-12m22 8 3-13m19 22 4-12" />
    </>}
  </svg>;
}

export function TruckStamp({ thankYou = false }: { thankYou?: boolean }) {
  return <div className={`truck-stamp ${thankYou ? "stamp-thanks" : ""}`} aria-label="Ronny’s">
    {thankYou && <span className="stamp-thanks-label">THANK YOU</span>}
    <div className="truck-stamp-circle"><Image src="/images/brand/ronny-flat-logo.png" alt="" width={1254} height={1254} sizes="100px" /><span>Ronny’s</span></div>
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
