import { ProductDTO } from '../domain/product';
import { ProductMapper } from '../mappers/productMapper';
import { ProductRepository } from '../repositories/productRepository';
import type { ListProductsQuery, ListProductsResult } from '../contracts/listing';
import { applyFilters } from '../utils/filters';
import { applySorting } from '../utils/sort';
import { applyPagination } from '../utils/pagination';

export interface ProductService {
  list(query?: ListProductsQuery): Promise<ListProductsResult>;
  getById(id: string): Promise<ProductDTO | undefined>;
}

export class DefaultProductService implements ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly mapper: ProductMapper
  ) {}

  async list(query: ListProductsQuery = {}): Promise<ListProductsResult> {
    const raws = await this.repo.getAll();
  const mapped = raws.map(r => this.mapper.toDTO(r));
  const filtered = applyFilters(mapped, query);
  const sorted = applySorting(filtered, query);
  const { items, pageInfo } = applyPagination(sorted, query.page, query.limit);
  return { items, pageInfo };
  }

  async getById(id: string): Promise<ProductDTO | undefined> {
    const str = String(id).trim();
    if (!/^p\d+$/i.test(str)) return undefined;
    const numericId = Number(str.slice(1));
    const raw = await this.repo.getById(numericId);
    return raw ? this.mapper.toDTO(raw) : undefined;
  }
}
