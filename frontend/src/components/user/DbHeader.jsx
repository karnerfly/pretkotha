import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faTimes,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { logout } = useAuth();

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(".user-menu")) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="shadow-lg dark:bg-gray-800 bg-white transition-colors duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </Link>

        {/* Header Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:dark:bg-gray-700 transition-colors duration-200">
              <FontAwesomeIcon
                icon={faBell}
                className="text-xl dark:text-gray-300 text-gray-600"
              />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                3
              </span>
            </button>
          </div>

          {/* Sidebar Toggle Button (for small screens) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faTimes : faBars}
              className="text-xl"
            />
          </button>

          {/* User Avatar */}
          <div className="relative user-menu">
            <button
              onClick={toggleUserDropdown}
              className="flex items-center space-x-3 focus:outline-none p-2 rounded-full hover:bg-gray-100 hover:dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <div className="relative">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block">
                <p className="font-medium dark:text-white text-gray-800">
                  John Doe
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 bg-white dark:bg-gray-800 border dark:border-gray-700">
                <div className="px-4 py-3 border-b dark:border-gray-700 border-gray-100">
                  <p className="text-sm font-medium dark:text-white text-gray-800">
                    John Doe
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-500 truncate">
                    john.doe@example.com
                  </p>
                </div>
                <Link
                  to="profile"
                  className="px-4 py-2 text-sm dark:text-gray-200 hover:dark:bg-gray-700 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-3 text-indigo-500"
                  />
                  Profile
                </Link>
                <Link
                  to="settings"
                  className="px-4 py-2 text-sm dark:text-gray-200 hover:dark:bg-gray-700 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faCog}
                    className="mr-3 text-indigo-500"
                  />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="mr-3 text-indigo-500"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
