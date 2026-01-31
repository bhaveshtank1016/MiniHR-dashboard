import Leave from "../models/Leave.js";

// ==============================
// GET all leaves (pagination + role-based)
// ==============================
export const getAllLeave = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const userId = req.user?._id;
    const roleName = req.user?.role?.toLowerCase(); // simple string in your User model

    let query = {};

    // Admin can see all, employees only their own leaves
    if (roleName !== "admin") {
      query.userId = userId;
    }

    const totalCount = await Leave.countDocuments(query);

    const leaves = await Leave.find(query)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      list: leaves,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching leaves", error: error.message });
  }
};

// ==============================
// POST add new leave
// ==============================
export const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, totalDays, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !totalDays) {
      return res.status(400).json({ msg: "All required fields are missing" });
    }

    const newLeave = new Leave({
      userId: req.user._id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status: "Pending",
    });

    await newLeave.save();

    res.status(201).json({
      msg: "Leave applied successfully",
      leave: newLeave,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error adding leave",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE leave status (Admin / HR)
// ==============================


export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Role check: only admin can update
    if (req.user.role.toLowerCase() !== "admin") {
      return res.status(403).json({ msg: "Only admin can update leave status" });
    }

    // Normalize status
    const normalizedStatus =
      status.toLowerCase() === "approved"
        ? "Approved"
        : status.toLowerCase() === "rejected"
        ? "Rejected"
        : "Pending";

    if (!["Pending", "Approved", "Rejected"].includes(normalizedStatus)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    res.status(200).json({
      msg: "Leave status updated successfully",
      leave: updatedLeave,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error updating leave status",
      error: error.message,
    });
  }
};


