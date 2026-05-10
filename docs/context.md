# Context API

## UsuarioContext
Contexto principal de la aplicación. Gestiona todo el estado global:

### Estado
| Campo | Tipo | Descripción |
|-------|------|-------------|
| usuario | Usuario o null | Usuario autenticado |
| biometricos | DatosBiometricos o null | Datos físicos del usuario |
| historial | EntradaHistorial[] | Historial de platos consultados |

### Métodos
| Método | Descripción |
|--------|-------------|
| login(usuario) | Guarda el usuario en el contexto |
| logout() | Limpia el usuario y los biométricos |
| guardarBiometricos(datos) | Guarda los datos físicos del usuario |
| guardarPlato(ingredientes) | Añade un plato al historial |
| eliminarEntrada(id) | Elimina una entrada del historial |
| limpiarHistorial() | Vacía el historial completo |

## ¿Por qué Context y no props?
Sin Context habría que pasar el usuario, los biométricos y el historial
por props a través de 3-4 niveles de componentes (prop drilling).
Context lo hace disponible en cualquier componente sin intermediarios.

## Persistencia
El historial se sincroniza con LocalStorage automáticamente mediante useEffect.
Los datos de sesión (usuario, biométricos) se pierden al recargar la página
hasta que el usuario vuelva a iniciar sesión.

## Cuándo usar Context
Context es útil cuando:
- Varios componentes no relacionados necesitan el mismo estado
- Pasar props se vuelve tedioso por la profundidad del árbol
- El estado es global para toda la aplicación

No es necesario para estado local de un componente o entre padre e hijo directo.