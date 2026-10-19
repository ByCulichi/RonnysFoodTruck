import type { Dish } from "@/lib/menu";
import { getMenuCategory } from "@/lib/menu-categories";

export const halloweenCostumes = {
  bruja: {
    src: "/images/ronny/halloween/ronny-bruja-flying.png",
    alt: "Ronny café de bruja, sentado y volando en su escoba con la capa al viento y un waffle en la patita",
    title: "Un poquito de magia dulce.",
    message: "Crepas, waffles y postres. Yo pongo el hechizo; tú eliges el antojo.",
  },
  fantasma: {
    src: "/images/ronny/halloween/ronny-fantasma.png",
    alt: "Ronny café con disfraz completo de fantasma blanco, cara y orejas visibles, con una malteada de fresa",
    title: "Esta malteada desaparece.",
    message: "Malteadas, frappés e ICE. ¡Bú! ¿Me guardas un sorbito?",
  },
  vampiro: {
    src: "/images/ronny/halloween/ronny-vampiro-barista.png",
    alt: "Ronny café de vampiro barista, con capa negra y vino, chaleco naranja y delantal, preparando un café humeante",
    title: "Un cafecito para esta noche.",
    message: "Americano, capuchino y moka. Mi capa y yo te acompañamos con algo calientito.",
  },
  diablito: {
    src: "/images/ronny/halloween/ronny-diablito-serving.png",
    alt: "Ronny café de diablito rojo, inclinado para servir una hamburguesa con ambas patitas y una pierna levantada",
    title: "Pequeño diablo del antojo.",
    message: "Hot dogs, hamburguesas y banderillas. Una travesura bien sabrosa.",
  },
  zombi: {
    src: "/images/ronny/halloween/ronny-zombi.png",
    alt: "Ronny café disfrazado de zombi con chaqueta verde, overol morado de parches y botas, protegiendo sus papas",
    title: "Hasta de zombi tengo hambre.",
    message: "Alitas, papas y snacks. Estos antojos sí los defiendo.",
  },
} as const;

export type HalloweenCostume = keyof typeof halloweenCostumes;

export function getMenuCostume(dish: Pick<Dish, "group" | "kind">): HalloweenCostume {
  if (dish.group === "Dulces") return "bruja";
  if (getMenuCategory(dish) === "calientes") return "vampiro";
  if (dish.group === "Bebidas") return "fantasma";
  return dish.kind === "Snacks" ? "zombi" : "diablito";
}
