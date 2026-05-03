import { useState } from "react";
import { crearAlimentoPropio } from "../api/alimentosPropios";
import type { Ingrediente } from "../types";

interface Props {
  onAlimentoCreado: (ingrediente: Ingrediente) => void;
  onCancelar: () => void;
}

export function FormularioAlimento({ onAlimentoCreado, onCancelar }: Props) {
  const [nombre, setNombre] = useState("");
  const [calorias, setCalorias] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [grasas, setGrasas] = useState("");
  const [carbohidratos, setCarbohidratos] = useState("");
  const [fibra, setFibra] = useState("");
  const [azucar, setAzucar] = useState("");
  const [sal, setSal] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGuardar() {
    if (!nombre || !calorias) {
      setError("Nombre y calorías son obligatorios");
      return;
    }
    setCargando(true);
    const ingrediente = await crearAlimentoPropio(nombre, {
      calorias: Number(calorias),
      proteinas: Number(proteinas || 0),
      grasas: Number(grasas || 0),
      carbohidratos: Number(carbohidratos || 0),
      fibra: Number(fibra || 0),
      azucar: Number(azucar || 0),
      sal: Number(sal || 0),
    });
    setCargando(false);

    if (!ingrediente) {
      setError("Error al guardar. ¿Está el servidor corriendo?");
      return;
    }
    onAlimentoCreado(ingrediente);
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-gray-700">Añadir alimento propio</h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del alimento"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="grid grid-cols-2 gap-2">
        <input type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} placeholder="Calorías (kcal)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={proteinas} onChange={(e) => setProteinas(e.target.value)} placeholder="Proteínas (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={grasas} onChange={(e) => setGrasas(e.target.value)} placeholder="Grasas (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={carbohidratos} onChange={(e) => setCarbohidratos(e.target.value)} placeholder="Carbohidratos (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={fibra} onChange={(e) => setFibra(e.target.value)} placeholder="Fibra (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={azucar} onChange={(e) => setAzucar(e.target.value)} placeholder="Azúcar (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        <input type="number" value={sal} onChange={(e) => setSal(e.target.value)} placeholder="Sal (g)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 col-span-2" />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleGuardar}
          disabled={cargando}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
        >
          {cargando ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={onCancelar}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}