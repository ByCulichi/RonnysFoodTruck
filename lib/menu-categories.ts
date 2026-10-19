import type { Dish } from "@/lib/menu";

export const menuCategories = [
  { id: "dulces", label: "Dulces", shortLabel: "Dulces", icon: "Waffles" },
  { id: "salados", label: "Salados", shortLabel: "Salados", icon: "Hamburguesas" },
  { id: "frias", label: "Bebidas frías", shortLabel: "Frías", icon: "Malteadas" },
  { id: "calientes", label: "Bebidas calientes", shortLabel: "Calientes", icon: "Café" },
] as const;
export type MenuCategory = typeof menuCategories[number]["id"];

// Separate the existing drinks; do not duplicate products or change the carta.
export function getMenuCategory(dish: Pick<Dish, "group" | "kind">): MenuCategory {
  if (dish.group === "Dulces") return "dulces";
  if (dish.group === "Salados") return "salados";
  return dish.kind === "Café" ? "calientes" : "frias";
}
