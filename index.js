import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("Loaded MONGO_URI =", process.env.MONGO_URI); // DEBUG

import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";
import connectDb from "./db/db.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true
}));

app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);

let isConnected = false;

const initDb = async () => {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
};

initDb();

export default app;
export const handler = serverless(app);
