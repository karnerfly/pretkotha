import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const HeroSection = ({ title, subtitle, primaryBtnText, secondaryBtnText, backgroundImage, rotatingWords }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentWord = rotatingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentWord) {
      // Wait before starting to delete
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && displayText === "") {
      // Move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentWord.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentWordIndex, isDeleting, rotatingWords]);

  // Split the title to insert the typing animation
  const titleParts = title.split('of');
  const firstPart = titleParts[0] + 'of';

  return (
    <div
      className="relative text-white w-full h-screen flex items-center justify-start overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-wide drop-shadow-lg">
            {firstPart}{' '}
            <span className="text-yellow-300 inline-block min-w-[200px] h-[1.5em] overflow-hidden">
              {displayText}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-3 text-lg">
              <FontAwesomeIcon icon={faPencilAlt} />
              {primaryBtnText}
            </button>
            <Link to="/search">
              <button className="bg-transparent backdrop-blur-sm border-2 border-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center gap-3 text-lg">
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

// Set Default Props
HeroSection.defaultProps = {
  title: "Discover a World of .. ",
  subtitle: "Explore unpublished stories, stunning artwork, and unique creations from talented creators around the world.",
  primaryBtnText: "Share Your Story",
  secondaryBtnText: "Explore Content",
  backgroundImage: "https://images.pexels.com/photos/970517/pexels-photo-970517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  rotatingWords: ["Creativity", "Horror", "Stories", "Imagination", "Art"]
};

export default HeroSection;
