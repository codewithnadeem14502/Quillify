import React from "react";
const truncateText = (text, wordsCount) => {
  const words = text.split(" ");
  if (words.length > wordsCount) {
    return words.slice(0, wordsCount).join(" ") + "...";
  }
  return text;
};
const Post = ({ id, file, title, description }) => {
  return (
    <div
      key={id}
      className="flex flex-col mb-8 p-6 bg-white rounded-lg hover:shadow-lg transition duration-300 border border-gray-300 sm:flex-row"
    >
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          src={`http://localhost:5000/Images/${file}`}
          alt={title}
          className="w-full h-60 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        {/* <p className="text-gray-600">{description}</p> */}
        {truncateText(description, 80)}
        <span className="text-blue-500 cursor-pointer ml-1">Read More</span>
      </div>
    </div>
  );
};

export default Post;
