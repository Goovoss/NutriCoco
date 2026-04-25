import type { Ingrediente, Nutrientes } from "../types";

const BASE_URL = "https://world.openfoodfacts.org/cgi/search.pl";

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

interface OpenFoodFactsRespuesta {
  products: OpenFoodFactsProducto[];
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
  const params = new URLSearchParams({
    search_terms: nombre,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "5",
    fields: "product_name,nutriments",
  });

  const respuesta = await fetch(`${BASE_URL}?${params}`);
  if (!respuesta.ok) throw new Error("Error al conectar con Open Food Facts");

  const datos: OpenFoodFactsRespuesta = await respuesta.json();

  return datos.products
    .filter((p) => p.product_name && p.product_name.trim() !== "")
    .map((p) => ({
      id: crypto.randomUUID(),
      nombre: p.product_name,
      nutrientes: extraerNutrientes(p),
    }));
}