# Testing y pruebas manuales

## Pruebas realizadas

### Autenticación
| Prueba | Resultado |
|--------|-----------|
| Registro con email nuevo | ✅ Crea cuenta y redirige a biométricos |
| Registro con email existente | ✅ Muestra error "El email ya está registrado" |
| Login con credenciales correctas | ✅ Entra y muestra menú de usuario |
| Login con contraseña incorrecta | ✅ Muestra error "Contraseña incorrecta" |
| Login con email no registrado | ✅ Muestra error "No existe ninguna cuenta con ese email" |
| Cerrar sesión | ✅ Limpia el estado y redirige al inicio |

### Buscador
| Prueba | Resultado |
|--------|-----------|
| Buscar alimento existente en USDA | ✅ Devuelve resultados traducidos |
| Buscar alimento inexistente | ✅ Muestra "No se encontraron resultados" |
| Buscar con Enter | ✅ Funciona igual que el botón |
| Añadir ingrediente | ✅ Aparece tarjeta y mensaje de éxito |
| Eliminar ingrediente | ✅ Desaparece la tarjeta |

### Balance nutricional
| Prueba | Resultado |
|--------|-----------|
| Generar balance con 1 ingrediente | ✅ Semáforo + consejo del coco |
| Generar balance con varios ingredientes | ✅ Suma correcta de nutrientes |
| Semáforo verde | ✅ Plato equilibrado |
| Semáforo amarillo | ✅ Plato moderado |
| Semáforo rojo | ✅ Plato alto en nutrientes críticos |
| Consejos del coco | ✅ Se adaptan al plato |

### Alimentos propios
| Prueba | Resultado |
|--------|-----------|
| Añadir alimento manualmente | ✅ Se guarda en PostgreSQL |
| Buscar alimento añadido | ✅ Aparece en resultados |
| Alimento disponible para todos | ✅ Global en la BD |

### Historial
| Prueba | Resultado |
|--------|-----------|
| Guardar plato al generar balance | ✅ Aparece en historial |
| Eliminar entrada del historial | ✅ Desaparece |
| Limpiar historial | ✅ Vacía todo |
| Persistencia tras recargar | ✅ Se mantiene en LocalStorage |

### Navegación
| Prueba | Resultado |
|--------|-----------|
| Ruta inexistente | ✅ Muestra página 404 |
| Volver desde perfil | ✅ Navega correctamente |
| Volver desde historial | ✅ Navega correctamente |

### Responsive
| Prueba | Resultado |
|--------|-----------|
| Móvil (375px) | ✅ Layout adaptado |
| Tablet (768px) | ✅ Layout correcto |
| Desktop (1280px) | ✅ Layout correcto |