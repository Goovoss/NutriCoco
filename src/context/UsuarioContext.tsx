import { createContext, useContext, useState } from "react";

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

interface UsuarioContextType {
  usuario: Usuario | null;
  biometricos: DatosBiometricos | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
  guardarBiometricos: (datos: DatosBiometricos) => void;
}

const UsuarioContext = createContext<UsuarioContextType | null>(null);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [biometricos, setBiometricos] = useState<DatosBiometricos | null>(null);

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

  return (
    <UsuarioContext.Provider value={{ usuario, biometricos, login, logout, guardarBiometricos }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return context;
}