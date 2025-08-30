
# Mini‑Market Web (Frontend)

## 1. Requisitos de sistema

- Node.js 18 o superior (LTS recomendado)
- npm 9 o superior
- Sistema operativo: Windows, macOS o Linux
- Puerto 3000 libre (o configurable con `PORT`)
- Git (opcional, para gestión de ramas/commits)

## 2. Cómo levantar el proyecto

```powershell
# 1) Instalar dependencias
cd web
npm install

# 2) Levantar el servidor de desarrollo
npm run dev
```

- La app estará disponible en: `http://localhost:3000`

## 3. Rutas

- `/` — Página principal: muestra los 3 productos más económicos disponibles y un botón para ver todos los productos
- `/products` — Listado de productos: buscador, filtro por disponibilidad, ordenamiento, paginación y enlace para regresar al inicio
- `/products/:id` — Detalle de producto: muestra información, precio, disponibilidad y enlace para regresar al inicio

## 4. Resumen de vistas

### Inicio
- Muestra los 3 productos más económicos usando el utilitario compartido
- Botón para ir al catálogo completo

### Productos
- Buscador con debounce
- Filtro por disponibilidad
- Orden por nombre o precio
- Paginación
- Grid de tarjetas de producto
- Enlace para regresar al inicio

### Detalle de producto
- Muestra imagen, nombre, precio y disponibilidad
- Botón para agregar a favoritos (solo UI)
- Enlace para regresar al inicio

## 5. Funciones y utilidades

- Utiliza el utilitario compartido `getTopCheapestAvailable` de `/shared/utils.ts` tanto en frontend como backend
- Componentes modulares: CardComponent, ListGridComponent, FilterComponent, PaginationComponent, LoadingSpinner
- Buscador con debounce, spinner de carga y manejo de errores

## Notas de interés

- El frontend está construido con Next.js (App Router), React y TailwindCSS
- El código compartido (`/shared`) se usa para tipos y utilidades entre frontend y backend
- Navegación amigable, con enlaces claros entre las vistas principales
- Si tienes problemas, revisa la versión de Node/npm y la disponibilidad del puerto
