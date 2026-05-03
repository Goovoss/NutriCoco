import { useState, useEffect } from "react";
import type { Ingrediente } from "../types";

export interface EntradaHistorial {
  id: string;
  fecha: string;
  ingredientes: Ingrediente[];
  totalCalorias: number;
}

const CLAVE = "nutricoco_historial";

export function useHistorial() {
  const [historial, setHistorial] = useState<EntradaHistorial[]>(() => {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(historial));
  }, [historial]);

  function guardarPlato(ingredientes: Ingrediente[]) {
    const totalCalorias = ingredientes.reduce(
      (acc, ing) => acc + ing.nutrientes.calorias,
      0
    );

    const entrada: EntradaHistorial = {
      id: crypto.randomUUID(),
      fecha: new Date().toLocaleString("es-ES"),
      ingredientes,
      totalCalorias,
    };

    setHistorial((prev) => [entrada, ...prev].slice(0, 20));
  }

  function eliminarEntrada(id: string) {
    setHistorial((prev) => prev.filter((e) => e.id !== id));
  }

  function limpiarHistorial() {
    setHistorial([]);
  }

  return { historial, guardarPlato, eliminarEntrada, limpiarHistorial };
}