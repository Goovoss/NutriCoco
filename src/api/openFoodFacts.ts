import type { Ingrediente, Nutrientes } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";

interface OpenFoodFactsProducto {
  product_name: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    fiber_100g?: number;
    sugars_100g?: number;
    salt_100g?: number;
  };
}

function extraerNutrientes(producto: OpenFoodFactsProducto): Nutrientes {
  const n = producto.nutriments ?? {};
  return {
    calorias: n["energy-kcal_100g"] ?? 0,
    proteinas: n["proteins_100g"] ?? 0,
    grasas: n["fat_100g"] ?? 0,
    carbohidratos: n["carbohydrates_100g"] ?? 0,
    fibra: n["fiber_100g"] ?? 0,
    azucar: n["sugars_100g"] ?? 0,
    sal: n["salt_100g"] ?? 0,
  };
}

export async function buscarIngrediente(nombre: string): Promise<Ingrediente[]> {
  const respuesta = await fetch(`${BASE_URL}/alimentos/openfoodfacts?buscar=${encodeURIComponent(nombre)}`);
  if (!respuesta.ok) return [];
  const datos = await respuesta.json();

  return datos.datos
    .filter((p: OpenFoodFactsProducto) => p.product_name?.trim())
    .map((p: OpenFoodFactsProducto) => ({
      id: crypto.randomUUID(),
      nombre: p.product_name,
      nutrientes: extraerNutrientes(p),
    }));
}