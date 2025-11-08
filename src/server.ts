import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectMongo } from './db/mongo';
import productsRouter from './routes/products';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

// API routes
app.use('/api/products', productsRouter);

// Root
app.get('/', (_req, res) => {
  res.send('Unique T-shirts Backend API');
});

const PORT = Number(process.env.PORT) || 8080;

(async () => {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT}`);
  });
})();
