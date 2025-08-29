import { ProductDTO } from '../domain/product';
import { ProductMapper } from '../mappers/productMapper';
import { ProductRepository } from '../repositories/productRepository';

export interface ProductService {
  list(): Promise<ProductDTO[]>;
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
}
