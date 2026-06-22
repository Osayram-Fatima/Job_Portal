import React from 'react'
import { Link } from 'react-router-dom';
const Card = ({ icon, title, priceRange, description }) => {
  return (
 
 <div className="bg-white rounded-4xl p-6 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[280px] flex flex-col items-center text-center border border-gray-100 group">
      
      {/* Icon Section*/}
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300  p-2 ">
        <img src={icon} alt={title} className="w-30 h-20 object-contain" />
      </div>

      {/* Title */}
      <h3 className="text-[#183168] text-xl font-bold mb-1">
        {title}
      </h3>

      {/* Subtitle/Price  */}
      <span className="
  inline-block mt-3 px-4 py-1.5
  text-sm font-semibold
  text-white
  bg-[#183168]
  rounded-full
  tracking-wide
">
  {priceRange}
</span>

      {/* Description */}
      <p className="text-gray-400 text-xs leading-relaxed mb-6 py-2 px-2">
        {description}
      </p>

      {/* Action Button*/}<Link to="/apply/:jobId"><button className="mt-auto w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#183168] group-hover:text-white group-hover:border-white transition-colors duration-300">
       <span className="text-lg font-bold">→</span>
      </button></Link> 
      
    </div>
  );
};

export default Card;