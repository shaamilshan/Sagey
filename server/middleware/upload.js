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
    fileSize: 10 * 1024 * 1024, // Increased to 10MB limit
    fieldSize: 10 * 1024 * 1024, // Increased to 10MB field size limit
    files: 10 // Maximum number of files
  },
  fileFilter: (req, file, cb) => {
    console.log('File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname,
      size: file.size || 'unknown'
    });
    
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      console.log('File accepted:', file.originalname);
      cb(null, true);
    } else {
      console.log('File rejected - not an image:', file.mimetype);
      cb(new Error(`Only image files are allowed! Received: ${file.mimetype}`), false);
    }
  }
});
module.exports = upload;
