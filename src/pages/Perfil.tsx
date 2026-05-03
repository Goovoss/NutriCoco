import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

export function Perfil() {
  const navigate = useNavigate();
  const { usuario, biometricos, logout } = useUsuario();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">Mi perfil 👤</h1>
        <button
          onClick={() => navigate("/app")}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          ← Volver
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
        {/* Datos de cuenta */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">Cuenta</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {usuario?.nombre.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-700">{usuario?.nombre ?? "Invitado"}</p>
              <p className="text-sm text-gray-400">{usuario?.email ?? "Sin cuenta"}</p>
            </div>
          </div>
        </div>

        {/* Datos biométricos */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-500">Datos biométricos</h2>
            <button
              onClick={() => navigate("/biometricos")}
              className="text-xs text-green-600 hover:text-green-700 font-semibold"
            >
              {biometricos ? "Editar" : "Añadir"}
            </button>
          </div>

          {biometricos ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Edad</p>
                <p className="font-semibold text-gray-700">{biometricos.edad} años</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Sexo</p>
                <p className="font-semibold text-gray-700 capitalize">{biometricos.sexo}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Peso</p>
                <p className="font-semibold text-gray-700">{biometricos.peso} kg</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Altura</p>
                <p className="font-semibold text-gray-700">{biometricos.altura} cm</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Actividad</p>
                <p className="font-semibold text-gray-700 capitalize">{biometricos.actividad}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Objetivo</p>
                <p className="font-semibold text-gray-700 capitalize">{biometricos.objetivo} peso</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">
              Sin datos biométricos — el análisis usa valores genéricos
            </p>
          )}
        </div>

        {/* Acciones */}
        {usuario && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-3 rounded-xl transition-colors"
          >
            Cerrar sesión 🚪
          </button>
        )}
      </main>
    </div>
  );
}