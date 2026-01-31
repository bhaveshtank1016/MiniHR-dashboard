import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization?.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN =>", decoded);

    // 🔥 SUPPORT BOTH id & userId
    const userId = decoded.id || decoded.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    console.log("USER FROM TOKEN =>", req.user);

    next();
  } catch (error) {
    console.error("AUTH ERROR =>", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ===============================
// AUTHORIZATION (ROLE BASED)
// ===============================
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 🔥 role directly string hai
    const role = req.user?.role?.toLowerCase().trim();

    console.log("USER ROLE =>", role);

    if (!role || !allowedRoles.map((r) => r.toLowerCase()).includes(role)) {
      return res.status(403).json({
        message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};
