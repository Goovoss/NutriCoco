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
  if (!biometricos) {
    return {
      caloriasAmarillo: 900,
      caloriasRojo: 1500,
      grasasAmarillo: 35,
      grasasRojo: 60,
      azucarAmarillo: 25,
      azucarRojo: 45,
      salAmarillo: 4,
      salRojo: 8,
    };
  }

  const { edad, sexo, peso, altura, actividad, objetivo } = biometricos;

  const tmb = sexo === "hombre"
    ? 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * edad
    : 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * edad;

  const factorActividad = actividad === "sedentario" ? 1.2 : actividad === "moderado" ? 1.55 : 1.9;

  let caloriasDiarias = tmb * factorActividad;
  if (objetivo === "perder") caloriasDiarias -= 500;
  if (objetivo === "ganar") caloriasDiarias += 300;

  const porPlato = caloriasDiarias * 0.40;
  const salMax = edad > 60 ? 4 : edad > 40 ? 5 : 6;

  return {
    caloriasAmarillo: porPlato * 0.9,
    caloriasRojo: porPlato * 1.4,
    grasasAmarillo: sexo === "hombre" ? 30 : 25,
    grasasRojo: sexo === "hombre" ? 55 : 45,
    azucarAmarillo: 20,
    azucarRojo: 40,
    salAmarillo: salMax * 0.6,
    salRojo: salMax * 0.9,
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