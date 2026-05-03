# Context API

## UsuarioContext
Contexto principal de la aplicación. Gestiona:
- Usuario logueado (nombre, email)
- Datos biométricos (edad, sexo, peso, altura, actividad, objetivo)
- Historial de platos consultados

## Por qué Context y no props
Sin Context, habría que pasar el usuario y el historial por props
a través de 3-4 niveles de componentes. Context lo hace disponible
en cualquier componente sin prop drilling.

## Persistencia
El historial se guarda en LocalStorage automáticamente con useEffect.
Los datos de sesión (usuario, biométricos) se pierden al recargar
hasta que conectemos con el backend de autenticación.