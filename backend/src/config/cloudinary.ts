import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary from CLOUDINARY_URL environment variable
// Format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
if (process.env.CLOUDINARY_URL) {
  // Cloudinary will automatically parse CLOUDINARY_URL
  cloudinary.config({
    secure: true, // Use HTTPS
  });
  console.log('✅ Cloudinary configured from CLOUDINARY_URL');
} else if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  // Or configure manually using separate environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✅ Cloudinary configured from individual environment variables');
} else {
  console.warn('⚠️  Cloudinary not configured. Set CLOUDINARY_URL in .env file');
}

export default cloudinary;


