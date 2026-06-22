import React from 'react';
import { Link } from "react-router-dom";

const Catnav = () => {
  // Array mein wahi spellings likho jo Database mein hain
  const categories = [
    "Government", "Private", "Federal", "PAF", "Navy", "Army", "Technology", "Railway", "INTERNSHIP"
  ];

  return (
    <nav className="fixed w-full bg-[#043f78] border-y border-white/5 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-8 py-3 px-4 overflow-x-auto no-scrollbar">
        
        {/* All Jobs Link (Wapis sab dikhane ke liye) */}
        <Link to="/browser" className="text-white text-[10px] md:text-xs font-bold font-Nunito tracking-widest hover:text-blue-400">
          ALL
        </Link>

        {categories.map((item) => (
          <Link
            key={item}
            // Yahan hum /jobs/ use kar rahe hain jo App.jsx se match karega
            to={`/jobs/${item}`} 
            className="text-white text-[10px] md:text-xs font-bold font-Nunito tracking-widest whitespace-nowrap hover:text-blue-400 transition-colors duration-300"
          >
            {item.toUpperCase()}
          </Link>
        ))}
        
        
      </div>
    </nav>
  );
};

export default Catnav;