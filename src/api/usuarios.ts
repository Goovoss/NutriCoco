const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";

interface RespuestaUsuario {
  exito: boolean;
  datos?: {
    id: string;
    nombre: string;
    email: string;
    token: string;
  };
  mensaje?: string;
}

export async function registrarUsuario(
  nombre: string,
  email: string,
  password: string
): Promise<RespuestaUsuario> {
  const respuesta = await fetch(`${BASE_URL}/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });
  return respuesta.json();
}

export async function loginUsuario(
  email: string,
  password: string
): Promise<RespuestaUsuario> {
  const respuesta = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return respuesta.json();
}