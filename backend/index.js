import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer"; // for MulterError checks

// Routes
import authRouter from "./routes/authRoutes.js";
import gameRouter from "./routes/gameRoutes.js";
import uploadRoutes from "./routes/upload.js";
import devlogsRouter from './routes/devlogRoutes.js'

// DB
import dbConnection from "./database/dbConnection.js";

// Middlewares
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { requestLogger } from "./middlewares/loggingMiddleware.js";

dotenv.config();

const app = express();

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const UPLOAD_DIR = path.resolve(process.cwd(), process.env.UPLOAD_DIR || "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("✅ Uploads directory created");
}

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api/", limiter);

// Compression + CORS
app.use(compression());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Static files for uploaded content
app.use("/uploads", express.static(UPLOAD_DIR));

/**
 * 🔴 CRITICAL:
 * Mount uploads BEFORE any body parser / cookie parser / logger.
 * If you mount json/urlencoded/any raw parsers before this, multer won't see the stream.
 */
app.use("/api/uploads", uploadRoutes);

// Parsers (safe AFTER uploads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Request logger — MUST NOT read multipart bodies
app.use(requestLogger);

// Health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Elite Fusion Backend is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    user: "Muhammad-Irfanum",
  });
});

// Root info
app.get("/", (req, res) => {
  res.json({
    message: "Elite Fusion Game Jam Backend API",
    version: "1.0.0",
    author: "Muhammad-Irfanum",
    currentTime: new Date().toISOString(),
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      games: "/api/games",
      uploads: "/api/uploads/image (POST)",
    },
  });
});

// Other routes
app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);
app.use("/api/devlogs", devlogsRouter);

/**
 * Multer-aware error handler
 */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: err.code,
      field: err.field,
    });
  }
  next(err);
});

// 404 then generic error
app.use(notFound);
app.use(errorHandler);

// DB connect, then listen
dbConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Elite Fusion Backend Server Started!");
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`👤 Current User: Muhammad-Irfanum`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log(`📁 Upload directory: ${UPLOAD_DIR}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🎮 Games API: http://localhost:${PORT}/api/games`);
});
