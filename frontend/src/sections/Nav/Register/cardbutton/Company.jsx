import React, { useState } from "react";
import { Eye, EyeOff, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Company = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "Software & IT",
    email: "",
    password: "",
    ntn: "",
    address: "",
    hrName: "",
    phone: "",
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "companyName", "email", "password", 
      "ntn", "address", "hrName", "phone", "bio"
    ];

    const isFormIncomplete = requiredFields.some(field => !formData[field].trim());

    if (isFormIncomplete) {
      alert("Fill all required fields marked with *");
      return;
    }

    setLoading(true);

    try {
      // Backend API Call
      const response = await axios.post("http://localhost:5000/api/auth/register/company", formData);
      
      if (response.data.status === "Success") {
        alert("✅ Company Registered Successfully!");
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "❌ Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[url('/sections/Hero/HeroChild/bg.png')] bg-cover backdrop-blur-[2px]">
      <div className="w-full max-w-[1000px] min-w-[320px] bg-[#e0f2ff] rounded-[40px] md:rounded-[48px] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 md:p-10 text-[#062259]">
          <div className="mb-8 text-center md:text-left">
            <p className="inline-block mb-3 px-3 py-1 text-[11px] uppercase tracking-[0.2em] rounded-full bg-[#062259] text-white font-semibold">
              Employer Hub
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              Register Your Company
            </h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5" onSubmit={handleSubmit}>
            <div className="md:col-span-2 border-b border-[#062259]/10 pb-2 mb-2">
              <h3 className="font-bold text-lg">1. Company Identity</h3>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. JTech Solutions"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Industry Type *</label>
              <select 
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl bg-white/80 outline-none cursor-pointer"
              >
                <option>Software & IT</option>
                <option>Healthcare</option>
                <option>Finance / Banking</option>
                <option>Education</option>
                <option>Manufacturing</option>
              </select>
            </div>

            <div className="md:col-span-2 border-b border-[#062259]/10 pb-2 mt-4 mb-2">
              <h3 className="font-bold text-lg">2. Legal & Verification</h3>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Official Work Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hr@yourcompany.com"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-sm font-semibold mb-1">Set Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-[#062259]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">NTN / SECP Number *</label>
              <input
                type="text"
                name="ntn"
                value={formData.ntn}
                onChange={handleChange}
                placeholder="1234567-8"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Gulberg III, Lahore"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="md:col-span-2 border-b border-[#062259]/10 pb-2 mt-4 mb-2">
              <h3 className="font-bold text-lg">3. Contact Person (HR)</h3>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">HR/Recruiter Name *</label>
              <input
                type="text"
                name="hrName"
                value={formData.hrName}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Verified Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 3XX XXXXXXX"
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-semibold mb-1">Company Bio *</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your company..."
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#062259] bg-white/80 outline-none resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-20 py-4 bg-[#062259] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#1a3a7a] hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Building2 size={20} />
                {loading ? "Registering..." : "Register Company"}
              </button>
            </div>
            
            <div className="relative left-[400px] mt-4 z-10">
              <Link to="/" className="group flex items-center gap-2 text-slate-800 hover:text-[#0e5bf5] transition-all font-medium">
                <span className="uppercase tracking-widest transform text-[10px]">Back to Dashboard</span>
              </Link>
            </div> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Company;