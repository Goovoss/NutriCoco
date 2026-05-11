![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# 🥥 NutriCoco
> Analiza los nutrientes de tu plato al instante

NutriCoco es una aplicación web fullstack que permite analizar los macros y micronutrientes de cualquier plato. El usuario añade los ingredientes uno a uno y la app calcula el balance nutricional total con un semáforo personalizado según sus datos biométricos. Una mascota coco da consejos nutricionales adaptados al plato.

| Despliegue | URL |
|------------|-----|
| Frontend | [nutri-coco-bice.vercel.app](https://nutri-coco-bice.vercel.app) |
| Backend | [nutricoco-api.onrender.com](https://nutricoco-api.onrender.com) |
| Trello | [Tablero NutriCoco](https://trello.com/b/aZlCmU8w/nutricoco) |

---

## Características
- 🔍 Buscador de ingredientes con traducción automático español → inglés
- 🥗 Cálculo del balance nutricional total del plato
- 🚦 Semáforo de salud personalizado según edad, peso, actividad y objetivo
- 🥥 Mascota coco con consejos nutricionales inteligentes
- 👤 Registro y login real con JWT y contraseñas hasheadas
- 📋 Historial de platos consultados persistido en LocalStorage
- ➕ Añadir alimentos propios a la base de datos global
- 📊 Perfil de usuario con datos biométricos editables

---

## Tecnologías

| Frontend | Uso |
|----------|-----|
| React + TypeScript | Componentes tipados y estado |
| Tailwind CSS | Estilos y layout |
| React Router | Navegación entre páginas |
| Context API | Estado global (usuario, historial) |

| Backend | Uso |
|---------|-----|
| Node.js + Express | Servidor y API REST |
| PostgreSQL | Base de datos de usuarios y alimentos |
| bcrypt | Hasheo de contraseñas |
| JWT | Autenticación sin estado |

| APIs externas | Uso |
|--------------|-----|
| USDA FoodData Central | Base de datos nutricional |
| MyMemory | Traducción español → inglés |

---

## Estructura del proyecto

NutriCoco/
├── src/
│   ├── api/          # Clientes de API tipados
│   ├── components/   # Componentes reutilizables
│   ├── context/      # Context API (usuario, historial)
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Páginas de la aplicación
│   ├── types/        # Tipos e interfaces TypeScript
│   └── utils/        # Utilidades (nutrición, traducción)
├── server/
│   └── src/
│       ├── config/       # Configuración PostgreSQL
│       ├── controllers/  # Controladores HTTP
│       ├── routes/       # Rutas REST
│       └── services/     # Lógica de negocio
└── docs/             # Documentación completa

---

## Ejecutar en local

```bash
git clone https://github.com/Goovoss/NutriCoco.git
cd NutriCoco
npm install
npm run dev
```
Variables de entorno necesarias en `.env`:

VITE_API_URL=https://nutricoco-api.onrender.com
VITE_USDA_API_KEY=""
VITE_USDA_API_URL=https://api.nal.usda.gov/fdc/v1/foods/search

---

*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Kevin & Jostin — 2026*
