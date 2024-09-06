import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { apiPaths } from "../../service/apiPaths";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Static user credentials
  const staticUsername = "admin@gmail.com";
  const staticPassword = "Admin@123";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check against static credentials
    if (username === staticUsername && password === staticPassword) {
      // Simulate a successful login
      const token = "dummyToken"; // You should replace this with actual token if available
      localStorage.setItem("accessToken", token);
      onLogin();
      navigate("/");
      return;
    }

    // Proceed with API login if static credentials do not match
    try {
      const response = await ApiService({
        method: "POST",
        endpoint: apiPaths.Login,
        data: {
          email: username,
          password: password,
        },
      });

      const { token, refreshToken } = response;

      if (token) {
        localStorage.setItem("accessToken", token);
        onLogin();
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error occurred during login");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md lg:max-w-lg">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://res.cloudinary.com/dagd6qt6p/image/upload/v1725339448/alliedgelogo_nfcxzr.png"
            alt="Logo"
            className="w-70 h-16"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Welcome to Alliedge Technologies{" "}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please sign in to your account
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email "
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
