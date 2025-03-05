const CommentsSection = () => {
    return (
      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <div className="mb-6">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Post Comment
            </button>
          </div>
        </div>
  
        <div className="space-y-4">
          <Comment
            name="Sarah Johnson"
            text="This story touched my heart. The way you described the main character's journey was beautiful."
            date="2 days ago"
          />
          <Comment
            name="Michael Chen"
            text="I loved the plot twist at the end! Didn't see that coming at all."
            date="1 day ago"
          />
        </div>
      </div>
    );
  };
  
  const Comment = ({ name, text, date }) => {
    return (
      <div className="flex gap-3">
        <img src="/api/placeholder/40/40" alt="Commenter" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">{name}</p>
            <p className="text-gray-700">{text}</p>
          </div>
          <div className="flex text-sm text-gray-500 mt-1">
            <span className="mr-4">{date}</span>
            <button className="hover:text-primary-600">Reply</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CommentsSection;
  