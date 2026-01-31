import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle } from "lucide-react";
import PageLeavePagination from "./PageLeavePagination.jsx";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { API_URI } from "../../../config.jsx";

function LeaveList() {
  const [page, setPage] = useState(1);
  const [leaveList, setLeaveList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role?.name?.toLowerCase();

  // ================= FETCH LEAVES =================
  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${API_URI}/leaves/show?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setLeaveList(data.list || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load leaves");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [page]);

  // ================= UPDATE STATUS (ADMIN ONLY) =================
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URI}/leaves/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }), // 👈 Approved / Rejected
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || data.msg || "Permission denied");
        return;
      }

      toast.success(`Leave ${newStatus}`);
      fetchLeaves();
    } catch (error) {
      toast.error("Server error");
    }
  };

  // ================= SEARCH =================
  const filteredLeaves = leaveList.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.leaveType?.toLowerCase().includes(search) ||
      item.userId?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#d9e0e8] p-6 rounded-xl shadow-md">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-3xl font-bold mb-6">Leave List</h2>

      {/* SEARCH */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or leave type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 w-64 rounded-lg border focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => navigate("/leave-apply")}
          className="bg-blue-900 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition"
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">No.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
              {userRole === "admin" && <th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((item, index) => {
                const status = item.status?.toLowerCase();

                return (
                  <tr key={item._id} className="border-t hover:bg-gray-100">
                    <td className="p-3">{(page - 1) * 10 + index + 1}</td>
                    <td className="p-3">{item.userId?.name}</td>
                    <td className="p-3">{item.userId?.role?.name}</td>
                    <td className="p-3">{item.leaveType}</td>
                    <td className="p-3">
                      {new Date(item.startDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {new Date(item.endDate).toLocaleDateString()}
                    </td>

                    <td className="p-3 font-semibold">
                      <span
                        className={
                          status === "approved"
                            ? "text-green-600"
                            : status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>

                    {/* ACTION */}
                    {userRole === "admin" && (
                      <td className="p-3 flex justify-center gap-2">
                        {item.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(item._id, "Approved")
                              }
                            >
                              <CheckCircle className="text-green-500" />
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(item._id, "Rejected")
                              }
                            >
                              <XCircle className="text-red-500" />
                            </button>
                          </>
                        )}

                        {item.status === "Approved" && (
                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "Rejected")
                            }
                          >
                            <XCircle className="text-red-500" />
                          </button>
                        )}

                        {item.status === "Rejected" && (
                          <button
                            onClick={() =>
                              handleStatusChange(item._id, "Approved")
                            }
                          >
                            <CheckCircle className="text-green-500" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-gray-500">
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6">
        <PageLeavePagination totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

export default LeaveList;
