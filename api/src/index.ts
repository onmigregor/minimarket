
import express from 'express';
import type { Request, Response } from 'express';
import { apiRouter } from './routes/api';
import cors from 'cors';


const app = express();
const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CORS_ORIGIN }));


// Mount unified API under /api
app.use('/api', apiRouter);


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

export default app;
