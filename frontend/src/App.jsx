import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Sign_in from "./auth/Sign_in";

import Layout from "./layout/Layout";
import Dashboard from "./dashboard/Dashboard"; // updated import
import LeaveList from "./pages/leave/LeaveList";
import AttendanceList from "./pages/attendance/AttendanceList";
import ApplyLeave from "./pages/leave/LeaveApply";
import Daily_Attendance from "./pages/attendance/Daily_Attendance";
import AddUser from "./pages/user/AddUser";
import UserList from "./pages/user/UserList ";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Sign_in />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                  {/* Renders admin or employee dashboard based on role */}
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <Layout>
                  <LeaveList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Layout>
                  <AttendanceList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave-apply"
            element={
              <ProtectedRoute>
                <Layout>
                  <ApplyLeave />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/daily-attendacne"
            element={
              <ProtectedRoute>
                <Layout>
                  <Daily_Attendance />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userlist"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/useradd"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddUser />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
