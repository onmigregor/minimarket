import { Router, type Request, type Response } from 'express';
import type { ProductService } from './services/productService';
import type { ListProductsQuery } from './contracts/listing';

export const makeProductsRouter = (service: ProductService) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const q = parseListQuery(req.query);
  const result = await service.list(q);
  res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load products' });
    }
  });

  router.get('/:id(p\\d+)', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await service.getById(id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load product' });
    }
  });

  return router;
};

function parseListQuery(query: Request['query']): ListProductsQuery {
  const search = typeof query.search === 'string' ? query.search : undefined;
  const sortRaw = typeof query.sort === 'string' ? query.sort.toLowerCase() : undefined;
  const sort = sortRaw === 'price' ? 'price' : sortRaw === 'name' ? 'name' : undefined;
  const orderRaw = typeof query.order === 'string' ? query.order.toLowerCase() : undefined;
  const order = orderRaw === 'desc' ? 'desc' : orderRaw === 'asc' ? 'asc' : undefined;
  const page = typeof query.page === 'string' ? Number(query.page) : undefined;
  const limit = typeof query.limit === 'string' ? Number(query.limit) : undefined;
  const available = typeof query.available === 'string'
    ? query.available.toLowerCase() === 'true'
      ? true
      : query.available.toLowerCase() === 'false'
        ? false
        : undefined
    : undefined;

  return { search, sort, order, page, limit, available };
}
