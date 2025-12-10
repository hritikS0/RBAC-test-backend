import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/db.js";
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";

dotenv.config();
connectDb();
const app = express();

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
  credentials: true, // Crucial if you use cookies/sessions/auth headers
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);

app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "RBAC Backend is running! Access /api/users or /api/projects", 
    environment: process.env.NODE_ENV 
  });
});


export default app; 