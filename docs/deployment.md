# Despliegue

## Frontend — Vercel

### URL de producción
https://nutri-coco-bice.vercel.app

### Proceso
1. Conectar repositorio de GitHub a Vercel
2. Vercel detecta automáticamente que es un proyecto Vite
3. Build command: `tsc -b && vite build`
4. Output directory: `dist`

### Variables de entorno en Vercel
| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL del backend en Render |
| `VITE_USDA_API_KEY` | API key de USDA FoodData Central |
| `VITE_USDA_API_URL` | URL base de USDA |

### Redespliegue
Cada push a `main` redespliega automáticamente el frontend.

---

## Backend — Render

### URL de producción
https://nutricoco-api.onrender.com

### Proceso
1. Conectar repositorio de GitHub a Render
2. Crear Web Service con Root Directory vacío
3. Build command: `cd server && npm install --include=dev && ./node_modules/.bin/tsc`
4. Start command: `cd server && node dist/index.js`

### Variables de entorno en Render
| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |

---

## Base de datos — Render PostgreSQL

### Proceso
1. Crear nuevo PostgreSQL en Render
2. Plan gratuito
3. Copiar External Database URL
4. Añadirla como variable de entorno `DATABASE_URL` en el Web Service

### Tablas
Las tablas se crean automáticamente al arrancar el servidor
mediante la función `inicializarDB()` en `server/src/config/database.ts`.

---

## Notas importantes
- El plan gratuito de Render duerme el servidor tras 15 minutos de inactividad
- La primera petición después del sueño puede tardar 30-60 segundos
- Las variables de entorno `VITE_*` deben estar en Vercel antes de redesplegar