import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import StoryView from "../ToogleComponent/StoryView";
import DrawingModal from "../ToogleComponent/DrawingModal";
import cardData from "../../api/cardData.json";

const ContentSection = ({ filter, setTotalItem, viewMode = "grid", sortMode = "newest" }) => {
  const [data, setData] = useState(cardData);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);

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

  // Function to open StoryView and set related stories
  const handleReadStory = (story) => {
    setSelectedStory(story);

    // Show only stories that are not the current one
    const related = cardData.filter(
      (item) => item.type === "story" && item.id !== story.id
    );
    setRelatedStories(related);
  };

  // Grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === "grid") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
    return "grid grid-cols-1 gap-4"; // List view
  };

  return (
    <div id="contentContainer" className="container mx-auto px-4 py-8">
      {/* Render StoryView or DrawingModal based on selection */}
      {selectedStory ? (
        <StoryView
          story={selectedStory}
          onBack={() => setSelectedStory(null)}
          relatedStories={relatedStories} // Pass only related stories
        />
      ) : selectedDrawing ? (
        <DrawingModal
          isOpen={!!selectedDrawing}
          onClose={() => setSelectedDrawing(null)}
          drawing={selectedDrawing}
        />
      ) : (
        <div className={getGridClasses()}>
          {data.map((item, index) => (
            <ContentCard 
              key={index} 
              {...item} 
              viewMode={viewMode}
              onReadMore={() => handleReadStory(item)} // Open StoryView
              onViewDrawing={() => setSelectedDrawing(item)} // Open DrawingModal
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
