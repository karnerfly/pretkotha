import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import ContentSection from "../components/CardContents/ContentSection";
import ContentGrid from "../components/CardContents/ContentGrid";
import ContentCard from "../components/CardContents/ContentCard";

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
