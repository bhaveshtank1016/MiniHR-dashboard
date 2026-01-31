import React, { useState } from "react";
import axios from "axios";
import { API_URI } from "../../../config";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URI}/auth/register`, formData);

      alert(res.data.message);

      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-xl bg-[#d9e0e8] dark:bg-neutral-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600
              bg-white dark:bg-neutral-700 text-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600
              bg-white dark:bg-neutral-700 text-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600
              bg-white dark:bg-neutral-700 text-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
            py-2 rounded-lg transition duration-200 shadow-md"
          >
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
