import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee"
    },
    dateOfJoining: {
      type: Date,
      default: Date.now
    },
    leaveBalance: {
      type: Number,
      default: 20
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
