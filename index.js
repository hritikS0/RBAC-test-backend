import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import UserRouter from "./routes/user.router.js";
import ProjectRouter from "./routes/project.router.js";
import connectDb from "./db/db.js";

const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);
connectDb().then(() => {  
  app.listen(process.env.PORT || 3001, () => {  
    console.log(`Server running on port ${process.env.PORT || 3001}`);
  })
})

