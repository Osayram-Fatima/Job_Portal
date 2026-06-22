import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import JobCard from "./JobCard";
import { FilterLogic } from "./FilterLogic";

const Main = () => {
  const { categoryName } = useParams(); // ✅ Get category from URL
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ Set category from URL or default to "All"
  const selectedCategory = categoryName || "All";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/jobs");
      
      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        console.error("Invalid response format:", response.data);
        setJobs([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs");
      setLoading(false);
    }
  };

  // ✅ Use filter logic with URL category
  const filteredJobs = FilterLogic(jobs, searchTerm, selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading Jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center">
          <p className="text-red-600 font-bold text-xl">{error}</p>
          <button 
            onClick={fetchJobs}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-[#003366] mb-4">
            Browse <span className="text-blue-600">Opportunities</span>
          </h1>
          <p className="text-slate-600 text-lg">
            {filteredJobs.length} Jobs Available
            {selectedCategory !== "All" && (
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                {selectedCategory}
              </span>
            )}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search jobs, companies, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          // Replace the "No jobs found" section with this:

<div className="text-center py-20">
  {/* Animated Magnifying Glass */}
  <div className="flex justify-center mb-8">
    <div className="relative animate-bounce">
      <svg 
        className="w-24 h-24 text-slate-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" strokeWidth="2" />
        <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {/* Pulsing Circle Effect */}
      <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping"></div>
    </div>
  </div>

  {/* Text Content */}
  <p className="text-slate-400 text-2xl font-bold mb-3">
    No Jobs Found 😔
  </p>
  
  {selectedCategory !== "All" && (
    <p className="text-slate-500 text-lg">
      No jobs available in{" "}
      <span className="font-black text-blue-600 text-xl">
        {selectedCategory}
      </span>{" "}
      category
    </p>
  )}
  
  <p className="text-slate-400 text-sm mt-4 italic">
    Try selecting a different category or check back later!
  </p>
</div>
        ) : (
          <div>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;