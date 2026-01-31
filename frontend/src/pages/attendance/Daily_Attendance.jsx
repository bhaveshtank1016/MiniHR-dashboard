import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URI } from "../../../config";

export default function Daily_Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        `${API_URI}/attendance/show?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let records = res.data.data || [];
      const todayDate = new Date().toDateString();

      const todayExists = records.some(
        (r) => new Date(r.date).toDateString() === todayDate
      );

      if (!todayExists) {
        records.unshift({
          date: new Date(),
          day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
          check_in: null,
          check_out: null,
          attendance_status: "Absent",
        });
      }

      setAttendance(records);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      const res = await axios.post(
        `${API_URI}/attendance/checkin`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked in");
      fetchAttendance();
    } catch (err) {
      toast.error("Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(
        `${API_URI}/attendance/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message || "Checked out");
      fetchAttendance();
    } catch (err) {
      toast.error("Check-out failed");
    }
  };

  const renderStatus = (row) => {
    if (row.check_in && !row.check_out)
      return <span className="text-yellow-500">⏳ Working</span>;
    if (row.attendance_status === "Present")
      return <span className="text-green-500">✅ Present</span>;
    if (row.attendance_status === "Half Day")
      return <span className="text-orange-500">🕒 Half Day</span>;
    return <span className="text-red-500">❌ Absent</span>;
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#d9e0e8] dark:bg-neutral-900 p-4 md:p-6 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Attendance Records
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
          <thead className="bg-neutral-800 text-gray-300">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Day</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((row, idx) => {
              const isToday =
                new Date(row.date).toDateString() ===
                new Date().toDateString();

              return (
                <tr
                  key={idx}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <td className="p-4">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{row.day}</td>
                  <td className="p-4">
                    {isToday && !row.check_in ? (
                      <button
                        onClick={handleCheckIn}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg"
                      >
                        Check In
                      </button>
                    ) : (
                      row.check_in || "-"
                    )}
                  </td>
                  <td className="p-4">
                    {isToday && row.check_in && !row.check_out ? (
                      <button
                        onClick={handleCheckOut}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Check Out
                      </button>
                    ) : (
                      row.check_out || "-"
                    )}
                  </td>
                  <td className="p-4">{renderStatus(row)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {attendance.map((row, idx) => {
          const isToday =
            new Date(row.date).toDateString() === new Date().toDateString();

          return (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">
                  {new Date(row.date).toLocaleDateString()}
                </p>
                {renderStatus(row)}
              </div>

              <p className="text-sm text-gray-500">{row.day}</p>

              <div className="flex justify-between mt-3 text-sm">
                <p>
                  <strong>In:</strong>{" "}
                  {isToday && !row.check_in ? (
                    <button
                      onClick={handleCheckIn}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Check In
                    </button>
                  ) : (
                    row.check_in || "-"
                  )}
                </p>

                <p>
                  <strong>Out:</strong>{" "}
                  {isToday && row.check_in && !row.check_out ? (
                    <button
                      onClick={handleCheckOut}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Check Out
                    </button>
                  ) : (
                    row.check_out || "-"
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
