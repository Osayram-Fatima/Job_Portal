import React from "react";
import { Link } from "react-router-dom";
import JobCard from "../browsejobs/JobCard"; // Folder se bahar nikal kar browsejobs mein gaya

const Content = ({ jobs }) => {
  // Agar search se data aya hai toh wo dikhao, warna khali array rakho
  const displayList = jobs || [];

  return (
    <div className="relative w-full pt-32 pb-20 flex flex-col items-center">
      
      {/* --- Main Heading Section (UNTOUCHED) --- */}
      <div className=" cursor-default flex flex-col items-center justify-center px-4 max-w-5xl">
        <span className="bg-[#043b70] text-white text-[10px] font-bold tracking-[0.4em] uppercase px-4 py-1 rounded-full mb-6">
          Pakistan's #1 Job Portal
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black text-white text-center leading-[0.9] tracking-tighter">
          FIND YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white italic">
            DREAM
          </span> JOB
        </h1>
        
        <p className="text-blue-100/60 text-center mt-6 text-sm md:text-xl max-w-xl font-medium leading-relaxed">
          Connecting Pakistan's top talent with the most prestigious 
          Government and Private sectors.
        </p>
      </div>

      {/* --- Buttons Grid (Animations Preserved) --- */}
      <div className="flex flex-wrap justify-center gap-8 mt-8 px-6 w-full max-w-7xl">
        
        {/* City Button */}
        <Link  className="group">
          <div className="bg-white cursor-default rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[1.8rem] border-2 border-gray-50 group-hover:border-[#043b70] transition-all">
              <div className="bg-[#043b70] p-4 rounded-2xl shadow-lg shadow-[#043b70]/30 transition-transform group-hover:rotate-12">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#043b70]/50 font-bold tracking-widest uppercase">Explore Locations</span>
                <span className="text-[#043b70] text-2xl font-black tracking-tight">BY CITY</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category Button */}
        <Link  className="group">
          <div className="bg-white cursor-default rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
            <div className="flex items-center gap-6 bg-white px-4 py-4 rounded-[1.8rem] border-2 border-gray-50 group-hover:border-[#043b70] transition-all">
              <div className="bg-[#043b70] p-4 rounded-2xl shadow-lg shadow-[#043b70]/30 transition-transform group-hover:rotate-12">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#043b70]/50 font-bold tracking-widest uppercase">Select Sector</span>
                <span className="text-[#043b70] text-2xl font-black tracking-tight">BY CATEGORY</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Education Button */}
        <Link  className="group">
          <div className="bg-white cursor-default rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[1.8rem] border-2 border-gray-50 group-hover:border-[#043b70] transition-all">
              <div className="bg-[#043b70] p-4 rounded-2xl shadow-lg shadow-[#043b70]/30 transition-transform group-hover:rotate-12">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#043b70]/50 font-bold tracking-widest uppercase">Based on Degree</span>
                <span className="text-[#043b70] text-2xl font-black tracking-tight">BY EDUCATION</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* --- Proper Logic Section: Results Grid --- */}
      {displayList.length > 0 && (
        <div className="mt-24 w-full max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-blue-400 pl-4 tracking-tight">
             SEARCH RESULTS
          </h2>
          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayList.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}

      {/* If No Results Found */}
      {jobs && displayList.length === 0 && (
        <div className="mt-20 text-blue-200/50 text-xl font-medium italic">
          No matching jobs found for your search.
        </div>
      )}

    </div>
  );
};

export default Content;