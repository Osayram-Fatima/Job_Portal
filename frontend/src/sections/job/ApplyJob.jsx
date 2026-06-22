import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state with default empty values
  const [formData, setFormData] = useState({
    applicant_name: "",
    applicant_email: "",
    phone: "",
    education: "",
    field: "",
    skills: "",
    experience: "",
    current_salary: "",
    notice_period: "Immediately",
    resume_link: "",
    portfolio_link: "",
    linkedin_profile: "",
    cover_letter: "",
  });

  // ========================================
  // 1. FETCH CANDIDATE DATA ON MOUNT
  // ========================================
  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          alert("Please login first!");
          navigate("/login");
          return;
        }

        // Fetch candidate profile from backend
        const response = await axios.get(
          `http://localhost:5000/api/candidate/profile/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profile = response.data.data;

        // ✅ PRE-FILL FORM WITH DATABASE DATA
        setFormData({
          applicant_name: profile.full_name || "",
          applicant_email: profile.email || "",
          phone: profile.phone_number || "",
          education: profile.qualification || "",
          field: profile.current_role || "",
          skills: profile.skills || "",
          experience: profile.experience_level || "",
          current_salary: "",
          notice_period: "Immediately",
          resume_link: profile.resume_path || "",
          portfolio_link: "",
          linkedin_profile: "",
          cover_letter: "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Profile fetch error:", error);
        alert("Failed to load your profile data");
        setLoading(false);
      }
    };

    fetchCandidateProfile();
  }, [navigate]);

  // ========================================
  // 2. HANDLE INPUT CHANGES
  // ========================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // 3. SUBMIT APPLICATION
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first! 🔐");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        {
          job_id: jobId,
          ...formData, // Send all form data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Application submitted successfully!");
      navigate("/candidate-dashboard");
    } catch (err) {
      console.error("Application error:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again!");
        navigate("/login");
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("❌ Failed to submit application");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // 4. LOADING STATE
  // ========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const inputStyle =
    "w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all text-slate-700 placeholder:text-slate-400";
  const labelStyle =
    "text-xs font-bold text-[#003366] uppercase tracking-wider mb-2 block";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* LEFT SIDE: Sticky Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] h-screen sticky top-0 overflow-hidden relative">
        <img
          src="/sections/job/applyjob.png"
          alt="Apply Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/40 to-transparent z-10"></div>
        <div className="relative z-20 w-full h-full flex flex-col justify-end p-16 text-center">
          <div className="mb-10 backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10">
            <h2 className="text-4xl font-black text-white tracking-tight italic">
              Your Profile is Ready! 🚀
            </h2>
            <p className="text-blue-100 mt-4 max-w-sm mx-auto font-medium">
              We've pre-filled your information. Just review and submit!
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full md:w-1/2 lg:w-[55%] bg-[#f8fafc] p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
              ✓ Profile Auto-Filled
            </div>
            <h2 className="text-4xl font-black text-[#003366] tracking-tight">
              Review & Submit
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Job ID: <span className="text-blue-600 font-bold">#{jobId}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black">1</span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="applicant_name"
                    value={formData.applicant_name}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    name="applicant_email"
                    value={formData.applicant_email}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Education *</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black">2</span>
                Professional Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Field / Domain *</label>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Total Experience *</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="e.g. 2 Years"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Current/Expected Salary</label>
                  <input
                    type="text"
                    name="current_salary"
                    value={formData.current_salary}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="e.g. 80k PKR"
                  />
                </div>

                <div>
                  <label className={labelStyle}>Notice Period</label>
                  <select
                    name="notice_period"
                    value={formData.notice_period}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option>Immediately</option>
                    <option>15 Days</option>
                    <option>1 Month</option>
                    <option>2 Months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black">3</span>
                Portfolio & Links
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelStyle}>Resume Link (Google Drive) *</label>
                  <input
                    type="url"
                    name="resume_link"
                    value={formData.resume_link}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>Portfolio / GitHub</label>
                  <input
                    type="url"
                    name="portfolio_link"
                    value={formData.portfolio_link}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="https://github.com/yourname"
                  />
                </div>

                <div>
                  <label className={labelStyle}>LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedin_profile"
                    value={formData.linkedin_profile}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-black">4</span>
                Cover Letter
              </h3>
              
              <label className={labelStyle}>Why should we hire you? *</label>
              <textarea
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                rows="6"
                className={`${inputStyle} resize-none`}
                placeholder="Describe your achievements and why you're the best fit..."
                required
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-4 bg-[#003366] text-white font-black rounded-2xl shadow-lg hover:bg-blue-600 transition-all active:scale-95 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Application ⚡"}
              </button>
              
              <Link
                to="/browser"
                className="px-8 py-4 border-2 border-slate-300 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;