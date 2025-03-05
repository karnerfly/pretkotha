import ContentCard from "../CardComponents/ContentCard";
import cardData from "../../api/cardData.json";


  const RelatedStories = ({ currentStoryId }) => {
    // Filter stories only (exclude drawings) and remove the currently viewed story
    const relatedStories = cardData
  .filter((item) => item.type === "story" && item.title !== currentStoryId) // Keep only stories & exclude current
  .slice(0, 3); // Get first 3 stories

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      {relatedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((story) => (
            <ContentCard key={story.title} {...story} onClick={() => onSelectStory(story)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No related stories found.</p>
      )}
    </div>
  );
};

export default RelatedStories;
