# Hooks

## useHistorial (deprecado → movido al contexto)
El historial se gestiona ahora en `UsuarioContext` para compartirlo
entre todos los componentes sin instancias duplicadas.

## useState
Usado en App.tsx para gestionar la lista de ingredientes activos
y la visibilidad del balance.

## useEffect
Usado en UsuarioContext para sincronizar el historial con LocalStorage
cada vez que cambia.