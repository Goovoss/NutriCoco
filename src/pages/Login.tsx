import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import { loginUsuario } from "../api/usuarios";

export function Login() {
  const navigate = useNavigate();
  const { login } = useUsuario();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError("Por favor rellena todos los campos");
      return;
    }
    setCargando(true);
    setError(null);
    try {
      const respuesta = await loginUsuario(email, password);
      if (!respuesta.exito || !respuesta.datos) {
        setError(respuesta.mensaje ?? "Error al iniciar sesión");
        return;
      }
      login({ nombre: respuesta.datos.nombre, email: respuesta.datos.email });
      localStorage.setItem("nutricoco_token", respuesta.datos.token);
      navigate("/app");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-green-700 text-center">Iniciar sesión</h2>

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
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={cargando}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {cargando ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/registro")}
            className="text-green-600 font-semibold hover:underline"
          >
            Regístrate
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