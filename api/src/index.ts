import express from 'express';
import type { Request, Response } from 'express';
import { apiRouter } from './routes/api';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Mount unified API under /api
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
