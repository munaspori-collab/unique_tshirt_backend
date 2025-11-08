import express, { Request, Response } from 'express';
import { upload } from '../config/cloudinary';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Upload single image (admin only)
router.post(
  '/image',
  authenticateToken,
  requireAdmin,
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Cloudinary file info
      const file = req.file as Express.Multer.File & { path: string };
      
      res.json({
        success: true,
        url: file.path,
        publicId: (file as any).filename,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
);

// Upload multiple images (admin only)
router.post(
  '/images',
  authenticateToken,
  requireAdmin,
  upload.array('images', 5),
  async (req: Request, res: Response) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: 'No image files provided' });
      }

      const uploadedFiles = req.files.map((file: Express.Multer.File & { path: string }) => ({
        url: file.path,
        publicId: (file as any).filename,
      }));

      res.json({
        success: true,
        images: uploadedFiles,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
);

export default router;
