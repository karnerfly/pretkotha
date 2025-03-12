import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faCog,
  faSignOutAlt,
  faTimes,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`w-64 rounded-xl shadow-lg p-6 transform transition-all duration-300 fixed md:relative z-40 h-screen md:h-auto overflow-y-auto 
        ${
          isSidebarOpen ? "left-0" : "-left-64"
        } md:left-0 md:block dark:bg-gray-800 border dark:border-gray-700 bg-white`}
    >
      {/* Close Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 p-2 rounded-full focus:outline-none text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faTimes} className="text-xl" />
      </button>

      {/* User Info */}
      <div className="flex flex-col items-center mb-8 mt-2">
        <img
          src="https://via.placeholder.com/80"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-indigo-500 mb-4 object-cover"
        />
        <h3 className="font-bold text-xl dark:text-white text-gray-800">
          John Doe
        </h3>
        <p className="text-gray-500 text-sm">Premium User</p>
      </div>

      {/* Sidebar Links */}
      <nav className="space-y-1">
        <Link
          to=""
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
        >
          <FontAwesomeIcon icon={faHome} className="mr-3 text-indigo-500" />
          Home
        </Link>

        {/* My Posts */}
        <Link
          to="posts"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
        >
          <FontAwesomeIcon icon={faBook} className="mr-3 text-indigo-500" />
          My Posts
        </Link>

        {/* Profile */}
        <Link
          to="profile"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
        >
          <FontAwesomeIcon icon={faUser} className="mr-3 text-indigo-500" />
          Profile
        </Link>

        {/* My Bookmarks */}
        <Link
          to="bookmarks"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
        >
          <FontAwesomeIcon icon={faBookmark} className="mr-3 text-indigo-500" />
          My Bookmarks
        </Link>

        {/* Settings */}
        <Link
          to="settings"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
        >
          <FontAwesomeIcon icon={faCog} className="mr-3 text-indigo-500" />
          Settings
        </Link>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-3 text-indigo-500"
            />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
