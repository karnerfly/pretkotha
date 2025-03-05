import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark,
  faHeart,
  faShareAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to list
        </button>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FontAwesomeIcon icon={faShareAlt} />
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
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <span className="mr-4">{story.views}</span>
            <FontAwesomeIcon icon={faHeart} className="mr-1" />
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
