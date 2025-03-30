import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [
    "The Lost Key",
    "Midnight Echo",
    "Ocean Dreams (Drawing)",
  ];

  return (
    <div className="bg-white shadow-md py-4 sticky top-0 z-20 border-b dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="relative max-w-xl mx-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search stories, drawings, and more..."
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-gray-100 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all dark:bg-gray-700 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {/* Search Icon */}
          <div className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute z-10 left-0 right-0 mt-2 bg-white shadow-xl rounded-lg dark:bg-gray-800">
              <div className="p-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 rounded cursor-pointer dark:hover:bg-gray-700"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;