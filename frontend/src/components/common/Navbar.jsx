import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBars,
  faSun,
  faMoon,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Handler to close menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
    <nav
      className={`fixed top-0 left-0 right-0 mb-10 z-50 ${
       theme === "light" ? "bg-black/60" : "dark:bg-gray-900/100"
      } backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold flex items-center space-x-2 group text-white dark:text-white"
          >
            <div className="bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400 rounded-full p-2 transform group-hover:rotate-12 transition-transform duration-300">
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
                className="text-white dark:text-gray-200 hover:text-primary-100 dark:hover:text-primary-300 transition-colors relative group"
                onClick={handleNavLinkClick}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white dark:bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}

            <Link
              to={isAuthenticated ? "/user/dashboard" : "/auth/register"}
              className="text-white dark:text-gray-200 hover:text-primary-100 dark:hover:text-primary-300 transition-colors relative group"
              onClick={handleNavLinkClick}
            >
              {isAuthenticated ? "Dashboard" : "Create Account"}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white dark:bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>

            {/* Theme Changing button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white dark:text-gray-200 transition-colors duration-200"
            >
              <FontAwesomeIcon
                icon={theme === "light" ? faSun : faMoon}
                className="text-xl"
              />
            </button>

            <Link
              to="/newsletter"
              className="bg-white text-primary-600 dark:bg-primary-500 dark:text-white px-4 py-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={handleNavLinkClick}
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white dark:text-gray-200 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="text-2xl"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 rounded-lg bg-gray-900 dark:bg-gray-800 text-white shadow-xl animate__animated animate__fadeIn">
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white dark:text-gray-200 hover:text-primary-100 dark:hover:text-primary-300 py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleNavLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={isAuthenticated ? "/user/dashboard" : "/auth/register"}
                className="text-white dark:text-gray-200 hover:text-primary-100 dark:hover:text-primary-300 py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
                onClick={handleNavLinkClick}
              >
                {isAuthenticated ? "Dashboard" : "Create Account"}
              </Link>

              {/* Theme Changing button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-200 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200"
              >
                <FontAwesomeIcon
                  icon={theme === "light" ? faSun : faMoon}
                  className="text-xl"
                />
              </button>

              <Link
                to="/newsletter"
                className="bg-white text-primary-600 dark:bg-primary-500 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-primary-600 mt-2"
                onClick={handleNavLinkClick}
              >
                Subscribe
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
