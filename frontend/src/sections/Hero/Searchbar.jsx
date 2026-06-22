import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Searchbar = ({ allJobs }) => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    // Logic check: data hai ya nahi
    if (!allJobs || !Array.isArray(allJobs)) {
      console.error("Shenum! allJobs array missing hai.");
      return;
    }

    const filtered = allJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (location === "" || job.location === location) &&
        (category === "" || job.category === category)
      );
    });
    
    // Navigate with design-safe data transfer
    navigate('/browse', { state: { results: filtered } });
  };

  return (
    <div className="flex justify-around items-center gap-2 px-6 py-3 shadow-[0_20px_50px_rgba(0,0,3,0.9)] w-full max-w-5xl bg-white rounded-2xl relative top-8"> 
      
      {/* 1. Job Title with Icon */}
      <div className="flex-2 border-r border-r-gray-400 flex items-center gap-2">
        <img className="w-6" src="/sections/Hero/search.svg" alt="search" />
        <input
          className="outline-none w-full"
          type="text"
          placeholder="Job Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 2. Location with Icon */}
      <div className="flex-2 border-r border-r-gray-400 flex items-center gap-2">
        <img className="w-6" src="/sections/Hero/location.svg" alt="location" />
        <input
          list="locations"
          placeholder="Location"
          className="w-full bg-transparent outline-none text-gray-600"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <datalist id="locations">
          <option value="Mianwali" /><option value="Lahore" /><option value="Karachi" />
          <option value="Islamabad" /><option value="Remote" />
        </datalist>
      </div>

      {/* 3. Category with Icon */}
      <div className="flex-2 border-r border-r-gray-400 flex items-center gap-2">
        <img className="w-6" src="/sections/Hero/categorys.svg" alt="category" />
        <input
          list="category"
          placeholder="Category"
          className="w-full bg-transparent outline-none text-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="category">
          <option value="Software Engineering" /><option value="Cloud Computing" />
          <option value="Machine Learning" /><option value="App development" />
        </datalist>
      </div>

      {/* 4. Search Button with Animation */}
      <div className="flex-1 flex items-center">
        <button
          onClick={handleSearch}
          className="text-white p-1.5 rounded-xl w-40 h-10 bg-gradient-to-r from-[#1e2e4f] to-[#2a3e66] transition-all hover:scale-105 active:scale-95 font-semibold"
        >
          Search
        </button>
      </div>
    </div> 
  );
}

export default Searchbar;