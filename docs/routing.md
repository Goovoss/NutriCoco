# Rutas y navegación

## Configuración
Las rutas están configuradas con React Router en `src/main.tsx`
usando `BrowserRouter`, `Routes` y `Route`.

## Estructura de rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Bienvenida | Pantalla inicial con opciones de acceso |
| `/login` | Login | Iniciar sesión con email y contraseña |
| `/registro` | Registro | Crear cuenta nueva |
| `/biometricos` | Biometricos | Datos físicos tras registro |
| `/biometricos-invitado` | Biometricos | Datos opcionales para invitado |
| `/app` | App | Aplicación principal |
| `/perfil` | Perfil | Perfil del usuario con datos y biométricos |
| `/historial` | Historial | Historial de platos consultados |
| `*` | NotFound | Página 404 para rutas no encontradas |

## Flujo de navegación

### Invitado
/ → /biometricos-invitado (opcional) → /app

### Registro
/ → /registro → /biometricos → /app

### Login
/ → /login → /app

## Navegación programática
Se usa el hook `useNavigate` de React Router para redirigir
al usuario después de acciones como login, registro o logout.

## Página 404
Cualquier ruta no definida redirige al componente `NotFound`
que muestra un mensaje y un botón para volver al inicio.