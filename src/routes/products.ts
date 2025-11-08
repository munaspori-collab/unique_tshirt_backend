import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

// GET /api/products
router.get('/', async (_req, res) => {
  try {
    const products = await Product.find().limit(50).lean();
    res.json({ ok: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug }).lean();
    if (!p) return res.status(404).json({ ok: false, error: 'Not Found' });
    res.json({ ok: true, data: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

export default router;
