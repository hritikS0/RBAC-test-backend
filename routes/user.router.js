import express from "express";
import { registerUser, loginUser, getMyProfile } from "../controllers/user.controller.js"; // ✅ include getMyProfile
import { auth } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";
import {User} from "../models/user.model.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin + Manager can see all users
router.get("/", auth, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logged-in user can see their own profile
router.get("/me", auth, getMyProfile);

// Admin-only route example
router.post("/admin-create", auth, authorizeRoles("admin"), async (req, res) => {
  res.send("Only admin can create users here");
});

export default router;
