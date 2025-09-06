const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/products/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    fieldSize: 5 * 1024 * 1024, // 5MB field size limit
    files: 10 // Maximum number of files
  },
  fileFilter: (req, file, cb) => {
    console.log('File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size || 'unknown'
    });
    
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      console.log('File rejected - not an image:', file.mimetype);
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});
module.exports = upload;
