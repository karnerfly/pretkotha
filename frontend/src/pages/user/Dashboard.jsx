import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faBook, faCog, faSignOutAlt, faBell, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
            MyApp
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
            <Link to="/dashboard/profile" className="text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Link>
            <Link to="/dashboard/stories" className="text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Stories
            </Link>
            <Link to="/dashboard/settings" className="text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
          </nav>

          {/* User Avatar and Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-700">John Doe</span>
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden">
              <Link to="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              <Link to="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-8 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-lg shadow-md p-6 hidden md:block">
          <nav className="space-y-4">
            <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
            <Link to="/dashboard/profile" className="flex items-center text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Link>
            <Link to="/dashboard/stories" className="flex items-center text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Stories
            </Link>
            <Link to="/dashboard/settings" className="flex items-center text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Link>
            <button className="w-full text-left flex items-center text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="flex-1 ml-0 md:ml-6">
          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, John!</h2>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Total Stories</h3>
              <p className="text-3xl font-bold text-indigo-600">42</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Followers</h3>
              <p className="text-3xl font-bold text-indigo-600">1.2K</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Following</h3>
              <p className="text-3xl font-bold text-indigo-600">350</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBell} className="text-indigo-600 mr-3" />
                <p className="text-gray-700">You published a new story.</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="text-indigo-600 mr-3" />
                <p className="text-gray-700">Your story got 50 new views.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-8">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          &copy; 2023 MyApp. All rights reserved. |{" "}
          <Link to="/terms" className="hover:text-indigo-600">
            Terms
          </Link>{" "}
          |{" "}
          <Link to="/privacy" className="hover:text-indigo-600">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default DashboardHome;