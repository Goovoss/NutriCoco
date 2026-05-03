# Arquitectura de NutriCoco

## Estructura de componentes
- `App.tsx` — página principal con buscador y balance
- `BuscadorIngrediente` — busca en tres fuentes: BD propia, USDA y Open Food Facts
- `TarjetaIngrediente` — muestra macros de cada ingrediente
- `ResumenNutricional` — calcula y muestra el balance total
- `MenuUsuario` — desplegable con opciones del usuario
- `FormularioAlimento` — añadir alimentos manualmente a la BD

## Gestión de estado
- Estado local (`useState`) para ingredientes y UI
- Context API (`UsuarioContext`) para usuario, biométricos e historial
- LocalStorage para persistir el historial entre sesiones

## Flujo de datos
Buscador → API combinada (BD propia + USDA + Open Food Facts) → Tarjetas → Balance total → Historial

## Backend
Express con SQLite. Arquitectura por capas:
- `routes/` → define los endpoints
- `controllers/` → maneja las peticiones
- `services/` → lógica de negocio y acceso a BD

## Endpoints
- `GET /api/v1/alimentos?buscar=nombre` → buscar alimentos
- `POST /api/v1/alimentos` → crear alimento
- `DELETE /api/v1/alimentos/:id` → eliminar alimento
- `GET /api/v1/health` → estado del servidor