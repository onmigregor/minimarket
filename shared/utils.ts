// Utilidades para productos - Clean Code y SOLID
import type { Product } from './types';

/**
 * Obtiene los productos más baratos disponibles en stock.
 * @param products - Array de productos
 * @param top - Cantidad de productos a devolver (default: 3)
 * @returns Array de productos más baratos disponibles
 */
export function getTopCheapestAvailable(products: Product[], top: number = 3): Product[] {
  if (!Array.isArray(products) || products.length === 0) return [];

  // Filtrar productos disponibles
  const availableProducts = products.filter(p => Boolean(p.isAvailable));
  if (availableProducts.length === 0) return [];

  // Ordenar por precio ascendente
  const sorted = [...availableProducts].sort((a, b) => a.price - b.price);

  // Retornar los N más baratos
  return sorted.slice(0, Math.max(0, top));
}

// Ejemplo de tipado Product (ajusta según tu modelo real)
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   isAvailable: boolean;
//   ...otrosCampos
// }
