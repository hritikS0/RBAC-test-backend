// api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "../routes/user.router.js";
import ProjectRouter from "../routes/project.router.js";
import connectDb from "../db/db.js";

const app = express();

// --- CORS ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app" // replace with actual frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// --- Middleware ---
app.use(express.json());

// --- Routes ---
app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);

// --- MongoDB connection ---
connectDb().then(()=>{
  app.listen(process.env.PORT||3001, () => {
    console.log("Server running on port 3001");
  });
})
connect
// Export handler for Vercel
export default app;
export const handler = serverless(app);
