// Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">JT</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">JTech Portal</h2>
                <p className="text-gray-400 text-sm">Professional Job Portal</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Connecting qualified professionals with leading companies worldwide. 
              Your career advancement starts here.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <FaChevronRight className="text-xs mr-2 text-gray-500 group-hover:text-blue-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <FaChevronRight className="text-xs mr-2 text-gray-500 group-hover:text-blue-500" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/register/candidate" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <FaChevronRight className="text-xs mr-2 text-gray-500 group-hover:text-blue-500" />
                  Candidate Registration
                </Link>
              </li>
              <li>
                <Link to="/register/company" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <FaChevronRight className="text-xs mr-2 text-gray-500 group-hover:text-blue-500" />
                  Employer Registration
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <FaChevronRight className="text-xs mr-2 text-gray-500 group-hover:text-blue-500" />
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <div>
                  <p className="font-medium">Head Office</p>
                  <p className="text-gray-300 text-sm">
                    123 Business Avenue, Suite 100<br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-300 text-sm">+92 300 1234567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300 text-sm">info@jtechportal.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive career insights and job alerts.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-gray-500 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} JTech Portal. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;