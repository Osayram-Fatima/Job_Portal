import React from "react";
import ResumeUpload from './ResumeUpload'

const SecRight = () => {
  return (
    <div
      className="flex   justify-center items-center 
    min-h-screen p-15 w-[50vw]"
    >
      <div className="flex flex-col  gap-2 ">
        <a className=" text-[#183168da] uppercase tracking-widest text-sm ">SKIP THE SHORTLISTING</a>
        <h1 className="mt-2 text-5xl leading-tight font-franklin text-[#183168]">Let Your Resume Do The Talking.</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-[#183168]/90">
          Just upload your resume and let our smart engine bridge the gap
          between your skills and top-tier industrial opportunities. 
          We don't
          just find you a job; we connect you directly to the corporate world
          where your talent is already in demand.
        </p>
   <ResumeUpload />
 
      </div>
    </div>
  );
};

export default SecRight;
