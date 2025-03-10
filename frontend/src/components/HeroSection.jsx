import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const HeroSection = ({ title, subtitle, primaryBtnText, secondaryBtnText }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-opacity-90 text-white shadow-lg relative">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary-600 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faPencilAlt} />
              {primaryBtnText}
            </button>
            <Link to="/search">
            <button className="bg-primary-900 bg-opacity-30 text-white border border-white border-opacity-30 px-6 py-3 rounded-full font-medium hover:bg-opacity-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} />
             {secondaryBtnText}
            </button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set Default Props (Optional)
HeroSection.defaultProps = {
  title: "Discover a World of Creativity",
  subtitle: "Explore unpublished stories, stunning artwork, and unique creations from talented creators around the world.",
  primaryBtnText: "Share Your Story",
  secondaryBtnText: "Explore Content",
};

export default HeroSection;
