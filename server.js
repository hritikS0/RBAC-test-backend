import express from "express";
import cors from "cors";

const app = express();

// Allow CORS for localhost and your frontend on Vercel
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

// Handle OPTIONS preflight requests
app.options("*", cors());
