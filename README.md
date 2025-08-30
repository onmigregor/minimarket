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

## Estado de Cumplimiento y Pendientes

### Cumplido
- Estructura modular para frontend (Next.js) y backend (Express).
- Compartición de utilidades y tipos entre frontend y backend.
- Implementación y documentación de tests unitarios e integración en el backend.
- Organización y comentarios en los archivos de test.
- Documentación actualizada en cada módulo y en la raíz.

### Pendiente / Sugerido
- Ampliar cobertura de tests en el frontend (unitarios y de integración).
- Mejorar la documentación de los tests en el frontend.
- Agregar ejemplos de uso de utilidades compartidas en el frontend.

> El proyecto está listo para escalar en cobertura de pruebas y documentación según se requiera.


¿Dudas o problemas? Revisa los README internos y valida tu versión de Node/npm y la disponibilidad de puertos.
