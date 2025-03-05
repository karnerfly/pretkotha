import ContentCard from "./ContentCard";
import { faArrowRight, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

const ContentGrid = () => {
    const contentData = [
        {
            type: "story",
            title: "The Lost Key",
            description: "A mysterious adventure about a key that unlocks forgotten memories...",
            image: "https://cdn.pixabay.com/photo/2025/02/22/08/35/mountain-9423779_1280.jpg",
            views: 487,
            likes: 124,
            tag: "Story",
            featured: false,
            actionText: "Read Story",
            actionIcon: faArrowRight
        },
        {
            type: "drawing",
            title: "Ocean Dreams",
            description: "Watercolor painting of ocean waves at sunset",
            image: "https://cdn.pixabay.com/photo/2016/11/29/12/28/chalks-1869492_640.jpg",
            views: 652,
            likes: 211,
            tag: "Drawing",
            featured: false,
            actionText: "View Full Size",
            actionIcon: faExpandAlt
        },
        {
            type: "story",
            title: "The Quantum Detective",
            description: "A science fiction mystery where reality itself is the prime suspect...",
            image: "https://cdn.pixabay.com/photo/2025/02/02/01/12/woman-9375864_960_720.jpg",
            views: 842,
            likes: 315,
            tag: "Story",
            featured: true,
            actionText: "Read Story",
            actionIcon: faArrowRight
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentData.map((item, index) => (
                <ContentCard key={index} {...item} />
            ))}
        </div>
    );
};

export default ContentGrid;
