import { Router } from 'express';
import { Product } from '../models/Product';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// util: make slug from name
function slugify(input: string) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// GET /api/products (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query as { category?: string };
    const filter = category ? { category } : {};
    const products = await Product.find(filter).limit(50).lean();
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

// POST /api/products (create new product - admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const body = { ...req.body } as any;

    // Map alias fields to schema
    if (body.fabric) body.fabricDetails = body.fabric;
    if (body.care) body.careInstructions = body.care;

    // Ensure slug exists
    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    }

    const product = new Product(body);
    await product.save();
    res.status(201).json({ ok: true, data: product });
  } catch (err: any) {
    console.error('Create product error:', err);
    const message = err?.message || 'Bad Request';
    res.status(400).json({ ok: false, error: message });
  }
});

// PUT /api/products/:id (update product - admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const body = { ...req.body } as any;

    // Map alias fields
    if (body.fabric) body.fabricDetails = body.fabric;
    if (body.care) body.careInstructions = body.care;

    // If no slug provided but name changed/provided, derive it
    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ ok: false, error: 'Not Found' });
    res.json({ ok: true, data: product });
  } catch (err: any) {
    console.error('Update product error:', err);
    const message = err?.message || 'Bad Request';
    res.status(400).json({ ok: false, error: message });
  }
});

// DELETE /api/products/:id (delete product - admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ ok: false, error: 'Not Found' });
    res.json({ ok: true, message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

export default router;
