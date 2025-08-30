// Test unitario para paginación de productos
/**
 * Este archivo prueba la función applyPagination, que permite:
 * - Dividir productos en páginas
 * - Calcular el total de páginas y el índice actual
 */
import { applyPagination } from '../../products/utils/pagination';

describe('applyPagination', () => {
  const products = Array.from({ length: 25 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Producto ${i + 1}`,
    price: i + 1,
    isAvailable: true,
    category: 'test',
    image: ''
  }));

  it('devuelve 10 elementos en la primera página', () => {
    const { items, pageInfo } = applyPagination(products, 1, 10);
    expect(items).toHaveLength(10);
    expect(pageInfo.page).toBe(1);
    expect(pageInfo.pages).toBe(3);
  });

  it('devuelve los elementos correctos en la segunda página', () => {
    const { items } = applyPagination(products, 2, 10);
    expect(items[0].id).toBe('p11');
    expect(items).toHaveLength(10);
  });

  it('devuelve los elementos restantes en la última página', () => {
    const { items, pageInfo } = applyPagination(products, 3, 10);
    expect(items).toHaveLength(5);
    expect(pageInfo.page).toBe(3);
  });
});
