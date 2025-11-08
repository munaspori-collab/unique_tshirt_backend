import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectMongo } from './db/mongo';
import productsRouter from './routes/products';
import seedRouter from './routes/seed';
import authRouter from './routes/auth';
import uploadRouter from './routes/upload';

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
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/seed', seedRouter);
app.use('/api/upload', uploadRouter);

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
