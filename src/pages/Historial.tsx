import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

export function Historial() {
  const navigate = useNavigate();
  const { historial, eliminarEntrada, limpiarHistorial } = useUsuario();

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">Historial 📋</h1>
        <div className="flex gap-2">
          {historial.length > 0 && (
            <button
              onClick={limpiarHistorial}
              className="text-sm text-red-400 hover:text-red-600 font-medium"
            >
              Limpiar todo
            </button>
          )}
          <button
            onClick={() => navigate("/app")}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            ← Volver
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
        {historial.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-400 text-lg mb-2">No hay platos guardados</p>
            <p className="text-gray-300 text-sm">
              Cuando generes un balance, aparecerá aquí
            </p>
          </div>
        ) : (
          historial.map((entrada) => (
            <div key={entrada.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-400">{entrada.fecha}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {entrada.ingredientes.length} ingredientes
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-sm">
                    {entrada.totalCalorias.toFixed(0)} kcal
                  </span>
                  <button
                    onClick={() => eliminarEntrada(entrada.id)}
                    className="text-gray-300 hover:text-red-400 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {entrada.ingredientes.map((ing) => (
                  <span
                    key={ing.id}
                    className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full"
                  >
                    {ing.nombre}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}