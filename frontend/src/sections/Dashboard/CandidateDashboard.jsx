import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogOut, User, Briefcase, FileText, Settings, CheckCircle, Clock, XCircle, MapPin, Mail, Phone } from 'lucide-react';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!userData || userData.role !== 'candidate') {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    fetchDashboardData(userData.id);
  }, [navigate]);

  const fetchDashboardData = async (userId) => {
  try {
    setLoading(true);
    
    const token = localStorage.getItem('token'); // ✅ Token get karo
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // ✅ Token bhejo
      }
    };

    // Fetch profile
    const profileRes = await axios.get(
      `http://localhost:5000/api/candidate/profile/${userId}`,
      config
    );
    setProfile(profileRes.data.data);

    // Fetch applications
    const appsRes = await axios.get(
      `http://localhost:5000/api/candidate/applications/${userId}`,
      config
    );
    setApplications(appsRes.data.data);

    // Fetch stats
    const statsRes = await axios.get(
      `http://localhost:5000/api/candidate/stats/${userId}`,
      config
    );
    setStats(statsRes.data.data);

    setLoading(false);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-700',
      reviewed: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.applied;
  };

  const getStatusIcon = (status) => {
    const icons = {
      applied: <Clock size={16} />,
      reviewed: <FileText size={16} />,
      accepted: <CheckCircle size={16} />,
      rejected: <XCircle size={16} />
    };
    return icons[status] || icons.applied;
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#043f78] rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black text-[#043f78]">JTech Portal</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#043f78] to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User className="text-[#043f78]" size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-2">{profile.full_name}</h1>
                <p className="text-blue-100 text-lg mb-2">{profile.current_role || 'Job Seeker'}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <Mail size={16} /> {profile.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone size={16} /> {profile.phone_number}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} /> {profile.preferred_city}
                  </span>
                </div>
              </div>
            </div>
            
            <Link
              to="/browser"
              className="px-8 py-3 bg-white text-[#043f78] rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Browse Jobs
            </Link>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-white/20">
            <div>
              <p className="text-blue-200 text-sm mb-1">Experience Level</p>
              <p className="font-bold text-lg">{profile.experience_level}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-1">Education</p>
              <p className="font-bold text-lg">{profile.qualification}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-1">Skills</p>
              <p className="font-bold text-lg">{profile.skills?.split(',').length || 0} Skills</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {profile.skills && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-[#043f78] mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Total Applications</p>
            <h3 className="text-4xl font-black text-[#043f78] mt-2">{stats.totalApplications || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Pending</p>
            <h3 className="text-4xl font-black text-[#043f78] mt-2">{stats.pendingApplications || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Accepted</p>
            <h3 className="text-4xl font-black text-[#043f78] mt-2">{stats.acceptedApplications || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Rejected</p>
            <h3 className="text-4xl font-black text-[#043f78] mt-2">{stats.rejectedApplications || 0}</h3>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-black text-[#043f78] mb-6">My Applications</h2>
          
          {applications.length === 0 ? (
            <div className="text-center py-10">
              <Briefcase className="mx-auto mb-4 text-slate-300" size={64} />
              <p className="text-slate-400 text-lg mb-4">You haven't applied to any jobs yet!</p>
              <Link
                to="/browser"
                className="inline-block px-8 py-3 bg-[#043f78] text-white rounded-full font-bold hover:bg-blue-600 transition-all"
              >
                Start Applying
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.application_id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <img src={app.logo_url} alt={app.company} className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-2" />
                      <div>
                        <h3 className="text-xl font-bold text-[#043f78]">{app.job_title}</h3>
                        <p className="text-slate-600">{app.company}</p>
                        <p className="text-sm text-slate-500">{app.location} • {app.salary}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <span className="text-xs text-slate-500">
                        Applied: {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {app.cover_letter && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600 line-clamp-2">{app.cover_letter}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CandidateDashboard;