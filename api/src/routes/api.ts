import { Router, type Request, type Response } from 'express';
import { productsRouter } from '../products/routes';

export const apiRouter = Router();

// GET /api -> basic API info/health
apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'mini-market-api', version: '0.1.2' });
});

// Mount products under /api/products
apiRouter.use('/products', productsRouter);
