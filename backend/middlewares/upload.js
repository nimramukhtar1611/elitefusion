const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const createUploadDirs = () => {
  const dirs = [
    'uploads',
    'uploads/games',
    'uploads/games/covers',
    'uploads/games/screenshots',
    'uploads/games/files'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'uploads/games/';
    
    if (file.fieldname === 'coverImage') {
      uploadPath += 'covers/';
    } else if (file.fieldname.startsWith('screenshots')) {
      uploadPath += 'screenshots/';
    } else if (file.fieldname.startsWith('gameFiles')) {
      uploadPath += 'files/';
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage' || file.fieldname.startsWith('screenshots')) {
    // Images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for cover image and screenshots'), false);
    }
  } else if (file.fieldname.startsWith('gameFiles')) {
    // Game files - allow most common formats
    const allowedMimeTypes = [
      'application/zip',
      'application/x-zip-compressed',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/octet-stream',
      'application/x-executable',
      'application/x-msdownload',
      'application/x-msdos-program',
      'application/x-winexe'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype) || 
        file.originalname.match(/\.(zip|rar|7z|exe|app|dmg|deb|rpm|tar|gz)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for game files'), false);
    }
  } else {
    cb(new Error('Unknown field'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB limit
    files: 20 // Maximum 20 files
  },
  fileFilter: fileFilter
});

// Multiple fields configuration
const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 },
  { name: 'gameFiles', maxCount: 10 }
]);

module.exports = {
  uploadFields,
  createUploadDirs
};