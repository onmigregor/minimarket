import { Router, type Request, type Response } from 'express';
import type { ProductService } from './services/productService';

export const makeProductsRouter = (service: ProductService) => {
  const router = Router();

  router.get('/', async (_req: Request, res: Response) => {
    try {
      const items = await service.list();
      res.json(items);
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
