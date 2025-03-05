import React, { useState } from 'react';
import { FaArrowLeft, FaBookmark, FaHeart, FaShareAlt, FaEye } from 'react-icons/fa';

const StoryRead = () => {
  // Placeholder state (you'll replace these with actual data fetching)
  const [story, setStory] = useState({
    id: 1,
    title: "Journey of a Lifetime",
    content: "Long story content goes here...",
    author: {
      name: "Emma Richardson",
      avatar: "/api/placeholder/40/40"
    },
    date: "March 5, 2024",
    viewCount: 1245,
    likeCount: 356
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      text: "This story touched my heart. The way you described the main character's journey was beautiful.",
      timestamp: "2 days ago"
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/api/placeholder/40/40",
      text: "I loved the plot twist at the end! Didn't see that coming at all.",
      timestamp: "1 day ago"
    }
  ]);

  const [relatedStories, setRelatedStories] = useState([
    {
      id: 1,
      title: "The Silent Garden",
      description: "A mystical journey through a garden of forgotten memories...",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Echoes of Tomorrow",
      description: "A sci-fi adventure that questions the nature of reality...",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Beneath the Waves",
      description: "An underwater discovery changes everything for a small coastal town...",
      image: "/api/placeholder/400/250"
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment.trim()) {
      const commentToAdd = {
        id: comments.length + 1,
        author: "Current User", // Replace with actual user
        avatar: "/api/placeholder/40/40",
        text: newComment,
        timestamp: "Just now"
      };
      setComments([...comments, commentToAdd]);
      setNewComment('');
    }
  };

  const handleGoBack = () => {
    // Implement navigation back to previous page
    // This could be using React Router or your navigation method
    window.history.back();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back and Social Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button 
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
          onClick={handleGoBack}
        >
          <FaArrowLeft className="mr-2" />
          Back to list
        </button>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FaBookmark />
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FaHeart />
          </button>
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <FaShareAlt />
          </button>
        </div>
      </div>
      
      {/* Story Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          {story.title}
        </h1>
        
        {/* Author and Metadata */}
        <div className="flex items-center text-gray-500 mb-6">
          <img 
            src={story.author.avatar} 
            alt={story.author.name} 
            className="w-10 h-10 rounded-full mr-3" 
          />
          <div>
            <p className="font-medium text-gray-700">{story.author.name}</p>
            <p className="text-sm">{story.date}</p>
          </div>
          <div className="ml-auto flex items-center">
            <FaEye className="mr-1" />
            <span className="mr-4">{story.viewCount}</span>
            <FaHeart className="mr-1" />
            <span>{story.likeCount}</span>
          </div>
        </div>
        
        {/* Story Content */}
        <div className="prose max-w-none text-gray-700 mb-8">
          {story.content}
        </div>
        
        {/* Comments Section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Comments</h3>
          <div className="mb-6">
            <textarea 
              placeholder="Share your thoughts..." 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                onClick={handlePostComment}
              >
                Post Comment
              </button>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img 
                  src={comment.avatar} 
                  alt={comment.author} 
                  className="w-10 h-10 rounded-full" 
                />
                <div className="flex-1">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                  <div className="flex text-sm text-gray-500 mt-1">
                    <span className="mr-4">{comment.timestamp}</span>
                    <button className="hover:text-primary-600">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Related Stories */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((story) => (
            <div 
              key={story.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-40 object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryRead;