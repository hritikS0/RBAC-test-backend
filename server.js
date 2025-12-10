
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/db.js";
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);
connectDb().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
  });
});
