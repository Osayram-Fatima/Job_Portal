// Nav.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./Profile/ProfileDropdown";

const Nav = () => {
  const handleJobClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("job-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplicationClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("application-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("categories-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    const section = document.getElementById("resume-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50  ">
      <div
        className="mx-auto max-w-7xl h-20 px-6 md:px-10 
           flex items-center  justify-between rounded-b-[30px] md:rounded-b-[84px]
           bg-[#0b1e47] border border-white/10 shadow-xl"
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <img
            src="/sections/Hero/logo.png"
            alt="Logo"
            className="w-24 md:w-32 object-contain"
          />
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center justify-center flex-1 text-[14px] gap-10 xl:gap-12 font-medium text-slate-300">
          <Link
            to="/"
            className="hover:text-white transition tracking-widest 
          cursor-pointer
            border-b-1 border-transparent hover:border-white"
          
        >
            HOME
          </Link>

          <button
            type="button"
            onClick={handleCategoriesClick}
            className="hover:text-white transition tracking-widest 
            cursor-pointer
            border-b-1 border-transparent hover:border-white"
          >
            CATEGORIES
          </button>

          <button
            type="button"
            onClick={handleJobClick}
            className="hover:text-white tracking-widest border-b-2 border-transparent hover:border-white transition-all duration-300"
          >
            JOB
          </button>

          <button
            type="button"
            onClick={handleApplicationClick}
            className="hover:text-white transition tracking-widest 
            cursor-pointer
            border-b-1 border-transparent hover:border-white"
          >
            APPLICATION
          </button>

          <button
            type="button"
            onClick={handleResumeClick}
            className="hover:text-white transition tracking-widest 
             cursor-pointer
           border-b-1 border-transparent hover:border-white"
          >
            RESUME
          </button>
        </div>

        {/* Buttons */}
     
        <div className="flex  items-center gap-3 md:gap-5">
         <Link to="/browser" >  <button className="hidden cursor-pointer
            sm:block border border-white/20 bg-blue-600 text-white px-3 py-2 rounded-full font-semibold text-xs md:text-sm hover:bg-white hover:text-[#021836] hover:font-bold transition-all duration-300">
           Browse Jobs
          </button>
          </Link>
          <Link to="/register">
            <button className="bg-white cursor-pointer
            text-[#021836] px-5 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg">
              Register
            </button>
          </Link>
           <ProfileDropdown userName="Shenum" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
