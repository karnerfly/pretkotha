const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-opacity-90 text-white shadow-lg relative">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Discover a World of Creativity
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8">
                        Explore unpublished stories, stunning artwork, and unique creations from talented creators around the world.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-primary-600 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                            <i className="fas fa-pencil-alt"></i>
                            Share Your Story
                        </button>
                        <button className="bg-primary-900 bg-opacity-30 text-white border border-white border-opacity-30 px-6 py-3 rounded-full font-medium hover:bg-opacity-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                            <i className="fas fa-search"></i>
                            Explore Content
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
