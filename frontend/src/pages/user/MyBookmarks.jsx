import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = React.useState([]); // Replace with actual bookmarked content

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold flex items-center">
          <FontAwesomeIcon icon={faBookmark} className="mr-2 text-indigo-600" />
          Your Bookmarked Content
        </h2>
        <p className="text-gray-500">All your saved content in one place.</p>
      </div>

      {/* Bookmarked Content */}
      {bookmarks.length === 0 ? (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 text-center">
          <p className="text-gray-500">You did not bookmark anything yet. ❌</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{bookmark.title}</h3>
              <p className="text-gray-500">{bookmark.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* What is Bookmark? Section */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h3 className="text-xl font-bold flex items-center mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-indigo-600" />
          What is Bookmark?
        </h3>
        <p className="text-gray-500 mb-4">
          Bookmarks allow you to save and organize content that you find interesting or
          useful. You can easily access your saved content anytime without having to
          search for it again.
        </p>
        <h4 className="text-lg font-bold mb-2">Why is it Beneficial?</h4>
        <ul className="list-disc list-inside text-gray-500">
          <li>
            <strong>Save Time:</strong> Quickly access your favorite content without
            searching.
          </li>
          <li>
            <strong>Stay Organized:</strong> Keep all your important content in one place.
          </li>
          <li>
            <strong>Never Lose Track:</strong> Easily find content you want to revisit
            later.
          </li>
        </ul>
      </div>
    </main>
  );
};

export default BookmarkPage;