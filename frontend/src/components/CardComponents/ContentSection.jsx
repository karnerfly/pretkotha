import ContentCard from "./ContentCard";
import cardData from "../../api/cardData.json";
import { useEffect, useState } from "react";

const ContentSection = ({ filter, setTotalItem }) => {
  const [data, setData] = useState(cardData);
  useEffect(() => {
    var d;

    switch (filter) {
      case "stories":
        d = cardData.filter((item) => item.type === "story");
        setData(d);
        break;
      case "drawings":
        d = cardData.filter((item) => item.type === "drawing");
        setData(d);
        break;
      case "others":
        d = cardData.filter((item) => item.type === "other");
        setData(d);
        break;
      default:
        d = cardData;
        setData(d);
    }

    setTotalItem(d.length);
  }, [filter]);

  return (
    <div id="contentContainer" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <ContentCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
