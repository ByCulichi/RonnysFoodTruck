import type { Dish } from "@/lib/menu";
import { activeSeason } from "@/lib/welcome-season";
import { getMenuCategory } from "@/lib/menu-categories";

export const halloweenCostumes = {
  bruja: {
    src: "/images/ronny/halloween/ronny-bruja-natural-caramel.png",
    alt: "Ronny café de bruja, de pie con ambas botas apoyadas, escoba a un lado y waffle en una bandeja",
    title: "Dulces bajo mi hechizo.",
    message: "Crepas, waffles y postres. Yo pongo el hechizo; tú eliges el antojo.",
  },
  fantasma: {
    src: "/images/ronny/halloween/ronny-fantasma-natural-caramel.png",
    alt: "Ronny café de fantasma blanco, de pie con expresión tranquila y una malteada de fresa a su costado",
    title: "Esta malteada desaparece.",
    message: "Malteadas, frappés e ICE. ¡Bú! ¿Me guardas un sorbito?",
  },
  vampiro: {
    src: "/images/ronny/halloween/ronny-vampiro-natural-caramel.png",
    alt: "Ronny café de vampiro barista con capa negra y vino, de pie preparando un café a la altura de la cintura",
    title: "Un cafecito para esta noche.",
    message: "Americano, capuchino y moka. Mi capa y yo te acompañamos con algo calientito.",
  },
  diablito: {
    src: "/images/ronny/halloween/ronny-diablito-natural-caramel.png",
    alt: "Ronny café de diablito rojo, de pie con ambas patas en el suelo y una hamburguesa a la altura de la cintura",
    title: "Pequeño diablo del antojo.",
    message: "Hot dogs, hamburguesas y banderillas. Una travesura bien sabrosa.",
  },
  zombi: {
    src: "/images/ronny/halloween/ronny-zombi-natural-caramel.png",
    alt: "Ronny café de zombi con chaqueta verde y overol morado, postura relajada y papas a un lado",
    title: "Hasta de zombi tengo hambre.",
    message: "Alitas, papas y snacks. Estos antojos sí los defiendo.",
  },
} as const;

export type HalloweenCostume = keyof typeof halloweenCostumes;

// Keep the book's facing illustration and its companion in the same outfit.
export const truckSheetCostumes = ["bruja", "zombi", "vampiro"] as const;

export function getMenuCostume(dish: Pick<Dish, "group" | "kind">): HalloweenCostume {
  if (dish.group === "Dulces") return "bruja";
  if (getMenuCategory(dish) === "calientes") return "vampiro";
  if (dish.group === "Bebidas") return "fantasma";
  return dish.kind === "Snacks" ? "zombi" : "diablito";
}

// Category outfits share Roo's identity while celebrating different November
// traditions. All original catrín poses remain available as intact assets.
const muertosCostumes = {
  bruja: {
    src: "/images/ronny/muertos/roo-calaverita-dulces.png",
    width: 1024, height: 1536,
    alt: "Roo de calaverita con traje de huesitos y flores, corona de cempasúchil y un waffle con fresas y helado",
    title: "Dulces para recordar.",
    message: "Crepas, waffles y postres para compartir.",
  },
  fantasma: {
    src: "/images/ronny/muertos/roo-alebrije-frias.png",
    width: 1024, height: 1536,
    alt: "Roo de alebrije con atuendo turquesa y morado, alas decorativas y una malteada de fresa, saludando con una patita",
    title: "Un sorbito de otro mundo.",
    message: "Malteadas, frappés e ICE para acompañar tu antojo.",
  },
  vampiro: {
    src: "/images/ronny/muertos/roo-panadero-calientes.png",
    width: 1024, height: 1536,
    alt: "Roo de panadero de ofrenda sentado con su delantal crema, gorro de cempasúchil y una taza de café entre sus patitas",
    title: "Un cafecito con cariño.",
    message: "Americano, capuchino y moka. Algo calientito para esta noche.",
  },
  diablito: {
    src: "/images/ronny/muertos/roo-catrin-salados.png",
    width: 1024, height: 1536,
    alt: "Roo de catrín con una patita en la cintura y una hamburguesa con tocino en una bandeja",
    title: "Un antojo con mucho corazón.",
    message: "Hot dogs, hamburguesas y banderillas para compartir.",
  },
  zombi: {
    src: "/images/ronny/muertos/roo-mariachi-snacks.png",
    width: 1024, height: 1536,
    alt: "Roo de mariachi con traje vino bordado en dorado y sombrero de cempasúchil, ofreciendo papas y nachos en una charola de cuadros rojos",
    title: "Sabores que se recuerdan.",
    message: "Alitas, papas y snacks para disfrutar juntos.",
  },
} as const;

export const activeCostumes: Record<HalloweenCostume, { src: string; alt: string; title: string; message: string; width?: number; height?: number }> = activeSeason === "muertos" ? muertosCostumes : halloweenCostumes;
