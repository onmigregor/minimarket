import { ProductDTO } from '../domain/product';
import { ProductMapper } from '../mappers/productMapper';
import { ProductRepository } from '../repositories/productRepository';

export interface ProductService {
  list(): Promise<ProductDTO[]>;
  getById(id: string): Promise<ProductDTO | undefined>;
}

export class DefaultProductService implements ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly mapper: ProductMapper
  ) {}

  async list(): Promise<ProductDTO[]> {
    const raws = await this.repo.getAll();
    return raws.map(r => this.mapper.toDTO(r));
  }

  async getById(id: string): Promise<ProductDTO | undefined> {
    const str = String(id).trim();
    if (!/^p\d+$/i.test(str)) return undefined;
    const numericId = Number(str.slice(1));
    const raw = await this.repo.getById(numericId);
    return raw ? this.mapper.toDTO(raw) : undefined;
  }
}
