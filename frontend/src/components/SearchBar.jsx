import { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = ["The Lost Key", "Midnight Echo", "Ocean Dreams (Drawing)"];

    return (
        <div className="bg-white shadow-md py-4 sticky top-0 z-20 border-b">
            <div className="container mx-auto px-4">
                <div className="relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search stories, drawings, and more..."
                        className="w-full py-3 pl-12 pr-4 text-gray-700 bg-gray-100 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    <div className="absolute left-4 top-3 text-gray-500">
                        <i className="fas fa-search"></i>
                    </div>

                    {/* Search Suggestions */}
                    {showSuggestions && (
                        <div className="absolute z-10 left-0 right-0 mt-2 bg-white shadow-xl rounded-lg">
                            <div className="p-2">
                                {suggestions.map((item, index) => (
                                    <div key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                                        {item}
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
