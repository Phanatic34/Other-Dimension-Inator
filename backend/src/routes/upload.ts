import { Router, Request, Response } from 'express';
import { upload, isUsingCloudinary } from '../middleware/upload';

const router = Router();

// Get the base URL for local uploads
const getLocalImageUrl = (req: Request, filename: string): string => {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}/uploads/${filename}`;
};

// Single image upload
router.post('/image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    let imageUrl: string;
    
    if (isUsingCloudinary) {
      // Cloudinary returns the URL in file.path
      imageUrl = (req.file as any).path;
    } else {
      // Local storage - construct URL
      imageUrl = getLocalImageUrl(req, req.file.filename);
    }

    res.json({
      success: true,
      imageUrl: imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Multiple images upload
router.post('/images', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const files = req.files as Express.Multer.File[];
    let imageUrls: string[];
    
    if (isUsingCloudinary) {
      imageUrls = files.map((file) => (file as any).path);
    } else {
      imageUrls = files.map((file) => getLocalImageUrl(req, file.filename));
    }

    res.json({
      success: true,
      imageUrls: imageUrls,
      message: 'Images uploaded successfully',
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
