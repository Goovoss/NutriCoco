import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "nutricoco_secret_key";

export interface UsuarioDB {
  id: string;
  nombre: string;
  email: string;
  password: string;
  creado_en: string;
}

export async function registrarUsuario(nombre: string, email: string, password: string) {
  // Verificar si el email ya existe
  const existe = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
  if (existe.rows.length > 0) {
    throw new Error("El email ya está registrado");
  }

  // Hashear la contraseña
  const passwordHash = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();
  const creado_en = new Date().toISOString();

  await pool.query(
    "INSERT INTO usuarios (id, nombre, email, password, creado_en) VALUES ($1, $2, $3, $4, $5)",
    [id, nombre, email, passwordHash, creado_en]
  );

  const token = jwt.sign({ id, nombre, email }, JWT_SECRET, { expiresIn: "7d" });
  return { id, nombre, email, token };
}

export async function loginUsuario(email: string, password: string) {
  const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  const usuario = resultado.rows[0] as UsuarioDB | undefined;

  if (!usuario) throw new Error("Email o contraseña incorrectos");

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) throw new Error("Email o contraseña incorrectos");

  const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, token };
}