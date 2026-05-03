import type { DatosBiometricos } from "../context/UsuarioContext";
import type { Nutrientes } from "../types";

interface Umbrales {
  caloriasAmarillo: number;
  caloriasRojo: number;
  grasasAmarillo: number;
  grasasRojo: number;
  azucarAmarillo: number;
  azucarRojo: number;
  salAmarillo: number;
  salRojo: number;
}

export function calcularUmbrales(biometricos: DatosBiometricos | null): Umbrales {
  // Umbrales genéricos si no hay datos biométricos
  if (!biometricos) {
    return {
      caloriasAmarillo: 700, caloriasRojo: 1200,
      grasasAmarillo: 20, grasasRojo: 40,
      azucarAmarillo: 15, azucarRojo: 30,
      salAmarillo: 3, salRojo: 6,
    };
  }

  const { edad, sexo, peso, altura, actividad, objetivo } = biometricos;

  // Tasa metabólica basal (Harris-Benedict)
  const tmb = sexo === "hombre"
    ? 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * edad
    : 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * edad;

  // Factor de actividad
  const factorActividad = actividad === "sedentario" ? 1.2 : actividad === "moderado" ? 1.55 : 1.9;

  // Calorías diarias totales
  let caloriasDiarias = tmb * factorActividad;
  if (objetivo === "perder") caloriasDiarias -= 500;
  if (objetivo === "ganar") caloriasDiarias += 300;

  // Umbrales por plato (aprox 35% de las calorías diarias)
  const porPlato = caloriasDiarias * 0.35;

  // Sal máxima según edad (OMS)
  const salMax = edad > 60 ? 4 : edad > 40 ? 4.5 : 5;

  return {
    caloriasAmarillo: porPlato * 0.8,
    caloriasRojo: porPlato * 1.2,
    grasasAmarillo: sexo === "hombre" ? 22 : 18,
    grasasRojo: sexo === "hombre" ? 35 : 28,
    azucarAmarillo: 15,
    azucarRojo: 25,
    salAmarillo: salMax * 0.5,
    salRojo: salMax * 0.8,
  };
}

export function calcularSemaforo(
  totales: Nutrientes,
  biometricos: DatosBiometricos | null
): { color: string; texto: string } {
  if (totales.calorias === 0) return { color: "bg-gray-200", texto: "Sin datos" };

  const u = calcularUmbrales(biometricos);

  const esRojo =
    totales.calorias > u.caloriasRojo ||
    totales.grasas > u.grasasRojo ||
    totales.azucar > u.azucarRojo ||
    totales.sal > u.salRojo;

  const esAmarillo =
    totales.calorias > u.caloriasAmarillo ||
    totales.grasas > u.grasasAmarillo ||
    totales.azucar > u.azucarAmarillo ||
    totales.sal > u.salAmarillo;

  if (esRojo) return { color: "bg-red-400", texto: "Alto en nutrientes críticos 🔴" };
  if (esAmarillo) return { color: "bg-yellow-400", texto: "Moderado, con cuidado 🟡" };
  return { color: "bg-green-400", texto: "Saludable 🟢" };
}