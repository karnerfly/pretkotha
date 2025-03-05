import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEye,
  faHeart,
  faArrowRight,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";

import Badge from "./Badge";

const ContentCard = ({
  type,
  title,
  description,
  image,
  views,
  likes,
  tag,
  featured,
  actionText,
  onReadMore, // Function to open StoryView
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Component for Tag */}
        {tag && (
          <Badge
            text={tag}
            color={type === "drawing" ? "bg-secondary-500" : "bg-primary-500"}
          />
        )}

        {/* Badge Component for Featured */}
        {featured && (
          <Badge text="Featured" color="bg-yellow-500" position="left" />
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <button className="text-gray-400 hover:text-primary-500">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          {/* Updated Read More button */}
          <button
            onClick={onReadMore} // Calls the function when clicked
            className="bg-primary-50 text-primary-600 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors flex items-center gap-1"
          >
            <span>{actionText}</span>
            <FontAwesomeIcon icon={DisplayIcon(type)} className="text-xs" />
          </button>

          <div className="flex items-center text-gray-500 text-sm">
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            <span>{views}</span>
            <FontAwesomeIcon icon={faHeart} className="mx-1 ml-3" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayIcon = (type) => {
  switch (type) {
    case "story":
      return faArrowRight;
    case "drawing":
      return faExpandAlt;
    default:
      return faArrowRight;
  }
};

export default ContentCard;
