import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { seedDatabase } from "./src/backend/seed";
import { Product, Category } from "./src/backend/models";

// Ensure environment variables are loaded
dotenv.config();

// Define backend routes/middleware here
const setupBackend = (app: express.Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Custom CORS if needed, but in this setup frontend and backend share same origin
  app.use(cors());
  
  // Use Helmet for security but disable contentSecurityPolicy in dev for Vite HMR/assets
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
  
  app.use(morgan("dev"));

  // Serve uploads directory
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // API Routes
  app.get("/api/health", (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected";
    res.json({ status: "ok", db: dbStatus, timestamp: new Date() });
  });

  // Seed Route
  app.post("/api/seed", seedDatabase);

  // Products API
  app.get("/api/products", async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, message: "Database not connected" });
      }
      const products = await Product.find().populate('category');
      res.json({ success: true, data: products });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/products/:slug", async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, message: "Database not connected" });
      }
      const product = await Product.findOne({ slug: req.params.slug }).populate('category');
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  });

  // Categories API
  app.get("/api/categories", async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, message: "Database not connected" });
      }
      const categories = await Category.find();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });
};

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // 1. Connect to MongoDB
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB successfully.");
    } else {
      console.warn("MONGODB_URI is not defined in .env. Running without database connection.");
      console.warn("Certain features (Shop, Auth, Admin) will fail or return mock data.");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }

  // 2. Setup Backend API
  setupBackend(app);

  // 3. Setup Vite Middleware or Static Serving for Frontend
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Use Vite's middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files built by Vite
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
