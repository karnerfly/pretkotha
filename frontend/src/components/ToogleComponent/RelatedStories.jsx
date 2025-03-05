const relatedStories = [
    {
      title: "The Silent Garden",
      description: "A mystical journey through a garden of forgotten memories...",
      image: "/api/placeholder/400/250",
    },
    {
      title: "Echoes of Tomorrow",
      description: "A sci-fi adventure that questions the nature of reality...",
      image: "/api/placeholder/400/250",
    },
    {
      title: "Beneath the Waves",
      description: "An underwater discovery changes everything for a small coastal town...",
      image: "/api/placeholder/400/250",
    },
  ];
  
  const RelatedStories = () => {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((story, index) => (
            <RelatedStoryCard key={index} story={story} />
          ))}
        </div>
      </div>
    );
  };
  
  const RelatedStoryCard = ({ story }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="relative">
          <img src={story.image} alt={story.title} className="w-full h-40 object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors">
            {story.title}
          </h3>
          <p className="text-gray-600 text-sm">{story.description}</p>
        </div>
      </div>
    );
  };
  
  export default RelatedStories;
  