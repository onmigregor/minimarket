import { ProductDTO } from '../domain/product';
import { ListProductsQuery } from '../contracts/listing';

export function applySorting(items: ProductDTO[], query: ListProductsQuery): ProductDTO[] {
  const sortBy = query.sort ?? 'name';
  const order = query.order ?? 'asc';
  const dir = order === 'desc' ? -1 : 1;
  return [...items].sort((a, b) => {
    if (sortBy === 'price') return (a.price - b.price) * dir;
    return a.name.localeCompare(b.name) * dir;
  });
}
