# Mini‑Market (Fullstack)

Este repositorio contiene una solución completa para un mini‑market, con aplicaciones separadas para frontend y backend, y utilidades compartidas.

## Resumen de aplicaciones

### Frontend (`web`)
- Construido con Next.js, React y TailwindCSS
- Catálogo de productos con búsqueda, filtros, ordenamiento y paginación
- Vistas: Home (top productos económicos), listado de productos, detalle de producto
- Utiliza utilidades y tipos compartidos desde `/shared`
- Documentación e instrucciones en [`web/README.md`](./web/README.md)

### Backend (`api`)
- API REST con Express.js y TypeScript
- Endpoints para listado, detalle y top productos económicos
- Lógica modular: repositorio, servicio, mapeador, utilidades y rutas
- Utiliza utilidades y tipos compartidos desde `/shared`
- Documentación e instrucciones en [`api/README.md`](./api/README.md)

### Código compartido (`shared`)
- Tipos y utilidades reutilizables para ambos aplicativos
- Ejemplo: función `getTopCheapestAvailable` para obtener los productos más económicos

## Instalación y uso

Consulta los siguientes archivos para instrucciones detalladas:
- [Instalación y uso del backend](./api/README.md)
- [Instalación y uso del frontend](./web/README.md)

---

¿Dudas o problemas? Revisa los README internos y valida tu versión de Node/npm y la disponibilidad de puertos.
