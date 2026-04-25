import { useState } from "react";
import { BuscadorIngrediente } from "./components/BuscadorIngrediente";
import { TarjetaIngrediente } from "./components/TarjetaIngrediente";
import { ResumenNutricional } from "./components/ResumenNutricional";
import type { Ingrediente } from "./types";

function App() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [mostrarBalance, setMostrarBalance] = useState(false);

  function agregarIngrediente(ingrediente: Ingrediente) {
    setIngredientes((prev) => [...prev, ingrediente]);
    setMostrarBalance(false);
  }

  function eliminarIngrediente(id: string) {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
    setMostrarBalance(false);
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-2xl font-bold text-green-700">NutriCoco 🥥</h1>
        <p className="text-sm text-gray-400">Analiza los nutrientes de tu plato</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Buscador */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Añadir ingrediente
          </h2>
          <BuscadorIngrediente onAgregarIngrediente={agregarIngrediente} />
        </div>

        {/* Tarjetas de ingredientes */}
        {ingredientes.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 -mb-3">
              Ingredientes añadidos ({ingredientes.length})
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {ingredientes.map((ing) => (
                <TarjetaIngrediente
                  key={ing.id}
                  ingrediente={ing}
                  onEliminar={eliminarIngrediente}
                />
              ))}
            </div>

            {/* Botón generar balance */}
            <button
              onClick={() => setMostrarBalance(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Generar balance total 🥗
            </button>
          </>
        )}

        {/* Balance total */}
        {mostrarBalance && ingredientes.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Balance nutricional total
            </h2>
            <ResumenNutricional ingredientes={ingredientes} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;