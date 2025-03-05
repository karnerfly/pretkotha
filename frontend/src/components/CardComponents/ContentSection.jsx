import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import StoryView from "../ToogleComponent/StoryView";
import cardData from "../../api/cardData.json";

const ContentSection = ({ filter, setTotalItem, viewMode = "grid", sortMode = "newest" }) => {
  const [data, setData] = useState(cardData);
  const [selectedStory, setSelectedStory] = useState(null); // Track selected story

  // Filter and Sort Logic
  useEffect(() => {
    let filteredData;

    switch (filter) {
      case "stories":
        filteredData = cardData.filter((item) => item.type === "story");
        break;
      case "drawings":
        filteredData = cardData.filter((item) => item.type === "drawing");
        break;
      case "others":
        filteredData = cardData.filter((item) => item.type === "other");
        break;
      default:
        filteredData = cardData;
    }

    // Sorting logic
    switch (sortMode) {
      case "oldest":
        filteredData = filteredData.sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "newest":
        filteredData = filteredData.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "popular":
        filteredData = filteredData.sort((a, b) =>
          (b.views || 0) - (a.views || 0)
        );
        break;
    }

    setData(filteredData);
    setTotalItem(filteredData.length);
  }, [filter, sortMode]);

  // Grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === "grid") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
    return "grid grid-cols-1 gap-4"; // List view
  };

  return (
    <div id="contentContainer" className="container mx-auto px-4 py-8">
      {selectedStory ? (
        <StoryView story={selectedStory} onBack={() => setSelectedStory(null)} />
      ) : (
        <div className={getGridClasses()}>
          {data.map((item, index) => (
            <ContentCard 
              key={index} 
              {...item} 
              viewMode={viewMode}
              onReadMore={() => setSelectedStory(item)} // Open story on click
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
