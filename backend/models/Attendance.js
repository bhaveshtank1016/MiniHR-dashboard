import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  check_in: {
    type: String, // "HH:mm"
    default: null,
  },
  check_out: {
    type: String, // "HH:mm"
    default: null,
  },
});

export default mongoose.model("attendance", attendanceSchema);
