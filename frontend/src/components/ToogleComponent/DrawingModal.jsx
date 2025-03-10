import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHeart,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const DrawingModal = ({ onClose, drawing }) => {
  if (!drawing) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate__animated animate__fadeIn p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Close Button - Inside for better UX */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-all text-2xl p-2"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Image Section - Fully responsive */}
        <div className="w-full lg:w-2/3 flex items-center justify-center bg-gray-100">
          <img
            src={drawing.image}
            alt={drawing.title}
            className="w-full h-auto max-h-[75vh] object-contain rounded-t-lg lg:rounded-none lg:rounded-l-lg"
          />
        </div>

        {/* Info Section - Adjusts based on screen size */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between p-5">
          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {drawing.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{drawing.description}</p>
          </div>

          {/* Artist Info & Actions */}
          <div className="mt-4">
            {/* Artist Info */}
            <div className="flex items-center mb-3">
              <img
                src={drawing.artistImage || "/api/placeholder/400/250"}
                alt="Artist"
                className="w-10 h-10 rounded-full border border-gray-300 mr-3"
              />
              <span className="text-gray-700 text-sm">
                {drawing.artist || "Unknown Artist"}
              </span>
            </div>

            {/* Actions - Like & Share */}
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-red-500 transition-colors flex items-center">
                <FontAwesomeIcon icon={faHeart} className="mr-1" />
                <span>{drawing.likes}</span>
              </button>
              <button className="text-gray-600 hover:text-blue-500 transition-colors flex items-center">
                <FontAwesomeIcon icon={faShareAlt} className="mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingModal;
