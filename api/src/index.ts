import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'mini-market-api', version: '0.1.0' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
