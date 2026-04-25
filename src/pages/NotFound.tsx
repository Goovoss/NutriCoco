import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-8xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-gray-500 text-lg mb-8">Esta página no existe</p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );
}