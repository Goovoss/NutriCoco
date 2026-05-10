# Capa de red — API Client

## Estructura
La capa de red está en `src/api/` y separa las llamadas
a cada fuente de datos en archivos independientes.

| Archivo | Responsabilidad |
|---------|----------------|
| `index.ts` | Combina resultados de todas las fuentes |
| `usda.ts` | Llamadas a USDA FoodData Central |
| `alimentosPropios.ts` | Llamadas al backend propio |
| `usuarios.ts` | Registro y login |
| `openFoodFacts.ts` | Llamadas a Open Food Facts (via backend) |

---

## Tipos de respuesta

Todas las respuestas del backend siguen el mismo contrato:

```typescript
interface RespuestaAPI<T> {
  exito: boolean;
  datos?: T;
  mensaje?: string;
}
```

---

## buscarIngredienteCombinado
Busca en paralelo en la BD propia y USDA usando `Promise.allSettled`.
Si una fuente falla, la otra sigue funcionando.

```typescript
const resultados = await Promise.allSettled([
  buscarAlimentosPropios(nombre),
  buscarIngredienteUSDA(nombre),
]);
```

---

## Gestión de estados de red
Cada llamada gestiona tres estados:

| Estado | Implementación |
|--------|---------------|
| Cargando | `useState(false)` → `setCargando(true)` |
| Éxito | Actualiza el estado con los datos recibidos |
| Error | Muestra mensaje con `useState<string | null>` |

---

## Traducción
Antes de llamar a USDA se traduce el término al inglés
usando la API gratuita de MyMemory.
Se mantiene un diccionario de correcciones para palabras
que se traducen mal (ej: "pan" → "bread").

---

## Variables de entorno
| Variable | Uso |
|----------|-----|
| `VITE_API_URL` | URL del backend en Render |
| `VITE_USDA_API_KEY` | API key de USDA FoodData Central |
| `VITE_USDA_API_URL` | URL base de USDA |