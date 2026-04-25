import { useNavigate } from "react-router-dom";

export function Bienvenida() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-green-700 mb-2">NutriCoco 🥥</h1>
        <p className="text-gray-500 text-lg">Analizador de nutrientes</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-4">
        <button
          onClick={() => navigate("/app")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Entrar como invitado
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-xl transition-colors"
        >
          Iniciar sesión
        </button>

        <button
          onClick={() => navigate("/registro")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
        >
          Darse de alta
        </button>
      </div>
    </div>
  );
}