import { useState } from "react";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContentSection from "../components/CardComponents/ContentSection";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [totalItem, setTotalItem] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [sortMode, setSortMode] = useState("newest");

  // Handler for changing view mode (grid/list)
  const handleViewChange = (mode) => {
    setViewMode(mode);
    console.log(`View mode changed to: ${mode}`);
  };

  // Handler for changing sort mode
  const handleSortChange = (mode) => {
    setSortMode(mode);
    console.log(`Sort mode changed to: ${mode}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Bar */}
      <SearchBar />

      {/* Filter Section */}
      <FilterSection
        setFilter={setFilter}
        activeFilter={filter}
        totalItem={totalItem}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onViewChange={handleViewChange}
        onSortChange={handleSortChange}
      />

      {/* Content Section */}
      <ContentSection
        filter={filter}
        setTotalItem={setTotalItem}
        viewMode={viewMode}
        sortMode={sortMode}
      />
    </div>
  );
};

export default Home;
