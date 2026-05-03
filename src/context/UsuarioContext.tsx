import { createContext, useContext, useState, useEffect } from "react";
import type { Ingrediente } from "../types";

export interface DatosBiometricos {
  edad: number;
  sexo: "hombre" | "mujer";
  peso: number;
  altura: number;
  actividad: "sedentario" | "moderado" | "activo";
  objetivo: "perder" | "mantener" | "ganar";
}

export interface Usuario {
  nombre: string;
  email: string;
  biometricos?: DatosBiometricos;
}

export interface EntradaHistorial {
  id: string;
  fecha: string;
  ingredientes: Ingrediente[];
  totalCalorias: number;
}

interface UsuarioContextType {
  usuario: Usuario | null;
  biometricos: DatosBiometricos | null;
  historial: EntradaHistorial[];
  login: (usuario: Usuario) => void;
  logout: () => void;
  guardarBiometricos: (datos: DatosBiometricos) => void;
  guardarPlato: (ingredientes: Ingrediente[]) => void;
  eliminarEntrada: (id: string) => void;
  limpiarHistorial: () => void;
}

const UsuarioContext = createContext<UsuarioContextType | null>(null);

const CLAVE = "nutricoco_historial";

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [biometricos, setBiometricos] = useState<DatosBiometricos | null>(null);
  const [historial, setHistorial] = useState<EntradaHistorial[]>(() => {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(historial));
  }, [historial]);

  function login(usuario: Usuario) {
    setUsuario(usuario);
    if (usuario.biometricos) setBiometricos(usuario.biometricos);
  }

  function logout() {
    setUsuario(null);
    setBiometricos(null);
  }

  function guardarBiometricos(datos: DatosBiometricos) {
    setBiometricos(datos);
    if (usuario) setUsuario({ ...usuario, biometricos: datos });
  }

  function guardarPlato(ingredientes: Ingrediente[]) {
    const totalCalorias = ingredientes.reduce(
      (acc, ing) => acc + ing.nutrientes.calorias, 0
    );
    const entrada: EntradaHistorial = {
      id: crypto.randomUUID(),
      fecha: new Date().toLocaleString("es-ES"),
      ingredientes,
      totalCalorias,
    };
    setHistorial((prev) => [entrada, ...prev].slice(0, 20));
  }

  function eliminarEntrada(id: string) {
    setHistorial((prev) => prev.filter((e) => e.id !== id));
  }

  function limpiarHistorial() {
    setHistorial([]);
  }

  return (
    <UsuarioContext.Provider value={{
      usuario, biometricos, historial,
      login, logout, guardarBiometricos,
      guardarPlato, eliminarEntrada, limpiarHistorial
    }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return context;
}