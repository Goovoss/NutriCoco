# API de NutriCoco

## Base URL
`https://nutricoco-api.onrender.com/api/v1`

## Endpoints

### Health
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Estado del servidor |

**Respuesta:**
```json
{
  "estado": "OK",
  "mensaje": "NutriCoco API funcionando 🥥"
}
```

### Usuarios
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/usuarios/registro` | Crear cuenta nueva |
| POST | `/usuarios/login` | Iniciar sesión |

**POST /usuarios/registro — Body:**
```json
{
  "nombre": "Ana García",
  "email": "ana@email.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "datos": {
    "id": "uuid",
    "nombre": "Ana García",
    "email": "ana@email.com",
    "token": "jwt_token"
  }
}
```

### Alimentos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/alimentos` | Obtener todos los alimentos |
| GET | `/alimentos?buscar=nombre` | Buscar alimentos por nombre |
| POST | `/alimentos` | Crear alimento propio |
| DELETE | `/alimentos/:id` | Eliminar alimento |

**POST /alimentos — Body:**
```json
{
  "nombre": "Manzana",
  "calorias": 52,
  "proteinas": 0.3,
  "grasas": 0.2,
  "carbohidratos": 14,
  "fibra": 2.4,
  "azucar": 10,
  "sal": 0
}
```

## Códigos HTTP
| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Creado correctamente |
| 400 | Datos incorrectos |
| 401 | No autorizado |
| 404 | No encontrado |
| 500 | Error del servidor |