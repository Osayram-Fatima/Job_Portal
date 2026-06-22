import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./sections/Nav/Register/Register";
import Company from "./sections/Nav/Register/cardbutton/Company";
import Candidate from "./sections/Nav/Register/cardbutton/Candidate";
import ThankYou from "./sections/Nav/Register/cardbutton/ThankYou";
import Browse from "./sections/Browse/Browse"; // ✅ Main Browse component
import ApplyJob from "./sections/job/ApplyJob";
import JobPost from "./sections/job/Main";
import Cv from "./sections/CV/Cv";
import Footer from "./sections/Footer/Footer";
import LoginPage from "./sections/Nav/Profile/LoginPage";
import CandidateDashboard from "./sections/Dashboard/CandidateDashboard";
import CompanyDashboard from "./sections/Dashboard/CompanyDashboard";
import Sitemap from "./sections/Footer/components/Sitemap";
import TermsOfService from "./sections/Footer/components/TermOfService";
import PrivacyPolicy from "./sections/Footer/components/PrivacyPolicy";
import CookiePolicy from "./sections/Footer/components/CookiePolicy";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        {/* Registration Routes */}
        <Route path="/register/candidate" element={<Candidate />} />
        <Route path="/register/company" element={<Company />} />

        {/* Thank You Page */}
        <Route path="/thank-you" element={<ThankYou />} />

        {/* ✅ Browse Routes - Both use Browse.jsx */}
        <Route path="/browser" element={<Browse />} />
        <Route path="/jobs/:categoryName" element={<Browse />} />

        {/* Other Routes */}
        <Route path="/post-job" element={<JobPost />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
      
      
       <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
