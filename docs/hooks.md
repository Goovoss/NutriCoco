# Hooks

## useState
Usado en múltiples componentes para gestionar estado local.

**En App.tsx:**
- `ingredientes` — lista de ingredientes añadidos al plato actual
- `mostrarBalance` — controla si se muestra el balance nutricional

**En BuscadorIngrediente.tsx:**
- `busqueda` — texto del input
- `resultados` — lista de ingredientes encontrados
- `cargando` — estado de la petición
- `error` — mensaje de error si falla la búsqueda
- `exito` — mensaje de confirmación al añadir

**En Login.tsx y Registro.tsx:**
- `email`, `password`, `nombre` — campos del formulario
- `error` — mensaje de error de validación
- `cargando` — estado de la petición al backend

---

## useEffect
Usado en `UsuarioContext.tsx` para sincronizar el historial con LocalStorage
cada vez que cambia el estado:

```typescript
useEffect(() => {
  localStorage.setItem("nutricoco_historial", JSON.stringify(historial));
}, [historial]);
```

---

## useContext
Usado a través del hook personalizado `useUsuario` para acceder
al contexto de usuario desde cualquier componente.

---

## Custom hook: useHistorial (deprecado)
Inicialmente el historial estaba en un hook personalizado `useHistorial`.
Se migró al contexto `UsuarioContext` para evitar instancias duplicadas
y garantizar que todos los componentes comparten el mismo estado.

**Lección aprendida:** cuando el estado necesita compartirse entre
componentes no relacionados, es mejor usar Context que un hook local.