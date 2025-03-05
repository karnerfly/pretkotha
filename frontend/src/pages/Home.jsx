import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContentSection from "../components/contents/ContentSection";
import ContentGrid from "../components/contents/ContentGrid";
import ContentCard from "../components/contents/ContentCard";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Search Bar */}
      <SearchBar />

      {/* Filter Section */}
      <FilterSection />

      {/* Content Section */}
      <ContentSection>
        {/* Content Grid  */}
        <ContentGrid>
          {/* Example Content Cards */}
          <ContentCard>

          </ContentCard>
        </ContentGrid>
      </ContentSection>
    </div>
  );
};

export default Home;
