import type { FoodKind } from "@/components/food-icon";

export type MenuPhoto = {
  src: string;
  alt: string;
  position?: string;
  extension?: "jpg" | "png";
  generated?: boolean;
};
export type Dish = {
  name: string;
  category: string;
  group: "Dulces" | "Salados" | "Bebidas";
  kind: FoodKind;
  description: string;
  photos: MenuPhoto[];
  options: { name: string; price: number }[];
};

export const menuPhotoUrl = (photo: MenuPhoto) => `/images/menu/${photo.src}.${photo.extension || "jpg"}`;

// Products and prices come from the owner’s three original menu cards.
// Generated supporting images are explicitly marked; original photos stay unchanged.
export const dishes: Dish[] = [
  {
    name: "Crepas", category: "DOBLADITAS DE FELICIDAD", group: "Dulces", kind: "Crepas",
    description: "Nutella, cajeta, zarzamora con queso o fresa con queso.",
    photos: [
      { src: "crepas/crepa-helado", alt: "Crepa de Ronny’s con fresas, chocolate y helado" },
      { src: "crepas/crepa-nutella", alt: "Crepa de Ronny’s con chocolate y helado" },
      { src: "crepas/crepa-platano", alt: "Crepa de Ronny’s con plátano y lechera" },
    ],
    options: [{ name: "Sencilla", price: 45 }, { name: "Con fruta", price: 55 }, { name: "Con fruta y helado", price: 65 }],
  },
  {
    name: "Waffles", category: "CRUJIENTES Y CONSENTIDOS", group: "Dulces", kind: "Waffles",
    description: "Cajeta, Nutella, fresa, maple o lechera.",
    photos: [
      { src: "waffles/waffle-fresas", alt: "Waffle de Ronny’s cubierto con fresas" },
    ],
    options: [{ name: "Sencillo", price: 55 }, { name: "Con fruta", price: 65 }, { name: "Con fruta y helado", price: 75 }],
  },
  {
    name: "Hotcakes", category: "SUAVECITOS, COMO UN ABRAZO", group: "Dulces", kind: "Postres",
    description: "Nutella, fresa, cajeta, maple o lechera.",
    photos: [
      { src: "hotcakes/hotcakes-fresas", alt: "Hotcakes de Ronny’s con fresas y lechera" },
    ],
    options: [{ name: "Sencillos", price: 50 }, { name: "Con fruta", price: 60 }],
  },
  {
    name: "Plátanos con crema", category: "LA CUCHARADA MÁS FELIZ", group: "Dulces", kind: "Postres",
    description: "Plátanos con crema de la carta del truck.",
    photos: [
      { src: "postres/platanos-crema", alt: "Plátanos con crema de Ronny’s" },
    ],
    options: [{ name: "Plátanos con crema", price: 50 }],
  },
  {
    name: "Duraznos con crema", category: "LA CUCHARADA MÁS FELIZ", group: "Dulces", kind: "Postres",
    description: "Duraznos con crema de la carta del truck.",
    photos: [
      { src: "postres/duraznos-crema", alt: "Duraznos con crema de Ronny’s" },
    ],
    options: [{ name: "Duraznos con crema", price: 50 }],
  },
  {
    name: "Fresas con crema", category: "LA CUCHARADA MÁS FELIZ", group: "Dulces", kind: "Postres",
    description: "Fresas con crema de la carta del truck.",
    photos: [
      { src: "postres/fresas-crema", alt: "Fresas con crema de Ronny’s" },
    ],
    options: [{ name: "Fresas con crema", price: 60 }],
  },
  {
    name: "Banana split", category: "TODAVÍA CABE ALGO DULCE", group: "Dulces", kind: "Postres",
    description: "El clásico banana split de la carta del truck.",
    photos: [
      { src: "generated/banana-split", alt: "Imagen ilustrativa: banana split con helado", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Banana split", price: 45 }],
  },
  {
    name: "Banderilla dulce", category: "CHOCOLATE EN UN PALITO", group: "Dulces", kind: "Banderillas",
    description: "Milky Way, Snickers, Oreo o Kinder Delice.",
    photos: [
      { src: "generated/banderilla-dulce", alt: "Imagen ilustrativa: banderilla dulce de chocolate", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Banderilla dulce", price: 45 }],
  },
  {
    name: "Hamburguesas", category: "AQUÍ SE VIENE CON HAMBRE", group: "Salados", kind: "Hamburguesas",
    description: "Sencilla, hawaiana, con salsa de tocino o doble. Elige tu favorita.",
    photos: [
      { src: "hamburguesas/hamburguesa-tocino", alt: "Hamburguesa de Ronny’s con queso y salsa de tocino" },
      { src: "hamburguesas/hamburguesa-hawaiana", alt: "Hamburguesa de Ronny’s con jamón y queso" },
    ],
    options: [{ name: "Sencilla", price: 75 }, { name: "Hawaiana", price: 85 }, { name: "Con salsa de tocino", price: 85 }, { name: "Doble (res, arrachera, sirloin o pollo)", price: 105 }],
  },
  {
    name: "Hot dogs", category: "UNO NUNCA ES SUFICIENTE", group: "Salados", kind: "Hot dogs",
    description: "Un clásico del truck, solito o en un pack de tres.",
    photos: [
      { src: "generated/hot-dog", alt: "Imagen ilustrativa: hot dog sencillo", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Sencillo", price: 20 }, { name: "Pack de 3", price: 50 }],
  },
  {
    name: "Banderilla coreana", category: "EL ANTOJO EN UN PALITO", group: "Salados", kind: "Banderillas",
    description: "Banderilla coreana con salchicha jumbo.",
    photos: [
      { src: "generated/banderilla-coreana", alt: "Imagen ilustrativa: banderilla coreana de salchicha jumbo", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Coreana (salchicha jumbo)", price: 55 }],
  },
  {
    name: "Alitas", category: "PARA CHUPARSE LOS DEDOS", group: "Salados", kind: "Snacks",
    description: "Alitas o alitas con papas. Tú pones el antojo.",
    photos: [
      { src: "generated/alitas", alt: "Imagen ilustrativa: alitas", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Alitas", price: 85 }, { name: "Con papas", price: 100 }],
  },
  {
    name: "Salchipapas", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Salchipapas de la carta del truck.",
    photos: [
      { src: "generated/salchipapas", alt: "Imagen ilustrativa: salchipapas", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Salchipapas", price: 55 }],
  },
  {
    name: "Salchipulpos", category: "PARA EL TEAM SALADO", group: "Salados", kind: "Snacks",
    description: "El antojo de salchipulpos de Ronny’s.",
    photos: [
      { src: "snacks/salchipulpos", alt: "Salchipulpos de Ronny’s con salsas" },
    ],
    options: [{ name: "Salchipulpos", price: 60 }],
  },
  {
    name: "Papas a la francesa", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Papas a la francesa para acompañar tu antojo.",
    photos: [
      { src: "generated/papas-francesa", alt: "Imagen ilustrativa: papas a la francesa", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Papas a la francesa", price: 45 }],
  },
  {
    name: "Papas locas", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Papas locas de la carta del truck.",
    photos: [
      { src: "generated/papas-locas", alt: "Imagen ilustrativa: papas locas", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Papas locas", price: 40 }],
  },
  {
    name: "Nachos", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Nachos de la carta del truck.",
    photos: [
      { src: "generated/nachos", alt: "Imagen ilustrativa: nachos", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Nachos", price: 50 }],
  },
  {
    name: "Maruchan", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Maruchan de la carta del truck.",
    photos: [
      { src: "generated/maruchan", alt: "Imagen ilustrativa: maruchan", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Maruchan", price: 30 }],
  },
  {
    name: "Sincronizada jumbo", category: "PARA EL HAMBRE DE MONSTRUO", group: "Salados", kind: "Snacks",
    description: "Sincronizada en tamaño jumbo, como aparece en la carta.",
    photos: [
      { src: "generated/sincronizada", alt: "Imagen ilustrativa: sincronizada jumbo", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Sincronizada jumbo", price: 45 }],
  },
  {
    name: "Malteadas", category: "UN SORBITO DE FELICIDAD", group: "Bebidas", kind: "Malteadas",
    description: "Fresa, vainilla, chocolate o galleta. ¿Con cuál empiezas?",
    photos: [
      { src: "malteadas/malteada-fresa", alt: "Malteada de fresa de Ronny’s con crema batida" },
      { src: "malteadas/malteada-vainilla", alt: "Malteada clara de Ronny’s con crema batida y chocolate" },
    ],
    options: [{ name: "Malteada", price: 55 }],
  },
  {
    name: "Americano", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Café",
    description: "Americano de la carta del truck.",
    photos: [
      { src: "generated/americano", alt: "Imagen ilustrativa: americano", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Americano", price: 22 }],
  },
  {
    name: "Capuchino", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Café",
    description: "Capuchino de la carta del truck.",
    photos: [
      { src: "generated/capuchino", alt: "Imagen ilustrativa: capuchino", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Capuchino", price: 35 }],
  },
  {
    name: "Capuchino cajeta", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Café",
    description: "Capuchino cajeta de la carta del truck.",
    photos: [
      { src: "generated/capuchino-cajeta", alt: "Imagen ilustrativa: capuchino cajeta", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Capuchino cajeta", price: 40 }],
  },
  {
    name: "Moka", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Café",
    description: "Moka de la carta del truck.",
    photos: [
      { src: "generated/moka-caliente", alt: "Imagen ilustrativa: moka", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Moka", price: 40 }],
  },
  {
    name: "Frappé de mazapán", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Frappés",
    description: "Frappé de mazapán.",
    photos: [
      { src: "generated/frappe-mazapan", alt: "Imagen ilustrativa: frappé de mazapán", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Frappé de mazapán", price: 55 }],
  },
  {
    name: "Frappé de café", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "Frappés",
    description: "Frappé de café.",
    photos: [
      { src: "generated/frappe-cafe", alt: "Imagen ilustrativa: frappé de café", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "Frappé de café", price: 55 }],
  },
  {
    name: "ICE de cereza", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "ICE",
    description: "ICE sabor cereza.",
    photos: [
      { src: "generated/ice-cereza", alt: "Imagen ilustrativa: ice de cereza", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "ICE de cereza", price: 45 }],
  },
  {
    name: "ICE de mora", category: "UN SORBITO DE MAGIA", group: "Bebidas", kind: "ICE",
    description: "ICE sabor mora.",
    photos: [
      { src: "generated/ice-mora", alt: "Imagen ilustrativa: ice de mora", extension: "png", generated: true, position: "center" },
    ],
    options: [{ name: "ICE de mora", price: 45 }],
  },
];
