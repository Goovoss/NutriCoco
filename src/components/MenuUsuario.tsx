import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

export function MenuUsuario() {
  const { usuario, logout } = useUsuario();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  if (!usuario) return null;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setAbierto(!abierto)}
        className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-xl transition-colors"
      >
        <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-green-700">{usuario.nombre}</span>
        <span className="text-green-600 text-xs">{abierto ? "▲" : "▼"}</span>
      </button>

      {abierto && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">{usuario.nombre}</p>
            <p className="text-xs text-gray-400">{usuario.email}</p>
          </div>

          <button
            onClick={() => { setAbierto(false); navigate("/perfil"); }}
            className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-green-50 flex items-center gap-2"
          >
            👤 Mi perfil
          </button>

          <button
            onClick={() => { setAbierto(false); navigate("/historial"); }}
            className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-green-50 flex items-center gap-2"
          >
            📋 Historial de platos
          </button>

          <button
            onClick={() => { setAbierto(false); navigate("/ajustes"); }}
            className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-green-50 flex items-center gap-2"
          >
            ⚙️ Ajustes
          </button>

          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}