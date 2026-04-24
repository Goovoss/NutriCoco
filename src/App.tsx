import { useState } from "react";
import { BuscadorIngrediente } from "./components/BuscadorIngrediente";
import { ResumenNutricional } from "./components/ResumenNutricional";
import type { Ingrediente } from "./types";

function App() {
  const [nombrePlato, setNombrePlato] = useState("");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);

  function agregarIngrediente(ingrediente: Ingrediente) {
    setIngredientes((prev) => [...prev, ingrediente]);
  }

  function eliminarIngrediente(id: string) {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-2xl font-bold text-green-700">NutriCoco 🥥</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Nombre del plato */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Nombre del plato
          </label>
          <input
            type="text"
            value={nombrePlato}
            onChange={(e) => setNombrePlato(e.target.value)}
            placeholder="Ej: Mi Sandwich"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Buscador */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Añadir ingrediente
          </h2>
          <BuscadorIngrediente onAgregarIngrediente={agregarIngrediente} />
        </div>

        {/* Lista de ingredientes */}
        {ingredientes.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Ingredientes ({ingredientes.length})
            </h2>
            <ul className="flex flex-col gap-2">
              {ingredientes.map((ing) => (
                <li
                  key={ing.id}
                  className="flex justify-between items-center bg-green-50 rounded-lg px-4 py-2"
                >
                  <span className="text-sm">{ing.nombre}</span>
                  <button
                    onClick={() => eliminarIngrediente(ing.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-semibold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resumen nutricional */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Resumen nutricional
          </h2>
          <ResumenNutricional ingredientes={ingredientes} />
        </div>
      </main>
    </div>
  );
}

export default App;