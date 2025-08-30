;
/**
 * Este archivo prueba la función applyFilters, que permite:
 * - Filtrar productos por disponibilidad
 * - Filtrar productos por búsqueda en el nombre
 */
import { applyFilters } from '../../products/utils/filters';

describe('applyFilters', () => {
  const products = [
    { id: 'p1', name: 'Manzana', price: 1, isAvailable: true, category: 'fruta', image: '' },
    { id: 'p2', name: 'Banana', price: 2, isAvailable: false, category: 'fruta', image: '' },
    { id: 'p3', name: 'Mango', price: 3, isAvailable: true, category: 'fruta', image: '' }
  ];

  it('filtra solo productos disponibles', () => {
    const result = applyFilters(products, { available: true });
    expect(result.every(p => p.isAvailable)).toBe(true);
  });

  it('filtra por búsqueda en nombre', () => {
    const result = applyFilters(products, { search: 'man' });
    const simplified = result.map(p => ({ name: p.name, isAvailable: p.isAvailable }));
    expect(simplified).toEqual([
      { name: 'Manzana', isAvailable: true },
      { name: 'Mango', isAvailable: true }
    ]);
  });
});
