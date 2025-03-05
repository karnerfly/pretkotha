import CommentsSection from "./CommentsSection";
import RelatedStories from "./RelatedStories";

const StoryView = ({ story, onBack }) => {
  if (!story) return null; // Prevent rendering if no story selected

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Story Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to list
        </button>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <i className="far fa-bookmark"></i>
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <i className="far fa-heart"></i>
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          {story.title}
        </h1>
        <div className="flex items-center text-gray-500 mb-6">
          <img
            src={story.authorAvatar || "/api/placeholder/40/40"}
            alt="Author"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-gray-700">{story.author}</p>
            <p className="text-sm">{story.date}</p>
          </div>
          <div className="ml-auto flex items-center">
            <i className="far fa-eye mr-1"></i>
            <span className="mr-4">{story.views}</span>
            <i className="far fa-heart mr-1"></i>
            <span>{story.likes}</span>
          </div>
        </div>
        <div className="prose max-w-none text-gray-700 mb-8">
          {story.content}
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection />

      {/* Related Stories */}
      <RelatedStories />
    </div>
  );
};

export default StoryView;
