import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faHome, faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const navigate = useNavigate(); // For navigation

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic
    console.log("Login details:", { email, password });
    // Redirect to /user/dashboard
    navigate("/user/dashboard");
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 text-sm">
          <Link to="/" className="hover:text-primary-600">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/register" className="hover:text-primary-600">
            <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
            Register
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-semibold">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
            Login
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Form Container */}
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl p-8">
          {/* Form Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
