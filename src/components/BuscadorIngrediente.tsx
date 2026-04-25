import { useState } from "react";
import { buscarIngredienteCombinado } from "../api/index";
import type { Ingrediente } from "../types";

interface Props {
  onAgregarIngrediente: (ingrediente: Ingrediente) => void;
}

export function BuscadorIngrediente({ onAgregarIngrediente }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Ingrediente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuscar() {
    if (!busqueda.trim()) return;
    setCargando(true);
    setError(null);
    try {
      const datos = await buscarIngredienteCombinado(busqueda);
      setResultados(datos);
      if (datos.length === 0) setError("No se encontraron resultados");
    } catch {
      setError("Error al buscar. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  function handleSeleccionar(ingrediente: Ingrediente) {
    onAgregarIngrediente(ingrediente);
    setBusqueda("");
    setResultados([]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
          placeholder="Buscar ingrediente (ej: aguacate)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleBuscar}
          disabled={cargando}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {cargando ? "..." : "Buscar"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {resultados.length > 0 && (
        <ul className="border border-gray-200 rounded-lg divide-y">
          {resultados.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => handleSeleccionar(r)}
                className="w-full text-left px-4 py-3 hover:bg-green-50 text-sm"
              >
                {r.nombre}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}