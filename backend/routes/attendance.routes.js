import express from "express";
import {
  checkIn,
  checkOut,
  getAttendance,
} from "../controllers/attendance.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);
router.get("/show", protect, getAttendance);

export default router;
