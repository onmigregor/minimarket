# Mini‑Market API (Backend)

## Resumen del proyecto

API REST construida con Express.js y TypeScript para un mini‑market. Sigue una estructura modular (SOLID): repositorio (datos), servicio (negocio), mapeador (DTO), utilidades (filtros, orden y paginación) y rutas. Los productos se sirven desde un JSON local y exponen listados con filtros avanzados y detalle por id.

- Stack: Node.js + Express + TypeScript (strict) con ts-node-dev para desarrollo.
- Punto de entrada: `api/src/index.ts` (monta todo bajo `/api`).
- Puerto por defecto: `3001` (configurable con `PORT`).

## Requisitos de sistema

- Node.js 18 o superior (LTS recomendado).
- npm 9 o superior.
- Sistema operativo: Windows, macOS o Linux. En Windows se usa PowerShell.
- Puerto 3001 libre (o define `PORT`).
- Git (opcional, para gestión de ramas/commits).

## Cómo levantar el proyecto (desarrollo)

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

- Listado paginado y ordenado:  
  `/api/products?search=shirt&sort=price&order=desc&page=2&limit=12&available=true`

- Detalle:  
  `/api/products/p10`

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

Notas:
- Puedes cambiar el puerto con `PORT`. Ej.: `PORT=4000 npm run dev`.
- Si falla `npm run dev`, valida tu versión de Node/npm y que el puerto esté libre.