import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function inicializarDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      creado_en TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS alimentos (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      calorias REAL NOT NULL,
      proteinas REAL NOT NULL,
      grasas REAL NOT NULL,
      carbohidratos REAL NOT NULL,
      fibra REAL NOT NULL,
      azucar REAL NOT NULL,
      sal REAL NOT NULL,
      creado_por TEXT NOT NULL,
      creado_en TEXT NOT NULL
    );
  `);
}

export default pool;