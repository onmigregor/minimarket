import { ProductDTO, ProductRaw } from '../domain/product';

export interface ProductMapper {
  toDTO(raw: ProductRaw): ProductDTO;
}

export class DefaultProductMapper implements ProductMapper {
  toDTO(raw: ProductRaw): ProductDTO {
    const id = `p${raw.id}`;
    const name = raw.title?.trim() ?? '';
    const price = Number(raw.price ?? 0);
    const isAvailable = typeof raw.isAvailable === 'boolean' ? raw.isAvailable : false;
    const category = raw.category;
    const image = raw.imageUrl ?? '';
    return { id, name, price, isAvailable, category, image };
  }
}
