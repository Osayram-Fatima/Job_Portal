import React, { useState } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 FIX 1: Import Axios
import CVUploadButton from './CVUploadButton';


const Candidate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    currentRole: "",
    experienceLevel: "Freshie / Student",
    skills: "",
    qualification: "",
    preferredCity: "Mianwali"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      alert("Fill all required fields marked with *");
      return;
    }

    try {
      // 👈 FIX 2: Correct API URL (Matches our new modular backend)
      const response = await axios.post("http://localhost:5000/api/auth/register/candidate", formData);
      
      if (response.data.status === "Success") {
        alert("Registration Successful! ✨");
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Registration failed. Check if email already exists!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[url('/sections/Hero/HeroChild/bg.png')] bg-cover backdrop-blur-[2px]">
      <div className="w-full max-w-[900px] min-w-[320px] bg-[#b0ddff] rounded-[40px] md:rounded-[48px] shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 text-[#062259]">
          <div className="mb-8 text-center md:text-left">
            <p className="inline-block mb-3 px-3 py-1 text-[11px] uppercase tracking-[0.2em] rounded-full bg-white/60 text-[#2563eb] font-semibold">
              Candidate onboarding
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              Create your JTech profile
            </h2>
          </div>

        <CVUploadButton />

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName" // 👈 Added Name
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Shenum Fatima"
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email" // 👈 Added Name
                value={formData.email}
                onChange={handleChange}
                placeholder="shenum@example.com"
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium mb-1">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500 hover:text-[#062259]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 3XX XXXXXXX"
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* Current Role */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Current Role</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* Experience Level */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Experience Level</label>
              <select 
                name="experienceLevel" 
                value={formData.experienceLevel} 
                onChange={handleChange} 
                className="p-2.5 border border-gray-300 rounded-lg bg-white/70 outline-none cursor-pointer"
              >
                <option>Freshie / Student</option>
                <option>Junior (1-2 Years)</option>
                <option>Mid-Level (3-5 Years)</option>
                <option>Senior (5+ Years)</option>
              </select>
            </div>

            {/* Skills */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, UI Design..."
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* Qualification */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Highest Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. BS Computer Science"
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#062259] bg-white/70 outline-none"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Preferred City</label>
              <select 
                name="preferredCity" 
                value={formData.preferredCity} 
                onChange={handleChange} 
                className="p-2.5 border border-gray-300 rounded-lg bg-white/70 outline-none cursor-pointer"
              >
                <option>Mianwali</option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Islamabad</option>
                <option>Remote</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="px-24 py-3 bg-[#062259] text-white rounded-full font-bold hover:bg-[#1a3a7a] transition-all"
              >
                Create my profile
              </button>
            </div>
            
            <div className="md:col-span-2 text-center mt-4">
              <Link to="/" className="text-[10px] uppercase tracking-widest text-slate-800 hover:text-[#0e5bf5]">
                Back to Dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Candidate;