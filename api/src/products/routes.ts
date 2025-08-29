import { Router, type Request, type Response } from 'express';
import { DefaultProductMapper } from './mappers/productMapper';
import { FileProductRepository } from './repositories/productRepository';
import { DefaultProductService } from './services/productService';

const repo = new FileProductRepository();
const mapper = new DefaultProductMapper();
const service = new DefaultProductService(repo, mapper);

export const productsRouter = Router();

productsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const items = await service.list();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
});
