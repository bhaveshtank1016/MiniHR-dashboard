import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const COMPANY_LOGO =
  "https://media.licdn.com/dms/image/v2/C560BAQEuzb6ataN1hw/company-logo_200_200/company-logo_200_200/0/1631339165284?e=2147483647&v=beta&t=Fd4mXIlVPsDtv3wyd5AxPhroQ7FZrY9DZEdkASmPVUc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      navigate(
        data.user.role === "admin"
          ? "/admin/dashboard"
          : "/employee/dashboard"
      );
    } catch (error) {
      toast.error("Server error. Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <form
        onSubmit={handleLogin}
        className="bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={COMPANY_LOGO}
            alt="Company Logo"
            className="w-16 h-16 rounded-full shadow-md"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          HR Management System
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="admin@company.com"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-xs text-gray-400">Secure Login</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          © 2026 HR Management System. All rights reserved.
        </p>
      </form>
    </div>
  );
};

export default SignIn;
