import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../../Nav/Profile/ProfileDropdown.jsx";

const Upnav = () => {
  return (
    <nav className="fixed z-40 text-[#043f78]   w-full     h-18 flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between bg-white backdrop-blur-md border border-gray-200 px-6 h-full  shadow-xl">
        <div className="relative h-full flex justify-center top-2 items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/sections/Browser/logo.png"
              alt="Tech Logo"
              className="h-35  object-contain absolute left-0 top-1/2 -translate-y-1/2 max-w-none"
            />
          </Link>
        </div>

        <div className="flex items-center gap-6 relative ml-auto">
          <Link
            to="/"
            className="  text-sm md:text-base hover:text-black font-bold tracking-tight relative group"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/post-job"
            className="  text-sm md:text-base hover:text-black font-bold tracking-tight relative group"
          >
            POST A JOB
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/cv"
            className="  text-sm md:text-base hover:text-black font-bold tracking-tight relative group"
          >
            Create CV
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden focus-within:border-blue-500 transition-all">
            <input
              className="bg-transparent  text-sm px-4 py-2 outline-none placeholder:text-gray-500 w-32 md:w-56"
              type="text"
              placeholder="Search..."
            />
            <button className="bg-[#043f78] text-white px-5 py-2 text-sm font-bold uppercase hover:bg-blue-600 transition-colors">
              GO
            </button>
          </div>
<div className="relative">
  <ProfileDropdown className="absolute right-0 top-full z-50
" userName="Shenum" />
</div>        </div>
      </div>
    </nav>
  );
};

export default Upnav;
