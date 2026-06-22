import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings, Shield } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cookie className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
                <p className="text-gray-600">How we use cookies and similar technologies</p>
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
            <p className="text-gray-700">
              This Cookie Policy explains how JTech Portal uses cookies and similar technologies to recognize you when you visit our website. 
              It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
          </div>

          <div className="space-y-10">
            {/* What are cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are Cookies?</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                  Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                  as well as to provide reporting information.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Cookies set by the website owner are called "first-party cookies."</p>
                  <p>Cookies set by parties other than the website owner are called "third-party cookies."</p>
                </div>
              </div>
            </section>

            {/* Why we use cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why We Use Cookies</h2>
              <div className="space-y-6 text-gray-700">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Settings className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as logging in or filling in forms.</p>
                    <p className="mt-2 text-sm text-gray-600"><strong>Examples:</strong> Authentication, security, load balancing</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Shield className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                    <p className="mt-2 text-sm text-gray-600"><strong>Examples:</strong> Language preferences, region settings</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-600 font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.</p>
                    <p className="mt-2 text-sm text-gray-600"><strong>Examples:</strong> Google Analytics, Mixpanel</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Types Table */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookie Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">auth_token</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Maintains your login session</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Session</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Essential</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">user_preferences</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Stores your UI preferences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 year</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Functional</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_ga</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Google Analytics tracking</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2 years</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Analytics</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">job_search</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Remembers your job search filters</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">30 days</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Functional</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Control Options */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Control Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have several options to control or limit how we and our partners use cookies:</p>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Browser Settings</h3>
                    <p className="text-sm">Most browsers allow you to refuse or accept cookies. Visit your browser's help section for instructions.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Opt-Out Tools</h3>
                    <p className="text-sm">You can opt out of third-party advertising cookies through organizations like the Digital Advertising Alliance.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Platform Controls</h3>
                    <p className="text-sm">Use our cookie consent banner to manage preferences for non-essential cookies.</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Note: Blocking some types of cookies may impact your experience of the site and the services we are able to offer.
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Updates to This Policy</h2>
              <p className="text-gray-700 mb-3">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our services.
              </p>
              <p className="text-sm text-gray-600">
                This policy was last reviewed on: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>

            {/* Contact */}
            <div className="border-t pt-6">
              <p className="text-gray-700">
                For more information about our use of cookies or if you have any questions, please contact us at:
              </p>
              <p className="text-blue-600 font-medium mt-2">privacy@jtechportal.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;