import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FilterSection = ({
  onViewChange,
  onSortChange,
  activeFilter,
  setFilter,
  totalItem,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      {/* Filter section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Explore Content
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full transition-colors shadow-sm ${
              activeFilter === "all"
                ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("stories")}
            className={`px-5 py-2 rounded-full transition-colors shadow-sm ${
              activeFilter === "stories"
                ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Unpublished Stories
          </button>
          <button
            onClick={() => setFilter("drawings")}
            className={`px-5 py-2 rounded-full transition-colors shadow-sm ${
              activeFilter === "drawings"
                ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Drawings
          </button>
          <button
            onClick={() => setFilter("others")}
            className={`px-5 py-2 rounded-full transition-colors shadow-sm ${
              activeFilter === "others"
                ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Other Stories
          </button>
        </div>
      </div>

      {/* Grid/List view toggle */}
      <div className="flex justify-between items-center mb-0">
        <div className="flex items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            <span id="itemCount">{totalItem}</span> items found
          </p>
          <div className="flex items-center ml-4">
            <p className="mr-2 text-sm text-gray-600 dark:text-gray-400">View Mode:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setViewMode("grid");
                  onViewChange("grid");
                }}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
              <button
                onClick={() => {
                  setViewMode("list");
                  onViewChange("list");
                }}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-primary-600 dark:focus:border-primary-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;