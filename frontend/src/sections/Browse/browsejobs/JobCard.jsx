import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="group relative mb-8">
      {/* 1. Main White Card */}
      {/* Added: group-hover:rounded-b-none takay niche se blue box ke sath "jud" jaye */}
      <div className="relative z-30 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between transition-all duration-300 group-hover:shadow-lg group-hover:rounded-b-none">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 p-4 flex items-center justify-center border border-slate-100 shadow-inner">
            <img
              src={`/sections/logos/${job.logo_url}`}
              alt={job.company}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#003366] tracking-tight">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <span className="text-slate-400 font-bold text-sm">
                🏢 {job.company}
              </span>
              <span className="text-slate-400 font-bold text-sm">
                📍 {job.location}
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                {job.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
          <div className="text-right">
            <p className="text-[#003366] font-black text-lg">
              PKR {job.salary}
            </p>
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              ⏳ Deadline: {job.deadline}
            </span>
          </div>
          <Link
            to={`/apply/${job.id}`}
            className="px-10 py-3 bg-[#003366] text-white font-black rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/20 text-sm"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* 2. The Blue Drawer (Seamlessly Linked) */}
      <div
        className="relative z-20 -mt-2 overflow-hidden max-h-0 opacity-0 
     group-hover:max-h-[400px] group-hover:opacity-100 group-hover:translate-y-0 
     -translate-y-4 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ease-in-out"
      >
        {" "}
        <div className="bg-[#003366] px-10 py-10 pt-8 rounded-b-[2rem] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col border-r border-blue-400/20 pr-4">
              <span className="text-blue-300 text-[9px] font-black uppercase tracking-widest mb-2">
                Education Required
              </span>
              <p className="text-white text-xs font-medium leading-relaxed italic">
                {job.education_req || "Refer to description"}
              </p>
            </div>

            <div className="flex flex-col border-r border-blue-400/20 pr-4">
              <span className="text-blue-300 text-[9px] font-black uppercase tracking-widest mb-2">
                Key Skills
              </span>
              <p className="text-white text-xs font-medium leading-relaxed italic">
                {job.skills_req || "Relevant technical skills"}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-blue-300 text-[9px] font-black uppercase tracking-widest mb-2">
                Age Limit
              </span>
              <p className="text-white text-xs font-medium leading-relaxed italic">
                {job.age_req || "Not Specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
