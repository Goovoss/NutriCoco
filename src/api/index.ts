import { buscarIngrediente as buscarOpenFoodFacts } from "./openFoodFacts";
import { buscarIngredienteUSDA } from "./usda";
import type { Ingrediente } from "../types";

export async function buscarIngredienteCombinado(nombre: string): Promise<Ingrediente[]> {
  const resultados = await Promise.allSettled([
    buscarIngredienteUSDA(nombre),
    buscarOpenFoodFacts(nombre),
  ]);

  const todos: Ingrediente[] = [];

  for (const resultado of resultados) {
    if (resultado.status === "fulfilled") {
      todos.push(...resultado.value);
    }
  }

  // Eliminar duplicados por nombre similar
  const vistos = new Set<string>();
  return todos.filter((ing) => {
    const clave = ing.nombre.toLowerCase().slice(0, 20);
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });
}