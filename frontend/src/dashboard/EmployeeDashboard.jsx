import React, { useEffect, useState } from "react";
import { CalendarDays, ClipboardList, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        Welcome, {user ? user.name : "Employee"}!
      </motion.h1>

      {/* Leave Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Leaves</p>
              <p className="text-xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Leaves Taken</p>
              <p className="text-xl font-semibold">10</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Remaining Leaves</p>
              <p className="text-xl font-semibold">14</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Request History */}
      <div className="bg-white rounded-2xl shadow-md mb-8 p-6">
        <h2 className="text-lg font-semibold mb-4">Leave Request History</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">10 Jan 2026</td>
              <td>Sick Leave</td>
              <td className="text-green-600 font-medium">Approved</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">18 Jan 2026</td>
              <td>Casual Leave</td>
              <td className="text-orange-600 font-medium">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">This Month</p>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            View Full Report
          </button>
        </div>

        <ul className="text-sm">
          <li className="flex justify-between border-b py-2">
            <span>Present Days</span>
            <span className="font-medium">20</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Absent Days</span>
            <span className="font-medium">2</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Late Entries</span>
            <span className="font-medium">1</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
