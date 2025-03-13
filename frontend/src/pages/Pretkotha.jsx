import React, { useState } from "react";

// JSON data for YouTube videos
const videosData = [
  {
    id: 1,
    title: "Episode 1",
    description: "সত্যি ভূতের গল্প । প্রেতকথার প্রথম এপিসোড | Pretkotha | Episode 1 | Gourab Tapadar",
    thumbnail: "https://img.youtube.com/vi/LQdTpwAAAos/sddefault.jpg",
    link: "https://www.youtube.com/embed/LQdTpwAAAos?si=8KBgdsLYQR0x4zLF",
  },
  {
    id: 2,
    title: "Episode 2",
    description: "দুটি সত্যি ভৌতিক ঘটনা | @Pretkotha Live Episode 2 | Special Episode | Black Magic ও আলেয়ার ঘটনা",
    thumbnail: "https://i3.ytimg.com/vi/1kO0PYGlOWE/hqdefault.jpg",
    link: "https://www.youtube.com/embed/1kO0PYGlOWE?si=O5artd0VGjTLPVJ3",
  },
  {
    id: 3,
    title: "Episode 3",
    description: "প্রেতকথা এপিসোড ৩ | Pretkotha with Gourab | Episode 3 | Bengali Horror Story",
    thumbnail: "https://i3.ytimg.com/vi/_Syk-cmUVPs/hqdefault.jpg",
    link: "https://www.youtube.com/embed/_Syk-cmUVPs?si=uofjVhZDUjqWMvSy",
  },
  {
    id: 4,
    title: "Episode 4",
    description: "সত্যি ভৌতিক ঘটনা | @Pretkotha Live Episode 4 | অভিশপ্ত পুকুরের ঘটনা | True Bengali Horror Story",
    thumbnail: "https://i3.ytimg.com/vi/aMTlVhr53VI/hqdefault.jpg",
    link: "https://www.youtube.com/embed/aMTlVhr53VI?si=nOCpGwOcTy36JVWl",
  },
  {
    id: 5,
    title: "Episode 5",
    description: "ট্রেনে কাঁটা পড়া লাশের ঘটনা | Pretkotha Episode 5 | Gourab Tapadar | Bengali Horror Story",
    thumbnail: "https://i3.ytimg.com/vi/MLcS78M9Nj8/hqdefault.jpg",
    link: "https://www.youtube.com/embed/MLcS78M9Nj8?si=CFSgeCbuCDe1-jDo",
  },
  
];

const YouTubePretkotha = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video for popup
  const videosPerPage = 15; // Number of videos per page

  // Filter videos based on search query
  const filteredVideos = videosData.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle video selection
  const handleWatchNow = (videoLink) => {
    setSelectedVideo(videoLink);
  };

  // Close popup
  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full transition-all duration-300 dark:text-white text-gray-800 p-6 dark:bg-gray-900 pt-20">
      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Listen Pretkotha</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Explore and listen our youtube pretkotha episode directly in our website.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search videos by episode number..."
            className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-all duration-300 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 dark:text-white">{video.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                {video.description}
              </p>

              {/* Watch Now Button */}
              <button
                onClick={() => handleWatchNow(video.link)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Watch Now
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }).map(
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                } hover:bg-indigo-600 hover:text-white transition-colors duration-200`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </main>

      {/* Video Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Embedded Video (Iframe) */}
            <iframe
              src={selectedVideo}
              title="YouTube Video"
              className="w-full h-64 md:h-96 rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubePretkotha;