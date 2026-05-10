# Arquitectura de NutriCoco

## Estructura de componentes principales
- `App.tsx` — página principal con buscador, tarjetas y balance
- `BuscadorIngrediente` — busca en BD propia y USDA
- `TarjetaIngrediente` — muestra macros de cada ingrediente con opción de eliminar
- `ResumenNutricional` — calcula y muestra el balance total con semáforo
- `CocoConsejo` — mascota que da consejos nutricionales personalizados
- `MenuUsuario` — desplegable con opciones del usuario autenticado
- `FormularioAlimento` — formulario para añadir alimentos manualmente a la BD

## Componentes reutilizables
- `TarjetaIngrediente` — usable con cualquier tipo de ingrediente
- `CocoConsejo` — recibe datos calculados y genera consejos dinámicos
- `FormularioAlimento` — reutilizable desde el buscador cuando no hay resultados

## Gestión del estado
- Estado local (`useState`) para ingredientes activos y visibilidad del balance
- Context API (`UsuarioContext`) para usuario, biométricos e historial
- LocalStorage para persistir el historial entre sesiones

## Flujo de datos
Usuario busca → API combinada (BD propia + USDA)
→ Selecciona ingrediente → Estado local
→ Genera balance → ResumenNutricional + CocoConsejo
→ Guarda en historial → LocalStorage

## Backend — Arquitectura por capas
routes/      → Define los endpoints REST
controllers/ → Maneja las peticiones HTTP
services/    → Lógica de negocio y acceso a BD
config/      → Configuración de PostgreSQL

## Decisiones de arquitectura

### ¿Por qué Context y no Redux?
La app no tiene suficiente complejidad de estado como para justificar Redux.
Context API es suficiente para compartir usuario, biométricos e historial.

### PostgreSQL  
Los datos de usuarios y alimentos son relacionales y tienen estructura fija.
PostgreSQL es más adecuado para datos estructurados.

### ¿Por qué USDA como API principal?
Open Food Facts tiene problemas de CORS en producción y datos inconsistentes.
USDA tiene datos más fiables para alimentos básicos sin procesar.

### ¿Por qué JWT?
Permite autenticación stateless — el servidor no necesita guardar sesiones.
El token se guarda en LocalStorage y se envía en cada petición.