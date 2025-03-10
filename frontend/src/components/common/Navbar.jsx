import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    {
      name: "Login",
      path: "/auth/login",
    },
    {
      name: "Register",
      path: "/auth/register",
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
          <Link to="/newsletter">
            <button className="bg-white text-primary-600 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Subscribe
            </button>
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
                href={item.path}
                className="text-primary-600 hover:text-primary-800 py-2 px-4 rounded-lg hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 mt-2">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
