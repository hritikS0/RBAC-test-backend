import express from "express";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { 
  createProject, 
  getAllProjects, 
  getProject, 
  updateProject, 
  deleteProject 
} from "../controllers/project.controller.js";

const router = express.Router();

// GET all projects - All roles can read
router.get("/", auth, authorizeRoles("admin", "manager", "user"), getAllProjects);

// GET single project
router.get("/:id", auth, authorizeRoles("admin", "manager", "user"), getProject);

// CREATE project - Admin & Manager
router.post("/", auth, authorizeRoles("admin", "manager"), createProject);

// UPDATE project - Admin & Manager
router.put("/:id", auth, authorizeRoles("admin", "manager"), updateProject);

// DELETE project - Admin only
router.delete("/:id", auth, authorizeRoles("admin"), deleteProject);

export default router;
