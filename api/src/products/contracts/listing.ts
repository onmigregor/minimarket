import { ProductDTO } from '../domain/product';

export interface ListProductsQuery {
  search?: string;
  sort?: 'name' | 'price';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  available?: boolean;
}

export interface PageInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ListProductsResult {
  items: ProductDTO[];
  pageInfo: PageInfo;
}
