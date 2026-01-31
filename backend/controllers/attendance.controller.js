import Attendance from "../models/Attendance.js";

// ✅ Helper: Calculate Attendance Status
export const calculateStatus = (check_in, check_out) => {
  if (!check_in || !check_out) return "Absent";

  const [inH, inM] = check_in.split(":").map(Number);
  const [outH, outM] = check_out.split(":").map(Number);

  const inMinutes = inH * 60 + inM;
  const outMinutes = outH * 60 + outM;
  const totalMinutes = outMinutes - inMinutes;

  if (totalMinutes >= 480) return "Present"; // >= 8 hrs
  if (totalMinutes >= 120) return "Half Day"; // 2–8 hrs
  return "Absent";
};

// ⏰ Check-In

export const checkIn = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  const dateOnly = new Date(now.toDateString());
  const timeString = now.toTimeString().slice(0, 5); // HH:mm
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  try {
    let existing = await Attendance.findOne({ userId, date: dateOnly });

    if (existing) {
      return res.status(200).json({
        status: "already_checked_in",
        message: "Already checked in today.",
        data: existing,
      });
    }

    const newRecord = new Attendance({
      userId,
      date: dateOnly,
      day: dayName,
      check_in: timeString,
      check_out: null,
    });

    await newRecord.save();

    res.status(201).json({
      status: "checked_in",
      message: "Checked in successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Failed to check in" });
  }
};

// ⏳ Check-Out
export const checkOut = async (req, res) => {
  const userId = req.user.id; // ✅ from token
  const now = new Date();
  const dateOnly = new Date(now.toDateString());
  const timeString = now.toTimeString().slice(0, 5);

  try {
    const existing = await Attendance.findOne({ userId, date: dateOnly });

    if (!existing) {
      return res.status(400).json({ message: "No check-in found for today." });
    }
    if (existing.check_out) {
      return res.status(400).json({ message: "Already checked out today." });
    }

    existing.check_out = timeString;
    const status = calculateStatus(existing.check_in, existing.check_out);

    await existing.save();

    res.status(200).json({
      message: "Checked out successfully",
      data: { ...existing.toObject(), attendance_status: status },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to check out" });
  }
};

// 📄 Get Attendance for user
export const getAttendance = async (req, res) => {
  const userId = req.user.id; // ✅ from token
  try {
    const records = await Attendance.find({ userId }).sort({ date: -1 });

    const dataWithStatus = records.map((record) => ({
      ...record.toObject(),
      attendance_status: calculateStatus(record.check_in, record.check_out),
    }));

    res
      .status(200)
      .json({ message: "Fetched attendance", data: dataWithStatus });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
