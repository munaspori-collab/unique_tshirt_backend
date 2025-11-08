import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// POST /api/auth/google - Sign in with Google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ ok: false, error: 'Google token required' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ ok: false, error: 'Invalid Google token' });
    }

    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        email,
        name: name || email.split('@')[0],
        googleId,
        image: picture,
        role: email === ADMIN_EMAIL ? 'admin' : 'user',
      });
      await user.save();
    } else if (!user.googleId) {
      // Update existing user with Google ID
      user.googleId = googleId;
      user.image = picture;
      await user.save();
    }

    // Generate JWT
    const jwtToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.json({
      ok: true,
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ ok: false, error: 'Authentication failed' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user!.userId).select('-googleId');
    if (!user) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    res.json({
      ok: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        wishlist: user.wishlist,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// POST /api/auth/logout - Logout (client-side token deletion)
router.post('/logout', (_req, res) => {
  res.json({ ok: true, message: 'Logged out successfully' });
});

export default router;
