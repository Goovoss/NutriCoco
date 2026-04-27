import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import type { DatosBiometricos } from "../context/UsuarioContext";

interface Props {
  opcional?: boolean; // true = invitado puede saltárselo
}

export function Biometricos({ opcional = false }: Props) {
  const navigate = useNavigate();
  const { guardarBiometricos } = useUsuario();

  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState<"hombre" | "mujer">("hombre");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [actividad, setActividad] = useState<"sedentario" | "moderado" | "activo">("moderado");
  const [objetivo, setObjetivo] = useState<"perder" | "mantener" | "ganar">("mantener");
  const [error, setError] = useState<string | null>(null);

  function handleGuardar() {
    if (!edad || !peso || !altura) {
      setError("Por favor rellena todos los campos");
      return;
    }

    const datos: DatosBiometricos = {
      edad: Number(edad),
      sexo,
      peso: Number(peso),
      altura: Number(altura),
      actividad,
      objetivo,
    };

    guardarBiometricos(datos);
    navigate("/app");
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-4">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-green-700">Tus datos 📊</h2>
          <p className="text-sm text-gray-400 mt-1">
            Personalizamos el análisis nutricional según tu perfil
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ej: 28"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Sexo</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSexo("hombre")}
              className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-colors ${
                sexo === "hombre"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Hombre
            </button>
            <button
              onClick={() => setSexo("mujer")}
              className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-colors ${
                sexo === "mujer"
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Mujer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Peso (kg)</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ej: 70"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Altura (cm)</label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ej: 175"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
      </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Nivel de actividad</label>
          <select
            value={actividad}
            onChange={(e) => setActividad(e.target.value as "sedentario" | "moderado" | "activo")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="sedentario">Sedentario (poco o nada de ejercicio)</option>
            <option value="moderado">Moderado (ejercicio 3-5 días/semana)</option>
            <option value="activo">Activo (ejercicio intenso 6-7 días/semana)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Objetivo</label>
          <select
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value as "perder" | "mantener" | "ganar")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="perder">Perder peso</option>
            <option value="mantener">Mantener peso</option>
            <option value="ganar">Ganar músculo</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleGuardar}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Guardar y continuar
        </button>

        {opcional && (
          <button
            onClick={() => navigate("/app")}
            className="text-center text-sm text-gray-400 hover:text-gray-600"
          >
            Saltar por ahora
          </button>
        )}
      </div>
    </div>
  );
}