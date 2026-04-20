# NutriCoco 🥥

## El problema
Muchas personas no saben qué tan saludable es el plato que están a punto de comer.
Buscar cada ingrediente por separado en Google es lento y nada visual.
NutriCoco resuelve esto: añades todos los ingredientes de tu plato y al instante
ves el total combinado de macros y micronutrientes.

## Usuario objetivo
Personas que quieren llevar una alimentación más consciente sin complicarse.
No hace falta ser nutricionista ni tener conocimientos avanzados de nutrición.

## Flujo principal
1. El usuario crea un plato (ej. "Mi Sandwich")
2. Añade ingredientes uno a uno por nombre
3. La app busca cada ingrediente en Open Food Facts
4. Calcula y muestra el total combinado de nutrientes del plato completo

## Funcionalidades principales
- Crear un plato con nombre personalizado
- Buscador de ingredientes por nombre
- Añadir/eliminar ingredientes del plato
- Resumen total de macros (calorías, proteínas, grasas, carbos)
- Resumen de micronutrientes destacados (fibra, sal, azúcar)
- Semáforo visual de salud del plato completo
- Historial de platos consultados (LocalStorage)

## Funcionalidades opcionales
- Especificar cantidad exacta por ingrediente (gramos o unidades)
- Comparar dos platos lado a lado
- Marcar platos como favoritos

## Mejoras futuras
- Escáner de código de barras
- Modo diario: registrar todos los platos del día
- Recomendaciones personalizadas según objetivo

## API
Open Food Facts — gratuita, sin API key, millones de productos.
https://world.openfoodfacts.org/