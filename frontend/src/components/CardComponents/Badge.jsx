const Badge = ({ text, color }) => {
    return (
        <div className={`absolute top-2 right-2 ${color} text-white text-xs px-2 py-1 rounded-full`}>
            {text}
        </div>
    );
};

export default Badge;
