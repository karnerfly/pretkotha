import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import FilterSection from "../components/FilterSection"; // Correct path for FilterSection

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen pt-16">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 dark:text-primary-500 font-semibold flex items-center">
            <FontAwesomeIcon icon={faSearch} className="mr-1" />
            Search
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Search
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          Find what you're looking for by entering your search query below.
        </p>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Enter your search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-16 text-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              <FontAwesomeIcon icon={faSearch} className="text-xl" />
            </button>
          </form>
        </div>

        {/* Filter Section */}
        <div className="mt-8 max-w-3xl mx-auto">
          <FilterSection />
        </div>

        {/* Section for Future References (Cards) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Search Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*
              Add your card component here in the future.
              Example:
              <CardComponent />
              <CardComponent />
              <CardComponent />
            */}
            <div className="text-center text-gray-600 dark:text-gray-400">
              Cards will appear here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;