import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // ✅ Get user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('✅ Logged out successfully!');
    navigate('/login');
  };

  // ✅ Get display name (email username or full email)
  const getDisplayName = () => {
    if (!user) return "Guest";
    
    // Extract name from email (before @)
    const emailName = user.email.split('@')[0];
    
    // Capitalize first letter
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  };

  // ✅ If user not logged in, show login button
  if (!user) {
    return (
      <Link to="/login">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold flex items-center gap-2">
          <User size={18} />
          Login
        </button>
      </Link>
    );
  }

  return (
    <div className="relative inline-block    text-left" ref={dropdownRef}>
      {/* Profile Button */}
      <button
  onClick={() => setOpen(!open)}
  className="
    relative flex items-center 
    px-1
    rounded-full
    
    transition-all duration-300
    group
  "
>
  {/* Avatar Circle */}
  <div
    className="
      w-9 h-9
      rounded-full
      bg-gradient-to-br from-blue-600 to-indigo-600
      flex items-center justify-center
      shadow-inner
      group-hover:scale-105
      transition-transform duration-300
    "
  >
    <User className="text-white" size={18} />
  </div>

  {/* Username / Label (optional) */}
  
  

  {/* Arrow */}
  <span
    className={`
      text-[40px] text-blue-700
      transition-transform duration-300
      ${open ? "rotate-180" : ""}
    `}
  >
    ▾
  </span>

  {/* Glow on hover */}
  <span
    className="
      absolute inset-0 rounded-full
     
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
    "
  />
</button>


      {/* Dropdown Content */}
      {open && (
        <div className="absolute right-0 mt-12 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-60 overflow-hidden">
          
          {/* User Info Section */}
          <div className="p-4  bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">{getDisplayName()}</p>
                <p className="text-xs text-blue-100 uppercase tracking-wider">
                  {user.role === 'company' ? '🏢 Company' : '👤 Candidate'}
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-100 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link 
              to={user.role === 'company' ? '/company-dashboard' : '/candidate-dashboard'}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-gray-700"
            >
              <Settings size={18} className="text-blue-600" />
              <span className="font-medium">Dashboard</span>
            </Link>

           

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-red-600 font-semibold"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;