# Componentes

## BuscadorIngrediente
Busca ingredientes combinando la BD propia y USDA.
Muestra resultados en una lista desplegable y feedback visual al añadir.
Si no hay resultados, ofrece añadir el alimento manualmente.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| onAgregarIngrediente | (ingrediente: Ingrediente) => void | Callback al seleccionar |

---

## TarjetaIngrediente
Muestra los macros de un ingrediente en una tarjeta visual con colores.
Incluye botón de eliminar en la esquina superior derecha.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| ingrediente | Ingrediente | Datos del ingrediente |
| onEliminar | (id: string) => void | Callback al eliminar |

---

## ResumenNutricional
Calcula el total de nutrientes de todos los ingredientes.
Muestra el semáforo personalizado según los datos biométricos del usuario.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| ingredientes | Ingrediente[] | Lista de ingredientes del plato |

---

## CocoConsejo
Mascota coco animada que analiza el plato y genera consejos nutricionales.
Los consejos se adaptan al número de ingredientes, los macros y el objetivo del usuario.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| totales | Nutrientes | Totales calculados del plato |
| numIngredientes | number | Número de ingredientes |
| biometricos | DatosBiometricos o null | Datos del usuario |

---

## MenuUsuario
Desplegable en el header con opciones del usuario autenticado.
Solo aparece si hay un usuario logueado. Incluye perfil, historial y cerrar sesión.

---

## FormularioAlimento
Formulario para añadir alimentos manualmente a la base de datos propia.
Los alimentos añadidos quedan disponibles para todos los usuarios.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| onAlimentoCreado | (ingrediente: Ingrediente) => void | Callback al guardar |
| onCancelar | () => void | Callback al cancelar |