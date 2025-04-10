import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen pt-16">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 dark:text-primary-400 font-semibold">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            Forgot Password
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 pt-16">
        {/* Form Container */}
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          {/* Form Heading */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Forgot Password
          </h1>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Send Password Reset Link
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                to="/auth/login"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Popup Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p>Check your email for the password reset link.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;