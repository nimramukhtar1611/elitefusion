import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const router = Router();

// local disk storage (swap to S3/GCS later)
const UPLOAD_DIR = path.resolve("uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpe?g|png|webp|gif)$/i.test(file.mimetype);
    cb(ok ? null : new Error("Unsupported file type"), ok);
  },
});

// POST /api/uploads/image
router.post("/image", upload.single("file"), (req, res) => {
  // serve from /uploads/<filename>
  const publicUrl = `/uploads/images/${req.file.filename}`;
  res.json({ url: publicUrl });
});

export default router;
