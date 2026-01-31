import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "././routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://classy-gnome-3354a7.netlify.app", // React dev server
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("HR Management Backend Running");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
