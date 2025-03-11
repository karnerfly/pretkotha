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
import { useNavigate, useParams } from "react-router";
import data from "../../api/cardData.json";

const StoryView = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();

  // if no storyId or invalid storyId in url then return back to home
  if (!storyId || storyId >= data.length) return navigate("/");

  // because id starts with 1 and array index starts with 0 hence index = id - 1
  const story = data[storyId - 1];

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Story Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to list
        </button>
        <div className="flex gap-3">
          <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          {story.title}
        </h1>
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6">
          <img
            src={story.authorAvatar || "/api/placeholder/40/40"}
            alt="Author"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">{story.author}</p>
            <p className="text-sm">{story.date}</p>
          </div>
          <div className="ml-auto flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <span className="mr-4">{story.views}</span>
            <FontAwesomeIcon icon={faHeart} className="mr-1" />
            <span>{story.likes}</span>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
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