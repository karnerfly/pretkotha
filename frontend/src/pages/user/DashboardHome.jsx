import React from "react";
import {
  faBook,
  faEye,
  faHeart,
  faUser,
  faCalendar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHome = () => {
  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800">
      {/* Welcome Message */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 opacity-10 rounded-full"></div>
        <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-purple-500 opacity-10 rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <span>Welcome back, John!</span>
            <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          </h2>
          <p className="text-gray-500">
            Here's what's happening with your account today.
          </p>
          <div className="flex mt-4 space-x-3">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Create Story
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Stories</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">
                42
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-green-500">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.938a1 1 0 00.293.707l1.16 1.16a1 1 0 101.414-1.414l-.292-.293V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Up by 12% from last month</span>
          </div>
        </div>
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Followers</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">
                1.2K
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faHeart} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-green-500">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.938a1 1 0 00.293.707l1.16 1.16a1 1 0 101.414-1.414l-.292-.293V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Up by 25% from last month</span>
          </div>
        </div>
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 transform hover:scale-105 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Following</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">
                350
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-green-500">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.938a1 1 0 00.293.707l1.16 1.16a1 1 0 101.414-1.414l-.292-.293V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Up by 5% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Popular Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-5">
            <div className="flex">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBook} className="text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="dark:text-gray-200 text-gray-700 font-medium">
                  You published a new story
                </p>
                <p className="text-gray-500 text-sm">The Unexpected Journey</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                  <span>Today, 10:42 AM</span>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEye} className="text-green-600" />
                </div>
              </div>
              <div>
                <p className="dark:text-gray-200 text-gray-700 font-medium">
                  Your story got 50 new views
                </p>
                <p className="text-gray-500 text-sm">Adventure in the Alps</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                  <span>Yesterday, 02:15 PM</span>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} className="text-purple-600" />
                </div>
              </div>
              <div>
                <p className="dark:text-gray-200 text-gray-700 font-medium">
                  Sarah liked your story
                </p>
                <p className="text-gray-500 text-sm">The Hidden Truth</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                  <span>Yesterday, 08:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Stories */}
        <div className="lg:col-span-3 rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Popular Stories</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg dark:bg-gray-700 bg-gray-50 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">The Unexpected Journey</h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="flex items-center mr-3">
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    1.2K views
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faHeart} className="mr-1" />
                    345 likes
                  </span>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  Adventure
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg dark:bg-gray-700 bg-gray-50 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-400 flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Adventure in the Alps</h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="flex items-center mr-3">
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    956 views
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faHeart} className="mr-1" />
                    290 likes
                  </span>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Travel
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg dark:bg-gray-700 bg-gray-50 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-300 flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">The Hidden Truth</h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="flex items-center mr-3">
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    845 views
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faHeart} className="mr-1" />
                    178 likes
                  </span>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                  Mystery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
