import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { 
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
            <p className="text-gray-700 mb-6">
              At JTech Portal, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy outlines how we collect, use, and safeguard your data when you use our job portal services.
            </p>
          </div>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
              </div>
              <div className="ml-9 space-y-4 text-gray-700">
                <p><strong>Personal Information:</strong> Name, email address, phone number, location, and professional details provided during registration.</p>
                <p><strong>Professional Data:</strong> Resume/CV, work experience, education history, skills, and certifications.</p>
                <p><strong>Application Data:</strong> Job applications, cover letters, and communication history with employers.</p>
                <p><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <div className="ml-9 space-y-4 text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  <li>To match you with relevant job opportunities</li>
                  <li>To facilitate communication between candidates and employers</li>
                  <li>To improve our platform and user experience</li>
                  <li>To send job alerts and career-related updates</li>
                  <li>To ensure platform security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">3. Data Security</h2>
              </div>
              <div className="ml-9 space-y-4 text-gray-700">
                <p>We implement industry-standard security measures including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data backup and disaster recovery procedures</li>
                  <li>Employee training on data protection best practices</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
              <div className="space-y-4 text-gray-700">
                <p>We only share your information with:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Employers when you apply for jobs (resume and application details)</li>
                  <li>Service providers who assist in platform operations (under strict confidentiality agreements)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access and review your personal data</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related inquiries or to exercise your rights, please contact our Data Protection Officer:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> privacy@jtechportal.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +92 300 123 4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business Avenue, Suite 100, Karachi, Pakistan</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-gray-600 text-sm">
                This policy may be updated periodically. We will notify users of significant changes through email or platform notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;