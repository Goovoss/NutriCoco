import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";


export function Registro() {
  const { login } = useUsuario();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleRegistro() {
  if (!nombre || !email || !password || !confirmar) {
    setError("Por favor rellena todos los campos");
    return;
  }
  if (password !== confirmar) {
    setError("Las contraseñas no coinciden");
    return;
  }
  if (password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres");
    return;
  }
  login({ nombre, email });
  navigate("/biometricos");
}

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-green-700 text-center">Crear cuenta</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Confirmar contraseña</label>
          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleRegistro}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Crear cuenta
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold hover:underline"
          >
            Inicia sesión
          </button>
        </p>

        <button
          onClick={() => navigate("/")}
          className="text-center text-sm text-gray-400 hover:text-gray-600"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}