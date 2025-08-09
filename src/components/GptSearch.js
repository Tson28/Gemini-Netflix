import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute w-full h-screen -z-10">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
