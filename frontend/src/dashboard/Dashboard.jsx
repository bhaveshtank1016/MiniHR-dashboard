import React from "react";
import AdminDashboard from "./AdminDashboard";

import EmployeeDashboard from "./EmployeeDashboard.jsx";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user); // Debug check
  const role = user?.role;

  if (role === "admin") return <AdminDashboard />;
  if (role === "employee") return <EmployeeDashboard />;

  return <div>Access Denied</div>;
};

export default Dashboard;
