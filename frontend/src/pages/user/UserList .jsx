import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
// import { API_URI } from "../../../config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/users`);
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 text-xl animate-pulse">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        User List
      </h1>
      <div className="flex justify-end-safe mb-3">
        <button
          onClick={() => navigate("/useradd")}
          className="bg-blue-900 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition"
        >
          + Add User
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 bg-gray-100 font-semibold text-gray-700 px-6 py-3">
          <span className="col-span-1">#</span>
          <span className="col-span-5">Name</span>
          <span className="col-span-6">Email</span>
        </div>

        {users.map((user, index) => (
          <div
            key={user._id}
            className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-blue-50`}
          >
            <span className="col-span-1">{index + 1}</span>
            <span className="col-span-5 font-medium text-gray-800">
              {user.name}
            </span>
            <span className="col-span-6 text-gray-600">{user.email}</span>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
