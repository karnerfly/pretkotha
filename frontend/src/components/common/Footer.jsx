import { Link } from "react-router";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CreativeWorld</h3>
            <p className="text-gray-300">
              A platform for creators to share their unpublished stories,
              artwork, and more with the world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaPinterest />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/pretkotha"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pretkotha
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/stories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Unpublished Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/drawings"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Drawings & Paintings
                </Link>
              </li>
              <li>
                <Link
                  to="/poetry"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Poetry
                </Link>
              </li>
              <li>
                <Link
                  to="/photography"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Photography
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-art"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Digital Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on new content and features.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg flex-grow focus:outline-none"
              />
              <button className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CreativeWorld. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
