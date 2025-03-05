import { useState } from "react";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContentSection from "../components/CardComponents/ContentSection";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [totalItem, setTotalItem] = useState(0);
  const [viewMode, setViewMode] = useState("list");

  return (
    <div>
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
      />

      {/* Content Section */}
      <ContentSection filter={filter} setTotalItem={setTotalItem} />
    </div>
  );
};

export default Home;
