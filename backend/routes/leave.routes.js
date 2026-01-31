// import express from "express";
// import { isAdmin, protect } from "../middleware/auth.middleware.js";
// import {
//   applyLeave,
//   getMyLeaves,
//   updateLeave,
//   cancelLeave,
// } from "../controllers/leave.controller.js";

// const router = express.Router();

// // Employee routes (PROTECTED)
// router.post("/apply", protect, isAdmin, applyLeave);
// router.get("/show", protect, isAdmin, getMyLeaves);
// router.put("/update/:id", protect, isAdmin, updateLeave);
// router.delete("/delete/:id", protect, isAdmin, cancelLeave);

// export default router;
import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";
import {
  getAllLeave,
  addLeave,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";

const router = express.Router();

// Employee routes (PROTECTED)
router.post("/apply", protect, addLeave);
router.get("/show", protect, getAllLeave);

// Approve / Reject (Admin )
router.put(
  "/status/:id",
  protect,
  (req, res, next) => {
    console.log("ROLE FROM ROUTE =>", req.user.role);
    next();
  },
  authorizeRoles("admin"),
  updateLeaveStatus,
);

export default router;
