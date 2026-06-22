import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Building2, Briefcase, Users, PlusCircle, MapPin, Mail, Phone, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!userData || userData.role !== 'company') {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    fetchDashboardData(userData.id);
  }, [navigate]);

  const fetchDashboardData = async (userId) => {
    try {
      setLoading(true);

      // Fetch profile
      const profileRes = await axios.get(`http://localhost:5000/api/company/profile/${userId}`);
      setProfile(profileRes.data.data);

      // Fetch jobs
      const jobsRes = await axios.get(`http://localhost:5000/api/company/jobs/${userId}`);
      setJobs(jobsRes.data.data);

      // Fetch stats
      const statsRes = await axios.get(`http://localhost:5000/api/company/stats/${userId}`);
      setStats(statsRes.data.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/company/job/${jobId}/applications`);
      setApplications(res.data.data);
      setSelectedJob(jobId);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/company/application/${applicationId}/status`, { status });
      alert(`✅ Application ${status}!`);
      
      // Refresh applications
      if (selectedJob) {
        fetchApplications(selectedJob);
      }
    } catch (error) {
      alert('❌ Failed to update status');
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

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black text-purple-600">JTech Portal</span>
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
        
        {/* Company Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <Building2 className="text-purple-600" size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-2">{profile.company_name}</h1>
                <p className="text-purple-100 text-lg mb-2">{profile.industry}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <Mail size={16} /> {profile.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone size={16} /> {profile.phone_number}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} /> {profile.address}
                  </span>
                </div>
              </div>
            </div>
            
            <Link
              to="/post-job"
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Post New Job
            </Link>
          </div>

          {/* Company Bio */}
          {profile.bio && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-purple-100">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Total Jobs</p>
            <h3 className="text-4xl font-black text-purple-600 mt-2">{stats.totalJobs || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Total Applications</p>
            <h3 className="text-4xl font-black text-blue-600 mt-2">{stats.totalApplications || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Active Jobs</p>
            <h3 className="text-4xl font-black text-green-600 mt-2">{stats.activeJobs || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <p className="text-slate-500 text-sm font-semibold uppercase">Expired Jobs</p>
            <h3 className="text-4xl font-black text-red-600 mt-2">{stats.expiredJobs || 0}</h3>
          </div>
        </div>

        {/* Posted Jobs */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black text-purple-600 mb-6">Your Posted Jobs</h2>
          
          {jobs.length === 0 ? (
            <div className="text-center py-10">
              <Briefcase className="mx-auto mb-4 text-slate-300" size={64} />
              <p className="text-slate-400 text-lg mb-4">You haven't posted any jobs yet!</p>
              <Link
                to="/post-job"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all"
              >
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-purple-600">{job.title}</h3>
                      <p className="text-slate-600 mt-1">{job.location} • {job.salary}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold flex items-center gap-2">
                        <Users size={16} />
                        {job.application_count} Applications
                      </span>
                      
                      <button
                        onClick={() => fetchApplications(job.id)}
                        className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Applications
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applications Modal/Section */}
        {selectedJob && applications.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-purple-600">
                Applications ({applications.length})
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                Close ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app.application_id} className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{app.applicant_name}</h3>
                      <p className="text-slate-600">{app.current_role || 'Job Seeker'}</p>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500">
                        <span>📧 {app.applicant_email}</span>
                        <span>📱 {app.phone}</span>
                      </div>
                    </div>
                    
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>

                  {/* Candidate Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Experience</p>
                      <p className="font-semibold">{app.experience_level || app.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Education</p>
                      <p className="font-semibold">{app.qualification || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Notice Period</p>
                      <p className="font-semibold">{app.notice_period}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  {app.skills && (
                    <div className="mt-4">
                      <p className="text-xs text-slate-500 uppercase mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {app.skills.split(',').map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4 mt-4">
                    {app.resume_link && (
                      <a href={app.resume_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        📄 View Resume
                      </a>
                    )}
                    {app.linkedin_profile && (
                      <a href={app.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        💼 LinkedIn
                      </a>
                    )}
                    {app.portfolio_link && (
                      <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        🔗 Portfolio
                      </a>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => updateApplicationStatus(app.application_id, 'reviewed')}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
                    >
                      <Clock size={16} />
                      Mark Reviewed
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app.application_id, 'accepted')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app.application_id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyDashboard;