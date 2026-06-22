import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, CheckCircle, Briefcase, User } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <AlertCircle size={20} />
              <p className="font-medium">Important Legal Agreement</p>
            </div>
            <p className="text-gray-700">
              Welcome to JTech Portal. By accessing or using our job portal services, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our platform.
            </p>
          </div>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Account Registration</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <User className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p><strong>Candidate Accounts:</strong> You must provide accurate and complete information about your qualifications, experience, and skills.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p><strong>Employer Accounts:</strong> Companies must provide valid business information and authorization to post jobs.</p>
                  </div>
                </div>
                <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">You agree not to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide false or misleading information</li>
                    <li>Post illegal, discriminatory, or inappropriate job listings</li>
                    <li>Harass, threaten, or discriminate against other users</li>
                    <li>Use the platform for any unauthorized commercial purposes</li>
                    <li>Attempt to compromise platform security</li>
                    <li>Violate intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Job Listings and Applications</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>For Employers:</strong></p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Job listings must be accurate, non-discriminatory, and for legitimate positions</li>
                  <li>You must respond to applicants in a timely manner</li>
                  <li>All job postings are subject to review and approval</li>
                </ul>
                
                <p><strong>For Candidates:</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Applications should be truthful and accurately represent your qualifications</li>
                  <li>You authorize employers to view your submitted information</li>
                  <li>Application decisions are solely at the employer's discretion</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Fees and Payments</h2>
              <div className="space-y-4 text-gray-700">
                <p>Certain premium services may require payment:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Employer job posting packages</li>
                  <li>Premium candidate features</li>
                  <li>Recruitment services</li>
                </ul>
                <p>All fees are non-refundable unless otherwise stated. Prices are subject to change with notice.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>All platform content, including logos, design, and software, is owned by JTech Portal.</p>
                <p>Users retain ownership of their submitted content but grant us a license to use it for platform operations.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
                <p>Users may delete their accounts at any time through account settings.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>JTech Portal acts as a platform connecting candidates and employers. We are not responsible for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Employment decisions or hiring outcomes</li>
                  <li>Accuracy of job listings or candidate information</li>
                  <li>Conduct of users on or off the platform</li>
                  <li>Technical issues beyond our reasonable control</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>Any disputes shall be governed by the laws of Pakistan.</p>
                <p>Parties agree to attempt mediation before pursuing legal action.</p>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Acceptance of Terms</h3>
              </div>
              <p className="text-gray-700">
                By using JTech Portal, you acknowledge that you have read, understood, and agree to these Terms of Service. 
                If you do not agree with any part of these terms, please discontinue use of our services.
              </p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 text-sm">
                For questions about these terms, contact: legal@jtechportal.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;