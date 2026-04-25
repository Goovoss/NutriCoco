import { createContext, useContext, useState } from "react";

interface Usuario {
  nombre: string;
  email: string;
}

interface UsuarioContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const UsuarioContext = createContext<UsuarioContextType | null>(null);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function login(usuario: Usuario) {
    setUsuario(usuario);
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return context;
}