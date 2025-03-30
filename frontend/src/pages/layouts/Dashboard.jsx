import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../../components/user/DbHeader";
import Sidebar from "../../components/user/DbSidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={
        "min-h-screen flex flex-col bg-gray-50 pt-16 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      }
    >
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 flex">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
