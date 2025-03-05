import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons";

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      text: "This story touched my heart. The way you described the main character's journey was beautiful.",
      date: "2 days ago",
      likes: 2,
      replies: [],
      showReplyInput: false,
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "I loved the plot twist at the end! Didn't see that coming at all.",
      date: "1 day ago",
      likes: 1,
      replies: [],
      showReplyInput: false,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // Handle new comment submission
  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: Date.now(),
          name: "Anonymous User",
          text: newComment,
          date: "Just now",
          likes: 0,
          replies: [],
          showReplyInput: false,
        },
      ]);
      setNewComment("");
    }
  };

  // Handle like
  const handleLike = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  // Handle reply input toggle
  const toggleReplyInput = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, showReplyInput: !comment.showReplyInput } : comment
      )
    );
  };

  // Handle posting a reply
  const handlePostReply = (id, replyText) => {
    if (replyText.trim() !== "") {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  { id: Date.now(), name: "Anonymous User", text: replyText, date: "Just now" },
                ],
                showReplyInput: false,
              }
            : comment
        )
      );
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {/* New Comment Input */}
      <div className="mb-6">
        <textarea
          placeholder="Share your thoughts..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePostComment}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={() => handleLike(comment.id)}
            onReply={() => toggleReplyInput(comment.id)}
            onPostReply={handlePostReply}
          />
        ))}
      </div>
    </div>
  );
};

// Comment Component
const Comment = ({ comment, onLike, onReply, onPostReply }) => {
  const [replyText, setReplyText] = useState("");

  return (
    <div className="flex gap-3">
      <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-medium">{comment.name}</p>
          <p className="text-gray-700">{comment.text}</p>
        </div>
        <div className="flex text-sm text-gray-500 mt-1 space-x-4">
          <span>{comment.date}</span>
          <button onClick={onLike} className="hover:text-red-500 flex items-center space-x-1">
            <FontAwesomeIcon icon={faHeart} />
            <span>{comment.likes}</span>
          </button>
          <button onClick={onReply} className="hover:text-primary-600 flex items-center space-x-1">
            <FontAwesomeIcon icon={faReply} />
            <span>Reply</span>
          </button>
        </div>

        {/* Reply Input */}
        {comment.showReplyInput && (
          <div className="mt-2 ml-8">
            <textarea
              placeholder="Write a reply..."
              className="w-full p-2 border rounded-lg"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  onPostReply(comment.id, replyText);
                  setReplyText("");
                }}
                className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700"
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {/* Replies List */}
        {comment.replies.length > 0 && (
          <div className="mt-3 ml-8 space-y-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-3">
                <img src="/api/placeholder/30/30" alt="User" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 p-2 rounded-lg">
                  <p className="font-medium text-sm">{reply.name}</p>
                  <p className="text-gray-700 text-sm">{reply.text}</p>
                  <span className="text-xs text-gray-500">{reply.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
