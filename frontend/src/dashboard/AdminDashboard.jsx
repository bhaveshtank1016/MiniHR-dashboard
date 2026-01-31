import React, { useState } from "react";
import { Users, CalendarCheck, XCircle, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employee: "Rahul Sharma",
      type: "Casual Leave",
      date: "2026-01-28",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Priya Verma",
      type: "Sick Leave",
      date: "2026-01-29",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setLeaveRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <Users className="w-10 h-10 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-xl font-semibold">45</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <CalendarCheck className="w-10 h-10 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Present Today</p>
            <p className="text-xl font-semibold">38</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <XCircle className="w-10 h-10 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Absent Today</p>
            <p className="text-xl font-semibold">7</p>
          </div>
        </div>
      </div>

      {/* Leave Approval Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2">Employee</th>
                <th>Leave Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.employee}</td>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="flex gap-2 py-2">
                    <button
                      onClick={() => updateStatus(item.id, "Approved")}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, "Rejected")}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
