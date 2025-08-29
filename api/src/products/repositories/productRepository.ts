import fs from 'node:fs/promises';
import path from 'node:path';
import { ProductRaw } from '../domain/product';

export interface ProductRepository {
  getAll(): Promise<ProductRaw[]>;
}

export class FileProductRepository implements ProductRepository {
  private cache: ProductRaw[] | null = null;
  private readonly filePath: string;

  constructor(filePath?: string) {
    // Default path: src/data/products.json (works in ts-node-dev)
    const defaultPath = path.join(process.cwd(), 'src', 'data', 'products.json');
    this.filePath = filePath ?? defaultPath;
  }

  async getAll(): Promise<ProductRaw[]> {
    if (this.cache) return this.cache;
    const buf = await fs.readFile(this.filePath, 'utf-8');
    const data = JSON.parse(buf) as unknown;
    if (!Array.isArray(data)) {
      throw new Error('products.json must contain an array');
    }
    this.cache = data as ProductRaw[];
    return this.cache;
  }
}
