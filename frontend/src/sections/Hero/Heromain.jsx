import React from "react";
import Searchbar from "./Searchbar";
import UploadCV from "./Uploadcv";

const Heromain = () => {
  return (
    <div
      className="flex flex-col cursor-default pt-10 items-center
     "
    >
      {/* Text */}
      <div
        className="
        text-white  
        flex flex-col    items-center 
        relative top-5"
      >
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-center max-w-3xl">
   Find Your <span className="text-blue-400">Career.</span> <br /> You Deserve It
</h1>

<p className="mt-8 font-medium text-gray-300 text-sm md:text-lg max-w-2xl text-center leading-relaxed">
   Welcome to Jtech, where your career goals meet next-gen opportunities. 
   Your journey to excellence starts here.
</p>

      </div>

      {/* Search Bar  */}
      {/* <div className="mt-8">
        <Searchbar />
      </div> */}

        <div>
          <UploadCV />    
        </div>

      {/* Icons */}
      <div></div>
    </div>
  );
};

export default Heromain;
