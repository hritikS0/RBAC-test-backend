import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// ConnectDb utility function that handles connection pooling/caching
import connectDb from "./db/db.js"; 
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";

dotenv.config();

// Ensure the database connection is attempted on every load.
// If connectDb is properly caching the connection, this is efficient.
connectDb(); // <--- KEEP THIS AT THE TOP

const app = express();

// --- CORS Configuration (Your Fix) ---
const allowedOrigins = [
  'http://localhost:5173', 
  'https://rbac-test-backend-git-main-hritiks0s-projects.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  optionsSuccessStatus: 204 // Standard for preflight success
};

app.use(cors(corsOptions));
// ---------------------------------

app.use(express.json());

// --- Routes ---
app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "RBAC Backend is running! Check logs if /api/ routes fail.", 
  });
});

export default app;