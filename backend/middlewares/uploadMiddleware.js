import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload folders exist
const ensureDirs = (subpaths) => {
  subpaths.forEach((rel) => {
    const full = path.join(__dirname, '..', rel);
    if (!fs.existsSync(full)) {
      fs.mkdirSync(full, { recursive: true });
      console.log(`✅ Created directory: ${full}`);
    }
  });
};

ensureDirs([
  'uploads',
  'uploads/games',
  'uploads/games/covers',
  'uploads/games/screenshots',
  'uploads/games/files',
]);

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let base = path.join(__dirname, '..', 'uploads', 'games');
    let dest = base;

    // Accept both canonical names and bracket aliases
    const f = file.fieldname;
    if (f === 'coverImage') dest = path.join(base, 'covers');
    else if (f === 'screenshots' || f === 'screenshots[]') dest = path.join(base, 'screenshots');
    else if (f === 'gameFiles' || f === 'gameFiles[]') dest = path.join(base, 'files');

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').slice(0, 80);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base || 'file'}-${unique}${ext.toLowerCase()}`);
  },
});

// File type gates
const IMG_OK = (m) => m?.startsWith('image/');
const GAME_EXT_OK = /\.(pdf|zip|rar|7z|tar|gz|bz2|xz|dmg|exe|msi|deb|rpm|apk|app|jar|love|unitypackage)$/i;

const fileFilter = (req, file, cb) => {
  console.log(`📥 ${file.fieldname} -> ${file.originalname} (${file.mimetype})`);

  const f = file.fieldname;

  // Cover & screenshots must be images
  if (f === 'coverImage' || f === 'screenshots' || f === 'screenshots[]') {
    if (IMG_OK(file.mimetype)) return cb(null, true);
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `${f}: images only`));
  }

  // Game files — allow common package/archive/binaries
  if (f === 'gameFiles' || f === 'gameFiles[]') {
    if (GAME_EXT_OK.test(file.originalname)) return cb(null, true);
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `${f}: invalid game file type`));
  }

  return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `Unknown field: ${f}`));
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024, // 1GB
    files: 20,
  },
  fileFilter,
});

// Accept canonical names; tolerate [] aliases (won’t *send* them, but won’t crash if they appear)
export const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 },
  { name: 'gameFiles', maxCount: 10 },
  { name: 'screenshots[]', maxCount: 10 }, // alias tolerance
  { name: 'gameFiles[]', maxCount: 10 },  // alias tolerance
]);
