import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      if (response.data.status === "Success") {
        // Save to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        alert(`✅ Welcome back, ${response.data.user.email}!`);
        
        // ✅ Redirect to Dashboard based on role
        if (response.data.user.role === "company") {
          navigate("/company-dashboard");
        } else {
          navigate("/candidate-dashboard");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/sections/profile/bg.png')" }}
    >
      <div className="flex shadow-[1px_1px_15px_2px_#0d6eb9] w-[850px] h-[470px] bg-[#b0ddff] rounded-tr-[50px] rounded-br-[50px] rounded-tl-[200px] shadow-2xl overflow-hidden relative">
        
        {/* Left Section */}
        <div className="w-[40%] cursor-default bg-[linear-gradient(180deg,_#1985cc_70%,_#b0ddff_100%)] text-white flex flex-col items-center justify-center p-10 rounded-tl-[200px] z-10">
          <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-center text-sm leading-relaxed mb-10 opacity-90">
            To keep connected with us please <br /> login with your personal info
          </p>
          <Link to="/register">
            <button className="border-2 cursor-pointer border-white rounded-full px-14 py-3 font-semibold hover:bg-white hover:text-[#1985cc] transition-all duration-300">
              SIGN UP
            </button>
          </Link>
        </div>

        {/* Right Section - Form */}
        <div className="w-[60%] flex flex-col cursor-default items-center justify-center p-10 text-[#062259]">
          <h1 className="text-4xl font-black mb-3">Login to Account</h1>
          <p className="text-sm mb-6">Use your credentials to login</p>

          {/* Error Message */}
          {error && (
            <div className="w-[350px] bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4 w-[350px]" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div className="flex items-center bg-white rounded-md px-4 py-3 shadow-sm">
              <Mail className="text-[#062259] mr-3" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-transparent outline-none w-full text-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center bg-white rounded-md px-4 py-3 gap-3 shadow-sm">
              <Lock className="text-[#062259] mr-3" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent outline-none w-full text-sm"
                required
              />
            </div>

            <Link className="self-end" to="/register">
              <a className="text-xs text-blue-700 underline self-end mt-1">
                Don't have an account?
              </a>
            </Link>

            <center>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-[200px] bg-[#062259] text-white py-3 rounded-full font-bold text-lg hover:bg-[#0a3280] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
            </center>
          </form>

          <div className="mt-4 z-10">
            <Link to="/" className="group flex items-center gap-2 text-slate-800 hover:text-white transition-all font-medium">
              <span className="uppercase tracking-widest transform text-[10px]">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;