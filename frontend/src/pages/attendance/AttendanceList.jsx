import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
// import { API_URI } from "../../../config";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/attendance/show`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAttendance(res.data.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URI}/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAttendance((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/attendance/edit/${id}`);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500/20 text-green-400";
      case "Half Day":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#d9e0e8] dark:bg-neutral-900 p-4 md:p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Attendance List
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="w-full bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
          <thead className="bg-neutral-800 text-gray-300">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Day</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item) => (
                <tr
                  key={item._id}
                  className="text-center border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <td className="p-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{item.day}</td>
                  <td className="p-4">{item.check_in || "-"}</td>
                  <td className="p-4">{item.check_out || "-"}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-500">
                      {item.attendance_status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"
                    >
                      <RiEdit2Fill />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-red-500/20 text-red-500 rounded-lg"
                    >
                      <RiDeleteBinFill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {attendance.length > 0 ? (
          attendance.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                  {item.attendance_status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">{item.day}</p>

              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>In:</strong> {item.check_in || "-"}
                </p>
                <p>
                  <strong>Out:</strong> {item.check_out || "-"}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"
                >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg"
                >
                  <RiDeleteBinFill />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No attendance records found
          </p>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;
