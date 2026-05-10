# Retrospectiva final

## Qué aprendí durante el proyecto

### Frontend
- Cómo estructurar una aplicación React con TypeScript de forma escalable
- El valor de los tipos estrictos — me salvó de varios bugs antes de llegar a producción
- Context API para gestionar estado global sin prop drilling
- Cómo usar genéricos en componentes React (DataTable<T>, RespuestaAPI<T>)
- Tailwind CSS para construir interfaces rápidamente sin salir del JSX

### Backend
- Arquitectura por capas en Express (rutas, controladores, servicios)
- Autenticación real con JWT y bcrypt para hashear contraseñas
- PostgreSQL con el cliente pg — queries parametrizadas para evitar SQL injection
- Cómo conectar frontend y backend en producción con variables de entorno

### Integración
- CORS — aprendí por las malas que las APIs externas no siempre permiten
  llamadas desde el navegador y hay que proxearlas por el backend
- Variables de entorno VITE_ — tienen que estar en Vercel antes de redesplegar
- Render duerme el servidor gratuito — hay que tenerlo en cuenta en producción

---

## Principales problemas encontrados

### CORS con Open Food Facts
Open Food Facts bloqueaba las llamadas desde el navegador en producción.
La solución fue hacer las llamadas desde el backend en lugar del frontend.
Finalmente se eliminó Open Food Facts y se dejó solo USDA por ser más fiable.

### Variables de entorno no llegaban al build
Las variables VITE_ estaban en Vercel pero el build antiguo seguía en caché.
La solución fue forzar un redespliegue limpio desde la CLI de Vercel.

### Historial con instancias duplicadas
El hook useHistorial creaba dos instancias separadas en App y en Historial.
La solución fue mover el historial al contexto global para compartir el estado.

### server/ no se subía a GitHub
La carpeta server/ tenía su propio .git y Git la trataba como submódulo.
La solución fue eliminar el .git de server/ y volver a añadirla al repositorio.

---

## Cómo utilicé la IA durante el desarrollo
Usé Claude como asistente de desarrollo durante todo el proyecto.
Me ayudó a estructurar la arquitectura, depurar errores y generar código base
que luego adapté y personalicé según las necesidades del proyecto.

Lo más valioso fue usarla para entender los errores de TypeScript y de despliegue
— me explicaba el problema y las opciones para resolverlo en lugar de
darme simplemente el código correcto.

---

## Reflexión final
NutriCoco empezó como una idea simple para ayudar a mi novia a saber
qué tan saludable es lo que come. Acabó siendo una aplicación fullstack
con autenticación real, base de datos propia, dos APIs externas y
una mascota coco que da consejos nutricionales personalizados.

El mayor aprendizaje fue que los problemas reales de desarrollo
(CORS, variables de entorno, submódulos de Git) no aparecen en los tutoriales
pero son los que más te enseñan cuando los tienes que resolver.