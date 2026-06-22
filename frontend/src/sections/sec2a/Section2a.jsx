// Section2a.jsx
import React from "react";
import Employee from "./Employee";
import Candidate from "./Candidate";

const Section2a = () => {
  return (
    <div
      id="application-section"
      className="p-13 bg-center brightness-90 
       bg-cover flex h-auto justify-center items-center gap-15"
    >
      <div className="cursor-pointer hover:-translate-x-4  duration-500 transition-all">
        <Employee />
      </div>
      <div className="cursor-pointer hover:-translate-x-4 duration-500 transition-all">
        <Candidate />
      </div>
    </div>
  );
};

export default Section2a;
