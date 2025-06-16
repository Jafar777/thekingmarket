import multer from 'multer';

// FIX: Use memory storage for Vercel compatibility
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Max 10 files
  }
});

export default upload;