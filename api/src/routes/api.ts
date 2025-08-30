import { Router, type Request, type Response } from 'express';
import { makeProductsRouter } from '../products/routes';
import { DefaultProductMapper } from '../products/mappers/productMapper';
import { FileProductRepository } from '../products/repositories/productRepository';
import { DefaultProductService } from '../products/services/productService';
import { getTopCheapestAvailable } from '../../../shared/utils';

export const apiRouter = Router();

// Endpoint global para los productos más económicos disponibles
apiRouter.get('/top-cheapest', async (_req: Request, res: Response) => {
  try {
    const repo = new FileProductRepository();
    const mapper = new DefaultProductMapper();
    const service = new DefaultProductService(repo, mapper);
    const result = await service.list({ available: true });
    const products = result.items || [];
    const topProducts = getTopCheapestAvailable(products, 5);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load top cheapest products' });
  }
});

// GET /api -> basic API info/health
apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'mini-market-api', version: '0.1.2' });
});

// Mount products under /api/products
const repo = new FileProductRepository();
const mapper = new DefaultProductMapper();
const service = new DefaultProductService(repo, mapper);
apiRouter.use('/products', makeProductsRouter(service));
