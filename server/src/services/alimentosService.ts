import pool from "../config/database.js";

export interface Alimento {
  id: string;
  nombre: string;
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  fibra: number;
  azucar: number;
  sal: number;
  creado_por: string;
  creado_en: string;
}

export async function obtenerAlimentos(): Promise<Alimento[]> {
  const resultado = await pool.query("SELECT * FROM alimentos ORDER BY creado_en DESC");
  return resultado.rows;
}

export async function buscarAlimentos(nombre: string): Promise<Alimento[]> {
  const resultado = await pool.query(
    "SELECT * FROM alimentos WHERE LOWER(nombre) LIKE LOWER($1)",
    [`%${nombre}%`]
  );
  return resultado.rows;
}

export async function crearAlimento(alimento: Omit<Alimento, "creado_en">): Promise<Alimento> {
  const creado_en = new Date().toISOString();
  await pool.query(
    `INSERT INTO alimentos (id, nombre, calorias, proteinas, grasas, carbohidratos, fibra, azucar, sal, creado_por, creado_en)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      alimento.id,
      alimento.nombre,
      alimento.calorias,
      alimento.proteinas,
      alimento.grasas,
      alimento.carbohidratos,
      alimento.fibra,
      alimento.azucar,
      alimento.sal,
      alimento.creado_por,
      creado_en,
    ]
  );
  return { ...alimento, creado_en };
}

export async function eliminarAlimento(id: string): Promise<boolean> {
  const resultado = await pool.query("DELETE FROM alimentos WHERE id = $1", [id]);
  return (resultado.rowCount ?? 0) > 0;
}