import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faFont,
  faTextHeight,
  faEdit,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const MyPost = () => {
  const [showStoryPad, setShowStoryPad] = useState(false);
  const [showDrawingPopup, setShowDrawingPopup] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [stories, setStories] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [fontStyle, setFontStyle] = useState("sans-serif");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textSize, setTextSize] = useState("16px");
  const [category, setCategory] = useState("Horror"); // Default category
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [editingStoryId, setEditingStoryId] = useState(null);

  const handleSendStory = () => {
    // Validate title
    if (storyTitle.length < 10 || storyTitle.length > 30) {
      setTitleError("Title must be between 10 and 30 characters.");
      return;
    } else {
      setTitleError("");
    }

    // Validate description
    if (storyDescription.length > 60) {
      setDescriptionError("Description must be less than 60 characters.");
      return;
    } else {
      setDescriptionError("");
    }

    if (storyTitle.trim() && storyContent.trim()) {
      if (editingStoryId) {
        // Update existing story
        const updatedStories = stories.map((story) =>
          story.id === editingStoryId
            ? {
                ...story,
                title: storyTitle,
                description: storyDescription,
                content: storyContent,
                fontStyle,
                isBold,
                isItalic,
                textSize,
                category,
              }
            : story
        );
        setStories(updatedStories);
        setEditingStoryId(null);
      } else {
        // Create new story
        const newStory = {
          id: Date.now(),
          title: storyTitle,
          description: storyDescription,
          content: storyContent,
          fontStyle,
          isBold,
          isItalic,
          textSize,
          category,
        };
        setStories([...stories, newStory]);
      }
      // Reset form
      setStoryTitle("");
      setStoryDescription("");
      setStoryContent("");
      setShowStoryPad(false);
    }
  };

  const handleEditStory = (story) => {
    // Load story data into the form
    setStoryTitle(story.title);
    setStoryDescription(story.description);
    setStoryContent(story.content);
    setFontStyle(story.fontStyle || "sans-serif");
    setIsBold(story.isBold || false);
    setIsItalic(story.isItalic || false);
    setTextSize(story.textSize || "16px");
    setCategory(story.category || "Horror");
    
    // Set editing mode
    setEditingStoryId(story.id);
    setShowStoryPad(true);
  };

  const handleSendDrawing = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDrawing = {
        id: Date.now(),
        image: URL.createObjectURL(file),
      };
      setDrawings([...drawings, newDrawing]);
      setShowDrawingPopup(false);
    }
  };

  // Clear form and reset editing state
  const cancelStoryPad = () => {
    setStoryTitle("");
    setStoryDescription("");
    setStoryContent("");
    setTitleError("");
    setDescriptionError("");
    setEditingStoryId(null);
    setShowStoryPad(false);
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Heading and Subtext */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Post Section</h2>
        <p className="text-gray-500">Send your content to get published.</p>
      </div>

      {/* Buttons for Send Story and Send Drawing */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setEditingStoryId(null);
            setStoryTitle("");
            setStoryDescription("");
            setStoryContent("");
            setShowStoryPad(true);
          }}
          className="px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send Story
        </button>
        <button
          onClick={() => setShowDrawingPopup(true)}
          className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Send Drawing
        </button>
      </div>

      {/* Notification if no posts */}
      {stories.length === 0 && drawings.length === 0 && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 text-center">
          <p className="text-gray-500">Still You Did Not Post Anything  😔</p>
        </div>
      )}

      {/* Story Writing Pad */}
      {showStoryPad && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => {
                  setStoryTitle(e.target.value);
                  if (e.target.value.length < 10 || e.target.value.length > 30) {
                    setTitleError("Title must be between 10 and 30 characters.");
                  } else {
                    setTitleError("");
                  }
                }}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Story Title"
                maxLength={30}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {storyTitle.length}/30
              </span>
            </div>
            {titleError && (
              <p className="text-sm text-red-600">{titleError}</p>
            )}
            <div className="relative">
              <input
                type="text"
                value={storyDescription}
                onChange={(e) => {
                  setStoryDescription(e.target.value);
                  if (e.target.value.length > 60) {
                    setDescriptionError("Description must be less than 60 characters.");
                  } else {
                    setDescriptionError("");
                  }
                }}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Story Description"
                maxLength={60}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {storyDescription.length}/60
              </span>
            </div>
            {descriptionError && (
              <p className="text-sm text-red-600">{descriptionError}</p>
            )}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
              <option value="Others">Others</option>
            </select>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsBold(!isBold)}
                className={`p-2 rounded-lg ${
                  isBold ? "bg-indigo-100" : "bg-gray-100"
                } hover:bg-indigo-100 transition-colors duration-200`}
              >
                <FontAwesomeIcon icon={faBold} className="text-indigo-600" />
              </button>
              <button
                onClick={() => setIsItalic(!isItalic)}
                className={`p-2 rounded-lg ${
                  isItalic ? "bg-indigo-100" : "bg-gray-100"
                } hover:bg-indigo-100 transition-colors duration-200`}
              >
                <FontAwesomeIcon icon={faItalic} className="text-indigo-600" />
              </button>
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 transition-colors duration-200 focus:outline-none dark:bg-gray-700 dark:text-white"
              >
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
              <select
                value={textSize}
                onChange={(e) => setTextSize(e.target.value)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100 transition-colors duration-200 focus:outline-none dark:bg-gray-700 dark:text-white"
              >
                <option value="14px">Small</option>
                <option value="16px">Medium</option>
                <option value="18px">Large</option>
              </select>
            </div>
            <textarea
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              className="w-full p-4 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              rows="6"
              placeholder="Write your story here..."
              style={{
                fontFamily: fontStyle,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                fontSize: textSize,
              }}
            ></textarea>
            <div className="flex space-x-4">
              <button
                onClick={handleSendStory}
                className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {editingStoryId ? "Update Story" : "Send Story"}
              </button>
              <button
                onClick={cancelStoryPad}
                className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawing Popup */}
      {showDrawingPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4">Upload Your Drawing</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleSendDrawing}
              className="mb-4"
            />
            <button
              onClick={() => setShowDrawingPopup(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{story.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{story.description}</p>
            <p className="text-sm text-gray-500 mb-4">{story.category}</p>
            <button
              onClick={() => handleEditStory(story)}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Display Drawing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {drawings.map((drawing) => (
          <div
            key={drawing.id}
            className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300"
          >
            <img
              src={drawing.image}
              alt="Drawing"
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyPost;