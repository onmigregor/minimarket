# Mini‑Market API (Backend)

## Resumen del proyecto

API REST construida con Express.js y TypeScript para un mini‑market. Sigue una estructura modular (SOLID): repositorio (datos), servicio (negocio), mapeador (DTO), utilidades (filtros, orden y paginación) y rutas. Los productos se sirven desde un JSON local y exponen listados con filtros avanzados y detalle por id.

- Stack: Node.js + Express + TypeScript (strict) con ts-node-dev para desarrollo.
- Punto de entrada: `api/src/index.ts` (monta todo bajo `/api`).
- Puerto por defecto: `3001` (configurable con `PORT`).

## Requisitos de sistema
## Configuración de CORS

El backend valida el origen de las peticiones (CORS) usando la variable `CORS_ORIGIN` definida en el archivo `.env` o `.env.local`. Esto permite controlar desde qué dominio (por ejemplo, el frontend en desarrollo) se aceptan solicitudes.

Ejemplo de configuración en `.env.local`:
```
CORS_ORIGIN=http://localhost:3000
```

Modifica este valor según el dominio desde el que se harán las peticiones al backend.
- Node.js 18 o superior (LTS recomendado).
- npm 9 o superior.
- Sistema operativo: Windows, macOS o Linux. En Windows se usa PowerShell.
- Puerto 3001 libre (o define `PORT`).
- Git (opcional, para gestión de ramas/commits).

## Cómo levantar el proyecto (desarrollo)


**Importante:** Antes de iniciar, copia el archivo `.env.local` como `.env` y modifícalo según tu entorno si es necesario.

```powershell
# 1) Instalar dependencias
cd api
npm install

# 2) Levantar en modo desarrollo (hot reload)
npm run dev

# Opcional: producir build y ejecutar
npm run build
npm start
```

- La API quedará disponible en: `http://localhost:3001/api` (o el puerto definido).

## Rutas disponibles

Base: `http://localhost:<PUERTO>/api`

- GET `/api/`  → Información/health de la API.

- GET `/api/top-cheapest` → Devuelve los productos más económicos disponibles (top 5).
  - Utiliza el utilitario compartido `getTopCheapestAvailable` desde `/shared/utils.ts`.
  - Respuesta: `[ProductDTO, ...]` (máximo 5 productos disponibles, ordenados por precio ascendente).


- GET `/api/products` → Lista de productos con filtros, orden y paginación.
  - Query params:
    - `search`: texto a buscar en el nombre.
    - `sort`: `name` | `price` (por defecto `name`).
    - `order`: `asc` | `desc` (por defecto `asc`).
    - `page`: número de página (>= 1, por defecto `1`).
    - `limit`: tamaño de página (>= 1, por defecto `10`).
    - `available`: `true` | `false` (filtra por disponibilidad).
  - Respuesta: `{ items: ProductDTO[], pageInfo: { page, limit, total, pages } }`.

- GET `/api/products/:id` → Detalle por id (formato `p<number>`, ej. `p10`).

### Ejemplos

Listado paginado y ordenado:  
  `/api/products?search=shirt&sort=price&order=desc&page=2&limit=12&available=true`

Detalle:  
  `/api/products/p10`

Top 5 más económicos disponibles:
  `/api/top-cheapest`


## Estructura (breve)

```
api/
  src/
    index.ts
    routes/api.ts
    products/
      domain/       # Tipos de dominio
      contracts/    # Tipos de entrada/salida (listing)
      repositories/ # Acceso a datos (JSON)
      services/     # Lógica de negocio
      mappers/      # Domain -> DTO
      utils/        # filtros, sort, paginación
```

## Utilidades compartidas

- El backend importa utilidades y tipos desde `/shared` para lógica común entre frontend y backend.
- Ejemplo de uso en rutas:
  ```ts
  import { getTopCheapestAvailable } from '../../../shared/utils';
  // ...
  const topProducts = getTopCheapestAvailable(products, 5);
  ```

Notas:
- Puedes cambiar el puerto con `PORT`. Ej.: `PORT=4000 npm run dev`.
- Si falla `npm run dev`, valida tu versión de Node/npm y que el puerto esté libre.