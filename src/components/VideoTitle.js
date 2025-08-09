import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="py-6 text-md w-1/3">{overview?.slice(0, 150)}...</p>
      <div className="flex">
        <button className="bg-white text-black p-4 px-7 py-2 text-xl inline-flex rounded-lg hover:bg-opacity-80">
          <svg
            className="w-7 h-7 fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <polygon points="8,5 19,12 8,19" />
          </svg>
          Play
        </button>
        <button className=" bg-gray-700 mx-2 text-white p-4 px-3 py-2 text-xl opacity-90 inline-flex rounded-lg hover:bg-opacity-80">
          <svg
            className="w-8 h-8 fill-current text-white mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="black"
              fontSize="12"
              fontFamily="Arial"
              fontWeight="bold"
            >
              i
            </text>
          </svg>
          <span className="text-white">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
