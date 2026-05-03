import type { Ingrediente } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";

interface AlimentoAPI {
  id: string;
  nombre: string;
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  fibra: number;
  azucar: number;
  sal: number;
}

function alimentoAIngrediente(a: AlimentoAPI): Ingrediente {
  return {
    id: a.id,
    nombre: a.nombre,
    nutrientes: {
      calorias: a.calorias,
      proteinas: a.proteinas,
      grasas: a.grasas,
      carbohidratos: a.carbohidratos,
      fibra: a.fibra,
      azucar: a.azucar,
      sal: a.sal,
    },
  };
}

export async function buscarAlimentosPropios(nombre: string): Promise<Ingrediente[]> {
  const respuesta = await fetch(`${BASE_URL}/alimentos?buscar=${encodeURIComponent(nombre)}`);
  if (!respuesta.ok) return [];
  const datos = await respuesta.json();
  return datos.datos.map(alimentoAIngrediente);
}

export async function crearAlimentoPropio(
  nombre: string,
  nutrientes: Ingrediente["nutrientes"]
): Promise<Ingrediente | null> {
  const respuesta = await fetch(`${BASE_URL}/alimentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, ...nutrientes }),
  });
  if (!respuesta.ok) return null;
  const datos = await respuesta.json();
  return alimentoAIngrediente(datos.datos);
}