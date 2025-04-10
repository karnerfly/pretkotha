import { Link } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCheckCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const NewsletterPage = () => {
  const [email, setEmail] = useState(""); // Email input
  const [showAlert, setShowAlert] = useState(false); // Popup alert state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setEmail("");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen pt-16">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-700 dark:text-indigo-400 font-semibold">Newsletter</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          {/* Section Heading */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Subscribe to Our Newsletter
          </h1>

          {/* Newsletter Description */}
          <div className="text-gray-600 dark:text-gray-300 mb-8">
            <p className="mb-4">
              Stay updated with the latest news, tips, and exclusive offers by subscribing to our newsletter.
            </p>
            <p className="mb-4">By subscribing, you'll receive:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Exclusive discounts and promotions.</li>
              <li>Early access to new features and updates.</li>
              <li>Helpful tips and tutorials to enhance your experience.</li>
              <li>Curated content tailored to your interests.</li>
            </ul>
          </div>

          {/* Newsletter Form */}
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
                className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all"
                required
              />
            </div>

            {/* Subscribe Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Popup Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          Thank you for subscribing! Please check your email.
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;