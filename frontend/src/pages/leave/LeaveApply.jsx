import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URI } from "../../../config";

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Calculate total days automatically
  const calculateDays = (start, end) => {
    if (!start || !end) return "";
    const s = new Date(start);
    const e = new Date(end);
    const diff = e - s;
    return diff >= 0 ? diff / (1000 * 60 * 60 * 24) + 1 : "";
  };

  const handleStartDate = (value) => {
    setStartDate(value);
    setTotalDays(calculateDays(value, endDate));
  };

  const handleEndDate = (value) => {
    setEndDate(value);
    setTotalDays(calculateDays(startDate, value));
  };

  // 🔹 Submit Leave
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !startDate || !endDate || !totalDays) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URI}/leaves/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          leaveType,
          startDate,
          endDate,
          totalDays,
          reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to apply leave");
        return;
      }

      toast.success("Leave applied successfully ✅");

      // Reset form
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setTotalDays("");
      setReason("");
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl font-bold mb-6 text-center">Apply Leave</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type */}
        <div>
          <label className="block font-semibold mb-1">Leave Type *</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select leave type</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Pain">Earned</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-semibold mb-1">Start Date *</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-semibold mb-1">End Date *</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Total Days */}
        <div>
          <label className="block font-semibold mb-1">Total Days *</label>
          <input
            type="number"
            value={totalDays}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="3"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Optional reason"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;
