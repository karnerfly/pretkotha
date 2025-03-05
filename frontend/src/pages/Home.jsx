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
        {/* Content Grid (Wrapper for Cards) */}
        <ContentGrid>
          {/* Example Content Cards (You can map data later) */}
          <ContentCard
            title="The Lost Key"
            category="Story"
            description="A mysterious adventure about a key that unlocks forgotten memories..."
            imageUrl="https://cdn.pixabay.com/photo/2025/02/22/08/35/mountain-9423779_1280.jpg"
            views={487}
            likes={124}
          />
          <ContentCard
            title="Ocean Dreams"
            category="Drawing"
            description="Watercolor painting of ocean waves at sunset."
            imageUrl="https://cdn.pixabay.com/photo/2016/11/29/12/28/chalks-1869492_640.jpg"
            views={652}
            likes={211}
          />
          <ContentCard
            title="The Quantum Detective"
            category="Story"
            description="A science fiction mystery where reality itself is the prime suspect..."
            imageUrl="/api/placeholder/400/250"
            views={842}
            likes={315}
            featured={true}
          />
        </ContentGrid>
      </ContentSection>
    </div>
  );
};

export default Home;
