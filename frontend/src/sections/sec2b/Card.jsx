import React from "react";
import { Link } from "react-router-dom";
const Card = ({ icon, name, jobsAvailable, skills }) => {
  return (
    <div className="group relative  flex h-full w-full max-w-[260px] flex-col items-center overflow-hidden rounded-[40px] border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* 3D Glassy Glow Background */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#183168]/5 blur-3xl transition-all duration-500 group-hover:bg-[#183168]/15" />

      {/* Icon Area - Ab ye 3D look dega */}
      <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[30px] transition-transform duration-500 group-hover:scale-110 ">
        {/* Soft Shadow behind icon */}
        <div className="absolute h-12 w-12 rounded-full bg-[#183168]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

        <img
          src={icon}
          alt={name}
          className="relative z-10 h-26 w-20 object-contain drop-shadow-md"
        />
      </div>

      {/* Title Section */}
      <div className="mb-2 min-h-[50px] flex items-center justify-center">
        <h3 className="text-lg font-extrabold leading-tight text-[#183168] group-hover:text-blue-900">
          {name}
        </h3>
      </div>

      {/* Jobs Badge */}
      <span className="inline-block rounded-full bg-[#183168] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-[#183168]/20">
        {jobsAvailable} Jobs Available
      </span>

      {/* Skills List */}
      <p className="my-5 min-h-[36px] px-2 text-[11px] font-medium leading-relaxed text-gray-400 line-clamp-2">
        {skills.map((skill, index) => (
          <span key={index}>
            {skill}
            {index !== skills.length - 1 && (
              <span className="mx-1 text-gray-200">|</span>
            )}
          </span>
        ))}
      </p>

      {/* Action Button - Fully Interactive */}
     <Link to="/browser"><button className="mt-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-[#183168] shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:bg-[#183168] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#183168]/40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button></Link> 
    </div>
  );
};

export default Card;
