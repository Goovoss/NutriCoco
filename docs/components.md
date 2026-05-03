# Componentes

## BuscadorIngrediente
Busca ingredientes combinando tres fuentes de datos.
Props: `onAgregarIngrediente: (ingrediente: Ingrediente) => void`

## TarjetaIngrediente
Muestra los macros de un ingrediente con botón de eliminar.
Props: `ingrediente: Ingrediente`, `onEliminar: (id: string) => void`

## ResumenNutricional
Calcula el total de nutrientes y muestra el semáforo personalizado.
Props: `ingredientes: Ingrediente[]`
Usa los datos biométricos del contexto para personalizar el semáforo.

## MenuUsuario
Desplegable con perfil, historial y cerrar sesión.
Solo aparece si hay un usuario logueado.

## FormularioAlimento
Formulario para añadir alimentos manualmente a la base de datos propia.
Props: `onAlimentoCreado`, `onCancelar`