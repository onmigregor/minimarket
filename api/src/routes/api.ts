import { Router, type Request, type Response } from 'express';
import { makeProductsRouter } from '../products/routes';
import { DefaultProductMapper } from '../products/mappers/productMapper';
import { FileProductRepository } from '../products/repositories/productRepository';
import { DefaultProductService } from '../products/services/productService';

export const apiRouter = Router();

// GET /api -> basic API info/health
apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'mini-market-api', version: '0.1.2' });
});

// Mount products under /api/products
const repo = new FileProductRepository();
const mapper = new DefaultProductMapper();
const service = new DefaultProductService(repo, mapper);
apiRouter.use('/products', makeProductsRouter(service));
