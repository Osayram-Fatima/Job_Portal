// Register.jsx
import React from "react";
import NavCand from "./NavCand";
import NavEmp from "./NavEmp";
import { Link } from "react-router-dom";
const Register = () => {
  return (
     <div
      className="min-h-screen  scale-110  inset-0 overflow-y-hidden
       flex items-center justify-center flex-col
       bg-center bg-cover  bg-[url('/sections/Hero/HeroChild/bg.png')]"
    >

      {/* Sub Container */}
      <div className="flex flex-col md:flex-row  ">
        <div
          className="            
          cursor-pointer  hover:translate-x-4 duration-500 transition-all"
        >
        <NavEmp />
        </div>
        <div
          className="  cursor-pointer  hover:-translate-x-4 duration-500 transition-all"
        >
          <NavCand />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 z-10">
        <Link to="/" className="group flex items-center gap-2 text-slate-800 hover:text-white transition-all font-medium">
            <span className="uppercase tracking-widest text-[12px]">Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
