import type { Ingrediente } from "../types";
import { traducirAlIngles, traducirAlEspanol } from "../utils/traducir";

const API_KEY = import.meta.env.VITE_USDA_API_KEY;
const BASE_URL = import.meta.env.VITE_USDA_API_URL;

interface USDANutriente {
  nutrientName: string;
  value: number;
}

interface USDAAlimento {
  fdcId: number;
  description: string;
  foodNutrients: USDANutriente[];
}

interface USDARespuesta {
  foods: USDAAlimento[];
}

function extraerValor(nutrientes: USDANutriente[], nombre: string): number {
  return nutrientes.find((n) => n.nutrientName === nombre)?.value ?? 0;
}

export async function buscarIngredienteUSDA(nombre: string): Promise<Ingrediente[]> {
  const nombreEnIngles = await traducirAlIngles(nombre);

  const respuesta = await fetch(
    `${BASE_URL}?query=${encodeURIComponent(nombreEnIngles)}&pageSize=5&api_key=${API_KEY}&dataType=SR%20Legacy,Foundation`
  );

  if (!respuesta.ok) throw new Error("Error al conectar con USDA");

  const datos: USDARespuesta = await respuesta.json();

  const ingredientes = await Promise.all(
    datos.foods.map(async (alimento) => {
      const nombreEspanol = await traducirAlEspanol(alimento.description);
      return {
        id: crypto.randomUUID(),
        nombre: nombreEspanol,
        nutrientes: {
          calorias: extraerValor(alimento.foodNutrients, "Energy"),
          proteinas: extraerValor(alimento.foodNutrients, "Protein"),
          grasas: extraerValor(alimento.foodNutrients, "Total lipid (fat)"),
          carbohidratos: extraerValor(alimento.foodNutrients, "Carbohydrate, by difference"),
          fibra: extraerValor(alimento.foodNutrients, "Fiber, total dietary"),
          azucar: extraerValor(alimento.foodNutrients, "Sugars, total including NLEA"),
          sal: extraerValor(alimento.foodNutrients, "Sodium, Na") / 1000,
        },
      };
    })
  );

  return ingredientes;
}