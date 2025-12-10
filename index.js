import express from "express";
import cors from "cors";
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";
import connectDb from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB once
let dbConnected = false;
const ensureDbConnection = async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDb();
      dbConnected = true;
    } catch (error) {
      console.error("DB Connection failed:", error);
      return res.status(500).json({ message: "Database connection error" });
    }
  }
  next();
};

app.use(ensureDbConnection);

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);

// For local development
if (process.env.NODE_ENV !== "production") {
  connectDb().then(() => {  
    app.listen(process.env.PORT || 3001, () => {  
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    })
  })
}

export default app;

