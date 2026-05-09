import { useState } from "react";
import { BuscadorIngrediente } from "./components/BuscadorIngrediente";
import { TarjetaIngrediente } from "./components/TarjetaIngrediente";
import { ResumenNutricional } from "./components/ResumenNutricional";
import { CocoConsejo } from "./components/CocoConsejo";
import { MenuUsuario } from "./components/MenuUsuario";
import { useUsuario } from "./context/UsuarioContext";
import type { Ingrediente } from "./types";

function App() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [mostrarBalance, setMostrarBalance] = useState(false);
  const { guardarPlato } = useUsuario();

  function agregarIngrediente(ingrediente: Ingrediente) {
    setIngredientes((prev) => [...prev, ingrediente]);
    setMostrarBalance(false);
  }

  function eliminarIngrediente(id: string) {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
    setMostrarBalance(false);
  }

  function handleGenerarBalance() {
    guardarPlato(ingredientes);
    setMostrarBalance(true);
  }

 return (
  <div className="min-h-screen bg-green-50">
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-green-700">NutriCoco 🥥</h1>
        <p className="text-sm text-gray-400">Analiza los nutrientes de tu plato</p>
      </div>
      <MenuUsuario />
    </header>

    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className={`flex gap-6 items-start ${mostrarBalance ? "flex-row" : "flex-col max-w-2xl mx-auto"}`}>
        
        {/* Columna izquierda: Coco */}
        {mostrarBalance && ingredientes.length > 0 && (
          <div className="w-64 flex-shrink-0">
            <CocoConsejo
              totales={ingredientes.reduce(
                (acc, ing) => ({
                  calorias: acc.calorias + ing.nutrientes.calorias,
                  proteinas: acc.proteinas + ing.nutrientes.proteinas,
                  grasas: acc.grasas + ing.nutrientes.grasas,
                  carbohidratos: acc.carbohidratos + ing.nutrientes.carbohidratos,
                  fibra: acc.fibra + ing.nutrientes.fibra,
                  azucar: acc.azucar + ing.nutrientes.azucar,
                  sal: acc.sal + ing.nutrientes.sal,
                }),
                { calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, azucar: 0, sal: 0 }
              )}
              numIngredientes={ingredientes.length}
              biometricos={null}
            />
          </div>
        )}

        {/* Columna derecha: contenido principal */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Añadir ingrediente
            </h2>
            <BuscadorIngrediente onAgregarIngrediente={agregarIngrediente} />
          </div>

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

              <button
                onClick={handleGenerarBalance}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Generar balance total 🥗
              </button>
            </>
          )}

          {mostrarBalance && ingredientes.length > 0 && (
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">
                Balance nutricional total
              </h2>
              <ResumenNutricional ingredientes={ingredientes} />
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
);
}

export default App;