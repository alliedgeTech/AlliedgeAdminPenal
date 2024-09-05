import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/mu_logo.png"

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // State for username and password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Navigate hook to programmatically navigate
  const navigate = useNavigate();

  // Handler for login
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Replace this with your actual authentication logic
    if (username === "admin" && password === "password") {
      onLogin(); // Call the onLogin function passed as prop
      navigate("/"); // Redirect to the dashboard or any other authenticated page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 box-border border-4 p-6 rounded-lg">
      <span><img src="https://res.cloudinary.com/dagd6qt6p/image/upload/v1725339448/alliedgelogo_nfcxzr.png" alt='download' className='h-20 w-20 mx-auto' /></span>
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">Username:</label>
          <input
            className="border border-gray-400 rounded py-2 px-3 w-full"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">Password:</label>
          <input
            className="border border-gray-400 rounded py-2 px-3 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          className="bg-primary hover:bg-primary-2 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
