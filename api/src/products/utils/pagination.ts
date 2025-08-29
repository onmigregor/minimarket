import { ProductDTO } from '../domain/product';
import type { PageInfo } from '../contracts/listing';

export function applyPagination(items: ProductDTO[], page?: number, limit?: number): { items: ProductDTO[]; pageInfo: PageInfo } {
  const p = Math.max(1, Math.trunc(page ?? 1));
  const l = Math.max(1, Math.trunc(limit ?? 10));
  const total = items.length;
  const pages = l > 0 ? Math.ceil(total / l) : 0;
  const start = (p - 1) * l;
  const end = start + l;
  return { items: items.slice(start, end), pageInfo: { page: p, limit: l, total, pages } };
}
