# Formularios e interacción

## Login
Formulario controlado con email y contraseña.
Llama al backend real y gestiona los estados de carga y error.

**Validaciones:**
- Email y contraseña obligatorios
- Mensaje de error si las credenciales son incorrectas
- Botón desactivado mientras carga

---

## Registro
Formulario controlado con nombre, email, contraseña y confirmación.

**Validaciones:**
- Todos los campos obligatorios
- Las contraseñas deben coincidir
- Mínimo 6 caracteres en la contraseña
- El backend verifica que el email no esté ya registrado

---

## Biométricos
Formulario para personalizar el análisis nutricional.

**Campos:**
- Edad (número)
- Sexo (botones hombre/mujer)
- Peso en kg (número)
- Altura en cm (número)
- Nivel de actividad (select)
- Objetivo (select)

**Validaciones:**
- Edad, peso y altura obligatorios
- Para invitados hay un botón "Saltar por ahora"

---

## Buscador de ingredientes
Input controlado con búsqueda en tiempo real.
Soporta búsqueda con Enter o con el botón Buscar.

**Estados:**
- Cargando → muestra "..."
- Sin resultados → mensaje de error + opción de añadir manualmente
- Con resultados → lista desplegable para seleccionar

---

## FormularioAlimento
Formulario para añadir alimentos propios a la base de datos.
Los alimentos quedan disponibles para todos los usuarios.

**Campos:**
- Nombre (obligatorio)
- Calorías (obligatorio)
- Proteínas, grasas, carbohidratos, fibra, azúcar, sal (opcionales)

**Estados:**
- Guardando → botón desactivado
- Error → mensaje si el servidor no responde
- Éxito → añade el ingrediente directamente al plato