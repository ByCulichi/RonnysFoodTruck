import type { Dish } from "@/lib/menu";
import { getMenuCategory } from "@/lib/menu-categories";

export const halloweenCostumes = {
  bruja: {
    src: "/images/ronny/halloween/ronny-bruja-natural.png",
    alt: "Ronny café de bruja, de pie con ambas botas apoyadas, escoba a un lado y waffle en una bandeja",
    title: "Dulces bajo mi hechizo.",
    message: "Crepas, waffles y postres. Yo pongo el hechizo; tú eliges el antojo.",
  },
  fantasma: {
    src: "/images/ronny/halloween/ronny-fantasma-natural.png",
    alt: "Ronny café de fantasma blanco, de pie con expresión tranquila y una malteada de fresa a su costado",
    title: "Esta malteada desaparece.",
    message: "Malteadas, frappés e ICE. ¡Bú! ¿Me guardas un sorbito?",
  },
  vampiro: {
    src: "/images/ronny/halloween/ronny-vampiro-natural.png",
    alt: "Ronny café de vampiro barista con capa negra y vino, de pie preparando un café a la altura de la cintura",
    title: "Un cafecito para esta noche.",
    message: "Americano, capuchino y moka. Mi capa y yo te acompañamos con algo calientito.",
  },
  diablito: {
    src: "/images/ronny/halloween/ronny-diablito-natural.png",
    alt: "Ronny café de diablito rojo, de pie con ambas patas en el suelo y una hamburguesa a la altura de la cintura",
    title: "Pequeño diablo del antojo.",
    message: "Hot dogs, hamburguesas y banderillas. Una travesura bien sabrosa.",
  },
  zombi: {
    src: "/images/ronny/halloween/ronny-zombi-natural.png",
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
