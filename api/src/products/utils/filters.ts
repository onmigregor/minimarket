import { ProductDTO } from '../domain/product';
import { ListProductsQuery } from '../contracts/listing';

export function applyFilters(items: ProductDTO[], query: ListProductsQuery): ProductDTO[] {
  let out = items;
  if (typeof query.available === 'boolean') {
    out = out.filter(p => p.isAvailable === query.available);
  }
  if (query.search && query.search.trim() !== '') {
    const term = query.search.trim().toLowerCase();
    out = out.filter(p => p.name.toLowerCase().includes(term));
  }
  return out;
}
