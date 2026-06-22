import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, Home, User, Building, Briefcase, FileText, 
  Settings, HelpCircle, Mail, Globe
} from 'lucide-react';

const Sitemap = () => {
  const siteSections = [
    {
      title: 'Main Pages',
      icon: <Home className="text-blue-600" size={20} />,
      pages: [
        { path: '/', name: 'Home', description: 'Portal homepage and featured jobs' },
        { path: '/about', name: 'About Us', description: 'Company information and mission' },
        { path: '/contact', name: 'Contact', description: 'Get in touch with our team' },
        { path: '/faq', name: 'FAQ', description: 'Frequently asked questions' },
      ]
    },
    {
      title: 'Candidate Section',
      icon: <User className="text-green-600" size={20} />,
      pages: [
        { path: '/register/candidate', name: 'Candidate Registration', description: 'Create a job seeker account' },
        { path: '/candidate/dashboard', name: 'Candidate Dashboard', description: 'Manage your profile and applications' },
        { path: '/browse', name: 'Browse Jobs', description: 'Search and filter job listings' },
        { path: '/cv-builder', name: 'CV Builder', description: 'Create and manage your resume' },
        { path: '/applications', name: 'My Applications', description: 'Track your job applications' },
        { path: '/saved-jobs', name: 'Saved Jobs', description: 'View your bookmarked positions' },
        { path: '/profile/edit', name: 'Edit Profile', description: 'Update your personal information' },
      ]
    },
    {
      title: 'Employer Section',
      icon: <Building className="text-purple-600" size={20} />,
      pages: [
        { path: '/register/company', name: 'Company Registration', description: 'Create an employer account' },
        { path: '/company/dashboard', name: 'Company Dashboard', description: 'Manage jobs and candidates' },
        { path: '/post-job', name: 'Post a Job', description: 'Create new job listing' },
        { path: '/manage-jobs', name: 'Manage Jobs', description: 'Edit and track posted jobs' },
        { path: '/applicants', name: 'View Applicants', description: 'Review candidate applications' },
        { path: '/company/profile', name: 'Company Profile', description: 'Update company information' },
        { path: '/recruitment-tools', name: 'Recruitment Tools', description: 'Advanced hiring features' },
      ]
    },
    {
      title: 'Job Search',
      icon: <Briefcase className="text-orange-600" size={20} />,
      pages: [
        { path: '/jobs', name: 'All Jobs', description: 'Complete job listing' },
        { path: '/jobs/remote', name: 'Remote Jobs', description: 'Work from home opportunities' },
        { path: '/jobs/internship', name: 'Internships', description: 'Entry-level positions' },
        { path: '/jobs/full-time', name: 'Full-time Jobs', description: 'Permanent positions' },
        { path: '/jobs/part-time', name: 'Part-time Jobs', description: 'Flexible opportunities' },
        { path: '/jobs/by-location', name: 'Jobs by Location', description: 'Search by city/region' },
        { path: '/jobs/by-industry', name: 'Jobs by Industry', description: 'Search by sector' },
      ]
    },
    {
      title: 'Resources',
      icon: <FileText className="text-amber-600" size={20} />,
      pages: [
        { path: '/career-advice', name: 'Career Advice', description: 'Tips and guidance' },
        { path: '/interview-tips', name: 'Interview Tips', description: 'Preparation resources' },
        { path: '/resume-templates', name: 'Resume Templates', description: 'Downloadable formats' },
        { path: '/salary-guide', name: 'Salary Guide', description: 'Industry compensation data' },
        { path: '/blog', name: 'Blog', description: 'Latest articles and news' },
        { path: '/webinars', name: 'Webinars', description: 'Upcoming events' },
      ]
    },
    {
      title: 'Legal & Support',
      icon: <Settings className="text-gray-600" size={20} />,
      pages: [
        { path: '/privacy', name: 'Privacy Policy', description: 'Data protection information' },
        { path: '/terms', name: 'Terms of Service', description: 'User agreement' },
        { path: '/cookies', name: 'Cookie Policy', description: 'Cookie usage details' },
        { path: '/help-center', name: 'Help Center', description: 'Support documentation' },
        { path: '/report-issue', name: 'Report an Issue', description: 'Submit technical problems' },
        { path: '/feedback', name: 'Feedback', description: 'Share your suggestions' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Map className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Website Sitemap</h1>
                <p className="text-gray-600">Complete navigation structure of JTech Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Home
              </Link>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
              <div className="text-gray-600">Total Pages</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600">Main Sections</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-gray-600">Fully Accessible</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <HelpCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <div className="text-gray-600">Easy Navigation</div>
            </div>
          </div>
        </div>

        {/* Sitemap Sections */}
        <div className="max-w-6xl mx-auto space-y-8">
          {siteSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.pages.map((page, pageIndex) => (
                    <div 
                      key={pageIndex} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Link 
                            to={page.path}
                            className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors"
                          >
                            {page.name}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                        </div>
                        <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                          →
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {page.path}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Need Help Navigating?</h3>
                <p className="text-gray-700 mb-4">
                  If you can't find what you're looking for or need assistance with our platform, 
                  our support team is here to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Contact Support
                  </Link>
                  <Link 
                    to="/faq" 
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    View FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-6xl mx-auto mt-8 text-center text-gray-500 text-sm">
          <p>Sitemap last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p className="mt-2">For accessibility concerns, please contact: accessibility@jtechportal.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;