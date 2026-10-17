import type { FoodKind } from "@/components/food-icon";

export type Dish = {
  name: string;
  category: string;
  group: "Dulces" | "Salados" | "Bebidas";
  kind: FoodKind;
  description: string;
  photos: { src: string; alt: string; position?: string }[];
  options: { name: string; price: number }[];
};

// Transcribed from the owner's three menu photographs in ronnys.zip.
// Prices and products must be changed from an owner-confirmed source only.
export const dishes: Dish[] = [
  {
    name: "Malteadas", category: "UN SORBITO DE FELICIDAD", group: "Bebidas", kind: "Malteadas",
    description: "Fresa, vainilla, chocolate o galleta. ¿Con cuál empiezas?",
    photos: [{ src: "malteada-fresa", alt: "Malteada de fresa de Ronny’s con crema batida" }, { src: "malteada-vainilla", alt: "Malteada clara de Ronny’s con crema batida y chocolate" }],
    options: [{ name: "Malteada", price: 55 }],
  },
  {
    name: "Crepas", category: "DOBLADITAS DE FELICIDAD", group: "Dulces", kind: "Crepas",
    description: "Nutella, cajeta, zarzamora con queso o fresa con queso.",
    photos: [{ src: "crepa-helado", alt: "Crepa de Ronny’s con fresas, chocolate y helado" }, { src: "crepa-nutella", alt: "Crepa de Ronny’s con chocolate y helado" }, { src: "crepa-platano", alt: "Crepa de Ronny’s con plátano y lechera" }],
    options: [{ name: "Sencilla", price: 45 }, { name: "Con fruta", price: 55 }, { name: "Con fruta y helado", price: 65 }],
  },
  {
    name: "Hamburguesas", category: "AQUÍ SE VIENE CON HAMBRE", group: "Salados", kind: "Hamburguesas",
    description: "Sencilla, hawaiana, con salsa de tocino o doble. Elige tu favorita.",
    photos: [{ src: "hamburguesa-tocino", alt: "Hamburguesa de Ronny’s con queso y salsa de tocino" }, { src: "hamburguesa-hawaiana", alt: "Hamburguesa de Ronny’s con jamón y queso" }],
    options: [{ name: "Sencilla", price: 75 }, { name: "Hawaiana", price: 85 }, { name: "Con salsa de tocino", price: 85 }, { name: "Doble (res, arrachera, sirloin o pollo)", price: 105 }],
  },
  {
    name: "Hot dogs", category: "UNO NUNCA ES SUFICIENTE", group: "Salados", kind: "Hot dogs",
    description: "Un clásico del truck, solito o en un pack de tres.", photos: [],
    options: [{ name: "Sencillo", price: 20 }, { name: "Pack de 3", price: 50 }],
  },
  {
    name: "Banderillas", category: "EL ANTOJO EN UN PALITO", group: "Salados", kind: "Banderillas",
    description: "Banderilla coreana con salchicha jumbo.", photos: [],
    options: [{ name: "Coreana (salchicha jumbo)", price: 55 }],
  },
  {
    name: "Alitas", category: "PARA CHUPARSE LOS DEDOS", group: "Salados", kind: "Snacks",
    description: "Alitas o alitas con papas. Tú pones el antojo.", photos: [],
    options: [{ name: "Alitas", price: 85 }, { name: "Con papas", price: 100 }],
  },
  {
    name: "Waffles", category: "CRUJIENTES Y CONSENTIDOS", group: "Dulces", kind: "Waffles",
    description: "Cajeta, Nutella, fresa, maple o lechera.",
    photos: [{ src: "waffle-fresas", alt: "Waffle de Ronny’s cubierto con fresas" }],
    options: [{ name: "Sencillo", price: 55 }, { name: "Con fruta", price: 65 }, { name: "Con fruta y helado", price: 75 }],
  },
  {
    name: "Hotcakes", category: "SUAVECITOS, COMO UN ABRAZO", group: "Dulces", kind: "Postres",
    description: "Nutella, fresa, cajeta, maple o lechera.",
    photos: [{ src: "hotcakes-fresas", alt: "Hotcakes de Ronny’s con fresas y lechera" }],
    options: [{ name: "Sencillos", price: 50 }, { name: "Con fruta", price: 60 }],
  },
  {
    name: "Fruta con crema", category: "LA CUCHARADA MÁS FELIZ", group: "Dulces", kind: "Postres",
    description: "Fresas, plátanos o duraznos con crema.",
    photos: [{ src: "fresas-crema", alt: "Fresas con crema de Ronny’s" }, { src: "platanos-crema", alt: "Plátanos con crema de Ronny’s" }, { src: "duraznos-crema", alt: "Duraznos con crema de Ronny’s" }],
    options: [{ name: "Plátanos con crema", price: 50 }, { name: "Duraznos con crema", price: 50 }, { name: "Fresas con crema", price: 60 }],
  },
  {
    name: "Salchiantojos", category: "PARA EL TEAM SALADO", group: "Salados", kind: "Snacks",
    description: "Salchipapas o salchipulpos: dos formas de consentir el antojo.",
    photos: [{ src: "salchipulpos", alt: "Salchipulpos de Ronny’s con salsas" }],
    options: [{ name: "Salchipapas", price: 55 }, { name: "Salchipulpos", price: 60 }],
  },
  {
    name: "Papas y extras", category: "EL ANTOJO NO VIENE SOLO", group: "Salados", kind: "Snacks",
    description: "Papas, nachos y más para acompañar tu visita al truck.", photos: [],
    options: [{ name: "Papas locas", price: 40 }, { name: "Papas a la francesa", price: 45 }, { name: "Nachos", price: 50 }, { name: "Maruchan", price: 30 }, { name: "Sincronizada jumbo", price: 45 }],
  },
  {
    name: "Banana split", category: "TODAVÍA CABE ALGO DULCE", group: "Dulces", kind: "Postres",
    description: "El clásico banana split de la carta del truck.", photos: [],
    options: [{ name: "Banana split", price: 45 }],
  },
  {
    name: "Banderillas dulces", category: "CHOCOLATE EN UN PALITO", group: "Dulces", kind: "Banderillas",
    description: "Milky Way, Snickers, Oreo o Kinder Delice.", photos: [],
    options: [{ name: "Banderilla dulce", price: 45 }],
  },
  {
    name: "Cafecito", category: "EL COMPAÑERO PERFECTO", group: "Bebidas", kind: "Café",
    description: "De americano a moka: un sorbito para acompañar el postre.", photos: [],
    options: [{ name: "Americano", price: 22 }, { name: "Capuchino", price: 35 }, { name: "Capuchino cajeta", price: 40 }, { name: "Moka", price: 40 }],
  },
  {
    name: "Frappés", category: "FRÍOS Y MUY ANTOJABLES", group: "Bebidas", kind: "Frappés",
    description: "Mazapán o café. Dale un giro frío a tu antojo.", photos: [],
    options: [{ name: "Frappé de mazapán o café", price: 55 }],
  },
  {
    name: "ICE", category: "UN TOQUE BIEN FRESCO", group: "Bebidas", kind: "ICE",
    description: "Cereza o mora. ¿De qué color va tu antojo?", photos: [],
    options: [{ name: "ICE de cereza o mora", price: 45 }],
  },
];
export const foodKinds: FoodKind[] = ["Todo", "Crepas", "Malteadas", "Banderillas", "Hot dogs", "Hamburguesas", "Waffles", "Postres", "Snacks", "Café"];
