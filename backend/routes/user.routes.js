import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
// ✅ Get all users (ADMIN)
router.get("/", getAllUsers);

// ✅ Get user by ID (ADMIN or SELF)
router.get("/:id", getUserById);

export default router;
