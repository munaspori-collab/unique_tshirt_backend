import { Router } from 'express';
import { User } from '../models/User';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/wishlist - Get user's wishlist
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user!.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    res.json({ ok: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// POST /api/wishlist/:productId - Add product to wishlist
router.post('/:productId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user!.userId);

    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    // Check if already in wishlist
    if (user.wishlist.includes(productId as any)) {
      return res.status(400).json({ ok: false, error: 'Product already in wishlist' });
    }

    user.wishlist.push(productId as any);
    await user.save();

    res.json({ ok: true, message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// DELETE /api/wishlist/:productId - Remove product from wishlist
router.delete('/:productId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user!.userId);

    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.json({ ok: true, message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

export default router;
