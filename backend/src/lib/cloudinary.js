import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Log to verify environment variables are loaded
console.log("Cloudinary config check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✓" : "✗",
  api_key: process.env.CLOUDINARY_API_KEY ? "✓" : "✗",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓" : "✗"
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export default cloudinary;