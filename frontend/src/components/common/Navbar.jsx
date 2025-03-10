import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBars,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <nav className="container mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold flex items-center space-x-2 group"
        >
          <div className="bg-white text-primary-600 rounded-full p-2 transform group-hover:rotate-12 transition-transform duration-300">
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <span className="tracking-tight">CreativeWorld</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-white hover:text-primary-100 transition-colors relative group"
            >
              {item.name}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}

          <Link
            to={isAuthenticated ? "/user/dashboard" : "/auth/register"}
            className="text-white hover:text-primary-100 transition-colors relative group"
          >
            {isAuthenticated ? "Dashboard" : "Create Account"}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>

          {/* Theme Changing button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white dark:text-gray-700 transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faSun : faMoon}
              className="text-xl"
            />
          </button>

          <Link
            to="/newsletter"
            className="bg-white text-primary-600 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 rounded-lg bg-white shadow-xl animate__animated animate__fadeIn">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-primary-600 hover:text-primary-800 py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? "/user/dashboard" : "/auth/register"}
              className="text-primary-600 hover:text-primary-800 py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              {isAuthenticated ? "Dashboard" : "Create Account"}
            </Link>
            <Link
              to="/newsletter"
              className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 mt-2"
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
